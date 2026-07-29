import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  History,
  Bookmark,
  Clock,
  ShieldCheck,
  TrendingUp,
  Award,
  Search,
  Filter,
  Plus,
  Compass,
  Sliders,
  Heart,
  BarChart3,
} from 'lucide-react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card } from '../components/ui/card';
import {
  MOCK_DASHBOARD_INSIGHTS,
  DecisionLedgerItem,
  SavedRecommendationItem,
  WishlistItem,
  getProductImage,
  getProductRating,
} from '../lib/mockData';
import { ProductCard } from '../components/ui/ProductCard';
import { Modal } from '../components/ui/modal';

export const DecisionVaultView: React.FC = () => {
  const navigate = useNavigate();

  // Active Tab
  const [activeTab, setActiveTab] = useState<
    'ledger' | 'saved' | 'wishlist' | 'timeline' | 'insights' | 'habits'
  >('ledger');

  // Search filter
  const [searchQuery, setSearchQuery] = useState('');
  const [ledgerFilter, setLedgerFilter] = useState<string>('all');

  const [ledgerItems, setLedgerItems] = useState<DecisionLedgerItem[]>(
    MOCK_DASHBOARD_INSIGHTS.decisionLedger
  );
  const [expandedLedgerId, setExpandedLedgerId] = useState<string | null>('dec-01');

  const [savedItems, setSavedItems] = useState<SavedRecommendationItem[]>(
    MOCK_DASHBOARD_INSIGHTS.savedRecommendations
  );
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>(
    MOCK_DASHBOARD_INSIGHTS.wishlist
  );

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Audio Hardware');
  const [newPrice, setNewPrice] = useState('');
  const [newNotes, setNewNotes] = useState('');

  const handleCreateDecision = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const newItem: DecisionLedgerItem = {
      id: `dec-${Date.now()}`,
      title: newTitle,
      category: newCategory,
      decisionDate: 'Just now',
      purchasePrice: newPrice ? (newPrice.startsWith('$') ? newPrice : `$${newPrice}`) : '$299',
      unsponsoredPivotSavings: '$45 Saved',
      confidenceAtPurchase: 95,
      outcomeStatus: 'Loved & Kept',
      auditNotes: newNotes || 'Audited post-purchase choice.',
      usageFrequency: 'Daily (5-8 hrs)',
      regretScore: 0,
      image: getProductImage(newTitle),
    };
    setLedgerItems([newItem, ...ledgerItems]);
    setIsAddModalOpen(false);
    setNewTitle('');
    setNewPrice('');
    setNewNotes('');
  };

  const profile = MOCK_DASHBOARD_INSIGHTS.shoppingHabitsProfile;
  const budget = MOCK_DASHBOARD_INSIGHTS.budgetMetrics;

  const filteredLedger = ledgerItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      ledgerFilter === 'all' ||
      (ledgerFilter === 'kept' && item.outcomeStatus === 'Loved & Kept') ||
      (ledgerFilter === 'audit' && item.outcomeStatus === 'Under 90-Day Audit');
    return matchesSearch && matchesStatus;
  });

  const removeSavedItem = (id: string) => {
    setSavedItems((prev) => prev.filter((i) => i.id !== id));
  };

  const removeWishlistItem = (id: string) => {
    setWishlistItems((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <PageWrapper
      title="Decision Vault & Journal"
      description="Immutable ledger of buying choices, post-purchase regret audits, curated wishlists, and un-sponsored budget insights."
      badge="Intelligence Vault"
      actions={
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsAddModalOpen(true)}
            className="gap-2 text-xs font-semibold rounded-xl hover-card-lift py-2 px-3.5"
          >
            <Plus className="h-4 w-4 text-emerald-500" /> Log Decision
          </Button>
          <Button
            variant="emerald"
            size="sm"
            onClick={() => navigate('/tradeoffs')}
            className="gap-2 text-xs font-semibold rounded-xl hover-card-lift py-2 px-3.5"
          >
            <Compass className="h-4 w-4" /> Comparison Studio
          </Button>
        </div>
      }
    >
      <div className="space-y-8">
        {/* HERO ARCHETYPE & CAPITAL BANNER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 rounded-3xl apple-card p-6 sm:p-8 border border-border/80 relative overflow-hidden space-y-5 flex flex-col justify-between hover-card-lift shadow-sm">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4" /> Buyer Archetype
                </span>
                <Badge variant="emerald" className="text-[10px] font-mono">
                  {profile.repairabilityBias}% Repairability Bias
                </Badge>
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">
                {profile.archetype}
              </h2>
              <p className="text-xs text-muted-foreground leading-relaxed max-w-xl">
                {profile.tagline}
              </p>

              <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${profile.repairabilityBias}%` }} />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono pt-1">
              <div className="p-3.5 rounded-2xl bg-secondary/40 border border-border/50">
                <span className="text-[9px] uppercase font-sans text-muted-foreground block font-bold">
                  Research Window
                </span>
                <span className="font-bold text-foreground text-xs">{profile.researchPeriodAvg}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-secondary/40 border border-border/50">
                <span className="text-[9px] uppercase font-sans text-muted-foreground block font-bold">
                  Impulse Rate
                </span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400 text-xs">
                  {profile.impulsePurchaseRate}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-secondary/40 border border-border/50 col-span-2 sm:col-span-1">
                <span className="text-[9px] uppercase font-sans text-muted-foreground block font-bold">
                  Brand Agnosticism
                </span>
                <span className="font-bold text-foreground text-xs">100% Spec Focused</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
            <div className="p-6 rounded-3xl apple-card border border-emerald-500/30 bg-emerald-500/5 flex items-center justify-between hover-card-lift shadow-sm">
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 block">
                  Capital Saved
                </span>
                <span className="text-2xl sm:text-3xl font-black font-mono text-emerald-600 dark:text-emerald-400">
                  {budget.totalSavedViaUnsponsoredPivots}
                </span>
                <p className="text-xs text-muted-foreground">
                  Saved via unsponsored choices
                </p>
                <div className="w-40 bg-secondary h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '88%' }} />
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-emerald-500 text-slate-950 font-bold shrink-0">
                <TrendingUp className="h-6 w-6" />
              </div>
            </div>

            <div className="p-6 rounded-3xl apple-card border border-border/80 flex items-center justify-between hover-card-lift shadow-xs">
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                  Regret Avoidance Rate
                </span>
                <span className="text-2xl sm:text-3xl font-black font-mono text-foreground">
                  {budget.regretAvoidanceRate}
                </span>
                <p className="text-xs text-muted-foreground">
                  0 regret across {ledgerItems.length} audited items
                </p>
                <div className="w-40 bg-secondary h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '100%' }} />
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-secondary text-foreground font-bold shrink-0">
                <Award className="h-6 w-6 text-emerald-500" />
              </div>
            </div>
          </div>
        </div>

        {/* TAB BAR */}
        <div className="flex items-center justify-between gap-3 overflow-x-auto pb-2 border-b border-border/60">
          <div className="flex items-center gap-2 min-w-max">
            {[
              { id: 'ledger', label: 'Decision Ledger', count: ledgerItems.length, icon: History },
              { id: 'saved', label: 'Saved Picks', count: savedItems.length, icon: Bookmark },
              { id: 'wishlist', label: 'Wishlist', count: wishlistItems.length, icon: Heart },
              { id: 'timeline', label: 'Timeline', count: MOCK_DASHBOARD_INSIGHTS.recommendationTimeline.length, icon: Clock },
              { id: 'insights', label: 'Capital', count: budget.categoryAllocation.length, icon: BarChart3 },
              { id: 'habits', label: 'Profile', icon: Sliders },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2.5 ${
                    isActive
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                      : 'bg-secondary/40 text-muted-foreground hover:text-foreground hover:bg-secondary'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                  {tab.count !== undefined && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                        isActive
                          ? 'bg-slate-950/20 text-slate-950'
                          : 'bg-background/80 text-muted-foreground'
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* TAB 1: DECISION HISTORY LEDGER */}
        {activeTab === 'ledger' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-3xl apple-card border border-border/80">
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search audited purchases..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-background border border-border/80 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                />
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className="text-xs text-muted-foreground font-semibold flex items-center gap-1">
                  <Filter className="h-3.5 w-3.5" /> Filter:
                </span>
                <button
                  onClick={() => setLedgerFilter('all')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    ledgerFilter === 'all'
                      ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  All ({ledgerItems.length})
                </button>
                <button
                  onClick={() => setLedgerFilter('kept')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    ledgerFilter === 'kept'
                      ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Loved & Kept
                </button>
                <button
                  onClick={() => setLedgerFilter('audit')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    ledgerFilter === 'audit'
                      ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Under 90-Day Audit
                </button>
              </div>
            </div>

            {/* Ledger Cards Stack with Product Thumbnails */}
            <div className="space-y-4">
              {filteredLedger.map((item) => {
                const isExpanded = expandedLedgerId === item.id;
                const isKept = item.outcomeStatus === 'Loved & Kept';
                const itemImg = item.image || getProductImage(item.title);

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-3xl apple-card border border-border/80 overflow-hidden transition-all hover:border-emerald-500/40 hover-card-lift"
                  >
                    <div
                      onClick={() => setExpandedLedgerId(isExpanded ? null : item.id)}
                      className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer select-none"
                    >
                      <div className="flex items-center gap-4">
                        {/* Product Thumbnail Beside Ledger Item */}
                        <img
                          src={itemImg}
                          alt={item.title}
                          className="w-14 h-14 rounded-2xl object-cover border border-border/60 shrink-0 shadow-2xs"
                        />
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-mono font-bold text-muted-foreground uppercase">
                              {item.category}
                            </span>
                            <span className="text-muted-foreground/40">•</span>
                            <span className="text-[10px] text-muted-foreground font-mono">
                              Purchased {item.decisionDate}
                            </span>
                          </div>
                          <h3 className="text-base font-bold text-foreground">{item.title}</h3>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-5 text-xs font-mono">
                        <div className="text-right">
                          <span className="font-extrabold text-foreground block text-base">
                            {item.purchasePrice}
                          </span>
                          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                            {item.unsponsoredPivotSavings}
                          </span>
                        </div>

                        <Badge
                          variant={isKept ? 'emerald' : 'amber'}
                          className="text-[10px] font-bold uppercase py-1 px-2.5 rounded-xl"
                        >
                          {item.outcomeStatus}
                        </Badge>
                      </div>
                    </div>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="px-6 pb-6 pt-3 border-t border-border/40 bg-secondary/20 space-y-4 text-xs"
                        >
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="p-3.5 rounded-2xl bg-background/80 border border-border/60 space-y-1.5">
                              <span className="text-[10px] uppercase font-bold text-muted-foreground block">
                                Match Score
                              </span>
                              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-base">
                                {item.confidenceAtPurchase}%
                              </span>
                              <div className="w-full bg-secondary h-1.5 rounded-full overflow-hidden">
                                <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${item.confidenceAtPurchase}%` }} />
                              </div>
                            </div>

                            <div className="p-3.5 rounded-2xl bg-background/80 border border-border/60 space-y-1.5">
                              <span className="text-[10px] uppercase font-bold text-muted-foreground block">
                                Regret Index
                              </span>
                              <span className="font-mono font-bold text-foreground text-base">
                                {item.regretScore}% (Zero Regret)
                              </span>
                              <div className="w-full bg-secondary h-1.5 rounded-full overflow-hidden">
                                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '100%' }} />
                              </div>
                            </div>

                            <div className="p-3.5 rounded-2xl bg-background/80 border border-border/60 space-y-1.5">
                              <span className="text-[10px] uppercase font-bold text-muted-foreground block">
                                Usage Frequency
                              </span>
                              <span className="font-mono font-bold text-foreground text-base">
                                {item.usageFrequency}
                              </span>
                              <div className="w-full bg-secondary h-1.5 rounded-full overflow-hidden">
                                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '90%' }} />
                              </div>
                            </div>
                          </div>

                          <div className="p-4 rounded-2xl bg-background/80 border border-border/60 space-y-1.5 flex items-start gap-3">
                            <img src={itemImg} alt="Thumb" className="w-10 h-10 rounded-xl object-cover shrink-0 border border-border/50" />
                            <div>
                              <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400 block">
                                Post-Purchase Notes:
                              </span>
                              <p className="text-foreground/90 leading-relaxed text-xs">
                                {item.auditNotes}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: SAVED RECOMMENDATIONS */}
        {activeTab === 'saved' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {savedItems.map((saved) => {
              const savedImg = saved.image || getProductImage(saved.productName);
              return (
                <div key={saved.id} className="relative">
                  <ProductCard
                    name={saved.productName}
                    subtitle={saved.category}
                    price={saved.price}
                    matchScore={saved.confidenceScore}
                    rating={getProductRating(saved.productName)}
                    image={savedImg}
                    keyBenefits={[
                      saved.reasonToBuy,
                      `Trigger: ${saved.triggerCondition}`,
                      `Confidence at save: ${saved.confidenceScore}%`,
                    ]}
                    badge="Saved Pick"
                    isWinner={false}
                    isSaved={true}
                    onCompare={() => navigate('/tradeoffs')}
                    onSave={() => removeSavedItem(saved.id)}
                  />
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 3: CURATED WISHLIST */}
        {activeTab === 'wishlist' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {wishlistItems.map((wish) => {
                const wishImg = wish.image || getProductImage(wish.item);
                return (
                  <ProductCard
                    key={wish.id}
                    name={wish.item}
                    subtitle={wish.category}
                    price={wish.targetPrice}
                    matchScore={`${wish.urgency} Urgency`}
                    rating={getProductRating(wish.item)}
                    image={wishImg}
                    keyBenefits={[
                      wish.whyInWishlist,
                      `Current price: ${wish.currentPrice}`,
                      `Target price: ${wish.targetPrice}`,
                    ]}
                    badge={`${wish.urgency} Urgency`}
                    isWinner={wish.urgency === 'High'}
                    onCompare={() => navigate('/tradeoffs')}
                    onSave={() => removeWishlistItem(wish.id)}
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: TIMELINE */}
        {activeTab === 'timeline' && (
          <div className="relative border-l-2 border-emerald-500/30 pl-6 sm:pl-8 space-y-8 my-6 ml-2 sm:ml-4">
            {MOCK_DASHBOARD_INSIGHTS.recommendationTimeline.map((item) => (
              <div key={item.id} className="relative space-y-3 group">
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 h-4 w-4 rounded-full bg-emerald-500 ring-4 ring-background border-2 border-slate-950" />

                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-xl border border-emerald-500/20">
                    {item.date}
                  </span>
                  <Badge variant="outline" className="text-[10px]">
                    {item.badge}
                  </Badge>
                </div>

                <div className="p-6 rounded-3xl apple-card border border-border/80 space-y-4 max-w-2xl hover-card-lift">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-foreground">{item.title}</h3>
                    <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      {item.savedAmount}
                    </span>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.eventSummary}
                  </p>

                  <div className="p-3.5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 text-xs font-medium text-emerald-800 dark:text-emerald-300 flex items-center justify-between space-x-2">
                    <span>{item.verdictOutcome}</span>
                    <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 shrink-0">
                      {item.confidenceScore}% Confidence
                    </span>
                  </div>

                  <div className="w-full bg-secondary h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${item.confidenceScore}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 5 & 6: CAPITAL & HABITS */}
        {(activeTab === 'insights' || activeTab === 'habits') && (
          <div className="space-y-6">
            <Card className="apple-card border border-border/80 p-6 space-y-4">
              <div className="pb-3 border-b border-border/60">
                <h3 className="text-base font-bold text-foreground">Spending & Habits Insights</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                {budget.categoryAllocation.map((cat, i) => (
                  <div key={i} className="p-5 rounded-2xl bg-secondary/30 border border-border/40 space-y-3">
                    <div className="flex justify-between font-bold">
                      <span>{cat.category}</span>
                      <span className="font-mono text-emerald-600 dark:text-emerald-400">{cat.spent}</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${cat.percentage}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* LOG DECISION MODAL */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Log Decision to Immutable Vault"
        description="Record a product purchase or evaluation decision to track post-purchase sentiment, regret, and durability metrics."
      >
        <form onSubmit={handleCreateDecision} className="space-y-4 mt-2">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-foreground block">Product / Decision Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Steelcase Gesture Task Chair"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full rounded-xl border border-input bg-background p-2.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground block">Category</label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full rounded-xl border border-input bg-background p-2.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Audio Hardware">Audio Hardware</option>
                <option value="Ergonomics">Ergonomics</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
                <option value="Computers">Computers</option>
                <option value="Carry Gear">Carry Gear</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground block">Purchase Price ($)</label>
              <input
                type="text"
                placeholder="e.g. 429"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
                className="w-full rounded-xl border border-input bg-background p-2.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-foreground block">Post-Purchase Audit Notes</label>
            <textarea
              rows={3}
              placeholder="Audited trade-offs accepted, fit quality, and durability performance after 30+ days..."
              value={newNotes}
              onChange={(e) => setNewNotes(e.target.value)}
              className="w-full rounded-xl border border-input bg-background p-2.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
            />
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsAddModalOpen(false)}
              className="text-xs rounded-xl"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="emerald"
              size="sm"
              className="text-xs font-bold rounded-xl gap-1.5"
            >
              <Plus className="h-4 w-4" /> Save to Decision Vault
            </Button>
          </div>
        </form>
      </Modal>
    </PageWrapper>
  );
};
