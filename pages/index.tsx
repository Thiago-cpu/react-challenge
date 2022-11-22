import { DataGrid } from "@mui/x-data-grid";
import getBands from "../services/getBands";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function Home() {
  const [page, setPage] = useState(0);

  const { isLoading, data, isFetching } = useQuery({
    queryKey: ["bands", { page }],
    queryFn: () => getBands(page),
  });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div style={{ height: 400 }}>
      <DataGrid
        loading={isLoading || isFetching}
        rows={data ?? []}
        columns={[]}
        pageSize={5}
        page={page}
        onPageChange={handlePageChange}
        rowsPerPageOptions={[5]}
        rowCount={12}
      />
    </div>
  );
}
