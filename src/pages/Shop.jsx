import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { Pagination } from 'antd';
import QualitySection from '../components/QualitySection';
import Hero from '../components/Hero';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(20);
  const [sortBy, setSortBy] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch products based on sortBy and pagination (skip)
  const fetchProducts = () => {
    setLoading(true);
    axios
      .get(`https://dummyjson.com/products`, {
        params: {
          limit: 20,
          skip: skip,
          sortBy: sortBy, // Include sortBy in the API call
        },
      })
      .then((res) => {
        setProducts(res.data.products);
        setTotal(res.data.total);
        setLoading(false);
      })
      .catch((err) => {
        alert('Error fetching products: ' + err.message);
        setLoading(false);
      });
  };

  // Trigger fetchProducts on initial load and whenever sortBy or skip changes
  useEffect(() => {
    fetchProducts();
  }, [sortBy, skip]);

  // Handle sorting change
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setSkip(0); // Reset pagination on sort change
  };

  return (
    <section className='poppins-font'>
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
            <p>Showing {products.length} of {total} results</p>
          </div>
        </div>

        <div className='flex items-center gap-3'>
          <div>
            Show
            <span className='p-3 bg-white text-gray-300 ml-4'>{products.length}</span>
          </div>
          <div>
            Sort by
            <select value={sortBy} onChange={handleSortChange} className='py-3 px-4 bg-white text-gray-300 ml-4'>
              <option value="">Default</option>
              <option value="title">Title</option>
              <option value="asc">Price: Low to High</option>
              <option value="desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* All Products */}
      {
        loading
          ? <h1 className='text-center text-3xl font-semibold my-10'>Loading...</h1>
          : <div className='container mx-auto gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-10'>
            {loading ? (
              <p>Loading products...</p> // Show loading state
            ) : (
              products.map(product => (
                <ProductCard item={product} key={product.id} />
              ))
            )}
          </div> 
      }


      {/* Pagination */}
      <div className='flex justify-center my-10'>
        <Pagination
          defaultCurrent={1}
          total={total}
          pageSize={20}
          onChange={(page) => setSkip((page - 1) * 20)}
        />
      </div>

      <QualitySection />
    </section>
  );
};

export default Shop;
