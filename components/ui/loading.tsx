import { cn } from "@/lib/utils";

interface LoadingProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  className?: string;
}

export function LoadingSpinner({ size = "md", className }: LoadingProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12"
  };

  return (
    <div className={cn("animate-spin rounded-full border-2 border-neutral-800 border-t-neutral-400", sizeClasses[size], className)} />
  );
}

export function LoadingDots({ className }: { className?: string }) {
  return (
    <div className={cn("flex space-x-1", className)}>
      <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
      <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
      <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" />
    </div>
  );
}

export function LoadingCard() {
  return (
    <div className="animate-pulse">
      <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="h-4 bg-neutral-800 rounded w-1/3" />
          <div className="h-8 w-8 bg-neutral-800 rounded" />
        </div>
        <div className="space-y-2">
          <div className="h-8 bg-neutral-800 rounded w-1/2" />
          <div className="h-4 bg-neutral-800 rounded w-3/4" />
        </div>
      </div>
    </div>
  );
}

export function LoadingTable() {
  return (
    <div className="animate-pulse">
      <div className="bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden">
        <div className="p-6 border-b border-neutral-800">
          <div className="h-6 bg-neutral-800 rounded w-1/4" />
        </div>
        <div className="p-0">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="border-b border-neutral-800 p-4">
              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 bg-neutral-800 rounded-full" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-neutral-800 rounded w-1/4" />
                  <div className="h-3 bg-neutral-800 rounded w-1/2" />
                </div>
                <div className="h-8 bg-neutral-800 rounded w-20" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function LoadingPage({ text = "Loading..." }: LoadingProps) {
  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center">
      <LoadingSpinner size="lg" />
      <p className="mt-4 text-neutral-400">{text}</p>
    </div>
  );
}