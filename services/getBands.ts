const getBands = async (page: number) => {
  const res = await fetch(
    `https://my-json-server.typicode.com/improvein/dev-challenge/bands?_page=${
      page + 1
    }&_limit=5`
  );
  const data = await res.json();
  return data;
};

export default getBands;
