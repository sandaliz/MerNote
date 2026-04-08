import { Github, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-base-300 border-t border-base-content/10 mt-4 w-full">
      <div className="mx-auto max-w-7xl px-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Left: Branding */}
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold text-primary font-mono tracking-tight">
              MerNote
            </h2>
            <p className="text-sm text-base-content/60">
              Your personal notes, beautifully organized
            </p>
          </div>

          {/* Center: Links */}
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm text-base-content/60">
              Made with <span className="inline-flex items-center"><Heart className="w-4 h-4 text-error mx-1" /></span> 
            </p>
            <p className="text-xs text-base-content/40">
              © 2026 All rights reserved
            </p>
          </div>

          {/* Right: GitHub Link */}
          <div className="flex flex-col items-end gap-2">
            <a 
              href="https://github.com/sandaliz" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm hover:text-primary transition-colors group"
            >
              <Github className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>@sandaliz</span>
            </a>
            <p className="text-xs text-base-content/40">
              GitHub
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="divider my-4"></div>

        {/* Bottom: Credit */}
        <div className="text-center text-xs text-base-content/50">
          <p>Built with React • Express • MongoDB • Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
