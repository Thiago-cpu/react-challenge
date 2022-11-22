import { Button } from "@mui/material";
import useLocalStorage from "../hooks/useLocalStorage";

const LogoutButton = () => {
  const [, saveJwt] = useLocalStorage("jwt", "");

  const handleLogout = () => {
    saveJwt("");
  };

  return (
    <Button variant="contained" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
