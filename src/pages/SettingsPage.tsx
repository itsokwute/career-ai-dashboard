import { useState } from "react";
import { Save, Upload } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

function FieldGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      {children}
    </div>
  );
}

function Toggle({ label, defaultChecked }: { label: string; defaultChecked?: boolean }) {
  const [checked, setChecked] = useState(defaultChecked ?? false);
  return (
    <label className="flex items-center justify-between py-2 cursor-pointer group">
      <span className="text-sm text-foreground">{label}</span>
      <button
        onClick={() => setChecked(!checked)}
        className={`relative h-5 w-9 rounded-full transition-colors ${checked ? "bg-primary" : "bg-muted"}`}
      >
        <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-background shadow-sm transition-transform ${checked ? "translate-x-4" : "translate-x-0.5"}`} />
      </button>
    </label>
  );
}

export default function SettingsPage() {
  const handleSave = () => toast.success("Settings saved");

  return (
    <div className="p-6 max-w-[700px] mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-base font-semibold text-foreground">Settings</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Configure your automation pipeline</p>
        </div>
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleSave}
          className="h-9 px-4 rounded-lg bg-primary text-sm font-medium text-primary-foreground flex items-center gap-1.5 hover:opacity-90 transition-all"
        >
          <Save className="h-3.5 w-3.5" strokeWidth={1.5} /> Save
        </motion.button>
      </div>

      <div className="shadow-card rounded-xl bg-card p-6 space-y-5">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Job Search</h3>
        <FieldGroup label="Keywords">
          <input defaultValue="React, TypeScript, Frontend" className="h-9 w-full rounded-lg bg-surface px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
        </FieldGroup>
        <FieldGroup label="Preferred Locations">
          <input defaultValue="Remote, San Francisco, New York" className="h-9 w-full rounded-lg bg-surface px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
        </FieldGroup>
        <FieldGroup label="Job Titles">
          <input defaultValue="Senior Frontend Engineer, Full Stack Developer" className="h-9 w-full rounded-lg bg-surface px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
        </FieldGroup>
        <FieldGroup label="Run Frequency">
          <select defaultValue="daily" className="h-9 w-full rounded-lg bg-surface px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all">
            <option value="hourly">Every Hour</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
          </select>
        </FieldGroup>
      </div>

      <div className="shadow-card rounded-xl bg-card p-6 space-y-4">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">File Upload</h3>
        <div className="border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center gap-2 hover:border-primary/30 transition-colors cursor-pointer">
          <Upload className="h-5 w-5 text-muted-foreground" strokeWidth={1.5} />
          <p className="text-sm text-muted-foreground">Upload your base resume</p>
          <p className="text-xs text-muted-foreground">PDF, DOCX up to 5MB</p>
        </div>
      </div>

      <div className="shadow-card rounded-xl bg-card p-6 space-y-1">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">Preferences</h3>
        <Toggle label="Enable email alerts" defaultChecked />
        <Toggle label="Enable resume generation" defaultChecked />
        <Toggle label="Enable cover letters" defaultChecked />
        <Toggle label="Auto-apply to high-match jobs" />
      </div>
    </div>
  );
}
