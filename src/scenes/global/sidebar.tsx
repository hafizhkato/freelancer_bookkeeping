
import { Link } from "react-router-dom";
import { LayoutDashboard, DollarSign, Wallet, Settings, Menu, HandCoins, CreditCard } from "lucide-react";
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
            <Link to="/income" className="flex items-center gap-3 p-2 hover:bg-gray-600 rounded ">
              <DollarSign size={20} />
              {isOpen && <span>Income</span>}
            </Link>
          </li>
          <li>
            <Link to="/expenses" className="flex items-center gap-3 p-2 hover:bg-gray-600 rounded">
              <Wallet size={20} />
              {isOpen && <span>Expense</span>}
            </Link>
          </li>
          <li>
            <Link to="/savings" className="flex items-center gap-3 p-2 hover:bg-gray-600 rounded">
              <HandCoins size={20} />
              {isOpen && <span>Savings</span>}
            </Link>
          </li>
          <li>
            <Link to="/loans" className="flex items-center gap-3 p-2 hover:bg-gray-600 rounded">
              <CreditCard size={20} />
              {isOpen && <span>Loan</span>}
            </Link>
          </li>
          <li>
            <Link to="/settings" className="flex items-center gap-3 p-2 hover:bg-gray-600 rounded">
              <Settings size={20} />
              {isOpen && <span>Settings</span>}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
