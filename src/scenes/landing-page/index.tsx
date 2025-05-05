import React from 'react';
import { Link } from 'react-router-dom';
import FadeInSection from '../../components/fadeInSection';
import { useState } from 'react';

const skills = [
    { name: 'Github', icon: '/logos/github.svg' },
    { name: 'Terraform', icon: '/logos/terraform.svg' },
    { name: 'Python', icon: '/logos/python.svg' },
    { name: 'Docker', icon: '/logos/docker.svg' },
    { name: 'Linux', icon: '/logos/linux.svg' },
    { name: 'React', icon: '/logos/react.svg' },
    { name: 'Amplify', icon: '/logos/awsamplify.svg' },
    { name: 'Node.js', icon: '/logos/nodedotjs.svg' },
    { name: 'MySQL', icon: '/logos/mysql.svg' },
    { name: 'Tailwind', icon: '/logos/tailwindcss.svg' },
  ];


const LandingPage: React.FC = () => {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState<string | null>(null);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm({ ...form, [e.target.id]: e.target.value });
    };
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setSubmitting(true);
      setSuccess(null);
  
      try {
        const response = await fetch("https://vyk4ibzt05.execute-api.ap-southeast-1.amazonaws.com/dev/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
  
        const result = await response.json();
  
        if (response.ok) {
          setSuccess("Message sent successfully!");
          setForm({ name: "", email: "", message: "" });
        } else {
          throw new Error(result.error || "Something went wrong.");
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
          setSuccess(`Failed to send message: ${error.message}`);
        } else {
          setSuccess("Failed to send message: Unknown error occurred.");
        }
      } finally {
        setSubmitting(false);
      }
    };

    return (
        <div className="min-h-screen bg-white text-black px-6 py-12">
        {/* Navbar */}
        <nav className="flex justify-end space-x-6 text-sm font-semibold mb-12">
            <a href="#aboutme" className="hover:underline">About Me</a>
            <a href="#skills" className="hover:underline">Skills</a>
            <a href="#contact" className="hover:underline">Contact</a>
        </nav>
    
        {/* Hero Section */}
        <FadeInSection>
        <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between">
            <div className="md:w-1/2 text-center md:text-left">
                <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
                    Hi <span className="inline-block">👋</span>,<br />
                    I’m <span className="text-indigo-600">Hafizh Zulkifli</span>,<br />
                    Cloud Engineer & DevOps Engineer
                </h1>
                <p className="text-gray-600 text-base md:text-lg mb-6">
                    I am a Cloud Engineer and DevOps Engineer with a passion for building scalable and efficient cloud solutions. I specialize in AWS, Terraform, and CI/CD pipelines. I love solving complex problems and automating processes to improve efficiency.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                    <Link to="/dashboard">
                        <button className="border-2 border-black text-black px-6 py-3 rounded-md font-medium hover:bg-indigo-600 hover:text-black transition">
                            SEE MY PROJECTS
                        </button>
                    </Link>
                </div>
            </div>
    
            <div className="md:w-1/2 flex justify-center md:justify-end mb-12 md:mb-0">
                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-black shadow-lg">
                    <img
                        src="https://d3vc6iedgmxs4m.cloudfront.net/profile-2.jpg"
                        alt="Profile"
                        className="object-cover w-full h-full"
                    />
                </div>
            </div>
        </div>
        </FadeInSection>
    
        {/* About Me Section */}
        <section id="aboutme" className="mt-32 py-16 bg-gray-50">
            <FadeInSection>
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 px-6">
                {/* Left: Image */}
                <div className="md:w-1/2 flex justify-center">
                <div className="w-80 h-64 md:w-[28rem] md:h-80 rounded-lg overflow-hidden shadow-lg border-4 border-gray-200">
                    <img
                        src="https://d3vc6iedgmxs4m.cloudfront.net/line123.jpg"
                        alt="About Me"
                        className="w-full h-full object-cover"
                    />
                    </div>
                </div>

                {/* Right: Text */}
                <div className="md:w-1/2 text-center md:text-left">
                    <h2 className="text-3xl font-bold mb-4">About Me</h2>
                    <p className="text-gray-700 text-base md:text-lg">
                    I'm a self-driven engineer with a background in building scalable cloud infrastructure and automating DevOps workflows. I transitioned into tech to help businesses grow faster and more reliably using modern cloud-native tools.
                    <br /><br />
                    Whether it's provisioning with Terraform, setting up CI/CD pipelines, or optimizing AWS services, I bring passion, precision, and a focus on delivering value.
                    </p>
                </div>
                </div>
            </FadeInSection>
        </section>
    
        {/* Skills Section */}
        <section id="skills" className="mt-0 py-16 bg-white text-center">
        <FadeInSection>
            <h2 className="text-3xl font-bold mb-6">Skills</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {skills.map(({ name, icon }) => (
                    <div key={name} className="flex flex-col items-center space-y-2">
                    <img src={icon} alt={name} className="w-12 h-12" />
                    <span className="text-sm font-medium">{name}</span>
                    </div>
                ))}
            </div>
            </FadeInSection>
        </section>
    
        {/* Contact Section */}
        <section id="contact" className="py-20 bg-gray-900 text-white text-center">
            <FadeInSection>
                <h2 className="text-3xl font-bold mb-4">Contact</h2>
                <p className="text-gray-300 mb-10">
                Have a project in mind or want to collaborate? Let’s connect!
                </p>

                {/* Contact Form */}
                <form onSubmit={handleSubmit} className="max-w-xl mx-auto w-full space-y-6 px-4">
                    <div className="flex flex-col text-left">
                        <label htmlFor="name" className="mb-1 text-sm font-medium">Name</label>
                        <input
                        id="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        className="px-4 py-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Your Name"
                        required
                        />
                    </div>

                    <div className="flex flex-col text-left">
                        <label htmlFor="email" className="mb-1 text-sm font-medium">Email</label>
                        <input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        className="px-4 py-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="you@example.com"
                        required
                        />
                    </div>

                    <div className="flex flex-col text-left">
                        <label htmlFor="message" className="mb-1 text-sm font-medium">Message</label>
                        <textarea
                        id="message"
                        rows={5}
                        value={form.message}
                        onChange={handleChange}
                        className="px-4 py-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Tell me more about your project..."
                        required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={submitting}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 px-6 rounded-md transition"
                    >
                        {submitting ? "Sending..." : "Send Message"}
                    </button>

                    {success && <p className="text-center text-sm text-white mt-2">{success}</p>}
                    </form>

                {/* Optional direct links */}
                <div className="mt-10 space-y-2">
                <a href="mailto:hafizhzulkifli@gmail.com" className="text-indigo-400 hover:underline block">
                    📧 hafizhzulkifli@gmail.com
                </a>
                <a
                    href="https://www.linkedin.com/in/hafizh-zulkifli-5197b335b/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-400 hover:underline block"
                >
                    🔗 LinkedIn Profile
                </a>
                </div>
            </FadeInSection>
            </section>

    </div>
    
    );
};

export default LandingPage;
