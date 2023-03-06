import { Box, Button, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CartComponent from "../../components/CartComponent";
import { getAllCart, removeAllFromCart } from "../../redux/cartSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getAllCategory, getAllProduct } from "../../redux/productSlice";
import { RootState } from "../../redux/store";
import { GetUserInfo } from "../../redux/userSlice";
import { formatPrice } from "../../Util/formatPrice";
import { Toast } from "../../Util/toastify";
// import "./style.css";

function Cart() {
  const userInfo = JSON.parse(localStorage.getItem("user") || "{}");
  const userState = useAppSelector((state: RootState) => state.user.user);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(GetUserInfo(userInfo));
    //  dispatch(getTypicalProduct());
    dispatch(getAllProduct());
    dispatch(getAllCategory());
    if (userInfo.id) {
      dispatch(getAllCart(userInfo.id));
    }
    // dispatch(getAllUser());
  }, [dispatch]);
  // const dispatch = useAppDispatch();
  const cartList = useAppSelector((state: RootState) => state.cart.cartList);
  const navigate = useNavigate();
  const cartLength = cartList.length;
  const productList = useAppSelector(
    (state: RootState) => state.products.productList
  );
  console.log("cartList", cartList);
  console.log("productList", productList);

  let cartPorductList: any[] = [];
  if (cartList.length > 0 && productList.length > 0) {
    cartPorductList = cartList.map((cart) => {
      const product = productList.find((prod) => prod.id === cart.prodId);
      console.log(product);
      if (product) {
        const imgArr = product.imageUrl.split(" ")
        return {
          id: cart.id,
          prodId: cart.prodId,
          quantity: cart.quantity,
          name: product.name,
          price: product.price,
          imageUrl: imgArr[0],
        };
      } else {
        console.log(product);
        return {
          id: 0,
          prodId: 0,
          quantity: 1,
          name: "abc",
          price: 0,
          imageUrl: "none",
        };
      }
    });
  }
  const totalAll = cartPorductList.reduce(
    (accumulator, currentValue) =>
      accumulator + currentValue.price * currentValue.quantity,
    0
  );

  const handleRemoveAll = () => {
    dispatch(removeAllFromCart(userInfo.id))
      .unwrap()
      .then(() => {
        Toast.notify(`Cập nhật giỏ hàng thành công`);
      })
      .catch((error) => {          
        Toast.error("Lỗi");
      });
  };

  const handleMoveTo = (path: string) => {
    return navigate(path);
  };
  return (
    <Box mb="200px">
      <Typography
        variant="h2"
        fontWeight="900"
        color="white"
        align="center"
        mt="2%"
        mb="2%"
      >
        Cart
      </Typography>
      <Box bgcolor="#fff" p="35px" width="80%" margin="0 auto">
        <Box
          display="flex"
          sx={{
            flexDirection: {
              xl: "row",
              lg: "row",
              md: "column",
              sm: "column",
              xs: "column",
            },
            justifyContent: "space-between",
          }}
        >
          <Stack
            paddingRight="5px"
            direction="column"
            spacing="10px"
            sx={{
              width: {
                xl: "calc(100% - 300px)",
                lg: "calc(100% - 300px)",
                md: "100%",
                sm: "100%",
                xs: "100%",
              },
            }}
          >
            <Typography
              variant="h5"
              fontWeight="600"
              fontSize="25px"
              mb="20px"
              sx={{
                fontSize: {
                  xl: "25px",
                  lg: "25px",
                  md: "22px",
                  sm: "20px",
                  xs: "16px",
                },
              }}
            >
              BẠN CÓ {cartLength} SẢN PHẨM TRONG GIỎ HÀNG
            </Typography>
            {cartPorductList.map((component, index) => (
              <CartComponent cartProduct={component} key={index} />
            ))}
          </Stack>
          <Box
            position="relative"
            sx={{
              // position: {
              //   xl: "fixed",
              //   lg: "fixed",
              //   md: "relative",
              //   // sm: "13px",
              //   // xs: "1",
              // },
              width: {
                xl: "250px",
                lg: "250px",
                md: "100%",
                // sm: "13px",
                // xs: "1",
              },
            }}
            bgcolor="#fff"
            p="10px"
          >
            <Stack direction="column" spacing="20px">
              <Stack>
                <Typography variant="h5" fontWeight="600" fontSize="20px">
                  THÔNG TIN GIỎ HÀNG
                </Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="h6" fontWeight="600" fontSize="15px">
                  SỐ LƯỢNG SẢN PHẨM
                </Typography>
                <Typography variant="h6" fontWeight="600" fontSize="15px">
                  {cartLength}
                </Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="h6" fontWeight="600" fontSize="15px">
                  TỔNG
                </Typography>
                <Typography
                  variant="h6"
                  fontWeight="600"
                  fontSize="20px"
                  color="red"
                >
                  {formatPrice(totalAll)}
                </Typography>
              </Stack>
              <Button
                onClick={() => handleMoveTo("/confirmcart")}
                sx={{
                  paddingY: "10px",
                  borderRadius: "0",
                  color: "#fff",
                  bgcolor: "#000",
                  "&:hover": {
                    bgcolor: "#000",
                  },
                }}
              >
                XÁC NHẬN ĐƠN HÀNG
              </Button>
              <Button
                onClick={handleRemoveAll}
                sx={{
                  paddingY: "10px",
                  borderRadius: "0",
                  color: "#fff",
                  bgcolor: "red",
                  "&:hover": {
                    bgcolor: "red",
                  },
                }}
              >
                XÓA GIỎ HÀNG
              </Button>
              <Button
                onClick={() => handleMoveTo("/")}
                variant="outlined"
                sx={{
                  border: "1px solid #000",
                  paddingY: "10px",
                  borderRadius: "0",
                  color: "#000",
                  bgcolor: "#fff",
                  "&:hover": {
                    bgcolor: "#fff",
                  },
                }}
              >
                VỀ TRANG CHỦ
              </Button>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Cart;
