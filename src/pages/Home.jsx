import { Image } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';

const Home = () => {

  const [products, setProducts] = useState([])

  useEffect(() => {
    axios.get('https://dummyjson.com/products/category/smartphones')
      .then(res => setProducts(res.data.products))

  }, [])

  return (
    <section>
      {/* Hero Section */}
      <div
        style={{
          backgroundImage: `url('https://img.freepik.com/premium-photo/scandinavian-interior-mockup-wall-decal-background_1961-259.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh',
        }}
      >
        {/* Wrapper Div for the content */}
        <div
          className='p-8 inline-block absolute transform 
               -translate-x-1/2 -translate-y-1/2
               left-1/2 top-[60%]
               lg:left-[75%] lg:top-[60%]' // Align right on large screens
          style={{
            backgroundColor: '#FFF3E3',
            maxWidth: '90%', // Ensures responsiveness on smaller devices
            width: '630px', // Retain this width for large screens
          }}
        >
          <div>
            <p
              className='poppins-font mt-5 text-center md:text-left'
              style={{ fontWeight: '600', letterSpacing: '3px' }}
            >
              New Arrival
            </p>
            <h2
              className='text-center md:text-left'
              style={{
                color: '#B88E2F',
                fontSize: '36px', // Reduced font size for smaller devices
                fontWeight: '700',
                lineHeight: '45px',
              }}
            >
              Discover Our <br /> New Collection
            </h2>
            <p className='mt-2 poppins-font font-medium text-center md:text-left text-sm md:text-base'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus,
              luctus nec ullamcorper mattis.
            </p>
            <div className='flex justify-center md:justify-start'>
              <button
                className='mt-5'
                style={{
                  backgroundColor: '#B88E2F',
                  padding: '15px 40px', // Reduced padding for smaller devices
                  color: '#FFFFFF',
                }}
              >
                BUY NOW
              </button>
            </div>
          </div>
        </div>
      </div>



      {/* Browse Section */}
      <div>
        <div className='container mx-auto mt-10'>
          <div className='text-center'>
            <h1 className='poppins-font' style={{ fontWeight: '700', fontSize: '32px', lineHeight: '48px' }} >Browse The Range</h1>
            <p className='poppins-font' style={{ color: '#666666' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </div>
        <div className='flex justify-center items-center gap-4 mt-10'>
          <div>
            <Image src='/Dining.png' />
            <p className='text-center font-medium poppins-font'>Dining</p>
          </div>
          <div>
            <Image src='/Living.png' />
            <p className='text-center font-medium poppins-font'>Dining</p>
          </div>
          <div>
            <Image src='/Bedroom.png' />
            <p className='text-center font-medium poppins-font'>Dining</p>
          </div>
        </div>
      </div>

      {/* Our Products Section */}
      <div className='container mx-auto'>
        <div className=' mt-10'>
          <div className='text-center'>
            <h1 className='poppins-font' style={{ fontWeight: '700', fontSize: '32px', lineHeight: '48px' }} >Our Products</h1>
          </div>
        </div>
        <div className='flex flex-wrap gap-4 mt-10'>
          {products.map(product => (
            <ProductCard item={product} key={product.id} />
          ))}
        </div>
        <div className='text-center my-7'>
          <button style={{ color: '#B88E2F', border: '1px solid #B88E2F', padding: '12px 74px', fontWeight: '600' }}>Shop More</button>
        </div>
      </div>

      {/* Rooms Section */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-10' style={{ backgroundColor: '#FCF8F3', padding: '15px 0px 19px 40px' }}>
        <div>
          <h2 style={{ fontWeight: '700', fontSize: '40px', color: '#3A3A3A', letterSpacing: '-2px' }}>50+ Beautiful rooms inspiration</h2>
          <p style={{ color: '#616161', fontWeight: '500' }}>Our designer already made a lot of beautiful prototipe of rooms that inspire you</p>
          <button style={{ backgroundColor: '#B88E2F', color: '#FFFFFF', padding: '12px 36px', marginTop: '2rem' }}>Explore More</button>
        </div>
      </div>

    </section>
  );
};

export default Home;
