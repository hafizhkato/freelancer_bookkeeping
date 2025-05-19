import React from "react";
import { useState, useEffect } from "react";
import { Mail, Instagram } from "lucide-react";
import FadeInSection from '../../../components/fadeInSection';
import { FaWhatsapp, FaTiktok, FaTelegram } from "react-icons/fa"; 
import products from "../../../data/product"; 
import Navbar from "../../../components/navbar";
import { motion, AnimatePresence } from "framer-motion";

const PRODUCTS_PER_PAGE = 3;
const iceCreamImages = [
         'https://d3vc6iedgmxs4m.cloudfront.net/ayam-packet/ice1.png',
         'https://d3vc6iedgmxs4m.cloudfront.net/ayam-packet/ice2.png',
         'https://d3vc6iedgmxs4m.cloudfront.net/ayam-packet/ice3.png'
        ];
const bannerImage=['https://d3vc6iedgmxs4m.cloudfront.net/ayam-packet/banner-bg.png'];
const contactbanner=['https://d3vc6iedgmxs4m.cloudfront.net/ayam-packet/contact-banner-bg.png'];
const aboutImage=['https://d3vc6iedgmxs4m.cloudfront.net/ayam-packet/about-img.png'];


const AyamPacket: React.FC = () => {
    const [form, setForm] = useState({ name: "", email: "", phone:"", message: "" });
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState<string | null>(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(1);
      useEffect(() => {
        iceCreamImages.forEach((src) => {
        const img = new Image();
        img.src = src;
        });
    }, []);

        useEffect(() => {
            const interval = setInterval(() => {
            setDirection(1);
            setCurrentIndex((prev) => (prev === iceCreamImages.length - 1 ? 0 : prev + 1));
            }, 7000);

            return () => clearInterval(interval);
        }, []);

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
  const pageVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
    };

  const currentProducts = products.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };
  
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
          setForm({ name: "", email: "",phone:"", message: "" });
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
        <div className="min-h-screen bg-red-300 text-black px-1 py-0.5 font-poppins">
        <Navbar backgroundColor="bg-red-300" />
        <FadeInSection>
        <section id="home"
            className="flex flex-col-reverse lg:flex-row items-center justify-between px-6 md:px-16 py-[180px]  bg-white relative overflow-hidden"
            style={{
                backgroundImage: `url(${bannerImage})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* Left Text Content */}
            <div className="w-full lg:w-1/2 text-center lg:text-left z-10">
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                    Ayam <br /> Packet
                </h1>
                <p className="mt-4 text-2xl text-gray-600 max-w-md mx-auto lg:mx-0">
                    Menjual Ayam Mentah dan Ayam yang siap dirempah.
                </p>
                <button className="mt-6 px-6 py-3 bg-red-400 hover:bg-red-500 text-white font-semibold rounded-md shadow-lg transition-all">
                    Order Sekarang
                </button>
            </div>

            {/* Right Image Content */}
            <div className="w-full lg:w-1/2 relative flex justify-center z-10">
                <div className="w-[300px] md:w-[400px] lg:w-[500px] aspect-[2/1] relative overflow-hidden">
                    <AnimatePresence mode="wait">
                    <motion.img
                        key={iceCreamImages[currentIndex]}
                        src={iceCreamImages[currentIndex]}
                        alt="Ice Cream"
                        className="w-full h-full object-cover absolute top-0 left-0"
                        initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
                        transition={{ duration: 0.6 }}
                    />
                    </AnimatePresence>
                </div>
                </div>

        </section>
        </FadeInSection>
         {/* About Section - Updated layout */}
         <FadeInSection>
            <section id="about" className="px-6 md:px-16 bg-white">
                <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
                    {/* Image on the left */}
                    <div className="w-full lg:w-1/2">
                        <img 
                            src={aboutImage[0]} 
                            alt="About our ice cream" 
                            className="h-full w-auto object-cover rounded-lg shadow-lg"
                        />
                    </div>
                    
                    {/* Text content on the right */}
                    <div className="w-full lg:w-1/2">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            About Ayam Packet
                        </h2>
                        <div className="text-gray-600 text-xl space-y-4">
                            <p>
                                Kedai kami ada menjual ayam mentah yang telah dipotong dan dibungkus mengikut keperluan harian. 
                                Setiap pek harian mengandungi 2 hingga 4 ketul ayam, sesuai untuk satu hidangan keluarga. 
                            </p>
                            <p>
                                Dengan cara ini, anda tak perlu lagi cairkan semua ayam beku hanya untuk masak beberapa ketul, cukup ambil satu pek, cairkan, dan terus masak.
                                Lebih mudah, bersih, dan tiada lagi pembaziran.
                                Sesuai untuk isi rumah kecil, individu bujang, atau sesiapa yang mahu memasak dengan lebih teratur setiap hari
                            </p>
                        </div>
                        <div className="mt-8">
                            <a 
                                href="#read-more" 
                                className="inline-block px-6 py-3 bg-red-400 hover:bg-red-500 text-white font-semibold rounded-md shadow-lg transition-all"
                            >
                                Read More
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            </FadeInSection>
            {/* New Featured Products Section */}
            <FadeInSection>
           <section id="products" className="py-16 px-6 md:px-16 bg-white">
            
                <div className="max-w-6xl mx-auto font-poppins">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
                    Produk Ayam Utama Kami
                    </h2>
                    <p className="text-gray-600 text-center mb-12 text-xl">
                    Kami menjual pelbagai jenis ayam yang telah dipotong dan dibungkus mengikut keperluan harian.
                    </p>
                
                    <AnimatePresence mode="wait">
                    <motion.div
                        key={currentPage} // This is crucial: animates every time currentPage changes
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                        variants={pageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                        {currentProducts.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all"
                        >
                            <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-48 object-cover"
                            />
                            <div className="p-6 text-center">
                            <div className="text-2xl font-bold text-red-500 mb-2">
                                RM{product.price}
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">
                                {product.name}
                            </h3>
                            <div className="flex justify-center">
                                <button className="flex items-center gap-2 px-6 py-2 bg-red-400 hover:bg-red-500 text-white font-semibold rounded-md transition-all">
                                <FaWhatsapp className="h-6 w-6" />
                                Order Sekarang
                                </button>
                            </div>
                            </div>
                        </div>
                        ))}
                    </motion.div>
                    </AnimatePresence>

                    {/* Pagination Controls */}
                    <FadeInSection>
                    <div className="flex justify-center mt-10 gap-4">
                    <button
                        onClick={handlePrev}
                        disabled={currentPage === 1}
                        className="px-4 py-2 border border-gray-300 rounded disabled:opacity-50"
                    >
                        Prev
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-4 py-2 rounded ${
                            currentPage === i + 1
                            ? "bg-red-400 text-white"
                            : "bg-gray-200 text-gray-800"
                        }`}
                        >
                        {i + 1}
                        </button>
                    ))}
                    <button
                        onClick={handleNext}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 border border-gray-300 rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                    </div>
                    </FadeInSection>
                </div>
                </section>
                </FadeInSection>
            {/* Contact Section */}
            <FadeInSection>
            <section id="contact" className="py-16 px-6 md:px-16 bg-white"
            style={{
                backgroundImage: `url(${contactbanner})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}>
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
                        Hubungi Kami
                    </h2>
                    
                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Left Contact Info */}
                        <div className="w-full lg:w-1/2">
                            <h3 className="text-2xl font-semibold mb-6 text-red-600">
                                Untuk customize order, hubungi kami di:
                            </h3>
                            <div className="flex items-center gap-5 space-y-4">
                                <div className="flex gap-4 pt-2">
                                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
                                    className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors">
                                    </a>
                                </div>
                                <div className="flex gap-4 pt-2">
                                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
                                    className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors">
                                        <Mail className="h-6 w-6" />
                                    </a>
                                </div>
                                <div className="flex gap-4 pt-2">
                                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
                                    className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors">
                                        <FaWhatsapp className="h-6 w-6" />
                                    </a>
                                </div>
                                {/* Social media links */}
                                <div className="flex gap-4 pt-2">
                                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
                                    className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors">
                                        <Instagram className="h-6 w-6" />

                                    </a>
                                </div>
                                <div className="flex gap-4 pt-2">
                                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
                                    className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors">
                                        <FaTiktok className="h-6 w-6" />
                                    </a>
                                </div>
                                <div className="flex gap-4 pt-2">
                                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
                                    className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors">
                                        <FaTelegram className="h-6 w-6" />
                                    </a>
                                </div>
                            </div>
                        </div>
                        
                        {/* Right Contact Form */}
                        <div className="w-full lg:w-1/2">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <input 
                                        id="name"
                                        type="text"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="Your Name"
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
                                    />
                                </div>
                                <div>
                                    <input 
                                        id="email"
                                        type="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        required 
                                        placeholder="EMAIL" 
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
                                    />
                                </div>
                                <div>
                                    <input 
                                        id="phone"
                                        value={form.phone}
                                        onChange={handleChange}
                                        required
                                        type="tel" 
                                        placeholder="PHONE NUMBER" 
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
                                    />
                                </div>
                                <div>
                                    <textarea 
                                        id="message"
                                        value={form.message}
                                        onChange={handleChange}
                                        required
                                        placeholder="MESSAGE" 
                                        rows={4}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
                                    />
                                </div>
                                <button 
                                    type="submit" 
                                    disabled={submitting}
                                    className="w-full px-6 py-3 bg-red-400 hover:bg-red-500 text-white font-semibold rounded-md transition-all"
                                >
                                    {submitting ? "Sending..." : "Send Message"}
                                </button>
                                {success && <p className="text-center text-sm text-white font-semibold mt-2">{success}</p>}
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            </FadeInSection>
            
            {/* Footer */}
            <footer className="bg-gray-100 py-6 px-6 text-center">
                <p className="text-gray-600">
                    © 2025 All Rights Reserved. RB Rezqy
                </p>
            </footer>
        </div>
    );
};

export default AyamPacket;
