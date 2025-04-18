
// src/services/profileService.ts
import { supabaseAdmin } from '@/lib/supabase'

export type Role = 'student' | 'admin';

export interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: Role;
  created_at: string;
  updated_at: string;
}

/** Fetch all profiles */
export async function getAllUsers(): Promise<Profile[]> {
  const { data, error } = await supabaseAdmin
    .from('profiles')
    .select('*');
  if (error) throw error;
  return data!;
}

/** Fetch a single profile by user ID */
export async function getUserById(id: string): Promise<Profile | null> {
  const { data, error } = await supabaseAdmin
    .from('profiles')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
}

/** Update fields on an existing profile */
export async function updateUser(
  id: string,
  updates: Partial<Omit<Profile, 'id' | 'created_at' | 'updated_at'>>
): Promise<Profile | null> {
  const { data, error } = await supabaseAdmin
    .from('profiles')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
}

/** Delete a user profile by ID */
export async function deleteUser(id: string): Promise<void> {
  const { error } = await supabaseAdmin
    .from('profiles')
    .delete()
    .eq('id', id);
  if (error) throw error;
}

/** Create a new profile (used by the Clerk webhook) */
export async function createUser(profile: Omit<Profile, 'created_at' | 'updated_at'>) {
    const now = new Date().toISOString()
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .insert([{ ...profile, created_at: now, updated_at: now }])
      .single()
  
    if (error) throw error
    return data
  }