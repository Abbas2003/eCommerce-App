import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Dashboard from './pages/Dashboard'
import Signin from "./pages/Auth/Signin"
import Signup from "./pages/Auth/Signup"
import Auth from "./pages/Auth/Auth"
import Home from './pages/Home'
import Shop from './pages/Shop'
import CheckOut from './pages/CheckOut'
import Blog from './pages/About'
import Contact from './pages/Contact'
import SingleProduct from './pages/SingleProduct'
import NotFound from './pages/NotFound'
import Cart from './pages/Cart'
import About from './pages/About'
import AdminPanel from './pages/Admin/Admin'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/auth">
            <Route index element={<Auth />} />
            <Route path="signin" element={<Signin />} />
            <Route path="signup" element={<Signup />} />
          </Route>

          <Route path='/' element={<Dashboard />}>
            <Route index element={<Home />} />
            <Route path='/shop' element={<Shop />} />
            <Route path='/checkout' element={<CheckOut />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/product/:id' element={<SingleProduct />} />
            <Route path='*' element={<NotFound />} />
          </Route>

          <Route path='/admin'>
            <Route index element={<AdminPanel />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
