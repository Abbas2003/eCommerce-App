import { Image } from 'antd'
import React from 'react'

const ProductCard = ({ item }) => {

    const { title, thumbnail, brand, price } = item

    return (
        <div className='flex flex-col'>
            <Image src={thumbnail} preview={false} />
            <div style={{ backgroundColor: '#F4F5F7', padding: '16px 20px 30px 16px' }}>
                <p className='font-medium poppins-font' style={{ fontWeight: '600', fontSize: '24px' }}>{title}</p>
                <p className='font-medium poppins-font' style={{ color: '#898989', fontWeight: '500' }}>{brand}</p>
                <p className='font-medium poppins-font mt-2'>Rp {price}</p>
            </div>
        </div>
    )
}

export default ProductCard