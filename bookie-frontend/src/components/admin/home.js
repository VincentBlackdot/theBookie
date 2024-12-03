import { AdminDashboard } from '../components/admin/admin-dashboard';

export const metadata = {
  title: 'Admin Dashboard | The Blackdot Library',
  description: 'Manage the Black Library system',
};

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <AdminDashboard />
    </div>
  );
}
