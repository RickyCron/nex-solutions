import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Lightbulb, Rocket, BarChart, X } from 'lucide-react';
import { useState } from 'react';

const steps = [
  {
    number: "01",
    title: "Discover",
    description: "We dive deep into your business like detectives with AI magnifying glasses.",
    icon: <Brain className="w-8 h-8" />,
    color: "text-secondary",
    longDescription: "Our discovery phase involves a comprehensive analysis of your current processes, pain points, and opportunities for AI integration. We identify key areas where automation can make the biggest impact."
  },
  {
    number: "02",
    title: "Design",
    description: "Tailoring solutions sharper than your morning coffee.",
    icon: <Lightbulb className="w-8 h-8" />,
    color: "text-accent",
    longDescription: "Using insights from the discovery phase, we design custom AI solutions that perfectly fit your business needs. Every solution is crafted to integrate seamlessly with your existing workflows."
  },
  {
    number: "03",
    title: "Deploy",
    description: "Watch your business run smoother than ever.",
    icon: <Rocket className="w-8 h-8" />,
    color: "text-secondary",
    longDescription: "Implementation is handled with care, ensuring minimal disruption to your operations. We provide comprehensive training and support throughout the deployment process."
  },
  {
    number: "04",
    title: "Optimize",
    description: "Because good isn't good enough.",
    icon: <BarChart className="w-8 h-8" />,
    color: "text-accent",
    longDescription: "Post-deployment, we continuously monitor and optimize your AI solutions. Regular performance reviews and updates ensure you're always getting the best possible results."
  }
];

export default function Process() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <div className="min-h-screen flex items-center justify-center py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-light mb-6">
            From Idea to Impact, AI Does the Heavy Lifting
          </h1>
          <p className="text-xl text-light/80 max-w-2xl mx-auto">
            A proven four-step process to transform your business with AI
          </p>
        </motion.div>

        <div className="max-w-[1200px] mx-auto relative">
          {/* Center Line - Hidden on Mobile */}
          <motion.div 
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-accent/20 -translate-x-1/2 hidden md:block" 
          />

          {/* Process Steps */}
          <div className="space-y-12 md:space-y-24 relative">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ 
                  opacity: 0,
                  x: index % 2 === 0 ? -50 : 50,
                }}
                whileInView={{ 
                  opacity: 1,
                  x: 0,
                }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ 
                  duration: 0.4,
                  delay: 0.1 * index,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:justify-start justify-center' : 'md:justify-end justify-center'
                }`}
              >
                {/* Step Content */}
                <div className="relative w-full md:w-[calc(50%-3rem)]">
                  <div 
                    className={`flex items-center gap-6 cursor-pointer group ${
                      index % 2 === 0 ? 'flex-row' : 'md:flex-row-reverse flex-row'
                    }`}
                    onClick={() => setActiveStep(index)}
                  >
                    {/* Step Number and Icon */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: 0.2,
                        delay: 0.1 + (index * 0.05),
                        type: "spring",
                        stiffness: 400,
                        damping: 15
                      }}
                      className={`relative w-16 md:w-20 h-16 md:h-20 rounded-full bg-primary flex items-center justify-center border-2 ${
                        activeStep === index ? 'border-accent' : 'border-accent/30'
                      }`}
                    >
                      {/* Step Number */}
                      <span className="absolute -top-8 text-sm font-bold text-accent">
                        Step {step.number}
                      </span>
                      <motion.div 
                        className={`${step.color}`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.3 }}
                      >
                        {step.icon}
                      </motion.div>
                    </motion.div>

                    {/* Step Text */}
                    <div className="flex-1">
                      <motion.h3 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.2 + (index * 0.05) }}
                        className="text-xl md:text-2xl font-bold text-light mb-2 group-hover:text-accent transition-colors"
                      >
                        {step.title}
                      </motion.h3>
                      <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.3 + (index * 0.05) }}
                        className="text-sm md:text-base text-light/80"
                      >
                        {step.description}
                      </motion.p>
                    </div>
                  </div>
                </div>

                {/* Connecting Lines - Hidden on Mobile */}
                <motion.div 
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.3,
                    delay: 0.1 + (index * 0.05)
                  }}
                  style={{ originX: index % 2 === 0 ? 0 : 1 }}
                  className={`absolute top-1/2 w-[calc(50%-3rem)] h-0.5 bg-accent/20 hidden md:block ${
                    index % 2 === 0 ? 'right-1/2 translate-x-12' : 'left-1/2 -translate-x-12'
                  }`}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Popup Dialog - Now positioned outside the steps for better mobile centering */}
      <AnimatePresence>
        {activeStep !== null && (
          <>
            {/* Mobile backdrop */}
            <motion.div 
              className="fixed inset-0 bg-black/50 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveStep(null)}
            />
            
            {/* Popup content - Desktop */}
            <motion.div 
              className="hidden md:block fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90vw] max-w-[400px]"
              initial={{ opacity: 0, scale: 0.95, y: "-50%", x: "-50%" }}
              animate={{ opacity: 1, scale: 1, y: "-50%", x: "-50%" }}
              exit={{ opacity: 0, scale: 0.95, y: "-50%", x: "-50%" }}
            >
              <div className="bg-primary p-6 rounded-2xl border border-accent/20 shadow-xl relative">
                <button
                  onClick={() => setActiveStep(null)}
                  className="absolute top-4 right-4 text-light/60 hover:text-light transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`text-sm font-bold ${steps[activeStep].color}`}>
                      Step {steps[activeStep].number}
                    </div>
                    <motion.div 
                      className={steps[activeStep].color}
                      animate={{ 
                        rotate: [0, 360],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        duration: 0.5,
                        ease: "easeOut"
                      }}
                    >
                      {steps[activeStep].icon}
                    </motion.div>
                  </div>
                  <h2 className="text-xl font-bold text-light mb-3">
                    {steps[activeStep].title}
                  </h2>
                  <p className="text-light/80 text-sm leading-relaxed">
                    {steps[activeStep].longDescription}
                  </p>
                  
                  <div className="mt-4 h-1 bg-accent/20 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${((parseInt(steps[activeStep].number)) / steps.length) * 100}%` }}
                      transition={{ duration: 0.2 }}
                      className="h-full bg-accent"
                    />
                  </div>
                  <div className="text-xs text-accent mt-2">
                    {steps[activeStep].number} of {steps.length} steps explored
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Popup content - Mobile */}
            <motion.div 
              className="md:hidden fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90vw] max-w-[400px]"
              initial={{ opacity: 0, scale: 0.95, y: "-50%", x: "-50%" }}
              animate={{ opacity: 1, scale: 1, y: "-50%", x: "-50%" }}
              exit={{ opacity: 0, scale: 0.95, y: "-50%", x: "-50%" }}
            >
              <div className="bg-primary p-6 rounded-2xl border border-accent/20 shadow-xl relative">
                <button
                  onClick={() => setActiveStep(null)}
                  className="absolute top-4 right-4 text-light/60 hover:text-light transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`text-sm font-bold ${steps[activeStep].color}`}>
                      Step {steps[activeStep].number}
                    </div>
                    <motion.div 
                      className={steps[activeStep].color}
                      animate={{ 
                        rotate: [0, 360],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        duration: 0.5,
                        ease: "easeOut"
                      }}
                    >
                      {steps[activeStep].icon}
                    </motion.div>
                  </div>
                  <h2 className="text-xl font-bold text-light mb-3">
                    {steps[activeStep].title}
                  </h2>
                  <p className="text-light/80 text-sm leading-relaxed">
                    {steps[activeStep].longDescription}
                  </p>
                  
                  <div className="mt-4 h-1 bg-accent/20 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${((parseInt(steps[activeStep].number)) / steps.length) * 100}%` }}
                      transition={{ duration: 0.2 }}
                      className="h-full bg-accent"
                    />
                  </div>
                  <div className="text-xs text-accent mt-2">
                    {steps[activeStep].number} of {steps.length} steps explored
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}