import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ICheckedout } from "../types/types";

interface initState {
  checkedoutList: ICheckedout[];
}

const initialState: initState = {
  checkedoutList: [],
};

export const getAllCheckedOut = createAsyncThunk(
  "checkedout/getAllCheckedOut",
  async (userId: string) => {
    const res = await axios.get(
      `http://localhost:8080/history?userId=${userId}`
    );
    return res.data;
  }
);
export const addCheckedOut = createAsyncThunk(
  "checkedout/addCheckedOut",
  async (newCheckedOut: ICheckedout) => {
    const res = await axios.post(
      `http://localhost:8080/history`,
      newCheckedOut
    );
    return res.data;
  }
);

const checkedoutSlice = createSlice({
  name: "checkedout",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAllCheckedOut.fulfilled, (state, action) => {
      state.checkedoutList = action.payload;
    }).addCase(addCheckedOut.fulfilled, (state, action) => {
      state.checkedoutList.push(action.payload)
    });
  },
});

const checkedoutReducer = checkedoutSlice.reducer;
export const {} = checkedoutSlice.actions;
export default checkedoutReducer;
