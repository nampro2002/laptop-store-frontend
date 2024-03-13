import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ICheckedout } from "../types/types";
import axiosJwt from "../Util/axiosConfig";

interface initState {
  checkedoutList: ICheckedout[];
}

const initialState: initState = {
  checkedoutList: [],
};

export const getAllCheckedOut = createAsyncThunk(
  "checkedout/getAllCheckedOut",
  async (userId: string) => {
    const res = await axiosJwt.get(
      `http://localhost:8080/history?userId=${userId}`
    );
    return res.data;
  }
);
export const addCheckedOut = createAsyncThunk(
  "checkedout/addCheckedOut",
  async (newCheckedOut: ICheckedout) => {
    const res = await axiosJwt.post(
      `http://localhost:8080/history`,
      newCheckedOut
    );
    return res.data;
  }
);
// export const demo = createAsyncThunk(
//   "checkedout/demo",
//   async () => {
//     console.log("demo");
//     const res = await axios.get(
//       `http://localhost:8080/api/todo/demo`, {
//         headers: {
//           Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJuYW0iLCJyb2xlIjoiW1VTRVJdIiwiaWF0IjoxNjc4MDQ0NjY5LCJleHAiOjE2NzgxMzEwNjl9.4V3a7t65_yIv1wzodOIDN8JeuyEgnUFoCZYkeakCpDWTZUOXARbWiFo6fi5000uwxPagSG_P7okY_yqpgUdEYg`,
//         },
//        }
//     );
//     return res.data;
//   }
// );

const checkedoutSlice = createSlice({
  name: "checkedout",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllCheckedOut.fulfilled, (state, action) => {
        state.checkedoutList = action.payload;
      })
      .addCase(addCheckedOut.fulfilled, (state, action) => {
        state.checkedoutList.push(action.payload);
      });
    // .addCase(demo.fulfilled, (state, action) => {
    // console.log(action.payload);

    // });
  },
});

const checkedoutReducer = checkedoutSlice.reducer;
export const {} = checkedoutSlice.actions;
export default checkedoutReducer;
