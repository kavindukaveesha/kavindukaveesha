import { LoadingTable } from '@/components/ui/loading';

export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <div className="h-8 bg-neutral-800 rounded w-48 animate-pulse" />
        <div className="h-4 bg-neutral-800 rounded w-96 animate-pulse" />
      </div>
      <LoadingTable />
    </div>
  );
}