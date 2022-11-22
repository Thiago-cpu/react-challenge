import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import LogoutButton from "../components/LogoutButton";

const Bar = styled(Box)`
  background-color: #0c6bf4;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
`;

const Navbar = () => {
  return (
    <Bar>
      <Typography variant="h6" color="white">
        Hi Admin
      </Typography>
      <LogoutButton />
    </Bar>
  );
};

export default Navbar;
