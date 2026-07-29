import React, { useState } from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { UserCheck, Check, Lock, Sparkles, CheckCircle2 } from 'lucide-react';

export const PersonaStudioView: React.FC = () => {
  const [durabilityWeight, setDurabilityWeight] = useState(40);
  const [valueWeight, setValueWeight] = useState(35);
  const [ergonomicWeight, setErgonomicWeight] = useState(25);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <PageWrapper
      title="Persona Studio"
      description="Calibrate custom buyer profiles, priority weightings, sustainability thresholds, and dealbreaker parameters."
      badge="Custom Evaluator Weights"
      actions={
        <Button
          variant={savedSuccess ? 'emerald' : 'outline'}
          size="sm"
          onClick={handleSave}
          className="gap-2 text-xs font-semibold rounded-xl hover-card-lift py-2 px-3.5"
        >
          {savedSuccess ? <Check className="h-4 w-4" /> : <Sparkles className="h-4 w-4 text-emerald-500" />}
          {savedSuccess ? 'Saved Weights' : 'Save Profile Weights'}
        </Button>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Interactive Weight Sliders */}
        <div className="lg:col-span-7 space-y-6">
          <Card className="apple-card border border-border/80 p-6 sm:p-8 space-y-6 hover-card-lift">
            <div className="flex items-center justify-between pb-3 border-b border-border/60">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block">
                  Interactive Calibrator
                </span>
                <h3 className="text-base font-bold text-foreground">
                  Evaluator Priority Weighting
                </h3>
              </div>
              <Badge variant="emerald" className="text-[10px]">
                Active Profile: Pragmatist
              </Badge>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-foreground">Longevity & Material Durability</span>
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{durabilityWeight}% Weight</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="70"
                  value={durabilityWeight}
                  onChange={(e) => setDurabilityWeight(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer h-2 bg-secondary rounded-lg"
                />
                <div className="w-full bg-secondary h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full transition-all duration-300" style={{ width: `${durabilityWeight}%` }} />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-foreground">Price-to-Unbiased-Value Ratio</span>
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{valueWeight}% Weight</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="70"
                  value={valueWeight}
                  onChange={(e) => setValueWeight(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer h-2 bg-secondary rounded-lg"
                />
                <div className="w-full bg-secondary h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full transition-all duration-300" style={{ width: `${valueWeight}%` }} />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-foreground">Aesthetic & Ergonomic Fit</span>
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{ergonomicWeight}% Weight</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="70"
                  value={ergonomicWeight}
                  onChange={(e) => setErgonomicWeight(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer h-2 bg-secondary rounded-lg"
                />
                <div className="w-full bg-secondary h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full transition-all duration-300" style={{ width: `${ergonomicWeight}%` }} />
                </div>
              </div>
            </div>
          </Card>

          {/* Dealbreaker Rules */}
          <Card className="apple-card border border-border/80 p-6 sm:p-8 space-y-5 hover-card-lift">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <Lock className="h-4 w-4 text-emerald-500" /> Mandatory Dealbreaker Rules
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {[
                { title: 'Zero Mandatory App Subscription', desc: 'Exclude products requiring cloud paywalls.' },
                { title: 'Prescription Glasses Clearance', desc: 'Filter out headphones exerting >4.5N clamping force.' },
                { title: '10-Year Part Availability', desc: 'Demand standard screw fittings & replaceable batteries.' },
                { title: 'Zero Sponsored Ranking Bias', desc: 'Block affiliate monetization algorithms.' },
              ].map((rule, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-secondary/40 border border-border/50 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    <span>{rule.title}</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{rule.desc}</p>
                  <div className="w-full bg-secondary h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: '100%' }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column: Parameters Summary */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="apple-card border border-border/80 p-6 sm:p-8 space-y-5 hover-card-lift">
            <CardHeader className="p-0">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <UserCheck className="h-4 w-4 text-emerald-500" /> Active Persona Card
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                Current evaluation profile parameters
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 space-y-4 text-xs">
              <div className="space-y-1.5 py-1.5 border-b border-border/40">
                <div className="flex justify-between font-medium">
                  <span className="text-muted-foreground">Longevity & Durability</span>
                  <span className="font-bold text-foreground">{durabilityWeight}% Weight</span>
                </div>
                <div className="w-full bg-secondary h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${durabilityWeight}%` }} />
                </div>
              </div>

              <div className="space-y-1.5 py-1.5 border-b border-border/40">
                <div className="flex justify-between font-medium">
                  <span className="text-muted-foreground">Price-to-Value Ratio</span>
                  <span className="font-bold text-foreground">{valueWeight}% Weight</span>
                </div>
                <div className="w-full bg-secondary h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${valueWeight}%` }} />
                </div>
              </div>

              <div className="space-y-1.5 py-1.5 border-b border-border/40">
                <div className="flex justify-between font-medium">
                  <span className="text-muted-foreground">Aesthetic & Ergonomic Fit</span>
                  <span className="font-bold text-foreground">{ergonomicWeight}% Weight</span>
                </div>
                <div className="w-full bg-secondary h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${ergonomicWeight}%` }} />
                </div>
              </div>

              <div className="space-y-1.5 py-1.5">
                <div className="flex justify-between font-medium">
                  <span className="text-muted-foreground">Privacy & Telemetry Strictness</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">Zero Sponsored Ads</span>
                </div>
                <div className="w-full bg-secondary h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '100%' }} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageWrapper>
  );
};
