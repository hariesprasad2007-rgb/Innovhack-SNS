import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageWrapper } from '../components/layout/PageWrapper';
import { Button } from '../components/ui/button';
import { Microscope, ShieldAlert, CheckCircle2, AlertCircle, Wrench, ShieldCheck, ArrowRight } from 'lucide-react';
import { getProductImage, getProductRating } from '../lib/mockData';
import { ProductCard } from '../components/ui/ProductCard';

export const ProductForensicsView: React.FC = () => {
  const navigate = useNavigate();

  const forensicsTeardowns = [
    {
      id: 'tf-1',
      productName: 'Bose QuietComfort Ultra',
      category: 'Acoustic Engineering',
      image: getProductImage('Bose QuietComfort Ultra'),
      durabilityRating: '9.4',
      teardownHighlights: [
        'Asymmetric memory foam density canal eliminates spectacle frame pressure.',
        'High-density anodized aluminum yoke resists lateral torque strain.',
        'Physical toggle switch bypasses digital firmware lockouts.',
      ],
      failureTraps: [
        'Proprietary earpad twist-clip ring requires $38 official replacement kit every 24 months.',
      ],
    },
    {
      id: 'tf-2',
      productName: 'Steelcase Gesture Task Chair',
      category: 'Kinetic Ergonomics',
      image: getProductImage('Steelcase Gesture'),
      durabilityRating: '9.8',
      teardownHighlights: [
        'Die-cast steel core chassis rating for 12+ years of 24/7 continuous duty.',
        '360-degree articulating arm joints follow wrist angle during typing.',
        'Zero plastic lumbar fatigue points under heavy recline cycling.',
      ],
      failureTraps: [
        'Armrest joints present 1.5mm mechanical play at maximum upper extension.',
      ],
    },
    {
      id: 'tf-3',
      productName: 'Profitec Go PID Espresso Machine',
      category: 'Thermal Mechanics',
      image: getProductImage('Profitec Go'),
      durabilityRating: '9.9',
      teardownHighlights: [
        'Heavy-gauge brass monoblock boiler with food-grade nickel lining.',
        'Zero glued sub-assemblies; every valve unbolts with standard wrenches.',
        'Tactile analog toggle switches isolated from boiler heat zone.',
      ],
      failureTraps: [
        'Single boiler architecture requires 45-second steam thermal transition phase.',
      ],
    },
  ];

  return (
    <PageWrapper
      title="Product Forensics"
      description="Deep architectural teardowns, hidden failure modes, long-term durability metrics, and material analysis."
      badge="Teardown Protocol"
      actions={
        <Button
          variant="emerald"
          size="sm"
          onClick={() => navigate('/tradeoffs')}
          className="gap-2 text-xs font-semibold rounded-xl hover-card-lift py-2 px-3.5"
        >
          <ShieldCheck className="h-4 w-4" /> Back to Matrix
        </Button>
      }
    >
      <div className="space-y-8">
        {/* Protocol Config Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Thermal Stress Index', val: '3,000 hrs Sim', pct: 95, icon: <Wrench className="h-5 w-5 text-emerald-500" /> },
            { label: 'Hidden Trap Scanner', val: 'Active Filter', pct: 100, icon: <ShieldAlert className="h-5 w-5 text-amber-500" /> },
            { label: 'Acoustic Integrity', val: 'Fourier Verified', pct: 98, icon: <Microscope className="h-5 w-5 text-sky-500" /> },
            { label: 'Sourcing Audit', val: 'Tier-1 Certified', pct: 96, icon: <CheckCircle2 className="h-5 w-5 text-emerald-500" /> },
          ].map((stat, i) => (
            <div key={i} className="p-5 rounded-3xl apple-card border border-border/80 space-y-3 shadow-xs">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-secondary/60 shrink-0">{stat.icon}</div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-muted-foreground block">{stat.label}</span>
                  <span className="text-sm font-bold text-foreground font-mono">{stat.val}</span>
                </div>
              </div>
              <div className="w-full bg-secondary h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${stat.pct}%` }} />
              </div>
            </div>
          ))}
        </div>

        {/* Forensic Teardowns Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {forensicsTeardowns.map((item) => {
            const scoreNum = parseFloat(item.durabilityRating);
            const scorePct = Math.round((scoreNum / 10) * 100);
            return (
              <div key={item.id} className="space-y-4">
                {/* ProductCard */}
                <ProductCard
                  name={item.productName}
                  subtitle={`${item.category} · Component Teardown`}
                  price="Audited"
                  matchScore={`Score ${item.durabilityRating}/10`}
                  rating={getProductRating(item.productName)}
                  image={item.image}
                  keyBenefits={item.teardownHighlights}
                  badge={item.category}
                  isWinner={false}
                  onCompare={() => navigate('/tradeoffs')}
                  onSave={() => navigate('/vault')}
                />

                {/* Visual Durability Progress Card */}
                <div className="p-4 rounded-2xl apple-card border border-border/80 space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-muted-foreground">Teardown Durability Index</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-mono">{item.durabilityRating} / 10</span>
                  </div>
                  <div className="w-full bg-secondary h-2.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${scorePct}%` }} />
                  </div>
                </div>

                {/* Audited Risk Points Clean Card */}
                <div className="space-y-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 flex items-center gap-1.5 px-1">
                    <AlertCircle className="h-3.5 w-3.5" /> Audited Risk Points
                  </span>
                  {item.failureTraps.map((trap, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-800 dark:text-rose-300 leading-relaxed">
                      <AlertCircle className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                      <span>{trap}</span>
                    </div>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/recommendations')}
                  className="w-full text-xs font-semibold gap-2 rounded-xl py-2.5 hover-card-lift"
                >
                  View Full Monograph <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </PageWrapper>
  );
};
