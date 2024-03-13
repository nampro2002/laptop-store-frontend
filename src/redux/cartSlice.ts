import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IProduct } from "../types/types";
import axiosJwt from "../Util/axiosConfig";

interface ICart {
  id: number;
  prodId: number;
  userId: number;
  quantity: number;
}
interface initState {
  cartList: ICart[];
}
const initialState: initState = {
  cartList: [],
};

export const getAllCart = createAsyncThunk(
  "cartList/getAllCart",
  async (userId: string) => {
    const jwtJson = localStorage.getItem("token"); // Lấy token từ Redux state
    const jwt = jwtJson ? JSON.parse(jwtJson) : {};
    const res = await axiosJwt.get(
      `http://localhost:8080/cart?userId=${userId}`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    // const res = await axios.get(`http://localhost:8080/cart?userId=${userId}`);
    return res.data;
  }
);
export const CheckCart = createAsyncThunk(
  "cartList/CheckCart",
  async (
    {
      productId,
      quantity,
      userId,
    }: { productId: number; quantity: number; userId: number },
    thunkAPI
  ) => {
    const res = await axiosJwt.get(
      `http://localhost:8080/cart?userId=${userId}`);
    const cartList = res.data;
    const productCart: Omit<ICart, "id"> = {
      prodId: productId,
      userId,
      quantity: quantity,
    };
    const isAdded = cartList.some((prod: ICart) => {
      if (prod.prodId === productId) {
        thunkAPI.dispatch(
          updateToCart({
            id: prod.id,
            productCart: {
              prodId: prod.prodId,
              quantity: prod.quantity + quantity,
            },
          })
        );
        return true;
      }
      return false;
    });
    if (!isAdded) {
      thunkAPI.dispatch(addToCart(productCart));
    }
  }
);
export const updateToCart = createAsyncThunk(
  "cartList/updateToCart",
  async ({
    id,
    productCart,
  }: {
    id: number;
    productCart: Omit<ICart, "id" | "userId">;
  }) => {
    const res = await axiosJwt.put<ICart>(
      `http://localhost:8080/cart/${id}`,
      productCart
    );
    return res.data;
  }
);
// export const addToCart = createAsyncThunk(
//   "cartList/addToCart",
//   async (productCart: Omit<ICart, "id">) => {
//     // console.log("productCart", productCart);
//     const res = await axios.post<ICart>(
//       "http://localhost:8080/cart",
//       productCart
//     );
//     return res.data;
//   }
// );

const addToCart = createAsyncThunk(
  "cartList/addToCart",
  async (productCart: Omit<ICart, "id">, { getState }) => {
    const res = await axiosJwt.post<ICart>(
      "http://localhost:8080/cart",
      productCart

    ); 
    return res.data;
  }
);
// const addToCart = createAsyncThunk(
//   "cartList/addToCart",
//   async (productCart: Omit<ICart, "id">, { getState }) => {
//     console.log("add");
//     const jwtJson = localStorage.getItem("token"); // Lấy token từ Redux state
//     const jwt = jwtJson ? JSON.parse(jwtJson) : {};
//     // const headers = jwt ? { Authorization: `Bearer ${jwt}` } : {}; // Tạo headers nếu token tồn tại
//     const res = await axios.post<ICart>(
//       "http://localhost:8080/api/cart",
//       productCart
//       // ,
//       // {
//       //   headers: {
//       //     Authorization: `Bearer ${jwt}`,
//       //   },
//       // }
//     ); // Gửi request với headers
//     // console.log("jwt", jwt);
//     // console.log("headers", headers);
//     // console.log("res.data", res.data);
//     return res.data;
//   }
// );

// export const decreaseQuantity = createAsyncThunk(
//   "cartList/decreaseQuantity",
//   async ({id, productCart}: {id:number , productCart: Omit<ICart, "id">}) => {
//     const res = await axios.put<ICart>(
//       `http://localhost:8080/cart/${id}`,
//       productCart
//     );
//     return res.data;
//   }
// );
// export const increaseQuantity = createAsyncThunk(
//   "cartList/increaseQuantity",
//   async ({id, productCart}: {id:number , productCart: Omit<ICart, "id">}) => {
//     const res = await axios.put<ICart>(
//       `http://localhost:8080/cart/${id}`,
//       productCart
//     );
//     return res.data;
//   }
// );

export const removeFromCart = createAsyncThunk(
  "cartList/removeFromCart",
  async (productCartId: number) => {
    const jwtJson = localStorage.getItem("token"); // Lấy token từ Redux state
    const jwt = jwtJson ? JSON.parse(jwtJson) : {};
    await axios.delete(
      `http://localhost:8080/cart?cartId=${productCartId}`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    return productCartId;
  }
);
export const removeAllFromCart = createAsyncThunk(
  "cartList/removeAllFromCart",
  async (userId: number) => {
    const jwtJson = localStorage.getItem("token"); // Lấy token từ Redux state
    const jwt = jwtJson ? JSON.parse(jwtJson) : {};
    await axios.delete(`http://localhost:8080/cartAll?userId=${userId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return userId;
  }
);

const cartSlice = createSlice({
  name: "cartList",
  initialState,
  reducers: {
    logOutRemoveCart: (state) => {
      state.cartList = [];
    },
    // removeFromCartReducer: (state, action) => {
    //   state.cartList = state.cartList.filter(
    //     (prod) => prod.userId !== action.payload
    //   );
    // },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllCart.fulfilled, (state, action) => {
        state.cartList = action.payload;
        // console.log("state.cartList",state.cartList);
      })
      .addCase(CheckCart.fulfilled, () => {})
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cartList.push(action.payload);
      })
      .addCase(updateToCart.fulfilled, (state, action) => {
        state.cartList.some((product) => {
          if (product.prodId === action.payload.prodId) {
            product.quantity = action.payload.quantity;
            return true;
          }
          return false;
        });
      })
      // .addCase(decreaseQuantity.fulfilled, (state, action) => {
      //   state.cartList.some((product) => {
      //     if (product.prodId === action.payload.prodId) {
      //       product.quantity -= 1;
      //       return true;
      //     }
      //     return false;
      //   });
      // })
      // .addCase(increaseQuantity.fulfilled, (state, action) => {
      //   state.cartList.some((product) => {
      //     if (product.prodId === action.payload.prodId) {
      //       product.quantity += 1;
      //       return true;
      //     }
      //     return false;
      //   });
      // })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        console.log("action.payload", action.payload);
        state.cartList = state.cartList.filter(
          (prod) => prod.id !== action.payload
        );
        console.log("state.cartList", state.cartList);
      })
      .addCase(removeAllFromCart.fulfilled, (state, action) => {
        state.cartList = [];
      });
  },
});
const cartReducer = cartSlice.reducer;
export const { logOutRemoveCart } = cartSlice.actions;
export default cartReducer;
