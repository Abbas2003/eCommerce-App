import React from 'react';
import { Link } from 'react-router-dom';

const FooterSection = () => {
  return (
    <footer className='poppins-font bg-white border-t border-gray-300'>
      <div className='container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 px-6 py-8'>
        {/* Logo Section */}
        <div className='lg:space-y-11 space-y-5'>
          <h1 className='font-bold text-2xl'>Funiro.</h1>
          <p className='text-gray-500'>
            400 University Drive Suite 200 Coral Gables, <br />
            FL 33134 USA
          </p>
        </div>

        {/* Links Section */}
        <div className='lg:space-y-11 space-y-5 ml-0 md:ml-8 lg:ml-8'>
          <span className='text-gray-500 font-semibold'>Links</span>
          <ul className='space-y-3'>
            <Link to='/'><li className='font-medium mb-1 md:mb-5 lg:mb-9 hover:text-[#B88E2F] transition delay'>Home</li></Link>
            <Link to='/shop'><li className='font-medium mb-1 md:mb-5 lg:mb-9 hover:text-[#B88E2F] transition delay'>Shop</li></Link>
            <Link to='/about'><li className='font-medium mb-1 md:mb-5 lg:mb-9 hover:text-[#B88E2F] transition delay'>About</li></Link>
            <Link to='/contact'><li className='font-medium mb-1 md:mb-5 lg:mb-9 hover:text-[#B88E2F] transition delay'>Contact</li></Link>
          </ul>
        </div>

        {/* Help Section */}
        <div className='lg:space-y-11 space-y-5'>
          <span className='text-gray-500 font-semibold'>Help</span>
          <ul className='space-y-3'>
            <Link to='/'><li className='font-medium mb-1 md:mb-5 lg:mb-9 hover:text-[#B88E2F] transition delay'>Payment Options</li></Link>
            <Link to='/'><li className='font-medium mb-1 md:mb-5 lg:mb-9 hover:text-[#B88E2F] transition delay'>Returns</li></Link>
            <Link to='/'><li className='font-medium mb-1 md:mb-5 lg:mb-9 hover:text-[#B88E2F] transition delay'>Privacy Policies</li></Link>
          </ul>
        </div>

        {/* Newsletter Section */}
        <div className='lg:space-y-11 space-y-5'>
          <p className='text-gray-500 font-semibold'>Newsletter</p>
          <div className='flex flex-col space-y-2'>
            <input
              type='text'
              placeholder='Enter Your Email Address'
              className='border-b border-gray-400 p-2 focus:outline-none'
            />
            <button className='bg-white py-2 border-b border-gray-400 font-semibold hover:bg-black hover:text-white transition'>
              SUBSCRIBE
            </button>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className='container mx-auto py-8 border-t ps-3 border-gray-300'>
        <p>2023 Funiro. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default FooterSection;
