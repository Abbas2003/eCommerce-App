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

      <div
        style={{ backgroundColor: '#F9F1E7', padding: '30px 70px' }}
        className="flex flex-col md:flex-row md:justify-between gap-4"
      >
        {/* Left Section */}
        <div className="flex flex-col sm:flex-row gap-4 text-sm sm:text-base">
          <div className="flex gap-3 items-center">
            <span>
              <img src="/Vector.svg" alt="Filter Icon" />
            </span>
            <span className="text-lg sm:text-base">Filter</span>
          </div>

          <div className="flex gap-5 items-center md:ml-3 ml-0">
            <span>
              <img src="/dots.svg" alt="Dots Icon" />
            </span>
            <span>
              <img src="/Vector2.svg" alt="Another Icon" />
            </span>
          </div>

          <div
            className="flex items-center border-t sm:border-t-0 sm:border-l border-gray-400 pl-0 sm:pl-5"
          >
            <p className="text-xs sm:text-sm py-2">
              Showing {products.length} of {total} results
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 space-y-2 md:space-y-0">
          <div className="text-xs sm:text-sm">
            Show
            <span className="p-3 bg-white text-gray-500 ml-4">
              {products.length}
            </span>
          </div>

          <div className="text-xs sm:text-sm flex items-center space-y-2 md:space-y-0 justify-center">
            <div className=''>Sort by</div>
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="py-2 px-3 bg-white text-gray-500 ml-2 md:ml-4 rounded w-32 sm:w-44"
            >
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
