import { FC } from "react";
import { Dialog, DialogTitle, DialogContent, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import getAlbums from "../services/getBands";

export interface Band {
  id?: number;
  name?: string;
  year?: number;
  genreCode?: string;
  country?: string;
  members?: { name: string }[];
}

type Props = Band & {
  open: boolean;
  onClose?: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void;
};

const BandDialog: FC<Props> = (props) => {
  const { id, name, year, members = [], country, open, onClose } = props;
  const { isLoading, data } = useQuery({
    queryKey: ["albums", id],
    queryFn: () => getAlbums({ bandId: id }),
  });
  const albums = Array.isArray(data) ? data : [];
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{name}</DialogTitle>
      <DialogContent>
        <Typography>Year: {year}</Typography>
        <Typography>
          Members: {members.map(({ name }) => name).join(", ")}
        </Typography>
        <Typography>Country: {country}</Typography>
        <Typography>
          Albums:
          {isLoading
            ? "..."
            : albums.length === 0
            ? "There are no saved albums for this band."
            : albums
                .map(({ name, year }: any) => `${name} from ${year}`)
                .join(", ")}
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

export default BandDialog;
