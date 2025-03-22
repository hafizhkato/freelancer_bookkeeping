import React from "react";

type Client = {
  clientId: string;
  clientName: string;
  clientEmail: string;
  clientPhoneNumber?: string ; // Allow null
  clientCompanyName?: string | null; // Allow null
  clientAddress?: string | null; // Allow null
  status: "Ongoing" | "Waiting_for_payment" | "Completed" | "Cancelled" | null; // Adjust the type if needed based on 'ClientSchema'
  members?: any[] | null; // Adjust the type if needed based on 'ClientDocuments'
};

type ClientTableProps = {
  clients: Client[];
};

const ClientTable: React.FC<ClientTableProps> = ({ clients }) => {
  return (
    <div className="overflow-x-auto mt-6 ml-6 mr-6 mb-6">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="py-2 px-4 border">Client ID</th>
            <th className="py-2 px-4 border">Client Name</th>
            <th className="py-2 px-4 border">Email</th>
            <th className="py-2 px-4 border">Phone Number</th>
            <th className="py-2 px-4 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.clientId} className="text-center border-t">
              <td className="py-2 px-4 border">{client.clientId}</td>
              <td className="py-2 px-4 border">{client.clientName}</td>
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
    </div>
  );
};

export default ClientTable;