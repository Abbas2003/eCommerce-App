import React, { useContext } from 'react'
import QualitySection from '../components/QualitySection';
import Hero from '../components/Hero';
import { DeleteFilled } from '@ant-design/icons';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router';
import { UserContext } from '../context/UserContext';

const Cart = () => {

  const { cartItems, removeFromCart } = useContext(CartContext)
  // console.log("items ->", cartItems);

  const navigate = useNavigate()


  return (
    <section className='poppins-font'>
      <Hero currentPage={'Cart'} PreviousPage={'Home'} />

      <div className="container mx-auto p-4 my-[3rem]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Product Table */}
          <div className="lg:col-span-2 bg-white rounded-lg overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="text-left bg-[#F9F1E7]">
                  <th className="p-4">Product</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Quantity</th>
                  <th className="p-4">Subtotal</th>
                  <th className="p-4"></th>
                </tr>
              </thead>
              <tbody>
                {
                  cartItems.map((item) => {
                    // console.log("item",item.price)
                    return (
                      <tr key={item?.id}>
                        <td className="flex items-center p-4">
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="w-14 h-14 rounded-md mr-4"
                          />
                          <span className='text-[#9F9F9F]'>{item.title}</span>
                        </td>
                        <td className="p-4 text-[#9F9F9F]">Rs. {item.price}</td>
                        <td className="flex items-center justify-center">
                          <span className='border py-1 px-3 rounded-md'>{item.quantity}</span>
                        </td>
                        <td className="p-4">Rs. 250,000.00</td>
                        <td className="p-4">
                          <button className="text-[#B88E2F] hover:text-black transition">
                            <DeleteFilled onClick={() => removeFromCart(item)} />
                          </button>
                        </td>
                      </tr>
                    )
                  })
                }

              </tbody>
            </table>
          </div>

          {/* Cart Totals */}
          <div className="bg-[#F9F1E7] px-12 py-3">
            <h2 className="text-[32px] md:mb-8 font-bold mb-4 text-center ">Cart Totals</h2>

            <div className='my-[3rem] space-y-7'>
              <div className="flex justify-between mb-2">
                <span className='font-semibold'>Subtotal</span>
                <span className='text-[#9F9F9F]'>Rs. 250,000.00</span>
              </div>
              <div className="flex justify-between font-semibold text-lg mb-4">
                <span>Total</span>
                <span className="text-[#B88E2F]">Rs. 250,000.00</span>
              </div>
              <div className='text-center'>
                <button className="w-full md:w-1/2 border border-black py-2 rounded-xl text-[20px] hover:text-white hover:bg-black transition" onClick={() => navigate('/checkout')}>
                  Check Out
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>

      <QualitySection />
    </section>
  )
}

export default Cart;