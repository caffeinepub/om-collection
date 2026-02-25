import { useState } from 'react';
import { useRouter, useRouterState } from '@tanstack/react-router';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navLinks = [
  { label: 'Home', href: '/', isRoute: true },
  { label: 'Collections', href: '/#collections', isRoute: false },
  { label: 'About', href: '/#about', isRoute: false },
  { label: 'Contact', href: '/#contact', isRoute: false },
  { label: 'Catalogue', href: '/catalogue', isRoute: true },
];

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const handleNavClick = (href: string, isRoute: boolean) => {
    setMobileOpen(false);
    if (isRoute) {
      router.navigate({ to: href });
    } else {
      // For hash links, navigate to home first if not there
      if (currentPath !== '/') {
        router.navigate({ to: '/' });
        setTimeout(() => {
          const id = href.replace('/#', '');
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const id = href.replace('/#', '');
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const isActive = (href: string) => {
    if (href === '/') return currentPath === '/';
    return currentPath.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-maroon shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => router.navigate({ to: '/' })}
            className="flex items-center gap-2 group"
          >
            <div className="w-9 h-9 rounded-full bg-saffron flex items-center justify-center shadow-sm">
              <ShoppingBag className="w-5 h-5 text-maroon" />
            </div>
            <div className="text-left">
              <span className="font-serif text-lg font-bold text-cream leading-none block tracking-wide">
                OM COLLECTION
              </span>
              <span className="text-xs text-saffron font-sans tracking-widest uppercase leading-none">
                Baramkela
              </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href, link.isRoute)}
                className={`px-4 py-2 rounded-sm font-sans text-sm font-semibold tracking-wide transition-all duration-200 ${
                  isActive(link.href) && link.isRoute
                    ? 'text-saffron border-b-2 border-saffron'
                    : 'text-cream/80 hover:text-saffron hover:bg-white/5'
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => router.navigate({ to: '/add-product' })}
              className={`ml-3 px-4 py-2 rounded font-sans text-sm font-bold tracking-wide transition-all duration-200 bg-saffron text-maroon hover:bg-gold ${
                currentPath === '/add-product' ? 'ring-2 ring-cream/40' : ''
              }`}
            >
              + Add Product
            </button>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-cream p-2 rounded hover:bg-white/10 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-maroon-deep border-t border-white/10 animate-fade-in">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href, link.isRoute)}
                className={`w-full text-left px-4 py-3 rounded font-sans text-sm font-semibold tracking-wide transition-all ${
                  isActive(link.href) && link.isRoute
                    ? 'text-saffron bg-white/10'
                    : 'text-cream/80 hover:text-saffron hover:bg-white/5'
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => { router.navigate({ to: '/add-product' }); setMobileOpen(false); }}
              className="w-full text-left px-4 py-3 rounded font-sans text-sm font-bold tracking-wide bg-saffron text-maroon mt-2"
            >
              + Add Product
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
