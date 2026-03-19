import { useState, useCallback } from "react";
import { Upload, Download, X, ImageIcon, Loader2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/logo.png";

const MAX_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

const Workspace = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const { toast } = useToast();

  const validateAndSet = useCallback((f: File) => {
    if (!ALLOWED_TYPES.includes(f.type)) {
      toast({ title: "Invalid format", description: "Only JPG, PNG, and WEBP are supported.", variant: "destructive" });
      return;
    }
    if (f.size > MAX_SIZE) {
      toast({ title: "File too large", description: "Maximum file size is 10 MB.", variant: "destructive" });
      return;
    }
    setFile(f);
    setResultUrl(null);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(f);
  }, [toast]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f) validateAndSet(f);
  }, [validateAndSet]);

  const handleProcess = async () => {
    if (!file) return;
    setProcessing(true);
    // Simulate processing - replace with real n8n webhook call
    await new Promise((r) => setTimeout(r, 3000));
    setResultUrl(preview); // placeholder
    setProcessing(false);
    toast({ title: "Background removed!", description: "Your image is ready to download." });
  };

  const reset = () => {
    setFile(null);
    setPreview(null);
    setResultUrl(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="SnapCut AI" className="h-8 w-8" />
            <span className="font-display text-lg font-semibold">SnapCut AI</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">5 free credits remaining</span>
            <Button variant="glow" size="sm" asChild>
              <Link to="/register">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Workspace */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-3xl">
          {!file ? (
            /* Drop Zone */
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              className={`glass-card border-2 border-dashed p-16 text-center cursor-pointer transition-all duration-200 ${
                dragOver ? "border-primary glow-primary" : "border-border hover:border-primary/50"
              }`}
              onClick={() => document.getElementById("file-input")?.click()}
            >
              <input
                id="file-input"
                type="file"
                accept=".jpg,.jpeg,.png,.webp"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) validateAndSet(f);
                }}
              />
              <div className="flex flex-col items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Upload className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold mb-2">Drop your image here</h3>
                  <p className="text-sm text-muted-foreground">or click to browse · JPG, PNG, WEBP · Max 10 MB</p>
                </div>
              </div>
            </div>
          ) : (
            /* Preview & Result */
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-xl font-semibold">
                  {processing ? "Processing..." : resultUrl ? "Result" : "Ready to process"}
                </h2>
                <Button variant="ghost" size="sm" onClick={reset}>
                  <X className="h-4 w-4 mr-1" /> Clear
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {/* Original */}
                <div className="glass-card p-4">
                  <p className="text-xs text-muted-foreground mb-2 font-medium">Original</p>
                  <div className="aspect-square bg-background rounded-lg overflow-hidden flex items-center justify-center">
                    {preview ? (
                      <img src={preview} alt="Original" className="max-h-full max-w-full object-contain" />
                    ) : (
                      <ImageIcon className="h-12 w-12 text-muted" />
                    )}
                  </div>
                </div>

                {/* Result */}
                <div className="glass-card p-4">
                  <p className="text-xs text-muted-foreground mb-2 font-medium">Background Removed</p>
                  <div className="aspect-square rounded-lg overflow-hidden flex items-center justify-center" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\"><rect width=\"10\" height=\"10\" fill=\"%23222\"/><rect x=\"10\" y=\"10\" width=\"10\" height=\"10\" fill=\"%23222\"/><rect x=\"10\" width=\"10\" height=\"10\" fill=\"%23333\"/><rect y=\"10\" width=\"10\" height=\"10\" fill=\"%23333\"/></svg>')" }}>
                    {processing ? (
                      <Loader2 className="h-12 w-12 text-primary animate-spin" />
                    ) : resultUrl ? (
                      <img src={resultUrl} alt="Result" className="max-h-full max-w-full object-contain" />
                    ) : (
                      <span className="text-sm text-muted-foreground">Click "Remove Background"</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Processing bar */}
              {processing && (
                <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
                  <div className="h-full gradient-cta rounded-full animate-pulse" style={{ width: "60%" }} />
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 justify-center">
                {!resultUrl && !processing && (
                  <Button variant="glow" size="lg" onClick={handleProcess}>
                    <Zap className="mr-2 h-5 w-5" />
                    Remove Background
                  </Button>
                )}
                {resultUrl && (
                  <Button variant="glow" size="lg" asChild>
                    <a href={resultUrl} download="snapcut-result.png">
                      <Download className="mr-2 h-5 w-5" />
                      Download Result
                    </a>
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};


export default Workspace;
