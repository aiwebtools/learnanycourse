
import React from 'react';
import { Button } from '@/components/ui/button';
import AnimatedSection from './AnimatedSection';
import GlassMorphism from './ui/GlassMorphism';
import { Play } from 'lucide-react';

const CourseExample: React.FC = () => {
  const [showVideo, setShowVideo] = React.useState(false);

  // Fixed PlayButton component that returns JSX
  const PlayButton = () => {
    return <Button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full w-16 h-16 flex items-center justify-center bg-primary/90 hover:bg-primary transition-all shadow-xl" onClick={() => setShowVideo(true)}>
        <Play className="text-white ml-1" />
      </Button>;
  };

  return <section id="example" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent"></div>
      <div className="section-container relative z-10">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <a href="https://chatgpt.com/g/g-677690e9535c81919b3acbd5ec088644-learn-any-skill-gpt" className="inline-block">
            <span className="chip mb-6 cursor-pointer hover:bg-primary/90 transition-colors">See It In Action</span>
          </a>
          <h2 className="heading mb-6">Master Any Skill with AI-Guided Learning</h2>
          <p className="subheading max-w-2xl mx-auto">Learn Any Skill GPT takes you from beginner to expert with personalized instruction, curated YouTube videos, and visual learning aids. No matter what you want to learn, your AI teacher is ready to guide you every step of the way.</p>
        </AnimatedSection>
        
        <AnimatedSection>
          <div className="max-w-4xl mx-auto relative rounded-2xl overflow-hidden shadow-2xl">
            {showVideo ? <div className="aspect-video w-full">
                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/WS5N1daL9_o?autoplay=1" title="Learn Any Skill GPT Demo" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="aspect-video"></iframe>
              </div> : <div className="relative">
                <img alt="Course example thumbnail" className="w-full aspect-video object-cover" src="/lovable-uploads/f53ee8e3-2c2a-41e6-975c-30bd30bc7322.png" />
                <PlayButton />
              </div>}
          </div>
        </AnimatedSection>
      </div>
    </section>;
};

export default CourseExample;
