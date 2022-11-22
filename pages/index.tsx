import { DataGrid, GridSortModel, GridColDef } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Box } from "@mui/material";
import SearchBar from "../components/SearchBar";
import getBands from "../services/getAlbums";
import BandDialog from "../components/BandDialog";
import { Band } from "../components/BandDialog";

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    disableColumnMenu: true,
    width: 150,
  },
  {
    field: "year",
    headerName: "Year",
    disableColumnMenu: true,
    width: 150,
  },
  {
    field: "country",
    headerName: "Country",
    disableColumnMenu: true,
    width: 150,
  },
];

export default function Home() {
  const [page, setPage] = useState(0);
  const [sortModel, setSortModel] = useState<GridSortModel>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [bandSelected, setBandSelected] = useState<Band>({});

  const { isLoading, data, isFetching } = useQuery({
    queryKey: ["bands", { page, sort: sortModel, searchQuery }],
    queryFn: () => getBands(page, sortModel, searchQuery),
  });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleSortModelChange = (sortModel: GridSortModel) => {
    setSortModel(sortModel);
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  const handleBandDialogClose = () => {
    setBandSelected({});
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: "20px",
        flexDirection: "column",
      }}
    >
      <SearchBar onSearch={handleSearch} />
      <div style={{ height: 400, width: 500 }}>
        <DataGrid
          onRowClick={({ row }) => setBandSelected(row)}
          loading={isLoading || isFetching}
          rows={data ?? []}
          columns={columns}
          pageSize={5}
          page={page}
          sortingMode="server"
          onPageChange={handlePageChange}
          onSortModelChange={handleSortModelChange}
          pagination
          rowCount={12}
          paginationMode="server"
          rowsPerPageOptions={[5]}
        />
      </div>
      <BandDialog
        open={Boolean(bandSelected?.id)}
        onClose={handleBandDialogClose}
        {...bandSelected}
      />
    </Box>
  );
}
