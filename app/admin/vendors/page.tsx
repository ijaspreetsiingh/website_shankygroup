'use client';

import { useState, useEffect } from 'react';
import { Eye, EyeOff, Building2, Mail, Phone, MapPin, Calendar, User, X, CheckCircle, AlertCircle, Edit2, Trash2 } from 'lucide-react';
import '../admin-styles.css';

type VendorRow = {
  id: number;
  first_name: string | null;
  last_name: string | null;
  company_name: string | null;
  email: string | null;
  phone: string | null;
  country: string | null;
  vendor_status: string | null;
  created_at: string | null;
  // Additional fields from vendor form
  address?: string | null;
  state?: string | null;
  city?: string | null;
  gst_no?: string | null;
  contact_person?: string | null;
  designation?: string | null;
  landline?: string | null;
  website?: string | null;
  message?: string | null;
  exclusive_offers?: number | boolean;
};

export default function AdminVendorsPage() {
  const [vendors, setVendors] = useState<VendorRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedVendor, setSelectedVendor] = useState<VendorRow | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editingVendor, setEditingVendor] = useState<VendorRow | null>(null);
  const [deletingVendor, setDeletingVendor] = useState<VendorRow | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  async function loadVendors() {
    try {
      setLoading(true);
      console.log('=== ADMIN VENDORS DEBUG ===');
      console.log('Fetching from: /admin/api/vendors');
      
      const res = await fetch('/admin/api/vendors', { cache: 'no-store' });
      console.log('Response status:', res.status);
      console.log('Response ok:', res.ok);
      
      const data = await res.json();
      console.log('Response data:', data);
      
      if (!res.ok) throw new Error(data.message || 'Failed to load vendors');
      
      console.log('Setting vendors:', data.rows || []);
      setVendors(data.rows || []);
      console.log('=== END ADMIN VENDORS DEBUG ===');
    } catch (err) {
      console.error('Admin vendors error:', err);
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadVendors();
  }, []);

  const handleViewDetails = (vendor: VendorRow) => {
    setSelectedVendor(vendor);
    setShowDetails(true);
  };

  const handleEdit = (vendor: VendorRow) => {
    setEditingVendor({ ...vendor });
    setEditModalOpen(true);
  };

  const handleDelete = (vendor: VendorRow) => {
    setDeletingVendor(vendor);
    setDeleteModalOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!editingVendor) return;
    
    setActionLoading(true);
    try {
      console.log('=== FRONTEND EDIT DEBUG ===');
      console.log('Editing vendor:', editingVendor);
      console.log('Edit URL:', `/admin/api/vendors/${editingVendor.id}`);
      
      const res = await fetch(`/admin/api/vendors/${editingVendor.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingVendor),
      });
      
      console.log('Edit response status:', res.status);
      console.log('Edit response ok:', res.ok);
      
      const data = await res.json();
      console.log('Edit response data:', data);
      
      if (res.ok) {
        await loadVendors();
        setEditModalOpen(false);
        setEditingVendor(null);
      } else {
        setError(data.message || 'Failed to update vendor');
      }
    } catch (err) {
      console.error('Frontend edit error:', err);
      setError('Network error while updating vendor');
    } finally {
      setActionLoading(false);
      console.log('=== END FRONTEND EDIT DEBUG ===');
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingVendor) return;
    
    setActionLoading(true);
    try {
      console.log('=== FRONTEND DELETE DEBUG ===');
      console.log('Deleting vendor:', deletingVendor);
      console.log('Vendor ID:', deletingVendor.id);
      console.log('Vendor ID type:', typeof deletingVendor.id);
      
      const deleteUrl = `/admin/api/vendors/${deletingVendor.id}`;
      console.log('Delete URL:', deleteUrl);
      
      const res = await fetch(deleteUrl, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      
      console.log('Delete response status:', res.status);
      console.log('Delete response ok:', res.ok);
      
      const data = await res.json();
      console.log('Delete response data:', data);
      
      if (res.ok) {
        await loadVendors();
        setDeleteModalOpen(false);
        setDeletingVendor(null);
      } else {
        setError(data.message || 'Failed to delete vendor');
      }
    } catch (err) {
      console.error('Frontend delete error:', err);
      setError('Network error while deleting vendor');
    } finally {
      setActionLoading(false);
      console.log('=== END FRONTEND DELETE DEBUG ===');
    }
  };

  const getStatusColor = (status: string | null) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20 text-green-400 border border-green-500/30';
      case 'inactive':
        return 'bg-red-500/20 text-red-400 border border-red-500/30';
      case 'prospective':
        return 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border border-gray-500/30';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl border border-gray-700/50 bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-md shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-gradient-to-tr from-blue-600 via-purple-600 to-pink-600 shadow-2xl shadow-blue-500/30 ring-2 ring-blue-500/30 animate-pulse">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Vendor Registrations
            </h1>
            <p className="text-gray-400 mt-1 text-lg">
              Manage and overview your vendor repository.
            </p>
          </div>
        </div>
        <button
          onClick={loadVendors}
          className="flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg border border-gray-600/50 bg-gradient-to-r from-gray-800/60 to-gray-700/40 text-gray-300 hover:text-white transition-all duration-300 hover:scale-105"
        >
          Refresh
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="p-4 bg-gradient-to-r from-red-900/30 to-pink-900/30 border border-red-500/30 rounded-2xl shadow-lg shadow-red-500/10">
          <p className="text-sm font-medium text-red-300 text-center">{error}</p>
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500/30 border-t-blue-500 shadow-lg shadow-blue-500/20" />
        </div>
      ) : vendors.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-20 h-20 mb-6 rounded-full flex items-center justify-center border-2 border-dashed border-gray-600/50 bg-gradient-to-br from-gray-800/60 to-gray-700/40 shadow-lg">
            <Building2 className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">No vendor registrations found</h3>
          <p className="text-sm text-gray-400">No vendors have registered yet.</p>
        </div>
      ) : (
        /* Vendor Table */
        <div className="overflow-x-auto rounded-2xl border border-gray-700/50 bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-md shadow-xl">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-gray-800/60 to-gray-700/40">
                <th className="px-6 py-4 font-black text-xs tracking-wider uppercase border-b border-gray-700/50 text-gray-300">Company</th>
                <th className="px-6 py-4 font-black text-xs tracking-wider uppercase border-b border-gray-700/50 text-gray-300">Contact Person</th>
                <th className="px-6 py-4 font-black text-xs tracking-wider uppercase border-b border-gray-700/50 text-gray-300">Email</th>
                <th className="px-6 py-4 font-black text-xs tracking-wider uppercase border-b border-gray-700/50 text-gray-300">Phone</th>
                <th className="px-6 py-4 font-black text-xs tracking-wider uppercase border-b border-gray-700/50 text-gray-300">Status</th>
                <th className="px-6 py-4 font-black text-xs tracking-wider uppercase border-b border-gray-700/50 text-gray-300">Date</th>
                <th className="px-6 py-4 font-black text-xs tracking-wider uppercase border-b border-gray-700/50 text-right text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((vendor, idx) => {
                console.log(`Rendering vendor ${idx}:`, vendor);
                console.log(`Vendor ID: ${vendor.id}, type: ${typeof vendor.id}`);
                
                return (
                <tr 
                  key={vendor.id} 
                  className="border-b border-gray-700/50 last:border-0 hover:bg-gradient-to-r hover:from-gray-800/40 hover:to-gray-700/30 transition-all duration-300 group cursor-default"
                >
                  <td className="px-6 py-4">
                    <div className="font-bold text-white">{vendor.company_name || '-'}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-gray-300">
                      {vendor.first_name && vendor.last_name 
                        ? `${vendor.first_name} ${vendor.last_name}`
                        : vendor.contact_person || '-'
                      }
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-gray-300">{vendor.email || '-'}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-gray-300">{vendor.phone || '-'}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-bold rounded-full ${getStatusColor(vendor.vendor_status)}`}>
                      {vendor.vendor_status || 'unknown'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-gray-300">
                      {vendor.created_at ? new Date(vendor.created_at).toLocaleDateString() : '-'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleViewDetails(vendor)} 
                        className="p-2 rounded-lg border border-gray-600/50 bg-gradient-to-r from-gray-800/60 to-gray-700/40 hover:from-blue-600/30 hover:to-blue-700/30 hover:border-blue-500/50 transition-all duration-300 hover:scale-105" 
                        title="View Details"
                      >
                        <Eye className="w-4 h-4 text-blue-400" />
                      </button>
                      <button 
                        onClick={() => handleEdit(vendor)} 
                        className="p-2 rounded-lg border border-gray-600/50 bg-gradient-to-r from-gray-800/60 to-gray-700/40 hover:from-green-600/30 hover:to-green-700/30 hover:border-green-500/50 transition-all duration-300 hover:scale-105" 
                        title="Edit Vendor"
                      >
                        <Edit2 className="w-4 h-4 text-green-400" />
                      </button>
                      <button 
                        onClick={() => {
                          console.log('Delete button clicked for vendor:', vendor);
                          console.log('Vendor ID before delete:', vendor.id);
                          handleDelete(vendor);
                        }} 
                        className="p-2 rounded-lg border border-gray-600/50 bg-gradient-to-r from-gray-800/60 to-gray-700/40 hover:from-red-600/30 hover:to-red-700/30 hover:border-red-500/50 transition-all duration-300 hover:scale-105" 
                        title="Delete Vendor"
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                  </td>
                </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Vendor Details Modal */}
      {showDetails && selectedVendor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-700/50 shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-gray-800 to-gray-700 border-b border-gray-700/50 p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-gradient-to-tr from-blue-600 via-purple-600 to-pink-600">
                    <Building2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-white">{selectedVendor.company_name}</h2>
                    <p className="text-gray-400">Vendor Registration Details</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowDetails(false)}
                  className="p-2 rounded-lg border border-gray-600/50 bg-gradient-to-r from-gray-800/60 to-gray-700/40 hover:from-red-600/30 hover:to-red-700/30 hover:border-red-500/50 transition-all duration-300 hover:scale-105"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Company Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Company Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <Building2 className="w-4 h-4" />
                      Company Name
                    </div>
                    <div className="text-white font-medium">{selectedVendor.company_name || '-'}</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <CheckCircle className="w-4 h-4" />
                      Status
                    </div>
                    <span className={`inline-flex px-2 py-1 text-xs font-bold rounded-full ${getStatusColor(selectedVendor.vendor_status)}`}>
                      {selectedVendor.vendor_status || 'unknown'}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <MapPin className="w-4 h-4" />
                      Address
                    </div>
                    <div className="text-white">{selectedVendor.address || '-'}</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <MapPin className="w-4 h-4" />
                      State & City
                    </div>
                    <div className="text-white">
                      {selectedVendor.state && selectedVendor.city 
                        ? `${selectedVendor.state}, ${selectedVendor.city}`
                        : selectedVendor.state || selectedVendor.city || '-'
                      }
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <MapPin className="w-4 h-4" />
                      Country
                    </div>
                    <div className="text-white">{selectedVendor.country || '-'}</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      GST Number
                    </div>
                    <div className="text-white">{selectedVendor.gst_no || '-'}</div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <User className="w-4 h-4" />
                      Contact Person
                    </div>
                    <div className="text-white">
                      {selectedVendor.first_name && selectedVendor.last_name 
                        ? `${selectedVendor.first_name} ${selectedVendor.last_name}`
                        : selectedVendor.contact_person || '-'
                      }
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <User className="w-4 h-4" />
                      Designation
                    </div>
                    <div className="text-white">{selectedVendor.designation || '-'}</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <Mail className="w-4 h-4" />
                      Email
                    </div>
                    <div className="text-white">{selectedVendor.email || '-'}</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <Phone className="w-4 h-4" />
                      Mobile
                    </div>
                    <div className="text-white">{selectedVendor.phone || '-'}</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <Phone className="w-4 h-4" />
                      Landline
                    </div>
                    <div className="text-white">{selectedVendor.landline || '-'}</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <Building2 className="w-4 h-4" />
                      Website
                    </div>
                    <div className="text-white">
                      {selectedVendor.website ? (
                        <a href={selectedVendor.website} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                          {selectedVendor.website}
                        </a>
                      ) : '-'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Additional Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <Calendar className="w-4 h-4" />
                      Registration Date
                    </div>
                    <div className="text-white">
                      {selectedVendor.created_at ? new Date(selectedVendor.created_at).toLocaleString() : '-'}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <CheckCircle className="w-4 h-4" />
                      Exclusive Offers
                    </div>
                    <div className="text-white">
                      {selectedVendor.exclusive_offers ? 'Yes' : 'No'}
                    </div>
                  </div>
                </div>
                {selectedVendor.message && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      Message
                    </div>
                    <div className="text-white bg-gray-800/50 rounded-lg p-4">
                      {selectedVendor.message}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Vendor Modal */}
      {editModalOpen && editingVendor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-700/50 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-gray-800 to-gray-700 border-b border-gray-700/50 p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-gradient-to-tr from-green-600 via-green-500 to-green-400">
                    <Edit2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-white">Edit Vendor</h2>
                    <p className="text-gray-400">Update vendor information</p>
                  </div>
                </div>
                <button
                  onClick={() => setEditModalOpen(false)}
                  className="p-2 rounded-lg border border-gray-600/50 bg-gradient-to-r from-gray-800/60 to-gray-700/40 hover:from-red-600/30 hover:to-red-700/30 hover:border-red-500/50 transition-all duration-300 hover:scale-105"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Company Name</label>
                  <input
                    type="text"
                    value={editingVendor.company_name || ''}
                    onChange={(e) => setEditingVendor({ ...editingVendor, company_name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-600/50 bg-gradient-to-r from-gray-800/60 to-gray-700/40 text-white focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    value={editingVendor.email || ''}
                    onChange={(e) => setEditingVendor({ ...editingVendor, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-600/50 bg-gradient-to-r from-gray-800/60 to-gray-700/40 text-white focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Mobile</label>
                  <input
                    type="tel"
                    value={editingVendor.phone || ''}
                    onChange={(e) => setEditingVendor({ ...editingVendor, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-600/50 bg-gradient-to-r from-gray-800/60 to-gray-700/40 text-white focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
                  <select
                    value={editingVendor.vendor_status || ''}
                    onChange={(e) => setEditingVendor({ ...editingVendor, vendor_status: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-600/50 bg-gradient-to-r from-gray-800/60 to-gray-700/40 text-white focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500/50"
                  >
                    <option value="">Select Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="prospective">Prospective</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={() => setEditModalOpen(false)}
                  className="px-6 py-3 rounded-xl border border-gray-600/50 bg-gradient-to-r from-gray-800/60 to-gray-700/40 text-gray-300 hover:text-white transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  disabled={actionLoading}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {actionLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && deletingVendor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-700/50 shadow-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-tr from-red-600 via-red-500 to-red-400">
                  <Trash2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white">Delete Vendor</h2>
                  <p className="text-gray-400">This action cannot be undone</p>
                </div>
              </div>
              
              <div className="bg-gray-800/50 rounded-lg p-4 mb-6">
                <p className="text-white font-medium">{deletingVendor.company_name}</p>
                <p className="text-gray-300 text-sm">{deletingVendor.email}</p>
              </div>
              
              <p className="text-gray-300 mb-6">
                Are you sure you want to delete this vendor? This will permanently remove all their data from the system.
              </p>
              
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setDeleteModalOpen(false)}
                  className="px-6 py-3 rounded-xl border border-gray-600/50 bg-gradient-to-r from-gray-800/60 to-gray-700/40 text-gray-300 hover:text-white transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  disabled={actionLoading}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {actionLoading ? 'Deleting...' : 'Delete Vendor'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
