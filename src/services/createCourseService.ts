// src/services/createCourseService.ts
import { uploadThumbnail } from './storageService'
import { createCourse } from '@/services/courseService'
import { Database } from '@/lib/database.types'

type CourseInsert = Database['public']['Tables']['courses']['Insert']

interface CreateCoursePayload
  extends Omit<CourseInsert, 'thumbnail_url' | 'created_at' | 'updated_at'> {
  thumbnailBuffer: Buffer | Uint8Array
  thumbnailMime: string              
}

/**
 * Convenience helper: upload image → create course row
 */
export async function createCourseWithThumbnail(
  payload: CreateCoursePayload,
) {
  // step 1: upload file and get public URL
  const publicUrl = await uploadThumbnail(
    payload.thumbnailBuffer,
    payload.thumbnailMime,
  )

  // step 2: write DB row
  const { thumbnailBuffer, thumbnailMime, ...courseFields } = payload
  return createCourse({
    ...courseFields,
    thumbnail_url: publicUrl,
  })
}
