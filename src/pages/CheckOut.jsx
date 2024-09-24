import React from 'react'
import Hero from '../components/Hero';
import { Input } from 'antd';
import QualitySection from '../components/QualitySection';

const CheckOut = () => {
  return (
    <section>
      <Hero currentPage={'Checkout'} PreviousPage={'Home'} />
      
      <div className='container mx-auto px-4 sm:px-6 my-10 py-10'>
        <div>
          <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold'>Billing details</h1>
          <div>
            <div> 
              <p>First Name</p>
              <Input />
            </div>
          </div>
        </div>
      </div>

      {/* Quality Section */}
      <QualitySection />

    </section>
  )
}

export default CheckOut;