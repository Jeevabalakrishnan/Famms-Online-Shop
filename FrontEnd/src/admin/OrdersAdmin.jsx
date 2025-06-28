import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';
import { FaEye } from "react-icons/fa";
// import { AiFillEdit } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import { FaFileCsv, FaFileExcel } from "react-icons/fa6";
import { BsFileEarmarkPdfFill } from "react-icons/bs";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import axios from 'axios';

const OrdersAdmin = () => {
  const [orders, setOrders] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const [modalShow, setModalShow] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  const fetchOrders = async () => {
        try {
            const res = await axios.get("http://localhost:4000/api/order");
            setOrders(res.data.orders.reverse()); // ✅ Display in descending order
        } catch (err) {
            console.error("❌ Failed to fetch orders:", err);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this order?")) return;
        await axios.delete(`http://localhost:4000/api/order/${id}`);
        fetchOrders();
    };

  const toggleSelect = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    const currentIds = paginatedData.map((o) => o._id);
    setSelectAll(!selectAll);
    setSelectedRows(selectAll ? [] : currentIds);
  };

  const deleteSelected = async () => {
    if (!window.confirm("Delete selected orders?")) return;
    await Promise.all(
      selectedRows.map((id) => axios.delete(`http://localhost:4000/api/order/${id}`))
    );
    fetchOrders();
    setSelectedRows([]);
    setSelectAll(false);
  };

  const exportToCSV = () => {
    if (selectedRows.length === 0) return alert("Select orders to export");
    const data = orders.filter((o) => selectedRows.includes(o._id));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Orders");
    XLSX.writeFile(wb, "orders.csv");
  };

  const exportToExcel = () => {
    if (selectedRows.length === 0) return alert("Select orders to export");
    const data = orders.filter((o) => selectedRows.includes(o._id));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Orders");
    XLSX.writeFile(wb, "orders.xlsx");
  };

  const exportToPDF = () => {
    if (selectedRows.length === 0) return alert("Select orders to export");
    const selected = orders.filter((o) => selectedRows.includes(o._id));
    const doc = new jsPDF();
    autoTable(doc, {
      head: [["Email", "Address", "Payment", "Items", "Status"]],
      body: selected.map((o) => [
        o.email,
        o.paymentMethod,
        o.items.map((i) => `${i.name} ${i.img}  (${i.quantity})`).join(", "),
        o.status,
      ]),
    });
    doc.save("orders.pdf");
  };

  const paginatedData = orders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Container className="">
      <h2 className="mb-3">Orders</h2>

      <div className="d-flex  justify-content-end gap-2 mb-3">
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

      <Table bordered striped hover responsive>
        <thead className="table-dark text-center">
          <tr>
            <th>
              <Form.Check className='small-checkbox' checked={selectAll} onChange={toggleSelectAll} />
            </th>
            <th>Email</th>
            <th>Payment</th>
            <th>Items</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {paginatedData.map((o, index) => (
            <tr key={o._id}>
              <td>
                <Form.Check className='small-checkbox'
                  checked={selectedRows.includes(o._id)}
                  onChange={() => toggleSelect(o._id)}
                />
              </td>
              <td>{o.email}</td>
              <td>{o.paymentMethod}</td>
              <td>
                {o.items.map((i, idx) => (
                  <div key={idx}>
                    {i.name}  (x{i.quantity}) - ₹{i.price}
                  </div>
                ))}
              </td>
              <td>{o.status}</td>
              <td>
                <Button
                  size="sm"
                  variant="info"
                  onClick={() => {
                    setCurrentOrder(o);
                    setModalShow(true);
                  }}
                >
                  <FaEye />
                </Button>{" "}
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => handleDelete(o._id)}
                >
                  <MdDeleteForever />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-3">
        {[...Array(Math.ceil(orders.length / itemsPerPage)).keys()].map((num) => (
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
      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Order Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentOrder && (
            <>
              <p><strong>Email:</strong> {currentOrder.email}</p>
              <p><strong>Address:</strong> {currentOrder.address}</p>
              <p><strong>Payment:</strong> {currentOrder.paymentMethod}</p>
              <p><strong>Status:</strong> {currentOrder.status}</p>
              <strong>Items:</strong>
              <ul>
                {currentOrder.items.map((i, idx) => (
                  <li key={idx}>{i.name} (x{i.quantity}) - ₹{i.price}</li>
                ))}
              </ul>
            </>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default OrdersAdmin;
