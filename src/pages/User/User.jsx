// src/components/AdminPanel.js
import React, { useContext, useEffect, useState } from 'react';
import { Layout, Button, Form, Input, Spin, Typography, message } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../utils/firebase'; // Adjust path if needed
import UserSidebar from '../../components/userComponents/UserSidebar';
import { UserContext } from '../../context/UserContext'; // Context import

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const UserPanel = () => {
  const { user } = useContext(UserContext); // Get user from context
  const [collapsed, setCollapsed] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false); // Track edit mode
  const [selectedKey, setSelectedKey] = useState('1');

  const userId = user?.userInfo?.id?.toString(); // Ensure id is a string
  console.log(userId);
  
  const handleMenuClick = (key) => {
    setSelectedKey(key);

    // Auto-collapse sidebar only on small screens
    if (window.innerWidth < 1024) {
      setCollapsed(true);
    }
  };

  // Toggle sidebar collapse
  const toggleCollapsed = () => setCollapsed(!collapsed);

  // Fetch logged-in user's data from Firestore
  const fetchUserData = async () => {
    if (!userId) {
      message.error('User ID is missing.');
      return;
    }

    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) {
        setUserData(userDoc.data());
      } else {
        message.error('User not found.');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user data:', error);
      message.error('Failed to load user data.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [userId]); // Re-fetch if userId changes

  // Handle form submission to update user data
  const onFinish = async (values) => {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, values);
      setUserData({ ...userData, ...values });
      setEditing(false);
      message.success('User info updated successfully!');
    } catch (error) {
      console.error('Error updating user info:', error);
      message.error('Failed to update user info.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Layout style={{ minHeight: '100vh' }} className="poppins-font">
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        collapsible
        collapsed={collapsed}
        onCollapse={toggleCollapsed}
        className={`site-layout-background ${collapsed ? 'absolute' : 'relative'} z-10`}
        width={200}
      >
        <UserSidebar onClose={toggleCollapsed} onMenuClick={handleMenuClick} />
      </Sider>

      <Layout>
        <Header className="bg-white shadow-lg flex justify-between items-center px-4 lg:px-8">
          <Button
            type="link"
            icon={<MenuOutlined />}
            onClick={toggleCollapsed}
            className="lg:hidden"
          />
          <Title level={3} className="mb-0 text-gray-800">User Panel</Title>
        </Header>

        <Content style={{ margin: '24px 16px 0' }}>
          <div className="site-layout-background p-6 rounded-lg shadow-md">
            {!editing ? (
              <div className="user-info">
                <Title level={4}>User Details</Title>
                <p><strong>Name:</strong> {userData?.name}</p>
                <p><strong>Email:</strong> {userData?.email}</p>
                <p><strong>Phone:</strong> {userData?.phone || 'N/A'}</p>

                <Button
                  type="primary"
                  onClick={() => setEditing(true)}
                  className="mt-4"
                >
                  Edit Info
                </Button>
              </div>
            ) : (
              <Form
                layout="vertical"
                initialValues={userData}
                onFinish={onFinish}
              >
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[{ required: true, message: 'Please enter your name' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Email"
                  name="email"
                  rules={[{ required: true, message: 'Please enter your email' }]}
                >
                  <Input type="email" />
                </Form.Item>

                <Form.Item label="Phone" name="phone">
                  <Input />
                </Form.Item>

                <div className="flex justify-end mt-4">
                  <Button onClick={() => setEditing(false)} className="mr-2">
                    Cancel
                  </Button>
                  <Button type="primary" htmlType="submit">
                    Save
                  </Button>
                </div>
              </Form>
            )}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default UserPanel;
