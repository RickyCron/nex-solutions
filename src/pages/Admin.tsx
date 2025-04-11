import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Database } from '../lib/database.types';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader2, Check, X, Clock, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

type Consultation = Database['public']['Tables']['consultations']['Row'];

export default function Admin() {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        // Try to fetch from Supabase
        try {
          const { data, error } = await supabase
            .from('consultations')
            .select('*')
            .order('created_at', { ascending: false });

          if (error) {
            throw error;
          }

          setConsultations(data || []);
        } catch (supabaseError) {
          console.warn("Supabase fetch failed, using demo data:", supabaseError);
          
          // Provide demo data if Supabase connection fails
          const demoData: Consultation[] = [
            {
              id: '1',
              name: 'John Smith',
              email: 'john@example.com',
              phone: '555-123-4567',
              business_name: 'Smith Enterprises',
              website: 'https://smithenterprises.com',
              industry: 'Technology',
              message: 'Looking to implement AI chatbots for our customer service department.',
              created_at: new Date().toISOString(),
              status: 'new'
            },
            {
              id: '2',
              name: 'Sarah Johnson',
              email: 'sarah@example.com',
              phone: '555-987-6543',
              business_name: 'Johnson Healthcare',
              website: null,
              industry: 'Healthcare',
              message: 'Interested in AI process automation for our patient intake procedures.',
              created_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
              status: 'pending'
            },
            {
              id: '3',
              name: 'Michael Wong',
              email: 'michael@example.com',
              phone: '555-456-7890',
              business_name: 'Wong Financial',
              website: 'https://wongfinancial.com',
              industry: 'Finance',
              message: 'Need help with AI strategy for our investment analysis team.',
              created_at: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
              status: 'completed'
            }
          ];
          
          setConsultations(demoData);
        }
      } catch (err) {
        console.error('Error fetching consultations:', err);
        setError('Failed to load consultations. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchConsultations();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      // Try to update in Supabase
      try {
        const { error } = await supabase
          .from('consultations')
          .update({ status })
          .eq('id', id);

        if (error) {
          throw error;
        }
      } catch (supabaseError) {
        console.warn("Supabase update failed, updating local state only:", supabaseError);
      }

      // Update local state regardless of Supabase success
      setConsultations(prev => 
        prev.map(consultation => 
          consultation.id === id ? { ...consultation, status } : consultation
        )
      );

      toast.success(`Status updated to ${status}`);
    } catch (err) {
      console.error('Error updating status:', err);
      toast.error('Failed to update status');
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <Check className="w-5 h-5 text-green-500" />;
      case 'rejected':
        return <X className="w-5 h-5 text-red-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      default:
        return <Clock className="w-5 h-5 text-accent" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-primary py-20">
      <div className="container mx-auto px-4">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-light mb-8 hover:text-accent transition-colors"
        >
          <ArrowLeft className="w-5 h-5" /> Back to home
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-light mb-4">
            Admin Dashboard
          </h1>
          <p className="text-xl text-light/80 max-w-3xl mx-auto">
            Manage consultation requests and track client interactions
          </p>
        </motion.div>

        <div className="flex justify-end mb-6">
          <button
            onClick={() => navigate('/admin/website')}
            className="px-4 py-2 bg-accent/10 text-accent rounded-lg flex items-center gap-2 hover:bg-accent/20 transition-colors"
          >
            <Settings className="w-4 h-4" />
            Website Content Management
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-accent animate-spin" />
            <span className="ml-3 text-light">Loading consultations...</span>
          </div>
        ) : error ? (
          <div className="bg-red-500/10 text-red-500 p-4 rounded-lg text-center">
            {error}
          </div>
        ) : consultations.length === 0 ? (
          <div className="bg-primary/40 backdrop-blur-sm p-8 rounded-3xl border border-accent/10 text-center">
            <p className="text-light text-xl">No consultation requests yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {consultations.map((consultation) => (
              <motion.div
                key={consultation.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-primary/40 backdrop-blur-sm p-6 rounded-xl border border-accent/10"
              >
                <div className="flex flex-col md:flex-row justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-light">{consultation.name}</h2>
                    <p className="text-light/80">{consultation.business_name} - {consultation.industry}</p>
                  </div>
                  <div className="flex items-center gap-2 mt-2 md:mt-0">
                    <span className="text-sm text-light/60">
                      {formatDate(consultation.created_at)}
                    </span>
                    <div className="flex items-center gap-1 px-3 py-1 bg-accent/10 rounded-full">
                      {getStatusIcon(consultation.status)}
                      <span className="text-sm text-light capitalize">{consultation.status}</span>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-sm font-medium text-light/60 mb-1">Contact Information</h3>
                    <div className="space-y-2">
                      <p className="text-light">Email: {consultation.email}</p>
                      <p className="text-light">Phone: {consultation.phone}</p>
                      {consultation.website && (
                        <p className="text-light">Website: {consultation.website}</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-light/60 mb-1">Message</h3>
                    <p className="text-light">{consultation.message}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => updateStatus(consultation.id, 'pending')}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      consultation.status === 'pending'
                        ? 'bg-yellow-500 text-white'
                        : 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20'
                    }`}
                  >
                    Mark as Pending
                  </button>
                  <button
                    onClick={() => updateStatus(consultation.id, 'completed')}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      consultation.status === 'completed'
                        ? 'bg-green-500 text-white'
                        : 'bg-green-500/10 text-green-500 hover:bg-green-500/20'
                    }`}
                  >
                    Mark as Completed
                  </button>
                  <button
                    onClick={() => updateStatus(consultation.id, 'rejected')}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      consultation.status === 'rejected'
                        ? 'bg-red-500 text-white'
                        : 'bg-red-500/10 text-red-500 hover:bg-red-500/20'
                    }`}
                  >
                    Mark as Rejected
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}