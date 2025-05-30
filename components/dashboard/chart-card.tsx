"use client"

import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  actions?: React.ReactNode;
}

export function ChartCard({
  title,
  subtitle,
  children,
  className,
  actions,
}: ChartCardProps) {
  return (
    <Card className={cn('chart-container dashboard-card-hover', className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle className="text-lg font-semibold text-blue-black-100">{title}</CardTitle>
          {subtitle && (
            <p className="text-sm text-blue-black-400 mt-1">{subtitle}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          {actions}
          <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-black-400 hover:text-blue-black-200">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
}

// Simple Area Chart Component (since we don't have a charting library)
interface SimpleAreaChartProps {
  data: { name: string; value: number }[];
  height?: number;
  color?: string;
}

export function SimpleAreaChart({ data, height = 200, color = '#3B82F6' }: SimpleAreaChartProps) {
  const maxValue = Math.max(...data.map(d => d.value));
  const points = data.map((item, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - (item.value / maxValue) * 80; // 80% of height for chart area
    return `${x},${y}`;
  }).join(' ');

  const areaPoints = `0,100 ${points} 100,100`;

  return (
    <div className="w-full" style={{ height }}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.4" />
            <stop offset="100%" stopColor={color} stopOpacity="0.1" />
          </linearGradient>
        </defs>
        
        {/* Grid lines */}
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#grid)" />
        
        {/* Area */}
        <polygon
          points={areaPoints}
          fill="url(#areaGradient)"
          className="animate-slide-up"
        />
        
        {/* Line */}
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="2"
          className="animate-slide-up"
        />
        
        {/* Data points */}
        {data.map((item, index) => {
          const x = (index / (data.length - 1)) * 100;
          const y = 100 - (item.value / maxValue) * 80;
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r="2"
              fill={color}
              className="animate-slide-up opacity-0 hover:opacity-100 transition-opacity"
            />
          );
        })}
      </svg>
      
      {/* X-axis labels */}
      <div className="flex justify-between mt-2 px-2">
        {data.map((item, index) => (
          <span key={index} className="text-xs text-blue-black-400">
            {item.name}
          </span>
        ))}
      </div>
    </div>
  );
}

// Simple Bar Chart Component
interface SimpleBarChartProps {
  data: { name: string; value: number; color?: string }[];
  height?: number;
}

export function SimpleBarChart({ data, height = 200 }: SimpleBarChartProps) {
  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div className="w-full" style={{ height }}>
      <div className="flex items-end justify-between h-full gap-2">
        {data.map((item, index) => (
          <div key={index} className="flex-1 flex flex-col items-center gap-2">
            <div
              className="w-full rounded-t-md bg-gradient-to-t transition-all duration-500 animate-slide-up"
              style={{
                height: `${(item.value / maxValue) * 80}%`,
                background: item.color || `linear-gradient(to top, #3B82F6, #60A5FA)`,
                animationDelay: `${index * 100}ms`
              }}
            />
            <span className="text-xs text-blue-black-400 text-center">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}