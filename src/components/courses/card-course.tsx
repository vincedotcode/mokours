'use client'

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CheckCircle, Clock } from 'lucide-react'
import Link from 'next/link'

export interface Course {
  id: string
  title: string
  price_rs: number
  status: 'draft' | 'published'
  learners: number | null
  thumbnail_url: string
}

interface CardCourseProps {
  course: Course
  /** optional CTA button label (defaults to "Enroll") */
  ctaLabel?: string
}

/**
 * Reusable card for a single course. Plug it anywhere — grid, carousel, etc.
 */
export default function CardCourse({ course, ctaLabel = 'Enroll' }: CardCourseProps) {
  return (
    <Card className="group relative overflow-hidden hover:shadow-lg transition-shadow">
      <img
        src={course.thumbnail_url}
        alt={course.title}
        className="h-32 w-full object-cover"
      />

      <CardHeader>
        <CardTitle className="line-clamp-1 text-base font-semibold">
          {course.title}
        </CardTitle>
        <CardDescription>Rs {course.price_rs.toLocaleString()}</CardDescription>
      </CardHeader>

      <CardContent className="flex items-center justify-between">
        <Badge
          variant={course.status === 'published' ? 'default' : 'secondary'}
          className="inline-flex items-center gap-1"
        >
          {course.status === 'published' ? (
            <CheckCircle className="h-3 w-3" />
          ) : (
            <Clock className="h-3 w-3" />
          )}
          {course.status}
        </Badge>

        <span className="text-sm text-muted-foreground">
          {course.learners ?? 0} learners
        </span>
      </CardContent>

      <Button asChild className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-primary/90 text-primary-foreground rounded-none">
        <Link href={`/courses/${course.id}`} className="flex-1 justify-center">
          {ctaLabel}
        </Link>
      </Button>
    </Card>
  )
}