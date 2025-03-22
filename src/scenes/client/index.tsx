import React from 'react';
import Header from '../../components/header';
import { Search, Filter, PlusCircle, Edit, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import CreateForm from "../../components/createform";
import ClientTable from "../../components/clientTable";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../../amplify/data/resource";

const client = generateClient<Schema>();
type SimpleClient = {
  clientId: string;
  clientName: string;
  clientEmail: string;
  clientPhoneNumber: string;
  status: "Ongoing" | "Waiting_for_payment" | "Completed" | "Cancelled" | null;
};

const Client: React.FC = () => {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("");
    const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const clientsPerPage = 10;
    const [clients, setClients] = useState<SimpleClient[]>([]);


    useEffect(() => {
      const selectionSet = [
        "clientId",
        "clientName",
        "clientEmail",
        "clientPhoneNumber",
        "status"
      ] as const;
    
      const sub = client.models.ClientTable.observeQuery(
        {
          selectionSet: [...selectionSet] // Ensures only required fields are fetched
        }
      ).subscribe({
        next: (data) => {
          // Transform the data to match SimpleClient type
          const filteredClients = data.items.map(client => ({
            clientId: client.clientId,
            clientName: client.clientName,
            clientEmail: client.clientEmail,
            clientPhoneNumber: client.clientPhoneNumber,
            status: client.status
          }));
    
          setClients(filteredClients); // Update state
        },
        error: (err) => console.error("Error fetching clients:", err),
      });
    
      return () => sub.unsubscribe(); // Cleanup subscription on unmount
    }, []);

     // Apply Filtering & Search
    const filteredClients = clients.filter(client => {
        const matchesFilter = filter ? client.status === filter : true;
        const matchesSearch = search
            ? client.clientName.toLowerCase().includes(search.toLowerCase()) ||
              client.clientEmail.toLowerCase().includes(search.toLowerCase())
            : true;
        return matchesFilter && matchesSearch;
    });

    // Handle filter change & reset to first page
    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilter(e.target.value);
        setCurrentPage(1); // Reset pagination when filter changes
    };

    // Handle search input change & reset to first page
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        setCurrentPage(1); // Reset pagination when search changes
    };

    // Pagination Logic
    const totalPages = Math.ceil(filteredClients.length / clientsPerPage);
    const startIndex = (currentPage - 1) * clientsPerPage;
    const endIndex = startIndex + clientsPerPage;
    const paginatedClients = filteredClients.slice(startIndex, endIndex);

    return (
        <div>
        <Header title="Client Management" subtitle='Create, manage and edit your client' />
        <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0 mt-4 ml-2 mr-2">
        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-2 top-1 text-gray-500" size={18} />
            <input
              type="text"
              placeholder="Search..."
              className="pl-8 pr-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={search}
              onChange={handleSearchChange}
            />
          </div>
          
          {/* Filter Dropdown */}
          <div className="relative">
            <Filter className="absolute left-2 top-1 text-gray-500" size={18} />
            <select
              className="pl-8 pr-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filter}
              onChange={handleFilterChange}
            >
              <option value="">All Statuses</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Waiting_for_Payment">Waiting for Payment</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
        <button
            className="flex items-center space-x-1 bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
            onClick={() => setIsCreateFormOpen(true)}
          >
            <PlusCircle size={18} />
            <span>Create</span>
          </button>
          <button className="flex items-center space-x-1 bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600">
            <Edit size={18} />
            <span>Edit</span>
          </button>
          <button className="flex items-center space-x-1 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">
            <Trash2 size={18} />
            <span>Delete</span>
          </button>
        </div>
      </div>
      {/* Display Filtered Clients */}
      <ClientTable clients={paginatedClients} />

       {/* Pagination Controls */}
       <div className="flex justify-center mt-4 space-x-4 mb-6">
                <button
                    className={`px-4 py-2 rounded-md ${currentPage === 1 ? "bg-gray-300" : "bg-blue-500 hover:bg-blue-600 text-white"}`}
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span className="text-lg font-semibold">{currentPage} / {totalPages}</span>
                <button
                    className={`px-4 py-2 rounded-md ${currentPage === totalPages ? "bg-gray-300" : "bg-blue-500 hover:bg-blue-600 text-white"}`}
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>

      {/* Create Form Modal */}
      {isCreateFormOpen && <CreateForm onClose={() => setIsCreateFormOpen(false)} />}
    </div>
    );
};

export default Client;