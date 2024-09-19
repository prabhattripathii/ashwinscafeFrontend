import React from "react";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
// import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';


const AllSalesList = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    const rows = [
        { product: 'Apple', price: 1.2, quantity: 10 },
        { product: 'Banana', price: 0.5, quantity: 20 },
        { product: 'Cherry', price: 2.0, quantity: 15 },
    ];

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('https://ashvins-cafe-backend.vercel.app/api/saleslist');
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const result = await response.json();
            setData(result);
          } catch (error) {
            setError(error);
            console.error('There was a problem with the fetch operation:', error);
          }
        };
    
        fetchData();
      }, []);

    return (
        <Box m="20px">
            <Header title="Add Item" subtitle="Add a New Item" />

            <Box>
                <TableContainer component={Paper}  style={{ maxHeight: 400, overflowY: 'auto' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Product</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Quantity</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.price}</TableCell>
                                    <TableCell>{row.quantity}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>


        </Box>
    );
};



export default AllSalesList;
