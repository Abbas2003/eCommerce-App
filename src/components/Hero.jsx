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
                        backgroundImage: `url('https://s3-alpha-sig.figma.com/img/1461/f3d6/ff74c027a1888544144abe4be6e02cbf?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kwNqoQb4Eden1ddxvNlqKRY0IEnzP9CJ3ovx2SCpe-Pjlh6QG1t3pNlZyjE0HPz8BGQaBRAm4VArdPZZUH6F65-n5CGM1o6uU6XLQqs8q03KTg2FvrPOaD25nEoi-6rxqgHVQjT~Tx9Z154xE3Qtps2r3XwMx5RoOGgxE7qWj4DzoIYmZMst~57dDrmowr6yZnXL5vCn4fUtr44Bm8UJfTvb9fBgV4USZIDnMpiRTCU9XD6DUvO0tZYyVE7WRyrU7cZxuC0xbbdEwm7betikZMQMKHusnefCHPzmSdtwyNfDQxF6IDrKAW6chBmyFnxmtP1Onkn~QwFPQszqSCG8JQ__')`,
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