import React from 'react';
import {BrowserRouter,Routes,Route,Link} from 'react-router-dom';
import Product from './component/productitems';
import Checkout from './component/checkout';



export default function App(productItems,cartItems) {
  return (
    <div className="App">
      <BrowserRouter>
        <Link to="/"> Product Home page </Link> &nbsp;
        <Routes>
            <Route path="/" element={<Product productItems={productItems}/>}></Route>
            <Route path="/checkout" element={<Checkout productItems={productItems} cartItems={cartItems}/>}></Route>
        </Routes>
    </BrowserRouter>
    </div>
  );
}



  



