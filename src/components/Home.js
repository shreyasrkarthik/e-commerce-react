import {
  AccountCircle,
  Add, AddCircleOutline,
  LoginRounded,
  Logout,
  PeopleAlt,
  Search,
  ShoppingCart,
} from "@mui/icons-material";

import Close from "@mui/icons-material/Close";

import {
  AppBar,
  Badge,
  IconButton,
  InputBase,
  Paper,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";

import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import ErrorSnackbar from "./ErrorSnackbar";

import "../css/Home.css";
import CreateProduct from "./CreateProduct";
import Orders from "./Cart";
const mongoose = require("mongoose");

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [createProduct, setCreateProduct] = useState(false);
  const [orders, setOrders] = useState(new Set());
  const [openOrders, setOpenOrders] = useState(false);
  const [pastOrders, setPastOrders] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    console.log("URI", process.env.REACT_APP_API_URL);
    const defaultReview = {
      content: "Good product",
      created: new Date(),
      updated: new Date(),
    };

    const defaultSeller = {
      companyName: "TATA Company",
      address: "Mumbai, India, 400001",
      ratings: 3.9,
      establishedYear: 2005,
    };

    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}product`);
        const data = await response.json();
        const productsAPI = await fetch(`https://fakestoreapi.com/products`);
        const dataAPI = await productsAPI.json();

        const mappedAPIData = dataAPI.map((data) => ({
          _id: mongoose.Types.ObjectId(),
          name: data.title,
          description: data.description,
          price: data.price,
          category: data.category,
          image: data.image,
          quantity: data.rating.count,
          reviews: [defaultReview],
          sellers: [defaultSeller],
          source: "thirdparty_api",
        }));

        const finalData = [...mappedAPIData, ...data.products];

        setProducts(finalData);
      } catch (error) {
        // handle error
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}user/${window.localStorage.getItem(
            "user"
          )}/orders`
        );
        const data = await response.json();

        setPastOrders([...data.orders]);
      } catch (error) {
        // handle error
      }
    };
    fetchData();
    fetch(
      `${process.env.REACT_APP_API_URL}user/${window.localStorage.getItem(
        "user"
      )}/orders`
    )
      .then((res) =>
        res.json().then((data) => {
          setPastOrders(data.orders);
        })
      )
      .catch((error) => {
        console.error("Error", error);
      });
  }, []);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const handleSearch = (e) => setSearch(e.target.value);

  const searchProducts = () => {
    if (search.length > 0) {
      setFilteredProducts(
        products.filter((product) => product.name.includes(search))
      );
    } else {
      setFilteredProducts(products);
    }
  };

  const logout = () => {
    window.localStorage.removeItem("user");
    window.localStorage.removeItem("userType");
    navigate("/");
  };

  const profile = () => {
    navigate("/profile");
  };

  const login = () => {
    navigate("/login");
  };

  const addProduct = () => {
    navigate("/add-product");
  };

  const showUsers = () => {
    navigate("/users");
    console.log("test");
  };

  const deleteProduct = async (id) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}product/${id}`,
      {
        method: "DELETE",
      }
    );

    const { success } = await response.json();

    if (success) {
      setProducts((oldProducts) => oldProducts.filter(({ _id }) => _id !== id));
    } else {
      setErrorMsg("Cannot delete product");
      setError(true);
    }
  };

  const updateProduct = (id, updatedProduct) => {
    const callback = (oldProducts) => {
      return oldProducts.map((product) => {
        if (product._id === id) return { ...product, ...updatedProduct };
        else return product;
      });
    };
    setProducts(callback);
  };

  const addNewProduct = (newProduct) => {
    setProducts((oldProducts) => {
      oldProducts.push(newProduct);
      return oldProducts;
    });
  };

  const addToCart = useCallback(
    (item) => {
      const updatedOrders = new Set(orders);
      updatedOrders.add(item);
      setOrders(updatedOrders);
    },
    [orders, setOrders]
  );

  const removeFromCart = useCallback(
    (item) => {
      const updatedOrders = new Set(orders);
      updatedOrders.delete(item);
      setOrders(updatedOrders);
    },
    [orders, setOrders]
  );

  const orderNow = async () => {
    try {
      const body = JSON.stringify({
        products: Array.from(orders).map((order) => order._id),
        email: window.localStorage.getItem("user"),
        discount: 0,
      });
      const headers = {
        "Content-Type": "Application/json",
      };

      let res = await fetch(`${process.env.REACT_APP_API_URL}order/bulk`, {
        method: "POST",
        body,
        headers,
      });

      // check if post is successful
      if (!res.ok) {
        throw new Error("Something went wrong");
      } else {
        console.log("Order placed successfully");
      }

      let data = await res.json();

      console.log("data", data);
      let temp_data = data;

      res = await fetch(
        `${process.env.REACT_APP_API_URL}user/${window.localStorage.getItem(
          "user"
        )}/orders`
      );

      data = await res.json();

      const name = orders.values().next().value.name;
      const price = orders.values().next().value.price;

      temp_data.orders = [
        {
          ...temp_data.orders[0],
          productName: name,
          total: price,
        },
      ];

      data.orders = [...data.orders, ...temp_data.orders];

      setOrders(new Set());
      setPastOrders(data.orders);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteOrder = async (orderId) => {
    await fetch(`${process.env.REACT_APP_API_URL}order/${orderId}`, {
      method: "DELETE",
    });

    const res = await fetch(
      `${process.env.REACT_APP_API_URL}user/${window.localStorage.getItem(
        "user"
      )}/orders`
    );

    const data = await res.json();
    setPastOrders(data.orders);
  };

  return (
    <div className="home">
      <AppBar>
        <Toolbar>
          <Typography variant="body1" fontSize={25} paddingRight={15}>Dev E-Commerce</Typography>
          <Paper className="search-bar">
            <InputBase
              sx={{ ml: 1, flex: 1, width: "500px" }}
              fullWidth
              placeholder="Search products"
              onChange={handleSearch}
              value={search}
              onKeyPress={(e) => {
                if (e.code === "Enter") searchProducts();
              }}
            />
            {search.length > 0 ? (
              <IconButton
                onClick={() => {
                  setSearch("");
                  setFilteredProducts(products);
                }}
              >
                <Close />
              </IconButton>
            ) : (
              <IconButton onClick={searchProducts}>
                <Search />
              </IconButton>
            )}
          </Paper>

          <div className="right-action-btns">
            <Tooltip title={"All Users"}>
              <IconButton className="action-btn" onClick={showUsers}>
                <PeopleAlt />
              </IconButton>
            </Tooltip>
            {window.localStorage.getItem("userType") != null ? (
              <>
                <Tooltip title={"Cart/Orders"}>
                  <IconButton
                    className="action-btn"
                    onClick={() => setOpenOrders(true)}
                  >
                    <Badge badgeContent={orders.size} color="secondary">
                      <ShoppingCart />
                    </Badge>
                  </IconButton>
                </Tooltip>

                <Tooltip title={"Profile"}>
                  <IconButton className="action-btn" onClick={profile}>
                    <AccountCircle />
                  </IconButton>
                </Tooltip>
                {window.localStorage.getItem("userType") === "admin" && (
                  <IconButton
                    className="action-btn"
                    onClick={() => setCreateProduct(true)}
                  >
                    <Add />
                  </IconButton>
                )}
                <Tooltip title={"Logout"}>
                  <IconButton className="action-btn" onClick={logout}>
                    <Logout />
                  </IconButton>
                </Tooltip>
              </>
            ) : (
              <Tooltip title={"Login"}>
                <IconButton className="action-btn" onClick={login}>
                  <LoginRounded />
                </IconButton>
              </Tooltip>
            )}
            {window.localStorage.getItem("userType") === "seller"?(
                <Tooltip title={"Add New Product"}>
                  <IconButton style={{color: "white"}} onClick={addProduct}>
                    <AddCircleOutline color="white"/>
                  </IconButton>
                </Tooltip>
            ):(
                <>
                </>
            )}
          </div>

        </Toolbar>
      </AppBar>
      <div className="catalogue">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              deleteProduct={deleteProduct}
              updateProduct={updateProduct}
              addToCart={addToCart}
            />
          ))
        ) : (
          <div>Loading products</div>
        )}
      </div>
      <CreateProduct
        open={createProduct}
        handleClose={() => setCreateProduct(false)}
        allSellers={[].concat.apply(
          [],
          products.map((product) => product.sellers)
        )}
        addNewProduct={addNewProduct}
      />
      {window.localStorage.getItem("userType") != null ? (
        <Orders
          open={openOrders}
          orders={orders}
          handleClose={() => setOpenOrders(false)}
          removeFromCart={removeFromCart}
          pastOrders={pastOrders}
          orderNow={orderNow}
          deleteOrder={deleteOrder}
        />
      ) : (
        <></>
      )}
      <ErrorSnackbar
        open={error}
        handleClose={() => {
          setError(false);
          setErrorMsg("");
        }}
        message={errorMsg}
      />
    </div>
  );
};

export default Home;
