import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();


const schema = yup.object({
  clientName: yup.string().required("Client name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  countryCode: yup.string().required("Country code is required"), // ✅ Add countryCode validation
  phone: yup
  .string()
  .matches(/^[0-9]+$/, "Phone number must contain only numbers")
  .required("Phone number is required"),
  companyName: yup.string().required("Company name is required"),
  address: yup.string().required("Address is required"),
  // document: yup
  //   .mixed()
  //   .test("fileRequired", "Icon upload is required", (value) => {
  //     return value && value.length > 0;
  //   }),
});

type ClientFormData = {
  clientName: string;
  email: string;
  phone: string;
  companyName: string;
  address: string;
  countryCode: string; // ✅ Add countryCode field
  // document: FileList;
};

type CreateFormProps = {
  onClose: () => void;
};

const CreateForm: React.FC<CreateFormProps> = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClientFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: ClientFormData) => {
    try {

      let formattedPhone = data.phone.replace(/^0+/, ""); // Remove leading zero

      const fullPhoneNumber = `${data.countryCode} ${formattedPhone}`; // Concatenate country code
  
      // Submit form data to DynamoDB
      const newClient = await client.models.ClientTable.create({
        clientId: crypto.randomUUID(), // Ensure a unique ID is passed
        clientName: data.clientName,
        clientEmail: data.email,
        clientPhoneNumber: fullPhoneNumber,
        clientCompanyName: data.companyName,
        clientAddress: data.address 
      });
  
      console.log("Successfully added:", newClient);
      onClose(); // Close form after submission
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Create Client</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="block text-sm font-medium">Client Name</label>
            <input className="w-full p-2 border rounded" {...register("clientName")} />
            <p className="text-red-500 text-xs">{errors.clientName?.message}</p>
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium">Email</label>
            <input className="w-full p-2 border rounded" type="email" {...register("email")} />
            <p className="text-red-500 text-xs">{errors.email?.message}</p>
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium">Phone Number</label>
            <div className="flex">
              {/* Country Code Dropdown */}
              <select 
                className="p-2 border rounded-l bg-gray-100" 
                {...register("countryCode", { required: "Country code is required" })}
              >
                <option value="+1">+1 (US)</option>
                <option value="+44">+44 (UK)</option>
                <option value="+91">+91 (India)</option>
                <option value="+60">+60 (Malaysia)</option>
                {/* Add more country codes as needed */}
              </select>

              {/* Phone Number Input */}
              <input 
                className="w-full p-2 border rounded-r" 
                type="text" 
                placeholder="1234567890" 
                {...register("phone", { required: "Phone number is required" })}
              />
            </div>
            
            {/* Validation Errors */}
            <p className="text-red-500 text-xs">{errors.countryCode?.message}</p>
            <p className="text-red-500 text-xs">{errors.phone?.message}</p>
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium">Company Name</label>
            <input className="w-full p-2 border rounded" type="text" {...register("companyName")} />
            <p className="text-red-500 text-xs">{errors.companyName?.message}</p>
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium">Address</label>
            <textarea className="w-full p-2 border rounded" {...register("address")} />
            <p className="text-red-500 text-xs">{errors.address?.message}</p>
          </div>

          {/* <div className="mb-3">
            <label className="block text-sm font-medium">Upload Document</label>
            <input className="w-full" type="file" {...register("document")} />
            <p className="text-red-500 text-xs">{errors.document?.message}</p>
          </div> */}

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-500 text-white rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateForm;
