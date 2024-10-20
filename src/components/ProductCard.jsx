import { HeartOutlined, ShareAltOutlined } from '@ant-design/icons'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../context/CartContext'

const ProductCard = ({ item }) => {

    const { title, thumbnail, brand, price, id } = item

    const {addToCart, isItemAdded} = useContext(CartContext)

    return (
        <Link to={`/product/${id}`}>
            <div className='relative flex flex-col group hover:bg-gray-100'>
                {/* Product Image */}
                <img src={thumbnail} className='w-full object-cover' alt={title} />

                {/* Product Details */}
                <div style={{ backgroundColor: '#F4F5F7', padding: '16px 20px 30px 16px' }}>
                    <p className='font-medium poppins-font' style={{ fontWeight: '600', fontSize: '24px' }}>
                        {title}
                    </p>
                    <p className='font-medium poppins-font' style={{ color: '#898989', fontWeight: '500' }}>
                        {brand}
                    </p>
                    <p className='font-medium poppins-font mt-2'>Rp {price}</p>
                </div>

               {/* Add to Cart Button (Initially hidden, shown on hover) */}
<div className='absolute inset-0 flex items-center text-center justify-center bg-[#3A3A3A] bg-opacity-75 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-full'>
  <div className=''>
    {/* Add to Cart Button */}
    <button 
      className='py-3 px-12 bg-white text-[#B88E2F] font-medium hover:text-white hover:bg-[#B88E2F]'
      onClick={() => addToCart(item)}
    >
      {isItemAdded(item) ? `Added (${isItemAdded(item)?.quantity})` : 'Add To Cart'}
    </button>

    {/* Share, Compare, Like Section */}
    <div className='flex justify-between items-center mt-3 w-full px-4'>
      <div className='flex items-center space-x-1'>
        <ShareAltOutlined />
        <span>Share</span>
      </div>
      <div className='flex items-center space-x-1'>
        <img src="/compare.png" alt="comparing arrows" />
        <span>Compare</span>
      </div>
      <div className='flex items-center space-x-1'>
        <HeartOutlined />
        <span>Like</span>
      </div>
    </div>
  </div>
</div>

            </div>
        </Link>

    )
}

export default ProductCard