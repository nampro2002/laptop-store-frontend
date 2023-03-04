import { Button, Checkbox, IconButton, Modal, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import ProductComponent from "../../components/ProductComponent";
import { getAllCart } from "../../redux/cartSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  getAllProduct,
  //getTypicalProduct,
  // random,
} from "../../redux/productSlice";
import { RootState } from "../../redux/store";
import {
  // getAllUser,
  GetUserInfo,
} from "../../redux/userSlice";
import CloseIcon from "@mui/icons-material/Close";
function Products() {
  const userInfo = JSON.parse(localStorage.getItem("user") || "{}");
  const [filters, setFilters] = useState({
    cateFilter: 0,
    sortFilter: 0,
  });
  const listCategory = useAppSelector(
    (state: RootState) => state.products.category
  );
  const productList = useAppSelector(
    (state: RootState) => state.products.productList
  );

  let listOut = productList;

  if (filters.cateFilter !== 0 && filters.sortFilter === 0) {
    listOut = productList.filter(
      (prod) => prod.categoryId === filters.cateFilter
    );
  }
  if (filters.sortFilter !== 0 && filters.cateFilter === 0) {
    switch (filters.sortFilter) {
      case 10:
        listOut = productList.slice().sort((prod1, prod2) => {
          return prod1.price - prod2.price;
        });
        break;

      case 20:
        listOut = productList.slice().sort((prod1, prod2) => {
          return prod2.price - prod1.price;
        });
        break;

      // case 30:
      //   listOut = productList.sort((prod1, prod2)=>{
      //     return prod1.price - prod2.price
      //   })
      //   break;

      // case 40:
      //   listOut = productList.sort((prod1, prod2)=>{
      //     return prod1.price - prod2.price
      //   })
      //   break;

      default:
        break;
    }
  }

  const handleFilterByCategory = (cateId: number) => {
    setFilters({
      cateFilter: filters.cateFilter === cateId ? 0 : cateId,
      sortFilter: 0,
    });
    // setFilters({
    //   ...filters,
    //   cateFilter: filters.cateFilter === "" ? cate : "",
    // });
  };
  const handleSort = (event: SelectChangeEvent<any>) => {
    setFilters({
      cateFilter: 0,
      sortFilter:
        filters.sortFilter === Number.parseInt(event.target.value)
          ? 0
          : Number.parseInt(event.target.value),
    });
    // setFilters({
    //   ...filters,
    //   sortFilter: Number.parseInt(event.target.value),
    // });
  };

  // dispatch(random())
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(GetUserInfo(userInfo));
    dispatch(getAllProduct());
    if (userInfo.id) {
      dispatch(getAllCart(userInfo.id));
    }
    // productList.map(prod=>{
    //   let randomPrice = Math.floor(Math.random() * (30000000 - 15000000) ) + 15000000
    //  dispatch(random({productId : prod.id, price : randomPrice}))
    // })
    // dispatch(getAllUser());
  }, [dispatch]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: {
      xl: "400px",
      lg: "400px",
      md: "400px",
      sm: "400px",
      xs: "250px",
    },
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    paddingX: "20px",
    paddingBottom: "10px",
    paddingTop: "0px",
  };
  return (
    <Box>
      <Typography
        variant="h2"
        fontWeight="900"
        color="white"
        align="center"
        mt="2%"
        mb="6%"
      >
        All Products
      </Typography>

      <Box width="95%" margin="0 auto" position="relative">
        <Box>
          <Button
            variant="outlined"
            sx={{
              color: "#fff",
              border: "2px solid #fff",
              paddingY: "7px",
              paddingX: "20px",
              // borderRadius: "7px",
              "&:hover": {
                border: "2px solid #000",
              },
              fontWeight: "bold",
              marginBottom: "20px",
              display: {
                xl: "none",
                lg: "none",
                md: "none",
                sm: "block",
                xs: "block",
              },
            }}
            onClick={handleOpen}
          >
            Filter
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box width="90%" sx={style}>
              <Stack direction="row" justifyContent="flex-end">
                <IconButton onClick={handleClose}>
                  <CloseIcon fontSize="large" sx={{ color: "#000" }} />
                </IconButton>
              </Stack>
              <List
                sx={{
                  width: "100%",
                  bgcolor: "background.paper",
                  border: "2px solid #eaeaea",
                }}
                //   component="nav"
                subheader={
                  <ListSubheader component="div" id="nested-list-subheader">
                    Sort by
                  </ListSubheader>
                }
              >
                <ListItem>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    fullWidth
                    sx={{
                      borderRadius: "0",
                      fontSize: "13px",
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        border: "1px solid #484850",
                        borderRadius: "0",
                      },
                    }}
                    defaultValue={0}
                    onChange={(e) => {
                      handleSort(e);
                      handleClose();
                    }}
                    value={filters.sortFilter}
                  >
                    <MenuItem value={0}>
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>
                      {"(Giá)"} Thấp -{">"} Cao
                    </MenuItem>
                    <MenuItem value={20}>
                      {"(Giá)"} Cao -{">"} Thấp{" "}
                    </MenuItem>
                    {/* <MenuItem value={30}>
                      {"(Rating)"} Cao -{">"} Thấp{" "}
                    </MenuItem>
                    <MenuItem value={40}>
                      {"(Rating)"} Thấp -{">"} Cao{" "}
                    </MenuItem> */}
                  </Select>
                </ListItem>
                <ListSubheader component="div" id="nested-list-subheader">
                  Category
                </ListSubheader>
                {listCategory.map((cate, index) => (
                  <ListItemButton
                    key={index}
                    onClick={() => {
                      handleFilterByCategory(cate.id);
                      handleClose();
                    }}
                    sx={{
                      bgcolor:
                        cate.id === filters.cateFilter ? "#e3e3e3" : "#fff",
                    }}
                  >
                    <ListItemText primary={cate.name} />
                    <Checkbox
                      checked={cate.id === filters.cateFilter}
                      sx={{
                        "&.Mui-checked": {
                          color: "#000",
                        },
                      }}
                    />
                  </ListItemButton>
                ))}
              </List>
            </Box>
          </Modal>
        </Box>
        <Grid container>
          <Grid
            item
            lg={2}
            md={2}
            sx={{
              display: {
                xl: "block",
                lg: "block",
                md: "block",
                sm: "none",
                xs: "none",
              },
            }}
          >
            <Box width="90%">
              <List
                sx={{
                  width: "100%",
                  bgcolor: "background.paper",
                  border: "2px solid #eaeaea",
                }}
                //   component="nav"
                subheader={
                  <ListSubheader component="div" id="nested-list-subheader">
                    Sort by
                  </ListSubheader>
                }
              >
                <ListItem>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    fullWidth
                    sx={{
                      borderRadius: "0",
                      fontSize: "13px",
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        border: "1px solid #484850",
                        borderRadius: "0",
                      },
                    }}
                    defaultValue={0}
                    onChange={handleSort}
                    value={filters.sortFilter}
                  >
                    <MenuItem value={0}>
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>
                      {"(Giá)"} Thấp -{">"} Cao
                    </MenuItem>
                    <MenuItem value={20}>
                      {"(Giá)"} Cao -{">"} Thấp{" "}
                    </MenuItem>
                    {/* <MenuItem value={30}>
                      {"(Rating)"} Cao -{">"} Thấp{" "}
                    </MenuItem>
                    <MenuItem value={40}>
                      {"(Rating)"} Thấp -{">"} Cao{" "}
                    </MenuItem> */}
                  </Select>
                </ListItem>
                <ListSubheader component="div" id="nested-list-subheader">
                  Category
                </ListSubheader>
                {listCategory.map((cate, index) => (
                  <ListItemButton
                    key={index}
                    onClick={() => handleFilterByCategory(cate.id)}
                    sx={{
                      bgcolor:
                        cate.id === filters.cateFilter ? "#e3e3e3" : "#fff",
                    }}
                  >
                    <ListItemText primary={cate.name} />
                    <Checkbox
                      checked={cate.id === filters.cateFilter}
                      sx={{
                        "&.Mui-checked": {
                          color: "#000",
                        },
                      }}
                    />
                  </ListItemButton>
                ))}
              </List>
            </Box>
          </Grid>
          <Grid item lg={10} md={10} sm={12}>
            <Grid container justifyContent="flex-start">
              {listOut?.map((product) => (
                <Grid item lg={3} md={4} sm={6} key={product.id}>
                  <ProductComponent product={product} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Products;
