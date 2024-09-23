import { HeartOutlined, SearchOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { Image } from 'antd';
import React from 'react'
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className='flex py-6 ps-10 pe-12 justify-between items-center'>
      <div className='flex items-center'>
        <Image src='/Logo.png' />
        <span className='text-3xl font-bold ps-1'>Furniro</span>
      </div>

      <div>
        <ul className='flex gap-12 poppins-font' style={{ fontWeight: '500'}}>
          <Link to={'/'}><li>Home</li></Link>
          <Link to={'/shop'}><li>Shop</li></Link>
          <Link to={'/blog'}><li>About</li></Link>
          <Link to={'/contact'}><li>Contact</li></Link>
        </ul>
      </div>

      <div className='flex gap-8 text-xl pe-5'>
        <UserOutlined />
        <SearchOutlined />
        <HeartOutlined />
        <ShoppingCartOutlined />
      </div>
    </nav>
  )
}

export default NavBar;