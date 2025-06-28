import React, { useEffect, useState } from 'react';
import { Container, Button, Modal, Form, Table, Badge } from 'react-bootstrap';
import { Pencil,Eye, Trash2} from 'lucide-react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Link } from "react-router-dom";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FaFileCsv } from "react-icons/fa6";
import { BsFileEarmarkPdfFill } from "react-icons/bs";
import { FaFileExcel } from "react-icons/fa";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
    const [viewModal, setViewModal] = useState(null);
  const itemsPerPage = 6;

  const [modal, setModal] = useState({ show: false, isEdit: false, data: {} });

  const fetchCategories = async () => {
    const res = await axios.get('http://localhost:4000/api/categories');
    setCategories(res.data.reverse()); // descending
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleModal = (type, category = {}) => {
    setModal({ show: true, isEdit: type === 'edit', data: category });
  };

  const saveCategory = async () => {
    const { _id, name, status } = modal.data;

    try {
      if (modal.isEdit) {
        await axios.put(`http://localhost:4000/api/categories/${_id}`, { name, status });
      } else {
        await axios.post('http://localhost:4000/api/categories', { name, status });
      }

      fetchCategories();
      setModal({ show: false, isEdit: false, data: {} });
    } catch (err) {
      alert('Error saving category');
    }
  };

  const deleteSelected = async () => {
    try {
      for (const id of selectedRows) {
        await axios.delete(`http://localhost:4000/api/categories/${id}`);
      }
      fetchCategories();
      setSelectedRows([]);
    } catch (err) {
      alert('Error deleting categories');
    }
  };

    const deleteCategory = async (id) => {
    if (window.confirm("Are you sure to delete this category?")) {
      await axios.delete(`http://localhost:4000/api/categories/${id}`);
      fetchCategories();
    }
  };
 const handleExportCSV = () => {
  if (selectedRows.length === 0) {
    alert("Please select at least one category before exporting.");
    return; // Stop execution
  }

  const data = categories.filter(cat => selectedRows.includes(cat._id));
  const worksheet = XLSX.utils.json_to_sheet(data.map(({ name, status }) => ({ name, status })));
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, worksheet, 'Categories');
  XLSX.writeFile(wb, 'categories.csv');
};

const exportToExcel = () => {
  if (selectedRows.length === 0) {
    alert("Please select at least one category before exporting.");
    return; // Stop execution
  }

  const data = categories.filter(cat => selectedRows.includes(cat._id));
  const worksheet = XLSX.utils.json_to_sheet(data.map(({ name, status }) => ({ name, status })));
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, worksheet, "Categories");
  XLSX.writeFile(wb, "categories.xlsx");
};

const handleExportPDF = () => {
  if (selectedRows.length === 0) {
    alert("Please select at least one category before exporting.");
    return; // Stop execution
  }

  const data = categories.filter(cat => selectedRows.includes(cat._id));
  const doc = new jsPDF();
  autoTable(doc, {
    head: [['Name', 'Status']],
    body: data.map(c => [c.name, c.status])
  });
  doc.save('categories.pdf');
};

  const indexOfLast = currentPage * itemsPerPage;
  const currentData = categories.slice(indexOfLast - itemsPerPage, indexOfLast);

  const toggleSelectAll = () => {
    const ids = currentData.map(c => c._id);
    setSelectAll(!selectAll);
    setSelectedRows(selectAll ? [] : ids);
  };

  const toggleSelect = (id) => {
    setSelectedRows(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <Container fluid className="py-4">
        <h1 className="mb-4 header-name">Categories</h1>
      <Link to="/dashboard" className="defalut">
        Home <MdOutlineKeyboardArrowRight />
      </Link>

      <div className="mb-3 d-flex gap-2 justify-content-end">
        {selectedRows.length > 0 && (
          <Button variant="danger" onClick={deleteSelected}>Delete Selected</Button>
        )}
        <Button variant="primary" onClick={() => handleModal('add')}>+ Add Category</Button>
        <Button variant="outline-primary" onClick={handleExportCSV}><FaFileCsv /></Button>
         <Button variant="outline-success" onClick={exportToExcel}><FaFileExcel /></Button>
        <Button variant="outline-danger" onClick={handleExportPDF}><BsFileEarmarkPdfFill /></Button>
      </div>

      <Table striped bordered hover className="reduced-padding">
        <thead className="table-dark">
          <tr>
            <th><Form.Check className="small-checkbox text-center" checked={selectAll} onChange={toggleSelectAll} /></th>
            <th>Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((cat) => (
            <tr key={cat._id}>
              <td>
                <Form.Check
                  className="small-checkbox text-center"
                  checked={selectedRows.includes(cat._id)}
                  onChange={() => toggleSelect(cat._id)}
                />
              </td>
              <td>{cat.name}</td>
              <td>
                <Badge bg={cat.status === "Enable" ? "success" : "secondary"}>
                  {cat.status}
                </Badge>
              </td>
              <td>
                <Button size="sm" variant="outline-primary" onClick={() => handleModal('edit', cat)}>
                  <Pencil size={14} />
                </Button>
                 <Button size="sm" variant="outline-info" className="mx-2" onClick={() => setViewModal(cat)}>
                  <Eye size={14} />
                </Button>
                <Button size="sm" variant="outline-danger" onClick={() => deleteCategory(cat._id)}>
                  <Trash2 size={14} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="d-flex justify-content-center">
        {[...Array(Math.ceil(categories.length / itemsPerPage)).keys()].map(p => (
          <Button
            key={p}
            size="sm"
            variant={currentPage === p + 1 ? 'primary' : 'outline-primary'}
            className="me-2"
            onClick={() => setCurrentPage(p + 1)}
          >
            {p + 1}
          </Button>
        ))}
      </div>

      {/* Modal */}
      <Modal show={modal.show} onHide={() => setModal({ show: false, isEdit: false, data: {} })}>
        <Modal.Header closeButton>
          <Modal.Title>{modal.isEdit ? 'Edit Category' : 'Add Category'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={modal.data.name || ''}
              onChange={(e) => setModal({ ...modal, data: { ...modal.data, name: e.target.value } })}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select
              value={modal.data.status || ''}
              onChange={(e) => setModal({ ...modal, data: { ...modal.data, status: e.target.value } })}
            >
              <option value="">-- Select --</option>
              <option value="Enable">Enable</option>
              <option value="Disable">Disable</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={saveCategory}>
            {modal.isEdit ? 'Save Changes' : 'Submit'}
          </Button>
        </Modal.Footer>
      </Modal>

        <Modal show={!!viewModal} onHide={() => setViewModal(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Category Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {viewModal && (
            <>
              <p><strong>Name:</strong> {viewModal.name}</p>
              <p><strong>Status:</strong> {viewModal.status}</p>
            </>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Categories;
