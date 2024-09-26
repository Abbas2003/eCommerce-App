import React from 'react'
import Hero from '../components/Hero';
import { Input } from 'antd';
import QualitySection from '../components/QualitySection';

const CheckOut = () => {
  return (
    <section>
      <Hero currentPage={'Checkout'} PreviousPage={'Home'} />

      <div className='container mx-auto sm:px-6 my-10 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8'>
        <div>
          <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold mb-10'>Billing details</h1>
          {/* Billing Details */}
          <div className='space-y-8 border px-8'>
            <div className='flex items-center justify-between flex-wrap'>
              <div className='space-y-5 md:w-1/3 w-full'>
                <p>First Name</p>
                <Input className='p-4' />
              </div>
              <div className='space-y-5 md:w-1/3 w-full'>
                <p>Last Name</p>
                <Input className='p-4' />
              </div>
            </div>

            <div className='space-y-5'>
              <p>Company Name (optional)</p>
              <Input className='p-4' />
            </div>
            <div className='space-y-5'>
              <p>Country / Region</p>
              <select className='border p-4 w-full' aria-placeholder='Select'>
                <option value="">Sri Lanka</option>
                <option value="">Pakistan</option>
                <option value="">Bangladest</option>
                <option value="">Iran</option>
              </select>
            </div>
            <div className='space-y-5'>
              <p>Street address</p>
              <Input className='p-4' />
            </div>
            <div className='space-y-5'>
              <p>Town / City</p>
              <Input className='p-4' />
            </div>
            <div className='space-y-5'>
            <p>Province</p>
              <select className='border p-4 w-full' aria-placeholder='Select'>
                <option value="">Sindh</option>
                <option value="">Punjab</option>
                <option value="">Balochistan</option>
                <option value="">Kpk</option>
              </select>
            </div>
            <div className='space-y-5'>
              <p>ZIP code</p>
              <Input className='p-4' />
            </div>
            <div className='space-y-5'>
              <p>Phone</p>
              <Input className='p-4' />
            </div>
            <div className='space-y-5'>
              <p>Email address</p>
              <Input className='p-4' />
            </div>
            <div className='space-y-5'>
              <Input className='p-4' placeholder='Additional information' />
            </div>
          </div>

          {/* Checkout */}
          <div>
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      </div>

      {/* Quality Section */}
      <QualitySection />

    </section>
  )
}

export default CheckOut;