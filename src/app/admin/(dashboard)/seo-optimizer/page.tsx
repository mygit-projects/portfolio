import { SeoOptimizerClient } from "@/components/admin/SeoOptimizerClient";
import { getEngineLog } from "@/lib/ai-engine/engineLog";
import { getEngineSettings } from "@/lib/ai-engine/engineSettings";
import { getFieldPins } from "@/lib/ai-engine/fieldPins";
import { getGoogleConnectionStatus } from "@/lib/ai-engine/google/snapshots";
import { getHomepageHeuristicAudit } from "@/lib/ai-engine/homepageAudit";

export default async function SeoOptimizerPage() {
  const [audit, settings, pins, log, connection] = await Promise.all([
    getHomepageHeuristicAudit(),
    getEngineSettings(),
    getFieldPins(),
    getEngineLog(12),
    getGoogleConnectionStatus(),
  ]);

  return (
    <SeoOptimizerClient
      portfolio={audit.portfolio}
      initialMetrics={audit.metrics}
      connection={connection}
      initialSettings={settings}
      initialPins={pins}
      initialLog={log}
    />
  );
}
