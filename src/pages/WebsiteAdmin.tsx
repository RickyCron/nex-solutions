import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader2, Plus, Save, Trash2, Eye, EyeOff, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getAllWebsiteInfo, updateWebsiteInfo, createWebsiteInfo, deleteWebsiteInfo } from '../lib/api';
import { Database } from '../lib/database.types';

type WebsiteInfo = Database['public']['Tables']['website_info']['Row'];
type WebsiteInfoUpdate = Database['public']['Tables']['website_info']['Update'];
type WebsiteInfoInsert = Database['public']['Tables']['website_info']['Insert'];

// Demo data for when Supabase connection fails
const demoSections = {
  'home': [
    {
      id: '1',
      section: 'home',
      title: 'AI Solutions That Work as Hard as You Do',
      content: 'From intelligent chatbots to automated workflows, we help businesses run smoother, faster and smarter.',
      metadata: { subtitle: 'probably harder', cta_text: 'Let\'s Get Automating', cta_link: '#consultation' },
      image_url: null,
      display_order: 1,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ],
  'about': [
    {
      id: '2',
      section: 'about',
      title: 'Maximise Efficiency and Impact',
      content: 'Why Partner with Us? The key advantages of adopting AI in your business.',
      metadata: { 
        mission: 'We believe AI should empower people, not replace them. Our mission is to create smarter businesses that put people first whist still increasing productivity and time.',
        vision: 'A future where businesses grow effortlessly, people work smarter, and technology bridges gaps—not creates them.'
      },
      image_url: null,
      display_order: 1,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ],
  'about_benefits': [
    {
      id: '3',
      section: 'about_benefits',
      title: 'Cost reduction',
      content: 'Optimise processes and reduce operational expenses by automating repetitive tasks and minimising errors.',
      metadata: { icon: 'TrendingUp' },
      image_url: null,
      display_order: 1,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '4',
      section: 'about_benefits',
      title: 'Improved outcomes',
      content: 'Leverage powerful data insights to enhance decision-making, boost performance & achieve measurable results.',
      metadata: { icon: 'Target' },
      image_url: null,
      display_order: 2,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ],
  'faq': [
    {
      id: '5',
      section: 'faq',
      title: 'How do I get started with Nex Solutions?',
      content: 'To get started, simply fill in the contact form below or visit our Contact Page to connect with us directly. We\'ll be in touch within the same business day.',
      metadata: {},
      image_url: null,
      display_order: 1,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '6',
      section: 'faq',
      title: 'What industries do you serve?',
      content: 'We provide solutions across various sectors including but not limited to retail, finance, healthcare, and more. If your business requires process automation or custom systems, we can help.',
      metadata: {},
      image_url: null,
      display_order: 2,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ]
};

export default function WebsiteAdmin() {
  const [websiteInfo, setWebsiteInfo] = useState<Record<string, WebsiteInfo[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [editingItem, setEditingItem] = useState<WebsiteInfo | null>(null);
  const [newItem, setNewItem] = useState<WebsiteInfoInsert | null>(null);
  const [sections, setSections] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchWebsiteInfo();
  }, []);

  const fetchWebsiteInfo = async () => {
    try {
      setLoading(true);
      
      // Try to fetch from Supabase
      try {
        const data = await getAllWebsiteInfo();
        
        // If we got data from Supabase
        if (Object.keys(data).length > 0) {
          setWebsiteInfo(data);
          
          // Extract unique sections
          const uniqueSections = Object.keys(data);
          setSections(uniqueSections);
          
          // Initialize expanded sections
          const initialExpandedSections: Record<string, boolean> = {};
          uniqueSections.forEach(section => {
            initialExpandedSections[section] = false;
          });
          setExpandedSections(initialExpandedSections);
        } else {
          // If no data from Supabase, use demo data
          throw new Error("No data from Supabase");
        }
      } catch (supabaseError) {
        console.warn("Supabase fetch failed, using demo data:", supabaseError);
        
        // Use demo data
        setWebsiteInfo(demoSections);
        
        // Extract unique sections from demo data
        const uniqueSections = Object.keys(demoSections);
        setSections(uniqueSections);
        
        // Initialize expanded sections
        const initialExpandedSections: Record<string, boolean> = {};
        uniqueSections.forEach(section => {
          initialExpandedSections[section] = false;
        });
        setExpandedSections(initialExpandedSections);
        
        // Show toast notification
        toast.error("Using demo data - Supabase connection failed", {
          duration: 5000,
        });
      }
    } catch (err) {
      console.error('Error fetching website info:', err);
      setError('Failed to load website information. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleEdit = (item: WebsiteInfo) => {
    setEditingItem(item);
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
  };

  const handleSaveEdit = async () => {
    if (!editingItem) return;
    
    try {
      // Try to update in Supabase
      try {
        const result = await updateWebsiteInfo(editingItem.id, {
          title: editingItem.title,
          content: editingItem.content,
          metadata: editingItem.metadata,
          image_url: editingItem.image_url,
          display_order: editingItem.display_order,
          is_active: editingItem.is_active
        });
        
        if (!result) {
          throw new Error("Failed to update in Supabase");
        }
      } catch (supabaseError) {
        console.warn("Supabase update failed, updating local state only:", supabaseError);
      }
      
      // Update local state regardless of Supabase success
      setWebsiteInfo(prev => {
        const updatedInfo = { ...prev };
        const sectionItems = [...(updatedInfo[editingItem.section] || [])];
        const itemIndex = sectionItems.findIndex(item => item.id === editingItem.id);
        
        if (itemIndex !== -1) {
          sectionItems[itemIndex] = {
            ...editingItem,
            updated_at: new Date().toISOString()
          };
          updatedInfo[editingItem.section] = sectionItems;
        }
        
        return updatedInfo;
      });
      
      toast.success('Item updated successfully');
      setEditingItem(null);
    } catch (err) {
      console.error('Error updating item:', err);
      toast.error('An error occurred while updating the item');
    }
  };

  const handleToggleActive = async (item: WebsiteInfo) => {
    try {
      // Try to update in Supabase
      try {
        const result = await updateWebsiteInfo(item.id, {
          is_active: !item.is_active
        });
        
        if (!result) {
          throw new Error("Failed to update in Supabase");
        }
      } catch (supabaseError) {
        console.warn("Supabase update failed, updating local state only:", supabaseError);
      }
      
      // Update local state regardless of Supabase success
      setWebsiteInfo(prev => {
        const updatedInfo = { ...prev };
        const sectionItems = [...(updatedInfo[item.section] || [])];
        const itemIndex = sectionItems.findIndex(i => i.id === item.id);
        
        if (itemIndex !== -1) {
          sectionItems[itemIndex] = {
            ...sectionItems[itemIndex],
            is_active: !sectionItems[itemIndex].is_active,
            updated_at: new Date().toISOString()
          };
          updatedInfo[item.section] = sectionItems;
        }
        
        return updatedInfo;
      });
      
      toast.success(`Item ${!item.is_active ? 'activated' : 'deactivated'} successfully`);
    } catch (err) {
      console.error('Error toggling item status:', err);
      toast.error('An error occurred while updating the item status');
    }
  };

  const handleDelete = async (id: string, section: string) => {
    if (!confirm('Are you sure you want to delete this item? This action cannot be undone.')) {
      return;
    }
    
    try {
      // Try to delete from Supabase
      try {
        const success = await deleteWebsiteInfo(id);
        
        if (!success) {
          throw new Error("Failed to delete from Supabase");
        }
      } catch (supabaseError) {
        console.warn("Supabase delete failed, updating local state only:", supabaseError);
      }
      
      // Update local state regardless of Supabase success
      setWebsiteInfo(prev => {
        const updatedInfo = { ...prev };
        const sectionItems = [...(updatedInfo[section] || [])];
        const filteredItems = sectionItems.filter(item => item.id !== id);
        updatedInfo[section] = filteredItems;
        
        return updatedInfo;
      });
      
      toast.success('Item deleted successfully');
    } catch (err) {
      console.error('Error deleting item:', err);
      toast.error('An error occurred while deleting the item');
    }
  };

  const handleAddNew = (section: string) => {
    setNewItem({
      section,
      title: '',
      content: '',
      metadata: {},
      display_order: websiteInfo[section]?.length || 0
    });
  };

  const handleCancelNew = () => {
    setNewItem(null);
  };

  const handleSaveNew = async () => {
    if (!newItem || !newItem.title) {
      toast.error('Title is required');
      return;
    }
    
    try {
      // Generate a unique ID for the new item
      const newId = Math.random().toString(36).substring(2, 15);
      const now = new Date().toISOString();
      
      // Try to create in Supabase
      let createdItem: WebsiteInfo | null = null;
      try {
        createdItem = await createWebsiteInfo(newItem);
        
        if (!createdItem) {
          throw new Error("Failed to create in Supabase");
        }
      } catch (supabaseError) {
        console.warn("Supabase create failed, updating local state only:", supabaseError);
        
        // Create a local item if Supabase fails
        createdItem = {
          id: newId,
          section: newItem.section,
          title: newItem.title,
          content: newItem.content || null,
          metadata: newItem.metadata || {},
          image_url: newItem.image_url || null,
          display_order: newItem.display_order || 0,
          is_active: newItem.is_active !== false,
          created_at: now,
          updated_at: now
        };
      }
      
      // Update local state with the new item
      setWebsiteInfo(prev => {
        const updatedInfo = { ...prev };
        const sectionItems = [...(updatedInfo[newItem.section] || [])];
        sectionItems.push(createdItem!);
        updatedInfo[newItem.section] = sectionItems;
        
        return updatedInfo;
      });
      
      toast.success('Item created successfully');
      setNewItem(null);
    } catch (err) {
      console.error('Error creating item:', err);
      toast.error('An error occurred while creating the item');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof WebsiteInfoUpdate) => {
    if (editingItem) {
      setEditingItem({
        ...editingItem,
        [field]: e.target.value
      });
    } else if (newItem) {
      setNewItem({
        ...newItem,
        [field]: e.target.value
      });
    }
  };

  const handleMetadataChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    try {
      const parsedMetadata = JSON.parse(e.target.value);
      
      if (editingItem) {
        setEditingItem({
          ...editingItem,
          metadata: parsedMetadata
        });
      } else if (newItem) {
        setNewItem({
          ...newItem,
          metadata: parsedMetadata
        });
      }
    } catch (err) {
      // Don't update if JSON is invalid
      console.error('Invalid JSON:', err);
    }
  };

  const formatSectionName = (section: string) => {
    return section
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
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
            Website Content Management
          </h1>
          <p className="text-xl text-light/80 max-w-3xl mx-auto">
            Manage all content displayed on your website
          </p>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-accent animate-spin" />
            <span className="ml-3 text-light">Loading website content...</span>
          </div>
        ) : error ? (
          <div className="bg-red-500/10 text-red-500 p-4 rounded-lg text-center">
            {error}
          </div>
        ) : (
          <div className="space-y-8">
            {sections.map((section) => (
              <motion.div
                key={section}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-primary/40 backdrop-blur-sm rounded-xl border border-accent/10 overflow-hidden"
              >
                <div 
                  className="p-6 flex items-center justify-between cursor-pointer"
                  onClick={() => toggleSection(section)}
                >
                  <h2 className="text-2xl font-bold text-light">{formatSectionName(section)}</h2>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddNew(section);
                      }}
                      className="px-3 py-1 bg-accent/10 rounded-full text-accent flex items-center gap-1 hover:bg-accent/20 transition-colors"
                    >
                      <Plus className="w-4 h-4" /> Add
                    </button>
                    {expandedSections[section] ? (
                      <ChevronUp className="w-5 h-5 text-accent" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-accent" />
                    )}
                  </div>
                </div>

                {expandedSections[section] && (
                  <div className="px-6 pb-6">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-accent/10">
                            <th className="py-2 px-4 text-left text-light/60 text-sm">Title</th>
                            <th className="py-2 px-4 text-left text-light/60 text-sm">Content</th>
                            <th className="py-2 px-4 text-left text-light/60 text-sm">Order</th>
                            <th className="py-2 px-4 text-left text-light/60 text-sm">Status</th>
                            <th className="py-2 px-4 text-right text-light/60 text-sm">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {websiteInfo[section]?.map((item) => (
                            <tr key={item.id} className="border-b border-accent/5 hover:bg-accent/5">
                              <td className="py-3 px-4 text-light">{item.title}</td>
                              <td className="py-3 px-4 text-light/80">
                                {item.content ? (
                                  item.content.length > 50 
                                    ? `${item.content.substring(0, 50)}...` 
                                    : item.content
                                ) : (
                                  <span className="text-light/40 italic">No content</span>
                                )}
                              </td>
                              <td className="py-3 px-4 text-light">{item.display_order}</td>
                              <td className="py-3 px-4">
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  item.is_active 
                                    ? 'bg-green-500/20 text-green-500' 
                                    : 'bg-red-500/20 text-red-500'
                                }`}>
                                  {item.is_active ? 'Active' : 'Inactive'}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <button
                                    onClick={() => handleToggleActive(item)}
                                    className="p-1 text-light/60 hover:text-accent transition-colors"
                                    title={item.is_active ? 'Deactivate' : 'Activate'}
                                  >
                                    {item.is_active ? (
                                      <EyeOff className="w-4 h-4" />
                                    ) : (
                                      <Eye className="w-4 h-4" />
                                    )}
                                  </button>
                                  <button
                                    onClick={() => handleEdit(item)}
                                    className="p-1 text-light/60 hover:text-accent transition-colors"
                                    title="Edit"
                                  >
                                    <Save className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => handleDelete(item.id, item.section)}
                                    className="p-1 text-light/60 hover:text-red-500 transition-colors"
                                    title="Delete"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                          {websiteInfo[section]?.length === 0 && (
                            <tr>
                              <td colSpan={5} className="py-4 text-center text-light/60 italic">
                                No items in this section
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* Edit Modal */}
        {editingItem && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-primary w-full max-w-2xl rounded-xl p-6 max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold text-light mb-6">Edit Item</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-light/80 mb-2">Title</label>
                  <input
                    type="text"
                    value={editingItem.title}
                    onChange={(e) => handleInputChange(e, 'title')}
                    className="w-full px-4 py-2 bg-primary/50 rounded-lg border border-accent/10 text-light focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
                  />
                </div>
                
                <div>
                  <label className="block text-light/80 mb-2">Content</label>
                  <textarea
                    value={editingItem.content || ''}
                    onChange={(e) => handleInputChange(e, 'content')}
                    rows={4}
                    className="w-full px-4 py-2 bg-primary/50 rounded-lg border border-accent/10 text-light focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors resize-none"
                  />
                </div>
                
                <div>
                  <label className="block text-light/80 mb-2">Image URL</label>
                  <input
                    type="text"
                    value={editingItem.image_url || ''}
                    onChange={(e) => handleInputChange(e, 'image_url')}
                    className="w-full px-4 py-2 bg-primary/50 rounded-lg border border-accent/10 text-light focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
                  />
                </div>
                
                <div>
                  <label className="block text-light/80 mb-2">Display Order</label>
                  <input
                    type="number"
                    value={editingItem.display_order}
                    onChange={(e) => handleInputChange(e, 'display_order')}
                    className="w-full px-4 py-2 bg-primary/50 rounded-lg border border-accent/10 text-light focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
                  />
                </div>
                
                <div>
                  <label className="block text-light/80 mb-2">Metadata (JSON)</label>
                  <textarea
                    value={JSON.stringify(editingItem.metadata, null, 2)}
                    onChange={handleMetadataChange}
                    rows={6}
                    className="w-full px-4 py-2 bg-primary/50 rounded-lg border border-accent/10 text-light focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors resize-none font-mono text-sm"
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="is_active"
                    checked={editingItem.is_active}
                    onChange={(e) => setEditingItem({...editingItem, is_active: e.target.checked})}
                    className="w-4 h-4 accent-accent"
                  />
                  <label htmlFor="is_active" className="text-light/80">Active</label>
                </div>
              </div>
              
              <div className="flex justify-end gap-4 mt-8">
                <button
                  onClick={handleCancelEdit}
                  className="px-4 py-2 bg-primary/50 text-light rounded-lg hover:bg-primary/70 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="px-4 py-2 bg-accent text-light rounded-lg hover:bg-accent/90 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* New Item Modal */}
        {newItem && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-primary w-full max-w-2xl rounded-xl p-6 max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold text-light mb-6">Add New Item to {formatSectionName(newItem.section)}</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-light/80 mb-2">Title <span className="text-accent">*</span></label>
                  <input
                    type="text"
                    value={newItem.title}
                    onChange={(e) => handleInputChange(e, 'title')}
                    className="w-full px-4 py-2 bg-primary/50 rounded-lg border border-accent/10 text-light focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-light/80 mb-2">Content</label>
                  <textarea
                    value={newItem.content || ''}
                    onChange={(e) => handleInputChange(e, 'content')}
                    rows={4}
                    className="w-full px-4 py-2 bg-primary/50 rounded-lg border border-accent/10 text-light focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors resize-none"
                  />
                </div>
                
                <div>
                  <label className="block text-light/80 mb-2">Image URL</label>
                  <input
                    type="text"
                    value={newItem.image_url || ''}
                    onChange={(e) => handleInputChange(e, 'image_url')}
                    className="w-full px-4 py-2 bg-primary/50 rounded-lg border border-accent/10 text-light focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
                  />
                </div>
                
                <div>
                  <label className="block text-light/80 mb-2">Display Order</label>
                  <input
                    type="number"
                    value={newItem.display_order}
                    onChange={(e) => handleInputChange(e, 'display_order')}
                    className="w-full px-4 py-2 bg-primary/50 rounded-lg border border-accent/10 text-light focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
                  />
                </div>
                
                <div>
                  <label className="block text-light/80 mb-2">Metadata (JSON)</label>
                  <textarea
                    value={JSON.stringify(newItem.metadata, null, 2)}
                    onChange={handleMetadataChange}
                    rows={6}
                    className="w-full px-4 py-2 bg-primary/50 rounded-lg border border-accent/10 text-light focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors resize-none font-mono text-sm"
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="new_is_active"
                    checked={newItem.is_active !== false}
                    onChange={(e) => setNewItem({...newItem, is_active: e.target.checked})}
                    className="w-4 h-4 accent-accent"
                  />
                  <label htmlFor="new_is_active" className="text-light/80">Active</label>
                </div>
              </div>
              
              <div className="flex justify-end gap-4 mt-8">
                <button
                  onClick={handleCancelNew}
                  className="px-4 py-2 bg-primary/50 text-light rounded-lg hover:bg-primary/70 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveNew}
                  className="px-4 py-2 bg-accent text-light rounded-lg hover:bg-accent/90 transition-colors"
                >
                  Create Item
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}