/*
  # Create website_info table

  1. New Tables
    - `website_info`
      - `id` (uuid, primary key)
      - `section` (text, not null) - Identifies which section of the website this info belongs to
      - `title` (text, not null) - Title or heading for the section
      - `content` (text) - Main content text
      - `metadata` (jsonb) - Additional metadata in JSON format
      - `image_url` (text) - URL to any associated image
      - `display_order` (integer) - Order to display items within a section
      - `is_active` (boolean) - Whether this content should be displayed
      - `created_at` (timestamptz) - When this record was created
      - `updated_at` (timestamptz) - When this record was last updated
  
  2. Security
    - Enable RLS on `website_info` table
    - Add policies for authenticated users to manage website content
    - Add policy for anonymous users to read active content
*/

CREATE TABLE IF NOT EXISTS website_info (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section text NOT NULL,
  title text NOT NULL,
  content text,
  metadata jsonb DEFAULT '{}'::jsonb,
  image_url text,
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create index on section for faster queries
CREATE INDEX IF NOT EXISTS website_info_section_idx ON website_info(section);

-- Enable Row Level Security
ALTER TABLE website_info ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Allow anonymous users to read active content
CREATE POLICY "Anyone can view active website content"
  ON website_info
  FOR SELECT
  TO anon
  USING (is_active = true);

-- Allow authenticated users to manage all website content
CREATE POLICY "Authenticated users can manage website content"
  ON website_info
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert some initial data for the home section
INSERT INTO website_info (section, title, content, metadata, display_order)
VALUES 
  ('home', 'AI Solutions That Work as Hard as You Do', 'From intelligent chatbots to automated workflows, we help businesses run smoother, faster and smarter.', 
   '{"subtitle": "probably harder", "cta_text": "Let''s Get Automating", "cta_link": "#consultation"}'::jsonb, 1);

-- Insert data for the about section
INSERT INTO website_info (section, title, content, metadata, display_order)
VALUES 
  ('about', 'Maximise Efficiency and Impact', 'Why Partner with Us? The key advantages of adopting AI in your business.', 
   '{"mission": "We believe AI should empower people, not replace them. Our mission is to create smarter businesses that put people first whist still increasing productivity and time.", 
     "vision": "A future where businesses grow effortlessly, people work smarter, and technology bridges gaps—not creates them."}'::jsonb, 1);

-- Insert data for benefits in the about section
INSERT INTO website_info (section, title, content, metadata, display_order)
VALUES 
  ('about_benefits', 'Cost reduction', 'Optimise processes and reduce operational expenses by automating repetitive tasks and minimising errors.', 
   '{"icon": "TrendingUp"}'::jsonb, 1),
  ('about_benefits', 'Improved outcomes', 'Leverage powerful data insights to enhance decision-making, boost performance & achieve measurable results.', 
   '{"icon": "Target"}'::jsonb, 2),
  ('about_benefits', 'Increased productivity', 'Enhance productivity by streamlining workflows, refining processes, and automating critical business functions.', 
   '{"icon": "Rocket"}'::jsonb, 3);

-- Insert data for the services section
INSERT INTO website_info (section, title, content, metadata, display_order)
VALUES 
  ('services', 'AI Process Automation', 'Streamline and scale your business operations effortlessly.', 
   '{"icon": "Brain", "id": "process-automation", "features": ["Workflow Design & Implementation", "API Integration", "Data Management & Analytics", "Reporting & Notifications"], "technologies": ["Make.com", "Zapier", "Airtable", "Google Sheets"]}'::jsonb, 1),
  ('services', 'AI Chatbots & WhatsApp Assistant', 'Engage customers and automate communication with AI-driven solutions.', 
   '{"icon": "Bot", "id": "chatbots", "features": ["AI Agents", "Multi-Channel Deployment", "24/7 Support", "Custom Responses"], "technologies": ["ChatGPT", "Voiceflow", "WhatsApp", "Telegram"]}'::jsonb, 2),
  ('services', 'AI Strategy & Training', 'Empower your team with AI knowledge and implementation.', 
   '{"icon": "Sparkles", "id": "strategy", "features": ["Custom Training", "Strategy Planning", "Implementation", "Support"], "technologies": ["OpenAI", "Google AI", "Microsoft Azure", "Anthropic"]}'::jsonb, 3),
  ('services', 'AI Content & Digital Growth', 'Supercharge your content and digital presence with AI.', 
   '{"icon": "Rocket", "id": "content", "features": ["Content Creation", "Social Media", "SEO Optimization", "Analytics"], "technologies": ["ChatGPT", "Midjourney", "Google Analytics", "SEMrush"]}'::jsonb, 4);

-- Insert data for the FAQ section
INSERT INTO website_info (section, title, content, metadata, display_order)
VALUES 
  ('faq', 'How do I get started with Nex Solutions?', 'To get started, simply fill in the contact form below or visit our Contact Page to connect with us directly. We''ll be in touch within the same business day.', 
   '{}'::jsonb, 1),
  ('faq', 'What industries do you serve?', 'We provide solutions across various sectors including but not limited to retail, finance, healthcare, and more. If your business requires process automation or custom systems, we can help.', 
   '{}'::jsonb, 2),
  ('faq', 'What is an AI agency, and how can it help my business?', 'An AI agency specialises in creating custom artificial intelligence solutions to help businesses automate tasks, gain insights, and improve efficiency. We analyze your unique needs and challenges, then develop affordable AI models tailored to your goals.', 
   '{}'::jsonb, 3),
  ('faq', 'How long does it take to implement an AI solution?', 'The timeline depends on the complexity of your project. Simple automation tasks can be implemented within a few weeks, while custom AI models might take a few months. During our Free AI Evaluation, we''ll provide a clear timeline tailored to your project so you''ll know exactly what to expect.', 
   '{}'::jsonb, 4),
  ('faq', 'Will AI automation disrupt my current operations?', 'We aim to minimize any disruption to your business. Our team works closely with you to ensure the integration is seamless, and we handle the entire process, including testing and troubleshooting, to avoid downtime.', 
   '{}'::jsonb, 5),
  ('faq', 'I''m not tech-savvy. How do I know if AI is right for my business?', 'You don''t need to be an expert in AI—that''s our job! During our Free AI Evaluation, we''ll assess your business needs, challenges, and opportunities. We''ll explain everything in simple terms and recommend practical AI solutions that deliver real results. Our goal is to demystify AI and make it work for you.', 
   '{}'::jsonb, 6);

-- Insert data for the AI facts section
INSERT INTO website_info (section, title, content, metadata, display_order)
VALUES 
  ('ai_facts', 'AI IS CHANGING THE GAME. ARE YOU READY?', '', 
   '{}'::jsonb, 1),
  ('ai_facts_stats', '97%', 'OF EXECUTIVES believe ChatGPT will benefit their companies', 
   '{"quote": "The other 3%? They''re still figuring out email."}'::jsonb, 1),
  ('ai_facts_stats', '$4.4T', 'ECONOMIC IMPACT Generative AI could add this amount annually to the global economy', 
   '{"quote": "The future is here, and it''s worth trillions", "from": 2.6, "to": 4.4, "isTrillions": true}'::jsonb, 2),
  ('ai_facts_stats', '48%', 'OF BUSINESSES rely on machine learning and AI tools to improve data accuracy', 
   '{"quote": "The other 52%? Still playing ''spot the typo'' in Excel."}'::jsonb, 3);

-- Insert data for the process section
INSERT INTO website_info (section, title, content, metadata, display_order)
VALUES 
  ('process', 'From Idea to Impact, AI Does the Heavy Lifting', 'A proven four-step process to transform your business with AI', 
   '{}'::jsonb, 1),
  ('process_steps', 'Discover', 'We dive deep into your business like detectives with AI magnifying glasses.', 
   '{"number": "01", "icon": "Brain", "color": "text-secondary", "longDescription": "Our discovery phase involves a comprehensive analysis of your current processes, pain points, and opportunities for AI integration. We identify key areas where automation can make the biggest impact."}'::jsonb, 1),
  ('process_steps', 'Design', 'Tailoring solutions sharper than your morning coffee.', 
   '{"number": "02", "icon": "Lightbulb", "color": "text-accent", "longDescription": "Using insights from the discovery phase, we design custom AI solutions that perfectly fit your business needs. Every solution is crafted to integrate seamlessly with your existing workflows."}'::jsonb, 2),
  ('process_steps', 'Deploy', 'Watch your business run smoother than ever.', 
   '{"number": "03", "icon": "Rocket", "color": "text-secondary", "longDescription": "Implementation is handled with care, ensuring minimal disruption to your operations. We provide comprehensive training and support throughout the deployment process."}'::jsonb, 3),
  ('process_steps', 'Optimize', 'Because good isn''t good enough.', 
   '{"number": "04", "icon": "BarChart", "color": "text-accent", "longDescription": "Post-deployment, we continuously monitor and optimize your AI solutions. Regular performance reviews and updates ensure you''re always getting the best possible results."}'::jsonb, 4);

-- Insert data for the tools section
INSERT INTO website_info (section, title, content, metadata, display_order)
VALUES 
  ('tools', 'The Secret Sauce? The Tools!', 'Powered by industry-leading technologies', 
   '{}'::jsonb, 1),
  ('tools_list', 'Make.com', 'Automation platform', 
   '{"className": "invert brightness-0"}'::jsonb, 1),
  ('tools_list', 'Voiceflow', 'Conversation design', 
   '{"className": "invert brightness-0"}'::jsonb, 2),
  ('tools_list', 'Google Docs', 'Document collaboration', 
   '{"logo": "https://upload.wikimedia.org/wikipedia/commons/0/01/Google_Docs_logo_%282014-2020%29.svg", "className": ""}'::jsonb, 3),
  ('tools_list', 'Google Sheets', 'Spreadsheet automation', 
   '{"logo": "https://upload.wikimedia.org/wikipedia/commons/3/30/Google_Sheets_logo_%282014-2020%29.svg", "className": ""}'::jsonb, 4),
  ('tools_list', 'Airtable', 'Database management', 
   '{"logo": "https://upload.wikimedia.org/wikipedia/commons/4/4b/Airtable_Logo.svg", "className": "scale-125"}'::jsonb, 5),
  ('tools_list', 'Google Drive', 'Cloud storage', 
   '{"logo": "https://upload.wikimedia.org/wikipedia/commons/1/12/Google_Drive_icon_%282020%29.svg", "className": ""}'::jsonb, 6),
  ('tools_list', 'Zoom', 'Video conferencing', 
   '{"className": ""}'::jsonb, 7),
  ('tools_list', 'ChatGPT', 'AI language model', 
   '{"logo": "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg", "className": ""}'::jsonb, 8),
  ('tools_list', 'WhatsApp', 'Business messaging', 
   '{"logo": "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg", "className": ""}'::jsonb, 9);

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to call the function
CREATE TRIGGER update_website_info_modtime
BEFORE UPDATE ON website_info
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();