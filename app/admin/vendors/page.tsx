import AdminTableClient from '../_components/AdminTableClient';

export default function AdminVendorsPage() {
  return <AdminTableClient title="Vendor Registrations" endpoint="/admin/api/vendors" />;
}
