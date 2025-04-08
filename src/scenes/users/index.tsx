import React from "react";
import bannerImage from "../../img/banner.jpeg";
import profileImage from "../../img/profile.jpeg";

const UserProfile: React.FC = () => {
    return (
      <div className="flex justify-center bg-gray-100 min-h-screen">
        <div className="relative w-full bg-white shadow-lg rounded-lg overflow-hidden ">
          {/* Banner */}
          <div 
            className="w-full min-h-[300px] bg-cover bg-center relative"
            style={{ backgroundImage: `url(${bannerImage})` }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-30"></div>
  
            {/* Content Layered Over Banner */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center p-6 ">
              <h1 className="text-3xl font-bold">Holla, Welcome to my Portfolio</h1>
              
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default UserProfile;