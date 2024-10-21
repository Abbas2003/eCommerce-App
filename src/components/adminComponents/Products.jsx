import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Select, Input, Spin, Pagination } from 'antd';
import 'antd/dist/reset.css'; // Reset Ant Design styles

const { Option } = Select;
const { Search } = Input;

const Products = () => {
  const [products, setProducts] = useState([]); // All products fetched from the API
  const [filteredProducts, setFilteredProducts] = useState([]); // Products to display after filtering
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // Track current page for pagination
  const [pageSize, setPageSize] = useState(5); // Number of items per page

  // Fetch products from Dummy JSON API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/products?limit=150'); 
        setProducts(response.data.products);
        setFilteredProducts(response.data.products);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  // Handle category filter change
  const handleCategoryChange = (value) => {
    setCategoryFilter(value);
    filterProducts(value, searchText);
  };

  // Handle search input change with real-time filtering
  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchText(value);
    filterProducts(categoryFilter, value);
  };

  // Function to filter products based on category and search input
  const filterProducts = (category, search) => {
    let filtered = products;

    if (category !== 'all') {
      filtered = filtered.filter((product) => product.category === category);
    }

    if (search) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to the first page after filtering
  };

  // Handle pagination changes
  const handlePaginationChange = (page, size) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  // Paginate filtered products based on current page and page size
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Define the columns for the Ant Design table
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      responsive: ['xs', 'sm', 'md', 'lg'], // Show on all screen sizes
    },
    {
      title: 'Product Name',
      dataIndex: 'title',
      key: 'title',
      responsive: ['sm', 'md', 'lg'], // Hide on extra small screens
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      responsive: ['sm', 'md', 'lg'],
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `$ ${price.toLocaleString()}`,
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
    },
  ];

  return (
    <div className="container mx-auto p-4 poppins-font">
      <h1 className="text-2xl font-bold text-center my-6">Our Products</h1>

      {/* Filters */}
      <div className="flex flex-wrap justify-between items-center mb-4 space-y-3 sm:space-y-0">
        {/* Category Filter */}
        <Select
          defaultValue="all"
          onChange={handleCategoryChange}
          className="w-full sm:w-1/4"
          placeholder="Filter by Category"
        >
          <Option value="all">All Categories</Option>
          <Option value="sports-accessories">Sports</Option>
          <Option value="smartphones">Smartphones</Option>
          <Option value="laptops">Laptops</Option>
          <Option value="fragrances">Fragrances</Option>
          <Option value="beauty">Skincare</Option>
          <Option value="groceries">Grocery</Option>
          <Option value="furniture">Furniture</Option>
        </Select>

        {/* Search Input */}
        <Input
          placeholder="Search Products"
          value={searchText}
          onChange={handleSearchChange}
          allowClear
          className="w-full sm:w-1/4"
        />
      </div>

      {/* Product Table */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spin size="large" />
        </div>
      ) : (
        <>
          <Table
            columns={columns}
            dataSource={paginatedProducts}
            rowKey="id"
            pagination={false}
            className="overflow-x-auto"
          />

          {/* Pagination */}
          <div className="flex justify-center mt-4">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={filteredProducts.length}
              onChange={handlePaginationChange}
              showSizeChanger
              pageSizeOptions={['5', '10', '20']}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Products;
