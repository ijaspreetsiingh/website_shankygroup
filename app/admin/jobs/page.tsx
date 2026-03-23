'use client';

import { FormEvent, useEffect, useState } from 'react';
import '../admin-styles.css';

type JobRow = {
  id: number;
  title: string;
  location: string | null;
  job_type: string | null;
  department: string | null;
  status: string;
  created_at: string;
};

const initialForm = {
  title: '',
  location: '',
  job_type: '',
  department: '',
  status: 'draft',
};

export default function AdminJobsPage() {
  const [rows, setRows] = useState<JobRow[]>([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadRows() {
    try {
      setLoading(true);
      const res = await fetch('/admin/api/jobs', { cache: 'no-store' });
      const data = (await res.json()) as { rows?: JobRow[]; message?: string };
      if (!res.ok) throw new Error(data.message || 'Failed to load jobs');
      setRows(data.rows || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadRows();
  }, []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    const url = editingId ? `/admin/api/jobs/${editingId}` : '/admin/api/jobs';
    const method = editingId ? 'PUT' : 'POST';
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (!res.ok) {
      const data = (await res.json().catch(() => ({}))) as { message?: string };
      setError(data.message || 'Save failed');
      return;
    }
    setForm(initialForm);
    setEditingId(null);
    await loadRows();
  }

  async function onDelete(id: number) {
    const res = await fetch(`/admin/api/jobs/${id}`, { method: 'DELETE' });
    if (res.ok) await loadRows();
  }

  return (
    <section className="space-y-8">
      <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">Jobs Management</h2>
      {error ? <p className="text-sm text-red-400 font-medium">{error}</p> : null}

      <form onSubmit={onSubmit} className="grid gap-4 rounded-2xl border border-gray-700/50 bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-md p-6 shadow-xl sm:grid-cols-5">
        <input
          className="rounded-xl border border-gray-600/50 bg-gradient-to-r from-gray-800/60 to-gray-700/40 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 transition-all"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm((s) => ({ ...s, title: e.target.value }))}
          required
        />
        <input
          className="rounded-xl border border-gray-600/50 bg-gradient-to-r from-gray-800/60 to-gray-700/40 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 transition-all"
          placeholder="Location"
          value={form.location}
          onChange={(e) => setForm((s) => ({ ...s, location: e.target.value }))}
        />
        <input
          className="rounded-xl border border-gray-600/50 bg-gradient-to-r from-gray-800/60 to-gray-700/40 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 transition-all"
          placeholder="Job Type"
          value={form.job_type}
          onChange={(e) => setForm((s) => ({ ...s, job_type: e.target.value }))}
        />
        <input
          className="rounded-xl border border-gray-600/50 bg-gradient-to-r from-gray-800/60 to-gray-700/40 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 transition-all"
          placeholder="Department"
          value={form.department}
          onChange={(e) => setForm((s) => ({ ...s, department: e.target.value }))}
        />
        <select
          className="rounded-xl border border-gray-600/50 bg-gradient-to-r from-gray-800/60 to-gray-700/40 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 transition-all"
          value={form.status}
          onChange={(e) => setForm((s) => ({ ...s, status: e.target.value }))}
        >
          <option value="draft" className="bg-gray-800">Draft</option>
          <option value="published" className="bg-gray-800">Published</option>
          <option value="closed" className="bg-gray-800">Closed</option>
        </select>
        <button className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-6 py-3 text-white font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 ring-2 ring-blue-500/30 sm:col-span-5" type="submit">
          {editingId ? 'Update Job' : 'Create Job'}
        </button>
      </form>

      <div className="overflow-auto rounded-2xl border border-gray-700/50 bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-md shadow-xl">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-700/50 bg-gradient-to-r from-gray-800/60 to-gray-700/40">
              <th className="px-4 py-3 font-black text-gray-200 uppercase tracking-wider text-xs">Title</th>
              <th className="px-4 py-3 font-black text-gray-200 uppercase tracking-wider text-xs">Location</th>
              <th className="px-4 py-3 font-black text-gray-200 uppercase tracking-wider text-xs">Type</th>
              <th className="px-4 py-3 font-black text-gray-200 uppercase tracking-wider text-xs">Department</th>
              <th className="px-4 py-3 font-black text-gray-200 uppercase tracking-wider text-xs">Status</th>
              <th className="px-4 py-3 font-black text-gray-200 uppercase tracking-wider text-xs">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td className="px-4 py-8 text-center text-gray-400" colSpan={6}>Loading...</td></tr>
            ) : rows.length === 0 ? (
              <tr><td className="px-4 py-8 text-center text-gray-400" colSpan={6}>No jobs found.</td></tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="border-b border-gray-700/50 last:border-b-0 hover:bg-gradient-to-r hover:from-gray-800/40 hover:to-gray-700/30 transition-colors">
                  <td className="px-4 py-3 font-medium text-white">{row.title}</td>
                  <td className="px-4 py-3 text-gray-300">{row.location || '-'}</td>
                  <td className="px-4 py-3 text-gray-300">{row.job_type || '-'}</td>
                  <td className="px-4 py-3 text-gray-300">{row.department || '-'}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-1 text-xs font-bold rounded-full ${
                      row.status === 'published' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                      row.status === 'closed' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                      'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="flex gap-2 px-4 py-3">
                    <button
                      className="rounded-lg border border-gray-600/50 bg-gradient-to-r from-gray-800/60 to-gray-700/40 px-3 py-2 text-gray-300 hover:text-white hover:border-blue-500/50 hover:scale-105 transition-all duration-300"
                      onClick={() => {
                        setEditingId(row.id);
                        setForm({
                          title: row.title,
                          location: row.location || '',
                          job_type: row.job_type || '',
                          department: row.department || '',
                          status: row.status || 'draft',
                        });
                      }}
                    >
                      Edit
                    </button>
                    <button className="rounded-lg border border-red-500/30 bg-gradient-to-r from-red-900/30 to-red-800/30 px-3 py-2 text-red-400 hover:text-red-300 hover:border-red-500/50 hover:scale-105 transition-all duration-300" onClick={() => void onDelete(row.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
