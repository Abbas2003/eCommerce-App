import { Image } from 'antd';
import React from 'react';

const Home = () => {
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
        <div className='p-8 inline-block' style={{ backgroundColor: '#FFF3E3', width: '630px', top: '35%', left: '50%', position: 'absolute' }}>
          <div>
            <p className='poppins-font mt-5' style={{ fontWeight: '600', letterSpacing: '3px' }}>New Arrival</p>
            <h2 style={{ color: '#B88E2F', fontSize: '52px', fontWeight: '700', lineHeight: '65px', textWrap: 'wrap' }}>Discover Our <br />New Collection</h2>
            <p className='mt-2 poppins-font font-medium'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.</p>
            <button style={{ backgroundColor: '#B88E2F', padding: '25px 72px', color: '#FFFFFF', marginTop: '50px' }}>BUY NOW</button>
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
      <div>
        <div className='container mx-auto mt-10'>
          <div className='text-center'>
            <h1 className='poppins-font' style={{ fontWeight: '700', fontSize: '32px', lineHeight: '48px' }} >Our Products</h1>
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

    </section>
  );
};

export default Home;
