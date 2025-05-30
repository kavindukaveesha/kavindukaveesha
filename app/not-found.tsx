import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-space-950 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-nebula-400 to-pulsar-400">
          404
        </h1>
        <h2 className="mt-4 text-3xl font-semibold text-neutron-200">
          Page Not Found
        </h2>
        <p className="mt-2 text-neutron-500">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-8 flex gap-4 justify-center">
          <Link href="/">
            <Button className="bg-nebula-600 hover:bg-nebula-700 text-white">
              Go Home
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline" className="border-space-850 hover:bg-space-850">
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}