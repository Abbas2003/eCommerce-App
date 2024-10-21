// src/components/adminComponents/Orders.js
import React, { useEffect, useState } from 'react';
import { Table, Spin, Typography } from 'antd';
import 'antd/dist/reset.css'; // Reset Ant Design styles

const { Title } = Typography;

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch orders from localStorage
  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    setOrders(storedOrders);
    setLoading(false);
  }, []);

  // Define columns for the table
  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'product',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Total Price',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (price) => `Rs. ${price.toLocaleString()}`,
    },
  ];

  return (
    <div className="container mx-auto p-4 poppins-font">
      <Title level={2} className="text-center mb-6">
        User Orders
      </Title>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spin size="large" />
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center">
          <p>No orders found.</p>
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={orders}
          rowKey="id"
          pagination={{ pageSize: 5 }}
          className="overflow-x-auto"
        />
      )}
    </div>
  );
};

export default Orders;