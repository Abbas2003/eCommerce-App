// src/components/Sidebar.js
import React from 'react';
import { Menu, Button } from 'antd';
import { ShoppingCartOutlined, UserOutlined, CloseOutlined } from '@ant-design/icons';

const UserSidebar = ({ onClose, onMenuClick }) => {
  return (
    <div className="flex flex-col h-full poppins-font">
      {/* Close button visible only on small screens */}
      <div className="flex justify-end lg:hidden">
        <Button type="link" icon={<CloseOutlined />} onClick={onClose} />
      </div>

      <Menu mode="inline" defaultSelectedKeys={['1']} className="pt-10" style={{ height: '100%', borderRight: 0 }}>
        <Menu.Item key="1" icon={<UserOutlined />} onClick={() => onMenuClick('1')}>
          User Profile
        </Menu.Item>
        <Menu.Item key="2" icon={<ShoppingCartOutlined />} onClick={() => onMenuClick('2')}>
          Order
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default UserSidebar;