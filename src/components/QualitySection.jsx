import { CheckCircleOutlined } from '@ant-design/icons';
import React from 'react';

const QualitySection = () => {
  return (
    <div className='bg-[#FAF3EA] py-16 px-4'>
      <div className='container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
        {/* High Quality */}
        <div className='flex items-center gap-4'>
          <img src='/trophy.png' alt='Trophy' className='w-12 h-12 sm:w-16 sm:h-16' />
          <div>
            <p className='font-semibold text-lg sm:text-xl lg:text-2xl'>High Quality</p>
            <p className='text-sm sm:text-base text-gray-600'>Crafted from top materials</p>
          </div>
        </div>

        {/* Warranty Protection */}
        <div className='flex items-center gap-4'>
          <CheckCircleOutlined className='text-3xl sm:text-4xl lg:text-6xl' />
          <div>
            <p className='font-semibold text-lg sm:text-xl lg:text-2xl'>Warranty Protection</p>
            <p className='text-sm sm:text-base text-gray-600'>Over 2 years</p>
          </div>
        </div>

        {/* Free Shipping */}
        <div className='flex items-center gap-4'>
          <img src='/shipping.png' alt='Shipping' className='w-12 h-12 sm:w-16 sm:h-16' />
          <div>
            <p className='font-semibold text-lg sm:text-xl lg:text-2xl'>Free Shipping</p>
            <p className='text-sm sm:text-base text-gray-600'>Order over $150</p>
          </div>
        </div>

        {/* 24/7 Support */}
        <div className='flex items-center gap-4'>
          <img src='/support.png' alt='Support' className='w-12 h-12 sm:w-16 sm:h-16' />
          <div>
            <p className='font-semibold text-lg sm:text-xl lg:text-2xl'>24/7 Support</p>
            <p className='text-sm sm:text-base text-gray-600'>Dedicated support</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QualitySection;
