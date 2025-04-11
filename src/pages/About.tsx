import { motion } from 'framer-motion';
import { Target, Rocket, TrendingUp, Brain, Users, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getWebsiteInfoBySection } from '../lib/api';
import { Database } from '../lib/database.types';

type WebsiteInfo = Database['public']['Tables']['website_info']['Row'];

const values = [
  { icon: <Brain className="w-6 h-6" />, text: "Innovation First" },
  { icon: <Users className="w-6 h-6" />, text: "People-Centric" },
  { icon: <Zap className="w-6 h-6" />, text: "Rapid Results" }
];

export default function About() {
  const [content, setContent] = useState<WebsiteInfo[]>([]);
  const [benefits, setBenefits] = useState<WebsiteInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      const [aboutData, benefitsData] = await Promise.all([
        getWebsiteInfoBySection('about'),
        getWebsiteInfoBySection('about_benefits')
      ]);
      setContent(aboutData);
      setBenefits(benefitsData);
      setLoading(false);
    };

    fetchContent();
  }, []);

  if (loading) return null;

  const mainContent = content[0] || {
    title: 'Maximise Efficiency and Impact',
    content: 'Why Partner with Us? The key advantages of adopting AI in your business.',
    metadata: {
      mission: 'We believe AI should empower people, not replace them. Our mission is to create smarter businesses that put people first whist still increasing productivity and time.',
      vision: 'A future where businesses grow effortlessly, people work smarter, and technology bridges gaps—not creates them.'
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-24"
        >
          <motion.div 
            className="flex items-center justify-center gap-4 mb-6"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full"
              >
                <span className="text-accent">{value.icon}</span>
                <span className="text-light text-sm font-medium">{value.text}</span>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.h1 
            className="text-6xl md:text-7xl font-bold text-light mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.8,
              delay: 0.3,
              ease: [0.25, 0.1, 0.25, 1]
            }}
          >
            {mainContent.title}
          </motion.h1>
          
          <motion.p 
            className="text-xl text-light/80 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.6,
              delay: 0.5
            }}
          >
            {mainContent.content}
          </motion.p>
        </motion.div>

        {/* Mission & Vision with Gradient Cards */}
        <div className="grid md:grid-cols-2 gap-12 mb-24 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.8,
              delay: 0.2,
              ease: [0.25, 0.1, 0.25, 1]
            }}
            className="relative group"
          >
            {/* Gradient Background */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-accent/20 via-primary/40 to-secondary/20 rounded-3xl"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            />
            
            <div className="relative bg-primary/40 backdrop-blur-sm p-12 rounded-3xl border border-accent/10 hover:border-accent/30 transition-all">
              <div className="absolute top-0 left-0 w-24 h-24 bg-accent/10 rounded-tl-3xl rounded-br-3xl" />
              <motion.h2 
                className="text-2xl font-bold text-accent mb-6 relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Our Mission
              </motion.h2>
              <motion.p 
                className="text-4xl font-bold text-light leading-tight group-hover:text-secondary transition-colors relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                "{mainContent.metadata.mission}"
              </motion.p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.8,
              delay: 0.4,
              ease: [0.25, 0.1, 0.25, 1]
            }}
            className="relative group"
          >
            {/* Gradient Background */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-bl from-secondary/20 via-primary/40 to-accent/20 rounded-3xl"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            />
            
            <div className="relative bg-primary/40 backdrop-blur-sm p-12 rounded-3xl border border-accent/10 hover:border-accent/30 transition-all">
              <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/10 rounded-tr-3xl rounded-bl-3xl" />
              <motion.h2 
                className="text-2xl font-bold text-accent mb-6 relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                Our Vision
              </motion.h2>
              <motion.p 
                className="text-4xl font-bold text-light leading-tight group-hover:text-secondary transition-colors relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                "{mainContent.metadata.vision}"
              </motion.p>
            </div>
          </motion.div>
        </div>

        {/* Benefits Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6,
                delay: 0.2 + index * 0.2,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              {/* Hover Gradient */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-b from-accent/5 to-secondary/5 rounded-2xl"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.2 }}
              />
              
              <div className="relative bg-primary/40 backdrop-blur-sm p-8 rounded-2xl border border-accent/10 hover:border-accent/30 transition-all">
                <motion.div 
                  className="p-4 bg-accent/10 rounded-lg w-fit mb-6 text-accent"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    type: "spring",
                    stiffness: 200,
                    delay: 0.4 + index * 0.2
                  }}
                  whileHover={{ rotate: 360 }}
                >
                  {benefit.metadata.icon === 'TrendingUp' && <TrendingUp className="w-8 h-8" />}
                  {benefit.metadata.icon === 'Target' && <Target className="w-8 h-8" />}
                  {benefit.metadata.icon === 'Rocket' && <Rocket className="w-8 h-8" />}
                </motion.div>

                <motion.h3 
                  className="text-2xl font-bold text-light mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.2 }}
                >
                  {benefit.title}
                </motion.h3>
                <motion.p 
                  className="text-light/80"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.2 }}
                >
                  {benefit.content}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}