import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  GitCompare,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Zap,
  Layers,
  Compass,
  CheckCircle2,
} from 'lucide-react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card } from '../components/ui/card';
import { ProductCard } from '../components/ui/ProductCard';
import { CardSkeleton } from '../components/ui/Skeleton';
import { getProductImage, getProductRating } from '../lib/mockData';
import { ComparisonStudioCategory, ProductService } from '../services/ProductService';

export const TradeoffMatrixView: React.FC = () => {
  const navigate = useNavigate();

  // Active Category Studio
  const [studios, setStudios] = useState<ComparisonStudioCategory[]>([]);
  const [activeStudio, setActiveStudio] = useState<ComparisonStudioCategory | null>(null);
  const [isLoadingStudio, setIsLoadingStudio] = useState(true);

  // Selected Products filter
  const [pinnedProducts, setPinnedProducts] = useState<Record<string, boolean>>({});

  // View Mode: 'cards' | 'vectors' | 'budget'
  const [viewMode, setViewMode] = useState<'cards' | 'vectors' | 'budget'>('cards');

  // Accordions expanded state for each product
  const [expandedSpecs, setExpandedSpecs] = useState<Record<string, Record<string, boolean>>>({});

  // Active Vector selected for deep dive focus
  const [selectedVectorId, setSelectedVectorId] = useState<string>('');

  // Budget Simulation Slider state
  const [maxBudgetFilter, setMaxBudgetFilter] = useState<number>(500);

  useEffect(() => {
    ProductService.loadComparisonStudios().then((loadedStudios) => {
      setStudios(loadedStudios);
      setActiveStudio(loadedStudios[0] ?? null);
      setSelectedVectorId(loadedStudios[0]?.tradeoffVectors[0]?.id || '');
      setIsLoadingStudio(false);
    }).catch(() => setIsLoadingStudio(false));
  }, []);

  const handleSelectStudio = (studio: ComparisonStudioCategory) => {
    if (studio.id === activeStudio?.id) return;
    setIsLoadingStudio(true);
    setActiveStudio(studio);
    setSelectedVectorId(studio.tradeoffVectors[0]?.id || '');
    setTimeout(() => {
      setIsLoadingStudio(false);
    }, 450);
  };

  const toggleSpecSection = (productId: string, sectionKey: string) => {
    setExpandedSpecs((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [sectionKey]: !prev[productId]?.[sectionKey],
      },
    }));
  };

  const togglePinVault = (productId: string) => {
    setPinnedProducts((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const activeVector = activeStudio?.tradeoffVectors.find((v) => v.id === selectedVectorId) || activeStudio?.tradeoffVectors[0];

  return (
    <PageWrapper
      title="Comparison Studio"
      description="Interactive side-by-side decision engine. Tradeoff spectrum analysis, 5-year budget analysis, confidence meters, and un-sponsored AI verdicts."
      badge="Decision Engine"
      actions={
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/forensics')}
            className="gap-2 text-xs font-semibold rounded-xl hover-card-lift py-2 px-3.5"
          >
            <ShieldCheck className="h-4 w-4 text-emerald-500" /> Forensics Teardown
          </Button>
          <Button
            variant="emerald"
            size="sm"
            onClick={() => navigate('/recommendations')}
            className="gap-2 text-xs font-semibold rounded-xl hover-card-lift py-2 px-3.5"
          >
            <Compass className="h-4 w-4" /> Editorial Dossiers
          </Button>
        </div>
      }
    >
      <div className="space-y-8">
        {/* Studio Category Navigation Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 p-6 rounded-3xl apple-card border border-border/80 shadow-xs">
          {/* Left Category Tabs */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <Layers className="h-4 w-4 text-emerald-500" /> Active Comparison Studio
            </span>
            <div className="flex flex-wrap gap-3">
              {studios.map((studio) => {
                const isActive = studio.id === activeStudio?.id;
                return (
                  <button
                    key={studio.id}
                    onClick={() => handleSelectStudio(studio)}
                    className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2.5 ${
                      isActive
                        ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20 scale-[1.02]'
                        : 'bg-secondary/60 text-muted-foreground hover:text-foreground hover:bg-secondary'
                    }`}
                  >
                    <span>{studio.title}</span>
                    <Badge
                      variant={isActive ? 'outline' : 'secondary'}
                      className={`text-[10px] ${isActive ? 'border-slate-950/40 text-slate-950 font-bold' : ''}`}
                    >
                      {studio.products.length} Candidates
                    </Badge>
                  </button>
                );
              })}
            </div>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center bg-secondary/50 p-1.5 rounded-2xl border border-border/60 self-start lg:self-auto gap-1">
            <button
              onClick={() => setViewMode('cards')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                viewMode === 'cards'
                  ? 'bg-background text-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Side-by-Side Cards
            </button>
            <button
              onClick={() => setViewMode('vectors')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                viewMode === 'vectors'
                  ? 'bg-background text-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Tradeoff Vectors
            </button>
            <button
              onClick={() => setViewMode('budget')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                viewMode === 'budget'
                  ? 'bg-background text-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              5-Year Total Cost
            </button>
          </div>
        </div>

        {/* Main Content with Loading Skeletons */}
        {isLoadingStudio || !activeStudio ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <CardSkeleton rows={4} />
            <CardSkeleton rows={4} />
            <CardSkeleton rows={4} />
          </div>
        ) : (
          <motion.div
            key={activeStudio.id + viewMode}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* VIEW MODE 1: SIDE-BY-SIDE PRODUCT CARDS WITH THUMBNAILS */}
            {viewMode === 'cards' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {activeStudio.products.map((product) => {
                    const prodImage = product.image || getProductImage(product.name);
                    const prodRating = getProductRating(product.name);
                    const isPinned = !!pinnedProducts[product.id];
                    return (
                      <div key={product.id} className="space-y-4">
                        <ProductCard
                          id={product.id}
                          name={product.name}
                          subtitle={`${product.brand} · ${product.modelCode}`}
                          price={product.estimatedPrice}
                          matchScore={product.confidenceScore}
                          rating={prodRating}
                          image={prodImage}
                          keyBenefits={product.pros}
                          badge={product.isTopRecommendation ? 'AI Recommended Winner' : 'Candidate'}
                          isWinner={product.isTopRecommendation}
                          isSaved={isPinned}
                          onCompare={() => setSelectedVectorId(activeStudio.tradeoffVectors[0]?.id || '')}
                          onSave={() => togglePinVault(product.id)}
                        />

                        {/* Accordion Specs Clean Cards */}
                        <Card className="apple-card border border-border/80 p-5 space-y-3">
                          <button
                            onClick={() => toggleSpecSection(product.id, 'hardware')}
                            className="w-full flex items-center justify-between text-xs font-bold text-foreground py-1"
                          >
                            <span className="flex items-center gap-2">
                              <img src={prodImage} alt="Thumb" className="w-5 h-5 rounded-md object-cover" />
                              Hardware & Build Teardown
                            </span>
                            {expandedSpecs[product.id]?.hardware ? (
                              <ChevronUp className="h-4 w-4 text-emerald-500" />
                            ) : (
                              <ChevronDown className="h-4 w-4 text-muted-foreground" />
                            )}
                          </button>

                          {expandedSpecs[product.id]?.hardware && (
                            <div className="space-y-3 pt-2 border-t border-border/50 text-xs">
                              <div className="space-y-1">
                                <div className="flex justify-between text-xs font-medium">
                                  <span className="text-muted-foreground">Driver Architecture</span>
                                  <span className="font-semibold text-foreground">{product.specs.driverType || '40mm Dynamic'}</span>
                                </div>
                                <div className="w-full bg-secondary h-1.5 rounded-full overflow-hidden">
                                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '92%' }} />
                                </div>
                              </div>

                              <div className="space-y-1">
                                <div className="flex justify-between text-xs font-medium">
                                  <span className="text-muted-foreground">Acoustic Isolation</span>
                                  <span className="font-semibold text-foreground">{product.specs.ancMode || 'Active Custom ANC'}</span>
                                </div>
                                <div className="w-full bg-secondary h-1.5 rounded-full overflow-hidden">
                                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '96%' }} />
                                </div>
                              </div>

                              <div className="space-y-1">
                                <div className="flex justify-between text-xs font-medium">
                                  <span className="text-muted-foreground">Battery Lifespan</span>
                                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">{product.specs.batteryHours || 30} Hours</span>
                                </div>
                                <div className="w-full bg-secondary h-1.5 rounded-full overflow-hidden">
                                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '85%' }} />
                                </div>
                              </div>
                            </div>
                          )}
                        </Card>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* VIEW MODE 2: TRADEOFF VECTORS SPECTRUM */}
            {viewMode === 'vectors' && (
              <div className="space-y-8">
                <Card className="apple-card border border-border/80 p-6 space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-border/60">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                        <GitCompare className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-foreground">Tradeoff Spectrum Analysis</h3>
                        <p className="text-xs text-muted-foreground">Compare exact engineered performance vs compromise parameters.</p>
                      </div>
                    </div>
                  </div>

                  {/* Vector Selector Buttons */}
                  <div className="flex flex-wrap gap-3">
                    {activeStudio.tradeoffVectors.map((vec) => {
                      const isSelected = vec.id === selectedVectorId;
                      return (
                        <button
                          key={vec.id}
                          onClick={() => setSelectedVectorId(vec.id)}
                          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                            isSelected
                              ? 'bg-emerald-500 text-slate-950 shadow-md scale-[1.02]'
                              : 'bg-secondary/60 text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          {vec.name}
                        </button>
                      );
                    })}
                  </div>

                  {/* Active Vector Breakdown */}
                  {activeVector && (
                    <div className="p-6 rounded-3xl bg-secondary/30 border border-border/60 space-y-6">
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold text-foreground">{activeVector.name} Spectrum</h4>
                        <p className="text-xs text-muted-foreground">{activeVector.description}</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {activeStudio.products.map((product, idx) => {
                          const prodImage = product.image || getProductImage(product.name);
                          const scoreVal = 9.4 - idx * 0.4;
                          const fillPct = Math.round((scoreVal / 10) * 100);
                          return (
                            <div key={product.id} className="p-5 rounded-2xl apple-card border border-border/60 space-y-4">
                              <div className="flex items-center gap-3">
                                <img src={prodImage} alt={product.name} className="w-12 h-12 rounded-xl object-cover border border-border/50 shadow-2xs" />
                                <div className="min-w-0 flex-1">
                                  <h5 className="text-xs font-bold text-foreground truncate">{product.name}</h5>
                                  <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">{product.estimatedPrice}</span>
                                </div>
                              </div>

                              <div className="space-y-2">
                                <div className="flex justify-between text-xs font-bold">
                                  <span className="text-muted-foreground">Vector Score</span>
                                  <span className="text-emerald-600 dark:text-emerald-400 font-mono">{scoreVal.toFixed(1)} / 10</span>
                                </div>
                                <div className="w-full bg-secondary h-2.5 rounded-full overflow-hidden">
                                  <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${fillPct}%` }} />
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </Card>
              </div>
            )}

            {/* VIEW MODE 3: 5-YEAR TOTAL COST OF OWNERSHIP */}
            {viewMode === 'budget' && (
              <div className="space-y-8">
                <Card className="apple-card border border-border/80 p-6 space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-border/60">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
                        <Zap className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-foreground">5-Year Total Cost of Ownership</h3>
                        <p className="text-xs text-muted-foreground">Factoring replacement parts, mandatory subscriptions, and resale liquidity.</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs font-semibold text-muted-foreground">Budget Ceiling:</span>
                      <input
                        type="range"
                        min="200"
                        max="800"
                        value={maxBudgetFilter}
                        onChange={(e) => setMaxBudgetFilter(Number(e.target.value))}
                        className="accent-emerald-500 cursor-pointer h-2 bg-secondary rounded-lg"
                      />
                      <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">${maxBudgetFilter}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {activeStudio.products.map((product) => {
                      const prodImage = product.image || getProductImage(product.name);
                      return (
                        <div key={product.id} className="p-6 rounded-3xl apple-card border border-border/80 space-y-4 hover-card-lift">
                          <div className="flex items-center gap-3 pb-3 border-b border-border/40">
                            <img src={prodImage} alt={product.name} className="w-12 h-12 rounded-xl object-cover border border-border/60 shadow-2xs" />
                            <div>
                              <h4 className="text-xs font-bold text-foreground truncate">{product.name}</h4>
                              <span className="text-[10px] text-muted-foreground">{product.brand}</span>
                            </div>
                          </div>

                          <div className="space-y-3 text-xs">
                            <div className="flex justify-between py-1 border-b border-border/30">
                              <span className="text-muted-foreground">Initial Retail Price</span>
                              <span className="font-mono font-bold text-foreground">{product.estimatedPrice}</span>
                            </div>
                            <div className="flex justify-between py-1 border-b border-border/30">
                              <span className="text-muted-foreground">5-Yr App Subscriptions</span>
                              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">$0 (Zero Lock)</span>
                            </div>
                            <div className="flex justify-between py-1 border-b border-border/30">
                              <span className="text-muted-foreground">Est. Ear-pad Replacements</span>
                              <span className="font-mono font-bold text-foreground">$35</span>
                            </div>
                            <div className="space-y-1.5 pt-2 border-t border-border/60">
                              <div className="flex justify-between font-extrabold text-sm">
                                <span className="text-foreground">Total 5-Yr TCO</span>
                                <span className="font-mono text-emerald-600 dark:text-emerald-400">$384</span>
                              </div>
                              <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '70%' }} />
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Card>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </PageWrapper>
  );
};
