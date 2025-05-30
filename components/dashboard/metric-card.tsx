"use client"

import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeType?: 'increase' | 'decrease' | 'neutral';
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  description?: string;
  sparklineData?: number[];
  className?: string;
}

export function MetricCard({
  title,
  value,
  change,
  changeType = 'neutral',
  icon,
  trend,
  description,
  sparklineData,
  className,
}: MetricCardProps) {
  const getTrendIcon = () => {
    switch (trend || changeType) {
      case 'increase':
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-400" />;
      case 'decrease':
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-400" />;
      default:
        return <Minus className="h-4 w-4 text-blue-black-400" />;
    }
  };

  const getChangeColor = () => {
    switch (changeType) {
      case 'increase':
        return 'text-green-400';
      case 'decrease':
        return 'text-red-400';
      default:
        return 'text-blue-black-400';
    }
  };

  return (
    <Card className={cn('dashboard-card dashboard-card-hover animate-slide-up', className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {icon && (
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-black-600/30 to-blue-600/15 flex items-center justify-center border border-blue-black-500/30">
                {icon}
              </div>
            )}
            <div>
              <p className="text-sm font-medium text-blue-black-400">{title}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-2xl font-bold metric-value text-blue-black-100">
                  {value}
                </span>
                {change !== undefined && (
                  <div className={cn('flex items-center gap-1 text-sm', getChangeColor())}>
                    {getTrendIcon()}
                    <span>{change > 0 ? '+' : ''}{change}%</span>
                  </div>
                )}
              </div>
              {description && (
                <p className="text-xs text-blue-black-500 mt-1">{description}</p>
              )}
            </div>
          </div>
          
          {sparklineData && (
            <div className="flex items-end gap-0.5 h-8">
              {sparklineData.map((value, index) => (
                <div
                  key={index}
                  className={cn(
                    'w-1 rounded-t-sm bg-gradient-to-t transition-all duration-300',
                    changeType === 'increase' 
                      ? 'from-green-600 to-green-400' 
                      : changeType === 'decrease'
                      ? 'from-red-600 to-red-400'
                      : 'from-blue-black-600 to-blue-black-400'
                  )}
                  style={{
                    height: `${Math.max(2, (value / Math.max(...sparklineData)) * 32)}px`
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

interface StatsGridProps {
  children: React.ReactNode;
  className?: string;
}

export function StatsGrid({ children, className }: StatsGridProps) {
  return (
    <div className={cn(
      'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6',
      className
    )}>
      {children}
    </div>
  );
}