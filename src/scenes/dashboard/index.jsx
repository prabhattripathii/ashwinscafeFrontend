import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";


const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Home" subtitle="Welcome to Ashvins Cafe" />
      </Box>
      <Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap="20px"
      >
        <Typography variant="h1" color={colors.grey[500]}>
          Welcome to Ashvin's Cafe
        </Typography>
        <Box
          display="flex"
          justifyContent="center"
        >
          <ul>
            <li><Typography color={colors.greenAccent[200]}>Go to Add Items to Add a new Item</Typography></li>
            <li><Typography color={colors.greenAccent[200]}>Go to Edit Items to Edit Items</Typography></li>
          </ul>
        </Box>
      </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
