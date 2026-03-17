import { Briefcase, Filter, Mail, Zap, Clock, TrendingUp } from "lucide-react";
import { mockDashboardStats, mockChartData } from "@/lib/mock-data";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

function StatCard({ label, value, icon: Icon, accent }: { label: string; value: string | number; icon: React.ElementType; accent?: boolean }) {
  return (
    <div className="shadow-card rounded-xl bg-card p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</span>
        <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${accent ? "bg-primary/10" : "bg-muted"}`}>
          <Icon className={`h-4 w-4 ${accent ? "text-primary" : "text-muted-foreground"}`} strokeWidth={1.5} />
        </div>
      </div>
      <span className="text-3xl font-semibold tabular-nums tracking-tight text-foreground">{value}</span>
    </div>
  );
}

export default function DashboardPage() {
  const stats = mockDashboardStats;
  return (
    <div className="p-6 max-w-[1200px] mx-auto space-y-6">
      <div>
        <h1 className="text-base font-semibold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Pipeline active. {stats.totalJobsToday} jobs processed in the last 24 hours.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard label="Jobs Found" value={stats.totalJobsToday} icon={Briefcase} accent />
        <StatCard label="After Filtering" value={stats.afterFiltering} icon={Filter} />
        <StatCard label="AI Processed" value={stats.processedByAI} icon={Zap} />
        <StatCard label="Emails Sent" value={stats.emailsSent} icon={Mail} />
        <StatCard label="Last Run" value={stats.lastRun} icon={Clock} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 shadow-card rounded-xl bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-medium text-foreground">Jobs Processed Per Day</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Last 7 days</p>
            </div>
            <TrendingUp className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={mockChartData.jobsPerDay}>
              <defs>
                <linearGradient id="jobsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(221.2, 83.2%, 53.3%)" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="hsl(221.2, 83.2%, 53.3%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid hsl(var(--border))', background: 'hsl(var(--card))' }} />
              <Area type="monotone" dataKey="jobs" stroke="hsl(221.2, 83.2%, 53.3%)" strokeWidth={1.5} fill="url(#jobsGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="shadow-card rounded-xl bg-card p-5">
          <h3 className="text-sm font-medium text-foreground mb-1">Source Distribution</h3>
          <p className="text-xs text-muted-foreground mb-4">Job sources breakdown</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={mockChartData.sourcesDistribution} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} width={70} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid hsl(var(--border))', background: 'hsl(var(--card))' }} />
              <Bar dataKey="value" fill="hsl(221.2, 83.2%, 53.3%)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
