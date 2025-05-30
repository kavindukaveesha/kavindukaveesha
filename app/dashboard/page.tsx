"use client"

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { LoadingCard, LoadingPage } from '@/components/ui/loading';
import { Progress } from '@/components/ui/progress';
import { MetricCard, StatsGrid } from '@/components/dashboard/metric-card';
import { ChartCard, SimpleAreaChart, SimpleBarChart } from '@/components/dashboard/chart-card';
import { 
  CalendarIcon, 
  UsersIcon, 
  FolderKanban, 
  BarChart3Icon, 
  Download, 
  Eye, 
  Code2, 
  GitBranch,
  Activity,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle
} from 'lucide-react';

// Sample data for charts
const visitorData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 900 },
  { name: 'Jul', value: 700 },
];

const projectData = [
  { name: 'Web', value: 12, color: 'linear-gradient(to top, #3B82F6, #60A5FA)' },
  { name: 'Mobile', value: 8, color: 'linear-gradient(to top, #8B5CF6, #A78BFA)' },
  { name: 'API', value: 6, color: 'linear-gradient(to top, #10B981, #34D399)' },
  { name: 'AI/ML', value: 4, color: 'linear-gradient(to top, #F59E0B, #FCD34D)' },
];

const sparklineData = [400, 300, 600, 800, 500, 900, 700, 650, 800, 750];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 1000);
    setTimeout(() => setStatsLoading(false), 1500);
  }, []);

  if (loading) {
    return <LoadingPage text="Loading dashboard..." />;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-black-300 via-blue-400 to-blue-black-300 bg-clip-text text-transparent animate-gradient bg-300%">
          Dashboard
        </h1>
        <p className="text-blue-black-400 text-lg">Welcome back! Here's your portfolio overview.</p>
      </div>
      
      {/* Stats Grid */}
      <StatsGrid>
        {statsLoading ? (
          Array.from({ length: 4 }, (_, i) => <LoadingCard key={i} />)
        ) : (
          <>
            <MetricCard
              title="Total Visitors"
              value="12,853"
              change={12.5}
              changeType="increase"
              icon={<UsersIcon className="h-5 w-5 text-blue-black-300" />}
              sparklineData={sparklineData}
              description="from last month"
            />
            <MetricCard
              title="Active Projects"
              value="24"
              change={8.3}
              changeType="increase"
              icon={<FolderKanban className="h-5 w-5 text-blue-black-400" />}
              sparklineData={[20, 22, 19, 24, 21, 26, 24, 23, 25, 24]}
              description="currently in development"
            />
            <MetricCard
              title="GitHub Stars"
              value="1,483"
              change={18.2}
              changeType="increase"
              icon={<GitBranch className="h-5 w-5 text-blue-400" />}
              sparklineData={[1200, 1250, 1300, 1350, 1400, 1450, 1480, 1475, 1483, 1485]}
              description="across all repositories"
            />
            <MetricCard
              title="Page Views"
              value="45.2K"
              change={-2.4}
              changeType="decrease"
              icon={<BarChart3Icon className="h-5 w-5 text-blue-black-500" />}
              sparklineData={[48000, 47000, 46000, 45500, 45200, 45100, 45000, 45200, 45300, 45200]}
              description="this month"
            />
          </>
        )}
      </StatsGrid>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full max-w-[400px] grid-cols-3 glass p-1 rounded-xl border border-blue-black-600/40">
          <TabsTrigger value="overview" className="data-[state=active]:bg-blue-black-600/25 data-[state=active]:text-blue-black-200">Overview</TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-blue-black-600/25 data-[state=active]:text-blue-black-200">Analytics</TabsTrigger>
          <TabsTrigger value="activity" className="data-[state=active]:bg-blue-black-600/25 data-[state=active]:text-blue-black-200">Activity</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-7">
            {/* Project Status */}
            <Card className="lg:col-span-4 dashboard-card">
              <CardHeader>
                <CardTitle className="text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Project Status</CardTitle>
                <CardDescription>Current status of your active projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: 'E-Commerce Platform', status: 'In Progress', progress: 75, deadline: '2024-02-15' },
                    { name: 'AI Chat Application', status: 'Review', progress: 90, deadline: '2024-01-30' },
                    { name: 'Dashboard Analytics', status: 'Planning', progress: 25, deadline: '2024-03-01' },
                    { name: 'Mobile App Redesign', status: 'In Progress', progress: 60, deadline: '2024-02-20' },
                  ].map((project, index) => (
                    <div key={index} className="space-y-3 p-4 rounded-xl bg-secondary/20 hover:bg-secondary/30 transition-all duration-300 group">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="font-medium group-hover:text-primary transition-colors">{project.name}</span>
                          <span className={`text-xs px-3 py-1 rounded-full font-medium backdrop-blur-sm ${
                            project.status === 'In Progress' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                            project.status === 'Review' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                            'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                          }`}>
                            {project.status}
                          </span>
                        </div>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {project.deadline}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium text-primary">{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2 bg-secondary/50" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="lg:col-span-3 dashboard-card">
              <CardHeader>
                <CardTitle className="text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Recent Activity</CardTitle>
                <CardDescription>Latest updates from your projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { action: 'Deployment successful', project: 'E-Commerce Platform', time: '2 hours ago', icon: <CheckCircle2 className="h-4 w-4 text-green-500" /> },
                    { action: 'New issue opened', project: 'AI Chat Application', time: '4 hours ago', icon: <AlertCircle className="h-4 w-4 text-yellow-500" /> },
                    { action: 'Build failed', project: 'Dashboard Analytics', time: '6 hours ago', icon: <XCircle className="h-4 w-4 text-red-500" /> },
                    { action: 'Code review completed', project: 'Mobile App Redesign', time: '1 day ago', icon: <CheckCircle2 className="h-4 w-4 text-green-500" /> },
                    { action: 'New commit pushed', project: 'E-Commerce Platform', time: '2 days ago', icon: <GitBranch className="h-4 w-4 text-blue-500" /> },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/20 transition-all duration-200 group">
                      <div className="mt-0.5 group-hover:scale-110 transition-transform">{activity.icon}</div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium group-hover:text-primary transition-colors">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">{activity.project}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Technology Distribution */}
          <Card className="dashboard-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Technology Distribution</CardTitle>
                  <CardDescription>Languages and frameworks used across projects</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="border-primary/30 hover:bg-primary/10 hover:border-primary/50 transition-all">
                  View Details
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: 'TypeScript', percentage: 45, color: 'bg-blue-500' },
                  { name: 'React', percentage: 35, color: 'bg-cyan-500' },
                  { name: 'Node.js', percentage: 25, color: 'bg-green-500' },
                  { name: 'Python', percentage: 20, color: 'bg-yellow-500' },
                  { name: 'PostgreSQL', percentage: 30, color: 'bg-indigo-500' },
                  { name: 'Docker', percentage: 15, color: 'bg-purple-500' },
                  { name: 'AWS', percentage: 25, color: 'bg-orange-500' },
                  { name: 'GraphQL', percentage: 10, color: 'bg-pink-500' },
                ].map((tech, index) => (
                  <div key={index} className="space-y-2 group cursor-pointer">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium group-hover:text-primary transition-colors">{tech.name}</span>
                      <span className="text-xs font-medium text-primary">{tech.percentage}%</span>
                    </div>
                    <div className="h-2.5 bg-secondary/50 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${tech.color} transition-all duration-700 rounded-full relative overflow-hidden`}
                        style={{ width: `${tech.percentage}%` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-2">
            <ChartCard 
              title="Visitor Analytics" 
              subtitle="Traffic patterns over the last 7 months"
              actions={
                <Button variant="outline" size="sm" className="border-blue-black-500/40 text-blue-black-300 hover:bg-blue-black-500/15">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              }
            >
              <SimpleAreaChart data={visitorData} height={250} color="#486581" />
            </ChartCard>

            <ChartCard title="Project Distribution" subtitle="Active projects by category">
              <SimpleBarChart data={projectData} height={250} />
            </ChartCard>
          </div>
          
          <ChartCard title="Engagement Metrics" subtitle="User interaction and engagement rates">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-black-300 metric-value">3m 42s</div>
                <div className="text-sm text-blue-black-400">Avg. Session Duration</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400 metric-value">67.5%</div>
                <div className="text-sm text-blue-black-400">Return Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400 metric-value">4.2</div>
                <div className="text-sm text-blue-black-400">Pages per Session</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400 metric-value">2.8%</div>
                <div className="text-sm text-blue-black-400">Conversion Rate</div>
              </div>
            </div>
          </ChartCard>
        </TabsContent>
        
        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Activity Timeline</CardTitle>
              <CardDescription>Your recent actions and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="flex gap-4 pb-4 last:pb-0">
                    <div className="flex flex-col items-center">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                      {i < 7 && <div className="h-full w-[1px] bg-border" />}
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm">Updated project configuration</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}