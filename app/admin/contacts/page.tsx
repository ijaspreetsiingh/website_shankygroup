import AdminTableClient from '../_components/AdminTableClient';

export default function AdminContactsPage() {
  return <AdminTableClient title="Contact Inquiries" endpoint="/admin/api/contacts" />;
}
