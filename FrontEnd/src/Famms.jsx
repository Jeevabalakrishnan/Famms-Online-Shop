import React from 'react'
import Home from './Home';
import Navbar from './Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import About from './About';
import Testimonal from './Testimonal';
import Products from './Products';
import Blog from './Blog';
import Contact from './Contact';
import Cart from './Cart';
import CheckoutPage from './CheckoutPage';


const Famms = () => {
  return (
    <div>     
        <BrowserRouter>
        <Navbar/>
        <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
          <Route path='/Navbar' element={<Navbar/>}></Route>
          <Route path='/about' element={<About/>}></Route>
          <Route path='/testimonal' element={<Testimonal/>}></Route>
          <Route path='/products' element={<Products/>}></Route>
          <Route path='/checkoutpage' element={<CheckoutPage/>}></Route>
          <Route path='/blog' element={<Blog/>}></Route>
          <Route path='/contact' element={<Contact/>}></Route>
          <Route path='/cart' element={<Cart/>}></Route>
        </Routes>
        </BrowserRouter>

    </div>
  )
}

export default Famms;