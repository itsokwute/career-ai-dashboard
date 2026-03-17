import { useState } from "react";
import { mockJobs, type Job } from "@/lib/mock-data";
import { Search, ExternalLink, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const sources = ["All", "LinkedIn", "Indeed", "Glassdoor"] as const;

function StatusBadge({ status }: { status: Job["status"] }) {
  const styles: Record<Job["status"], string> = {
    New: "bg-primary/10 text-primary",
    Applied: "bg-muted text-muted-foreground",
    Reviewed: "bg-success/10 text-success",
    Rejected: "bg-destructive/10 text-destructive",
  };
  return (
    <span className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-semibold uppercase ${styles[status]}`}>
      {status}
    </span>
  );
}

function JobDetailPanel({ job, onClose }: { job: Job; onClose: () => void }) {
  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="fixed right-0 top-0 h-screen w-full max-w-[600px] bg-card border-l shadow-2xl z-50 overflow-y-auto"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <span className="text-xs font-mono text-primary mb-1 block">ID: {job.id}</span>
            <h2 className="text-xl font-semibold tracking-tight text-foreground">{job.title}</h2>
            <p className="text-sm text-muted-foreground mt-0.5">{job.company} • {job.location} • Posted {job.postedAt}</p>
          </div>
          <button onClick={onClose} className="h-8 w-8 rounded-lg flex items-center justify-center hover:bg-muted transition-colors">
            <X className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
          </button>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <StatusBadge status={job.status} />
          <span className="text-xs text-muted-foreground">Match: <span className="font-semibold text-foreground tabular-nums">{job.matchScore}%</span></span>
          <span className="text-xs text-muted-foreground">Source: {job.source}</span>
        </div>

        <Tabs defaultValue="description">
          <TabsList className="bg-muted p-1 rounded-lg mb-4 h-auto">
            <TabsTrigger value="description" className="text-xs rounded-md">Description</TabsTrigger>
            <TabsTrigger value="resume" className="text-xs rounded-md">AI Resume</TabsTrigger>
            <TabsTrigger value="cover" className="text-xs rounded-md">Cover Letter</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="space-y-4">
            <div className="p-4 bg-surface rounded-xl text-sm leading-relaxed text-foreground">
              {job.description}
            </div>
          </TabsContent>
          <TabsContent value="resume" className="space-y-4">
            <div className="p-4 bg-surface rounded-xl text-sm text-muted-foreground italic">
              AI-generated resume tailored for this position will appear here.
            </div>
          </TabsContent>
          <TabsContent value="cover" className="space-y-4">
            <div className="p-4 bg-surface rounded-xl text-sm text-muted-foreground italic">
              AI-generated cover letter tailored for this position will appear here.
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6 flex gap-3">
          <motion.button
            whileTap={{ scale: 0.98 }}
            className="h-9 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-all"
          >
            Send Application
          </motion.button>
          <a href="#" className="h-9 px-4 rounded-lg bg-muted text-foreground text-sm font-medium flex items-center gap-1.5 hover:bg-accent transition-colors">
            View Original <ExternalLink className="h-3 w-3" strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function JobsPage() {
  const [source, setSource] = useState<string>("All");
  const [search, setSearch] = useState("");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const filtered = mockJobs.filter((j) => {
    if (source !== "All" && j.source !== source) return false;
    if (search && !j.title.toLowerCase().includes(search.toLowerCase()) && !j.company.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="p-6 max-w-[1200px] mx-auto space-y-4">
      <div>
        <h1 className="text-base font-semibold text-foreground">Jobs Found</h1>
        <p className="text-sm text-muted-foreground mt-0.5">{mockJobs.length} jobs collected from the pipeline</p>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search jobs..."
            className="h-9 w-full rounded-lg bg-muted pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-background transition-all"
          />
        </div>
        <div className="flex gap-1">
          {sources.map((s) => (
            <button
              key={s}
              onClick={() => setSource(s)}
              className={`h-8 px-3 rounded-md text-xs font-medium transition-all ${
                source === s ? "bg-foreground text-background shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="shadow-card rounded-xl bg-card overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="text-xs font-medium text-muted-foreground py-3 px-4">Job Title</th>
              <th className="text-xs font-medium text-muted-foreground py-3 px-4">Company</th>
              <th className="text-xs font-medium text-muted-foreground py-3 px-4 hidden md:table-cell">Location</th>
              <th className="text-xs font-medium text-muted-foreground py-3 px-4 hidden lg:table-cell">Source</th>
              <th className="text-xs font-medium text-muted-foreground py-3 px-4 hidden lg:table-cell">Match</th>
              <th className="text-xs font-medium text-muted-foreground py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((job) => (
              <tr
                key={job.id}
                onClick={() => setSelectedJob(job)}
                className="border-b last:border-b-0 cursor-pointer transition-all duration-150 hover:bg-muted/50 hover:shadow-[inset_3px_0_0_0_hsl(var(--primary))]"
              >
                <td className="py-3 px-4">
                  <span className="text-sm font-medium text-foreground">{job.title}</span>
                  <span className="text-xs text-muted-foreground block mt-0.5 md:hidden">{job.company}</span>
                </td>
                <td className="py-3 px-4 text-sm text-muted-foreground hidden sm:table-cell">{job.company}</td>
                <td className="py-3 px-4 text-sm text-muted-foreground hidden md:table-cell">{job.location}</td>
                <td className="py-3 px-4 text-xs text-muted-foreground hidden lg:table-cell">{job.source}</td>
                <td className="py-3 px-4 text-sm font-medium tabular-nums text-foreground hidden lg:table-cell">{job.matchScore}%</td>
                <td className="py-3 px-4"><StatusBadge status={job.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {selectedJob && <JobDetailPanel job={selectedJob} onClose={() => setSelectedJob(null)} />}
      </AnimatePresence>
    </div>
  );
}
