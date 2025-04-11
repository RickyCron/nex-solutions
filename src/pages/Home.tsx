import { motion } from 'framer-motion';
import { ArrowRight, Bot, Rocket } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getWebsiteInfoBySection } from '../lib/api';
import { Database } from '../lib/database.types';

type WebsiteInfo = Database['public']['Tables']['website_info']['Row'];

export default function Home() {
  const [content, setContent] = useState<WebsiteInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      const data = await getWebsiteInfoBySection('home');
      setContent(data);
      setLoading(false);
    };

    fetchContent();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) return null;

  const mainContent = content[0] || {
    title: 'AI Solutions That Work as Hard as You Do',
    content: 'From intelligent chatbots to automated workflows, we help businesses run smoother, faster and smarter.',
    metadata: {
      subtitle: 'probably harder',
      cta_text: "Let's Get Automating",
      cta_link: '#consultation'
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-8">
            <Bot className="w-12 h-12 text-accent" />
            <span className="text-3xl font-bold text-light">Nex Solutions</span>
          </div>

          <div className="relative mb-4">
            <h1 className="text-5xl md:text-7xl font-bold text-light leading-tight mb-1">
              {mainContent.title}
            </h1>
            <div className="flex items-center justify-center gap-2">
              <span className="text-lg text-accent/80 font-mono">(</span>
              <span className="text-lg text-accent/80 font-mono">
                {mainContent.metadata.subtitle}
              </span>
              <span className="text-lg text-accent/80 font-mono">)</span>
            </div>
          </div>

          <motion.p 
            className="text-xl text-light/80 mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {mainContent.content}
          </motion.p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('consultation')}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-light rounded-full text-lg font-medium hover:bg-accent/90 transition-colors"
            >
              {mainContent.metadata.cta_text} <Rocket className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('services')}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary rounded-full text-lg font-medium hover:bg-white/90 transition-colors"
            >
              Explore Services <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}