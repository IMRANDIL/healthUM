import React from "react";
import "./Layout.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { showLoading, hideLoading } from "../Redux/alertsSlice";
import { Badge } from "antd";
const Layout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
  ];

  const doctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Appointments",
      path: "/doctor/appointments",
      icon: "ri-file-list-line",
    },

    {
      name: "Profile",
      path: `/doctor/profile/${user && user._id}`,
      icon: "ri-file-user-line",
    },
  ];

  const adminMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: "ri-user-line",
    },
    {
      name: "Doctors",
      path: "/admin/doctors",
      icon: "ri-hospital-line",
    },
    {
      name: "Profile",
      path: "/admin/profile",
      icon: "ri-file-user-line",
    },
  ];

  const menuToBeRendered =
    user && user.isAdmin
      ? adminMenu
      : user && user.isDoctor
      ? doctorMenu
      : userMenu;
  const role =
    user && user.isAdmin ? "Admin" : user && user.isDoctor ? "Doctor" : "User";
  const handleLogout = () => {
    dispatch(showLoading());
    toast.success("Logout successful!", {
      duration: 3000,
    });
    localStorage.removeItem("token");
    dispatch({
      user: null,
    });
    return dispatch(hideLoading());
  };

  return (
    <div className="main">
      <div className="d-flex layout">
        <div className={`sidebar ${collapsed && "collapsed-sidebar"}`}>
          <div className="sidebar-header">
            {collapsed ? (
              <i className="ri-hospital-fill hospital-icon"></i>
            ) : (
              <>
                <h1 className="logo-text">HEALTHM</h1>
                <h2 className="role">{role}</h2>
              </>
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

            <div className="d-flex menu-item">
              <i className="ri-logout-box-line"></i>
              {!collapsed && (
                <Link to="/login" onClick={handleLogout}>
                  Logout
                </Link>
              )}
            </div>
          </div>
        </div>
        <div className="content">
          <div className="header">
            <i
              className={`ri-${
                collapsed ? "menu-2-line" : "close-line"
              } remix-icon`}
              onClick={() => setCollapsed(!collapsed)}
            ></i>
            <div className="d-flex align-items-center px-4">
              <Badge
                count={user?.unseenNotifications.length}
                onClick={() => navigate("/notifications")}
              >
                <i className="ri-notification-line remix-icon px-3"></i>
              </Badge>

              <Link to="/profile" className="anchor-profile">
                {user && user?.name ? user?.name[0] + user?.name[1] : "??"}
              </Link>
            </div>
          </div>
          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
