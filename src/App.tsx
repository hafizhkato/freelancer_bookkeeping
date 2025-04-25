import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./scenes/global/sidebar";
// import Navbar from "./scenes/global/navbar";
import { SidebarProvider } from "./context/SidebarContext";
import Informationbar from "./scenes/global/informationbar";
import Dashboard from "./scenes/dashboard";
import Income from "./scenes/income";
import Textract from "./scenes/textract";
import Settings from "./scenes/settings";
import Client from "./scenes/client";
import UserProfile from "./scenes/users";
import Ec2Terraform from "./scenes/ec2Terraform";
import ImageProcessing from "./scenes/image-processing";
import DatabaseMigration from "./scenes/database-migration";
import OngoingProject from "./scenes/ongoing-project";
import PhaseOne from "./scenes/database-migration/phase/phaseOne";
import PhaseOnePartTwo from "./scenes/database-migration/phase/phaseOnepartTwo";
import PhaseTwo from "./scenes/database-migration/phase/phaseTwoandThree";

const App = () => {
  return (
    
    <Router>
      <SidebarProvider>
      <div className="flex min-h-screen light bg-gray-300">
        {/* Sidebar */}
        <Sidebar />

        <div className="flex-1 flex flex-col">
          {/* Navbar */}
          {/* <Navbar /> */}
          

          {/* Main Content */}
          <div className="flex flex-1 light bg-gray-300 ">
          <div className="flex-1 overflow-y-auto ">
            <Routes>
              <Route path="/" element={<Dashboard/>} />
              <Route path="/income" element={<Income/>} /> 
              <Route path="/projects/textract-app" element={<Textract/>} />
              <Route path="/settings" element={<Settings/>} />
              <Route path="/projects/terraform-ec2" element={<Ec2Terraform/>} />
              <Route path="/projects/client-management" element={<Client/>} />
              <Route path="/aboutme" element={<UserProfile/>} />
              <Route path="/projects/severless-image-processing" element={<ImageProcessing/>} />
              <Route path="/projects/database-migration" element={<OngoingProject/>} />
              <Route path="/projects/database-migration/planning" element={<DatabaseMigration/>} />
              <Route path="/projects/database-migration/phase1" element={<PhaseOne/>} />
              <Route path="/projects/database-migration/phase1part2" element={<PhaseOnePartTwo/>} />
              <Route path="/projects/database-migration/phase2" element={<PhaseTwo/>} />
            </Routes>
          </div>
          <Informationbar
          /> 
          </div>
        </div>
      </div>
      </SidebarProvider>
    </Router>
    
  );
};

export default App;
