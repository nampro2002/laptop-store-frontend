import { IconButton } from "@mui/joy";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import {
  //  getAllUser,
  login
} from "../../redux/userSlice";
import { Toast } from "../../Util/toastify";

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
interface LoginInfo {
  username: string;
  password: string;
}
function Login() {
  const [error, setError] = useState("");
  const userList = useAppSelector((state: RootState) => state.user.users);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = (userLogin: { username: string; password: string }) => {
    setError("");
    dispatch(login(userLogin))
      .unwrap()
      .then((res) => {
        setTimeout(() => {
          return navigate("/");
        }, 1500);
        Toast.notify("đăng nhập thành công");
      })
      .catch((error) => {
        Toast.error("username hoặc password không đúng");
        console.log(error);
        
      });
  };
  // useEffect(() => {
  //   dispatch(getAllUser());
  // }, [dispatch]);
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("bạn chưa nhập username"),
      password: Yup.string().required("bạn chưa nhập password"),
    }),
    onSubmit: () => {
      const loginInfo = {
        username: formik.values.username,
        password: formik.values.password,
      };

      handleLogin(loginInfo);
    },
    // onSubmit: () => {
    //   const loginInfo = {
    //     username: formik.values.username,
    //     password: formik.values.password,
    //   };
    //   const userLogin = userList.find(
    //     (user) =>
    //       user.username === loginInfo.username &&
    //       user.password === loginInfo.password
    //   );
    //   if (userLogin) {
    //     handleLogin(userLogin);
    //     Toast.notify("đăng nhập thành công");
    //   } else {
    //     setError("Mật khẩu không đúng");
    //   }
    // },
  });
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  return (
    <Box>
      <Box width="40%" margin="0 auto" bgcolor="#fff" p="30px">
        <Stack>
          <Box>
            <Typography
              variant="h6"
              fontWeight="600"
              fontSize="30px"
              mb="20px"
              align="center"
            >
              LOGIN
            </Typography>
            <Stack direction="column" spacing="30px">
              <form onSubmit={formik.handleSubmit}>
                <Stack direction="column" spacing="30px">
                  <Stack
                    direction="column"
                    justifyContent="space-between"
                    alignItems="flex-start"
                  >
                    <Stack direction="row" alignItems="center" spacing="20px">
                      <Typography variant="h6" fontWeight="400" fontSize="19px">
                        USERNAME
                      </Typography>
                      {formik.errors.username && formik.touched.username && (
                        <Typography color="red" fontWeight="600">
                          {formik.errors.username}
                        </Typography>
                      )}
                    </Stack>
                    <TextField
                      placeholder="username"
                      fullWidth
                      sx={{
                        "& fieldset": { borderRadius: "0" },
                        "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                          border: "1px solid #000",
                          borderRadius: "0",
                        },
                      }}
                      name="username"
                      value={formik.values.username}
                      onChange={formik.handleChange}
                    />
                  </Stack>
                  <Stack direction="column" justifyContent="space-between">
                    <Stack direction="row" alignItems="center" spacing="20px">
                      <Typography variant="h6" fontWeight="400" fontSize="19px">
                        PASSWORD
                      </Typography>
                      {formik.errors.password && formik.touched.password && (
                        <Typography color="red" fontWeight="600">
                          {formik.errors.password}
                        </Typography>
                      )}
                      {error && (
                        <Typography color="red" fontWeight="600">
                          {error}
                        </Typography>
                      )}
                    </Stack>
                    <TextField
                      fullWidth
                      placeholder="password"
                      type={showPassword ? "text" : "password"}
                      sx={{
                        "& fieldset": { borderRadius: "0" },
                        "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                          border: "1px solid #000",
                          borderRadius: "0",
                        },
                      }}
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      InputProps={{ // <-- This is where the toggle button is added.
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  </Stack>
                  <Box px="20%">
                    <Stack direction="column" spacing="20px">
                      <Button
                        type="submit"
                        sx={{
                          height: "50px",
                          paddingY: "10px",
                          borderRadius: "0",
                          color: "#fff",
                          bgcolor: "#000",
                          fontSize: "19px",
                          "&:hover": {
                            bgcolor: "#000",
                          },
                        }}
                      >
                        LOGIN
                      </Button>
                    </Stack>
                  </Box>
                </Stack>
              </form>
              <Box px="20%">
                <Stack direction="column" spacing="20px">
                  <Button
                    onClick={() => {
                      return navigate("/signup");
                    }}
                    sx={{
                      height: "50px",
                      paddingY: "10px",
                      borderRadius: "0",
                      color: "#fff",
                      bgcolor: "red",
                      fontSize: "19px",
                      "&:hover": {
                        bgcolor: "red",
                      },
                    }}
                  >
                    SIGN UP
                  </Button>
                </Stack>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}

export default Login;
