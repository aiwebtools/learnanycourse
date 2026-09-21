
import React from 'react';
import AnimatedSection from './AnimatedSection';
import CourseTutorChat from './CourseTutorChat';

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
            <CourseTutorChat />
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
