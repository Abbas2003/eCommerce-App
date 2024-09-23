import React from 'react'
import { Link } from 'react-router-dom';

const FooterSection = () => {
  return (
    <section style={{ borderTop: '1px solid #D9D9D9' }}>
      <div className='container mx-auto grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4'>
        <div className='pt-7 px-10'>
          <h1 style={{ fontWeight: '700', fontSize: '24px' }}>Funiro.</h1>
          <p style={{ color: '#9F9F9F', marginTop: '3rem' }}>400 University Drive Suite 200 Coral Gables, <br />FL 33134 USA</p>
        </div>
        <div className='pt-9 ps-10'>
          <span style={{ color: '#9F9F9F', display: 'block', marginBottom: '3rem' }}>Links</span>
          <ul>
            <Link><li style={{ fontWeight: '500', marginBottom: '2rem' }}>Home</li></Link>
            <Link><li style={{ fontWeight: '500', marginBottom: '2rem' }}>Shop</li></Link>
            <Link><li style={{ fontWeight: '500', marginBottom: '2rem' }}>About</li></Link>
            <Link><li style={{ fontWeight: '500', marginBottom: '2rem' }}>Contact</li></Link>
          </ul>
        </div>
        <div className='pt-9 pe-10'>
          <span style={{ color: '#9F9F9F', display: 'block', marginBottom: '3rem' }}>Help</span>
          <ul>
            <Link><li style={{ fontWeight: '500', marginBottom: '2rem' }}>Payment Options</li></Link>
            <Link><li style={{ fontWeight: '500', marginBottom: '2rem' }}>Returns</li></Link>
            <Link><li style={{ fontWeight: '500', marginBottom: '2rem' }}>Privacy Policies</li></Link>
          </ul>
        </div>
        <div className='pt-9 pe-10'>
          <p style={{ color: '#9F9F9F', display: 'block', marginBottom: '3rem' }}>Newsletter</p>
          <input type="text" placeholder='Enter Your Email Address' style={{ borderBottom: '1px solid black' }} />
          <span style={{ fontWeight: '500',  borderBottom: '1px solid black', fontWeight: '500' }}>SUBSCRIBE</span>
        </div>
      </div>

      <div className='container mx-auto py-9 ' style={{ borderTop: '1px solid #D9D9D9' }}>
        <p>2023 furino. All rights reverved</p>
      </div>
    </section>
  )
}

export default FooterSection;