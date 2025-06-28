import React from 'react';
import Sidebar from './Sidebar';
import NavbarTop from './NavbarTop';

const AdminLayout = ({ children }) => {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <NavbarTop />
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
