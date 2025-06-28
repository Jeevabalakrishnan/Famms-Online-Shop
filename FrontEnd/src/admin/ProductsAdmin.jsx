// import React, { useEffect, useState } from 'react';
// import { Container,Row,Col, Table, Button, Modal, Form } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
// import { FaEye } from "react-icons/fa";
// import { AiFillEdit } from "react-icons/ai";
// import { MdDeleteForever } from "react-icons/md";

// const ProductsAdmin = () => {
//   const [products, setProducts] = useState([]);
//   const [showAdd, setShowAdd] = useState(false);
//   const [showView, setShowView] = useState(false);
//   const [showEdit, setShowEdit] = useState(false);
//   const [currentProduct, setCurrentProduct] = useState(null);
//   const [newProduct, setNewProduct] = useState({
//     name: '',
//     price: '',
//     category: '',
//     img: '',
//     quantity: '',
//     status: 'In Stock'
//   });

//   // Fetch all products
//   const fetchProducts = () => {
//     fetch('http://localhost:4000/api/products')
//       .then(res => {
//         if (!res.ok) {
//           throw new Error(`HTTP error! status: ${res.status}`);
//         }
//         return res.json();
//       })
//       .then(data => {
//         const sortedProducts = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // ✅ Newest first
//         setProducts(sortedProducts);
//       })

//       .catch(err => console.error("Error fetching products:", err));
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   // Add new product  
//   const handleAddProduct = () => {
//     if (!newProduct.img.trim()) {
//       alert('Image URL is required!');
//       return;
//     }

//     fetch('http://localhost:4000/api/products/upload', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(newProduct)
//     })
//       .then(res => res.json())
//       .then(() => {
//         fetchProducts();
//         setShowAdd(false);
//       })
//       .catch(err => console.error('Error adding product:', err));
//   };

//   // Delete a product
//   const handleDeleteProduct = (id) => {
//     if (!window.confirm('Are you sure you want to delete this product?')) return;

//     fetch(`http://localhost:4000/api/products/${id}`, {
//       method: 'DELETE',
//     })
//       .then(res => {
//         if (!res.ok) {
//           throw new Error('Failed to delete');
//         }
//         fetchProducts();
//       })
//       .catch(err => console.error('Error deleting product:', err));
//   };

//   // Update a product
//   const handleUpdateProduct = () => {
//     if (!currentProduct.img.trim()) {
//       alert('Image URL is required!');
//       return;
//     }

//     fetch(`http://localhost:4000/api/products/${currentProduct._id}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(currentProduct),
//     })
//       .then(res => {
//         if (!res.ok) {
//           throw new Error('Failed to update');
//         }
//         return res.json();
//       })
//       .then(() => {
//         fetchProducts();
//         setShowEdit(false);
//       })
//       .catch(err => console.error('Error updating product:', err));
//   };

//   return (
//     <Container fluid className="py-4 bg-light min-vh-100">
//       <h1 className="mb-4 header-name">Products</h1>
//       <Link to="/dashboard" className="defalut">
//         Home <MdOutlineKeyboardArrowRight />
//       </Link>
//       <div className="d-flex justify-content-end ">
//         <Button className='mb-2' onClick={() => setShowAdd(true)}>Add Product</Button>
//       </div>
//       <Table striped bordered hover className='text-center'>
//         <thead className="table-dark" >
//           <tr>
//             <th>Id</th>
//             <th>Image</th>
//             <th>Product Name</th>
//             <th>Price</th>
//             <th>Quantity</th>
//             <th>Status</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {products.map((prod, index) => (
//             <tr key={prod._id}>
//               <td>{index + 1}</td>
//               <td>
//                 {prod.img ? (
//                   <img src={`http://localhost:4000${prod.img}`} alt={prod.name} style={{ height: '40px' }} />
//                 ) : 'No Image'}
//               </td>
//               <td>{prod.name}</td>
//               <td>₹{prod.price}</td>
//               <td>{prod.quantity}</td>
//               <td>{prod.status}</td>
//               <td>
//                 <Button size="sm" variant="info" className="me-1" onClick={() => { setCurrentProduct(prod); setShowView(true); }}><FaEye /></Button>
//                 <Button size="sm" variant="warning" className="me-1" onClick={() => { setCurrentProduct(prod); setShowEdit(true); }}><AiFillEdit /></Button>
//                 <Button size="sm" variant="danger" onClick={() => handleDeleteProduct(prod._id)}><MdDeleteForever /></Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>

//       {/* Modal for Adding Product */}
//       <Modal show={showAdd} onHide={() => setShowAdd(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Add New Product</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <ProductForm product={newProduct} setProduct={setNewProduct} />
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowAdd(false)}>Cancel</Button>
//           <Button onClick={handleAddProduct}>Add</Button>
//         </Modal.Footer>
//       </Modal>

//       {/* Modal for Viewing Product */}
//       <Modal show={showView} onHide={() => setShowView(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>View Product</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {currentProduct && (
//             <>
//             <Row>
//               <Col lg={4}>
//               {currentProduct.img && (
//                 <img
//                   src={`http://localhost:4000${currentProduct.img}`} // ✅ Added correct server path
//                   alt={currentProduct.name}
//                   style={{ width: '100px', height: 'auto' }}
//                 />
//               )}
//               </Col>
//               <Col lg={6}>
//               <p><strong>Name:</strong> {currentProduct.name}</p>
//               <p><strong>Price:</strong> ₹{currentProduct.price}</p>
//               <p><strong>Category:</strong> {currentProduct.category}</p>
//               <p><strong>Quantity:</strong> {currentProduct.quantity}</p>
//               <p><strong>Status:</strong> {currentProduct.status}</p>
//               </Col>
//               </Row>
//             </>

//           )}

//         </Modal.Body>
//       </Modal>

//       {/* Modal for Editing Product */}
//       <Modal show={showEdit} onHide={() => setShowEdit(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Edit Product</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {currentProduct && (
//             <ProductForm product={currentProduct} setProduct={setCurrentProduct} />
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowEdit(false)}>Cancel</Button>
//           <Button onClick={handleUpdateProduct}>Update</Button>
//         </Modal.Footer>
//       </Modal>
//     </Container>
//   );
// };

// // Reusable Product Form
// const ProductForm = ({ product, setProduct }) => (
//   <>
//     <Form.Group className="mb-2">
//       <Form.Label>Product Name</Form.Label>
//       <Form.Control
//         type="text"
//         value={product.name}
//         onChange={(e) => setProduct({ ...product, name: e.target.value })}
//       />
//     </Form.Group>
//     <Form.Group className="mb-2">
//       <Form.Label>Price</Form.Label>
//       <Form.Control
//         type="number"
//         value={product.price}
//         onChange={(e) => setProduct({ ...product, price: e.target.value })}
//       />
//     </Form.Group>
//     <Form.Group className="mb-2">
//       <Form.Label>Quantity</Form.Label>
//       <Form.Control
//         type="number"
//         value={product.quantity}
//         onChange={(e) => setProduct({ ...product, quantity: e.target.value })}
//       />
//     </Form.Group>
//     <Form.Group className="mb-2">
//       <Form.Label>Category</Form.Label>
//       <Form.Control
//         type="text"
//         value={product.category}
//         onChange={(e) => setProduct({ ...product, category: e.target.value })}
//       />
//     </Form.Group>
//     <Form.Group className="mb-2">
//       <Form.Label>Status</Form.Label>
//       <Form.Select
//         value={product.status}
//         onChange={(e) => setProduct({ ...product, status: e.target.value })}
//       >
//         <option value="In Stock">In Stock</option>
//         <option value="Out of Stock">Out of Stock</option>
//       </Form.Select>
//     </Form.Group>
//     <Form.Group className="mb-2">
//       <Form.Label>Image URL</Form.Label>
//       <Form.Control
//         type="text"
//         value={product.img}
//         onChange={(e) => setProduct({ ...product, img: e.target.value })}
//       />
//     </Form.Group>
//   </>
// );

// export default ProductsAdmin;


import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Modal, Form, Row, Col } from 'react-bootstrap';
import { FaEye } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import { FaFileCsv } from "react-icons/fa6";
import { BsFileEarmarkPdfFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FaFileExcel } from "react-icons/fa";
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import axios from 'axios';

const ProductsAdmin = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' | 'view' | 'edit'
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const itemsPerPage = 6;

  const [form, setForm] = useState({
    name: '',
    category: '',
    description: '',
    img: '',
    price: '',
    quantity: '',
    status: 'In Stock'
  });

  const fetchProducts = async () => {
    const res = await fetch('http://localhost:4000/api/products');
    const data = await res.json();
    setProducts(data.reverse());
  };

  //   const fetchProducts = () => {
  //   fetch('http://localhost:4000/api/products')
  //     .then(res => {
  //       if (!res.ok) {
  //         throw new Error(`HTTP error! status: ${res.status}`);
  //       }
  //       return res.json();
  //     })
  //     .then(data => {
  //       const sortedProducts = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // ✅ Newest first
  //       setProducts(sortedProducts);
  //     })

  //     .catch(err => console.error("Error fetching products:", err));
  // };

  // useEffect(() => {
  //   fetchProducts();
  // }, []);
const deleteSelected = async () => {
  if (selectedRows.length === 0) {
    alert("No products selected for deletion.");
    return;
  }

  if (!window.confirm("Are you sure you want to delete these products?")) {
    return;
  }

  try {
    await Promise.all(
      selectedRows.map(id => axios.delete(`http://localhost:4000/api/products/${id}`))
    );
    
    fetchProducts(); // Refresh the product list
    setSelectedRows([]); // Clear selected checkboxes
    setSelectAll(false); // Ensure selectAll is unchecked
    
  } catch (err) {
    alert("Error deleting products");
  }
};

const fetchCategories = async () => {
  const res = await fetch('http://localhost:4000/api/categories');
  const data = await res.json();

  // Sort categories by newest first (assuming you have a 'createdAt' field)
  const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  setCategories(sortedData);
};

useEffect(() => {
  fetchProducts();
  fetchCategories();
}, []);
const handleSubmit = async () => {
  const url = modalMode === "edit"
    ? `http://localhost:4000/api/products/${form._id}`
    : "http://localhost:4000/api/products/upload";

  const formData = new FormData();
  formData.append("name", form.name);
  formData.append("category", form.category);
  formData.append("price", form.price);
  formData.append("quantity", form.quantity);
  formData.append("status", form.status);
  if (form.imgFile) {
    formData.append("img", form.imgFile);
  }

  try {
    await fetch(url, {
      method: modalMode === "edit" ? "PUT" : "POST",
      body: formData,
    });

    fetchProducts();
    setShowModal(false);
    setForm({
      name: '', category: '', price: '', quantity: '', status: 'In Stock', img: '', imgFile: null
    });
  } catch (err) {
    alert("Failed to save product");
  }
};



  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;

    await fetch(`http://localhost:4000/api/products/${id}`, {
      method: 'DELETE'
    });

    fetchProducts();
  };

  const openModal = (mode, product = null) => {
    setModalMode(mode);
    setForm(product || {
      name: '',
      category: '',
      img: '',
      price: '',
      quantity: '',
      status: 'In Stock'
    });
    setShowModal(true);
  };

 const exportToCSV = () => {
  if (selectedRows.length === 0) { // 🛑 Prevent download if no items selected
    alert("❌ Please select at least one product to export.");
    return;
  }

  const selectedProducts = products.filter(p => selectedRows.includes(p._id));
  const worksheet = XLSX.utils.json_to_sheet(selectedProducts);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, worksheet, "Products");
  XLSX.writeFile(wb, "products.csv");
};

const exportToExcel = () => {
  if (selectedRows.length === 0) { // 🛑 Prevent empty downloads
    alert("❌ Please select at least one product to export.");
    return;
  }

  const selectedProducts = products.filter(p => selectedRows.includes(p._id));
  const worksheet = XLSX.utils.json_to_sheet(selectedProducts);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, worksheet, "Products");
  XLSX.writeFile(wb, "products.xlsx");
};

const exportToPDF = () => {
  if (selectedRows.length === 0) { // 🛑 Prevent export without selection
    alert("❌ Please select at least one product to export.");
    return;
  }

  const selectedProducts = products.filter(p => selectedRows.includes(p._id));
  const doc = new jsPDF();
  autoTable(doc, {
    head: [["Name", "Category", "Price", "Qty", "Status"]],
    body: selectedProducts.map(p => [p.name, p.category, `₹${p.price}`, p.quantity, p.status]),
  });
  doc.save("products.pdf");
};
  const paginatedData = products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const toggleSelect = (id) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(paginatedData.map(p => p._id));
    }
    setSelectAll(!selectAll);
  };

  return (
    <Container className="py-4">
        <h1 className="mb-4 header-name">Products</h1>
      <Link to="/dashboard" className="defalut">
        Home <MdOutlineKeyboardArrowRight />
      </Link>

      <div className="d-flex justify-content-end gap-2 mb-3">
          {selectedRows.length > 0 && (
                  <Button variant="danger" onClick={deleteSelected}>Delete Selected</Button>
                )}
        <Button onClick={() => openModal('add')}>+ Add Product</Button>
        <Button variant="outline-primary" onClick={exportToCSV}><FaFileCsv /></Button>
        <Button variant="outline-success" onClick={exportToExcel}><FaFileExcel /></Button>
        <Button variant="outline-danger" onClick={exportToPDF}><BsFileEarmarkPdfFill /></Button>
      </div>

     <Table striped bordered hover>
  <thead className="table-dark">
    <tr>
      <th>
        <Form.Check
          className="small-checkbox text-center"
          checked={selectAll}
          onChange={toggleSelectAll}
        />
      </th>
      <th>Image</th>
      <th>Product</th>
      <th>Category</th>
      <th>Price</th>
      <th>Qty</th>
      <th>Status</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {paginatedData.map((p) => (
      <tr key={p._id}>
        <td>
          <Form.Check
            className="small-checkbox text-center"
            checked={selectedRows.includes(p._id)}
            onChange={() => toggleSelect(p._id)}
          />
        </td>
<td>
<img
  src={`http://localhost:4000${p.img}`}
  alt={p.name}
  height="40"
/>


</td>
        <td>{p.name}</td>
        <td>{p.category}</td>
        <td>₹{p.price}</td>
        <td>{p.quantity}</td>
        <td>{p.status}</td>
        <td>
          <Button size="sm" variant="outline-primary" className="me-1" onClick={() => openModal("view", p)}>
            <FaEye />
          </Button>
          <Button size="sm" variant="outline-warning" className="me-1" onClick={() => openModal("edit", p)}>
            <AiFillEdit />
          </Button>
          <Button size="sm" variant="outline-danger" onClick={() => handleDelete(p._id)}>
            <MdDeleteForever />
          </Button>
        </td>
      </tr>
    ))}
  </tbody>
</Table>

      {/* Pagination */}
      <div className="d-flex justify-content-center">
        {[...Array(Math.ceil(products.length / itemsPerPage)).keys()].map(p => (
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

      {/* Modal Form */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{modalMode === 'add' ? 'Add Product' : modalMode === 'edit' ? 'Edit Product' : 'Product Details'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalMode === 'view' ? (
            <Row>
              <Col md={4}><img src={`http://localhost:4000${form.img}`} alt="img" className="img-fluid" /></Col>
              <Col md={8}>
                <p><strong>Name:</strong> {form.name}</p>
                <p><strong>Category:</strong> {form.category}</p>
                <p><strong>Price:</strong> ₹{form.price}</p>
                <p><strong>Qty:</strong> {form.quantity}</p>
                <p><strong>Status:</strong> {form.status}</p>
              </Col>
            </Row>
          ) : (
            <Form>
              <Row>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control className='p-3' value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Category</Form.Label>
                    <Form.Select className='select-form' value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                      <option value="">-- Select --</option>
                      {categories.map((cat) => (
                        <option key={cat._id} value={cat.name}>{cat.name}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mt-2">
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Price</Form.Label>
                    <Form.Control className='p-3' type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control className='p-3' type="number" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Status</Form.Label>
                    <Form.Select className='select-form' value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                      <option>In Stock</option>
                      <option>Out of Stock</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mt-2">
                <Form.Label>Image URL</Form.Label>
                <Form.Control className='p-3' value={form.img} onChange={(e) => setForm({ ...form, img: e.target.value })} />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        {modalMode !== 'view' && (
          <Modal.Footer>
            <Button onClick={handleSubmit}>{modalMode === 'edit' ? 'Update' : 'Add Product'}</Button>
          </Modal.Footer>
        )}
      </Modal>
      
    </Container>
  );
};

export default ProductsAdmin;
