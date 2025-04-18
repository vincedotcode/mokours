// _components/CourseWizard.tsx
'use client'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Course } from '../page' // Path hack for brevity

export default function CourseWizard({
  open,
  onOpenChange,
  initial,
  onSave,
}: {
  open: boolean
  onOpenChange: (o: boolean) => void
  initial: Course | null
  onSave: (c: Course) => void
}) {
  /*  multi‑step logic goes here  */
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <div className="text-center text-muted-foreground">
          Course wizard placeholder
        </div>
      </DialogContent>
    </Dialog>
  )
}

