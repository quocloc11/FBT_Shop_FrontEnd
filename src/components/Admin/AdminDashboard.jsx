import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
  Paper,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';

const ProductsAdmin = () => {
  // State for products
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Dialog states
  const [openDialog, setOpenDialog] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Snackbar states
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: ''
  });

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Replace with your actual API call
        // const response = await fetch('/api/products');
        // const data = await response.json();

        // Mock data for demonstration
        const mockProducts = [
          { id: 1, name: 'Product 1', description: 'Description 1', price: 19.99, stock: 100, category: 'Category A' },
          { id: 2, name: 'Product 2', description: 'Description 2', price: 29.99, stock: 50, category: 'Category B' },
          { id: 3, name: 'Product 3', description: 'Description 3', price: 39.99, stock: 75, category: 'Category A' },
        ];

        setProducts(mockProducts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Open dialog for adding new product
  const handleAddProduct = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      stock: '',
      category: ''
    });
    setIsEditMode(false);
    setCurrentProduct(null);
    setOpenDialog(true);
  };

  // Open dialog for editing product
  const handleEditProduct = (product) => {
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      category: product.category
    });
    setIsEditMode(true);
    setCurrentProduct(product);
    setOpenDialog(true);
  };

  // Submit product form
  const handleSubmit = async () => {
    try {
      // Here you would typically make an API call to save the product
      // For demo purposes, we'll just update the local state

      if (isEditMode) {
        // Update existing product
        const updatedProducts = products.map(p =>
          p.id === currentProduct.id ? { ...p, ...formData } : p
        );
        setProducts(updatedProducts);
        setSnackbarMessage('Product updated successfully');
      } else {
        // Add new product
        const newProduct = {
          id: products.length + 1,
          ...formData
        };
        setProducts([...products, newProduct]);
        setSnackbarMessage('Product added successfully');
      }

      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      setOpenDialog(false);
    } catch (error) {
      console.error('Error saving product:', error);
      setSnackbarMessage('Error saving product');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  // Delete product
  const handleDeleteProduct = async (productId) => {
    try {
      // Here you would typically make an API call to delete the product
      // For demo purposes, we'll just update the local state
      const updatedProducts = products.filter(p => p.id !== productId);
      setProducts(updatedProducts);
      setSnackbarMessage('Product deleted successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error deleting product:', error);
      setSnackbarMessage('Error deleting product');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  // Close snackbar
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // DataGrid columns
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'category', headerName: 'Category', width: 150 },
    { field: 'price', headerName: 'Price', width: 100, type: 'number' },
    { field: 'stock', headerName: 'Stock', width: 100, type: 'number' },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <Tooltip title="View">
            <IconButton onClick={() => console.log('View', params.row)}>
              <VisibilityIcon color="info" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton onClick={() => handleEditProduct(params.row)}>
              <EditIcon color="primary" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton onClick={() => handleDeleteProduct(params.row.id)}>
              <DeleteIcon color="error" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Product Management
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddProduct}
        >
          Add Product
        </Button>
      </Box>

      <Paper sx={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={products}
          columns={columns}
          loading={loading}
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]}
          checkboxSelection={false}
          disableSelectionOnClick
        />
      </Paper>

      {/* Add/Edit Product Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {isEditMode ? 'Edit Product' : 'Add New Product'}
          <IconButton
            aria-label="close"
            onClick={() => setOpenDialog(false)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Box component="form" sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Product Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              fullWidth
              id="description"
              label="Description"
              name="description"
              multiline
              rows={4}
              value={formData.description}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="price"
              label="Price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="stock"
              label="Stock Quantity"
              name="stock"
              type="number"
              value={formData.stock}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="category"
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {isEditMode ? 'Update' : 'Add'} Product
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProductsAdmin;
