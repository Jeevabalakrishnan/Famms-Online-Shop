import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showView, setShowView] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: '',
    img: '',
    quantity: '',
    status: 'In Stock'
  });

  // Fetch all products
  const fetchProducts = () => {
    fetch('http://localhost:4000/api/products')
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => setProducts(data))
      .catch(err => console.error("Error fetching products:", err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Add new product
  const handleAddProduct = () => {
    if (!newProduct.img.trim()) {
        alert('Image URL is required!');
        return;
    }

    fetch('http://localhost:4000/api/products/upload', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(newProduct)
    })
    .then(res => res.json())
    .then(() => {
        fetchProducts();
        setShowAdd(false);
    })
    .catch(err => console.error('Error adding product:', err));
};

  // Delete a product
  const handleDeleteProduct = (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
  
    fetch(`http://localhost:4000/api/products/${id}`, {
      method: 'DELETE',
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to delete');
        }
        fetchProducts();
      })
      .catch(err => console.error('Error deleting product:', err));
  };

  // Update a product
  const handleUpdateProduct = () => {
    if (!currentProduct.img.trim()) {
      alert('Image URL is required!');
      return;
    }

    fetch(`http://localhost:4000/api/products/${currentProduct._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(currentProduct),
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to update');
        }
        return res.json();
      })
      .then(() => {
        fetchProducts();
        setShowEdit(false);
      })
      .catch(err => console.error('Error updating product:', err));
  };

  return (
    <Container fluid className="py-4 bg-light min-vh-100">
      <h1 className="mb-4 header-name">Products</h1>
      <Link to="/" className="defalut">
        Home <MdOutlineKeyboardArrowRight />
      </Link>
      <div className="d-flex justify-content-end ">
      <Button className='mb-2' onClick={() => setShowAdd(true)}>Add Product</Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Image</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod, index) => (
            <tr key={prod._id}>
              <td>{index + 1}</td>
              <td>
                {prod.img ? (
             <img src={`http://localhost:4000${prod.img}`} alt={prod.name} style={{height:'40px'}}/>
                ) : 'No Image'}
              </td>
              <td>{prod.name}</td>
              <td>₹{prod.price}</td>
              <td>{prod.quantity}</td>
              <td>{prod.status}</td>
              <td>
                <Button size="sm" variant="info" className="me-1" onClick={() => { setCurrentProduct(prod); setShowView(true); }}>View</Button>
                <Button size="sm" variant="warning" className="me-1" onClick={() => { setCurrentProduct(prod); setShowEdit(true); }}>Edit</Button>
                <Button size="sm" variant="danger" onClick={() => handleDeleteProduct(prod._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for Adding Product */}
      <Modal show={showAdd} onHide={() => setShowAdd(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProductForm product={newProduct} setProduct={setNewProduct} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAdd(false)}>Cancel</Button>
          <Button onClick={handleAddProduct}>Add</Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for Viewing Product */}
      <Modal show={showView} onHide={() => setShowView(false)}>
        <Modal.Header closeButton>
          <Modal.Title>View Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentProduct && (
            <>
              <p><strong>Name:</strong> {currentProduct.name}</p>
              <p><strong>Price:</strong> ₹{currentProduct.price}</p>
              <p><strong>Category:</strong> {currentProduct.category}</p>
              <p><strong>Quantity:</strong> {currentProduct.quantity}</p>
              <p><strong>Status:</strong> {currentProduct.status}</p>
              {currentProduct.img && <img src={currentProduct.img} alt={currentProduct.name} style={{ width: '100%', height: 'auto' }} />}
            </>
          )}
        </Modal.Body>
      </Modal>

      {/* Modal for Editing Product */}
      <Modal show={showEdit} onHide={() => setShowEdit(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentProduct && (
            <ProductForm product={currentProduct} setProduct={setCurrentProduct} />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEdit(false)}>Cancel</Button>
          <Button onClick={handleUpdateProduct}>Update</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

// Reusable Product Form
const ProductForm = ({ product, setProduct }) => (
  <>
    <Form.Group className="mb-2">
      <Form.Label>Product Name</Form.Label>
      <Form.Control
        type="text"
        value={product.name}
        onChange={(e) => setProduct({ ...product, name: e.target.value })}
      />
    </Form.Group>
    <Form.Group className="mb-2">
      <Form.Label>Price</Form.Label>
      <Form.Control
        type="number"
        value={product.price}
        onChange={(e) => setProduct({ ...product, price: e.target.value })}
      />
    </Form.Group>
    <Form.Group className="mb-2">
      <Form.Label>Quantity</Form.Label>
      <Form.Control
        type="number"
        value={product.quantity}
        onChange={(e) => setProduct({ ...product, quantity: e.target.value })}
      />
    </Form.Group>
    <Form.Group className="mb-2">
      <Form.Label>Category</Form.Label>
      <Form.Control
        type="text"
        value={product.category}
        onChange={(e) => setProduct({ ...product, category: e.target.value })}
      />
    </Form.Group>
    <Form.Group className="mb-2">
      <Form.Label>Status</Form.Label>
      <Form.Select
        value={product.status}
        onChange={(e) => setProduct({ ...product, status: e.target.value })}
      >
        <option value="In Stock">In Stock</option>
        <option value="Out of Stock">Out of Stock</option>
      </Form.Select>
    </Form.Group>
    <Form.Group className="mb-2">
      <Form.Label>Image URL</Form.Label>
      <Form.Control
        type="text"
        value={product.img}
        onChange={(e) => setProduct({ ...product, img: e.target.value })}
      />
    </Form.Group>
  </>
);

export default Products;
