import { useState, useMemo } from 'react';
import { useRouter } from '@tanstack/react-router';
import { Search, SlidersHorizontal, Plus, Loader2, PackageOpen } from 'lucide-react';
import { Category } from '../backend';
import { useGetProducts } from '../hooks/useQueries';
import ProductCard from '../components/ProductCard';

type FilterCategory = 'all' | Category;
type SortOption = 'default' | 'price-asc' | 'price-desc' | 'name-asc';

const categoryFilters: { value: FilterCategory; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: Category.mensWear, label: "Men's Wear" },
  { value: Category.womensWear, label: "Women's Wear" },
  { value: Category.kidsWear, label: "Kids' Wear" },
  { value: Category.ethnicWear, label: 'Traditional/Ethnic' },
  { value: Category.accessories, label: 'Accessories' },
];

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'default', label: 'Default' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A–Z' },
];

export default function Catalogue() {
  const router = useRouter();
  const { data: products = [], isLoading, isError } = useGetProducts();
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('all');
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAndSorted = useMemo(() => {
    let result = [...products];

    // Filter by category
    if (activeCategory !== 'all') {
      result = result.filter((p) => p.category === activeCategory);
    }

    // Filter by search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => Number(a.price) - Number(b.price));
        break;
      case 'price-desc':
        result.sort((a, b) => Number(b.price) - Number(a.price));
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return result;
  }, [products, activeCategory, sortBy, searchQuery]);

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="bg-maroon py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-px w-8 bg-saffron" />
            <span className="text-saffron font-sans text-sm font-semibold tracking-widest uppercase">Browse</span>
          </div>
          <h1 className="font-serif text-4xl font-bold text-cream mb-2">Product Catalogue</h1>
          <p className="font-sans text-cream/60 text-sm">
            {isLoading ? 'Loading products...' : `${products.length} product${products.length !== 1 ? 's' : ''} available`}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls */}
        <div className="flex flex-col gap-4 mb-8">
          {/* Search + Sort row */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded border border-input bg-card font-sans text-sm focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-saffron transition-colors"
              />
            </div>
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-3 py-2.5 rounded border border-input bg-card font-sans text-sm focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-saffron transition-colors cursor-pointer"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <button
              onClick={() => router.navigate({ to: '/add-product' })}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-saffron text-maroon font-sans font-bold text-sm rounded hover:bg-gold transition-colors shadow-sm flex-shrink-0"
            >
              <Plus className="w-4 h-4" />
              Add Product
            </button>
          </div>

          {/* Category filter pills */}
          <div className="flex flex-wrap gap-2">
            {categoryFilters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveCategory(filter.value)}
                className={`px-4 py-1.5 rounded-full font-sans text-sm font-semibold transition-all duration-200 border ${
                  activeCategory === filter.value
                    ? 'bg-maroon text-cream border-maroon shadow-sm'
                    : 'bg-card text-foreground border-border hover:border-maroon hover:text-maroon'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <Loader2 className="w-10 h-10 text-saffron animate-spin" />
            <p className="font-sans text-muted-foreground">Loading products...</p>
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
              <PackageOpen className="w-8 h-8 text-destructive" />
            </div>
            <p className="font-sans text-muted-foreground">Failed to load products. Please try again.</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !isError && filteredAndSorted.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center">
              <PackageOpen className="w-10 h-10 text-muted-foreground" />
            </div>
            <div className="text-center">
              <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                {products.length === 0 ? 'No Products Yet' : 'No Results Found'}
              </h3>
              <p className="font-sans text-muted-foreground text-sm max-w-sm">
                {products.length === 0
                  ? 'Start building your catalogue by adding your first product.'
                  : 'Try adjusting your search or filter to find what you\'re looking for.'}
              </p>
            </div>
            {products.length === 0 && (
              <button
                onClick={() => router.navigate({ to: '/add-product' })}
                className="inline-flex items-center gap-2 px-6 py-3 bg-maroon text-cream font-sans font-bold rounded hover:bg-maroon-deep transition-colors shadow-md mt-2"
              >
                <Plus className="w-4 h-4" />
                Add First Product
              </button>
            )}
          </div>
        )}

        {/* Product Grid */}
        {!isLoading && !isError && filteredAndSorted.length > 0 && (
          <>
            <p className="font-sans text-xs text-muted-foreground mb-4">
              Showing {filteredAndSorted.length} of {products.length} products
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
              {filteredAndSorted.map((product) => (
                <ProductCard key={Number(product.id)} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
