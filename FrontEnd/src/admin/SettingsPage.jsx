import React, { useEffect, useState } from "react";
import { Container, Table, Button, Form, Modal, Pagination } from "react-bootstrap";
import axios from "axios";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

const SettingsPage = () => {
  const [carouselItems, setCarouselItems] = useState([]);
  const [newItem, setNewItem] = useState({ image: null, title: "", subtitle: "", description: "", enabled: true });
  const [existingImage, setExistingImage] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editItemId, setEditItemId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewItem, setViewItem] = useState(null);
  const itemsPerPage = 5;

  const fetchCarouselData = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/carousel");
      setCarouselItems(res.data.reverse());
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => { fetchCarouselData(); }, []);

  const handleAddNewItem = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      if (newItem.image instanceof File) formData.append("image", newItem.image);
      else if (editMode && existingImage) formData.append("existingImage", existingImage);
      formData.append("title", newItem.title || "");
      formData.append("subtitle", newItem.subtitle || "");
      formData.append("description", newItem.description || "");
      formData.append("enabled", newItem.enabled);

      const enabledCount = carouselItems.filter((item) => item.enabled).length;
      const isCurrentEnabled = carouselItems.find((i) => i._id === editItemId)?.enabled;
      const effectiveCount = isCurrentEnabled ? enabledCount - 1 : enabledCount;
      if (newItem.enabled && effectiveCount >= 3) return alert("Only 3 items can be enabled at a time.");

      if (editMode) {
        const { data: updatedItem } = await axios.patch(`http://localhost:4000/api/carousel/${editItemId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setCarouselItems((prev) => prev.map((item) => (item._id === editItemId ? updatedItem : item)));
      } else {
        if (!newItem.image || !newItem.title || !newItem.description) return alert("Please fill all required fields.");
        await axios.post("http://localhost:4000/api/carousel", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        fetchCarouselData();
      }

      setNewItem({ image: null, title: "", subtitle: "", description: "", enabled: true });
      setEditMode(false); setEditItemId(null); setExistingImage(""); setShowForm(false);
    } catch (err) {
      console.error("Error saving item:", err);
      alert("Error: " + (err.response?.data?.message || "Failed to save item."));
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    const enabledCount = carouselItems.filter((item) => item.enabled).length;
    if (!currentStatus && enabledCount >= 3) return alert("Only 3 items can be enabled at a time.");
    try {
      await axios.patch(`http://localhost:4000/api/carousel/${id}`, { enabled: !currentStatus });
      fetchCarouselData();
    } catch (err) { console.error("Error toggling status:", err); }
  };

  const handleSelect = (id) => {
    setSelectedItems((prev) => prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]);
  };

  const selectAll = () => {
    setSelectedItems(selectedItems.length === displayedItems.length ? [] : displayedItems.map((item) => item._id));
  };

  const deleteSelected = async () => {
    if (!selectedItems.length || !window.confirm("Are you sure you want to delete selected items?")) return;
    try {
      await axios.post("http://localhost:4000/api/carousel/delete-multiple", { ids: selectedItems });
      setSelectedItems([]); fetchCarouselData();
    } catch (err) { console.error("Error deleting items:", err); }
  };

  const handleEdit = (item) => {
    setNewItem({
      image: null,
      title: item.title || "",
      subtitle: item.subtitle || "",
      description: item.description || "",
      enabled: typeof item.enabled === 'boolean' ? item.enabled : true,
    });
    setExistingImage(item.image || "");
    setEditItemId(item._id);
    setEditMode(true);
    setShowForm(true);
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(carouselItems);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Carousel");
    XLSX.writeFile(wb, "carousel_data.xlsx");
  };

  const exportToCSV = () => {
    const csvContent = [
      ["Title", "Subtitle", "Description", "Status"],
      ...carouselItems.map((i) => [i.title, i.subtitle, i.description, i.enabled ? "Enabled" : "Disabled"]),
    ].map((e) => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "carousel_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({ head: [["Title", "Subtitle", "Description", "Status"]], body: carouselItems.map((i) => [i.title, i.subtitle, i.description, i.enabled ? "Enabled" : "Disabled"]) });
    doc.save("carousel_data.pdf");
  };

  const displayedItems = carouselItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(carouselItems.length / itemsPerPage);

  return (
    <Container className="mt-4">
      <h2>Settings</h2>
      <div className="mb-2">
        <Button onClick={() => setShowForm(true)}>Add to Carousel</Button>{" "}
        <Button variant="danger" onClick={deleteSelected} disabled={!selectedItems.length}>Delete Selected</Button>{" "}
        <Button onClick={exportToExcel}>Export Excel</Button>{" "}
        <Button onClick={exportToCSV}>Export CSV</Button>{" "}
        <Button onClick={exportToPDF}>Export PDF</Button>
      </div>

      <Table bordered hover className="text-center">
        <thead className="table-dark">
          <tr>
            <th><Form.Check type="checkbox" onChange={selectAll} checked={selectedItems.length === displayedItems.length} /></th>
            <th>Banner</th><th>Title</th><th>Subtitle</th><th>Description</th><th>Status</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayedItems.map((item) => (
            <tr key={item._id}>
              <td><Form.Check type="checkbox" checked={selectedItems.includes(item._id)} onChange={() => handleSelect(item._id)} /></td>
              <td><img src={`http://localhost:4000${item.image}`} style={{ width: "100px", height: "50px", objectFit: "cover" }} alt="carousel" /></td>
              <td>{item.title}</td><td>{item.subtitle}</td><td>{item.description}</td>
              <td>{item.enabled ? "Enabled" : "Disabled"}</td>
              <td>
                <Button size="sm" onClick={() => handleEdit(item)}>Edit</Button>{" "}
                <Button size="sm" variant="danger" onClick={async () => { if (window.confirm("Are you sure?")) { await axios.delete(`http://localhost:4000/api/carousel/${item._id}`); fetchCarouselData(); } }}>Delete</Button>{" "}
                <Button size="sm" variant="info" onClick={() => setViewItem(item)}>View</Button>{" "}
                <Button size="sm" variant="warning" onClick={() => toggleStatus(item._id, item.enabled)}>{item.enabled ? "Disable" : "Enable"}</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination>{[...Array(totalPages).keys()].map((page) => (<Pagination.Item key={`page-${page + 1}`} active={page + 1 === currentPage} onClick={() => setCurrentPage(page + 1)}>{page + 1}</Pagination.Item>))}</Pagination>

      <Modal show={showForm} onHide={() => { setShowForm(false); setEditMode(false); setExistingImage(""); }}>
        <Modal.Header closeButton><Modal.Title>{editMode ? "Edit Carousel Item" : "Add New Carousel Item"}</Modal.Title></Modal.Header>
        <Form onSubmit={handleAddNewItem}>
          <Modal.Body>
            <Form.Group><Form.Label>Image {editMode && "(leave empty to keep existing image)"}</Form.Label>
              <Form.Control type="file" onChange={(e) => setNewItem({ ...newItem, image: e.target.files[0] })} />
              {editMode && !newItem.image && (<img src={`http://localhost:4000${existingImage}`} alt="Current" style={{ width: "100%", marginTop: "10px" }} />)}
            </Form.Group>
            <Form.Group><Form.Label>Title</Form.Label><Form.Control type="text" value={newItem.title || ""} onChange={(e) => setNewItem({ ...newItem, title: e.target.value })} /></Form.Group>
            <Form.Group><Form.Label>Subtitle</Form.Label><Form.Control type="text" value={newItem.subtitle || ""} onChange={(e) => setNewItem({ ...newItem, subtitle: e.target.value })} /></Form.Group>
            <Form.Group><Form.Label>Description</Form.Label><Form.Control type="text" value={newItem.description || ""} onChange={(e) => setNewItem({ ...newItem, description: e.target.value })} /></Form.Group>
            <Form.Group><Form.Check type="checkbox" label="Enable" checked={!!newItem.enabled} onChange={(e) => setNewItem({ ...newItem, enabled: e.target.checked })} /></Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => { setShowForm(false); setEditMode(false); setExistingImage(""); }}>Cancel</Button>
            <Button variant="primary" type="submit">{editMode ? "Update" : "Add"}</Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal show={!!viewItem} onHide={() => setViewItem(null)}>
        <Modal.Header closeButton><Modal.Title>View Carousel Item</Modal.Title></Modal.Header>
        <Modal.Body>{viewItem && (<>
          <img src={`http://localhost:4000${viewItem.image}`} alt="carousel" style={{ width: "100%", height: "auto", objectFit: "cover", marginBottom: "10px" }} />
          <p><strong>Title:</strong> {viewItem.title}</p>
          <p><strong>Subtitle:</strong> {viewItem.subtitle}</p>
          <p><strong>Description:</strong> {viewItem.description}</p>
          <p><strong>Status:</strong> {viewItem.enabled ? "Enabled" : "Disabled"}</p>
        </>)}</Modal.Body>
      </Modal>
    </Container>
  );
};

export default SettingsPage;
