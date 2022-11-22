const getAlbums = async ({ bandId }: { bandId: number | undefined }) => {
  if (!bandId) return {};
  const res = await fetch(
    `https://my-json-server.typicode.com/improvein/dev-challenge/albums?bandId=${bandId}`
  );
  const data = await res.json();
  return data;
};

export default getAlbums;
