import { motion } from 'framer-motion';
import { useState } from 'react';
import { ArrowRight, Check, Brain, Rocket, Bot, Sparkles, ArrowUpRight, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const services = [
  {
    title: "AI Process Automation",
    description: "Streamline and scale your business operations effortlessly.",
    icon: <Brain className="w-8 h-8" />,
    features: [
      "Workflow Design & Implementation",
      "API Integration",
      "Data Management & Analytics",
      "Reporting & Notifications"
    ],
    technologies: ["Make.com", "Zapier", "Airtable", "Google Sheets"],
    id: "process-automation",
    businessBenefits: [
      "Reduce operational costs by up to 40%",
      "Minimize human error in critical processes",
      "Free up staff time for higher-value activities",
      "Scale operations without proportional staff increases",
      "Gain real-time insights into business performance",
      "Improve customer satisfaction through faster service",
      "Enhance compliance with automated documentation",
      "Increase operational agility and responsiveness"
    ]
  },
  {
    title: "AI Chatbots & WhatsApp Assistant",
    description: "Engage customers and automate communication with AI-driven solutions.",
    icon: <Bot className="w-8 h-8" />,
    features: [
      "AI Agents",
      "Multi-Channel Deployment",
      "24/7 Support",
      "Custom Responses"
    ],
    technologies: ["ChatGPT", "Voiceflow", "WhatsApp", "Telegram"],
    id: "chatbots",
    businessBenefits: [
      "Provide instant 24/7 customer support",
      "Reduce support costs by up to 30%",
      "Handle multiple conversations simultaneously",
      "Qualify leads and capture customer information",
      "Seamlessly transfer to human agents when needed",
      "Collect valuable customer feedback automatically",
      "Increase conversion rates with proactive engagement",
      "Maintain consistent brand voice across all interactions"
    ]
  },
  {
    title: "AI Strategy & Training",
    description: "Empower your team with AI knowledge and implementation.",
    icon: <Sparkles className="w-8 h-8" />,
    features: [
      "Custom Training",
      "Strategy Planning",
      "Implementation",
      "Support"
    ],
    technologies: ["OpenAI", "Google AI", "Microsoft Azure", "Anthropic"],
    id: "strategy",
    businessBenefits: [
      "Develop a clear AI implementation roadmap",
      "Build internal AI capabilities and expertise",
      "Ensure ethical and responsible AI use",
      "Maximize ROI on AI investments",
      "Stay ahead of industry trends and innovations",
      "Create competitive advantage through AI adoption",
      "Reduce resistance to change with proper training",
      "Align AI initiatives with business objectives"
    ]
  },
  {
    title: "AI Content & Digital Growth",
    description: "Supercharge your content and digital presence with AI.",
    icon: <Rocket className="w-8 h-8" />,
    features: [
      "Content Creation",
      "Social Media",
      "SEO Optimization",
      "Analytics"
    ],
    technologies: ["ChatGPT", "Midjourney", "Google Analytics", "SEMrush"],
    id: "content",
    businessBenefits: [
      "Create high-quality content at scale",
      "Optimize content for search engines and target audiences",
      "Personalize marketing messages for different segments",
      "Analyze performance data to refine strategies",
      "Stay consistent across multiple channels and platforms",
      "Reduce time-to-market for marketing campaigns",
      "Generate more qualified leads through targeted content",
      "Improve brand visibility and digital engagement"
    ]
  }
];

export default function ServicesProducts() {
  const navigate = useNavigate();
  const [hoveredService, setHoveredService] = useState(null);

  const handleHelpClick = () => {
    window.scrollTo(0, 0);
    navigate('/how-ai-helps');
  };

  const navigateToService = (serviceId) => {
    window.scrollTo(0, 0);
    navigate(`/service/${serviceId}`);
  };

  return (
    <div className="min-h-screen py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-primary/40 to-secondary/5 pointer-events-none" />
      
      {/* Animated Circuit Lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-accent/20"
            style={{
              top: `${15 + i * 20}%`,
              left: '5%',
              right: '5%',
            }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
              scaleX: [0.9, 1, 0.9],
            }}
            transition={{
              duration: 4,
              delay: i * 0.5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-4 px-4 py-2 bg-accent/10 rounded-full">
            <span className="text-accent font-medium">Our Services</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-bold text-light mb-6">
            Services we provide
          </h1>
          <p className="text-xl text-light/80 max-w-2xl mx-auto">
            Transform your business with AI-powered solutions tailored to your needs
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onMouseEnter={() => setHoveredService(index)}
              onMouseLeave={() => setHoveredService(null)}
              className="group relative overflow-hidden rounded-2xl shadow-xl"
            >
              {/* Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/70 to-primary/90 z-0" />
              
              {/* Content */}
              <div className="relative z-20 p-8 h-full flex flex-col">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-accent/20 backdrop-blur-sm rounded-xl text-accent">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-light">
                    {service.title}
                  </h3>
                </div>
                
                <p className="text-light/80 mb-6">
                  {service.description}
                </p>
                
                <div className="space-y-3 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      <Zap className="w-4 h-4 text-accent" />
                      <span className="text-light/80 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                  {service.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="px-3 py-1 bg-secondary/10 backdrop-blur-sm text-secondary text-xs rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <motion.button 
                    onClick={() => navigateToService(service.id)}
                    className="flex items-center gap-2 text-accent font-medium transition-colors w-fit"
                    whileHover={{ x: 5 }}
                  >
                    How it can help your business <ArrowUpRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
              
              {/* Animated Border */}
              <motion.div 
                className="absolute inset-0 rounded-2xl pointer-events-none"
                animate={{
                  boxShadow: hoveredService === index 
                    ? "0 0 0 2px rgba(204, 74, 74, 0.5)" 
                    : "0 0 0 0px rgba(204, 74, 74, 0)"
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-accent/20 via-secondary/20 to-accent/20 p-px rounded-2xl">
            <div className="bg-primary/80 backdrop-blur-sm rounded-2xl p-10">
              <h2 className="text-3xl font-bold text-light mb-4">
                Discover how AI can transform your specific industry
              </h2>
              <p className="text-xl text-light/80 mb-8 max-w-2xl mx-auto">
                We've tailored our AI solutions to address the unique challenges and opportunities in your industry.
              </p>
              <motion.button 
                onClick={handleHelpClick}
                className="px-8 py-4 bg-accent text-light rounded-full text-lg font-medium hover:bg-accent/90 transition-colors inline-flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                How AI can help your company <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}