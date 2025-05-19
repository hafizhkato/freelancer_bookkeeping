import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./scenes/global/sidebar";
// import Navbar from "./scenes/global/navbar";
import { SidebarProvider } from "./context/SidebarContext";
import Dashboard from "./scenes/dashboard";
import UploadLimit from "./scenes/serverless-project/limit-API";
import Income from "./scenes/income";
import Textract from "./scenes/serverless-project/textract";
import Settings from "./scenes/settings";
import Client from "./scenes/client";
import Ec2Terraform from "./scenes/ec2Terraform";
import ImageProcessing from "./scenes/serverless-project/image-processing";
import DatabaseMigration from "./scenes/database-migration";
import OngoingProject from "./scenes/ongoing-project";
import PhaseOne from "./scenes/database-migration/phase/phaseOne";
import PhaseOnePartTwo from "./scenes/database-migration/phase/phaseOnepartTwo";
import PhaseTwo from "./scenes/database-migration/phase/phaseTwoandThree";
import ServerlessProject from "./scenes/serverless-project";
import MultiState from "./scenes/devops/multi-state-env";
import LandingPage from "./scenes/landing-page";
import OthersProject from "./scenes/others-project";
import DevopsProject from "./scenes/devops";
import WebsiteProject from "./scenes/website";
import AyamPacket from "./scenes/website/ayam-packet";
import ViteInfra from "./scenes/devops/vite-app";
import ContactForm from "./scenes/serverless-project/contact-form";
import { Authenticator } from '@aws-amplify/ui-react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { JSX } from "react/jsx-runtime";

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { authStatus } = useAuthenticator();

  if (authStatus !== 'authenticated') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Authenticator />
      </div>
    );
  }

  return children;
}

const App = () => {

  return (
    <Authenticator.Provider>
    
    
    <Router>
      <SidebarProvider>
      <div className="flex min-h-screen light bg-gray-50">
        {/* Sidebar */}
        <Sidebar />

        <div className="flex-1 flex flex-col">
          {/* Navbar */}
          {/* <Navbar /> */}
          

          {/* Main Content */}
          <div className="flex flex-1 light bg-gray-50 ">
          <div className="flex-1 overflow-y-auto ">
            <Routes>
              <Route path="/" element={<LandingPage/>} />
              <Route path="/dashboard" element={<Dashboard/>} />
              <Route path="/income" element={<Income/>} /> 
              <Route path="/projects/textract-app" element={<ProtectedRoute>
            <Textract />
          </ProtectedRoute>} />
              <Route path="/settings" element={<Settings/>} />
              <Route path="/projects/terraform-ec2" element={<Ec2Terraform/>} />
              <Route path="/projects/client-management" element={<ProtectedRoute>
            <Client />
          </ProtectedRoute>} />
              <Route path="/projects/severless-image-processing" element={<ImageProcessing/>} />
              <Route path="/projects/database-migration" element={<OngoingProject/>} />
              <Route path="/projects/database-migration/planning" element={<DatabaseMigration/>} />
              <Route path="/projects/database-migration/phase1" element={<PhaseOne/>} />
              <Route path="/projects/database-migration/phase1part2" element={<PhaseOnePartTwo/>} />
              <Route path="/projects/database-migration/phase2" element={<PhaseTwo/>} />
              <Route path="/projects/multi-state-env" element={<MultiState/>} />
              <Route path="/serverless-project" element={<ServerlessProject/>} />
              <Route path="/devops-project" element={<DevopsProject/>} />
              <Route path="/other-project" element={<OthersProject/>} />
              <Route path="/website-project" element={<WebsiteProject/>} />
              <Route path="/projects/upload-limit-api" element={<UploadLimit/>} />
              <Route path="/projects/contact-form" element={<ContactForm/>} />
              <Route path="/projects/automating-backend-deployment" element={<ViteInfra/>} />
              <Route path="/projects/website-ayam-packet" element={<AyamPacket/>} />
              
              
            </Routes>
          </div>
          </div>
        </div>
      </div>
      </SidebarProvider>
    </Router>
    </Authenticator.Provider>
  );
};

export default App;
