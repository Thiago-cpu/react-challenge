import type { GridSortModel } from "@mui/x-data-grid";

const getBands = async (
  page: number,
  sortModel: GridSortModel,
  searchQuery: string
) => {
  const sortQuery = `_sort=${sortModel
    .map(({ field }) => field)
    .join(",")}&_order=${sortModel.map(({ sort }) => sort).join(",")}`;

  const search = searchQuery ? `&name=${searchQuery}` : "";

  const res = await fetch(
    `https://my-json-server.typicode.com/improvein/dev-challenge/bands?_page=${
      page + 1
    }&_limit=5&${sortQuery}${search}`
  );
  const data = await res.json();
  return data;
};

export default getBands;
