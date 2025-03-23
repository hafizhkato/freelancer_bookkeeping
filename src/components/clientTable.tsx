import React, { useState } from "react";

type Client = {
  clientId: string;
  clientName: string;
  clientEmail: string;
  clientPhoneNumber?: string;
  clientCompanyName?: string | null;
  clientAddress?: string | null;
  status: "Ongoing" | "Waiting_for_payment" | "Completed" | "Cancelled" | null;
  members?: any[] | null;
};

type ClientTableProps = {
  clients: Client[];
};

const ClientTable: React.FC<ClientTableProps> = ({ clients }) => {
  const [selectedClients, setSelectedClients] = useState<string[]>([]);

  // Toggle single row selection
  const handleSelectRow = (clientId: string) => {
    setSelectedClients((prev) =>
      prev.includes(clientId)
        ? prev.filter((id) => id !== clientId) // Remove if already selected
        : [...prev, clientId] // Add if not selected
    );
  };

  // Toggle all rows selection
  const handleSelectAll = () => {
    if (selectedClients.length === clients.length) {
      setSelectedClients([]); // Deselect all
    } else {
      setSelectedClients(clients.map((client) => client.clientId)); // Select all
    }
  };

  return (
    <div className="overflow-x-auto mt-6 ml-6 mr-6 mb-6">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="py-2 px-4 border">
              <input
                type="checkbox"
                checked={selectedClients.length === clients.length}
                onChange={handleSelectAll}
              />
            </th>
            <th className="py-2 px-4 border">Client Name</th>
            <th className="py-2 px-4 border">Client Company</th>
            <th className="py-2 px-4 border">Email</th>
            <th className="py-2 px-4 border">Phone Number</th>
            <th className="py-2 px-4 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr
              key={client.clientId}
              className={`text-center border-t ${
                selectedClients.includes(client.clientId) ? "bg-gray-100" : ""
              }`}
            >
              <td className="py-2 px-4 border">
                <input
                  type="checkbox"
                  checked={selectedClients.includes(client.clientId)}
                  onChange={() => handleSelectRow(client.clientId)}
                />
              </td>
              <td className="py-2 px-4 border">{client.clientName}</td>
              <td className="py-2 px-4 border">{client.clientCompanyName}</td>
              <td className="py-2 px-4 border">{client.clientEmail}</td>
              <td className="py-2 px-4 border">{client.clientPhoneNumber}</td>
              <td
                className={`py-2 px-4 border font-bold ${
                  client.status === "Ongoing"
                    ? "text-blue-600"
                    : client.status === "Waiting_for_payment"
                    ? "text-yellow-600"
                    : "text-green-600"
                }`}
              >
                {client.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Display selected client IDs for debugging */}
      <div className="mt-4 p-4 bg-gray-100">
        <h3 className="text-lg font-semibold">Selected Clients:</h3>
        <p>{selectedClients.length > 0 ? selectedClients.join(", ") : "None"}</p>
      </div>
    </div>
  );
};

export default ClientTable;
