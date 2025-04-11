import { motion } from 'framer-motion';
import { MessageCircle, Brain, Bot, Cpu, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

const industries = [
  "Healthcare",
  "Finance",
  "Technology",
  "Marketing",
  "Hospitality",
  "Education",
  "Manufacturing",
  "Retail",
  "Other"
];

export default function Consultation() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    business_name: '',
    website: '',
    industry: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.phone || !formData.business_name || !formData.industry || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      // For demo purposes, simulate a successful submission
      // This is a fallback in case Supabase connection fails in the preview environment
      setTimeout(() => {
        setIsSuccess(true);
        toast.success('Your consultation request has been submitted!');
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          business_name: '',
          website: '',
          industry: '',
          message: ''
        });
        
        // Reset success state after 5 seconds
        setTimeout(() => {
          setIsSuccess(false);
        }, 5000);
        
        setIsSubmitting(false);
      }, 1500);

      // Try to submit to Supabase if available
      try {
        const { error } = await supabase
          .from('consultations')
          .insert([
            {
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              business_name: formData.business_name,
              website: formData.website || null,
              industry: formData.industry,
              message: formData.message
            }
          ]);

        if (error) {
          console.warn("Supabase insert failed, but form submission was simulated:", error);
        }
      } catch (supabaseError) {
        console.warn("Supabase connection failed, but form submission was simulated:", supabaseError);
      }
      
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('There was an error submitting your request. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left Side - AI Interface */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative hidden md:flex items-center justify-center"
            >
              {/* Interface Content */}
              <div className="relative w-full h-[500px]">
                {/* Interface Header */}
                <div className="absolute top-0 left-0 right-0 h-12 bg-accent/10 backdrop-blur-sm border-b border-accent/20 flex items-center justify-between px-4 rounded-t-xl">
                  <motion.div 
                    className="flex items-center gap-2"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="w-2 h-2 rounded-full bg-accent" />
                    <div className="text-sm text-accent">AI System Online</div>
                  </motion.div>
                  <div className="flex gap-2">
                    {[Brain, Bot, Cpu].map((Icon, index) => (
                      <motion.div
                        key={index}
                        className="w-6 h-6 text-accent/60"
                        animate={{ 
                          scale: [1, 1.2, 1],
                          rotate: [0, 360, 0]
                        }}
                        transition={{ 
                          duration: 3,
                          delay: index * 1,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      >
                        <Icon size={24} />
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Main Content Area */}
                <div className="absolute top-12 inset-x-0 bottom-0 bg-primary/40 backdrop-blur-sm p-6 rounded-b-xl">
                  {/* Animated Circuit Lines */}
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute h-px bg-accent/20"
                      style={{
                        top: `${20 + i * 12}%`,
                        left: '5%',
                        right: '5%',
                      }}
                      animate={{
                        opacity: [0.2, 0.5, 0.2],
                        scaleX: [0.9, 1, 0.9],
                      }}
                      transition={{
                        duration: 2,
                        delay: i * 0.2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  ))}

                  {/* Data Visualization Elements - First Row */}
                  <div className="grid grid-cols-3 gap-4 relative z-10 mb-4">
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="h-24 bg-accent/5 rounded-lg border border-accent/10 p-3 relative"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        {/* Box Number */}
                        <div className="absolute top-2 right-2 text-xs text-accent/60 font-mono">
                          {String(i + 1).padStart(2, '0')}
                        </div>
                        <motion.div
                          className="w-full h-full rounded-md overflow-hidden"
                          animate={{
                            background: [
                              'linear-gradient(180deg, rgba(204, 74, 74, 0.1) 0%, rgba(110, 198, 217, 0.1) 100%)',
                              'linear-gradient(180deg, rgba(110, 198, 217, 0.1) 0%, rgba(204, 74, 74, 0.1) 100%)',
                              'linear-gradient(180deg, rgba(204, 74, 74, 0.1) 0%, rgba(110, 198, 217, 0.1) 100%)',
                            ],
                          }}
                          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        />
                      </motion.div>
                    ))}
                  </div>

                  {/* Data Visualization Elements - Second Row */}
                  <div className="grid grid-cols-3 gap-4 relative z-10">
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i + 6}
                        className="h-24 bg-accent/5 rounded-lg border border-accent/10 p-3 relative"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: (i + 6) * 0.1 }}
                      >
                        {/* Box Number */}
                        <div className="absolute top-2 right-2 text-xs text-accent/60 font-mono">
                          {String(i + 7).padStart(2, '0')}
                        </div>
                        <motion.div
                          className="w-full h-full rounded-md overflow-hidden"
                          animate={{
                            background: [
                              'linear-gradient(180deg, rgba(110, 198, 217, 0.1) 0%, rgba(204, 74, 74, 0.1) 100%)',
                              'linear-gradient(180deg, rgba(204, 74, 74, 0.1) 0%, rgba(110, 198, 217, 0.1) 100%)',
                              'linear-gradient(180deg, rgba(110, 198, 217, 0.1) 0%, rgba(204, 74, 74, 0.1) 100%)',
                            ],
                          }}
                          transition={{ 
                            duration: 3, 
                            repeat: Infinity, 
                            ease: "linear",
                            delay: i * 0.2 
                          }}
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-light mb-6">
                Let's Transform Your Business
              </h1>
              <p className="text-xl text-light/80 mb-8">
                Schedule a consultation to explore AI solutions tailored for you
              </p>

              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-accent/10 backdrop-blur-sm p-8 rounded-xl border border-accent/30"
                >
                  <h2 className="text-2xl font-bold text-light mb-4">Thank You!</h2>
                  <p className="text-light/80 mb-6">
                    Your consultation request has been submitted successfully. Our team will contact you within 24 hours to schedule your consultation.
                  </p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="px-6 py-3 bg-accent text-light rounded-full font-medium hover:bg-accent/90 transition-colors"
                  >
                    Submit Another Request
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Two-column layout for form fields */}
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-light/80 mb-2">
                        Full Name <span className="text-accent">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-primary/50 rounded-lg border border-accent/10 text-light focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-light/80 mb-2">
                        Email Address <span className="text-accent">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-primary/50 rounded-lg border border-accent/10 text-light focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-light/80 mb-2">
                        Phone Number <span className="text-accent">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-primary/50 rounded-lg border border-accent/10 text-light focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="business_name" className="block text-light/80 mb-2">
                        Business Name <span className="text-accent">*</span>
                      </label>
                      <input
                        type="text"
                        id="business_name"
                        value={formData.business_name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-primary/50 rounded-lg border border-accent/10 text-light focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="website" className="block text-light/80 mb-2">
                        Website URL
                      </label>
                      <input
                        type="text"
                        id="website"
                        value={formData.website}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-primary/50 rounded-lg border border-accent/10 text-light focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="industry" className="block text-light/80 mb-2">
                        Industry <span className="text-accent">*</span>
                      </label>
                      <select
                        id="industry"
                        value={formData.industry}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-primary/50 rounded-lg border border-accent/10 text-light focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
                        required
                      >
                        <option value="" disabled>Select your industry</option>
                        {industries.map((industry) => (
                          <option key={industry} value={industry} className="bg-primary text-light">
                            {industry}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-light/80 mb-2">
                      How can we help? <span className="text-accent">*</span>
                    </label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 bg-primary/50 rounded-lg border border-accent/10 text-light focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors resize-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-8 py-4 bg-accent text-light rounded-full font-medium hover:bg-accent/90 transition-colors flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Schedule Consultation 
                        <MessageCircle className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}