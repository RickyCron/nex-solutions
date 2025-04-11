import { motion } from 'framer-motion';
import { Bot, MessageSquare, Workflow, Zap } from 'lucide-react';

const services = [
  {
    title: "AI Process Automation",
    description: "Streamline and scale your business operations effortlessly.",
    icon: <Workflow className="w-8 h-8" />,
    features: [
      "Workflow Design & Implementation",
      "API Integration",
      "Data Management & Analytics",
      "Reporting & Notifications"
    ]
  },
  {
    title: "AI Chatbots & WhatsApp Assistant",
    description: "Engage customers and automate communication with AI-driven solutions.",
    icon: <MessageSquare className="w-8 h-8" />,
    features: [
      "AI Agents",
      "Multi-Channel Deployment",
      "24/7 Support",
      "Custom Responses"
    ]
  }
];

export default function Services() {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-light mb-6">
            Our Services
          </h1>
          <p className="text-xl text-light/80 max-w-2xl mx-auto">
            Transformative AI solutions for modern businesses
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-primary/50 backdrop-blur-lg p-8 rounded-2xl border border-accent/10"
            >
              <div className="p-4 bg-accent/10 rounded-lg w-fit mb-6 text-accent">
                {service.icon}
              </div>
              <h3 className="text-2xl font-semibold text-light mb-4">
                {service.title}
              </h3>
              <p className="text-light/80 mb-6">{service.description}</p>
              <ul className="space-y-3">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-accent" />
                    <span className="text-light/80">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}