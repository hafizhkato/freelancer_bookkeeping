import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./scenes/global/sidebar";
import Navbar from "./scenes/global/navbar";
import { SidebarProvider } from "./context/SidebarContext";
import Informationbar from "./scenes/global/informationbar";
import Dashboard from "./scenes/dashboard";
import Income from "./scenes/income";
import Expenses from "./scenes/expenses";
import Settings from "./scenes/settings";
import Saving from "./scenes/saving";
import Client from "./scenes/client";
import Users from "./scenes/users";

const App = () => {
  return (
    
    <Router>
      <SidebarProvider>
      <div className="flex overflow-y-auto light bg-gray-300">
        {/* Sidebar */}
        <Sidebar />

        <div className="flex-1 flex flex-col">
          {/* Navbar */}
          <Navbar />
          

          {/* Main Content */}
          <div className="flex flex-1">
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Dashboard/>} />
              <Route path="/income" element={<Income/>} /> 
              <Route path="/expenses" element={<Expenses/>} />
              <Route path="/settings" element={<Settings/>} />
              <Route path="/savings" element={<Saving/>} />
              <Route path="/loans" element={<Client/>} />
              <Route path="/users" element={<Users/>} />
            </Routes>
          </div>
          <Informationbar />
          </div>
        </div>
      </div>
      </SidebarProvider>
    </Router>
    
  );
};

export default App;
