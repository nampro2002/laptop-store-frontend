import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ICategory, IProduct } from "../types/types";
import axiosJwt from "../Util/axiosConfig";

interface initState {
  productList: IProduct[];
  category: ICategory[];
  // productCarousel: IProduct[];
}

const initialState: initState = {
  productList: [],
  category: [],
  // productCarousel: [],
};

// export const getTypicalProduct = createAsyncThunk(
//   "products/getTypicalProduct",
//   async () => {
//     const res = await axios.get("http://localhost:3000/products?_limit=8");
//     return res.data;
//   }
// );
export const getAllProduct = createAsyncThunk(
  "products/getAllProduct",
  async () => {
    const res = await axios.get("http://localhost:8080/products");
    return res.data;
  }
);
export const getAllCategory = createAsyncThunk(
  "products/getAllCategory",
  async () => {
    const res = await axios.get("http://localhost:8080/category");
    return res.data;
  }
);
export const updateProductRating = createAsyncThunk(
  "products/updateProductRating",
  async ({ productId, rate }: { productId: number; rate: number }) => {
    const res = await axiosJwt.put(
      `http://localhost:8080/product/rate/${productId}`,
      {
        rate,
      }
    );
    return res.data;
  }
);
// export const random = createAsyncThunk(
//   "products/random",
//   async ({ productId, price }: { productId: string; price: number }) => {
//     const res = await axios.patch(
//       `http://localhost:3000/products/${productId}`,
//       {
//         price,
//       }
//     );
//     return res.data;
//   }
// );

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // .addCase(getTypicalProduct.fulfilled, (state, action) => {
      //   state.productCarousel = action.payload;
      // })
      .addCase(getAllProduct.fulfilled, (state, action) => {
        state.productList = action.payload;
      })
      .addCase(getAllCategory.fulfilled, (state, action) => {
        state.category = action.payload;
      })
      // .addCase(random.fulfilled, (state, action) => {
      //   state.category = action.payload;
      // })
      .addCase(updateProductRating.fulfilled, (state, action) => {
        state.productList.some((product) => {
          if (product.id === action.payload.id) {
            product.rate = action.payload.rate
            return true;
          }
          return false;
        });
      });
  },
});
const productReducer = productSlice.reducer;
const {} = productSlice.actions;
export default productReducer;
