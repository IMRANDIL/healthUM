import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { setUsers } from "../../Redux/allUsersSlice";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import axios from "axios";
import toast from "react-hot-toast";
import { showLoading, hideLoading } from "../../Redux/alertsSlice";
import { Table } from "antd";
import moment from "moment";

const Users = () => {
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);

  const onChange = (current, value) => {
    setPage(value);
  };

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        dispatch(showLoading());
        const response = await axios.get(
          `https://server-healthum.onrender.com/api/admin/allUsers?page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        dispatch(hideLoading());
        if (response && response.data.success) {
          setPages(response.data.pages);
          return dispatch(setUsers(response.data.users));
        }
      } catch (error) {
        dispatch(hideLoading());
        return toast.error(
          error.response.data.msg ? error.response.data.msg : error.message,
          {
            duration: 1000,
          }
        );
      }
    };

    getAllUsers();
  }, [dispatch, page]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (text, record) => moment(record.createdAt).format("DD-MM-YYYY"),
    },
    {
      title: "Action",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          <h1 className="anchor">Block</h1>
        </div>
      ),
    },
  ];

  return (
    <>
      <Layout>
        <div className="inputContainer">
          <h1 className="page-title">All Users:</h1>
          <input type="text" placeholder="Search Users Here" />
        </div>

        <Table columns={columns} dataSource={users} />
      </Layout>
      {pages > 1 && (
        <div className="pagination_container">
          <Stack spacing={2}>
            <Pagination count={pages} page={page} onChange={onChange} />
          </Stack>
        </div>
      )}
    </>
  );
};

export default Users;
