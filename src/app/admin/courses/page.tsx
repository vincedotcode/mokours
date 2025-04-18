// app/(admin)/courses/page.tsx
'use client'

import * as React from 'react'
import {
  Plus,
  MoreHorizontal,
  Pencil,
  Trash,
  Eye,
  CheckCircle,
  Clock,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import CourseWizard from '@/app/admin/courses/_components/course-wizard'
import ConfirmDeleteDialog from '@/app/admin/courses/_components/confirm-delete-dialog'

/* -------------------------------------------------- */
/* types                                              */
/* -------------------------------------------------- */
export interface Course {
  id: string
  title: string
  price_rs: number
  status: 'draft' | 'published'
  learners: number | null
  thumbnail_url: string
}

/* -------------------------------------------------- */
/* page                                               */
/* -------------------------------------------------- */
export default function CoursesPage() {
  const router = useRouter()

  const [courses, setCourses]   = React.useState<Course[]>([])
  const [search, setSearch]     = React.useState('')
  const [loading, setLoading]   = React.useState(true)

  const [openWizard, setOpenWizard]       = React.useState(false)
  const [editCourse, setEditCourse]       = React.useState<Course | null>(null)
  const [deleteTarget, setDeleteTarget]   = React.useState<Course | null>(null)

  /* ---------- fetch on mount ---------- */
  React.useEffect(() => {
    ;(async () => {
      try {
        const res  = await fetch('/api/admin/courses', { cache: 'no-store' })
        const json = await res.json()
        if (!res.ok) throw new Error(json.message ?? 'Fetch error')
        setCourses(json as Course[])
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  /* ---------- helpers ---------- */
  const filtered = courses.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase()),
  )

  const handleDelete = async () => {
    if (!deleteTarget) return
    try {
      await fetch(`/api/admin/courses?id=${deleteTarget.id}`, {
        method: 'DELETE',
      })
      setCourses((prev) => prev.filter((c) => c.id !== deleteTarget.id))
    } catch (err) {
      console.error(err)
    } finally {
      setDeleteTarget(null)
    }
  }

  /* -------------------------------------------------- */
  /* render                                             */
  /* -------------------------------------------------- */
  return (
    <>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Courses</h1>

        <div className="flex gap-2">
          <Input
            placeholder="Search courses…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-64"
          />

          {/* Go to /admin/courses/new */}
          <Button onClick={() => router.push('/admin/courses/new')}>
            <Plus className="mr-1 h-4 w-4" />
            Create
          </Button>
        </div>
      </div>

      {/* Grid or loader */}
      {loading ? (
        <p className="text-muted-foreground">Loading…</p>
      ) : (
        <div
          className={cn(
            'grid gap-6',
            'grid-cols-[repeat(auto-fill,minmax(260px,1fr))]',
          )}
        >
          {filtered.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onEdit={() => {
                setEditCourse(course)
                setOpenWizard(true)
              }}
              onDelete={() => setDeleteTarget(course)}
            />
          ))}

          {!filtered.length && (
            <div className="col-span-full flex flex-col items-center py-20 text-muted-foreground">
              <span>No courses found.</span>
              <Button className="mt-4" onClick={() => router.push('/admin/courses/new')}>
                Create your first course
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Wizard & delete dialog (optional, you can remove if not used) */}
      {openWizard && (
        <CourseWizard
          open={openWizard}
          onOpenChange={setOpenWizard}
          initial={editCourse}
          onSave={() => {/* re‑fetch or optimistic update here */}}
        />
      )}

      {deleteTarget && (
        <ConfirmDeleteDialog
          name={deleteTarget.title}
          open
          onCancel={() => setDeleteTarget(null)}
          onConfirm={handleDelete}
        />
      )}
    </>
  )
}

/* -------------------------------------------------- */
/* Card                                               */
/* -------------------------------------------------- */

function CourseCard({
  course,
  onEdit,
  onDelete,
}: {
  course: Course
  onEdit: () => void
  onDelete: () => void
}) {
  return (
    <Card className="relative overflow-hidden group/card">
      <img
        src={course.thumbnail_url}
        alt={course.title}
        className="h-32 w-full object-cover"
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            className="absolute right-2 top-2 h-7 w-7 opacity-0 transition-opacity group-hover/card:opacity-100"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem onClick={onEdit}>
            <Pencil className="mr-2 h-4 w-4" /> Edit
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Eye className="mr-2 h-4 w-4" /> View
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={onDelete} className="text-destructive">
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <CardHeader>
        <CardTitle className="line-clamp-1">{course.title}</CardTitle>
        <CardDescription>
          Rs {course.price_rs.toLocaleString()}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Badge
          variant={course.status === 'published' ? 'default' : 'secondary'}
          className="mb-2 inline-flex items-center gap-1"
        >
          {course.status === 'published' ? (
            <CheckCircle className="h-3 w-3" />
          ) : (
            <Clock className="h-3 w-3" />
          )}
          {course.status}
        </Badge>

        <div className="text-sm text-muted-foreground">
          {course.learners ?? 0} learners
        </div>
      </CardContent>
    </Card>
  )
}
