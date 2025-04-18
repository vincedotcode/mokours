// ============================================================
// src/components/course/CardCourseSection.tsx
'use client'

import * as React from 'react'
import CardCourse, { Course } from '@/components/courses/card-course'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'

interface Props {
    className?: string
    showSearch?: boolean
}

export default function CardCourseSection({ className, showSearch = true }: Props) {
    const [courses, setCourses] = React.useState<Course[]>([])
    const [loading, setLoading] = React.useState(true)
    const [search, setSearch] = React.useState('')

    React.useEffect(() => {
        ; (async () => {
            try {
                const res = await fetch('/api/admin/courses', { cache: 'no-store' })
                const json = (await res.json()) as Course[]
                if (res.ok) setCourses(json)
                else console.error(json)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        })()
    }, [])

    const filtered = courses.filter((c) =>
        c.title.toLowerCase().includes(search.toLowerCase()),
    )

    return (
        <section className={cn(className)}>
            <div className="max-w-container mx-auto flex flex-col items-center gap-6 sm:gap-20">
                {showSearch && (
                    <Input
                        placeholder="Search courses…"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="max-w-sm"
                    />
                )}

                {loading ? (
                    <>
                        {Array.from({ length: 6 }).map((_, i) => (
                            <Skeleton key={i} className="h-48 w-full rounded-md" />
                        ))}
                    </>
                ) : (
                    <>
                        {filtered.map((course) => (
                            <CardCourse key={course.id} course={course} />
                        ))}
                        {!filtered.length && (
                            <p className="col-span-full text-center text-muted-foreground">
                                No courses found.
                            </p>
                        )}
                    </>
                )}
            </div>

        </section>
    )
}
