'use client';

import { PerformanceBenchmarkSimulator } from '@/components/sections/PerformanceBenchmarkSimulator';
import { LiveMonitoringDashboard }        from '@/components/sections/LiveMonitoringDashboard';
import { UIComponentPlayground }          from '@/components/sections/UIComponentPlayground';
import { MezzLink }                       from '@/components/sections/MezzLink';
import { IoTTelemetryDashboard }          from '@/components/sections/IoTTelemetryDashboard';
import { AutomationFlowVisualizer }       from '@/components/sections/AutomationFlowVisualizer';
import { StackConfigurator }              from '@/components/sections/StackConfigurator';
import { CodeQualityDiffViewer }          from '@/components/sections/CodeQualityDiffViewer';

export function ProjectDemo({ slug }: { slug: string }) {
  switch (slug) {
    case 'performance':        return <PerformanceBenchmarkSimulator />;
    case 'monitoring':         return <LiveMonitoringDashboard />;
    case 'ui-playground':      return <UIComponentPlayground />;
    case 'mezzlink':           return <MezzLink />;
    case 'iot-telemetry':      return <IoTTelemetryDashboard />;
    case 'automation-flow':    return <AutomationFlowVisualizer />;
    case 'stack-configurator': return <StackConfigurator />;
    case 'code-quality':       return <CodeQualityDiffViewer />;
    default:                   return null;
  }
}
