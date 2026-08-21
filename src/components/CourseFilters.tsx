import React from 'react';
import { CertificationType } from '../types';
import { 
  Award, 
  ShieldCheck, 
  TrendingUp, 
  LayoutGrid, 
  List, 
  Search, 
  X,
  Sparkles,
  SlidersHorizontal
} from 'lucide-react';

interface CourseFiltersProps {
  selectedCategory: CertificationType;
  onSelectCategory: (cat: CertificationType) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  viewMode: 'grid' | 'detailed';
  onViewModeChange: (mode: 'grid' | 'detailed') => void;
  totalCoursesCount: number;
  filteredCount: number;
}

export const CourseFilters: React.FC<CourseFiltersProps> = ({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  viewMode,
  onViewModeChange,
  totalCoursesCount,
  filteredCount
}) => {
  const categories: { id: CertificationType; label: string; count: number; icon: React.ReactNode }[] = [
    { id: 'ALL', label: 'All 5 Integrated Programs', count: 5, icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: 'CA', label: 'Chartered Accountancy (CA)', count: 3, icon: <Award className="w-3.5 h-3.5 text-blue-600" /> },
    { id: 'ACCA', label: 'ACCA Global (UK)', count: 1, icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> },
    { id: 'CMA', label: 'Cost & Management (CMA)', count: 1, icon: <TrendingUp className="w-3.5 h-3.5 text-amber-600" /> }
  ];

  return (
    <div id="course-filters-bar" className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200 mb-8 space-y-4">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`filter-tab-${cat.id.toLowerCase()}`}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-md shadow-slate-900/10'
                    : 'bg-slate-100/80 text-slate-700 hover:bg-slate-200/80'
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
                <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
                  isActive ? 'bg-amber-400 text-slate-950' : 'bg-slate-200 text-slate-700'
                }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* View Toggles & Search */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search Box */}
          <div className="relative flex-1 lg:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              id="course-search-field"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by subject, tool, or career..."
              className="w-full pl-9 pr-8 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* View Mode Buttons */}
          <div className="hidden sm:flex items-center bg-slate-100 rounded-xl p-1 border border-slate-200">
            <button
              id="view-grid-btn"
              onClick={() => onViewModeChange('grid')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'grid' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              id="view-list-btn"
              onClick={() => onViewModeChange('detailed')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'detailed' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Detailed List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Result Status line */}
      <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
        <div>
          Showing <span className="font-bold text-slate-900">{filteredCount}</span> of {totalCoursesCount} specialized commerce courses
          {searchQuery && <span> matching "<span className="text-amber-600 font-semibold">{searchQuery}</span>"</span>}
        </div>

        {(selectedCategory !== 'ALL' || searchQuery) && (
          <button
            onClick={() => {
              onSelectCategory('ALL');
              onSearchChange('');
            }}
            className="text-xs text-amber-700 hover:text-amber-800 font-semibold cursor-pointer underline underline-offset-2"
          >
            Clear all filters
          </button>
        )}
      </div>
    </div>
  );
};
