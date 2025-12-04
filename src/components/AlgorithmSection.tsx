import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';
import { Clock, History, Lightbulb, Code2, BarChart3, Cpu, BookOpen } from 'lucide-react';

interface SectionProps {
  id: string;
  title: string;
  gradient: 'primary' | 'accent';
  children: ReactNode;
}

export function AlgorithmSection({ id, title, gradient, children }: SectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id={id} className="py-20 md:py-32 relative" ref={ref}>
      {/* Background decoration */}
      <div className={`absolute inset-0 opacity-30 pointer-events-none ${
        gradient === 'primary' 
          ? 'bg-gradient-radial from-primary/10 via-transparent to-transparent' 
          : 'bg-gradient-radial from-accent/10 via-transparent to-transparent'
      }`} />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className={`section-title ${gradient === 'primary' ? 'gradient-text' : 'gradient-text-accent'}`}>
            {title}
          </h2>
        </motion.div>
        
        {children}
      </div>
    </section>
  );
}

interface CardProps {
  icon: ReactNode;
  title: string;
  children: ReactNode;
  delay?: number;
}

export function InfoCard({ icon, title, children, delay = 0 }: CardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="algorithm-card"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
          {icon}
        </div>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <div className="text-muted-foreground leading-relaxed">
        {children}
      </div>
    </motion.div>
  );
}

interface TimelineItemProps {
  year: string;
  title: string;
  description: string;
  index: number;
}

export function TimelineItem({ year, title, description, index }: TimelineItemProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative pl-14 pb-8 last:pb-0"
    >
      {/* Timeline line */}
      <div className="timeline-line" />
      
      {/* Year indicator */}
      <div className="step-indicator absolute left-0 top-0">
        <span className="text-xs">{year.slice(-2)}</span>
      </div>
      
      <div className="glass-card p-4">
        <div className="text-primary font-mono text-sm mb-1">{year}</div>
        <h4 className="font-semibold mb-2">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </motion.div>
  );
}

interface StepProps {
  number: number;
  title: string;
  description: string;
}

export function AlgorithmStep({ number, title, description }: StepProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: number * 0.1 }}
      className="flex gap-4 items-start"
    >
      <div className="step-indicator flex-shrink-0">
        {number}
      </div>
      <div>
        <h4 className="font-semibold mb-1">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </motion.div>
  );
}

export const SectionIcons = {
  History,
  Clock,
  Lightbulb,
  Code2,
  BarChart3,
  Cpu,
  BookOpen,
};
