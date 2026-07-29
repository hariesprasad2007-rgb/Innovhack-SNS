import React, { useState } from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Settings, Shield, KeyRound, Check, Cpu, Eye, Database, Bell } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const [affiliateBlocking, setAffiliateBlocking] = useState(true);
  const [telemetryOptOut, setTelemetryOptOut] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <PageWrapper
      title="Integrity & Platform Settings"
      description="Configure telemetry privacy, model sensitivity, API proxy rules, and un-sponsored decision constraints."
      badge="System Configuration"
      actions={
        <Button
          variant={savedSuccess ? 'emerald' : 'outline'}
          size="sm"
          onClick={handleSave}
          className="gap-1.5 text-xs font-semibold rounded-xl hover-card-lift"
        >
          {savedSuccess ? <Check className="h-3.5 w-3.5" /> : <Settings className="h-3.5 w-3.5 text-emerald-500" />}
          {savedSuccess ? 'Saved Preferences' : 'Save Settings'}
        </Button>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 space-y-6">
          {/* Privacy & Anti-Bias Controls */}
          <Card className="apple-card border border-border/80 p-6 space-y-4 hover-card-lift">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <Shield className="h-4 w-4 text-emerald-500" /> Un-Sponsored Privacy Controls
            </h3>
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-secondary/40 border border-border/40">
                <div className="space-y-0.5">
                  <span className="font-bold text-foreground block">Strict Affiliate Block</span>
                  <span className="text-[11px] text-muted-foreground">Block sponsored rankings and referral tracking pixels</span>
                </div>
                <button
                  onClick={() => setAffiliateBlocking(!affiliateBlocking)}
                  className={`w-12 h-6 rounded-full transition-colors p-1 ${
                    affiliateBlocking ? 'bg-emerald-500' : 'bg-secondary'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      affiliateBlocking ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-secondary/40 border border-border/40">
                <div className="space-y-0.5">
                  <span className="font-bold text-foreground block">Zero Telemetry Logging</span>
                  <span className="text-[11px] text-muted-foreground">Do not log purchasing queries to external ad servers</span>
                </div>
                <button
                  onClick={() => setTelemetryOptOut(!telemetryOptOut)}
                  className={`w-12 h-6 rounded-full transition-colors p-1 ${
                    telemetryOptOut ? 'bg-emerald-500' : 'bg-secondary'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      telemetryOptOut ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </Card>

          {/* Model Proxy Status */}
          <Card className="apple-card border border-border/80 p-6 space-y-4 hover-card-lift">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <Cpu className="h-4 w-4 text-emerald-500" /> AI Synthesizer Infrastructure
            </h3>
            <div className="space-y-2.5 text-xs font-mono">
              <div className="flex justify-between py-2 border-b border-border/40">
                <span className="text-muted-foreground">Server-Side Proxy</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">/api/evaluate (Active)</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border/40">
                <span className="text-muted-foreground">Primary Model Engine</span>
                <span className="font-bold text-foreground">Gemini 2.5 Flash / Pro</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">Reasoning Pipeline Latency</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">~140ms</span>
              </div>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <Card className="apple-card border border-border/80 p-6 space-y-4 hover-card-lift">
            <CardHeader className="p-0">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <Database className="h-4 w-4 text-emerald-500" /> Local Data Storage
              </CardTitle>
              <CardDescription className="text-xs">
                Local cache & vault retention rules
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 space-y-3 text-xs">
              <div className="flex justify-between py-2 border-b border-border/40">
                <span className="text-muted-foreground">Theme Preference</span>
                <span className="font-medium text-foreground">Local Storage Sync</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border/40">
                <span className="text-muted-foreground">Decision Ledger Storage</span>
                <span className="font-medium text-foreground">IndexedDB Encryption</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">Affiliate Tracking</span>
                <span className="font-medium text-emerald-600 dark:text-emerald-400">Blocked</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageWrapper>
  );
};
