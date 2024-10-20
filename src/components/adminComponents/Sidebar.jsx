// src/components/Sidebar.js
import React from 'react';
import { Menu, Button } from 'antd';
import { ShoppingCartOutlined, UserOutlined, AppstoreAddOutlined, CloseOutlined } from '@ant-design/icons';

const Sidebar = ({ onClose, onMenuClick }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-end p-2">
        <Button type="link" icon={<CloseOutlined />} onClick={onClose} className="lg:hidden" />
      </div>
      <Menu mode="inline" defaultSelectedKeys={['1']} style={{ height: '100%', borderRight: 0 }}>
        <Menu.Item key="1" icon={<AppstoreAddOutlined />} onClick={() => { onMenuClick('1'); onClose(); }}>
          Products
        </Menu.Item>
        <Menu.Item key="2" icon={<ShoppingCartOutlined />} onClick={() => { onMenuClick('2'); onClose(); }}>
          Orders
        </Menu.Item>
        <Menu.Item key="3" icon={<UserOutlined />} onClick={() => { onMenuClick('3'); onClose(); }}>
          Users
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Sidebar;