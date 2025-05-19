import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Database,
  Cloud,
  Menu,
  LogOutIcon,
  Globe,
  Server,
  Cat,
} from "lucide-react";
import { useSidebar } from "../../context/SidebarContext";
import { useAuthenticator } from "@aws-amplify/ui-react";

const Sidebar = () => {
  const { isOpen, setIsOpen } = useSidebar();
  const { signOut } = useAuthenticator();
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: { target: any; }) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  if (!isOpen) {
    // Closed state: render circular floating button
    return (
      <div className="fixed left-6 top-1/2 transform -translate-y-1/2 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 flex items-center justify-center bg-gray-100 text-dark rounded-full shadow-lg hover:bg-gray-700 transition-all duration-300"
        >
          <Menu size={24} />
        </button>
      </div>
    );
  }

  // Open state: full sidebar
  return (
    <div
      ref={sidebarRef}
      className="fixed top-6 left-6 z-50 w-64 bg-gray-300 text-dark p-5 border border-white rounded-lg transition-all duration-300 h-screen"
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(false)}
        className="flex items-center gap-4 text-dark p-2 rounded mb-7 text-lg"
      >
        <Menu size={24} />
        <span>Bangsal Kerinci</span>
      </button>

      {/* Sidebar Content */}
      <nav>
        <ul className="space-y-5 font-poppins text-lg">
          <li>
            <Link to="/" className="flex items-center gap-3 p-2 hover:bg-gray-600 rounded">
              <Globe size={20} />
              <span>Main Menu</span>
            </Link>
          </li>
          <li>
            <Link to="/projects/database-migration" className="flex items-center gap-3 p-2 hover:bg-gray-600 rounded">
              <Database size={20} />
              <span>Database Project</span>
            </Link>
          </li>
          <li>
            <Link to="/serverless-project" className="flex items-center gap-3 p-2 hover:bg-gray-600 rounded">
              <Cloud size={20} />
              <span>Serverless Application</span>
            </Link>
          </li>
          <li>
            <Link to="/devops-project" className="flex items-center gap-3 p-2 hover:bg-gray-600 rounded">
              <Server size={20} />
              <span>DevOps Project</span>
            </Link>
          </li>
          <li>
            <Link to="/website-project" className="flex items-center gap-3 p-2 hover:bg-gray-600 rounded">
              <Cat size={20} />
              <span>Website Project</span>
            </Link>
          </li>
          <li>
            <button onClick={signOut} className="flex items-center gap-3 p-2 hover:bg-gray-600 rounded">
              <LogOutIcon size={20} />
              <span>Sign Out</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
