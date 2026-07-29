import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  BookOpen,
  Sparkles,
  Bookmark,
  Share2,
  Sliders,
  ShieldCheck,
  ChevronRight,
  Zap,
  CheckCircle2,
  Award,
  BarChart3,
  ThumbsUp,
  AlertTriangle,
} from 'lucide-react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card } from '../components/ui/card';
import { MOCK_EDITORIAL_DOSSIERS, EditorialDossier, getProductImage, getProductRating } from '../lib/mockData';
import { ProductCard } from '../components/ui/ProductCard';
import { CardSkeleton } from '../components/ui/Skeleton';

export const RecommendationsView: React.FC = () => {
  const navigate = useNavigate();
  const [activeDossier, setActiveDossier] = useState<EditorialDossier>(MOCK_EDITORIAL_DOSSIERS[0]);
  const [savedDossiers, setSavedDossiers] = useState<Record<string, boolean>>({});
  const [isLoadingDossier, setIsLoadingDossier] = useState(false);

  const handleSelectDossier = (dossier: EditorialDossier) => {
    if (dossier.id === activeDossier.id) return;
    setIsLoadingDossier(true);
    setActiveDossier(dossier);
    setTimeout(() => {
      setIsLoadingDossier(false);
    }, 450);
  };

  const toggleBookmark = (id: string) => {
    setSavedDossiers((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const recImage = activeDossier.recommendedProduct.image || getProductImage(activeDossier.recommendedProduct.name);

  return (
    <PageWrapper
      title="Editorial Recommendation Dossiers"
      description="In-depth, un-sponsored buying evaluations. Zero affiliate links, zero sponsored placements, and full engineering transparency."
      badge="Curated Monograph"
      actions={
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/tradeoffs')}
            className="gap-2 text-xs font-semibold rounded-xl hover-card-lift py-2 px-3.5"
          >
            <Sliders className="h-4 w-4 text-amber-500" /> Compare Tradeoffs
          </Button>
          <Button
            variant="emerald"
            size="sm"
            onClick={() => navigate('/forensics')}
            className="gap-2 text-xs font-semibold rounded-xl hover-card-lift py-2 px-3.5"
          >
            <ShieldCheck className="h-4 w-4" /> Teardown Forensics
          </Button>
        </div>
      }
    >
      <div className="space-y-8">
        {/* Monograph Index Rail with Product Thumbnails beside every recommendation */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-emerald-500" /> Monograph Index
            </span>
            <span className="text-xs font-mono text-muted-foreground">
              {MOCK_EDITORIAL_DOSSIERS.length} Published Dossiers
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MOCK_EDITORIAL_DOSSIERS.map((dossier) => {
              const isSelected = activeDossier.id === dossier.id;
              const dossierThumb = dossier.recommendedProduct.image || getProductImage(dossier.recommendedProduct.name);
              return (
                <button
                  key={dossier.id}
                  onClick={() => handleSelectDossier(dossier)}
                  className={`text-left p-4 rounded-3xl border transition-all duration-300 flex items-center gap-4 relative overflow-hidden group hover-card-lift ${
                    isSelected
                      ? 'apple-card border-emerald-500/60 ring-2 ring-emerald-500/20 shadow-md bg-card'
                      : 'apple-card hover:border-foreground/20'
                  }`}
                >
                  {/* Product Thumbnail Beside Recommendation */}
                  <img
                    src={dossierThumb}
                    alt={dossier.recommendedProduct.name}
                    className="w-14 h-14 rounded-2xl object-cover shrink-0 border border-border/60 shadow-2xs"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400">
                        {dossier.dossierNumber}
                      </span>
                      <Badge variant={isSelected ? 'emerald' : 'outline'} className="text-[10px]">
                        {dossier.confidenceScore}% Match
                      </Badge>
                    </div>

                    <h3 className="text-xs font-bold text-foreground truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {dossier.recommendedProduct.name}
                    </h3>
                    <p className="text-[11px] text-muted-foreground truncate mt-0.5">
                      {dossier.title}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Monograph Detail Container with Loading State */}
        {isLoadingDossier ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-6">
              <CardSkeleton rows={4} />
              <CardSkeleton rows={3} />
            </div>
            <div className="lg:col-span-4 space-y-6">
              <CardSkeleton rows={4} />
            </div>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDossier.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8"
            >
              {/* Header Hero Section */}
              <article className="relative rounded-3xl apple-card p-6 sm:p-8 border border-border/80 shadow-md overflow-hidden space-y-6">
                {/* Category & Actions */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-border/60">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-mono text-xs font-bold border border-emerald-500/20">
                      {activeDossier.dossierNumber}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      {activeDossier.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleBookmark(activeDossier.id)}
                      className="gap-2 text-xs rounded-xl hover-card-lift py-2"
                    >
                      <Bookmark
                        className={`h-4 w-4 ${
                          savedDossiers[activeDossier.id]
                            ? 'fill-emerald-500 text-emerald-500'
                            : 'text-muted-foreground'
                        }`}
                      />
                      {savedDossiers[activeDossier.id] ? 'Saved in Vault' : 'Bookmark'}
                    </Button>

                    <Button variant="outline" size="sm" className="gap-2 text-xs rounded-xl hover-card-lift py-2">
                      <Share2 className="h-4 w-4" /> Share
                    </Button>
                  </div>
                </div>

                {/* Title & Subtitle */}
                <div className="space-y-2">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight leading-snug">
                    {activeDossier.title}
                  </h1>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">
                    {activeDossier.subtitle}
                  </p>
                </div>

                {/* Visual Confidence Progress Bars Card */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-5 rounded-2xl bg-secondary/40 border border-border/60">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-muted-foreground">Ergonomics & Fit</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-mono">{activeDossier.confidenceBreakdown.ergonomicsOrAcoustics}%</span>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${activeDossier.confidenceBreakdown.ergonomicsOrAcoustics}%` }} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-muted-foreground">Materials & Build</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-mono">{activeDossier.confidenceBreakdown.materialsDurability}%</span>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${activeDossier.confidenceBreakdown.materialsDurability}%` }} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-muted-foreground">Repairability</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-mono">{activeDossier.confidenceBreakdown.repairabilityIndex}%</span>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${activeDossier.confidenceBreakdown.repairabilityIndex}%` }} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-muted-foreground">Unbiased Value</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-mono">{activeDossier.confidenceBreakdown.unbiasedValue}%</span>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${activeDossier.confidenceBreakdown.unbiasedValue}%` }} />
                    </div>
                  </div>
                </div>

                {/* Product Card with Product Thumbnail */}
                <ProductCard
                  name={activeDossier.recommendedProduct.name}
                  subtitle={`${activeDossier.recommendedProduct.modelCode} · ${activeDossier.recommendedProduct.primaryMaterial}`}
                  price={activeDossier.recommendedProduct.estimatedPrice}
                  matchScore={activeDossier.confidenceScore}
                  rating={getProductRating(activeDossier.recommendedProduct.name)}
                  image={recImage}
                  keyBenefits={[
                    `Origin: ${activeDossier.recommendedProduct.countryOfOrigin} · ${activeDossier.recommendedProduct.warrantyTerm}`,
                    `Ergonomic match: ${activeDossier.confidenceBreakdown.ergonomicsOrAcoustics}%`,
                    `Durability score: ${activeDossier.confidenceBreakdown.materialsDurability}%`,
                  ]}
                  badge="Top Unsponsored Pick"
                  isWinner={true}
                  isSaved={!!savedDossiers[activeDossier.id]}
                  onCompare={() => navigate('/tradeoffs')}
                  onSave={() => toggleBookmark(activeDossier.id)}
                />
              </article>

              {/* Content Layout Grid with Spacing */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Main Column (8 cols) */}
                <div className="lg:col-span-8 space-y-6">
                  {/* SECTION 1: WHY RECOMMENDED */}
                  <Card className="apple-card space-y-4 p-6 border border-border/80">
                    <div className="flex items-center gap-3 pb-3 border-b border-border/60">
                      <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                        <Sparkles className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground block">
                          Section I
                        </span>
                        <h3 className="text-base font-bold text-foreground">Why Recommended</h3>
                      </div>
                    </div>

                    <div className="space-y-4 text-xs text-foreground/90 leading-relaxed">
                      <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 font-medium text-xs leading-relaxed flex items-start gap-3">
                        <img src={recImage} alt="Thumb" className="w-10 h-10 rounded-xl object-cover shrink-0 border border-border/50" />
                        <div>{activeDossier.whyRecommended.thesis}</div>
                      </div>

                      <div className="space-y-3 pt-1">
                        <h4 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                          Engineering Highlights:
                        </h4>
                        <div className="grid grid-cols-1 gap-2.5">
                          {activeDossier.whyRecommended.engineeringHighlights.map((highlight, idx) => (
                            <div
                              key={idx}
                              className="p-3.5 rounded-xl bg-secondary/40 border border-border/50 flex items-start gap-3"
                            >
                              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                              <span className="text-xs text-foreground font-medium leading-relaxed">{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* SECTION 2: BEST USE CASES */}
                  <Card className="apple-card space-y-4 p-6 border border-border/80">
                    <div className="flex items-center gap-3 pb-3 border-b border-border/60">
                      <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                        <Zap className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground block">
                          Section II
                        </span>
                        <h3 className="text-base font-bold text-foreground">Use Cases & Limits</h3>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      {activeDossier.bestUseCases.map((useCase, idx) => {
                        const isOptimal = useCase.suitability === 'Optimal';
                        return (
                          <div
                            key={idx}
                            className="p-4 rounded-2xl bg-background/60 border border-border/60 space-y-2.5"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-bold text-xs sm:text-sm text-foreground">
                                {useCase.title}
                              </span>
                              <Badge
                                variant={isOptimal ? 'emerald' : 'amber'}
                                className="text-[10px] uppercase font-bold"
                              >
                                {useCase.suitability}
                              </Badge>
                            </div>

                            <p className="text-xs text-muted-foreground leading-relaxed">
                              {useCase.scenario}
                            </p>

                            <div className="p-2.5 rounded-xl bg-secondary/50 text-[11px] text-foreground/80 font-medium flex items-center justify-between">
                              <span><span className="text-muted-foreground mr-1">Audited Note:</span>{useCase.notes}</span>
                              <div className="w-16 bg-secondary h-1.5 rounded-full overflow-hidden shrink-0 ml-2">
                                <div className="bg-emerald-500 h-full rounded-full" style={{ width: isOptimal ? '95%' : '75%' }} />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </Card>

                  {/* SECTION 3: DECISION REASONING */}
                  <Card className="apple-card space-y-4 p-6 border border-border/80">
                    <div className="flex items-center gap-3 pb-3 border-b border-border/60">
                      <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                        <ShieldCheck className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground block">
                          Section III
                        </span>
                        <h3 className="text-base font-bold text-foreground">Decision Audits</h3>
                      </div>
                    </div>

                    <div className="space-y-4 text-xs leading-relaxed">
                      <div className="space-y-1.5">
                        <h4 className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                          Unsponsored Verdict:
                        </h4>
                        <p className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 text-foreground font-medium leading-relaxed">
                          {activeDossier.decisionReasoning.unSponsoredVerdict}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-1.5">
                          <span className="text-xs font-bold text-amber-700 dark:text-amber-300 flex items-center gap-1.5">
                            <ThumbsUp className="h-3.5 w-3.5" /> Tradeoffs Accepted:
                          </span>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {activeDossier.decisionReasoning.auditedTradeoffsAccepted}
                          </p>
                        </div>

                        <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/20 space-y-1.5">
                          <span className="text-xs font-bold text-rose-700 dark:text-rose-300 flex items-center gap-1.5">
                            <AlertTriangle className="h-3.5 w-3.5" /> Competitor Flaws:
                          </span>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {activeDossier.decisionReasoning.whatMarketCompetitorsGotWrong}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Sidebar Alternatives Column (4 cols) */}
                <div className="lg:col-span-4 space-y-6">
                  <Card className="apple-card space-y-4 p-6 border border-border/80 sticky top-20">
                    <div className="flex items-center justify-between pb-3 border-b border-border/60">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                          Section IV
                        </span>
                        <h3 className="text-sm font-bold text-foreground">
                          Situational Alternatives
                        </h3>
                      </div>
                      <Badge variant="outline" className="text-[10px]">
                        {activeDossier.alternativeProducts.length} Evaluated
                      </Badge>
                    </div>

                    <div className="space-y-4">
                      {activeDossier.alternativeProducts.map((alt) => {
                        const altImg = alt.image || getProductImage(alt.name);
                        return (
                          <ProductCard
                            key={alt.id}
                            name={alt.name}
                            subtitle={alt.subtitle}
                            price={alt.price}
                            matchScore={alt.pivotScore}
                            rating={getProductRating(alt.name)}
                            image={altImg}
                            keyBenefits={[
                              alt.whenToChoose,
                              `Pivot alignment: ${alt.pivotScore}%`,
                              'Audited for unsponsored accuracy',
                            ]}
                            badge="Alternative"
                            isWinner={false}
                            onCompare={() => navigate('/tradeoffs')}
                            onSave={() => toggleBookmark(alt.id)}
                          />
                        );
                      })}
                    </div>

                    <div className="pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate('/tradeoffs')}
                        className="w-full text-xs font-semibold gap-2 rounded-xl py-2.5"
                      >
                        Compare Matrix Side-by-Side <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </PageWrapper>
  );
};
