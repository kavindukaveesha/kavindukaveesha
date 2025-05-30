'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import DataTable, { DataTableColumn, DataTableFilter, DataTableAction, DataTablePagination } from '@/components/ui/data-table';
import { LoadingTable } from '@/components/ui/loading';
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
import { PlusCircle, Edit, Trash2, Users, Eye, Mail, Shield, UserPlus } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  lastActive: string;
  joinedDate: string;
  projectCount: number;
}

export default function UsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [pagination, setPagination] = useState<DataTablePagination>({
    page: 1,
    limit: 10,
    totalPages: 0,
    totalRecords: 0
  });
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);

  // Mock data
  const mockUsers: User[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'Admin',
      status: 'Active',
      lastActive: '2 hours ago',
      joinedDate: '2023-01-15',
      projectCount: 12
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'Developer',
      status: 'Active',
      lastActive: '5 minutes ago',
      joinedDate: '2023-03-22',
      projectCount: 8
    },
    {
      id: '3',
      name: 'Bob Johnson',
      email: 'bob.johnson@example.com',
      role: 'Designer',
      status: 'Inactive',
      lastActive: '3 days ago',
      joinedDate: '2023-02-10',
      projectCount: 5
    },
    {
      id: '4',
      name: 'Alice Williams',
      email: 'alice.williams@example.com',
      role: 'Developer',
      status: 'Active',
      lastActive: '1 hour ago',
      joinedDate: '2023-04-05',
      projectCount: 15
    },
    {
      id: '5',
      name: 'Charlie Brown',
      email: 'charlie.brown@example.com',
      role: 'Manager',
      status: 'Active',
      lastActive: '30 minutes ago',
      joinedDate: '2023-01-01',
      projectCount: 20
    },
  ];

  const loadUsers = async () => {
    try {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setUsers(mockUsers);
        setPagination({
          page: 1,
          limit: 10,
          totalPages: 1,
          totalRecords: mockUsers.length
        });
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Failed to load users:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
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
    if (!userToDelete) return;
    
    try {
      // Simulate API call
      console.log('Deleting user:', userToDelete);
      setUserToDelete(null);
      loadUsers();
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Inactive':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case 'Admin':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'Developer':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Designer':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'Manager':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  // Define table columns
  const columns: DataTableColumn<User>[] = [
    {
      key: 'name',
      title: 'Name',
      sortable: true,
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-sm font-medium border border-blue-500/30">
            {record.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <div className="font-medium text-gray-200">{record.name}</div>
            <div className="text-sm text-gray-400">{record.email}</div>
          </div>
        </div>
      )
    },
    {
      key: 'role',
      title: 'Role',
      filterable: true,
      render: (value) => (
        <Badge variant="outline" className={getRoleBadgeClass(value)}>
          {value}
        </Badge>
      )
    },
    {
      key: 'status',
      title: 'Status',
      filterable: true,
      align: 'center',
      width: '100px',
      render: (value) => (
        <Badge variant="outline" className={getStatusBadgeClass(value)}>
          {value}
        </Badge>
      )
    },
    {
      key: 'projectCount',
      title: 'Projects',
      sortable: true,
      align: 'center',
      width: '100px',
      render: (value) => <span className="text-gray-300">{value}</span>
    },
    {
      key: 'lastActive',
      title: 'Last Active',
      sortable: true,
      render: (value) => <span className="text-gray-400 text-sm">{value}</span>
    },
    {
      key: 'joinedDate',
      title: 'Joined Date',
      sortable: true,
      render: (value) => (
        <span className="text-gray-400 text-sm">
          {new Date(value).toLocaleDateString()}
        </span>
      )
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
        { label: 'Inactive', value: 'Inactive' }
      ]
    },
    {
      key: 'role',
      label: 'Role',
      type: 'select',
      placeholder: 'Filter by role',
      options: [
        { label: 'Admin', value: 'Admin' },
        { label: 'Developer', value: 'Developer' },
        { label: 'Designer', value: 'Designer' },
        { label: 'Manager', value: 'Manager' }
      ]
    }
  ];

  // Define table actions
  const actions: DataTableAction<User>[] = [
    {
      label: 'View Details',
      icon: <Eye className="h-4 w-4" />,
      onClick: (record) => router.push(`/dashboard/users/${record.id}`)
    },
    {
      label: 'Edit User',
      icon: <Edit className="h-4 w-4" />,
      onClick: (record) => router.push(`/dashboard/users/${record.id}/edit`)
    },
    {
      label: 'Send Email',
      icon: <Mail className="h-4 w-4" />,
      onClick: (record) => console.log('Send email to:', record.email)
    },
    {
      label: 'Delete User',
      icon: <Trash2 className="h-4 w-4" />,
      variant: 'destructive',
      onClick: (record) => setUserToDelete(record.id)
    }
  ];

  const headerActions = (
    <Button 
      className="btn-primary"
      onClick={() => router.push('/dashboard/users/new')}
    >
      <PlusCircle className="mr-2 h-4 w-4" />
      Add New User
    </Button>
  );

  return (
    <>
      <DataTable
        title="User Management"
        description="Manage user accounts and permissions"
        data={users}
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
        searchPlaceholder="Search users by name or email..."
        emptyStateIcon={<Users className="h-8 w-8 text-muted-foreground mb-2" />}
        emptyStateTitle="No users found"
        emptyStateDescription="No users match your current filters"
        emptyStateAction={
          <Button 
            variant="link" 
            onClick={() => router.push('/dashboard/users/new')}
            className="mt-2 text-blue-400 hover:text-blue-300"
          >
            Add your first user
          </Button>
        }
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!userToDelete} onOpenChange={(open) => {
        if (!open) setUserToDelete(null);
      }}>
        <AlertDialogContent className="glass border-gray-600/30">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-gray-200">Are you sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              This action cannot be undone. This will permanently delete the user
              and remove their data from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="btn-secondary">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete} 
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}