import {
  Box,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { ChangeEventHandler, useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import httpClient from "../utils/httpClient";
import useLocalStorage from "../hooks/useLocalStorage";
import { useRouter } from "next/router";

const Container = styled(Box)`
  width: 100%;
  background: #0089ff;
  flex: 1;
  display: flex;
  place-content: center;
`;

const InputContainer = styled(Box)`
  align-self: center;
  background: white;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 24px 24px 0px 24px;
  border-radius: 5px;
`;

export default function Login() {
  const router = useRouter();
  const [jwt, saveJwt] = useLocalStorage("jwt", "");
  const [{ username, password }, setFormValues] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isLogging, setIsLogging] = useState(false);

  const handleShowPassword = () => setShowPassword((prev) => !prev);

  const clearForm = () => {
    setFormValues({
      username: "",
      password: "",
    });
  };

  const handleChange: (
    field: "username" | "password"
  ) => ChangeEventHandler<HTMLInputElement> = (field) => (e) => {
    if (showError) setShowError(false);

    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [field]: e.target.value,
    }));
  };

  const handleLogin = async () => {
    try {
      setIsLogging(true);
      const { jwt } = await httpClient(
        `api/login?username=${username}&password=${password}`
      );
      if (typeof jwt === "string") {
        saveJwt(jwt);
        router.push({
          pathname: "/",
        });
      }
    } catch {
      clearForm();
      setShowError(true);
    } finally {
      setIsLogging(false);
    }
  };

  return (
    <Container>
      <InputContainer>
        <TextField
          placeholder="username"
          value={username}
          onChange={handleChange("username")}
        />
        <TextField
          value={password}
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleShowPassword}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          placeholder="password"
          onChange={handleChange("password")}
        />
        <Box>
          <Button
            sx={{ width: "100%" }}
            variant="contained"
            onClick={handleLogin}
            disabled={isLogging}
          >
            Login
          </Button>

          <Typography
            sx={{
              opacity: showError ? "100%" : "0%",
              marginTop: "5px",
              color: "red",
            }}
          >
            Wrong username or password. try again
          </Typography>
        </Box>
      </InputContainer>
    </Container>
  );
}
