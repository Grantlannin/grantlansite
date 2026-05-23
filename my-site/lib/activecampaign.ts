type ActiveCampaignConfig = {
  apiUrl: string;
  apiKey: string;
  listId: string;
};

function getConfig(): ActiveCampaignConfig | null {
  const apiUrl = process.env.ACTIVECAMPAIGN_API_URL?.replace(/\/$/, "");
  const apiKey = process.env.ACTIVECAMPAIGN_API_KEY;
  const listId = process.env.ACTIVECAMPAIGN_LIST_ID;

  if (!apiUrl || !apiKey || !listId) {
    return null;
  }

  return { apiUrl, apiKey, listId };
}

async function acFetch(
  config: ActiveCampaignConfig,
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

export async function subscribeEmailToList(email: string) {
  const config = getConfig();
  if (!config) {
    throw new Error(
      "ActiveCampaign is not configured. Set ACTIVECAMPAIGN_API_URL, ACTIVECAMPAIGN_API_KEY, and ACTIVECAMPAIGN_LIST_ID.",
    );
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
