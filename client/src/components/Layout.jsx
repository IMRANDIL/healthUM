import React from "react";
import "./Layout.css";

const Layout = ({ children }) => {
  const userMenu = [
    {
      name: "Home",
      path: "/",
      icon: "",
    },
    {
      name: "Appointments",
      path: "/appointments",
      icon: "",
    },
    {
      name: "Apply Doctor",
      path: "/apply-doctor",
      icon: "",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: "",
    },
    {
      name: "Logout",
      path: "/logout",
      icon: "",
    },
  ];

  const menuToBeRendered = userMenu;

  return (
    <div className="main">
      <div className="d-flex layout">
        <div className="sidebar">
          <div className="sidebar-header">
            <h1>HTHM</h1>
          </div>
          <div className="menu">
            {menuToBeRendered.map((menu) => {
              return <div></div>;
            })}
          </div>
        </div>
        <div className="content">
          <div className="header">Header</div>
          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
