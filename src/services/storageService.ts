// src/services/storageService.ts
import { randomUUID } from 'node:crypto'
import { supabaseAdmin } from '@/lib/supabase'

const BUCKET = 'course-thumbnails' // create once in Supabase dashboard

/**
 * Upload a file to the course‑thumbnails bucket and return the public URL.
 *
 * @param fileBuffer Buffer | Uint8Array
 * @param mimeType   e.g. 'image/png'
 */
export async function uploadThumbnail(
  fileBuffer: Buffer | Uint8Array,
  mimeType: string,
): Promise<string> {
  const fileName = `${randomUUID()}.${mimeType.split('/')[1] ?? 'png'}`

  const { error } = await supabaseAdmin.storage
    .from(BUCKET)
    .upload(fileName, fileBuffer, {
      cacheControl: '3600',
      contentType: mimeType,
      upsert: false,
    })

  if (error) throw error

  const { data } = supabaseAdmin.storage.from(BUCKET).getPublicUrl(fileName)
  return data.publicUrl
}
