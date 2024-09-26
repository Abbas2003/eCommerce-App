import React, { useContext, useState } from 'react';
import { HeartOutlined, SearchOutlined, ShoppingCartOutlined, UserOutlined, MenuOutlined, CloseOutlined } from '@ant-design/icons';
import { Badge, Image, Modal, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const NavBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal state for cart
  const { cartItems, removeFromCart } = useContext(CartContext); // Get cart items from context

  const navigate = useNavigate()

  // Function to toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Function to show the cart modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Function to hide the cart modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Function to calculate subtotal
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="flex py-6 px-10 justify-between items-center bg-white shadow-lg">
        {/* Logo */}
        <div className="flex items-center">
          <Image src="/Logo.png" preview={false} />
          <span className="text-3xl font-bold ps-1">Furniro</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex">
          <ul className="flex gap-12 poppins-font" style={{ fontWeight: '500' }}>
            <Link to={'/'}><li>Home</li></Link>
            <Link to={'/shop'}><li>Shop</li></Link>
            <Link to={'/about'}><li>About</li></Link>
            <Link to={'/contact'}><li>Contact</li></Link>
          </ul>
        </div>

        {/* Icons (Visible only on desktop) */}
        <div className="hidden md:flex gap-8 text-xl">
          <UserOutlined />
          <SearchOutlined />
          <HeartOutlined />
          {/* Cart icon with badge to show number of items */}
          <Badge count={cartItems.length}>
            <ShoppingCartOutlined className="text-xl cursor-pointer" onClick={showModal} />
          </Badge>
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden pt-2">
          <MenuOutlined onClick={toggleSidebar} className="text-2xl cursor-pointer" />
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div className={`fixed top-0 left-0 h-full bg-white shadow-md z-50 w-64 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Sidebar Header */}
        <div className="flex justify-between p-6">
          <span className="text-3xl font-bold">Furniro</span>
          <CloseOutlined onClick={toggleSidebar} className="text-2xl cursor-pointer" />
        </div>

        {/* Mobile Icons */}
        <div className="flex gap-8 text-xl p-6">
          <UserOutlined />
          <SearchOutlined />
          <HeartOutlined />
          {/* Mobile cart icon with badge */}
          <Badge count={cartItems.length}>
            <ShoppingCartOutlined className="text-xl cursor-pointer" onClick={showModal} />
          </Badge>
        </div>

        {/* Mobile Links */}
        <ul className="p-6 flex flex-col gap-6 text-xl">
          <Link to={'/'} onClick={toggleSidebar}><li>Home</li></Link>
          <Link to={'/shop'} onClick={toggleSidebar}><li>Shop</li></Link>
          <Link to={'/about'} onClick={toggleSidebar}><li>About</li></Link>
          <Link to={'/contact'} onClick={toggleSidebar}><li>Contact</li></Link>
        </ul>
      </div>

      {/* Overlay when sidebar is open */}
      {isSidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleSidebar}></div>}

      {/* Custom Background Overlay when Modal is Visible */}
      {isModalVisible && (
        <div className="fixed inset-0 bg-[#D9D9D9] bg-opacity-90 z-40"></div>
      )}

      {/* Cart Modal positioned at the top-right corner */}
      <Modal
        title="Shopping Cart"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        className="lg:w-1/3 md:w-1/2 sm:w-full"
        styles={{ padding: '2px' }}
        style={{ position: 'absolute', top: 0, right: 0, margin: 0 }}
        mask={false}
      >
        {/* Cart Items List */}
        <div className="flex flex-col space-y-4">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center">

                {/* Product Image (right) */}
                <img src={item.thumbnail} alt={item.title} className="w-16 h-16 object-cover rounded-lg" />

                {/* Product Info (left) */}
                <div className="flex flex-col">
                  <span className="font-semibold text-[16px] text-wrap">{item.title}</span>
                  <div className='flex gap-3'>
                    <span className='text-2xl'>{item.quantity}</span>
                    <span> X </span>
                    <span className="text-[#B88E2F]">${item.price}</span>
                  </div>
                </div>

                {/* Remove Button */}
                <img src='/closebtn.png' alt='Remove' className='cursor-pointer' onClick={() => removeFromCart(item)} />
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">Your cart is empty.</div>
          )}
        </div>

        {/* Subtotal */}
        <div className="flex justify-between items-center mt-4 border-t pt-2">
          <span className="font-semibold text-lg">Subtotal:</span>
          <span className="font-semibold text-lg text-[#B88E2F]">${calculateSubtotal().toFixed(2)}</span>
        </div>

        {/* Buttons */}
        <div className="flex justify-between space-x-2 mt-4">
          <button className="w-60 py-[8px] text-black md:w-1/3 rounded-3xl border border-black hover:border-[#B88E2F] hover:text-white hover:bg-[#B88E2F] transition" onClick={handleCancel}>
            Cart
          </button>
          <button type="primary" className="w-full py-[8px] text-black md:w-1/3 rounded-3xl border border-black hover:border-[#B88E2F] hover:text-white hover:bg-[#B88E2F] transition" onClick={() => navigate('/checkout')}>
            Checkout
          </button>
          <button className="w-full py-[8px] text-black md:w-1/3 rounded-3xl border border-black hover:border-[#B88E2F] hover:text-white hover:bg-[#B88E2F] transition" onClick={() => alert('Compare Products')}>
            Comparison
          </button>
        </div>
      </Modal>
    </>
  );
};

export default NavBar;
