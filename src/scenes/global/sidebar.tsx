
import { Link } from "react-router-dom";
import { LayoutDashboard, Database, Cloud, Users, Menu} from "lucide-react";
import { useSidebar } from "../../context/SidebarContext"; // Import context

const Sidebar = () => {
  const { isOpen, setIsOpen } = useSidebar();

  return (
    <div className={` ${isOpen ? "w-64" : "w-20"} light bg-gray-800 text-white p-5 border border-white rounded-lg transition-all duration-300`}>
      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="flex items-center gap-4 text-white p-2 rounded mb-7 text-lg"
      >
        <Menu size={isOpen ? 24 : 20} />
        {isOpen && <span>Bangsal Kerinci</span>}
      </button>

      {/* Sidebar Content */}
      <nav>
        <ul className="space-y-5 font-poppins text-lg">
          <li>
            <Link to="/" className="flex items-center gap-3 p-2 hover:bg-gray-600 rounded ">
              <LayoutDashboard size={20} />
              {isOpen && <span>Dashboard</span>}
            </Link>
          </li>
          <li>
            <Link to="/projects/database-migration" className="flex items-center gap-3 p-2 hover:bg-gray-600 rounded ">
              <Database size={20} />
              {isOpen && <span>Database Project</span>}
            </Link>
          </li>
          <li>
            <Link to="/textract" className="flex items-center gap-3 p-2 hover:bg-gray-600 rounded">
              <Cloud size={20} />
              {isOpen && <span>Serverless Application</span>}
            </Link>
          </li>
          <li>
            <Link to="/aboutme" className="flex items-center gap-3 p-2 hover:bg-gray-600 rounded">
              <Users size={20} />
              {isOpen && <span>About Me</span>}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
