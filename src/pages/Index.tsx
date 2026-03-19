import { Upload, Zap, Download, Shield, Sparkles, CreditCard, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 border-b border-border bg-background/80 backdrop-blur-md">
    <div className="container mx-auto flex h-16 items-center justify-between px-4">
      <Link to="/" className="flex items-center gap-2">
        <img src={logo} alt="SnapCut AI" className="h-8 w-8" />
        <span className="font-display text-lg font-semibold text-foreground">SnapCut AI</span>
      </Link>
      <div className="hidden md:flex items-center gap-8">
        <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
        <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
        <a href="#api" className="text-sm text-muted-foreground hover:text-foreground transition-colors">API</a>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/login">Log in</Link>
        </Button>
        <Button variant="glow" size="sm" asChild>
          <Link to="/register">Get Started</Link>
        </Button>
      </div>
    </div>
  </nav>
);

const HeroSection = () => (
  <section className="relative min-h-[90vh] flex items-center justify-center pt-16 overflow-hidden">
    {/* Background glow effects */}
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
    <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-accent/10 rounded-full blur-[100px]" />

    <div className="container mx-auto px-4 text-center relative z-10">
      <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-8">
        <Sparkles className="h-4 w-4 text-accent" />
        <span className="text-sm text-muted-foreground">AI-Powered Background Removal</span>
      </div>

      <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight mb-6">
        Remove Backgrounds
        <br />
        <span className="gradient-text">in Seconds</span>
      </h1>

      <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
        Upload any image and get a clean, transparent background instantly.
        Powered by cutting-edge AI for pixel-perfect results.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button variant="glow" size="lg" className="text-base px-8 py-6" asChild>
          <Link to="/workspace">
            <Upload className="mr-2 h-5 w-5" />
            Remove Background Free
          </Link>
        </Button>
        <Button variant="neon" size="lg" className="text-base px-8 py-6" asChild>
          <a href="#pricing">
            View Pricing
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </Button>
      </div>

      <p className="text-sm text-muted-foreground mt-6">No signup required · 5 free images/day</p>
    </div>
  </section>
);

const features = [
  { icon: Zap, title: "Lightning Fast", description: "Get results in under 5 seconds with our optimized AI pipeline." },
  { icon: Shield, title: "Secure & Private", description: "Images auto-delete after 24 hours. No permanent storage." },
  { icon: Download, title: "High Quality", description: "Up to 5000x5000 resolution. JPG, PNG, WEBP supported." },
  { icon: Sparkles, title: "AI Precision", description: "Pixel-perfect edge detection for hair, fur, and complex objects." },
  { icon: CreditCard, title: "Flexible Plans", description: "Free tier included. Upgrade for unlimited processing." },
  { icon: Upload, title: "Bulk API", description: "Process thousands of images via our B2B REST API." },
];

const FeaturesSection = () => (
  <section id="features" className="py-24">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4">
          Why <span className="gradient-text">SnapCut AI</span>?
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Professional background removal, simplified for everyone.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f) => (
          <div key={f.title} className="glass-card p-6 hover:neon-border transition-all duration-300 group">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:glow-primary transition-shadow">
              <f.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-display text-lg font-semibold mb-2">{f.title}</h3>
            <p className="text-sm text-muted-foreground">{f.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const plans = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    features: ["5 images/day", "Standard quality", "Web upload only", "24h auto-delete"],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "₹499",
    period: "/month",
    features: ["Unlimited images", "HD quality output", "Bulk upload", "Priority processing", "API access"],
    cta: "Upgrade to Pro",
    highlighted: true,
  },
  {
    name: "Credit Pack",
    price: "₹199",
    period: "/50 credits",
    features: ["50 image credits", "HD quality output", "No expiry", "API access", "Pay as you go"],
    cta: "Buy Credits",
    highlighted: false,
  },
];

const PricingSection = () => (
  <section id="pricing" className="py-24">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4">
          Simple, Transparent <span className="gradient-text">Pricing</span>
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Start free. Scale as you grow.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`glass-card p-8 flex flex-col ${plan.highlighted ? "neon-border scale-105" : ""}`}
          >
            <h3 className="font-display text-xl font-semibold mb-1">{plan.name}</h3>
            <div className="mb-6">
              <span className="text-3xl font-display font-bold">{plan.price}</span>
              <span className="text-muted-foreground text-sm ml-1">{plan.period}</span>
            </div>
            <ul className="space-y-3 mb-8 flex-1">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-secondary" />
                  {f}
                </li>
              ))}
            </ul>
            <Button variant={plan.highlighted ? "glow" : "neon"} className="w-full" asChild>
              <Link to="/register">{plan.cta}</Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="border-t border-border py-12">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img src={logo} alt="SnapCut AI" className="h-8 w-8" />
            <span className="font-display font-semibold">SnapCut AI</span>
          </div>
          <p className="text-sm text-muted-foreground">AI-powered background removal for everyone.</p>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-3 text-sm">Product</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#features" className="hover:text-foreground transition-colors">Features</a></li>
            <li><a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a></li>
            <li><a href="#api" className="hover:text-foreground transition-colors">API</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-3 text-sm">Company</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-foreground transition-colors">About</Link></li>
            <li><Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
            <li><Link to="/blog" className="hover:text-foreground transition-colors">Blog</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-3 text-sm">Legal</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} SnapCut AI. All rights reserved.
      </div>
    </div>
  </footer>
);

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <HeroSection />
    <FeaturesSection />
    <PricingSection />
    <Footer />
  </div>
);

export default Index;
