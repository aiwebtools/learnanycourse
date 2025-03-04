
import React from 'react';
import { Button } from '@/components/ui/button';
import AnimatedSection from './AnimatedSection';
import GlassMorphism from './ui/GlassMorphism';
import { ArrowRight } from 'lucide-react';

const CourseExample: React.FC = () => {
  return <section id="example" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent"></div>
      <div className="section-container relative z-10">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <a href="https://chatgpt.com/g/g-6730d59e8e648190be4221e319aad5cd-learn-any-course-gpt" className="inline-block">
            <span className="chip mb-6 cursor-pointer hover:bg-primary/90 transition-colors">See It In Action</span>
          </a>
          <h2 className="heading mb-6">Master Any Course with AI-Guided Learning</h2>
          <p className="subheading max-w-2xl mx-auto">Learn Any Course GPT takes you from beginner to expert with personalized instruction, curated YouTube videos, and visual learning aids. No matter what course you want to learn, your AI teacher is ready to guide you through every lesson and module.</p>
        </AnimatedSection>
        
        <AnimatedSection>
          <div className="max-w-4xl mx-auto">
            <GlassMorphism 
              variant="dark" 
              intensity="high" 
              className="p-8 text-center text-white"
            >
              <h3 className="text-2xl font-bold mb-4 text-white">Ready to master a new course?</h3>
              <p className="mb-6 text-gray-300">Our AI teacher is available 24/7 to guide you through any complete course curriculum.</p>
              <Button 
                size="lg" 
                className="rounded-full px-8 py-6 text-base font-semibold bg-primary text-white hover:bg-primary/90"
                asChild
              >
                <a href="https://chatgpt.com/g/g-6730d59e8e648190be4221e319aad5cd-learn-any-course-gpt" target="_blank" rel="noopener noreferrer">
                  Start Learning Now <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </GlassMorphism>
          </div>
        </AnimatedSection>
      </div>
    </section>;
};

export default CourseExample;
