import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useEffect, useState } from "react";  
// import axios from 'axios';


const AddItems = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const [nameOfProduct, setnameOfProduct] = useState('');
    const [quantityOfProduct, setquantityOfProduct] = useState('');
    const [priceOfProduct, setpriceOfProduct] = useState('');
    const [data, setData] = useState([]);


    const handleSubmit = async () => {
        // e.preventDefault();
        const data = {
          name: nameOfProduct,
          quantity: quantityOfProduct,
          price: priceOfProduct
        };
    
        try {
          const response = await fetch('https://ashvins-cafe-backend.vercel.app/api/product', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });
    
          if (response.ok) {
            const result = await response.json();
            console.log('Success:', result);
            setnameOfProduct('')
            setquantityOfProduct('')
            setpriceOfProduct('')
            alert("Item Added Successfully")
          } else {
            console.error('Error:', response.statusText);
            alert("Could Not Add")
          }
        } catch (error) {
          console.error('Error:', error);
          alert("Could Not Add")
        }
    }

    const handlepriceOfProductChange = (e) => {
        // Ensure only numeric input
        const numericValue = e.target.value.replace(/[^0-9]/g, '');
        setpriceOfProduct(numericValue);
    };
    const handleQuantityOfProductChange = (e) => {
        // Ensure only numeric input
        const numericValue = e.target.value.replace(/[^0-9]/g, '');
        setquantityOfProduct(numericValue);
    };

    return (
        <Box m="20px">
            <Header title="Add Item" subtitle="Add a New Item" />

            {/* <form> */}
            <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                    "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
            >
                <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    required
                    label="Name of Item"
                    // onBlur={handleBlur}
                    // onChange={handleChange}
                    value={nameOfProduct}
                    name="firstName"
                    onChange={(e) => setnameOfProduct(e.target.value)}
                    // error={!!touched.firstName && !!errors.firstName}
                    // helperText={touched.firstName && errors.firstName}
                    sx={{ gridColumn: "span 2" }}
                />
                <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Quantity"
                    required
                    // onBlur={handleBlur}
                    // onChange={handleChange}
                    value={quantityOfProduct}
                    name="quantity"
                    onChange={(e) => handleQuantityOfProductChange(e)}
                    // error={!!touched.lastName && !!errors.lastName}
                    // helperText={touched.lastName && errors.lastName}
                    sx={{ gridColumn: "span 2" }}
                />
                <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Price"
                    // onBlur={handleBlur}
                    // onChange={handleChange}
                    value={priceOfProduct}
                    name="price"
                    onChange={(e) => handlepriceOfProductChange(e)}
                    // error={!!touched.lastName && !!errors.lastName}
                    // helperText={touched.lastName && errors.lastName}
                    sx={{ gridColumn: "span 2" }}
                    typeof="number"
                />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained" onClick={() => handleSubmit()}>
                    Enter New Item
                </Button>
            </Box>
            {/* </form> */}



        </Box>
    );
};

const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;


export default AddItems;
