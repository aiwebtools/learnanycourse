
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import GlassMorphism from './ui/GlassMorphism';
import AnimatedSection from './AnimatedSection';

const Hero: React.FC = () => {
  // Start with video automatically playing
  const [videoPlaying, setVideoPlaying] = useState(true);
  
  // Auto-play video when component mounts
  useEffect(() => {
    setVideoPlaying(true);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-starry-night py-20 md:py-32">
      <div className="absolute inset-0 bg-hero-pattern opacity-5"></div>
      <div className="starry-background absolute inset-0"></div>
      
      {/* Enhanced floating orbs with more divine effects */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-full filter blur-3xl opacity-40 animate-float"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-purple-500/25 to-pink-500/25 rounded-full filter blur-3xl opacity-40 animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-r from-cyan-400/15 to-blue-500/15 rounded-full filter blur-2xl opacity-30 animate-float" style={{ animationDelay: '4s' }}></div>
      <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-gradient-to-r from-indigo-400/20 to-purple-600/20 rounded-full filter blur-3xl opacity-35 animate-float" style={{ animationDelay: '1s' }}></div>
      
      <div className="section-container relative z-10 flex flex-col items-center justify-center">
        <AnimatedSection animation="fade-in-down" className="mb-8">
          <span className="chip bg-gradient-to-r from-blue-500/30 to-purple-600/30 text-white font-bold backdrop-blur-xl border border-white/20">Your Personal Course Educator</span>
        </AnimatedSection>
        
        <AnimatedSection animation="fade-in" className="text-center mb-8">
          <h1 className="heading text-5xl md:text-7xl lg:text-8xl mb-8 max-w-5xl font-bold text-white">
            Master Any Course from Beginner to Expert
          </h1>
          <p className="subheading text-xl md:text-2xl max-w-3xl mx-auto text-white">
            Learn any course step-by-step with personalized instruction, detailed explanations, and curated YouTube videos - all in one place.
          </p>
        </AnimatedSection>
        
        <AnimatedSection animation="fade-in-up" delay={0.2} className="mt-12 space-x-6">
          <Button 
            size="lg" 
            className="divine-button rounded-full px-12 py-8 text-lg font-bold text-white hover:text-white transition-all duration-300"
            asChild
          >
            <a href="https://chatgpt.com/g/g-6730d59e8e648190be4221e319aad5cd-learn-any-course-gpt" target="_blank" rel="noopener noreferrer">
              Start Learning Now
            </a>
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="rounded-full px-12 py-8 text-lg border-2 border-white/30 text-white hover:bg-white/20 font-bold backdrop-blur-xl transition-all duration-300 hover:scale-105"
            onClick={() => window.open('https://www.aiwebtools.ai', '_blank')}
          >
            Explore AiWebTools.Ai
          </Button>
        </AnimatedSection>
        
        <AnimatedSection animation="fade-in-up" delay={0.4} className="mt-20 w-full max-w-6xl">
          <GlassMorphism className="p-4 md:p-6 overflow-hidden rounded-3xl bg-black/50 border-white/20 shadow-2xl">
            <div className="relative rounded-2xl overflow-hidden bg-slate-900 aspect-video w-full shadow-2xl">
              {/* Embed YouTube with autoplay, unmuted, 1080p quality, and preload for faster loading */}
              <iframe 
                src="https://www.youtube.com/embed/98fLvWZy9wI?autoplay=1&mute=0&vq=hd1080&rel=0&modestbranding=1" 
                className="w-full h-full aspect-video"
                title="Learn Any Course GPT Tutorial"
                frameBorder="0"
                loading="eager"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
          </GlassMorphism>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Hero;
