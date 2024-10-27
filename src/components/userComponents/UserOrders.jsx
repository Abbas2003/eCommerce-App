import React, { useEffect, useState } from 'react';
import { Table, Spin, Typography, message, Select, Tag } from 'antd';
import 'antd/dist/reset.css'; // Reset Ant Design styles
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../utils/firebase';

const { Title } = Typography;
const { Option } = Select;

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch orders from Firestore
  const fetchOrdersFromDB = async () => {
    try {
      const usersSnapshot = await getDocs(collection(db, 'users'));
      const allOrders = [];

      // Loop through each user and fetch their orders
      for (const userDoc of usersSnapshot.docs) {
        const userOrdersRef = collection(userDoc.ref, 'orders');

        const ordersSnapshot = await getDocs(userOrdersRef);

        // Map through orders and add them to the allOrders array
        ordersSnapshot.forEach((orderDoc) => {
          allOrders.push({ id: orderDoc.id, ...orderDoc.data(), userDocRef: userDoc.ref });
        });
      }

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

  // Handle status change
  const handleStatusChange = async (order, newStatus) => {
    try {
      const orderRef = doc(order.userDocRef, 'orders', order.id);
      await updateDoc(orderRef, { status: newStatus });

      // Update the status locally
      const updatedOrders = orders.map((o) =>
        o.id === order.id ? { ...o, status: newStatus } : o
      );
      setOrders(updatedOrders);
      message.success('Status updated successfully!');
    } catch (error) {
      message.error('Failed to update status.');
      console.error('Error updating status:', error);
    }
  };

  // Function to render the status with color tags
  const renderStatusTag = (status) => {
    const statusColors = {
      pending: 'orange',
      shipped: 'blue',
      done: 'green',
    };

    return <Tag color={statusColors[status]}>{status.toUpperCase()}</Tag>;
  };

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
      title: 'Products',
      key: 'products',
      render: (_, record) => (
        <ul>
          {record.items.map((item, index) => (
            <li key={index}>
              <strong>{item.title}</strong> - Rs. {item.price} (Qty: {item.quantity || 1})
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: 'Quantity',
      dataIndex: 'totalQuantity',
      key: 'quantity',
    },
    {
      title: 'Status',
      key: 'status',
      render: (_, record) => (
        <Select
          value={record.status}
          onChange={(newStatus) => handleStatusChange(record, newStatus)}
          style={{ width: 120 }}
        >
          {/* Pending status with orange color tag */}
          <Option value="pending">
            <Tag color="orange">Pending</Tag>
          </Option>

          {/* Shipped status with blue color tag */}
          <Option value="shipped">
            <Tag color="blue">Shipped</Tag>
          </Option>

          {/* Done status with green color tag */}
          <Option value="done">
            <Tag color="green">Done</Tag>
          </Option>
        </Select>
      ),
    },
    {
      title: 'Total Price',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (price) => `Rs. ${price.toLocaleString()}`,
    },
    {
      title: 'Payment Method',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
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

export default UserOrders;
