import { mockLogs } from "@/lib/mock-data";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";

const statusConfig = {
  success: { icon: CheckCircle2, color: "text-success", ring: "bg-success", label: "Success" },
  running: { icon: Loader2, color: "text-primary", ring: "bg-primary", label: "Running" },
  error: { icon: XCircle, color: "text-destructive", ring: "bg-destructive", label: "Error" },
};

export default function LogsPage() {
  return (
    <div className="p-6 max-w-[900px] mx-auto space-y-6">
      <div>
        <h1 className="text-base font-semibold text-foreground">Automation Logs</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Pipeline execution history from n8n workflow</p>
      </div>

      <div className="shadow-card rounded-xl bg-card overflow-hidden">
        <div className="p-4 border-b">
          <span className="text-xs font-medium text-muted-foreground">Latest Run — March 15, 2024 14:32 UTC</span>
        </div>

        <div className="relative">
          {/* Vertical stepper line */}
          <div className="absolute left-[29px] top-0 bottom-0 w-px bg-border" />

          {mockLogs.map((log, i) => {
            const config = statusConfig[log.status];
            const Icon = config.icon;
            return (
              <div key={log.id} className="relative flex items-start gap-4 p-4 hover:bg-muted/30 transition-colors">
                <div className="relative z-10 flex-shrink-0 mt-0.5">
                  <div className={`h-[18px] w-[18px] rounded-full flex items-center justify-center ${config.ring}/10 ring-2 ring-offset-2 ring-offset-card ${config.ring.replace("bg-", "ring-")}`}>
                    <div className={`h-2 w-2 rounded-full ${config.ring} ${log.status === "running" ? "animate-pulse" : ""}`} />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-foreground">{log.stage}</span>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold uppercase ${
                      log.status === "success" ? "bg-success/10 text-success" :
                      log.status === "running" ? "bg-primary/10 text-primary" :
                      "bg-destructive/10 text-destructive"
                    }`}>
                      <Icon className={`h-3 w-3 ${log.status === "running" ? "animate-spin" : ""}`} strokeWidth={1.5} />
                      {config.label}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground tabular-nums">{log.timestamp}</p>
                  <pre className="mt-2 p-2.5 bg-surface rounded-md font-mono text-xs text-muted-foreground overflow-x-auto">
                    {log.result}
                  </pre>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
