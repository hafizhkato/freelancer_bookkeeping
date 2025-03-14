import { useState } from "react";
import { ChevronLeft, ChevronRight} from "lucide-react";

const Informationbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <div className="hidden sm:block h-screen bg-gray-800 text-white p-2 border border-white rounded-lg">
        <div className={`light ${isOpen ? "w-64" : "w-10"} transition-all duration-300`}>
            {/* Toggle Button */}
        <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="flex items-center gap-4 text-white rounded mb-7 text-lg "
        >
            {isOpen ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
        </button>
        {/* Info Bar Content */}
        {isOpen && (
          <div className="text-white p-4 flex flex-col space-y-4 h-full">
            <span>Free shipping on orders over $100</span>
            <span>Call us: +123 456 789</span>
          </div>
        )}
        
      </div>
      </div>
    );
  };
  
  export default Informationbar;
  