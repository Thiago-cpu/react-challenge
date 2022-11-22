const httpClient: (
  input: RequestInfo | URL,
  init?: RequestInit
) => Promise<any> = async (input, init) => {
  const res = await fetch(input, init);
  const data = await res.json();
  if (res.status >= 200 && res.status < 300) return data;
  throw new Error(data?.error || "Something went wrong!");
};

export default httpClient;
