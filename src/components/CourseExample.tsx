
import React from 'react';
import { Button } from '@/components/ui/button';
import AnimatedSection from './AnimatedSection';
import GlassMorphism from './ui/GlassMorphism';
import { ArrowRight } from 'lucide-react';

const CourseExample: React.FC = () => {
  return <section id="example" className="py-16 sm:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent"></div>
      <div className="section-container relative z-10 px-4 sm:px-6">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <a href="https://chatgpt.com/g/g-6730d59e8e648190be4221e319aad5cd-learn-any-course-gpt" className="inline-block">
            
          </a>
          <h2 className="heading text-2xl sm:text-3xl md:text-4xl mb-6">Master Any Course with AI-Guided Learning</h2>
          <p className="subheading max-w-2xl mx-auto text-sm sm:text-base">Learn Any Course GPT takes you from beginner to expert with personalized instruction, curated YouTube videos, and visual learning aids. No matter what course you want to learn, your AI teacher is ready to guide you through every lesson and module.</p>
        </AnimatedSection>
        
        <AnimatedSection>
          <div className="max-w-4xl mx-auto">
            <GlassMorphism variant="dark" intensity="high" className="p-5 sm:p-8 text-center text-white">
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white">Ready to master a new course?</h3>
              <p className="mb-5 sm:mb-6 text-gray-300 text-sm sm:text-base">Our AI teacher is available 24/7 to guide you through any complete course curriculum.</p>
              <Button size="lg" className="rounded-full px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base font-semibold bg-primary text-white hover:bg-primary/90 w-full sm:w-auto" asChild>
                <a href="https://chatgpt.com/g/g-6730d59e8e648190be4221e319aad5cd-learn-any-course-gpt" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                  Start Learning Now <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </a>
              </Button>
            </GlassMorphism>
          </div>
        </AnimatedSection>
      </div>
    </section>;
};

export default CourseExample;
