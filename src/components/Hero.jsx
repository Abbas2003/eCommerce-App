import { RightOutlined } from '@ant-design/icons';
import { Image } from 'antd'
import React from 'react'

const Hero = ({ currentPage, PreviousPage }) => {
    return (
        <section className='poppins-font'>
            <div
                style={{
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {/* Background Image Container with blur */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: `url('/banner.png')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'blur(3px)', // Apply the blur only to the background image
                        zIndex: 1,
                    }}
                ></div>

                {/* Optional Overlay for slight darkening effect */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(255,255,255, 0.3)', // Optional overlay with opacity
                        zIndex: 2,
                    }}
                ></div>

                {/* Content on top of the background image */}
                <div className="m-12 flex flex-col items-center p-11" style={{ zIndex: 3 }}>
                    <Image src='/Logo.png' preview={false} />
                    <h1 style={{ fontWeight: '500', fontSize: '48px' }}>{currentPage}</h1>
                    <p>
                        <span className="font-medium">{PreviousPage} <RightOutlined /></span> {currentPage}
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Hero;