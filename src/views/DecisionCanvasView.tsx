import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  BrainCircuit,
  Compass,
  Bookmark,
  Layers,
  Activity,
  Check,
  ChevronRight,
  Lightbulb,
} from 'lucide-react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { ProductCard } from '../components/ui/ProductCard';
import { AIThinkingAnimation } from '../components/ui/AIThinkingAnimation';
import { CardSkeleton } from '../components/ui/Skeleton';
import { useKeyboardShortcut } from '../hooks/useKeyboardShortcut';
import { MOCK_BUYING_SCENARIOS, BuyingScenario, getProductImage, getProductRating } from '../lib/mockData';

export const DecisionCanvasView: React.FC = () => {
  const navigate = useNavigate();
  const [activeScenario, setActiveScenario] = useState<BuyingScenario>(MOCK_BUYING_SCENARIOS[0]);
  const [queryInput, setQueryInput] = useState(MOCK_BUYING_SCENARIOS[0].query);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [showReasoningTrace, setShowReasoningTrace] = useState(true);
  const [savedToVault, setSavedToVault] = useState(false);

  // Context memory state
  const [contextMemory] = useState([
    { id: 'm1', label: 'Eyeglass Frame Clearance', type: 'Ergonomic', match: 98 },
    { id: 'm2', label: 'Zero Subscription Lock', type: 'Policy', match: 100 },
    { id: 'm3', label: 'Max $450 Budget Ceiling', type: 'Financial', match: 92 },
    { id: 'm4', label: 'Multi-device Bluetooth', type: 'Technical', match: 95 },
  ]);

  // Keyboard shortcuts
  useKeyboardShortcut({ key: 'e', metaOrControl: true }, () => handleEvaluate());
  useKeyboardShortcut({ key: 'r', metaOrControl: true }, () =>
    setShowReasoningTrace((prev) => !prev)
  );

  const handleEvaluate = () => {
    if (!queryInput.trim() || isSynthesizing) return;
    setIsSynthesizing(true);
    setTimeout(() => {
      setIsSynthesizing(false);
    }, 750);
  };

  const handleSelectPreset = (scenario: BuyingScenario) => {
    setIsSynthesizing(true);
    setQueryInput(scenario.query);
    setTimeout(() => {
      setActiveScenario(scenario);
      setIsSynthesizing(false);
    }, 600);
  };

  const handleSaveToVault = () => {
    setSavedToVault(true);
    setTimeout(() => setSavedToVault(false), 2500);
  };

  const candidateImage = activeScenario.topRecommendation.image || getProductImage(activeScenario.topRecommendation.name);
  const candidateRating = getProductRating(activeScenario.topRecommendation.name);

  return (
    <PageWrapper
      title="AI Decision Workspace"
      description="Smart purchasing assistant that evaluates technical teardowns, non-negotiable tradeoffs, and your intent rules to deliver unbiased product choices."
      badge="DoubleShift-AI Intelligence"
      actions={
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowReasoningTrace((prev) => !prev)}
            className="gap-2 text-xs font-semibold rounded-xl hover-card-lift py-2 px-3.5"
          >
            <BrainCircuit className="h-4 w-4 text-emerald-500" />
            {showReasoningTrace ? 'Hide AI Thinking' : 'View AI Thinking'}
          </Button>

          <Button
            variant={savedToVault ? 'emerald' : 'glass'}
            size="sm"
            onClick={handleSaveToVault}
            className="gap-2 text-xs font-semibold rounded-xl hover-card-lift py-2 px-3.5"
          >
            {savedToVault ? (
              <>
                <Check className="h-4 w-4" /> Saved to Vault
              </>
            ) : (
              <>
                <Bookmark className="h-4 w-4" /> Save Decision
              </>
            )}
          </Button>
        </div>
      }
    >
      <div className="space-y-8">
        {/* Clean Status Card Header with Progress Indicators */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl apple-card border border-border/80 space-y-2.5 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <Activity className="h-5 w-5 text-emerald-500 animate-pulse" />
                </div>
                <div>
                  <span className="text-xs text-muted-foreground font-medium block">Match Confidence</span>
                  <span className="text-lg font-extrabold text-foreground font-mono">{activeScenario.confidenceScore}%</span>
                </div>
              </div>
              <Badge variant="emerald" className="text-[10px]">High Accuracy</Badge>
            </div>
            <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${activeScenario.confidenceScore}%` }} />
            </div>
          </div>

          <div className="p-4 rounded-2xl apple-card border border-border/80 space-y-2.5 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
                  <ShieldCheck className="h-5 w-5 text-teal-500" />
                </div>
                <div>
                  <span className="text-xs text-muted-foreground font-medium block">Unbiased Rules</span>
                  <span className="text-lg font-extrabold text-foreground font-mono">4 Enforced</span>
                </div>
              </div>
              <Badge variant="outline" className="text-[10px]">Zero Ads</Badge>
            </div>
            <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
              <div className="bg-teal-500 h-full rounded-full transition-all duration-500" style={{ width: '100%' }} />
            </div>
          </div>

          <div className="p-4 rounded-2xl apple-card border border-border/80 space-y-2.5 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                  <Sparkles className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <span className="text-xs text-muted-foreground font-medium block">Evaluation Engine</span>
                  <span className="text-base font-bold text-foreground">Perplexity AI</span>
                </div>
              </div>
              <Badge variant="secondary" className="text-[10px]">v2.4 Active</Badge>
            </div>
            <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
              <div className="bg-amber-500 h-full rounded-full transition-all duration-500" style={{ width: '98%' }} />
            </div>
          </div>
        </div>

        {/* 3-Column Grid with Generous Spacing */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Panel 1: Intent Rules & Scenario Presets (3 cols) */}
          <div className="lg:col-span-3 space-y-6">
            {/* Intent Rules Card with Progress Meters */}
            <Card className="apple-card hover-card-lift p-6 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-border/50">
                <div className="flex items-center gap-2">
                  <Layers className="h-4 w-4 text-emerald-500" />
                  <CardTitle className="text-sm font-bold text-foreground">Intent Rules</CardTitle>
                </div>
                <Badge variant="outline" className="text-[10px]">4 Active</Badge>
              </div>
              <CardDescription className="text-xs text-muted-foreground">
                Your personal evaluation preferences & constraints.
              </CardDescription>

              <div className="space-y-3 pt-1">
                {contextMemory.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-2xl bg-secondary/50 border border-border/50 space-y-1.5 hover:border-emerald-500/40 transition-all"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-foreground text-xs truncate">{item.label}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-background text-muted-foreground font-medium border border-border/40">
                        {item.type}
                      </span>
                    </div>
                    <div className="w-full bg-secondary h-1.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${item.match}%` }} />
                    </div>
                  </div>
                ))}

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/personas')}
                  className="w-full text-xs gap-1.5 text-muted-foreground hover:text-foreground mt-2 rounded-xl py-2"
                >
                  Calibrate Persona Studio <ChevronRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </Card>

            {/* Presets with Product Thumbnails */}
            <Card className="apple-card hover-card-lift p-6 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-border/50">
                <div className="flex items-center gap-2">
                  <Compass className="h-4 w-4 text-emerald-500" />
                  <CardTitle className="text-sm font-bold text-foreground">Featured Scenarios</CardTitle>
                </div>
              </div>

              <div className="space-y-3">
                {MOCK_BUYING_SCENARIOS.map((scenario) => {
                  const thumbImg = scenario.topRecommendation.image || getProductImage(scenario.topRecommendation.name);
                  const isSelected = activeScenario.id === scenario.id;
                  return (
                    <button
                      key={scenario.id}
                      onClick={() => handleSelectPreset(scenario)}
                      className={`w-full text-left p-3 rounded-2xl border text-xs transition-all duration-200 flex items-center gap-3.5 ${
                        isSelected
                          ? 'bg-emerald-500/10 border-emerald-500/60 ring-2 ring-emerald-500/20 shadow-sm'
                          : 'bg-card hover:bg-secondary/60 border-border/60 text-foreground'
                      }`}
                    >
                      {/* Product Thumbnail Beside Recommendation */}
                      <img
                        src={thumbImg}
                        alt={scenario.topRecommendation.name}
                        className="w-12 h-12 rounded-xl object-cover shrink-0 border border-border/60 shadow-2xs"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                            {scenario.category}
                          </span>
                          <span className="font-mono text-[10px] text-muted-foreground font-semibold">{scenario.targetBudget}</span>
                        </div>
                        <p className="line-clamp-1 text-xs font-bold text-foreground leading-tight">
                          {scenario.topRecommendation.name}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Panel 2: AI Shopping Assistant & Evaluation Summary (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Prompt Card */}
            <Card className="apple-card border-emerald-500/30 shadow-md p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <h3 className="text-sm font-bold text-foreground">Shopping Intent Assistant</h3>
                </div>
                <Badge variant="emerald" className="text-[10px]">Unsponsored Analysis</Badge>
              </div>

              <div className="relative space-y-3">
                <textarea
                  value={queryInput}
                  onChange={(e) => setQueryInput(e.target.value)}
                  rows={3}
                  className="w-full rounded-2xl border border-input bg-background/90 p-4 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 transition-all placeholder:text-muted-foreground/50 resize-none font-sans leading-relaxed shadow-inner"
                  placeholder="Describe your ideal product, key features, or budget needs..."
                />

                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                    <Lightbulb className="h-3.5 w-3.5 text-amber-500" /> Express constraints or target price
                  </span>

                  <Button
                    size="sm"
                    variant="emerald"
                    onClick={handleEvaluate}
                    disabled={isSynthesizing || !queryInput.trim()}
                    className="gap-2 text-xs font-semibold rounded-xl shadow-xs py-2 px-4 hover-card-lift"
                  >
                    {isSynthesizing ? (
                      <>
                        <Sparkles className="h-3.5 w-3.5 animate-spin" /> Evaluating...
                      </>
                    ) : (
                      <>
                        Analyze Intent <ArrowRight className="h-3.5 w-3.5" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </Card>

            {/* AI Thinking Animation Component */}
            {isSynthesizing ? (
              <AIThinkingAnimation label="Synthesizing Purchasing Verdict" />
            ) : null}

            {/* AI Reasoning Pipeline */}
            {showReasoningTrace && !isSynthesizing && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
              >
                <Card className="apple-card border border-border/80 bg-secondary/30 p-6 space-y-4 shadow-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-border/50">
                    <span className="flex items-center gap-2 text-xs font-bold text-foreground">
                      <BrainCircuit className="h-4 w-4 text-emerald-500" /> AI Thinking Steps
                    </span>
                    <Badge variant="outline" className="text-[10px] font-mono">140ms Latency</Badge>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-background/80 border border-border/50 space-y-1">
                      <span className="flex h-6 w-6 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        1
                      </span>
                      <div className="space-y-1 flex-1">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-foreground text-xs">Intent & Rule Extraction</span>
                          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400">Step 1 Complete</span>
                        </div>
                        <p className="text-muted-foreground text-xs leading-relaxed">Parsed eyeglass clearance, active acoustic isolation, and zero pressure points.</p>
                        <div className="w-full bg-secondary h-1.5 rounded-full overflow-hidden mt-1">
                          <div className="bg-emerald-500 h-full rounded-full" style={{ width: '100%' }} />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-background/80 border border-border/50 space-y-1">
                      <span className="flex h-6 w-6 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        2
                      </span>
                      <div className="space-y-1 flex-1">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-foreground text-xs">Teardown & Review Audit</span>
                          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400">Step 2 Complete</span>
                        </div>
                        <p className="text-muted-foreground text-xs leading-relaxed">Scanned 42 premium models. Filtered out models prone to earcup fatigue or headband cracks.</p>
                        <div className="w-full bg-secondary h-1.5 rounded-full overflow-hidden mt-1">
                          <div className="bg-emerald-500 h-full rounded-full" style={{ width: '100%' }} />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-background/80 border border-border/50 space-y-1">
                      <span className="flex h-6 w-6 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        3
                      </span>
                      <div className="space-y-1 flex-1">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-foreground text-xs">Unbiased Calibration</span>
                          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400">Score Calibrated</span>
                        </div>
                        <p className="text-muted-foreground text-xs leading-relaxed">Zero sponsored links. Calibrated top recommendation to {activeScenario.confidenceScore}% confidence.</p>
                        <div className="w-full bg-secondary h-1.5 rounded-full overflow-hidden mt-1">
                          <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${activeScenario.confidenceScore}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Synthesized Verdict Card */}
            {isSynthesizing ? (
              <CardSkeleton rows={3} />
            ) : (
              <Card className="apple-card hover-card-lift p-6 space-y-5">
                <div className="flex items-center justify-between pb-2 border-b border-border/50">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-emerald-500" />
                    <CardTitle className="text-sm font-bold text-foreground">AI Evaluation Summary</CardTitle>
                  </div>
                  <Badge variant="emerald" className="text-[10px]">100% Unsponsored</Badge>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-foreground font-medium text-xs leading-relaxed flex items-start gap-3">
                  <img src={candidateImage} alt="Thumb" className="w-10 h-10 rounded-xl object-cover shrink-0 border border-border/50" />
                  <div>{activeScenario.verdict}</div>
                </div>

                <div className="space-y-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                    Evaluated Key Value Drivers
                  </span>
                  <div className="grid grid-cols-1 gap-2.5">
                    {activeScenario.topRecommendation.matchReasons.map((reason, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/40 border border-border/50 text-xs">
                        <img
                          src={candidateImage}
                          alt="Thumb"
                          className="w-8 h-8 rounded-lg object-cover shrink-0 border border-border/40"
                        />
                        <span className="text-foreground font-medium text-xs leading-normal flex-1">{reason}</span>
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Panel 3: Product Candidate Card (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <ProductCard
              name={activeScenario.topRecommendation.name}
              subtitle={activeScenario.topRecommendation.subtitle}
              price={activeScenario.topRecommendation.estimatedPrice}
              matchScore={activeScenario.confidenceScore}
              rating={candidateRating}
              image={candidateImage}
              keyBenefits={activeScenario.topRecommendation.matchReasons}
              badge="Top Candidate"
              isWinner={true}
              isSaved={savedToVault}
              isLoading={isSynthesizing}
              onCompare={() => navigate('/tradeoffs')}
              onSave={handleSaveToVault}
            />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};
