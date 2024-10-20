// src/components/AdminPanel.js
import React, { useState } from 'react';
import { Layout, Button, Menu } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import Products from '../../components/adminComponents/Products';
import Orders from '../../components/adminComponents/Orders';
import Users from '../../components/adminComponents/Users';
import Sidebar from '../../components/adminComponents/Sidebar';

const { Header, Sider, Content } = Layout;

const AdminPanel = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState('1'); // Default selected key

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleMenuClick = (key) => {
    setSelectedKey(key);
  };

  const renderContent = () => {
    switch (selectedKey) {
      case '1':
        return <Products />;
      case '2':
        return <Orders />;
      case '3':
        return <Users />;
      default:
        return <Products />;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        collapsible
        collapsed={collapsed}
        onCollapse={toggleCollapsed}
        className={`site-layout-background ${collapsed ? 'absolute' : 'relative'} z-10`}
        width={200}
      >
        <Sidebar onClose={toggleCollapsed} onMenuClick={handleMenuClick} />
      </Sider>
      <Layout>
        <Header className="bg-white shadow-lg flex justify-between items-center">
          <Button type="link" icon={<MenuOutlined />} onClick={toggleCollapsed} className="lg:hidden" />
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </Header>
        <Content style={{ margin: '24px 16px 0' }}>
          <div className="site-layout-background p-4 rounded-lg shadow-md">
            {renderContent()}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminPanel;