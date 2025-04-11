import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Building, Briefcase, Stethoscope, ShoppingBag, Utensils, Bot, Brain, Rocket, Sparkles, ArrowRight } from 'lucide-react';

const industries = [
  {
    name: "Healthcare",
    icon: <Stethoscope className="w-8 h-8" />,
    description: "AI is revolutionizing healthcare by improving diagnostics, streamlining administrative tasks, and enhancing patient care.",
    benefits: [
      "Reduce administrative burden by automating paperwork",
      "Improve patient outcomes with data-driven insights",
      "Enhance patient engagement through personalized communication",
      "Optimize resource allocation and scheduling"
    ],
    solutions: [
      {
        title: "AI Process Automation",
        icon: <Brain className="w-6 h-6" />,
        description: "Streamline patient intake, insurance verification, and billing processes.",
        link: "/service/process-automation"
      },
      {
        title: "AI Chatbots",
        icon: <Bot className="w-6 h-6" />,
        description: "Provide 24/7 patient support, appointment scheduling, and medication reminders.",
        link: "/service/chatbots"
      }
    ]
  },
  {
    name: "Finance",
    icon: <Briefcase className="w-8 h-8" />,
    description: "Financial institutions leverage AI to enhance security, improve customer service, and optimize investment strategies.",
    benefits: [
      "Detect and prevent fraudulent transactions in real-time",
      "Provide personalized financial advice and product recommendations",
      "Automate compliance monitoring and reporting",
      "Optimize investment portfolios with predictive analytics"
    ],
    solutions: [
      {
        title: "AI Strategy & Training",
        icon: <Sparkles className="w-6 h-6" />,
        description: "Develop comprehensive AI implementation roadmaps for financial services.",
        link: "/service/strategy"
      },
      {
        title: "AI Process Automation",
        icon: <Brain className="w-6 h-6" />,
        description: "Automate transaction reconciliation, risk assessment, and regulatory compliance.",
        link: "/service/process-automation"
      }
    ]
  },
  {
    name: "Retail",
    icon: <ShoppingBag className="w-8 h-8" />,
    description: "Retailers use AI to personalize customer experiences, optimize inventory, and streamline operations.",
    benefits: [
      "Increase sales with personalized product recommendations",
      "Reduce costs through inventory optimization",
      "Enhance customer service with AI-powered assistance",
      "Gain insights from customer behavior analysis"
    ],
    solutions: [
      {
        title: "AI Content & Digital Growth",
        icon: <Rocket className="w-6 h-6" />,
        description: "Create compelling product descriptions, email campaigns, and social media content.",
        link: "/service/content"
      },
      {
        title: "AI Chatbots",
        icon: <Bot className="w-6 h-6" />,
        description: "Provide instant customer support, product recommendations, and order tracking.",
        link: "/service/chatbots"
      }
    ]
  },
  {
    name: "Hospitality",
    icon: <Utensils className="w-8 h-8" />,
    description: "The hospitality industry benefits from AI through improved guest experiences, optimized pricing, and efficient operations.",
    benefits: [
      "Enhance guest experiences with personalized service",
      "Optimize pricing and occupancy rates",
      "Streamline booking and check-in processes",
      "Improve staff scheduling and resource allocation"
    ],
    solutions: [
      {
        title: "AI Process Automation",
        icon: <Brain className="w-6 h-6" />,
        description: "Automate reservation management, staff scheduling, and inventory control.",
        link: "/service/process-automation"
      },
      {
        title: "AI Content & Digital Growth",
        icon: <Rocket className="w-6 h-6" />,
        description: "Create engaging destination content and personalized guest communications.",
        link: "/service/content"
      }
    ]
  }
];

export default function HowAIHelps() {
  const navigate = useNavigate();

  const handleBackToServices = () => {
    // Navigate to home page and scroll to services section
    navigate('/', { state: { scrollToSection: 'services' } });
  };

  const handleConsultationClick = () => {
    // Navigate to home page and scroll to consultation section
    navigate('/', { state: { scrollToSection: 'consultation' } });
  };

  return (
    <div className="min-h-screen bg-primary py-20">
      <div className="container mx-auto px-4">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={handleBackToServices}
          className="flex items-center gap-2 text-light mb-8 hover:text-accent transition-colors"
        >
          <ArrowLeft className="w-5 h-5" /> Back to services
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-light mb-6">
            How AI Can Help Your Company
          </h1>
          <p className="text-xl text-light/80 max-w-3xl mx-auto">
            Discover how AI solutions can transform your business operations, enhance customer experiences, and drive growth in your industry.
          </p>
        </motion.div>

        <div className="space-y-16">
          {industries.map((industry, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex flex-col md:flex-row items-start gap-8">
                <div className="md:w-1/3">
                  <div className="bg-primary/40 backdrop-blur-sm p-8 rounded-3xl border border-accent/10 h-full">
                    <div className="p-4 bg-accent/10 rounded-xl text-accent mb-6">
                      {industry.icon}
                    </div>
                    <h2 className="text-3xl font-bold text-light mb-4">
                      {industry.name}
                    </h2>
                    <p className="text-light/80 mb-6">
                      {industry.description}
                    </p>
                    <div className="space-y-3">
                      {industry.benefits.map((benefit, bIndex) => (
                        <div key={bIndex} className="flex items-start gap-2">
                          <div className="text-accent mt-1">•</div>
                          <p className="text-light/80 text-sm">{benefit}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="md:w-2/3">
                  <div className="grid md:grid-cols-2 gap-6">
                    {industry.solutions.map((solution, sIndex) => (
                      <motion.div
                        key={sIndex}
                        whileHover={{ y: -5 }}
                        className="bg-white rounded-xl overflow-hidden shadow-lg"
                      >
                        <div className="p-6">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-accent/10 rounded-lg text-accent">
                              {solution.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-primary">
                              {solution.title}
                            </h3>
                          </div>
                          <p className="text-dark/80 mb-6">
                            {solution.description}
                          </p>
                          <button 
                            onClick={() => navigate(solution.link)}
                            className="flex items-center gap-2 text-accent font-medium transition-colors"
                          >
                            Learn more <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                    
                    <motion.div
                      whileHover={{ y: -5 }}
                      className="bg-gradient-to-br from-accent/10 to-secondary/10 rounded-xl overflow-hidden shadow-lg md:col-span-2"
                    >
                      <div className="p-8">
                        <h3 className="text-2xl font-bold text-light mb-4">
                          Ready to transform your {industry.name.toLowerCase()} business?
                        </h3>
                        <p className="text-light/80 mb-6">
                          Our AI solutions are tailored to address the unique challenges and opportunities in the {industry.name.toLowerCase()} industry.
                        </p>
                        <button 
                          onClick={handleConsultationClick}
                          className="px-6 py-3 bg-accent text-light rounded-full font-medium hover:bg-accent/90 transition-colors inline-flex items-center gap-2"
                        >
                          Schedule a Consultation <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
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
          <h2 className="text-3xl font-bold text-light mb-6">
            Not sure where to start?
          </h2>
          <p className="text-xl text-light/80 mb-8 max-w-2xl mx-auto">
            Contact us for a free AI assessment to identify the best solutions for your specific business needs.
          </p>
          <button 
            onClick={handleConsultationClick}
            className="px-8 py-4 bg-accent text-light rounded-full text-lg font-medium hover:bg-accent/90 transition-colors"
          >
            Get Your Free AI Assessment
          </button>
        </motion.div>
      </div>
    </div>
  );
}