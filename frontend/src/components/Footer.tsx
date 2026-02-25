import { ShoppingBag, MapPin, Heart } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();
  const appId = encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : 'om-collection');

  return (
    <footer className="bg-maroon-deep text-cream/80 font-sans">
      {/* Decorative top border */}
      <div className="h-1 bg-gradient-to-r from-maroon via-saffron to-maroon" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-full bg-saffron flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-maroon" />
              </div>
              <div>
                <span className="font-serif text-lg font-bold text-cream block">OM COLLECTION</span>
                <span className="text-xs text-saffron tracking-widest uppercase">Premium Clothing</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-cream/60">
              Your trusted destination for quality clothing in Baramkela, Chhattisgarh. Tradition meets style.
            </p>
          </div>

          {/* Location */}
          <div>
            <h4 className="font-serif text-cream font-semibold mb-4 text-base">Find Us</h4>
            <div className="flex items-start gap-2 text-sm text-cream/60">
              <MapPin className="w-4 h-4 text-saffron mt-0.5 flex-shrink-0" />
              <address className="not-italic leading-relaxed">
                OM COLLECTION<br />
                Baramkela, Chhattisgarh<br />
                India – PIN 496551
              </address>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-cream font-semibold mb-4 text-base">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="text-cream/60 hover:text-saffron transition-colors">Home</a></li>
              <li><a href="/catalogue" className="text-cream/60 hover:text-saffron transition-colors">Catalogue</a></li>
              <li><a href="/#collections" className="text-cream/60 hover:text-saffron transition-colors">Collections</a></li>
              <li><a href="/#about" className="text-cream/60 hover:text-saffron transition-colors">About Us</a></li>
              <li><a href="/#contact" className="text-cream/60 hover:text-saffron transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-cream/40">
          <p>© {year} OM COLLECTION. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with{' '}
            <Heart className="w-3 h-3 text-saffron fill-saffron mx-0.5" />
            {' '}using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-saffron hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
