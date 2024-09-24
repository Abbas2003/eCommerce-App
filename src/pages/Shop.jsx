import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { Pagination } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import QualitySection from '../components/QualitySection';
import Hero from '../components/Hero';

const Shop = () => {

  const [products, setProducts] = useState([])
  const [skip, setSkip] = useState(0)
  const [total, setTotal] = useState(20)
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    axios.get('https://dummyjson.com/products')
      .then(res => setProducts(res.data.products))
  }, [])

  useEffect(() => {
    axios.get(`https://dummyjson.com/products?limit=20&skip=${skip}`)
      .then(res => {
        setProducts(res.data.products)
        setTotal(res.data.total)
        setLoading(false)
      })
      .catch(err => alert(err.message))
  }, [skip])

  return (
    <section>

      <Hero currentPage={'Shop'} PreviousPage={'Home'} />

      <div style={{ backgroundColor: '#F9F1E7', padding: '30px 70px', display: 'flex', justifyContent: 'space-between' }}>
        <div className='flex gap-4 text-sm'>
          <div className='flex gap-3 items-center'>
            <span><img src="/Vector.svg" alt="" /></span>
            <span className='text-lg'>Filter</span>
          </div>
          <div className='flex gap-5 items-center ml-3'>
            <span><img src="/dots.svg" alt="" /></span>
            <span><img src="/Vector2.svg" alt="" /></span>
          </div>
          <div className='flex items-center' style={{ borderLeft: '1px solid #9F9F9F', paddingLeft: '1.3rem' }}>
            <p>Showing 1-16 of 32 results</p>
          </div>
        </div>

        <div className='flex items-center gap-3'>
          <div>
            Show
            <span className='p-3 bg-white text-gray-300 ml-4'>16</span>
          </div>
          <div>
            Sort by
            <select name="" className='py-3 px-4 bg-white text-gray-300 ml-4'>
              <option value="">Default</option>
              <option value="">A</option>
              <option value="">B</option>
              <option value="">C</option>
            </select>
          </div>
        </div>
      </div>

      {/* All Products */}
      <div className='container mx-auto gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-10'>
        {products.map(product => (
          <ProductCard item={product} key={product.id} />
        ))}
      </div>

      {/* Pagination */}
      <div className='flex justify-center my-10'>
        <Pagination
          defaultCurrent={1}
          total={total}
          pageSize={20}
          onChange={(num) => {
            setSkip((num - 1) * 20)
          }}
        />
      </div>

      <QualitySection />

    </section>
  );
};

export default Shop;
