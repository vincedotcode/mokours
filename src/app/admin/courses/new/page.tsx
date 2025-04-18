'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import CourseBasicInfo from '@/app/admin/courses/_components/course-basic-info'
import CourseContent   from '@/app/admin/courses/_components/course-content'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/auth-content'    // ← import context

/* ---------- validation schema ---------- */
const schema = z.object({
  title:       z.string().min(5),
  description: z.string().min(100),
  image:       z.any().optional(), // File
  category:    z.string().min(1),
  price:       z.string().regex(/^[0-9]+(\.[0-9]{1,2})?$/, 'Enter a price'),
  content:     z.string().min(1),
})

type Values = z.infer<typeof schema>

/* ---------- component ---------- */
export default function CreateCourse() {
  const router   = useRouter()
  const { userId } = useAuth()                    // ← get Clerk id

  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      description: '',
      category: '',
      price: '',
      content: '',
    },
  })

  async function onSubmit(values: Values) {
    try {
      const formData = new FormData()

      Object.entries(values).forEach(([k, v]) => {
        if (k === 'image') {
          if (v) formData.append('image', v as File)
        } else {
          formData.append(k, v as string)
        }
      })

      /* server‑side derived fields */
      formData.append('created_by', userId ?? '')
      formData.append('published', 'false')

      const res = await fetch('/api/admin/courses', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) throw new Error('Failed request')

      toast.success('Course created')
      router.push('/admin/courses')
    } catch (err) {
      console.error(err)
      toast.error('Something went wrong')
    }
  }

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>Create New Course</CardTitle>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8"
            >
              <CourseBasicInfo form={form} />
              <CourseContent  form={form} />

              <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                Create Course
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
