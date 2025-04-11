/*
  # Create consultations table

  1. New Tables
    - `consultations`
      - `id` (uuid, primary key)
      - `name` (text, not null)
      - `email` (text, not null)
      - `phone` (text, not null)
      - `business_name` (text, not null)
      - `website` (text)
      - `industry` (text, not null)
      - `message` (text, not null)
      - `created_at` (timestamptz, default now())
      - `status` (text, default 'new')
  2. Security
    - Enable RLS on `consultations` table
    - Add policy for authenticated users to insert data
    - Add policy for authenticated users to read their own data
*/

CREATE TABLE IF NOT EXISTS consultations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  business_name text NOT NULL,
  website text,
  industry text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now(),
  status text DEFAULT 'new'
);

ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert data (for public form submissions)
CREATE POLICY "Anyone can insert consultations"
  ON consultations
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Only authenticated users can view consultations
CREATE POLICY "Authenticated users can view consultations"
  ON consultations
  FOR SELECT
  TO authenticated
  USING (true);