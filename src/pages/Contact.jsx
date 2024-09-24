import React from 'react'
import Hero from '../components/Hero';
import { Image, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import QualitySection from '../components/QualitySection';

const Contact = () => {
  return (
    <section>
      <Hero currentPage={'Contact'} PreviousPage={'Home'} />
      
      <div className='container mx-auto text-center px-4 sm:px-6 md:w-[80%] lg:w-[60%] xl:w-[40%] my-10 py-10'>
        <h1 className='text-2xl sm:text-3xl md:text-4xl font-semibold'>Get In Touch With Us</h1>
        <p className='text-gray-500 mt-4 text-sm sm:text-base md:text-lg'>
          For more information about our products & services, please feel free to drop us an email. Our staff will always be there to help you out. Do not hesitate!
        </p>
      </div>


      {/* Contact form */}
      <div className='container flex flex-col lg:flex-row justify-between mx-auto p-8'>

        {/* Left Section - Contact Information */}
        <div className='lg:w-1/2 w-full p-5'>
          {/* Address Section */}
          <div className='mb-7 flex'>
            <Image src='/location.png' className='pr-3' alt="Location Icon" />
            <div className='pl-4'>
              <span className='font-medium text-2xl block'>Address</span>
              <p>236 5th SE Avenue, New York NY10000, United States</p>
            </div>
          </div>

          {/* Phone Section */}
          <div className='mb-7 flex'>
            <Image src='/phone.png' className='pr-3' alt="Phone Icon" />
            <div className='pl-4'>
              <span className='font-medium text-2xl block'>Phone</span>
              <p>
                Mobile: +(84) 546-6789 <br />
                Hotline: +(84) 456-6789
              </p>
            </div>
          </div>

          {/* Working Time Section */}
          <div className='mb-7 flex'>
            <Image src='/clock.png' className='pr-3' alt="Clock Icon" />
            <div className='pl-4'>
              <span className='font-medium text-2xl block'>Working Time</span>
              <p>
                Monday-Friday: 9:00 - 22:00 <br />
                Saturday-Sunday: 9:00 - 21:00
              </p>
            </div>
          </div>
        </div>

        {/* Right Section - Contact Form */}
        <div className='lg:w-2/3 w-full pr-12 py-5'>
          <div className='mb-7'>
            <p className='font-medium mb-5'>Your name</p>
            <Input type="text" placeholder='Abc' required className='p-4 w-full' />
          </div>
          <div className='mb-7'>
            <p className='font-medium mb-5'>Email address</p>
            <Input type="email" placeholder='Abc@def.com' required className='p-4 w-full' />
          </div>
          <div className='mb-7'>
            <p className='font-medium mb-5'>Subject</p>
            <Input type="text" placeholder='This is optional' className='p-4 w-full' />
          </div>
          <div className='mb-7'>
            <p className='font-medium mb-5'>Message</p>
            <TextArea rows={4} placeholder="Hi! I’d like to ask about..." className='p-4 w-full' />
          </div>
          <button style={{ backgroundColor: '#B88E2F', padding: '9px 3rem', color: 'white', borderRadius: '5px' }}>Submit</button>
        </div>
      </div>

      {/* Quality Section */}
      <QualitySection />

    </section>
  )
}

export default Contact;