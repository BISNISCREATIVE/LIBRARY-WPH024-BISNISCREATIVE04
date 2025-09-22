import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/app/hooks';
import heroIllustration from '@/assets/hero-illustration.png';

export const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAppSelector(state => state.auth);

  return (
    <section className="relative bg-gradient-hero rounded-2xl mx-4 mt-6 mb-8 overflow-hidden shadow-hero">
      {/* Background Illustration */}
      <div className="absolute inset-0">
        <img
          src={heroIllustration}
          alt="Children reading books illustration"
          className="w-full h-full object-cover opacity-90"
        />
      </div>
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent" />
      
      {/* Content */}
      <div className="relative z-10 px-6 py-12 md:py-16 lg:py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Welcome to
            <br />
            <span className="text-white">Booky</span>
          </h1>
          
          {isAuthenticated && user && (
            <p className="text-lg md:text-xl text-white/90 mb-6">
              Hello, {user.name}! Ready for your next reading adventure?
            </p>
          )}
          
          <p className="text-base md:text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Discover inspiring stories & timeless knowledge. Ready to borrow anytime. 
            Explore online or visit our nearest library branch.
          </p>
          
          {!isAuthenticated && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                onClick={() => navigate('/register')}
                className="bg-white/20 text-white border-white/20 hover:bg-white/30 backdrop-blur-sm"
              >
                Get Started
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('/books')}
                className="bg-transparent text-white border-white/40 hover:bg-white/10 backdrop-blur-sm"
              >
                Browse Books
              </Button>
            </div>
          )}
          
          {isAuthenticated && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                onClick={() => navigate('/books')}
                className="bg-white/20 text-white border-white/20 hover:bg-white/30 backdrop-blur-sm"
              >
                Browse Books
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('/my-loans')}
                className="bg-transparent text-white border-white/40 hover:bg-white/10 backdrop-blur-sm"
              >
                My Loans
              </Button>
            </div>
          )}
        </div>
      </div>
      
      {/* Carousel Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        <div className="w-2 h-2 bg-white rounded-full opacity-100"></div>
        <div className="w-2 h-2 bg-white/50 rounded-full"></div>
        <div className="w-2 h-2 bg-white/50 rounded-full"></div>
      </div>
    </section>
  );
};