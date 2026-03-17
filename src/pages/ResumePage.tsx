import { mockResume } from "@/lib/mock-data";
import { Copy, Download, Edit3 } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{title}</h3>
      {children}
    </div>
  );
}

export default function ResumePage() {
  const resume = mockResume;

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(resume, null, 2));
    toast.success("Resume copied to clipboard");
  };

  return (
    <div className="p-6 max-w-[800px] mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-base font-semibold text-foreground">Resume Generator</h1>
          <p className="text-sm text-muted-foreground mt-0.5">AI-generated resume tailored to job matches</p>
        </div>
        <div className="flex gap-2">
          <motion.button whileTap={{ scale: 0.98 }} onClick={handleCopy} className="h-8 px-3 rounded-lg bg-muted text-sm font-medium text-foreground flex items-center gap-1.5 hover:bg-accent transition-colors">
            <Copy className="h-3.5 w-3.5" strokeWidth={1.5} /> Copy
          </motion.button>
          <motion.button whileTap={{ scale: 0.98 }} className="h-8 px-3 rounded-lg bg-muted text-sm font-medium text-foreground flex items-center gap-1.5 hover:bg-accent transition-colors">
            <Download className="h-3.5 w-3.5" strokeWidth={1.5} /> PDF
          </motion.button>
          <motion.button whileTap={{ scale: 0.98 }} className="h-8 px-3 rounded-lg bg-primary text-sm font-medium text-primary-foreground flex items-center gap-1.5 hover:opacity-90 transition-all">
            <Edit3 className="h-3.5 w-3.5" strokeWidth={1.5} /> Edit
          </motion.button>
        </div>
      </div>

      <div className="shadow-card rounded-xl bg-card p-6 space-y-6">
        <Section title="Summary">
          <p className="text-sm leading-relaxed text-foreground">{resume.summary}</p>
        </Section>

        <Section title="Experience">
          <div className="space-y-4">
            {resume.experience.map((exp, i) => (
              <div key={i} className="p-4 bg-surface rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-medium text-foreground">{exp.role}</h4>
                  <span className="text-xs text-muted-foreground tabular-nums">{exp.period}</span>
                </div>
                <p className="text-xs text-primary font-medium mb-2">{exp.company}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Skills">
          <div className="flex flex-wrap gap-1.5">
            {resume.skills.map((skill) => (
              <span key={skill} className="px-2.5 py-1 rounded-md bg-muted text-xs font-medium text-foreground">
                {skill}
              </span>
            ))}
          </div>
        </Section>

        <Section title="Education">
          {resume.education.map((edu, i) => (
            <div key={i} className="p-4 bg-surface rounded-lg">
              <h4 className="text-sm font-medium text-foreground">{edu.degree}</h4>
              <p className="text-xs text-muted-foreground">{edu.school} • {edu.year}</p>
            </div>
          ))}
        </Section>
      </div>
    </div>
  );
}
