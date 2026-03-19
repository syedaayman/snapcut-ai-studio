import { Link } from "react-router-dom";
import { Upload, CreditCard, History, Settings, BarChart3, ImageIcon, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const stats = [
  { label: "Images Processed", value: "127", icon: ImageIcon },
  { label: "Credits Remaining", value: "43", icon: Zap },
  { label: "This Month", value: "89", icon: BarChart3 },
];

const recentUploads = [
  { name: "product-photo.jpg", date: "2 hours ago", status: "Completed" },
  { name: "headshot.png", date: "5 hours ago", status: "Completed" },
  { name: "banner-image.webp", date: "1 day ago", status: "Completed" },
  { name: "team-photo.jpg", date: "2 days ago", status: "Completed" },
];

const sidebarItems = [
  { label: "Dashboard", icon: BarChart3, href: "/dashboard", active: true },
  { label: "Upload", icon: Upload, href: "/workspace" },
  { label: "History", icon: History, href: "/dashboard" },
  { label: "Billing", icon: CreditCard, href: "/dashboard" },
  { label: "Settings", icon: Settings, href: "/dashboard" },
];

const Dashboard = () => (
  <div className="min-h-screen flex">
    {/* Sidebar */}
    <aside className="w-64 border-r border-border bg-card/50 p-4 hidden md:flex flex-col">
      <Link to="/" className="flex items-center gap-2 mb-8 px-2">
        <img src={logo} alt="SnapCut AI" className="h-8 w-8" />
        <span className="font-display font-semibold">SnapCut AI</span>
      </Link>
      <nav className="space-y-1 flex-1">
        {sidebarItems.map((item) => (
          <Link
            key={item.label}
            to={item.href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
              item.active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            }`}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="glass-card p-4">
        <p className="text-xs text-muted-foreground mb-2">Free Plan</p>
        <p className="text-sm font-medium mb-3">3 of 5 daily credits used</p>
        <Button variant="glow" size="sm" className="w-full" asChild>
          <Link to="/register">Upgrade</Link>
        </Button>
      </div>
    </aside>

    {/* Main Content */}
    <main className="flex-1 p-6 md:p-8">
      <div className="max-w-5xl">
        <div className="mb-8">
          <h1 className="font-display text-2xl font-semibold mb-1">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Welcome back! Here's your overview.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {stats.map((s) => (
            <div key={s.label} className="glass-card p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground">{s.label}</span>
                <s.icon className="h-4 w-4 text-primary" />
              </div>
              <p className="text-3xl font-display font-bold">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Quick Action */}
        <div className="glass-card neon-border p-6 mb-8 flex items-center justify-between">
          <div>
            <h3 className="font-display font-semibold mb-1">Remove a background</h3>
            <p className="text-sm text-muted-foreground">Upload an image and get instant results.</p>
          </div>
          <Button variant="glow" asChild>
            <Link to="/workspace">
              <Upload className="mr-2 h-4 w-4" /> Upload Image
            </Link>
          </Button>
        </div>

        {/* Recent Uploads */}
        <div className="glass-card">
          <div className="p-4 border-b border-border">
            <h3 className="font-display font-semibold">Recent Uploads</h3>
          </div>
          <div className="divide-y divide-border">
            {recentUploads.map((u) => (
              <div key={u.name} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <ImageIcon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{u.name}</p>
                    <p className="text-xs text-muted-foreground">{u.date}</p>
                  </div>
                </div>
                <span className="text-xs text-secondary font-medium">{u.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  </div>
);

export default Dashboard;
