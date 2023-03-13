import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IUpdatePassword, IUser, IUserLogin } from "../types/types";
import axiosJwt from "../Util/axiosConfig";

interface initState {
  users: IUser[];
  user: IUser;
}

const initialState: initState = {
  users: [],
  user: {
    id: 0,
    name: "",
    phone: "",
    username: "",
    imgUrl: "",
    address: "",
  },
};

// export const getAllUser = createAsyncThunk("user/getAllUser", async () => {
//   const res = await axios.get("https://laptop-store-backend-production.up.railway.app/user/username");
//   return res.data;
// });
export const register = createAsyncThunk(
  "user/register",
  async (newUser: Omit<IUser, "id">) => {
    const jwtJson = localStorage.getItem("token");
    const jwt = jwtJson ? JSON.parse(jwtJson) : {};
    let res;
    try {
      res = await axios.post(
        "https://laptop-store-backend-production.up.railway.app/register",
        newUser
      );
    } catch (error: any) {
      throw new Error(error.response.data);
    }

    return res?.data;
  }
);
export const login = createAsyncThunk(
  "user/login",
  async (loginInfo: IUserLogin) => {
    let res;
    try {
      res = await axios.post(
        "https://laptop-store-backend-production.up.railway.app/login",
        loginInfo
      );
    } catch (error: any) {
      throw new Error(error);
    }
    return res.data;
  }
);
export const updateInfo = createAsyncThunk(
  "user/updateInfo",
  async ({
    userId,
    updatedInfo,
  }: {
    userId: string;
    updatedInfo: Omit<IUser, "id" | "password" | "username">;
  }) => {
    let res;
    try {
      res = await axiosJwt.put(
        `https://laptop-store-backend-production.up.railway.app/user/${userId}`,
        updatedInfo
      );
      console.log(res);
    } catch (error: any) {
      throw new Error(error.response.data);
    }
    return res.data;
  }
);
export const saveAddress = createAsyncThunk(
  "user/saveAddress",
  async ({ userId, address }: { userId: string; address: string }) => {
    const res = await axiosJwt.patch(
      `https://laptop-store-backend-production.up.railway.app/user/${userId}`,
      {
        address: address,
      }
    );
    return res.data;
  }
);
export const updateAvatar = createAsyncThunk(
  "user/updateAvatar",
  async ({
    userId,
    updatedInfo,
  }: {
    userId: string;
    updatedInfo: Omit<IUser, "id" | "password" | "username">;
  }) => {
    const res = await axiosJwt.put(
      `https://laptop-store-backend-production.up.railway.app/user/${userId}`,
      updatedInfo
    );
    console.log(res);

    return res.data;
  }
);
export const updatePassword = createAsyncThunk(
  "user/updatePassword",
  async ({
    userId,
    updatedPassword,
  }: {
    userId: string;
    updatedPassword: IUpdatePassword;
  }) => {
    let res;
    try {
      console.log("updatepass");

      res = await axiosJwt.patch(
        `https://laptop-store-backend-production.up.railway.app/user/${userId}`,
        updatedPassword
      );
    } catch (error: any) {
      console.log(error);
      throw new Error(error.response.data);
    }

    return res.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    Start() {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
    GetUserInfo(state, action) {
      state.user = action.payload;
    },
    AcceptLogin(state, action) {
      const userInfo = JSON.stringify(action.payload);
      localStorage.setItem("user", userInfo);
      state.user = action.payload;
    },
    Logout(state) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      state.user = {
        id: 0,
        name: "",
        phone: "",
        username: "",
        imgUrl: "",
        address: "",
      };
    },
  },
  extraReducers(builder) {
    builder
      // .addCase(getAllUser.fulfilled, (state, action) => {
      //   state.users = action.payload;
      // })
      .addCase(register.fulfilled, (state, action) => {
        // state.users.push(action.payload);
      })
      .addCase(login.fulfilled, (state, action) => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        const accessToken = JSON.stringify(action.payload.accessToken);
        localStorage.setItem("token", accessToken);
        state.user = action.payload.userInfo;
        const userInfo = JSON.stringify(action.payload.userInfo);
        localStorage.setItem("user", userInfo);
      })
      .addCase(updateInfo.fulfilled, (state, action) => {
        localStorage.removeItem("user");
        const userInfo = JSON.stringify(action.payload);
        localStorage.setItem("user", userInfo);
        state.user = action.payload;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        localStorage.removeItem("user");
        const userInfo = JSON.stringify(action.payload);
        localStorage.setItem("user", userInfo);
        state.user = action.payload;
      })
      .addCase(updateAvatar.fulfilled, (state, action) => {
        localStorage.removeItem("user");
        const userInfo = JSON.stringify(action.payload);
        localStorage.setItem("user", userInfo);
        state.user = action.payload;
      })
      .addCase(saveAddress.fulfilled, (state, action) => {
        localStorage.removeItem("user");
        const userInfo = JSON.stringify(action.payload);
        localStorage.setItem("user", userInfo);
        state.user = action.payload;
      });
  },
});

const userReducer = userSlice.reducer;
export const { AcceptLogin, Logout, GetUserInfo,Start } = userSlice.actions;
export default userReducer;
