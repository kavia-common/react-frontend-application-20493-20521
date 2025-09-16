import React, { useEffect, useState } from 'react';
import { DevicesAPI } from '../api/client';
import DeviceCard from '../components/DeviceCard';
import Modal from '../components/Modal';

// PUBLIC_INTERFACE
export default function DevicesPage() {
  /** Devices management for admin role. */
  const [devices, setDevices] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', imei: '', battery: 100 });

  const load = async () => {
    try {
      const list = await DevicesAPI.list();
      setDevices(list || []);
    } catch {
      setDevices([]);
    }
  };
  useEffect(() => { load(); }, []);

  const startCreate = () => { setEditing(null); setForm({ name: '', imei: '', battery: 100 }); setOpen(true); };
  const startEdit = (d) => { setEditing(d); setForm({ name: d.name || '', imei: d.imei || '', battery: d.battery || 100 }); setOpen(true); };

  const submit = async () => {
    try {
      if (editing) await DevicesAPI.update(editing.id, form);
      else await DevicesAPI.create(form);
      setOpen(false); load();
    } catch {
      alert('Save failed');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 my-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Devices</h1>
        <button className="btn" onClick={startCreate}>Add Device</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {devices.map(d => (
          <DeviceCard key={d.id} device={d} onEdit={startEdit} />
        ))}
        {devices.length === 0 && <div className="text-gray-600">No devices found.</div>}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? 'Edit Device' : 'Add Device'}
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
            <label className="block text-sm mb-1">IMEI</label>
            <input value={form.imei} onChange={e => setForm(f => ({ ...f, imei: e.target.value }))} className="w-full" />
          </div>
          <div>
            <label className="block text-sm mb-1">Battery (%)</label>
            <input type="number" min="0" max="100" value={form.battery} onChange={e => setForm(f => ({ ...f, battery: Number(e.target.value) }))} className="w-full" />
          </div>
        </div>
      </Modal>
    </div>
  );
}
