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

function getConfig(listId: string | undefined): ActiveCampaignConfig | null {
  const base = getBaseConfig();
  if (!base || !listId) {
    return null;
  }

  return { ...base, listId };
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
    const message =
      typeof data?.message === "string"
        ? data.message
        : `ActiveCampaign request failed (${response.status})`;
    throw new Error(message);
  }

  return data;
}

async function subscribeEmailToListId(email: string, listId: string) {
  const config = getConfig(listId);
  if (!config) {
    throw new Error("ActiveCampaign is not configured.");
  }

  const sync = await acFetch(config, "/contact/sync", {
    method: "POST",
    body: JSON.stringify({
      contact: { email: email.trim().toLowerCase() },
    }),
  });

  const contactId = sync?.contact?.id;
  if (!contactId) {
    throw new Error("ActiveCampaign did not return a contact id.");
  }

  await acFetch(config, "/contactLists", {
    method: "POST",
    body: JSON.stringify({
      contactList: {
        list: config.listId,
        contact: contactId,
        status: 1,
      },
    }),
  });

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
