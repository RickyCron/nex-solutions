import { motion } from 'framer-motion';
import { Info } from 'lucide-react';
import { useState } from 'react';

const tools = [
  { 
    name: "Make.com",
    logo: "https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_768,h_159/https://apps4u.com/wp-content/uploads/2024/05/Make-Logo-RGB@2x-1.webp",
    description: "Automation platform",
    className: "grayscale group-hover:grayscale-0"
  },
  { 
    name: "Voiceflow",
    logo: "https://cdn.prod.website-files.com/6734a831ad77c756622d1187/67ad1e1c184700d8392c8cd6_52.png",
    description: "Conversation design",
    className: "grayscale group-hover:grayscale-0"
  },
  { 
    name: "Google Docs",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/01/Google_Docs_logo_%282014-2020%29.svg",
    description: "Document collaboration",
    className: ""
  },
  { 
    name: "Google Sheets",
    logo: "https://upload.wikimedia.org/wikipedia/commons/3/30/Google_Sheets_logo_%282014-2020%29.svg",
    description: "Spreadsheet automation",
    className: ""
  },
  { 
    name: "Airtable",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Airtable_Logo.svg",
    description: "Database management",
    className: "scale-125"
  },
  { 
    name: "Google Drive",
    logo: "https://upload.wikimedia.org/wikipedia/commons/1/12/Google_Drive_icon_%282020%29.svg",
    description: "Cloud storage",
    className: ""
  },
  { 
    name: "Zoom",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Zoom_Logo_2022.svg/2000px-Zoom_Logo_2022.svg.png",
    description: "Video conferencing",
    className: ""
  },
  { 
    name: "ChatGPT",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
    description: "AI language model",
    className: ""
  },
  { 
    name: "WhatsApp",
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg",
    description: "Business messaging",
    className: ""
  }
];

export default function Tools() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-6xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-light mb-4">
            The Secret Sauce? The Tools!
          </h1>
          <p className="text-xl text-light/80">
            Powered by industry-leading technologies
          </p>
        </motion.div>

        <div className="grid grid-cols-3 lg:grid-cols-3 gap-12">
          {tools.map((tool, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="group relative flex items-center justify-center"
            >
              <div className="relative w-32 h-32">
                {/* Logo Container */}
                <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-primary/40 backdrop-blur-sm transition-all duration-300 group-hover:scale-110">
                  <div className="w-24 h-24 relative flex items-center justify-center">
                    {tool.logo && (
                      <img
                        src={tool.logo}
                        alt={tool.name}
                        className={`w-full h-full object-contain transition-all duration-300 grayscale group-hover:grayscale-0 ${tool.className}`}
                      />
                    )}
                  </div>
                </div>

                {/* Tooltip */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-accent rounded-full opacity-0 transform -translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 pointer-events-none">
                  <p className="text-xs text-light whitespace-nowrap">{tool.description}</p>
                  {/* Tooltip Arrow */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-accent transform rotate-45" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}