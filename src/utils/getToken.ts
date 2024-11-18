const clientId = import.meta.env.VITE_FE_CLIENT_ID;
const apiKey = import.meta.env.VITE_FE_API_KEY;

export async function getToken() {
  const options = {
    method: "POST",
    headers: { accept: "application/json", "content-type": "application/json" },
    body: JSON.stringify({ clientId, secret: apiKey }),
  };

  const response = await fetch(
    "https://api.frontegg.com/auth/vendor/",
    options
  );
  const data = await response.json();
  return data.token;
}

export async function getGenericBackendCall(
  url: string,
  tenantId: string,
  userId: string
) {
  const token = await getPersonalToken(tenantId, userId);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    alert("some error occured");
    console.error(response);
  }

  const data = await response.json();

  alert(`backend responded with ${data}`);
}

export async function getPersonalToken(tenantId: string, userId: string) {
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "frontegg-tenant-id": tenantId,
      "frontegg-user-id": userId,
    },
  };

  const response = await fetch(
    "https://app-kcj0djtbjuee.frontegg.com/auth/vendor/",
    options
  );
  const data = await response.json();
  return data.token;
}
