import React, { useState } from 'react';
import { Modal } from './modal';
import { Button } from './button';
import { Badge } from './badge';
import {
  Star,
  MessageSquare,
  Plus,
  CheckCircle2,
  ThumbsUp,
  Filter,
  Check,
  ShieldCheck,
  User,
  Sparkles,
} from 'lucide-react';
import { ProductReview, ReviewSummary } from '../../types';
import {
  getProductReviews,
  getReviewSummary,
  addProductReview,
  getProductImage,
} from '../../lib/mockData';

interface ProductReviewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  category?: string;
  image?: string;
}

export const ProductReviewsModal: React.FC<ProductReviewsModalProps> = ({
  isOpen,
  onClose,
  productName,
  category = 'Product Audit',
  image,
}) => {
  const [activeTab, setActiveTab] = useState<'list' | 'write'>('list');
  const [filterRating, setFilterRating] = useState<number | 'all'>('all');
  const [helpfulMap, setHelpfulMap] = useState<Record<string, number>>({});
  const [votedMap, setVotedMap] = useState<Record<string, boolean>>({});

  // Review Form State
  const [authorName, setAuthorName] = useState('');
  const [userRating, setUserRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [proInput, setProInput] = useState('');
  const [conInput, setConInput] = useState('');
  const [isVerified, setIsVerified] = useState(true);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const reviews: ProductReview[] = getProductReviews(productName);
  const summary: ReviewSummary = getReviewSummary(productName);
  const productImage = image || getProductImage(productName);

  const filteredReviews = reviews.filter((rev) => {
    if (filterRating === 'all') return true;
    return Math.round(rev.rating) === filterRating;
  });

  const handleVoteHelpful = (id: string, currentCount: number) => {
    if (votedMap[id]) return;
    setVotedMap((prev) => ({ ...prev, [id]: true }));
    setHelpfulMap((prev) => ({
      ...prev,
      [id]: (prev[id] ?? currentCount) + 1,
    }));
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !reviewTitle.trim() || !reviewComment.trim()) return;

    const pros = proInput
      .split(',')
      .map((p) => p.trim())
      .filter(Boolean);
    const cons = conInput
      .split(',')
      .map((c) => c.trim())
      .filter(Boolean);

    addProductReview({
      productName,
      author: authorName,
      avatar: authorName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2),
      rating: userRating,
      title: reviewTitle,
      comment: reviewComment,
      pros: pros.length > 0 ? pros : undefined,
      cons: cons.length > 0 ? cons : undefined,
      verifiedPurchase: isVerified,
    });

    setSubmittedSuccess(true);
    setTimeout(() => {
      setSubmittedSuccess(false);
      setActiveTab('list');
      setReviewTitle('');
      setReviewComment('');
      setProInput('');
      setConInput('');
    }, 1500);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-2xl p-6 overflow-hidden max-h-[90vh] flex flex-col"
    >
      {/* Header with Product Info */}
      <div className="flex items-center gap-4 pb-4 border-b border-border/60">
        <img
          src={productImage}
          alt={productName}
          className="w-14 h-14 rounded-2xl object-cover border border-border/60 shrink-0 shadow-2xs"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="emerald" className="text-[10px]">
              <ShieldCheck className="h-3 w-3 mr-1 inline" /> Unsponsored Audited Reviews
            </Badge>
            <span className="text-[10px] text-muted-foreground font-mono">{category}</span>
          </div>
          <h2 className="text-base font-extrabold text-foreground truncate">{productName}</h2>
          <div className="flex items-center gap-2 mt-0.5">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-3.5 w-3.5 ${
                    i < Math.round(summary.averageRating)
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-muted-foreground/30'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-bold font-mono text-foreground">
              {summary.averageRating} / 5.0
            </span>
            <span className="text-[11px] text-muted-foreground">
              ({summary.totalReviews} verified review{summary.totalReviews === 1 ? '' : 's'})
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center justify-between py-3 border-b border-border/40">
        <div className="flex items-center gap-2">
          <Button
            variant={activeTab === 'list' ? 'emerald' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('list')}
            className="gap-2 text-xs rounded-xl py-1.5 px-3 font-semibold"
          >
            <MessageSquare className="h-3.5 w-3.5" /> Customer Reviews ({reviews.length})
          </Button>
          <Button
            variant={activeTab === 'write' ? 'emerald' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('write')}
            className="gap-2 text-xs rounded-xl py-1.5 px-3 font-semibold"
          >
            <Plus className="h-3.5 w-3.5" /> Add Review
          </Button>
        </div>

        {activeTab === 'list' && (
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Filter className="h-3.5 w-3.5" />
            <select
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value === 'all' ? 'all' : Number(e.target.value))}
              className="bg-secondary/60 border border-border/60 rounded-xl px-2 py-1 text-xs text-foreground focus:outline-none font-sans font-medium"
            >
              <option value="all">All Stars</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
            </select>
          </div>
        )}
      </div>

      {/* Main Tab Content */}
      <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
        {activeTab === 'list' ? (
          <>
            {/* Rating Breakdown Bars Card */}
            <div className="p-4 rounded-2xl bg-secondary/30 border border-border/60 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
              <div className="sm:col-span-4 text-center sm:border-r border-border/60 sm:pr-4">
                <span className="text-3xl font-black font-mono text-foreground block">
                  {summary.averageRating}
                </span>
                <div className="flex items-center justify-center gap-1 my-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.round(summary.averageRating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-muted-foreground/30'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-[11px] text-muted-foreground">
                  Based on {summary.totalReviews} reviews
                </span>
              </div>

              <div className="sm:col-span-8 space-y-1.5">
                {[5, 4, 3, 2, 1].map((star) => {
                  const count = summary.ratingBreakdown[star as 1 | 2 | 3 | 4 | 5] || 0;
                  const pct = summary.totalReviews > 0 ? Math.round((count / summary.totalReviews) * 100) : 0;
                  return (
                    <div key={star} className="flex items-center gap-2 text-xs">
                      <span className="w-8 font-mono text-muted-foreground font-semibold flex items-center gap-1">
                        {star} <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      </span>
                      <div className="flex-1 bg-secondary h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-amber-400 h-full rounded-full transition-all duration-300"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="w-8 font-mono text-[10px] text-muted-foreground text-right">
                        {count}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Review Cards Stack */}
            {filteredReviews.length === 0 ? (
              <div className="text-center py-8 space-y-3">
                <MessageSquare className="h-8 w-8 text-muted-foreground mx-auto opacity-50" />
                <p className="text-xs text-muted-foreground">No reviews match this rating filter.</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveTab('write')}
                  className="text-xs rounded-xl gap-1.5"
                >
                  <Plus className="h-3.5 w-3.5" /> Be the first to write a review
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredReviews.map((rev) => {
                  const currentHelpful = helpfulMap[rev.id] ?? rev.helpfulCount;
                  const isVoted = votedMap[rev.id];

                  return (
                    <div
                      key={rev.id}
                      className="p-4 rounded-2xl bg-card border border-border/80 space-y-3 shadow-xs hover:border-border transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="h-8 w-8 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xs border border-emerald-500/20">
                            {rev.avatar || rev.author[0]}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-xs text-foreground">{rev.author}</span>
                              {rev.verifiedPurchase && (
                                <Badge variant="emerald" className="text-[9px] py-0 px-1.5">
                                  <CheckCircle2 className="h-3 w-3 mr-0.5 inline" /> Verified Buyer
                                </Badge>
                              )}
                            </div>
                            <span className="text-[10px] text-muted-foreground">{rev.date}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3.5 w-3.5 ${
                                i < rev.rating
                                  ? 'fill-amber-400 text-amber-400'
                                  : 'text-muted-foreground/30'
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-xs font-bold text-foreground leading-snug">{rev.title}</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                          {rev.comment}
                        </p>
                      </div>

                      {/* Pros & Cons */}
                      {(rev.pros || rev.cons) && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                          {rev.pros && rev.pros.length > 0 && (
                            <div className="p-2 rounded-xl bg-emerald-500/5 border border-emerald-500/20 space-y-1">
                              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 block">
                                Pros:
                              </span>
                              <ul className="list-disc list-inside text-[11px] text-foreground/80 space-y-0.5">
                                {rev.pros.map((p, idx) => (
                                  <li key={idx}>{p}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {rev.cons && rev.cons.length > 0 && (
                            <div className="p-2 rounded-xl bg-rose-500/5 border border-rose-500/20 space-y-1">
                              <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 block">
                                Cons:
                              </span>
                              <ul className="list-disc list-inside text-[11px] text-foreground/80 space-y-0.5">
                                {rev.cons.map((c, idx) => (
                                  <li key={idx}>{c}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Helpful Button */}
                      <div className="flex items-center justify-end pt-2 border-t border-border/40">
                        <button
                          onClick={() => handleVoteHelpful(rev.id, rev.helpfulCount)}
                          disabled={isVoted}
                          className={`text-[11px] font-medium flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all ${
                            isVoted
                              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold'
                              : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                          }`}
                        >
                          <ThumbsUp className="h-3 w-3" />
                          <span>Helpful ({currentHelpful})</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        ) : (
          /* TAB 2: WRITE A REVIEW FORM */
          <form onSubmit={handleSubmitReview} className="space-y-4">
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-emerald-500 shrink-0" />
              <p className="text-xs text-foreground font-medium leading-relaxed">
                Submit an un-sponsored, objective review to help fellow buyers evaluate tradeoffs without affiliate bias.
              </p>
            </div>

            {/* Rating Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-foreground block">Overall Star Rating</label>
              <div className="flex items-center gap-2">
                {Array.from({ length: 5 }).map((_, i) => {
                  const starVal = i + 1;
                  const isFilled = starVal <= (hoverRating || userRating);
                  return (
                    <button
                      key={i}
                      type="button"
                      onMouseEnter={() => setHoverRating(starVal)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setUserRating(starVal)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`h-7 w-7 ${
                          isFilled ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground/30'
                        }`}
                      />
                    </button>
                  );
                })}
                <span className="text-xs font-bold font-mono text-emerald-600 dark:text-emerald-400 ml-2">
                  {userRating} / 5 Stars
                </span>
              </div>
            </div>

            {/* Author Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground block">Your Name / Alias</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex M."
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full rounded-xl border border-input bg-background p-2.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground block">Buyer Status</label>
                <label className="flex items-center gap-2 p-2.5 rounded-xl border border-input bg-background text-xs cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={isVerified}
                    onChange={(e) => setIsVerified(e.target.checked)}
                    className="accent-emerald-500 rounded h-4 w-4"
                  />
                  <span className="text-foreground font-medium">Verified Product Owner</span>
                </label>
              </div>
            </div>

            {/* Review Title */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground block">Review Headline</label>
              <input
                type="text"
                required
                placeholder="e.g. Best noise cancellation for eyeglasses wearers!"
                value={reviewTitle}
                onChange={(e) => setReviewTitle(e.target.value)}
                className="w-full rounded-xl border border-input bg-background p-2.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Review Comment */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground block">Detailed Review & Experience</label>
              <textarea
                required
                rows={4}
                placeholder="Share your practical experience with build quality, battery life, ergonomics, or long-term durability..."
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                className="w-full rounded-xl border border-input bg-background p-2.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
              />
            </div>

            {/* Pros & Cons optional */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-emerald-600 dark:text-emerald-400 block">
                  Pros (Comma Separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Long battery, Zero clamp pinch"
                  value={proInput}
                  onChange={(e) => setProInput(e.target.value)}
                  className="w-full rounded-xl border border-input bg-background p-2.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-rose-600 dark:text-rose-400 block">
                  Cons (Comma Separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Proprietary clips, High price"
                  value={conInput}
                  onChange={(e) => setConInput(e.target.value)}
                  className="w-full rounded-xl border border-input bg-background p-2.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant={submittedSuccess ? 'emerald' : 'emerald'}
              className="w-full text-xs font-bold rounded-xl py-3 gap-2"
              disabled={submittedSuccess}
            >
              {submittedSuccess ? (
                <>
                  <Check className="h-4 w-4" /> Review Published Successfully!
                </>
              ) : (
                <>
                  <MessageSquare className="h-4 w-4" /> Publish Audited Review
                </>
              )}
            </Button>
          </form>
        )}
      </div>
    </Modal>
  );
};
