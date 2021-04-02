import "./App.css";
import Carousel from "./Components/Carousel/carousel";
import Navbar from "./Components/Navbar/navbar";
import Product from "./Components/Product/product";
import ProductDetail from "./Components/ProductDetail/productDetail";
import Cart from "./Components/Cart/cart";
import "react-toastify/dist/ReactToastify.css";
import { Route, Switch } from "react-router-dom";
import {StoreProvider} from "./Store/data";
function App() {
  return (
    <StoreProvider>
      <div className="App">
        <Navbar />
        <div className="contentApp">
          <Switch>
            <Route path="/" exact component={Carousel}></Route>
            <Route path="/product/:category" exact component={Product}></Route>
            <Route
              path="/product/:category/:id"
              exact
              component={ProductDetail}
            ></Route>
            <Route path="/cart" exact component={Cart}></Route>
          </Switch>
        </div>
      </div>
    </StoreProvider>
  );
}

export default App;
