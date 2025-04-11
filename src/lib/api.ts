import { supabase } from './supabase';
import { Database } from './database.types';

type WebsiteInfo = Database['public']['Tables']['website_info']['Row'];

/**
 * Fetch website information by section
 * @param section The section to fetch information for
 * @returns Array of website info records for the specified section
 */
export async function getWebsiteInfoBySection(section: string): Promise<WebsiteInfo[]> {
  try {
    const { data, error } = await supabase
      .from('website_info')
      .select('*')
      .eq('section', section)
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching website info:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in getWebsiteInfoBySection:', error);
    return [];
  }
}

/**
 * Fetch all website information
 * @returns Object with sections as keys and arrays of website info as values
 */
export async function getAllWebsiteInfo(): Promise<Record<string, WebsiteInfo[]>> {
  try {
    const { data, error } = await supabase
      .from('website_info')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching all website info:', error);
      return {};
    }

    // Group by section
    const grouped = (data || []).reduce((acc, item) => {
      if (!acc[item.section]) {
        acc[item.section] = [];
      }
      acc[item.section].push(item);
      return acc;
    }, {} as Record<string, WebsiteInfo[]>);

    return grouped;
  } catch (error) {
    console.error('Error in getAllWebsiteInfo:', error);
    return {};
  }
}

/**
 * Update website information
 * @param id The ID of the record to update
 * @param updates The fields to update
 * @returns The updated record
 */
export async function updateWebsiteInfo(
  id: string, 
  updates: Partial<Database['public']['Tables']['website_info']['Update']>
): Promise<WebsiteInfo | null> {
  try {
    const { data, error } = await supabase
      .from('website_info')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating website info:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in updateWebsiteInfo:', error);
    return null;
  }
}

/**
 * Create a new website information record
 * @param info The record to create
 * @returns The created record
 */
export async function createWebsiteInfo(
  info: Database['public']['Tables']['website_info']['Insert']
): Promise<WebsiteInfo | null> {
  try {
    const { data, error } = await supabase
      .from('website_info')
      .insert([info])
      .select()
      .single();

    if (error) {
      console.error('Error creating website info:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in createWebsiteInfo:', error);
    return null;
  }
}

/**
 * Delete a website information record
 * @param id The ID of the record to delete
 * @returns True if successful, false otherwise
 */
export async function deleteWebsiteInfo(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('website_info')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting website info:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in deleteWebsiteInfo:', error);
    return false;
  }
}