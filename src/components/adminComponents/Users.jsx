// src/components/adminComponents/Users.js
import React, { useEffect, useState } from 'react';
import { Table, Spin } from 'antd';
import { collection, getDocs } from 'firebase/firestore';
import 'antd/dist/reset.css'; // Ant Design styles reset
import { db } from '../../utils/firebase';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users from Firestore
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const userList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(userList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  // Define columns for the Ant Design table
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      responsive: ['xs', 'sm', 'md', 'lg'], // Show on all screen sizes
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      responsive: ['sm', 'md', 'lg'], // Hide on extra small screens
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      responsive: ['sm', 'md', 'lg'],
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
  ];

  return (
    <div className="container mx-auto p-4 poppins-font">
      <h1 className="text-2xl font-bold text-center my-6">Users</h1>

      {/* Show loading spinner while fetching data */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spin size="large" />
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={users}
          rowKey="id"
          pagination={{ pageSize: 5 }}
          className="overflow-x-auto"
        />
      )}
    </div>
  );
};

export default Users;
