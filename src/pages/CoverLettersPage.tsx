import { mockCoverLetter, mockJobs } from "@/lib/mock-data";
import { Copy, Download, Send } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function CoverLettersPage() {
  const handleCopy = () => {
    navigator.clipboard.writeText(mockCoverLetter);
    toast.success("Cover letter copied to clipboard");
  };

  return (
    <div className="p-6 max-w-[800px] mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-base font-semibold text-foreground">Cover Letters</h1>
          <p className="text-sm text-muted-foreground mt-0.5">AI-generated cover letters for each application</p>
        </div>
        <div className="flex gap-2">
          <motion.button whileTap={{ scale: 0.98 }} onClick={handleCopy} className="h-8 px-3 rounded-lg bg-muted text-sm font-medium text-foreground flex items-center gap-1.5 hover:bg-accent transition-colors">
            <Copy className="h-3.5 w-3.5" strokeWidth={1.5} /> Copy
          </motion.button>
          <motion.button whileTap={{ scale: 0.98 }} className="h-8 px-3 rounded-lg bg-muted text-sm font-medium text-foreground flex items-center gap-1.5 hover:bg-accent transition-colors">
            <Download className="h-3.5 w-3.5" strokeWidth={1.5} /> PDF
          </motion.button>
          <motion.button whileTap={{ scale: 0.98 }} className="h-8 px-3 rounded-lg bg-primary text-sm font-medium text-primary-foreground flex items-center gap-1.5 hover:opacity-90 transition-all">
            <Send className="h-3.5 w-3.5" strokeWidth={1.5} /> Send
          </motion.button>
        </div>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2">
        {mockJobs.slice(0, 4).map((job, i) => (
          <button
            key={job.id}
            className={`shrink-0 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
              i === 0 ? "bg-foreground text-background shadow-sm" : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            {job.company} - {job.title.split(" ").slice(0, 2).join(" ")}
          </button>
        ))}
      </div>

      <div className="shadow-card rounded-xl bg-card p-6">
        <div className="mb-4">
          <span className="text-xs font-mono text-primary">For: Senior Frontend Engineer at Stripe</span>
        </div>
        <div className="text-sm leading-relaxed text-foreground whitespace-pre-line">
          {mockCoverLetter}
        </div>
      </div>
    </div>
  );
}
