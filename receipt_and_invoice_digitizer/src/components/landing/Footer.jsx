import { Mail, Github, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-900 bg-[#030303] pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        
        {/* Brand Section */}
        <div className="col-span-1 md:col-span-1">
          <div className="text-white font-medium tracking-tighter text-lg mb-4">DigiDoc</div>
          <p className="text-zinc-500 text-sm leading-relaxed">
            Precision OCR engine for modern financial workflows. Built by Engineer, built with love.
          </p>
        </div>

        {/* Links Sections */}
        <div>
          <h4 className="text-white text-sm font-semibold mb-4">Product</h4>
          <ul className="space-y-2 text-zinc-500 text-sm">
            <li><a href="#" className="hover:text-blue-500 transition-colors">Features</a></li>
            <li><a href="#" className="hover:text-blue-500 transition-colors">Documentation</a></li>
            <li><a href="#" className="hover:text-blue-500 transition-colors">API Reference</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white text-sm font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-zinc-500 text-sm">
            <li><a href="#" className="hover:text-blue-500 transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-blue-500 transition-colors font-medium text-zinc-300">Careers</a></li>
            <li><a href="#" className="hover:text-blue-500 transition-colors">Help Center</a></li>
          </ul>
        </div>

        {/* Support Section */}
        <div>
          <h4 className="text-white text-sm font-semibold mb-4">Support</h4>
          <div className="flex items-center gap-2 text-zinc-500 text-sm mb-2">
            <Mail size={14} />
            <a href="mailto:ankit302290@gmail.com" className="hover:text-white transition-colors">
              ankit302290@gmail.com
            </a>
          </div>
          <p className="text-xs text-zinc-600 mt-4">
            Response time: &lt; 24 hours
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-zinc-600 text-xs">
          © {new Date().getFullYear()} DigiDoc. All rights reserved.
        </p>
        <div className="flex gap-6 text-zinc-600">
          <a href="https://github.com/Ankitshrma25" className="hover:text-white transition-colors"><Github size={18} /></a>
          <a href="https://www.linkedin.com/in/ankit-sharma-4665271bb/" className="hover:text-white transition-colors"><Linkedin size={18} /></a>
        </div>
      </div>
    </footer>
  );
}