import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Brain, Bot, Sparkles } from 'lucide-react';
import { getWebsiteInfoBySection } from '../lib/api';
import { Database } from '../lib/database.types';

type WebsiteInfo = Database['public']['Tables']['website_info']['Row'];

function Counter({ from = 0, to, duration = 4, delay = 0, suffix = '', prefix = '', isTrillions = false }) {
  const count = useMotionValue(from);
  const rounded = useTransform(count, value => {
    if (isTrillions) {
      return Number((value).toFixed(1));
    }
    return Math.round(value);
  });
  const [displayValue, setDisplayValue] = useState(from);

  useEffect(() => {
    const controls = animate(count, to, {
      duration,
      delay,
      ease: [0.43, 0.13, 0.23, 0.96],
    });

    const unsubscribe = rounded.on('change', value => {
      setDisplayValue(value);
    });

    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [count, to, duration, delay, rounded]);

  return (
    <span className="mx-1">
      {prefix}{displayValue}{suffix}
    </span>
  );
}

function FloatingIcon({ icon: Icon, delay = 0, x = 0, y = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.34, 1.56, 0.64, 1],
      }}
      className="absolute"
      style={{ x, y }}
    >
      <motion.div
        animate={{
          y: [0, -15, 0],
          rotate: [-5, 5, -5],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.5, 1],
        }}
        className="text-accent/30"
      >
        <Icon size={24} />
      </motion.div>
    </motion.div>
  );
}

export default function AIFacts() {
  const [content, setContent] = useState<WebsiteInfo[]>([]);
  const [stats, setStats] = useState<WebsiteInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      const [mainData, statsData] = await Promise.all([
        getWebsiteInfoBySection('ai_facts'),
        getWebsiteInfoBySection('ai_facts_stats')
      ]);
      setContent(mainData);
      setStats(statsData);
      setLoading(false);
    };

    fetchContent();
  }, []);

  if (loading) return null;

  const mainContent = content[0] || {
    title: 'AI IS CHANGING THE GAME. ARE YOU READY?',
    content: ''
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-20 overflow-hidden">
      <div className="container mx-auto px-4 relative">
        <FloatingIcon icon={Brain} delay={0.2} x={-150} y={-200} />
        <FloatingIcon icon={Bot} delay={0.4} x={150} y={-150} />
        <FloatingIcon icon={Sparkles} delay={0.6} x={-200} y={100} />
        <FloatingIcon icon={Brain} delay={0.8} x={200} y={150} />
        <FloatingIcon icon={Sparkles} delay={1.0} x={0} y={-100} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.34, 1.56, 0.64, 1],
          }}
          className="text-center max-w-5xl mx-auto relative"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="absolute inset-0 bg-gradient-to-r from-accent/5 via-secondary/5 to-accent/5 blur-3xl -z-10"
          />
          
          <h1 className="text-[4rem] md:text-[5rem] font-bold mb-4 relative">
            {mainContent.title.split('.').map((part, index) => (
              <span key={index} className={`text-accent inline-block ${index === 2 ? 'text-light' : ''}`}>
                {part}{index < 2 ? '.' : ''}
                <br />
              </span>
            ))}
          </h1>

          <div className="grid md:grid-cols-3 gap-12 mt-24">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.8,
                  delay: index * 0.2,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
                className="relative group"
              >
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                  className="absolute inset-0 bg-gradient-to-b from-accent/5 to-secondary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                
                <div className="relative bg-primary/40 backdrop-blur-sm p-8 rounded-2xl border border-accent/10 hover:border-accent/30 transition-all duration-300 transform hover:-translate-y-1">
                  <h2 className="text-5xl font-bold text-light mb-6 flex items-center justify-center">
                    {stat.metadata.isTrillions ? (
                      <div className="flex items-baseline">
                        <span className="text-accent">$</span>
                        <Counter 
                          from={stat.metadata.from} 
                          to={stat.metadata.to} 
                          duration={3} 
                          delay={index * 0.5} 
                          suffix="T"
                          isTrillions={true}
                        />
                      </div>
                    ) : (
                      <Counter 
                        from={0} 
                        to={parseInt(stat.title)} 
                        duration={3} 
                        delay={index * 0.5} 
                        suffix="%"
                      />
                    )}
                  </h2>
                  <motion.h3 
                    className="text-2xl font-bold text-light mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 + 0.3 }}
                  >
                    {stat.content}
                  </motion.h3>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 + 0.5 }}
                    className="relative"
                  >
                    <motion.div 
                      className="absolute -left-2 -right-2 top-0 bottom-0 bg-accent/5 rounded-lg transform -skew-x-6"
                      animate={{
                        skewX: [-6, -4, -6],
                        opacity: [0.5, 0.7, 0.5],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    <p className="text-sm text-accent relative italic">
                      "{stat.metadata.quote}"
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}