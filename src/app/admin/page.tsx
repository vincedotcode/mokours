'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowUpRight } from 'lucide-react'

export default function DashboardPage() {
  const stats = [
    { label: 'Total Students', value: 1280 },
    { label: 'Active Last 30 d', value: 742 },
    { label: 'Revenue (Rs)', value: '254 000' },
    { label: 'Avg Completion', value: '68%' },
  ]

  return (
    <div className="grid gap-6">
      {/* Stats */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {s.label}
              </CardTitle>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <span className="text-2xl font-bold">{s.value}</span>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Placeholder timeline */}
      <section>
        <h2 className="mb-4 text-lg font-semibold">Recent Activity</h2>
        <p className="text-muted-foreground">(Coming soon) Unified activity feed.</p>
      </section>
    </div>
  )
}