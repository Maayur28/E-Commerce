import "./App.css";
import Carousel from "./Components/Carousel/carousel";
import Navbar from "./Components/Navbar/navbar";
import Product from "./Components/Product/product";
import ProductDetail from "./Components/ProductDetail/productDetail";
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
        </Switch>
      </div>
    </div>
  );
}

export default App;
