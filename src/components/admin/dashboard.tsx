import { Card } from "@/components/ui/card";
import { Users, UserCheck, GraduationCap, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockData = {
  metrics: {
    totalUsers: 1250,
    appliedStudents: 450,
    enrolledStudents: 380,
  },
  courseData: [
    { name: 'Jan', "Web Development": 40, "Data Science": 24, "Mobile App": 35 },
    { name: 'Feb', "Web Development": 30, "Data Science": 28, "Mobile App": 38 },
    { name: 'Mar', "Web Development": 45, "Data Science": 35, "Mobile App": 42 },
    { name: 'Apr', "Web Development": 50, "Data Science": 40, "Mobile App": 45 },
    { name: 'May', "Web Development": 55, "Data Science": 45, "Mobile App": 48 },
  ]
};

const StatCard = ({ icon: Icon, label, value, badgeText, badgeColor }: {
  icon: any;
  label: string;
  value: number;
  badgeText?: string;
  badgeColor?: string;
}) => (
  <Card className="p-6 flex items-start justify-between space-x-4">
    <div className="flex-1">
      <h3 className="text-sm font-medium text-muted-foreground">{label}</h3>
      <div className="mt-2 flex items-baseline">
        <p className="text-2xl font-semibold">{value.toLocaleString()}</p>
        {badgeText && (
          <Badge variant="secondary" className={`ml-2 ${badgeColor}`}>
            {badgeText}
          </Badge>
        )}
      </div>
    </div>
    <Icon className="h-8 w-8 text-muted-foreground" />
  </Card>
);

const Dashboard = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <StatCard
          icon={Users}
          label="Total Users"
          value={mockData.metrics.totalUsers}
        />
        <StatCard
          icon={UserCheck}
          label="Applied Students"
          value={mockData.metrics.appliedStudents}
          badgeText="Pending"
          badgeColor="bg-yellow-100 text-yellow-800"
        />
        <StatCard
          icon={GraduationCap}
          label="Enrolled Students"
          value={mockData.metrics.enrolledStudents}
          badgeText="Active"
          badgeColor="bg-green-100 text-green-800"
        />
      </div>

      <Card className="p-6">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Course Enrollment Trends</h2>
          <p className="text-sm text-muted-foreground">Monthly enrollment statistics</p>
        </div>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockData.courseData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="Web Development" stroke="#8B5CF6" strokeWidth={2} />
              <Line type="monotone" dataKey="Data Science" stroke="#EC4899" strokeWidth={2} />
              <Line type="monotone" dataKey="Mobile App" stroke="#10B981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
