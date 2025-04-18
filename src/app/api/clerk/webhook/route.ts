// app/api/clerk/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { Webhook } from 'svix'
import { createUser } from '@/services/profileService'

export const config = { api: { bodyParser: false } }

const svix = new Webhook(process.env.CLERK_WEBHOOK_SECRET!)

export async function POST(req: NextRequest) {
  // 1) Get raw text
  const raw = await req.text()

  // 2) Build a headers object for Svix
  const headersForSvix = {
    'svix-id':        req.headers.get('svix-id')        || '',
    'svix-timestamp': req.headers.get('svix-timestamp') || '',
    'svix-signature': req.headers.get('svix-signature') || '',
  }

  // 3) Verify—this will throw if any of the above are missing/invalid
  let evt
  try {
    evt = svix.verify(raw, headersForSvix)
  } catch (err) {
    console.error('❌ Svix verification failed', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  // 4) Parse and handle
  const { type, data } = JSON.parse(raw)
  if (type === 'user.created') {
    await createUser({
      id:         data.id,
      first_name: data.first_name  || data.firstName || '',
      last_name:  data.last_name   || data.lastName  || '',
      email:      data.email_addresses?.[0]?.email_address
                  || data.primary_email_address?.emailAddress
                  || '',
      role:       'student',
    })
  }

  return NextResponse.json({ received: true })
}
