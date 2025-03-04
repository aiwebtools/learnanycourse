
import React from 'react';
import { cn } from '@/lib/utils';
import AnimatedSection from './AnimatedSection';
import GlassMorphism from './ui/GlassMorphism';

interface StepProps {
  number: number;
  title: string;
  description: string;
  delay?: number;
}

const Step: React.FC<StepProps> = ({
  number,
  title,
  description,
  delay = 0
}) => {
  return (
    <AnimatedSection animation="fade-in-right" delay={delay} className="relative">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white text-xl font-semibold z-10">
          {number}
        </div>
        
        <div className="pt-1.5">
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </div>
      
      {number < 5 && <div className="absolute left-6 top-12 w-0.5 h-16 bg-gradient-to-b from-primary to-primary/10 ml-0"></div>}
    </AnimatedSection>
  );
};

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden bg-gray-800">
      <div className="absolute inset-0 bg-hero-pattern opacity-5"></div>
      
      <div className="section-container relative z-10">
        <AnimatedSection animation="fade-in" className="mb-16">
          <div className="max-w-4xl mx-auto">
            <div className="bg-yellow-100/20 border border-yellow-300/30 rounded-lg p-5 backdrop-blur-sm">
              <h3 className="text-lg font-semibold mb-2 text-yellow-300">Learn Any Course, Anywhere</h3>
              <p className="text-white/90">
                Learn Any Course GPT provides comprehensive step-by-step instruction for any course you want to master. With personalized lessons, curated YouTube resources, and visual aids, you'll progress from beginner to expert at your own pace.
              </p>
            </div>
          </div>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <AnimatedSection className="mb-8">
              <span className="chip mb-3">How It Works</span>
              <h2 className="heading text-3xl md:text-4xl mb-4 text-white">Your Self-Paced Course Learning Journey Begins...</h2>
              <p className="subheading text-gray-200">Learn Any Course GPT provides a personalized learning experience, guiding you from outline planning to detailed instructions with curated YouTube videos and visual resources.</p>
            </AnimatedSection>
            
            <div className="space-y-12 mt-10">
              <Step number={1} title="Choose Any Course" description="Simply tell the AI what course you want to learn, from history to mathematics, literature to science." delay={0.1} />
              
              <Step number={2} title="Get a Comprehensive Outline" description="Receive a detailed learning path with clear modules and lessons to guide your journey through the course." delay={0.2} />
              
              <Step number={3} title="Learn Step-by-Step" description="Each lesson includes detailed explanations, practical examples, and actionable instructions tailored to your level." delay={0.3} />
              
              <Step number={4} title="Watch Curated Videos" description="Enhance your learning with relevant YouTube videos specifically selected for each course segment." delay={0.4} />
              
              <Step number={5} title="Progress At Your Own Pace" description="Move through each lesson sequentially, asking questions and getting personalized guidance along the way." delay={0.5} />
            </div>
          </div>
          
          <AnimatedSection animation="fade-in-left" delay={0.3} className="relative">
            <GlassMorphism className="p-4 md:p-6 overflow-hidden">
              <div className="rounded-xl overflow-hidden bg-white border border-border">
                <div className="p-4 border-b border-border bg-gray-100">
                  <div className="flex space-x-2 mb-3">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">World History: From Ancient Civilizations to Modern Era</h3>
                </div>
                
                <div className="p-5 space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-primary mb-2">COURSE OUTLINE</h4>
                    <div className="pl-4 border-l-2 border-primary/30 space-y-3">
                      <div>
                        <h5 className="font-medium text-gray-900">Module 1: Ancient Civilizations</h5>
                        <p className="text-sm text-gray-700">Mesopotamia, Egypt, Greece, Rome, and early Asian civilizations</p>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-900">Module 2: Medieval Period</h5>
                        <p className="text-sm text-gray-700">European feudalism, Islamic Golden Age, Byzantine Empire</p>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-900">Module 3: Renaissance and Enlightenment</h5>
                        <p className="text-sm text-gray-700">Cultural rebirth, scientific revolution, political philosophy</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <h4 className="text-sm font-semibold text-primary mb-2">CURRENT LESSON</h4>
                    <div className="bg-secondary/50 rounded-lg p-4">
                      <h5 className="font-medium mb-1 text-gray-900">1.2: The Rise of Ancient Egypt</h5>
                      <p className="text-sm text-gray-700 mb-3">
                        In this lesson, we'll explore how the Nile River shaped Egyptian civilization, the unification of Upper and Lower Egypt, and the establishment of the pharaonic system.
                      </p>
                      <div className="flex justify-end">
                        <span className="chip bg-green-100 text-green-800">In Progress</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-secondary/30 p-4 flex justify-between items-center border-t border-border">
                  <button className="text-sm text-gray-700 hover:text-gray-900 transition-colors">
                    Previous Lesson
                  </button>
                  <button className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors" onClick={() => window.open('https://chatgpt.com/g/g-6730d59e8e648190be4221e319aad5cd-learn-any-course-gpt', '_blank')}>
                    Access Learn Any Course GPT
                  </button>
                </div>
              </div>
            </GlassMorphism>
            
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary/10 rounded-full filter blur-xl"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/5 rounded-full filter blur-xl"></div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
