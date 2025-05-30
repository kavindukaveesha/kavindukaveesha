'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import DataTable, { DataTableColumn, DataTableFilter, DataTableAction, DataTablePagination } from '@/components/ui/data-table';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { 
  PlusCircle, 
  Edit, 
  Trash2, 
  FolderKanban, 
  Eye, 
  GitBranch, 
  ExternalLink,
  Star,
  Calendar,
  Code2
} from 'lucide-react';

interface Project {
  id: string;
  name: string;
  description: string;
  status: string;
  technology: string[];
  githubUrl?: string;
  liveUrl?: string;
  stars: number;
  lastUpdated: string;
  createdDate: string;
  progress: number;
}

export default function ProjectsPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [pagination, setPagination] = useState<DataTablePagination>({
    page: 1,
    limit: 10,
    totalPages: 0,
    totalRecords: 0
  });
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);

  // Mock data
  const mockProjects: Project[] = [
    {
      id: '1',
      name: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with payment integration',
      status: 'Active',
      technology: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL'],
      githubUrl: 'https://github.com/username/ecommerce',
      liveUrl: 'https://example-ecommerce.com',
      stars: 245,
      lastUpdated: '2 days ago',
      createdDate: '2023-06-15',
      progress: 85
    },
    {
      id: '2',
      name: 'AI Chat Application',
      description: 'Real-time chat app with AI-powered responses',
      status: 'In Progress',
      technology: ['React', 'Python', 'WebSocket', 'OpenAI'],
      githubUrl: 'https://github.com/username/ai-chat',
      stars: 128,
      lastUpdated: '5 hours ago',
      createdDate: '2023-08-20',
      progress: 60
    },
    {
      id: '3',
      name: 'Dashboard Analytics',
      description: 'Data visualization dashboard for business metrics',
      status: 'Active',
      technology: ['Vue.js', 'Node.js', 'D3.js', 'MongoDB'],
      githubUrl: 'https://github.com/username/dashboard',
      liveUrl: 'https://analytics.example.com',
      stars: 312,
      lastUpdated: '1 week ago',
      createdDate: '2023-04-10',
      progress: 100
    },
    {
      id: '4',
      name: 'Mobile Banking App',
      description: 'Secure mobile banking solution with biometric auth',
      status: 'Completed',
      technology: ['React Native', 'TypeScript', 'Node.js'],
      githubUrl: 'https://github.com/username/mobile-banking',
      stars: 189,
      lastUpdated: '1 month ago',
      createdDate: '2023-01-25',
      progress: 100
    },
    {
      id: '5',
      name: 'Social Media API',
      description: 'RESTful API for social media platform',
      status: 'In Progress',
      technology: ['Node.js', 'Express', 'MongoDB', 'Redis'],
      githubUrl: 'https://github.com/username/social-api',
      stars: 67,
      lastUpdated: '3 days ago',
      createdDate: '2023-09-01',
      progress: 40
    },
  ];

  const loadProjects = async () => {
    try {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setProjects(mockProjects);
        setPagination({
          page: 1,
          limit: 10,
          totalPages: 1,
          totalRecords: mockProjects.length
        });
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Failed to load projects:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, [pagination.page, pagination.limit]);

  const handleSearch = (search: string) => {
    setSearchTerm(search);
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handleFilterChange = (newFilters: Record<string, any>) => {
    setFilters(newFilters);
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (page: number) => {
    setPagination(prev => ({ ...prev, page }));
  };

  const handleLimitChange = (limit: number) => {
    setPagination(prev => ({ ...prev, limit, page: 1 }));
  };

  const handleDelete = async () => {
    if (!projectToDelete) return;
    
    try {
      // Simulate API call
      console.log('Deleting project:', projectToDelete);
      setProjectToDelete(null);
      loadProjects();
    } catch (error) {
      console.error('Failed to delete project:', error);
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'In Progress':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Completed':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-gradient-to-r from-emerald-500 to-teal-500';
    if (progress >= 50) return 'bg-gradient-to-r from-blue-500 to-cyan-500';
    return 'bg-gradient-to-r from-purple-500 to-pink-500';
  };

  // Define table columns
  const columns: DataTableColumn<Project>[] = [
    {
      key: 'name',
      title: 'Project',
      sortable: true,
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
            <Code2 className="h-5 w-5 text-primary" />
          </div>
          <div>
            <div className="font-medium text-foreground group-hover:text-primary transition-colors">{record.name}</div>
            <div className="text-sm text-muted-foreground max-w-[300px] truncate">
              {record.description}
            </div>
          </div>
        </div>
      )
    },
    {
      key: 'technology',
      title: 'Technology Stack',
      render: (value: string[]) => (
        <div className="flex flex-wrap gap-1">
          {value.slice(0, 3).map((tech, index) => (
            <Badge 
              key={index} 
              variant="outline" 
              className="bg-secondary/30 text-muted-foreground border-border/30 text-xs hover:bg-secondary/50 transition-colors"
            >
              {tech}
            </Badge>
          ))}
          {value.length > 3 && (
            <Badge 
              variant="outline" 
              className="bg-primary/10 text-primary border-primary/30 text-xs"
            >
              +{value.length - 3}
            </Badge>
          )}
        </div>
      )
    },
    {
      key: 'status',
      title: 'Status',
      filterable: true,
      align: 'center',
      width: '120px',
      render: (value) => (
        <Badge variant="outline" className={getStatusBadgeClass(value)}>
          {value}
        </Badge>
      )
    },
    {
      key: 'progress',
      title: 'Progress',
      sortable: true,
      align: 'center',
      width: '150px',
      render: (value) => (
        <div className="w-full">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-muted-foreground">Progress</span>
            <span className="text-primary font-medium">{value}%</span>
          </div>
          <div className="h-2.5 bg-secondary/50 rounded-full overflow-hidden">
            <div 
              className={`h-full ${getProgressColor(value)} transition-all duration-700 rounded-full relative overflow-hidden`}
              style={{ width: `${value}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50" />
            </div>
          </div>
        </div>
      )
    },
    {
      key: 'stars',
      title: 'Stars',
      sortable: true,
      align: 'center',
      width: '80px',
      render: (value) => (
        <div className="flex items-center gap-1 text-amber-400">
          <Star className="h-4 w-4 fill-current drop-shadow-glow" />
          <span className="text-sm font-medium">{value}</span>
        </div>
      )
    },
    {
      key: 'lastUpdated',
      title: 'Last Updated',
      sortable: true,
      render: (value) => <span className="text-muted-foreground text-sm">{value}</span>
    }
  ];

  // Define table filters
  const tableFilters: DataTableFilter[] = [
    {
      key: 'status',
      label: 'Status',
      type: 'select',
      placeholder: 'Filter by status',
      options: [
        { label: 'Active', value: 'Active' },
        { label: 'In Progress', value: 'In Progress' },
        { label: 'Completed', value: 'Completed' }
      ]
    }
  ];

  // Define table actions
  const actions: DataTableAction<Project>[] = [
    {
      label: 'View Details',
      icon: <Eye className="h-4 w-4" />,
      onClick: (record) => router.push(`/dashboard/projects/${record.id}`)
    },
    {
      label: 'Edit Project',
      icon: <Edit className="h-4 w-4" />,
      onClick: (record) => router.push(`/dashboard/projects/${record.id}/edit`)
    },
    {
      label: 'View on GitHub',
      icon: <GitBranch className="h-4 w-4" />,
      onClick: (record) => window.open(record.githubUrl, '_blank'),
      disabled: (record) => !record.githubUrl
    },
    {
      label: 'View Live',
      icon: <ExternalLink className="h-4 w-4" />,
      onClick: (record) => window.open(record.liveUrl, '_blank'),
      disabled: (record) => !record.liveUrl
    },
    {
      label: 'Delete Project',
      icon: <Trash2 className="h-4 w-4" />,
      variant: 'destructive',
      onClick: (record) => setProjectToDelete(record.id)
    }
  ];

  const headerActions = (
    <Button 
      className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground shadow-glow"
      onClick={() => router.push('/dashboard/projects/new')}
    >
      <PlusCircle className="mr-2 h-4 w-4" />
      Add New Project
    </Button>
  );

  return (
    <>
      <DataTable
        title="Project Management"
        description="Manage your portfolio projects and showcase"
        data={projects}
        columns={columns}
        pagination={pagination}
        loading={loading}
        filters={tableFilters}
        actions={actions}
        onPageChange={handlePageChange}
        onLimitChange={handleLimitChange}
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        headerActions={headerActions}
        searchPlaceholder="Search projects by name or technology..."
        emptyStateIcon={<FolderKanban className="h-8 w-8 text-muted-foreground mb-2" />}
        emptyStateTitle="No projects found"
        emptyStateDescription="No projects match your current filters"
        emptyStateAction={
          <Button 
            variant="link" 
            onClick={() => router.push('/dashboard/projects/new')}
            className="mt-2 text-primary hover:text-primary/80"
          >
            Add your first project
          </Button>
        }
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!projectToDelete} onOpenChange={(open) => {
        if (!open) setProjectToDelete(null);
      }}>
        <AlertDialogContent className="bg-card/95 backdrop-blur-xl border-border/50">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the project
              and remove it from your portfolio.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-secondary/50 hover:bg-secondary/70 border-0">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete} 
              className="bg-destructive hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}