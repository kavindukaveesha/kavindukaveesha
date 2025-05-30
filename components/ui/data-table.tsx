'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Search, 
  Loader2, 
  ChevronDown, 
  Filter,
  X,
  RotateCcw
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';

export interface DataTableColumn<T = any> {
  key: string;
  title: string;
  render?: (value: any, record: T) => React.ReactNode;
  sortable?: boolean;
  filterable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

export interface DataTableFilter {
  key: string;
  label: string;
  type: 'select' | 'multiselect' | 'text' | 'date' | 'number';
  options?: { label: string; value: string }[];
  placeholder?: string;
}

export interface DataTableAction<T = any> {
  label: string;
  icon?: React.ReactNode;
  onClick: (record: T) => void;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  disabled?: (record: T) => boolean;
}

export interface DataTablePagination {
  page: number;
  limit: number;
  totalPages: number;
  totalRecords: number;
}

export interface DataTableProps<T = any> {
  title: string;
  description?: string;
  data: T[];
  columns: DataTableColumn<T>[];
  pagination: DataTablePagination;
  loading?: boolean;
  filters?: DataTableFilter[];
  actions?: DataTableAction<T>[];
  onPageChange: (page: number) => void;
  onLimitChange?: (limit: number) => void;
  onSearch?: (search: string) => void;
  onFilterChange?: (filters: Record<string, any>) => void;
  onSort?: (key: string, direction: 'asc' | 'desc') => void;
  headerActions?: React.ReactNode;
  emptyStateIcon?: React.ReactNode;
  emptyStateTitle?: string;
  emptyStateDescription?: string;
  emptyStateAction?: React.ReactNode;
  searchPlaceholder?: string;
  showSearch?: boolean;
  showFilters?: boolean;
  showPagination?: boolean;
  className?: string;
  tableClassName?: string;
}

export function DataTable<T extends Record<string, any>>({
  title,
  description,
  data,
  columns,
  pagination,
  loading = false,
  filters = [],
  actions = [],
  onPageChange,
  onLimitChange,
  onSearch,
  onFilterChange,
  onSort,
  headerActions,
  emptyStateIcon,
  emptyStateTitle = "No data found",
  emptyStateDescription = "There are no records to display",
  emptyStateAction,
  searchPlaceholder = "Search...",
  showSearch = true,
  showFilters = true,
  showPagination = true,
  className = "",
  tableClassName = "",
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({});
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

  // Calculate table height (screen height - 10%)
  const tableHeight = 'calc(100vh - 10vh - 300px)'; // Subtracting additional space for header, filters, pagination

  // Handle search
  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  // Handle filter changes
  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...activeFilters, [key]: value };
    setActiveFilters(newFilters);
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setActiveFilters({});
    setSearchTerm('');
    if (onFilterChange) {
      onFilterChange({});
    }
    if (onSearch) {
      onSearch('');
    }
  };

  // Handle sorting
  const handleSort = (key: string) => {
    if (!onSort) return;
    
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    
    setSortConfig({ key, direction });
    onSort(key, direction);
  };

  // Get active filter count
  const activeFilterCount = useMemo(() => {
    return Object.values(activeFilters).filter(value => 
      value !== '' && value !== 'all' && value !== null && value !== undefined
    ).length + (searchTerm ? 1 : 0);
  }, [activeFilters, searchTerm]);

  // Render table cell content
  const renderCellContent = (column: DataTableColumn<T>, record: T) => {
    if (column.render) {
      return column.render(record[column.key], record);
    }
    return record[column.key];
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          {description && (
            <p className="text-muted-foreground">{description}</p>
          )}
        </div>
        {headerActions}
      </div>

      <Card className="data-table">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">{title}</CardTitle>
              {description && <CardDescription className="text-gray-400">{description}</CardDescription>}
            </div>
            {activeFilterCount > 0 && (
              <div className="flex items-center gap-2">
                <Badge variant="secondary">
                  {activeFilterCount} filter{activeFilterCount !== 1 ? 's' : ''} active
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="h-8 px-2"
                >
                  <RotateCcw className="h-3 w-3 mr-1" />
                  Clear
                </Button>
              </div>
            )}
          </div>
          
          {/* Search and Filters */}
          {(showSearch || showFilters) && (
            <div className="flex flex-col gap-4 mt-4">
              {showSearch && (
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      type="search"
                      placeholder={searchPlaceholder}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                      className="pl-8"
                    />
                  </div>
                  <Button onClick={handleSearch} className="btn-primary">
                    <Search className="mr-2 h-4 w-4" />
                    Search
                  </Button>
                </div>
              )}
              
              {showFilters && filters.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {filters.map((filter) => (
                    <div key={filter.key} className="min-w-[200px]">
                      {filter.type === 'select' ? (
                        <Select 
                          value={activeFilters[filter.key] || 'all'} 
                          onValueChange={(value) => handleFilterChange(filter.key, value)}
                        >
                          <SelectTrigger className="modern-input">
                            <SelectValue placeholder={filter.placeholder || filter.label} />
                          </SelectTrigger>
                          <SelectContent className="glass border-gray-600/30">
                            <SelectItem value="all">All {filter.label}</SelectItem>
                            {filter.options?.map(option => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : filter.type === 'text' ? (
                        <Input
                          placeholder={filter.placeholder || filter.label}
                          value={activeFilters[filter.key] || ''}
                          onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                          className="modern-input"
                        />
                      ) : null}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </CardHeader>
        
        <CardContent className="p-0">
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
              <p className="ml-2 text-gray-400">Loading...</p>
            </div>
          ) : data.length === 0 ? (
            <div className="flex flex-col justify-center items-center h-32 p-8">
              {emptyStateIcon}
              <h3 className="font-semibold text-lg mb-1 text-gray-200">{emptyStateTitle}</h3>
              <p className="text-gray-400 mb-4">{emptyStateDescription}</p>
              {emptyStateAction}
            </div>
          ) : (
            <>
              {/* Table Container with Fixed Height and Scroll */}
              <div className="relative">
                <ScrollArea style={{ height: tableHeight }} className="w-full">
                  <div className="rounded-md border-0">
                    <Table className={`${tableClassName} data-table`}>
                      <TableHeader className="sticky top-0 z-10">
                        <TableRow className="hover:bg-transparent">
                          {columns.map((column) => (
                            <TableHead 
                              key={column.key}
                              className={`
                                ${column.width ? `w-[${column.width}]` : ''}
                                ${column.align === 'center' ? 'text-center' : 
                                  column.align === 'right' ? 'text-right' : 'text-left'}
                                ${column.sortable ? 'cursor-pointer hover:bg-blue-500/10' : ''}
                                text-gray-300
                              `}
                              onClick={() => column.sortable && handleSort(column.key)}
                            >
                              <div className="flex items-center gap-1">
                                {column.title}
                                {column.sortable && (
                                  <ChevronDown 
                                    className={`h-4 w-4 transition-transform ${
                                      sortConfig?.key === column.key 
                                        ? sortConfig.direction === 'desc' 
                                          ? 'rotate-180' 
                                          : '' 
                                        : 'opacity-50'
                                    }`} 
                                  />
                                )}
                              </div>
                            </TableHead>
                          ))}
                          {actions.length > 0 && (
                            <TableHead className="text-right w-[120px] text-gray-300">Actions</TableHead>
                          )}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {data.map((record, index) => (
                          <TableRow 
                            key={record.id || index} 
                            className="group transition-colors"
                          >
                            {columns.map((column) => (
                              <TableCell 
                                key={column.key}
                                className={
                                  column.align === 'center' ? 'text-center' : 
                                  column.align === 'right' ? 'text-right' : 'text-left'
                                }
                              >
                                {renderCellContent(column, record)}
                              </TableCell>
                            ))}
                            {actions.length > 0 && (
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-1">
                                  {actions.map((action, actionIndex) => (
                                    <Button
                                      key={actionIndex}
                                      variant={action.variant === 'destructive' ? 'ghost' : (action.variant || 'ghost')}
                                      size="sm"
                                      onClick={() => action.onClick(record)}
                                      disabled={action.disabled ? action.disabled(record) : false}
                                      title={action.label}
                                      className={action.variant === 'destructive' ? 'text-red-400 hover:text-red-300 hover:bg-red-500/10' : 'hover:bg-blue-500/10 text-gray-400 hover:text-gray-200'}
                                    >
                                      {action.icon}
                                      <span className="sr-only">{action.label}</span>
                                    </Button>
                                  ))}
                                </div>
                              </TableCell>
                            )}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </ScrollArea>
              </div>
              
              {/* Pagination */}
              {showPagination && pagination.totalPages > 1 && (
                <div className="p-4 border-t border-gray-700/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <span>
                        Showing {((pagination.page - 1) * pagination.limit) + 1} to{' '}
                        {Math.min(pagination.page * pagination.limit, pagination.totalRecords)} of{' '}
                        {pagination.totalRecords} results
                      </span>
                      {onLimitChange && (
                        <div className="flex items-center gap-2 ml-4">
                          <span>Show:</span>
                          <Select 
                            value={pagination.limit.toString()} 
                            onValueChange={(value) => onLimitChange(parseInt(value))}
                          >
                            <SelectTrigger className="w-20 h-8 modern-input">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="glass border-gray-600/30">
                              <SelectItem value="10">10</SelectItem>
                              <SelectItem value="25">25</SelectItem>
                              <SelectItem value="50">50</SelectItem>
                              <SelectItem value="100">100</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </div>
                    
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious 
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              if (pagination.page > 1) {
                                onPageChange(pagination.page - 1);
                              }
                            }}
                            className={pagination.page <= 1 ? 'pointer-events-none opacity-50' : 'hover:bg-blue-500/10'}
                          />
                        </PaginationItem>
                        
                        {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                          let page;
                          if (pagination.totalPages <= 5) {
                            page = i + 1;
                          } else if (pagination.page <= 3) {
                            page = i + 1;
                          } else if (pagination.page >= pagination.totalPages - 2) {
                            page = pagination.totalPages - 4 + i;
                          } else {
                            page = pagination.page - 2 + i;
                          }
                          
                          return (
                            <PaginationItem key={page}>
                              <PaginationLink
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  onPageChange(page);
                                }}
                                isActive={pagination.page === page}
                                className={pagination.page === page ? 'bg-blue-600/30 text-blue-400 border-blue-500/30' : 'hover:bg-blue-500/10'}
                              >
                                {page}
                              </PaginationLink>
                            </PaginationItem>
                          );
                        })}
                        
                        <PaginationItem>
                          <PaginationNext 
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              if (pagination.page < pagination.totalPages) {
                                onPageChange(pagination.page + 1);
                              }
                            }}
                            className={pagination.page >= pagination.totalPages ? 'pointer-events-none opacity-50' : 'hover:bg-blue-500/10'}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default DataTable;