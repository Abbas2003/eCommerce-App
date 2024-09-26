import { Image, Rate } from 'antd';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { UserOutlined } from '@ant-design/icons';
import ProductCard from '../components/ProductCard';
import { CartContext } from '../context/CartContext';

const SingleProduct = () => {

  const { id } = useParams()
  const [product, setProduct] = useState({})
  const [relProducts, setrelProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(4);
  const {addToCart, isItemAdded, updateCart, cartItems} = useContext(CartContext)

  useEffect(() => {
    // Fetch the product with the given id
    axios.get(`https://dummyjson.com/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.log(err))
  }, [])

  console.log("cartItems->", cartItems[0].quantity);
  // console.log("product->", product);

  useEffect(() => {
    axios.get('https://dummyjson.com/products')
      .then((response) => {
        setrelProducts(response.data.products);
      })
      .catch((error) => {
        console.error('Error fetching the products:', error);
      });
  }, []);

  


  const [count, setCount] = useState(1);
  const handleDecrease = () => {
    setCount(count > 1 ? count - 1 : 1); // Prevent going below 1
    updateCart(product, "minus")
  };

  const handleIncrease = () => {
    setCount(count + 1);
    updateCart(product, "plus")
  };

  const [activeTab, setActiveTab] = useState('Details');

  const tabs = ['Description', 'Additional Information', `Reviews [${product?.reviews?.length}]`];



  return (
    <section>
      <div className='bg-[#F9F1E7] md:py-[30px] md:px-[70px] p-8 flex justify-between' >
        <div className='flex gap-2 text-gray-400'>
          <span>Home ></span>
          <span>Shop ></span>
          <span className='text-black border-l pl-2 border-gray-400'>{product?.title}</span>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10'>
        <div className='bg-[#F9F1E7] md:m-8 lg:m-8 m-4  rounded-lg flex flex-col jusitfy-center items-center'>
          <Image src={product?.thumbnail} alt={product?.title} preview={false} />
        </div>
        <div className='px-6'>
          <h1 className='text-[42px] font-medium'>{product?.title}</h1>
          <p className='text-[24px] text-[#9F9F9F]'>Rs. {product?.price}</p>
          <p className='text-lg text-[#9F9F9F] my-5'>
            {product?.reviews ? `${product.reviews.length} Customer Review` : 'No Customer Reviews'}
          </p>
          <p className='mb-8'>{product?.description}</p>

          <div className='mb-3'>
            <p className='text-[#9F9F9F] mb-3'>Size</p>
            <div className='flex gap-2'>
              <p className='p-2 bg-[#F9F1E7] hover:bg-[#B88E2F] hover:text-white rounded'>L</p>
              <p className='p-2 bg-[#F9F1E7] hover:bg-[#B88E2F] hover:text-white rounded'>XL</p>
              <p className='p-2 bg-[#F9F1E7] hover:bg-[#B88E2F] hover:text-white rounded'>XS</p>
            </div>
          </div>
          <div className='mb-6'>
            <p className='text-[#9F9F9F] mb-3'>Color</p>
            <div className='flex gap-2'>
              <div className='w-6 h-6 rounded-full bg-[#816DFA]'></div>
              <div className='w-6 h-6 rounded-full bg-black'></div>
              <div className='w-6 h-6 rounded-full bg-[#B88E2F]'></div>
            </div>
          </div>

          {/* Buttons */}
          <div className='flex flex-col md:flex-row mb-10 items-center gap-3'>
            <div className="flex items-center justify-center h-14 rounded-lg bg-white border border-gray-300">
              <button
                className="w-8 h-full text-[22px] text-gray-600 hover:text-gray-800 focus:outline-none"
                onClick={handleDecrease}
              >
                -
              </button>
              <span className="w-8 text-center">{count}</span>
              <button
                className="w-8 h-full text-gray-600 hover:text-gray-800 focus:outline-none"
                onClick={handleIncrease}
              >
                +
              </button>
            </div>

            <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
              <button 
                className='py-2 px-6 border rounded-lg border-black text-[20px] w-full md:w-auto'
                onClick={() => addToCart(product)}
              >
               Add to Cart
              </button>
              <button className='py-2 px-6 border rounded-lg border-black text-[20px] w-full md:w-auto'>
                + Compare
              </button>
            </div>
          </div>


          {/* Table */}
          <div className="max-w-3xl mx-auto p-4 md:p-6 lg:p-8 border-t border-[#D9D9D9] rounded-md">
            <table className="md:w-2/4 lg:w-2/4 w-full">
              <tbody className='text-[#9F9F9F]'>
                <tr>
                  <td className="py-2 text-sm font-medium">SKU</td>
                  <td className="py-2 text-sm">:</td>
                  <td className="py-2 text-sm pl-2">{product.sku}</td>
                </tr>
                <tr>
                  <td className="py-2 text-sm font-medium">Category</td>
                  <td className="py-2 text-sm">:</td>
                  <td className="py-2 text-sm pl-2">
                    {product?.category
                      ? product.category.charAt(0).toUpperCase() + product.category.slice(1)
                      : <span className="text-gray-500">No category available</span>}
                  </td>
                </tr>
                <tr>
                  <td className="py-2 text-sm font-medium">Tags</td>
                  <td className="py-2 text-sm">:</td>
                  <td className="py-2 text-sm pl-2">
                    {product?.tags && product.tags.length > 0 ? (
                      product.tags.join(', ')
                    ) : (
                      <span className="text-gray-500">No tags available</span>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="py-2 text-sm font-medium">Share</td>
                  <td className="py-2 text-sm">:</td>
                  <td className="py-2 text-sm flex space-x-4 pl-2">
                    <a href="#">
                      <img src='/facebook.png' />
                    </a>
                    <a href="#">
                      <img src='/linkedin.png' />
                    </a>
                    <a href="#">
                      <img src='/twitter.png' />
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Product info section */}
      <div className="py-8 border-t border-b border-gray-200">
        {/* Tabs */}
        <div className="flex pt-5 flex justify-center">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-4 text-sm md:text-[24px] lg:text-[24px] ${activeTab === tab
                ? 'border-b-2 border-blue-500 text-black'
                : 'text-[#9F9F9F]'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'Description' && (
            <div className="container mx-auto p-4 md:p-6 lg:p-6">
              {/* Description Section */}
              <div className="mb-8 p-4">
                <p className="text-[#9F9F9F] text-base leading-relaxed flex text-justify">
                  {product?.description}
                </p>
              </div>

              {/* Images Section */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {product?.images && product.images.map((image, index) => (
                  <div key={index} className="overflow-hidden rounded-lg shadow-md bg-[#F9F1E7]">
                    <img src={image} alt={`Product Image ${index + 1}`} className="w-full h-auto object-cover" />
                  </div>
                ))}
              </div>
            </div>

          )}

          {activeTab === 'Additional Information' && (
            <div className='max-w-3xl mx-auto p-4 md:p-6 lg:p-8'>
              {/* Add your Addition Info content here */}
              <table className="w-full table-auto">
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 text-sm font-medium text-gray-900">Brand</td>
                    <td className="py-2 text-sm text-gray-700">:</td>
                    <td className="py-2 text-sm text-gray-700">{product.brand}</td>
                  </tr>

                  <tr className="border-b">
                    <td className="py-2 text-sm font-medium text-gray-900">Product Name</td>
                    <td className="py-2 text-sm text-gray-700">:</td>
                    <td className="py-2 text-sm text-gray-700">{product.title}</td>
                  </tr>

                  <tr className="border-b">
                    <td className="py-2 text-sm font-medium text-gray-900">Category</td>
                    <td className="py-2 text-sm text-gray-700">:</td>
                    <td className="py-2 text-sm text-gray-700">
                      {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                    </td>
                  </tr>

                  <tr className="border-b">
                    <td className="py-2 text-sm font-medium text-gray-900">Price</td>
                    <td className="py-2 text-sm text-gray-700">:</td>
                    <td className="py-2 text-sm text-gray-700">${product.price.toFixed(2)}</td>
                  </tr>

                  <tr className="border-b">
                    <td className="py-2 text-sm font-medium text-gray-900">Warrent</td>
                    <td className="py-2 text-sm text-gray-700">:</td>
                    <td className="py-2 text-sm text-gray-700">{product.warrantyInformation}</td>
                  </tr>

                  <tr className="border-b">
                    <td className="py-2 text-sm font-medium text-gray-900">Delivery</td>
                    <td className="py-2 text-sm text-gray-700">:</td>
                    <td className="py-2 text-sm text-gray-700">{product.shippingInformation}</td>
                  </tr>

                  <tr>
                    <td className="py-2 text-sm font-medium text-gray-900">Stock</td>
                    <td className="py-2 text-sm text-gray-700">:</td>
                    <td className="py-2 text-sm text-gray-700">{product.stock}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === `Reviews [${product?.reviews?.length}]` && (
            <div className='max-w-4xl mx-auto p-6 md:p-8'>
              {/* Add your Review content here */}
              <div>
                {product?.reviews.length > 0 ? (
                  product?.reviews.map((review, index) => (
                    <div
                      key={index}
                      className="mb-6 p-6 bg-white rounded-lg shadow-md flex flex-col md:flex-row md:items-start">
                      {/* Reviewer Avatar */}
                      <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                        <UserOutlined className="text-3xl p-3 border rounded-full bg-gray-200 text-gray-600" />
                      </div>

                      {/* Review Details */}
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xl font-semibold text-gray-800">{review?.reviewerName}</h4>
                          <Rate disabled value={review.rating} className="text-yellow-500" />
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{new Date(review.date).toLocaleDateString()}</p>
                        <p className="mt-4 text-gray-700 leading-relaxed">{review.comment}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center">No reviews available for this product.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related products component */}
      <div className='my-12'>
        <h2 className='text-4xl font-semibold text-center md:mb-9 mb-4'>Related Products</h2>
        <div className='container mx-auto'>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relProducts.slice(0, visibleProducts).map((product) => (
              <ProductCard item={product} key={product.id} />
            ))}
          </div>
          <div className='mb-[4rem] mt-7 text-center'>
              <button className="text-[#B88E2F] border border-[#B88E2F] px-[3.5rem] py-3 font-semibold">
                Show More
              </button>
          </div>
        </div>
      </div>

    </section>
  )
}

export default SingleProduct;