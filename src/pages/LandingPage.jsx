import { useState } from "react";
import { Upload, ScanLine, BarChart3, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function LandingPage() {
  const [image, setImage] = useState(null);

return ( <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 text-white">

```
  {/* NAVBAR */}

  <nav className="flex justify-between items-center px-10 py-6">

    <h1 className="text-2xl font-bold tracking-wide">
      ReceiptAI
    </h1>

    <div className="space-x-8 text-gray-300">

  <a href="#about" className="hover:text-white">
    About
  </a>

  <a href="#features" className="hover:text-white">
    Features
  </a>

  <a href="#demo" className="hover:text-white">
    Demo
  </a>

  <Link to="/dashboard" className="hover:text-white">
    Dashboard
  </Link>

</div>

  </nav>



  {/* HERO */}

  <motion.section
  initial={{ opacity: 0, y: 60 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  className="text-center py-28 px-6"
>

  <h1 className="text-5xl font-bold mb-6 leading-tight">
    AI Powered Receipt & Invoice Digitizer
  </h1>

  <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-10">
    Upload receipts and automatically extract structured financial data
    using powerful OCR and AI technology.
  </p>

  <div className="space-x-4">

  <Link
    to="/dashboard"
    className="bg-indigo-600 hover:bg-indigo-700 px-8 py-3 rounded-lg font-medium inline-block"
  >
    Get Started
  </Link>

  <a
    href="#demo"
    className="border border-white/30 hover:bg-white/10 px-8 py-3 rounded-lg inline-block"
  >
    Live Demo
  </a>

</div>
</motion.section>


  {/* AI SCANNER DEMO */}

  <section className="py-24 text-center">

    <h2 className="text-4xl font-bold mb-10">
      AI Receipt Scanner
    </h2>

    <p className="text-gray-300 mb-12 max-w-xl mx-auto">
      Watch how our OCR engine scans and extracts data automatically from receipts.
    </p>

    <div className="flex justify-center">

      <div className="relative w-[320px] h-[420px] bg-white rounded-xl shadow-2xl overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/40 to-transparent animate-pulse"></div>

        <div className="p-6 text-black text-left text-sm space-y-2">

          <p>Store: Walmart</p>
          <p>Date: 12 Feb 2026</p>
          <p>Item: Groceries</p>
          <p>Tax: $3.10</p>
          <p className="font-bold">Total: $45.20</p>

        </div>

      </div>

    </div>

  </section>

  <section id="about" className="py-24 px-8 text-center">

  <h2 className="text-4xl font-bold mb-6">
    About ReceiptAI
  </h2>

  <p className="text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed">
    ReceiptAI is an intelligent receipt and invoice digitization platform
    that uses Optical Character Recognition (OCR) and AI to automatically
    extract important information from receipts and invoices.
  </p>

  <p className="text-gray-400 max-w-3xl mx-auto mt-6">
    Instead of manually entering financial data, users can simply upload
    an image of a receipt and instantly convert it into structured digital
    data. The system identifies merchant names, transaction dates, taxes,
    and totals, helping individuals and businesses manage expenses
    efficiently and maintain organized financial records.
  </p>

</section>
  {/* FEATURES */}

  <section id="features" className="py-28 px-8">

    <h2 className="text-4xl font-bold text-center mb-16">
      Powerful Features
    </h2>

    <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">

      <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-xl hover:scale-105 transition">

        <Upload className="w-10 h-10 mb-4 text-indigo-400" />

        <h3 className="text-xl font-semibold mb-2">
          Easy Upload
        </h3>

        <p className="text-gray-300 text-sm">
          Upload receipts, invoices or bills instantly.
        </p>

      </div>



      <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-xl hover:scale-105 transition">

        <ScanLine className="w-10 h-10 mb-4 text-purple-400" />

        <h3 className="text-xl font-semibold mb-2">
          Smart OCR
        </h3>

        <p className="text-gray-300 text-sm">
          Extract merchant, date, totals and tax automatically.
        </p>

      </div>



      <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-xl hover:scale-105 transition">

        <BarChart3 className="w-10 h-10 mb-4 text-blue-400" />

        <h3 className="text-xl font-semibold mb-2">
          Dashboard Analytics
        </h3>

        <p className="text-gray-300 text-sm">
          Track spending insights and receipt history.
        </p>

      </div>



      <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-xl hover:scale-105 transition">

        <ShieldCheck className="w-10 h-10 mb-4 text-green-400" />

        <h3 className="text-xl font-semibold mb-2">
          Secure Storage
        </h3>

        <p className="text-gray-300 text-sm">
          Your financial data stays encrypted and protected.
        </p>

      </div>

    </div>

  </section>



  {/* OCR DEMO */}

  <section id="demo" className="py-28 text-center">

<h2 className="text-4xl font-bold mb-8">
  Try OCR Demo
</h2>

<p className="text-gray-300 mb-10">
  Upload a receipt image and watch AI extract the data instantly.
</p>

<div className="flex flex-col items-center gap-6">

<input
  type="file"
  className="bg-white text-black px-6 py-3 rounded-lg cursor-pointer"
  onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))}
/>
{image && (
  <img src={image} className="w-48 rounded-lg shadow-lg mt-4" />
)}

<div className="relative w-[300px] bg-white text-black p-6 rounded-xl shadow-xl text-left">

<div className="scanner-line"></div>

<p><strong>Store:</strong> Walmart</p>
<p><strong>Date:</strong> 12 Feb 2026</p>
<p><strong>Item:</strong> Groceries</p>
<p><strong>Tax:</strong> $3.10</p>
<p className="font-bold text-lg"><strong>Total:</strong> $45.20</p>

</div>

</div>

</section>


  


  {/* STATS */}

  <section className="py-24 text-center">

    <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">

      <div>

        <h3 className="text-4xl font-bold text-indigo-400">10K+</h3>
        <p className="text-gray-300">Receipts Processed</p>

      </div>

      <div>

        <h3 className="text-4xl font-bold text-purple-400">98%</h3>
        <p className="text-gray-300">OCR Accuracy</p>

      </div>

      <div>

        <h3 className="text-4xl font-bold text-blue-400">500+</h3>
        <p className="text-gray-300">Active Users</p>

      </div>

    </div>

  </section>



  {/* CTA */}

  <section className="text-center py-24">

    <h2 className="text-4xl font-bold mb-6">
      Start Digitizing Your Receipts Today
    </h2>

    <Link
  to="/dashboard"
  className="bg-indigo-600 hover:bg-indigo-700 px-10 py-4 rounded-lg text-lg inline-block"
>
  Get Started
</Link>

  </section>



  {/* FOOTER */}

  <footer className="text-center py-10 text-gray-400 border-t border-white/10">

    <p>© 2026 ReceiptAI — AI Powered Receipt Digitization</p>

  </footer>


</div>


);
}
