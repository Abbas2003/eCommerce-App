import React, { useEffect, useState } from 'react';
import { Table, Spin, Typography, message } from 'antd';
import 'antd/dist/reset.css'; // Reset Ant Design styles
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../utils/firebase';

const { Title } = Typography;

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch orders from Firestore
  const fetchOrdersFromDB = async () => {
    try {
      const usersSnapshot = await getDocs(collection(db, 'users'));
      const allOrders = [];

      // Loop through each user and fetch their orders
      for (const userDoc of usersSnapshot.docs) {
        const userOrdersRef = collection(userDoc.ref, 'orders'); // Access orders sub-collection
        
        const ordersSnapshot = await getDocs(userOrdersRef);
        console.log(ordersSnapshot);

        // Map through orders and add them to the allOrders array
        ordersSnapshot.forEach((orderDoc) => {
          allOrders.push({ id: orderDoc.id, ...orderDoc.data() });
        });
      }

      console.log(allOrders);
      
      
      setOrders(allOrders);
      setLoading(false);
    } catch (error) {
      message.error('Failed to load orders. Please try again.');
      console.error('Error fetching orders:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrdersFromDB();
  }, []);

  // Define columns for the table
  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Email',
      dataIndex: 'user',
      key: 'user',
    },
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'product',
    },
    {
      title: 'Quantity',
      dataIndex: 'totalQuantity',
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
