import React from "react";
import "./Layout.css";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const Layout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const userMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Appointments",
      path: "/appointments",
      icon: "ri-file-list-line",
    },
    {
      name: "Apply Doctor",
      path: "/apply-doctor",
      icon: "ri-hospital-line",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: "ri-file-user-line",
    },
    {
      name: "Logout",
      path: "/logout",
      icon: "ri-logout-box-line",
    },
  ];

  const menuToBeRendered = userMenu;

  return (
    <div className="main">
      <div className="d-flex layout">
        <div className={`sidebar ${collapsed && "collapsed-sidebar"}`}>
          <div className="sidebar-header">
            {collapsed ? (
              <i className="ri-hospital-fill hospital-icon"></i>
            ) : (
              <h1 className="logo-text">HEALTHM</h1>
            )}
          </div>
          <div className="menu">
            {menuToBeRendered.map((menu, index) => {
              const isActive = location.pathname === menu.path;
              return (
                <div
                  className={`${
                    isActive
                      ? "d-flex menu-item active-menu-item"
                      : "d-flex menu-item"
                  }`}
                  key={index}
                >
                  <i className={menu.icon}></i>
                  {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
                </div>
              );
            })}
          </div>
        </div>
        <div className="content">
          <div className="header">
            <i
              className="ri-close-line remix-icon"
              onClick={() => setCollapsed(!collapsed)}
            ></i>
          </div>
          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
