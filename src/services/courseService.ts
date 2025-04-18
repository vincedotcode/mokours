// src/services/courseService.ts
import { supabaseAdmin } from '@/lib/supabase'
import { Database } from '@/lib/database.types'

type CourseRow = Database['public']['Tables']['courses']['Row']
type CourseInsert = Database['public']['Tables']['courses']['Insert']
type CourseUpdate = Database['public']['Tables']['courses']['Update']

/** Get all courses */
export async function getAllCourses(): Promise<CourseRow[]> {
  const { data, error } = await supabaseAdmin
    .from('courses')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

/** Get a single course by id */
export async function getCourseById(id: string): Promise<CourseRow | null> {
  const { data, error } = await supabaseAdmin
    .from('courses')
    .select('*')
    .eq('id', id)
    .single()
  if (error) throw error
  return data
}

/** Create without thumbnail upload (expects thumbnail_url ready) */
export async function createCourse(course: CourseInsert): Promise<CourseRow> {
  const now = new Date().toISOString()
  const payload = { ...course, created_at: now, updated_at: now }
  const { data, error } = await supabaseAdmin
    .from('courses')
    .insert(payload)
    .single()
  if (error) throw error
  return data
}

/** Patch/update fields */
export async function updateCourse(
  id: string,
  updates: CourseUpdate,
): Promise<CourseRow> {
  const { data, error } = await supabaseAdmin
    .from('courses')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .single()
  if (error) throw error
  return data
}

/** Delete a course */
export async function deleteCourse(id: string): Promise<void> {
  const { error } = await supabaseAdmin.from('courses').delete().eq('id', id)
  if (error) throw error
}
