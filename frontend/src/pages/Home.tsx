import { useRouter } from '@tanstack/react-router';
import { ArrowRight, Star, MapPin, Phone, Mail, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const categories = [
  {
    name: "Men's Wear",
    description: 'Kurtas, shirts, trousers & more',
    image: '/assets/generated/mens-wear.dim_400x400.png',
    href: '/catalogue',
  },
  {
    name: "Women's Wear",
    description: 'Sarees, salwar suits, kurtis & more',
    image: '/assets/generated/womens-wear.dim_400x400.png',
    href: '/catalogue',
  },
  {
    name: "Kids' Wear",
    description: 'Comfortable & colorful clothing',
    image: '/assets/generated/kids-wear.dim_400x400.png',
    href: '/catalogue',
  },
  {
    name: 'Traditional/Ethnic Wear',
    description: 'Lehengas, sherwanis & ethnic sets',
    image: '/assets/generated/ethnic-wear.dim_400x400.png',
    href: '/catalogue',
  },
];

export default function Home() {
  const router = useRouter();

  return (
    <>
      {/* Hero Section */}
      <section id="home" className="relative min-h-[85vh] flex items-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="/assets/generated/hero-banner.dim_1440x600.png"
            alt="OM COLLECTION Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-maroon/90 via-maroon/70 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-px w-8 bg-saffron" />
              <span className="text-saffron font-sans text-sm font-semibold tracking-widest uppercase">
                Est. Baramkela
              </span>
            </div>
            <h1 className="font-serif text-5xl sm:text-6xl font-bold text-cream leading-tight mb-4">
              OM<br />
              <span className="text-saffron">COLLECTION</span>
            </h1>
            <p className="font-sans text-cream/80 text-lg leading-relaxed mb-8">
              Discover the finest quality clothing — from traditional ethnic wear to modern styles.
              Serving Baramkela with pride and passion.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => router.navigate({ to: '/catalogue' })}
                className="inline-flex items-center gap-2 px-6 py-3 bg-saffron text-maroon font-sans font-bold rounded hover:bg-gold transition-colors shadow-lg"
              >
                Explore Catalogue
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-cream/40 text-cream font-sans font-semibold rounded hover:border-saffron hover:text-saffron transition-colors"
              >
                Our Collections
              </button>
            </div>

            <div className="flex items-center gap-2 mt-8 text-cream/60 font-sans text-sm">
              <MapPin className="w-4 h-4 text-saffron" />
              <span>Baramkela, Chhattisgarh, India – PIN 496551</span>
            </div>
          </div>
        </div>
      </section>

      {/* Collections Section */}
      <section id="collections" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px w-12 bg-saffron" />
              <span className="text-saffron font-sans text-sm font-semibold tracking-widest uppercase">Our Range</span>
              <div className="h-px w-12 bg-saffron" />
            </div>
            <h2 className="font-serif text-4xl font-bold text-maroon mb-3">Featured Collections</h2>
            <p className="font-sans text-muted-foreground max-w-xl mx-auto">
              Explore our curated range of clothing for every occasion and every member of the family.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => router.navigate({ to: '/catalogue' })}
                className="group relative rounded-lg overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 text-left"
              >
                <div className="aspect-square">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-maroon/80 via-maroon/20 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="font-serif text-cream font-bold text-lg leading-tight">{cat.name}</h3>
                  <p className="font-sans text-cream/70 text-xs mt-1">{cat.description}</p>
                  <div className="flex items-center gap-1 mt-2 text-saffron text-xs font-semibold font-sans">
                    <span>View All</span>
                    <ChevronRight className="w-3 h-3" />
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="text-center mt-10">
            <button
              onClick={() => router.navigate({ to: '/catalogue' })}
              className="inline-flex items-center gap-2 px-8 py-3 bg-maroon text-cream font-sans font-bold rounded hover:bg-maroon-deep transition-colors shadow-md"
            >
              View Full Catalogue
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="h-px w-12 bg-saffron" />
                <span className="text-saffron font-sans text-sm font-semibold tracking-widest uppercase">Our Story</span>
              </div>
              <h2 className="font-serif text-4xl font-bold text-maroon mb-6">About OM COLLECTION</h2>
              <p className="font-sans text-foreground/80 leading-relaxed mb-4">
                OM COLLECTION is a trusted cloth business rooted in the heart of Baramkela, Chhattisgarh.
                We take pride in offering a wide range of quality clothing that blends traditional Indian
                craftsmanship with contemporary styles.
              </p>
              <p className="font-sans text-foreground/80 leading-relaxed mb-6">
                From vibrant ethnic wear to everyday essentials, our collection caters to men, women, and
                children alike. We believe that great clothing should be accessible to everyone in our community.
              </p>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: '500+', label: 'Products' },
                  { value: '4', label: 'Categories' },
                  { value: '100%', label: 'Quality' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center p-4 bg-card rounded-lg shadow-xs border border-border">
                    <div className="font-serif text-2xl font-bold text-saffron">{stat.value}</div>
                    <div className="font-sans text-xs text-muted-foreground mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="rounded-lg overflow-hidden shadow-card-hover">
                <img
                  src="/assets/generated/hero-banner.dim_1440x600.png"
                  alt="OM COLLECTION Store"
                  className="w-full h-72 object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-saffron text-maroon p-4 rounded-lg shadow-lg">
                <div className="flex items-center gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-maroon text-maroon" />
                  ))}
                </div>
                <p className="font-sans text-xs font-bold">Trusted by the community</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px w-12 bg-saffron" />
              <span className="text-saffron font-sans text-sm font-semibold tracking-widest uppercase">Get In Touch</span>
              <div className="h-px w-12 bg-saffron" />
            </div>
            <h2 className="font-serif text-4xl font-bold text-maroon mb-3">Contact Us</h2>
            <p className="font-sans text-muted-foreground">We'd love to hear from you. Visit us or send a message.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-5 bg-card rounded-lg border border-border shadow-xs">
                <div className="w-10 h-10 rounded-full bg-saffron/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-saffron" />
                </div>
                <div>
                  <h4 className="font-serif font-semibold text-foreground mb-1">Our Address</h4>
                  <p className="font-sans text-sm text-muted-foreground">
                    OM COLLECTION<br />
                    Baramkela, Chhattisgarh<br />
                    India – PIN 496551
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 bg-card rounded-lg border border-border shadow-xs">
                <div className="w-10 h-10 rounded-full bg-saffron/20 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-saffron" />
                </div>
                <div>
                  <h4 className="font-serif font-semibold text-foreground mb-1">Phone</h4>
                  <p className="font-sans text-sm text-muted-foreground">Available in store</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 bg-card rounded-lg border border-border shadow-xs">
                <div className="w-10 h-10 rounded-full bg-saffron/20 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-saffron" />
                </div>
                <div>
                  <h4 className="font-serif font-semibold text-foreground mb-1">Email</h4>
                  <p className="font-sans text-sm text-muted-foreground">Contact us in store</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <form
              className="space-y-4"
              onSubmit={(e) => { e.preventDefault(); }}
            >
              <div>
                <label className="block font-sans text-sm font-semibold text-foreground mb-1.5">Your Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full px-4 py-2.5 rounded border border-input bg-card font-sans text-sm focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-saffron transition-colors"
                />
              </div>
              <div>
                <label className="block font-sans text-sm font-semibold text-foreground mb-1.5">Phone Number</label>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-2.5 rounded border border-input bg-card font-sans text-sm focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-saffron transition-colors"
                />
              </div>
              <div>
                <label className="block font-sans text-sm font-semibold text-foreground mb-1.5">Message</label>
                <textarea
                  rows={4}
                  placeholder="Write your message..."
                  className="w-full px-4 py-2.5 rounded border border-input bg-card font-sans text-sm focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-saffron transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-maroon text-cream font-sans font-bold rounded hover:bg-maroon-deep transition-colors shadow-md"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
