// src/app/api/admin/courses/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'node:crypto'
import { supabaseAdmin } from '@/lib/supabase'   // ← service‑role client

const BUCKET = 'course-thumbnails'                   // must exist in Storage

/* ------------------------------------------------------------------ */
/* GET  →  /api/admin/courses                                         */
/* ------------------------------------------------------------------ */
export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('courses')
    .select('*')
    .order('created_at', { ascending: false })

  return error
    ? NextResponse.json({ message: error.message }, { status: 500 })
    : NextResponse.json(data, { status: 200 })
}

/* ------------------------------------------------------------------ */
/* POST  →  /api/admin/courses                                        */
/* ------------------------------------------------------------------ */
export async function POST(req: NextRequest) {
  const form = await req.formData()

  const title       = form.get('title')       as string
  const description = form.get('description') as string
  const category    = form.get('category')    as string | null
  const priceRs     = Number(form.get('price_rs') ?? form.get('price'))
  const content     = form.get('content')     as string | null
  const createdBy   = form.get('created_by')  as string
  const published   = form.get('published') === 'true'

  /* -------- thumbnail upload -------- */
  let thumbnailUrl = ''
  const file = form.get('image') as File | null

  if (file && file.size) {
    const buffer   = Buffer.from(await file.arrayBuffer())
    const ext      = file.type.split('/')[1] ?? 'png'
    const fileName = `${randomUUID()}.${ext}`

    const { error } = await supabaseAdmin.storage
      .from(BUCKET)
      .upload(fileName, buffer, { contentType: file.type })

    if (error) {
      console.error(error)
      return NextResponse.json({ message: 'Image upload failed' }, { status: 500 })
    }

    const { data } = supabaseAdmin.storage.from(BUCKET).getPublicUrl(fileName)
    thumbnailUrl = data.publicUrl
  }

  /* -------- insert row -------- */
  const { data: course, error } = await supabaseAdmin
    .from('courses')
    .insert({
      id: randomUUID(),
      title,
      description,
      category,
      price_rs: priceRs,
      status: published ? 'published' : 'draft',
      published,
      content,
      thumbnail_url: thumbnailUrl,
      created_by: createdBy,
    })
    .single()

  return error
    ? NextResponse.json({ message: 'DB insert failed' }, { status: 500 })
    : NextResponse.json(course, { status: 201 })
}

/* ------------------------------------------------------------------ */
/* DELETE  →  /api/admin/courses?id=xxxx                               */
/* ------------------------------------------------------------------ */
export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id')
  if (!id) return NextResponse.json({ message: 'id required' }, { status: 400 })

  const { error } = await supabaseAdmin.from('courses').delete().eq('id', id)

  return error
    ? NextResponse.json({ message: error.message }, { status: 500 })
    : NextResponse.json({}, { status: 204 })
}
