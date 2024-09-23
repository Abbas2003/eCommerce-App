import { CheckCircleOutlined } from '@ant-design/icons'
import React from 'react'

const QualitySection = () => {
  return (
    <div className='flex items-center justify-around' style={{ backgroundColor: '#FAF3EA', padding:'100px 0px' }}>
        <div className='flex items-center gap-2'>
          <img src='/trophy.png' className='text-6xl'/>
          <div>
            <p style={{ fontWeight: '600', fontSize: '25px' }}>High Quality</p>
            <p style={{  fontSize: '20px', color: '#898989' }}>crafted from top materials</p>
          </div>
        </div>
        <div className='flex items-center gap-2'>
        <CheckCircleOutlined className='text-6xl'/>
          <div>
            <p style={{ fontWeight: '600', fontSize: '25px' }}>Warranty Protection</p>
            <p style={{  fontSize: '20px', color: '#898989' }}>Over 2 years</p>
          </div>
        </div>
        <div className='flex items-center gap-2'>
        <img src='/shipping.png' className='text-6xl'/>
          <div>
            <p style={{ fontWeight: '600', fontSize: '25px' }}>Free Shipping</p>
            <p style={{  fontSize: '20px', color: '#898989' }}>Order over 150 $</p>
          </div>
        </div>
        <div className='flex items-center gap-2'>
        <img src='/support.png' className='text-6xl'/>
          <div>
            <p style={{ fontWeight: '600', fontSize: '25px' }}>24 / 7 Support</p>
            <p style={{  fontSize: '20px', color: '#898989' }}>Dedicated support</p>
          </div>
        </div>
      </div>
  )
}

export default QualitySection