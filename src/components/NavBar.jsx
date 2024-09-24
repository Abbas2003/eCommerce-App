import React, { useState } from 'react';
import { HeartOutlined, SearchOutlined, ShoppingCartOutlined, UserOutlined, MenuOutlined, CloseOutlined } from '@ant-design/icons';
import { Image } from 'antd';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false); // Sidebar state

  // Function to toggle sidebar
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Navbar */}
      <nav className='flex py-6 px-10 justify-between items-center bg-white shadow-lg'>
        {/* Logo */}
        <div className='flex items-center'>
          <Image src='/Logo.png' preview={false} />
          <span className='text-3xl font-bold ps-1'>Furniro</span>
        </div>

        {/* Desktop Links */}
        <div className='hidden md:flex'>
          <ul className='flex gap-12 poppins-font' style={{ fontWeight: '500' }}>
            <Link to={'/'}><li>Home</li></Link>
            <Link to={'/shop'}><li>Shop</li></Link>
            <Link to={'/about'}><li>About</li></Link>
            <Link to={'/contact'}><li>Contact</li></Link>
          </ul>
        </div>

        {/* Icons (Visible only on desktop) */}
        <div className='hidden md:flex gap-8 text-xl'>
          <UserOutlined />
          <SearchOutlined />
          <HeartOutlined />
          <ShoppingCartOutlined />
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className='md:hidden pt-2'>
          <MenuOutlined onClick={toggleSidebar} className='text-2xl cursor-pointer' />
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div className={`fixed top-0 left-0 h-full bg-white shadow-md z-50 w-64 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Sidebar Header */}
        <div className='flex justify-between p-6'>
          <span className='text-3xl font-bold'>Furniro</span>
          <CloseOutlined onClick={toggleSidebar} className='text-2xl cursor-pointer' />
        </div>

        {/* Mobile Icons */}
        <div className='flex gap-8 text-xl p-6'>
          <UserOutlined />
          <SearchOutlined />
          <HeartOutlined />
          <ShoppingCartOutlined />
        </div>

        {/* Mobile Links */}
        <ul className='p-6 flex flex-col gap-6 text-xl'>
          <Link to={'/'} onClick={toggleSidebar}><li>Home</li></Link>
          <Link to={'/shop'} onClick={toggleSidebar}><li>Shop</li></Link>
          <Link to={'/about'} onClick={toggleSidebar}><li>About</li></Link>
          <Link to={'/contact'} onClick={toggleSidebar}><li>Contact</li></Link>
        </ul>
      </div>

      {/* Overlay when sidebar is open */}
      {isOpen && <div className='fixed inset-0 bg-black bg-opacity-50 z-40' onClick={toggleSidebar}></div>}
    </>
  );
};

export default NavBar;
