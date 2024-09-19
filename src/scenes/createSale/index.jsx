// import { Box, Button, TextField, Typography, Grid, MenuItem } from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';
import { } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { useState } from "react";
import { Box, TextField, Button, Typography, Grid, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useEffect } from "react";


const CreateSale = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        quantity: ''
    });

    const [menuList, setMenuList] = useState([]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setOrders([...orders, formData]);
        setFormData({
            name: '',
            price: '',
            quantity: ''
        });
    };

    const postAllOrders = () => {
        fetch('https://ashvins-cafe-backend.vercel.app/api/sales', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orders)
        })
            .then(response => response.json())
            .then(data => console.log('All orders posted:', data))
            alert("Sales Created Successfully")
            setOrders([])
            
            .catch(error => console.error('Error posting all orders:', error));
    };

    useEffect(() => {
        // Fetch orders data from the API endpoint when the component mounts
        // fetch('https://api.example.com/orders')
        //   .then(response => response.json())
        //   .then(data => setOrders(data))
        //   .catch(error => console.error('Error fetching orders data:', error));

        // Fetch products data from the API endpoint when the component mounts
        fetch('https://ashvins-cafe-backend.vercel.app/api/product')
            .then(response => response.json())
            .then(data => setProducts(data))
            .then(data => console.log(products))
            .catch(error => console.error('Error fetching products data:', error));
    }, []);

    return (
        <Box m="20px">
            <Header title="CREATE Sale" subtitle="Create a New Sale" />
            <Box>
                <Typography>Create a New Sale</Typography>
            </Box>
            {/* <Box
                sx={{
                    width: '80%',
                    padding: 3,
                    boxShadow: 3,
                    borderRadius: 2,
                    backgroundColor: "#1e5245",
                    margin: 'auto',
                    mt: 5,
                }}
            >
                <Typography variant="h5" component="div" gutterBottom>
                    Order Form
                </Typography>
                <form noValidate autoComplete="off">
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={4}>
                            <TextField
                                select
                                fullWidth
                                label="Product"
                                variant="outlined"
                                margin="normal"
                            >
                                <MenuItem value="Product1">Product 1</MenuItem>
                                <MenuItem value="Product2">Product 2</MenuItem>
                                <MenuItem value="Product3">Product 3</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                label="Price"
                                variant="outlined"
                                margin="normal"
                                type="number"
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                label="Quantity"
                                variant="outlined"
                                margin="normal"
                                type="number"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                sx={{ mt: 2 }}
                            >
                                Add Item
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box> */}

            <Box>
                <Box
                    sx={{
                        width: '80%',
                        padding: 3,
                        boxShadow: 3,
                        borderRadius: 2,
                        backgroundColor: '#2e7c67',
                        margin: 'auto',
                        mt: 5,
                    }}
                >
                    <Typography variant="h5" component="div" gutterBottom>
                        Order Form
                    </Typography>
                    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={4}>
                                <TextField
                                    select
                                    required
                                    fullWidth
                                    label="Product"
                                    variant="outlined"
                                    margin="normal"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                >
                                    {products.map((product) => (
                                        <MenuItem key={product.id} value={product.name}>
                                            {product.name}
                                        </MenuItem>
                                    ))}

                                </TextField>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    required
                                    label="Price"
                                    variant="outlined"
                                    margin="normal"
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    required
                                    label="Quantity"
                                    variant="outlined"
                                    margin="normal"
                                    type="number"
                                    name="quantity"
                                    value={formData.quantity}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    sx={{ mt: 2 }}
                                    type="submit"
                                >
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Box>



            </Box>

            <Box>
                <TableContainer component={Paper} sx={{ mt: 5 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Product</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Quantity</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((order, index) => (
                                <TableRow key={index}>
                                    <TableCell>{order.name}</TableCell>
                                    <TableCell>{order.price}</TableCell>
                                    <TableCell>{order.quantity}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    sx={{ mt: 2 }}
                    onClick={postAllOrders}
                >
                    Submit All Orders

                </Button>
            </Box>


        </Box>
    );
};


export default CreateSale;
