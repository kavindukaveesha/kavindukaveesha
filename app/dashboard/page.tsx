export default function DashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-neutron-100 mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-space-900 border border-space-800 rounded-lg p-6">
          <h3 className="text-neutron-400 text-sm font-medium mb-2">Total Projects</h3>
          <p className="text-3xl font-bold text-neutron-100">12</p>
        </div>
        
        <div className="bg-space-900 border border-space-800 rounded-lg p-6">
          <h3 className="text-neutron-400 text-sm font-medium mb-2">Profile Views</h3>
          <p className="text-3xl font-bold text-neutron-100">1,234</p>
        </div>
        
        <div className="bg-space-900 border border-space-800 rounded-lg p-6">
          <h3 className="text-neutron-400 text-sm font-medium mb-2">Messages</h3>
          <p className="text-3xl font-bold text-neutron-100">23</p>
        </div>
        
        <div className="bg-space-900 border border-space-800 rounded-lg p-6">
          <h3 className="text-neutron-400 text-sm font-medium mb-2">Blog Posts</h3>
          <p className="text-3xl font-bold text-neutron-100">8</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-space-900 border border-space-800 rounded-lg p-6">
          <h2 className="text-xl font-bold text-neutron-100 mb-4">Recent Activity</h2>
          <div className="space-y-3">
            <p className="text-neutron-300">No recent activity to display</p>
          </div>
        </div>
        
        <div className="bg-space-900 border border-space-800 rounded-lg p-6">
          <h2 className="text-xl font-bold text-neutron-100 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <a href="/dashboard/projects/new" className="block w-full text-center py-2 px-4 bg-nebula-600 text-white rounded-lg hover:bg-nebula-700 transition-colors">
              Add New Project
            </a>
            <a href="/dashboard/blog/new" className="block w-full text-center py-2 px-4 bg-aurora-600 text-white rounded-lg hover:bg-aurora-700 transition-colors">
              Write Blog Post
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}