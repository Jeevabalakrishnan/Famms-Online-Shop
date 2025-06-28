
import React, { useEffect, useState } from "react";
import {
  Container,
  Table,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { FaEye, FaFileExcel, FaFileCsv } from "react-icons/fa";
import { BsFileEarmarkPdfFill } from "react-icons/bs";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [viewUser, setViewUser] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/user/users");
      setUsers(res.data.reverse()); // Descending order
    } catch (err) {
      console.error("Error fetching users:", err.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleSelectAll = () => {
    const currentPageIds = currentUsers.map((user) => user._id);
    setSelectAll(!selectAll);
    setSelectedRows(selectAll ? [] : currentPageIds);
  };

  const toggleSelect = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const deleteSelected = async () => {
    if (!window.confirm("Delete selected users?")) return;
    try {
      await Promise.all(
        selectedRows.map((id) =>
          axios.delete(`http://localhost:4000/api/user/${id}`)
        )
      );
      fetchUsers();
      setSelectedRows([]);
      setSelectAll(false);
    } catch (err) {
      alert("Error deleting users");
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      await axios.delete(`http://localhost:4000/api/user/${userId}`);
      fetchUsers();
    } catch (err) {
      console.error("Error deleting user:", err.message);
    }
  };

 const exportToCSV = () => {
  if (selectedRows.length === 0) { // 🛑 Prevent export if no selection
    alert("❌ Please select at least one user to export.");
    return;
  }

  const dataToExport = users.filter((u) => selectedRows.includes(u._id));
  const worksheet = XLSX.utils.json_to_sheet(dataToExport);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, worksheet, "Users");
  XLSX.writeFile(wb, "users.csv");
};

const exportToExcel = () => {
  if (selectedRows.length === 0) { // 🛑 Prevent empty downloads
    alert("❌ Please select at least one user to export.");
    return;
  }

  const dataToExport = users.filter((u) => selectedRows.includes(u._id));
  const worksheet = XLSX.utils.json_to_sheet(dataToExport);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, worksheet, "Users");
  XLSX.writeFile(wb, "users.xlsx");
};

const exportToPDF = () => {
  if (selectedRows.length === 0) { // 🛑 Prevent export without selection
    alert("❌ Please select at least one user to export.");
    return;
  }

  const selectedUsers = users.filter((u) => selectedRows.includes(u._id));
  const doc = new jsPDF();
  autoTable(doc, {
    head: [["Name", "Email", "Phone"]],
    body: selectedUsers.map((u) => [u.name, u.email, u.phone]),
  });
  doc.save("users.pdf");
};
  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(users.length / itemsPerPage);

  return (
    <Container fluid className="py-4 bg-light ">
      <h1 className="mb-4 header-name">Users</h1>
      <Link to="/dashboard" className="defalut">
        Home <MdOutlineKeyboardArrowRight />
      </Link>

      <div className="d-flex justify-content-end gap-2 mb-3">
        {selectedRows.length > 0 && (
          <Button variant="danger" onClick={deleteSelected}>
            Delete Selected
          </Button>
        )}
        <Button variant="success" onClick={exportToExcel}>
          <FaFileExcel />
        </Button>
        <Button variant="info" onClick={exportToCSV}>
          <FaFileCsv />
        </Button>
        <Button variant="danger" onClick={exportToPDF}>
          <BsFileEarmarkPdfFill />
        </Button>
      </div>

      <Table striped bordered hover className="text-center">
        <thead className="table-dark" style={{position:'sticky',top:'0'}}>
          <tr>
            <th>
              <Form.Check
                checked={selectAll}
                onChange={toggleSelectAll}
                className="text-center small-checkbox"
              />
            </th>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.length > 0 ? (
            currentUsers.map((user) => (
              <tr key={user._id}>
                <td>
                  <Form.Check className="small-checkbox"
                    checked={selectedRows.includes(user._id)}
                    onChange={() => toggleSelect(user._id)}
                  />
                </td>
                <td>
                  <img
                    src={
                      user.img?.startsWith("http")
                        ? user.img
                        : `http://localhost:4000${user.img || "/default.png"}`
                    }
                    alt="Profile"
                    width="50"
                    height="50"
                    style={{
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>{user.phone}</td>
                <td>
                  <Button
                    size="sm"
                    variant="info"
                    onClick={() => {
                      setViewUser(user);
                      setShowViewModal(true);
                    }}
                  >
                    <FaEye />
                  </Button>{" "}
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    <MdDeleteForever />
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-danger text-center">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Pagination */}
      <div className="d-flex justify-content-center">
        {[...Array(totalPages).keys()].map((num) => (
          <Button
            key={num}
            size="sm"
            variant={currentPage === num + 1 ? "primary" : "outline-primary"}
            className="me-2"
            onClick={() => setCurrentPage(num + 1)}
          >
            {num + 1}
          </Button>
        ))}
      </div>

      {/* View Modal */}
      <Modal show={showViewModal} onHide={() => setShowViewModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>User Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {viewUser && (
            <div>
              <img
                src={`http://localhost:4000${viewUser.img || "/default.png"}`}
                alt="profile"
                width="80"
                height="80"
                className="mb-3 rounded-circle"
              />
              <p><strong>Name:</strong> {viewUser.name}</p>
              <p><strong>Email:</strong> {viewUser.email}</p>
              <p><strong>Phone:</strong> {viewUser.phone}</p>
              <p><strong>Password:</strong> {viewUser.password}</p>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Users;
