import React from 'react';
import { Button } from '@/components/ui/button';
import { BookOpen, Facebook, Instagram, Linkedin } from 'lucide-react';

// TikTok icon component
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-.88-.05A6.33 6.33 0 0 0 5.16 20.5a6.34 6.34 0 0 0 10.86-4.43V7.83a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.26z"/>
  </svg>
);

export const Footer: React.FC = () => {
  return (
    <footer className="bg-background border-t border-border px-4 py-8 md:py-12 mt-16">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        {/* Logo */}
        <div className="flex items-center justify-center space-x-2 mb-6">
          <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-primary">Booky</span>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
            Discover inspiring stories & timeless knowledge, ready to borrow anytime. 
            Explore online or visit our nearest library branch.
          </p>
        </div>

        {/* Social Media */}
        <div className="space-y-4">
          <p className="text-sm font-medium text-foreground">Follow on Social Media</p>
          <div className="flex justify-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-10 h-10 p-0 hover:bg-primary/10 hover:text-primary transition-colors"
              aria-label="Facebook"
              onClick={() => window.open('https://facebook.com/booky', '_blank')}
            >
              <Facebook className="w-5 h-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-10 h-10 p-0 hover:bg-primary/10 hover:text-primary transition-colors"
              aria-label="Instagram"
              onClick={() => window.open('https://instagram.com/booky', '_blank')}
            >
              <Instagram className="w-5 h-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-10 h-10 p-0 hover:bg-primary/10 hover:text-primary transition-colors"
              aria-label="LinkedIn"
              onClick={() => window.open('https://linkedin.com/company/booky', '_blank')}
            >
              <Linkedin className="w-5 h-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-10 h-10 p-0 hover:bg-primary/10 hover:text-primary transition-colors"
              aria-label="TikTok"
              onClick={() => window.open('https://tiktok.com/@booky', '_blank')}
            >
              <TikTokIcon className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};