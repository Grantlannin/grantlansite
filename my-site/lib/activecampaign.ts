type ActiveCampaignBaseConfig = {
  apiUrl: string;
  apiKey: string;
};

type ActiveCampaignConfig = ActiveCampaignBaseConfig & {
  listId: string;
};

function getBaseConfig(): ActiveCampaignBaseConfig | null {
  const apiUrl = process.env.ACTIVECAMPAIGN_API_URL?.replace(/\/$/, "");
  const apiKey = process.env.ACTIVECAMPAIGN_API_KEY;

  if (!apiUrl || !apiKey) {
    return null;
  }

  return { apiUrl, apiKey };
}

function getMainListId(): string | undefined {
  return (
    process.env.ACTIVECAMPAIGN_MAIN_LIST_ID?.trim() ||
    process.env.ACTIVECAMPAIGN_LIST_ID?.trim() ||
    undefined
  );
}

function getIdentityListId(): string | undefined {
  return process.env.ACTIVECAMPAIGN_IDENTITY_LIST_ID?.trim() || undefined;
}

function getWorkWaitlistListId(): string | undefined {
  return process.env.ACTIVECAMPAIGN_WORK_WAITLIST_LIST_ID?.trim() || undefined;
}

function getAdhdSystemListId(): string | undefined {
  return process.env.ACTIVECAMPAIGN_ADHD_SYSTEM_LIST_ID?.trim() || undefined;
}

function getMakeSalesListId(): string | undefined {
  return process.env.ACTIVECAMPAIGN_MAKE_SALES_LIST_ID?.trim() || undefined;
}

function getConfig(listId: string | undefined): ActiveCampaignConfig | null {
  const base = getBaseConfig();
  if (!base || !listId) {
    return null;
  }

  return { ...base, listId };
}

function getErrorMessage(data: unknown, status: number): string {
  if (typeof data === "object" && data !== null) {
    const record = data as Record<string, unknown>;
    if (typeof record.message === "string" && record.message.trim()) {
      return record.message;
    }
    if (Array.isArray(record.errors)) {
      const messages = record.errors
        .map((entry) => {
          if (typeof entry === "string") return entry;
          if (typeof entry === "object" && entry !== null) {
            const error = entry as Record<string, unknown>;
            if (typeof error.title === "string") return error.title;
            if (typeof error.detail === "string") return error.detail;
          }
          return "";
        })
        .filter(Boolean);
      if (messages.length > 0) {
        return messages.join(" ");
      }
    }
  }

  return `ActiveCampaign request failed (${status})`;
}

function isDuplicateListError(message: string): boolean {
  const normalized = message.toLowerCase();
  return (
    normalized.includes("already") ||
    normalized.includes("duplicate") ||
    normalized.includes("exists on list")
  );
}

function shouldRetryStatus(status: number): boolean {
  return status === 429 || status === 502 || status === 503 || status === 504;
}

async function acFetch(
  config: ActiveCampaignBaseConfig,
  path: string,
  init?: RequestInit,
) {
  const response = await fetch(`${config.apiUrl}/api/3${path}`, {
    ...init,
    headers: {
      "Api-Token": config.apiKey,
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(getErrorMessage(data, response.status));
  }

  return data;
}

async function acFetchWithRetry(
  config: ActiveCampaignBaseConfig,
  path: string,
  init?: RequestInit,
  retries = 2,
) {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      return await acFetch(config, path, init);
    } catch (error) {
      lastError = error instanceof Error ? error : new Error("Request failed.");
      const statusMatch = lastError.message.match(/\((\d{3})\)$/);
      const status = statusMatch ? Number(statusMatch[1]) : 0;

      if (attempt < retries && shouldRetryStatus(status)) {
        await new Promise((resolve) => setTimeout(resolve, 400 * (attempt + 1)));
        continue;
      }

      throw lastError;
    }
  }

  throw lastError ?? new Error("ActiveCampaign request failed.");
}

async function findContactListAssociation(
  config: ActiveCampaignConfig,
  contactId: string,
  listId: string,
) {
  const data = await acFetchWithRetry(
    config,
    `/contacts/${contactId}/contactLists`,
  );
  const associations = data?.contactLists ?? [];

  return associations.find(
    (entry: { list?: string | number; id?: string | number }) =>
      String(entry.list) === String(listId),
  );
}

async function ensureContactOnList(
  config: ActiveCampaignConfig,
  contactId: string,
) {
  const existing = await findContactListAssociation(
    config,
    contactId,
    config.listId,
  );

  if (existing?.id) {
    if (String(existing.status) === "1") {
      return;
    }

    await acFetchWithRetry(config, `/contactLists/${existing.id}`, {
      method: "PUT",
      body: JSON.stringify({
        contactList: {
          list: config.listId,
          contact: contactId,
          status: 1,
        },
      }),
    });
    return;
  }

  try {
    await acFetchWithRetry(config, "/contactLists", {
      method: "POST",
      body: JSON.stringify({
        contactList: {
          list: config.listId,
          contact: contactId,
          status: 1,
        },
      }),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    if (!isDuplicateListError(message)) {
      throw error;
    }

    const refreshed = await findContactListAssociation(
      config,
      contactId,
      config.listId,
    );
    if (!refreshed?.id) {
      throw error;
    }

    await acFetchWithRetry(config, `/contactLists/${refreshed.id}`, {
      method: "PUT",
      body: JSON.stringify({
        contactList: {
          list: config.listId,
          contact: contactId,
          status: 1,
        },
      }),
    });
  }

  const verified = await findContactListAssociation(
    config,
    contactId,
    config.listId,
  );

  if (!verified?.id) {
    throw new Error("ActiveCampaign did not add the contact to the list.");
  }
}

async function subscribeEmailToListId(email: string, listId: string) {
  const config = getConfig(listId);
  if (!config) {
    throw new Error("ActiveCampaign is not configured.");
  }

  const normalizedEmail = email.trim().toLowerCase();

  const sync = await acFetchWithRetry(config, "/contact/sync", {
    method: "POST",
    body: JSON.stringify({
      contact: { email: normalizedEmail },
    }),
  });

  const contactId = sync?.contact?.id;
  if (!contactId) {
    throw new Error("ActiveCampaign did not return a contact id.");
  }

  await ensureContactOnList(config, String(contactId));

  return { contactId: String(contactId) };
}

export async function subscribeToNewsletterList(email: string) {
  const listId = getMainListId();
  if (!getBaseConfig() || !listId) {
    throw new Error(
      "ActiveCampaign newsletter list is not configured. Set ACTIVECAMPAIGN_API_URL, ACTIVECAMPAIGN_API_KEY, and ACTIVECAMPAIGN_MAIN_LIST_ID (or ACTIVECAMPAIGN_LIST_ID).",
    );
  }

  return subscribeEmailToListId(email, listId);
}

export async function subscribeToIdentityCourseList(email: string) {
  const listId = getIdentityListId();
  if (!getBaseConfig() || !listId) {
    throw new Error(
      "ActiveCampaign identity course list is not configured. Set ACTIVECAMPAIGN_API_URL, ACTIVECAMPAIGN_API_KEY, and ACTIVECAMPAIGN_IDENTITY_LIST_ID.",
    );
  }

  return subscribeEmailToListId(email, listId);
}

export async function subscribeToWorkWaitlistList(email: string) {
  const listId = getWorkWaitlistListId();
  if (!getBaseConfig() || !listId) {
    throw new Error(
      "ActiveCampaign work waitlist is not configured. Set ACTIVECAMPAIGN_API_URL, ACTIVECAMPAIGN_API_KEY, and ACTIVECAMPAIGN_WORK_WAITLIST_LIST_ID.",
    );
  }

  return subscribeEmailToListId(email, listId);
}

export async function subscribeToAdhdSystemList(email: string) {
  const listId = getAdhdSystemListId();
  if (!getBaseConfig() || !listId) {
    throw new Error(
      "ActiveCampaign ADHD guide list is not configured. Set ACTIVECAMPAIGN_API_URL, ACTIVECAMPAIGN_API_KEY, and ACTIVECAMPAIGN_ADHD_SYSTEM_LIST_ID.",
    );
  }

  return subscribeEmailToListId(email, listId);
}

export async function subscribeToMakeSalesList(email: string) {
  const listId = getMakeSalesListId();
  if (!getBaseConfig() || !listId) {
    throw new Error(
      "ActiveCampaign make sales guide list is not configured. Set ACTIVECAMPAIGN_API_URL, ACTIVECAMPAIGN_API_KEY, and ACTIVECAMPAIGN_MAKE_SALES_LIST_ID.",
    );
  }

  return subscribeEmailToListId(email, listId);
}
