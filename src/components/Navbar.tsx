
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import GlassMorphism from './ui/GlassMorphism';
import { Button } from '@/components/ui/button';
import { ExternalLink, Menu, X } from 'lucide-react';

const CHATGPT_VERSION_URL = 'https://chatgpt.com/g/g-6730d59e8e648190be4221e319aad5cd-learn-any-course-gpt';
const SKILL_INSITE_URL = 'https://learnanyskillgpt.lovable.app/';
const COLLEGE_INSITE_URL = 'https://college-degree-gpt.lovable.app/';
const HISTORY_INSITE_URL = 'https://talk-to-history-gpt.lovable.app/';
const AIWEBTOOLS_URL = 'https://aiwebtools.lovable.app/?via=aiwebtools';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((open) => !open);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (mobileMenuOpen && !target.closest('.mobile-menu-container') && !target.closest('.mobile-menu-button')) {
        closeMobileMenu();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      // Reset overflow when component unmounts
      document.body.style.overflow = 'auto';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : 'auto';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [mobileMenuOpen]);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileMenuOpen) {
        closeMobileMenu();
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen]);

  return (
    <div className={cn('fixed top-0 left-0 right-0 z-50 transition-all duration-200', isScrolled ? 'py-1' : 'py-2')}>
      <GlassMorphism intensity={isScrolled ? 'high' : 'low'} className={cn('mx-2 sm:mx-4 lg:mx-6 transition-all duration-200', isScrolled && 'shadow-lg')}>
        <div className="flex items-center justify-between px-3 sm:px-4 py-2">
          <div className="flex items-center gap-2 sm:gap-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="flex flex-col">
              <span className="font-bold text-sm sm:text-base md:text-lg tracking-tight text-gray-900 dark:text-white">Learn Any Course GPT</span>
              <a href={AIWEBTOOLS_URL} target="_blank" rel="noopener noreferrer" className="text-xs text-gray-700 dark:text-gray-300 hover:underline truncate max-w-[150px] sm:max-w-none">Presented by Ai Web Tools LLC</a>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-3 lg:space-x-5 ml-4">
            <a href="#how-it-works" className="link-underline text-xs lg:text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap">Course GPT (INSITE version)</a>
            <a href={CHATGPT_VERSION_URL} target="_blank" rel="noopener noreferrer" className="link-underline text-xs lg:text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap">Course GPT (CHATGPT version)</a>
            <a href={SKILL_INSITE_URL} target="_blank" rel="noopener noreferrer" className="link-underline text-xs lg:text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap">Skill GPT (INSITE version)</a>
            <a href={COLLEGE_INSITE_URL} target="_blank" rel="noopener noreferrer" className="link-underline text-xs lg:text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap">College GPT (INSITE version)</a>
            <a href={HISTORY_INSITE_URL} target="_blank" rel="noopener noreferrer" className="link-underline text-xs lg:text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap">History GPT (INSITE version)</a>
            <a href={AIWEBTOOLS_URL} target="_blank" rel="noopener noreferrer" className="link-underline text-xs lg:text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap">More AI Tools</a>
          </nav>
          
          {/* Mobile menu button */}
          <div className="flex items-center ml-auto md:ml-0">
            <div className="hidden md:block">
              <Button size="sm" className="rounded-full px-5 py-1 h-8" asChild>
                <a href="#how-it-works">
                  Get Started (INSITE version)
                </a>
              </Button>
            </div>
            <button 
              className="md:hidden p-2 rounded-md ml-2 mobile-menu-button"
              onClick={(e) => {
                e.stopPropagation(); // Prevent event bubbling
                toggleMobileMenu();
              }}
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5 text-gray-900 dark:text-white" /> : <Menu className="h-5 w-5 text-gray-900 dark:text-white" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div 
          id="mobile-menu"
          className={cn(
            "md:hidden overflow-hidden transition-all duration-200 ease-out mobile-menu-container",
            mobileMenuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
          )}
          aria-label="Mobile navigation menu"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="px-4 pt-2 pb-4 space-y-1 border-t border-gray-300 dark:border-gray-700 nav-menu-mobile">
            <a href="#how-it-works" onClick={closeMobileMenu}
              className="flex items-center justify-between py-3 text-sm font-medium text-gray-900 dark:text-white mobile-touch-target active:bg-white/10 rounded-lg px-2 transition-colors duration-100">
              Learn Any Course GPT (INSITE version)
            </a>
            <a href={CHATGPT_VERSION_URL} target="_blank" rel="noopener noreferrer" onClick={closeMobileMenu}
              className="flex items-center justify-between py-3 text-sm font-medium text-gray-900 dark:text-white mobile-touch-target active:bg-white/10 rounded-lg px-2 transition-colors duration-100">
              Learn Any Course GPT (CHATGPT version) <ExternalLink className="h-3.5 w-3.5 opacity-50" />
            </a>
            <a href={SKILL_INSITE_URL} target="_blank" rel="noopener noreferrer" onClick={closeMobileMenu}
              className="flex items-center justify-between py-3 text-sm font-medium text-gray-900 dark:text-white mobile-touch-target active:bg-white/10 rounded-lg px-2 transition-colors duration-100">
              Learn Any Skill GPT (INSITE version) <ExternalLink className="h-3.5 w-3.5 opacity-50" />
            </a>
            <a href={COLLEGE_INSITE_URL} target="_blank" rel="noopener noreferrer" onClick={closeMobileMenu}
              className="flex items-center justify-between py-3 text-sm font-medium text-gray-900 dark:text-white mobile-touch-target active:bg-white/10 rounded-lg px-2 transition-colors duration-100">
              College Degree GPT (INSITE version) <ExternalLink className="h-3.5 w-3.5 opacity-50" />
            </a>
            <a href={HISTORY_INSITE_URL} target="_blank" rel="noopener noreferrer" onClick={closeMobileMenu}
              className="flex items-center justify-between py-3 text-sm font-medium text-gray-900 dark:text-white mobile-touch-target active:bg-white/10 rounded-lg px-2 transition-colors duration-100">
              Talk to History GPT (INSITE version) <ExternalLink className="h-3.5 w-3.5 opacity-50" />
            </a>
            <a href={AIWEBTOOLS_URL} target="_blank" rel="noopener noreferrer" onClick={closeMobileMenu}
              className="flex items-center justify-between py-3 text-sm font-medium text-gray-900 dark:text-white mobile-touch-target active:bg-white/10 rounded-lg px-2 transition-colors duration-100">
              More AI Tools <ExternalLink className="h-3.5 w-3.5 opacity-50" />
            </a>
            <Button size="sm" className="w-full rounded-full mt-2 py-1 h-10" asChild>
              <a href="#how-it-works" onClick={closeMobileMenu}>
                Get Started (INSITE version)
              </a>
            </Button>
          </div>
        </div>
      </GlassMorphism>
    </div>
  );
};
export default Navbar;
