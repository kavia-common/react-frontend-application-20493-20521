import React, { useEffect, useState } from 'react';
import { AnimalsAPI } from '../api/client';
import AnimalCard from '../components/AnimalCard';
import Modal from '../components/Modal';

// PUBLIC_INTERFACE
export default function AnimalsPage() {
  /** Animals CRUD page with modals. */
  const [animals, setAnimals] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', species: '', device_id: '' });

  const load = async () => {
    try {
      const list = await AnimalsAPI.list();
      setAnimals(list || []);
    } catch {
      setAnimals([]);
    }
  };

  useEffect(() => { load(); }, []);

  const startCreate = () => {
    setEditing(null);
    setForm({ name: '', species: '', device_id: '' });
    setOpen(true);
  };
  const startEdit = (a) => {
    setEditing(a);
    setForm({ name: a.name || '', species: a.species || '', device_id: a.device_id || '' });
    setOpen(true);
  };
  const doDelete = async (a) => {
    if (!window.confirm(`Delete '${a.name}'?`)) return;
    try { await AnimalsAPI.remove(a.id); load(); } catch { /* ignore */ }
  };
  const submit = async () => {
    try {
      if (editing) await AnimalsAPI.update(editing.id, form);
      else await AnimalsAPI.create(form);
      setOpen(false); load();
    } catch {
      alert('Save failed');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 my-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Animals</h1>
        <button className="btn" onClick={startCreate}>Add Animal</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {animals.map(a => (
          <AnimalCard key={a.id} animal={a} onEdit={startEdit} onDelete={doDelete} />
        ))}
        {animals.length === 0 && <div className="text-gray-600">No animals found.</div>}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? 'Edit Animal' : 'Add Animal'}
        footer={
          <>
            <button className="btn btn-secondary" onClick={() => setOpen(false)}>Cancel</button>
            <button className="btn" onClick={submit}>{editing ? 'Save' : 'Create'}</button>
          </>
        }>
        <div className="space-y-3">
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="w-full" />
          </div>
          <div>
            <label className="block text-sm mb-1">Species</label>
            <input value={form.species} onChange={e => setForm(f => ({ ...f, species: e.target.value }))} className="w-full" />
          </div>
          <div>
            <label className="block text-sm mb-1">Device ID</label>
            <input value={form.device_id} onChange={e => setForm(f => ({ ...f, device_id: e.target.value }))} className="w-full" />
          </div>
        </div>
      </Modal>
    </div>
  );
}
