import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, Users, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navigateTo = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <>
      {/* Admin Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        onClick={toggleMenu}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-accent text-light flex items-center justify-center shadow-lg"
      >
        <Settings className="w-6 h-6" />
      </motion.button>

      {/* Admin Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMenu}
              className="fixed inset-0 bg-black/50 z-40"
            />

            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-20 right-6 z-50 w-64 bg-primary rounded-xl shadow-xl overflow-hidden border border-accent/20"
            >
              <div className="flex items-center justify-between p-4 border-b border-accent/10">
                <h3 className="text-light font-medium">Admin Navigation</h3>
                <button onClick={toggleMenu} className="text-light/60 hover:text-light">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-2">
                <button
                  onClick={() => navigateTo('/admin')}
                  className="w-full flex items-center gap-3 p-3 text-left text-light hover:bg-accent/10 rounded-lg transition-colors"
                >
                  <Users className="w-5 h-5 text-accent" />
                  <span>Consultation Requests</span>
                </button>

                <button
                  onClick={() => navigateTo('/admin/website')}
                  className="w-full flex items-center gap-3 p-3 text-left text-light hover:bg-accent/10 rounded-lg transition-colors"
                >
                  <Settings className="w-5 h-5 text-accent" />
                  <span>Website Content</span>
                </button>
              </div>

              <div className="p-4 bg-accent/5 text-xs text-light/60 text-center">
                Nex Solutions Admin Panel
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}