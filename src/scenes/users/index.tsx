import React from "react";
import { motion } from "framer-motion";

const skills = [
  { name: "Amazon EC2", icon: "/logos/amazonec2.svg" },
  { name: "Terraform", icon: "/logos/terraform.svg" },
  { name: "GitHub Actions", icon: "/logos/githubactions.svg" },
  { name: "Node.js", icon: "/logos/nodedotjs.svg" },
  { name: "React", icon: "/logos/react.svg" },
  { name: "Amazon RDS", icon: "/logos/amazonrds.svg" },
  { name: "AWS Lambda", icon: "/logos/awslambda.svg" },
  { name: "Amazon S3", icon: "/logos/amazons3.svg" },
  { name: "Tailwindcss", icon: "/logos/tailwindcss.svg" },
  { name: "Docker", icon: "/logos/docker.svg" },
  { name: "Python", icon: "/logos/python.svg" },
  { name: "MySQL", icon: "/logos/mysql.svg" },
  { name: "html5", icon: "/logos/html5.svg" },
  { name: "API Gateway", icon: "/logos/amazonapigateway.svg" },
  { name: "Amplify", icon: "/logos/awsamplify.svg" },
];

const UserProfile: React.FC = () => {

    return (
      <div className="min-h-screen bg-gray-100 py-10 px-6 flex flex-col items-center text-gray-800 font-poppins">
      {/* Profile Picture */}
      <motion.img
        src="https://d3vc6iedgmxs4m.cloudfront.net/profile-2.jpg" // replace with your image path
        alt="Profile"
        className="w-40 h-40 rounded-full shadow-xl border-4 border-white mb-6 rotate-[90deg]"
        initial={{ scale: 0}}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
      />

      {/* Description */}
      <motion.div
        className="max-w-2xl text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h1 className="text-3xl font-bold mb-4">Hi, I'm Hafizh Zulkifli</h1>
        <h2 className="text-xl font-semibold mb-4">Welcome to my Portfolio</h2>
        <p className="text-lg leading-relaxed mb-10">
          I'm passionate about automating infrastructure and building backend systems that scale. I love working with AWS, creating CI/CD pipelines, and making development processes smoother and more efficient.
          <br />
          My goal is to become a skilled cloud engineer, help businesses migrate and optimize in the cloud, and eventually lead innovative tech projects that solve real-world problems.
        </p>
      </motion.div>

      {/* Skills Section */}
      <motion.div
      className="grid grid-cols-5 gap-10 max-w-3xl mx-auto mt-10 mb-10"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.1 },
        },
      }}
    >
      {skills.map((skill, i) => (
        <motion.div
          key={i}
          className="relative group bg-white p-4 rounded-2xl shadow-md hover:shadow-xl transition duration-300 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 120 }}
        >
          <img src={skill.icon} alt={skill.name} className="w-12 h-12" />
          <div className="absolute bottom-[-2.5rem] scale-0 group-hover:scale-100 transition-transform duration-300 text-sm text-dark bg-black px-3 py-1 rounded-lg">
            {skill.name}
          </div>
        </motion.div>
      ))}
    </motion.div>
    </div>
    )
  };
  
  export default UserProfile;