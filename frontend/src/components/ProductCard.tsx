import { useState } from 'react';
import { Tag, IndianRupee } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Product, Category } from '../backend';

interface ProductCardProps {
  product: Product;
}

const categoryConfig: Record<Category, { label: string; fallback: string; color: string }> = {
  [Category.mensWear]: {
    label: "Men's Wear",
    fallback: '/assets/generated/mens-wear.dim_400x400.png',
    color: 'bg-blue-100 text-blue-800',
  },
  [Category.womensWear]: {
    label: "Women's Wear",
    fallback: '/assets/generated/womens-wear.dim_400x400.png',
    color: 'bg-pink-100 text-pink-800',
  },
  [Category.kidsWear]: {
    label: "Kids' Wear",
    fallback: '/assets/generated/kids-wear.dim_400x400.png',
    color: 'bg-yellow-100 text-yellow-800',
  },
  [Category.ethnicWear]: {
    label: 'Traditional/Ethnic Wear',
    fallback: '/assets/generated/ethnic-wear.dim_400x400.png',
    color: 'bg-orange-100 text-orange-800',
  },
  [Category.accessories]: {
    label: 'Accessories',
    fallback: '/assets/generated/ethnic-wear.dim_400x400.png',
    color: 'bg-purple-100 text-purple-800',
  },
};

export default function ProductCard({ product }: ProductCardProps) {
  const config = categoryConfig[product.category] ?? categoryConfig[Category.accessories];
  const [imgSrc, setImgSrc] = useState(product.imageUrl || config.fallback);

  return (
    <article className="group bg-card rounded-lg overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 border border-border flex flex-col">
      {/* Image */}
      <div className="relative overflow-hidden bg-secondary aspect-square">
        <img
          src={imgSrc}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={() => setImgSrc(config.fallback)}
        />
        {/* Category badge overlay */}
        <div className="absolute top-3 left-3">
          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold font-sans ${config.color} shadow-sm`}>
            <Tag className="w-3 h-3" />
            {config.label}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-serif text-base font-semibold text-foreground leading-snug mb-1 line-clamp-2 group-hover:text-maroon transition-colors">
          {product.name}
        </h3>
        {product.description && (
          <p className="text-xs text-muted-foreground font-sans leading-relaxed line-clamp-2 mb-3 flex-1">
            {product.description}
          </p>
        )}
        <div className="mt-auto pt-3 border-t border-border flex items-center justify-between">
          <div className="flex items-center gap-0.5 text-maroon font-bold font-sans text-lg">
            <IndianRupee className="w-4 h-4" />
            <span>{Number(product.price).toLocaleString('en-IN')}</span>
          </div>
          <span className="text-xs text-muted-foreground font-sans">ID: {Number(product.id)}</span>
        </div>
      </div>
    </article>
  );
}
