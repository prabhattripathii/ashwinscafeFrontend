import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import AddItems from "./scenes/addItems/addItems";
import EditItems from "./scenes/editItems/edittems";
import CreateSale from "./scenes/createSale";
import AllSalesList from "./scenes/allSales/index";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/additems" element={<AddItems />} />
              <Route path="/edititems" element={<EditItems />} />
              <Route path="/createsale" element={<CreateSale />} />
              <Route path="/saleslist" element={<AllSalesList />} />
              {/* <Route path="/saleslist" element={<SalesList />} /> */}
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
