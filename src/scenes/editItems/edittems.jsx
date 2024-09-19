import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import Header from "../../components/Header";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect } from "react";
const EditItems = () => {

  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [changedValues, setChangedValues] = useState({
    changedName: "",
    changedQuantity: "",
    changedPrice: "",
  });

  const handleChange = (field) => (e) => {
    setChangedValues({
      ...changedValues,
      [field]: e.target.value,
    });
  };



  const handleClickOpen = () => {
    setOpen(true);
  };



  const [rowId, setRowId] = useState('');


  const handleClose = () => {
    setOpen(false);
  };
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const fetchData = async () => {
    try {
      console.log("Working")
      const response = await fetch('https://ashvins-cafe-backend.vercel.app/api/product');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      console.log(result);
      setData(result);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     console.log("Working")
    //     const response = await fetch('https://ashvins-cafe-backend.vercel.app/api/product');
    //     if (!response.ok) {
    //       throw new Error('Network response was not ok');
    //     }
    //     const result = await response.json();
    //     console.log(result);
    //     setData(result);

    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //   }
    // };

    fetchData();
  }, []);



  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const editDialog = async (row, changedValues) => {
    handleClickOpen();
    setRowId(row._id);
    setChangedValues({
      changedName: row.name,
      changedQuantity: row.quantity,
      changedPrice: row.price,
    })
    try {
      const response = await fetch(`https://ashvins-cafe-backend.vercel.app/api/product/${row._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          changedValues
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Item updated successfully:', data);
      fetchData();
    } catch (error) {
      console.error('Error updating item:', error);
    }
  }

  const deleteDialog = async (row, changedValues) => {
    // handleClickOpen();
    setRowId(row._id);
    setChangedValues({
      changedName: row.name,
      changedQuantity: row.quantity,
      changedPrice: row.price,
    })
    try {
      const response = await fetch(`https://ashvins-cafe-backend.vercel.app/api/product/${row._id}`, {
        method: 'Delete',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          changedValues
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
        alert("Could Not Update")
      }

      const data = await response.json();
      console.log('Item updated successfully:', data);
      fetchData();
    } catch (error) {
      console.error('Error updating item:', error);
      fetchData();
    }
  }

  return (
    <Box m="20px">
      <Header title="Edit Item" subtitle="Managing Items List" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <TableContainer component={Paper} style={{ maxHeight: 400, overflowY: 'auto' }}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Items</StyledTableCell>
                <StyledTableCell align="right">Price</StyledTableCell>
                <StyledTableCell align="right">Quantity</StyledTableCell>
                <StyledTableCell align="right">Edit&nbsp;</StyledTableCell>
                <StyledTableCell align="right">Delete&nbsp;</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.price}</StyledTableCell>
                  <StyledTableCell align="right">{row.quantity}</StyledTableCell>
                  <StyledTableCell align="right">
                    <Button variant="contained" onClick={() => editDialog(row)}>Edit</Button>

                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {/* <Button variant="contained" onClick={() => editDialog(row)}>Edit</Button> */}
                    <Button variant="contained" onClick={() => deleteDialog(row)}>Delete</Button>

                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: async (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());

            try {
              const response = await fetch(`https://ashvins-cafe-backend.vercel.app/api/product/${rowId}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(formJson),
              });

              if (!response.ok) {
                throw new Error('Network response was not ok');
              }

              const result = await response.json();
              console.log(result);
              alert("Item Updated Successful")
              const fetchData = async () => {
                try {
                  console.log("Working")
                  const response = await fetch('https://ashvins-cafe-backend.vercel.app/api/product');
                  if (!response.ok) {
                    throw new Error('Network response was not ok');
                  }
                  const result = await response.json();
                  console.log(result);
                  setData(result);

                } catch (error) {
                  console.error('Error fetching data:', error);
                }
              };
              fetchData();
            } catch (error) {
              console.error('There was a problem with the fetch operation:', error);
              alert("Could Not Update");
            }
            handleClose();
          },
        }}
      >
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates occasionally.
          </DialogContentText>
          <div>
            <TextField
              required
              margin="dense"
              id="name"
              name="name"
              label="Name"
              type="text"
              value={changedValues.changedName}
              fullWidth
              onChange={handleChange('changedName')}
              variant="standard"
            />
            <TextField
              required
              margin="dense"
              id="quantity"
              name="quantity"
              label="Quantity"
              value={changedValues.changedQuantity}
              type="number"
              fullWidth
              onChange={handleChange('changedQuantity')}
              variant="standard"
            />
            <TextField
              required
              margin="dense"
              id="price"
              name="price"
              label="Price"
              value={changedValues.changedPrice}
              type="number"
              fullWidth
              onChange={handleChange('changedPrice')}
              variant="standard"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Update</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EditItems;
