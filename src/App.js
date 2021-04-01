import "./App.css";
import Carousel from "./Components/Carousel/carousel";
import Navbar from "./Components/Navbar/navbar";
import Product from "./Components/Product/product";
import ProductDetail from "./Components/ProductDetail/productDetail";
import Login from './Components/Login/login';
import Cart from './Components/Cart/cart';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Switch } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="contentApp">
        <Switch>
          <Route path="/" exact component={Carousel}></Route>
          <Route
            path="/product/:category"
            exact
            component={Product}
          ></Route>
          <Route
            path="/product/:category/:id"
            exact
            component={ProductDetail}
          ></Route>
          <Route
            path="/login"
            exact
            component={Login}
          ></Route>
          <Route
            path="/cart"
            exact
            component={Cart}
          ></Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
