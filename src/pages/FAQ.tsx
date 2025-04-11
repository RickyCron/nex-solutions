import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { getWebsiteInfoBySection } from '../lib/api';
import { Database } from '../lib/database.types';

type WebsiteInfo = Database['public']['Tables']['website_info']['Row'];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [faqs, setFaqs] = useState<WebsiteInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      const data = await getWebsiteInfoBySection('faq');
      setFaqs(data);
      setLoading(false);
    };

    fetchContent();
  }, []);

  if (loading) return null;

  return (
    <div className="min-h-screen flex items-center justify-center py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-light mb-6">
            How It Works, Why It Works, and What's Next
          </h1>
          <p className="text-xl text-light/80 max-w-2xl mx-auto">
            Everything you need to know about our AI solutions
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="mb-4"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left"
              >
                <div className={`p-6 bg-primary/50 backdrop-blur-lg rounded-2xl border transition-all duration-300 ${
                  openIndex === index 
                    ? 'border-accent' 
                    : 'border-accent/10 hover:border-accent/30'
                }`}>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-light">{faq.title}</h3>
                    {openIndex === index ? (
                      <ChevronUp className="w-5 h-5 text-accent" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-accent" />
                    )}
                  </div>
                  
                  {/* Answer */}
                  <motion.div
                    initial={false}
                    animate={{ height: openIndex === index ? 'auto' : 0, opacity: openIndex === index ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="mt-4 text-light/80 leading-relaxed">
                      {faq.content}
                    </p>
                  </motion.div>
                </div>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}