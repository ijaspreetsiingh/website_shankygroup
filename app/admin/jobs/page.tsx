import AdminTableClient from '../_components/AdminTableClient';

export default function AdminJobsPage() {
  return <AdminTableClient title="Jobs Management" endpoint="/admin/api/jobs" />;
}
