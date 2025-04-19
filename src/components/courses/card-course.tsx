import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

interface CourseCardProps {
    course: {
        id: string
        title: string
        description: string
        price_rs: number
        status: "draft" | "published"
        thumbnail_url: string
        category: string | null
        content: string | null
        published: boolean
        created_by: string
        created_at: string
        updated_at: string
    }
}

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */
export interface Course {
    id: string
    title: string
    description: string
    price_rs: number
    status: "draft" | "published"
    thumbnail_url: string
    category: string | null
    content: string | null
    published: boolean
    created_by: string
    created_at: string
    updated_at: string
}



export default function CourseCard({ course }: CourseCardProps) {
    // Format price to Indian Rupees
    const formattedPrice = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(course.price_rs)

    return (
        <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg">
            <div className="aspect-video relative overflow-hidden">
                <Image
                    src={course.thumbnail_url || "/placeholder.svg?height=200&width=400"}
                    alt={course.title}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>
            <CardHeader className="p-4 pb-2">
                <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-lg line-clamp-1">{course.title}</h3>
                    {course.category && (
                        <Badge variant="outline" className="ml-2 whitespace-nowrap">
                            {course.category}
                        </Badge>
                    )}
                </div>
            </CardHeader>
            <CardContent className="p-4 pt-2 pb-2">
                <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
            </CardContent>
            <CardFooter className="p-4 pt-2 flex justify-between items-center">
                <p className="font-bold text-lg">{formattedPrice}</p>
                <Button className="transition-colors duration-300 hover:bg-green-600">Enroll Now</Button>
            </CardFooter>
        </Card>
    )
}
