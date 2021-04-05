import "./App.css";
import Carousel from "./Components/Carousel/carousel";
import Navbar from "./Components/Navbar/navbar";
import Product from "./Components/Product/product";
import ProductDetail from "./Components/ProductDetail/productDetail";
import Cart from "./Components/Cart/cart";
import my404 from './Components/My404/notfound';
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
            <Route path="/" exact={true} component={Carousel}></Route>
            <Route path="/product/:category" exact={true} component={Product}></Route>
            <Route
              path="/product/:category/:id"
              exact={true}
              component={ProductDetail}
            ></Route>
            <Route path="/cart" exact={true} component={Cart}></Route>
            <Route path="*" exact={true} component={my404}></Route>
          </Switch>
        </div>
      </div>
    </StoreProvider>
  );
}

export default App;
