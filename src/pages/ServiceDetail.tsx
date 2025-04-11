import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Brain, Bot, Sparkles, Rocket, Check, Building, Briefcase, Stethoscope, ShoppingBag, Utensils } from 'lucide-react';

const serviceData = {
  "process-automation": {
    title: "AI Process Automation",
    description: "Streamline and scale your business operations effortlessly with AI-powered process automation.",
    icon: <Brain className="w-12 h-12" />,
    longDescription: "AI Process Automation transforms how businesses operate by automating repetitive tasks, streamlining workflows, and optimizing resource allocation. Our solutions integrate seamlessly with your existing systems to reduce manual effort, minimize errors, and accelerate processes.",
    benefits: [
      "Reduce operational costs by up to 40%",
      "Minimize human error in critical processes",
      "Free up staff time for higher-value activities",
      "Scale operations without proportional staff increases",
      "Gain real-time insights into business performance"
    ],
    industries: [
      {
        name: "Healthcare",
        icon: <Stethoscope className="w-6 h-6" />,
        solutions: [
          {
            title: "Patient Intake Automation",
            description: "Streamline patient registration, insurance verification, and medical history collection through AI-powered forms and workflows."
          },
          {
            title: "Claims Processing",
            description: "Automate insurance claims submission, tracking, and follow-up to reduce rejection rates and accelerate reimbursement."
          },
          {
            title: "Inventory Management",
            description: "Optimize medical supplies and medication inventory with predictive ordering and usage tracking."
          }
        ]
      },
      {
        name: "Finance",
        icon: <Briefcase className="w-6 h-6" />,
        solutions: [
          {
            title: "Transaction Reconciliation",
            description: "Automatically match and reconcile transactions across multiple systems and accounts, flagging discrepancies for review."
          },
          {
            title: "Regulatory Compliance",
            description: "Monitor transactions and activities for compliance issues, generating required reports and documentation."
          },
          {
            title: "Risk Assessment",
            description: "Analyze customer data and transaction patterns to identify potential fraud or security risks."
          }
        ]
      },
      {
        name: "Retail",
        icon: <ShoppingBag className="w-6 h-6" />,
        solutions: [
          {
            title: "Inventory Forecasting",
            description: "Predict optimal inventory levels based on historical sales data, seasonal trends, and external factors."
          },
          {
            title: "Order Processing",
            description: "Automate the entire order fulfillment process from receipt to shipping, with real-time status updates."
          },
          {
            title: "Customer Segmentation",
            description: "Analyze customer behavior to create targeted marketing campaigns and personalized recommendations."
          }
        ]
      },
      {
        name: "Hospitality",
        icon: <Utensils className="w-6 h-6" />,
        solutions: [
          {
            title: "Reservation Management",
            description: "Streamline booking processes, optimize room/table allocation, and automate guest communications."
          },
          {
            title: "Staff Scheduling",
            description: "Create optimal staff schedules based on predicted demand, staff availability, and service requirements."
          },
          {
            title: "Guest Experience",
            description: "Personalize guest interactions based on preferences and history, with automated follow-up and feedback collection."
          }
        ]
      }
    ]
  },
  "chatbots": {
    title: "AI Chatbots & WhatsApp Assistant",
    description: "Engage customers and automate communication with AI-driven solutions.",
    icon: <Bot className="w-12 h-12" />,
    longDescription: "Our AI Chatbots and WhatsApp Assistants provide 24/7 customer support, lead qualification, and personalized interactions across multiple channels. These intelligent assistants can handle inquiries, process orders, schedule appointments, and provide information, all while learning from each interaction to continuously improve.",
    benefits: [
      "Provide instant 24/7 customer support",
      "Reduce support costs by up to 30%",
      "Handle multiple conversations simultaneously",
      "Qualify leads and capture customer information",
      "Seamlessly transfer to human agents when needed"
    ],
    industries: [
      {
        name: "Healthcare",
        icon: <Stethoscope className="w-6 h-6" />,
        solutions: [
          {
            title: "Appointment Scheduling",
            description: "Allow patients to book, reschedule, or cancel appointments through conversational interfaces."
          },
          {
            title: "Symptom Checker",
            description: "Provide initial assessment of symptoms and guide patients to appropriate care options."
          },
          {
            title: "Medication Reminders",
            description: "Send personalized reminders for medication, follow-up appointments, and preventive care."
          }
        ]
      },
      {
        name: "Finance",
        icon: <Briefcase className="w-6 h-6" />,
        solutions: [
          {
            title: "Account Inquiries",
            description: "Handle balance checks, transaction history, and basic account management through secure chat."
          },
          {
            title: "Loan Pre-qualification",
            description: "Guide customers through initial loan application and qualification process."
          },
          {
            title: "Financial Advice",
            description: "Provide personalized financial tips and product recommendations based on customer profiles."
          }
        ]
      },
      {
        name: "Retail",
        icon: <ShoppingBag className="w-6 h-6" />,
        solutions: [
          {
            title: "Product Recommendations",
            description: "Suggest products based on customer preferences, purchase history, and browsing behavior."
          },
          {
            title: "Order Status Updates",
            description: "Provide real-time information on order processing, shipping, and delivery."
          },
          {
            title: "Return Processing",
            description: "Guide customers through the return process, generating labels and tracking refunds."
          }
        ]
      },
      {
        name: "Hospitality",
        icon: <Utensils className="w-6 h-6" />,
        solutions: [
          {
            title: "Booking Assistance",
            description: "Help guests find and book accommodations or dining reservations that match their preferences."
          },
          {
            title: "Concierge Services",
            description: "Provide information about local attractions, transportation, and services."
          },
          {
            title: "In-stay Support",
            description: "Address guest requests, room service orders, and facility information during their stay."
          }
        ]
      }
    ]
  },
  "strategy": {
    title: "AI Strategy & Training",
    description: "Empower your team with AI knowledge and implementation.",
    icon: <Sparkles className="w-12 h-12" />,
    longDescription: "Our AI Strategy and Training services help businesses develop a comprehensive approach to AI adoption. We work with your team to identify opportunities, create implementation roadmaps, and provide hands-on training to ensure your staff can effectively leverage AI technologies.",
    benefits: [
      "Develop a clear AI implementation roadmap",
      "Build internal AI capabilities and expertise",
      "Ensure ethical and responsible AI use",
      "Maximize ROI on AI investments",
      "Stay ahead of industry trends and innovations"
    ],
    industries: [
      {
        name: "Healthcare",
        icon: <Stethoscope className="w-6 h-6" />,
        solutions: [
          {
            title: "Clinical AI Integration",
            description: "Train medical staff on using AI tools for diagnosis, treatment planning, and patient monitoring."
          },
          {
            title: "Data Privacy Compliance",
            description: "Develop strategies for implementing AI while maintaining HIPAA compliance and patient data security."
          },
          {
            title: "Operational Efficiency",
            description: "Identify opportunities for AI to improve administrative processes and resource allocation."
          }
        ]
      },
      {
        name: "Finance",
        icon: <Briefcase className="w-6 h-6" />,
        solutions: [
          {
            title: "Risk Management AI",
            description: "Train analysts on using AI for credit risk assessment, fraud detection, and market analysis."
          },
          {
            title: "Customer Experience",
            description: "Develop strategies for personalized financial services and automated customer interactions."
          },
          {
            title: "Regulatory Technology",
            description: "Implement AI solutions for compliance monitoring and regulatory reporting."
          }
        ]
      },
      {
        name: "Retail",
        icon: <ShoppingBag className="w-6 h-6" />,
        solutions: [
          {
            title: "Demand Forecasting",
            description: "Train staff on using AI tools for inventory management and sales prediction."
          },
          {
            title: "Personalization Strategy",
            description: "Develop approaches for using customer data to create personalized shopping experiences."
          },
          {
            title: "Supply Chain Optimization",
            description: "Implement AI solutions for logistics, supplier management, and distribution."
          }
        ]
      },
      {
        name: "Hospitality",
        icon: <Utensils className="w-6 h-6" />,
        solutions: [
          {
            title: "Guest Experience AI",
            description: "Train staff on using AI tools to personalize guest interactions and anticipate needs."
          },
          {
            title: "Revenue Management",
            description: "Implement dynamic pricing and occupancy optimization strategies using AI."
          },
          {
            title: "Operational Efficiency",
            description: "Identify opportunities for AI to streamline back-office functions and service delivery."
          }
        ]
      }
    ]
  },
  "content": {
    title: "AI Content & Digital Growth",
    description: "Supercharge your content and digital presence with AI.",
    icon: <Rocket className="w-12 h-12" />,
    longDescription: "Our AI Content and Digital Growth solutions help businesses create compelling content, optimize their online presence, and drive engagement across digital channels. From automated content generation to data-driven marketing strategies, we leverage AI to accelerate your digital growth.",
    benefits: [
      "Create high-quality content at scale",
      "Optimize content for search engines and target audiences",
      "Personalize marketing messages for different segments",
      "Analyze performance data to refine strategies",
      "Stay consistent across multiple channels and platforms"
    ],
    industries: [
      {
        name: "Healthcare",
        icon: <Stethoscope className="w-6 h-6" />,
        solutions: [
          {
            title: "Patient Education",
            description: "Create accessible, accurate health information content tailored to different patient needs."
          },
          {
            title: "Provider Marketing",
            description: "Develop targeted content to highlight specialties, services, and patient success stories."
          },
          {
            title: "Community Outreach",
            description: "Generate content for health awareness campaigns, preventive care, and community programs."
          }
        ]
      },
      {
        name: "Finance",
        icon: <Briefcase className="w-6 h-6" />,
        solutions: [
          {
            title: "Financial Education",
            description: "Create accessible content explaining financial concepts, products, and services."
          },
          {
            title: "Market Analysis",
            description: "Generate regular reports and insights on market trends, investment opportunities, and economic factors."
          },
          {
            title: "Regulatory Communications",
            description: "Develop clear, compliant content for disclosures, terms, and regulatory information."
          }
        ]
      },
      {
        name: "Retail",
        icon: <ShoppingBag className="w-6 h-6" />,
        solutions: [
          {
            title: "Product Descriptions",
            description: "Generate compelling, SEO-optimized descriptions for product catalogs at scale."
          },
          {
            title: "Email Campaigns",
            description: "Create personalized email content based on customer segments and behaviors."
          },
          {
            title: "Social Media Content",
            description: "Develop engaging posts, stories, and ads tailored to different platforms and audiences."
          }
        ]
      },
      {
        name: "Hospitality",
        icon: <Utensils className="w-6 h-6" />,
        solutions: [
          {
            title: "Destination Content",
            description: "Create engaging descriptions of properties, amenities, and local attractions."
          },
          {
            title: "Seasonal Campaigns",
            description: "Develop targeted content for different seasons, holidays, and special events."
          },
          {
            title: "Guest Communications",
            description: "Generate personalized pre-arrival, in-stay, and post-stay communications."
          }
        ]
      }
    ]
  }
};

export default function ServiceDetail() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const service = serviceData[serviceId];

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-light mb-4">Service not found</h1>
          <button 
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-accent text-light rounded-full"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

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
          className="bg-primary/40 backdrop-blur-sm p-8 rounded-3xl border border-accent/10 mb-12"
        >
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="p-4 bg-accent/10 rounded-2xl text-accent">
              {service.icon}
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-light mb-4">
                {service.title}
              </h1>
              <p className="text-xl text-light/80 max-w-3xl">
                {service.longDescription}
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-primary/40 backdrop-blur-sm p-8 rounded-3xl border border-accent/10"
          >
            <h2 className="text-2xl font-bold text-light mb-6">Key Benefits</h2>
            <div className="space-y-4">
              {service.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="p-1 bg-accent/10 rounded-full text-accent mt-1">
                    <Check className="w-4 h-4" />
                  </div>
                  <p className="text-light/80">{benefit}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-primary/40 backdrop-blur-sm p-8 rounded-3xl border border-accent/10"
          >
            <h2 className="text-2xl font-bold text-light mb-6">How It Works</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-light mb-2">Assessment</h3>
                  <p className="text-light/80">We analyze your current processes and identify opportunities for AI implementation.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-light mb-2">Design</h3>
                  <p className="text-light/80">Our team creates a custom solution tailored to your specific needs and objectives.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-light mb-2">Implementation</h3>
                  <p className="text-light/80">We deploy the solution, integrate it with your existing systems, and train your team.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-light mb-2">Optimization</h3>
                  <p className="text-light/80">We continuously monitor performance and refine the solution to maximize results.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-light mb-8 text-center">Industry-Specific Solutions</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {service.industries.map((industry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + (index * 0.1) }}
                className="bg-white rounded-xl overflow-hidden shadow-lg"
              >
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-accent/10 rounded-lg text-accent">
                      {industry.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-primary">
                      {industry.name}
                    </h3>
                  </div>
                  
                  <div className="space-y-6">
                    {industry.solutions.map((solution, sIndex) => (
                      <div key={sIndex} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                        <h4 className="text-lg font-medium text-primary mb-2">
                          {solution.title}
                        </h4>
                        <p className="text-dark/80 text-sm">
                          {solution.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-light mb-6">Ready to get started?</h2>
          <p className="text-xl text-light/80 mb-8 max-w-2xl mx-auto">
            Contact us today to learn how our {service.title} solutions can transform your business.
          </p>
          <button 
            onClick={handleConsultationClick}
            className="px-8 py-4 bg-accent text-light rounded-full text-lg font-medium hover:bg-accent/90 transition-colors"
          >
            Schedule a Consultation
          </button>
        </motion.div>
      </div>
    </div>
  );
}