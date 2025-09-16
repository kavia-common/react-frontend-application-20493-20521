import React, { useEffect, useMemo, useState } from 'react';
import Sidebar from '../components/Sidebar';
import MapContainer from '../components/MapContainer';
import MarkerList from '../components/MarkerList';
import Heatmap from '../components/Heatmap';
import Timeline from '../components/Timeline';
import AlertToast from '../components/AlertToast';
import { AnimalsAPI, AlertsAPI, TelemetryAPI, DashboardAPI } from '../api/client';
import { useRealtime } from '../api/socket';

// PUBLIC_INTERFACE
export default function DashboardPage() {
  /** Dashboard with map, sidebar, telemetry, and alerts. */
  const [animals, setAnimals] = useState([]);
  const [selected, setSelected] = useState(null);
  const [telemetry, setTelemetry] = useState([]);
  const [alerts, setAlerts] = useState([]);

  // sample fallback data
  const sampleAnimals = [
    { id: 1, name: 'Kibo', species: 'Elephant', online: true, lat: -1.2921, lng: 36.8219 },
    { id: 2, name: 'Zara', species: 'Zebra', online: false, lat: -2.1521, lng: 34.8219 },
  ];

  const load = async () => {
    try {
      const [alist, alrts] = await Promise.all([AnimalsAPI.list(), AlertsAPI.list()]);
      setAnimals(alist || sampleAnimals);
      setAlerts(alrts || []);
    } catch {
      setAnimals(sampleAnimals);
      setAlerts([]);
    }
  };

  useEffect(() => { load(); }, []);

  useEffect(() => {
    if (!selected && animals.length) setSelected(animals[0]);
  }, [animals, selected]);

  const { lastMessage } = useRealtime((msg) => {
    try {
      const data = JSON.parse(msg.data);
      if (data.type === 'telemetry') {
        setTelemetry(t => [data.payload, ...t].slice(0, 50));
      }
      if (data.type === 'alert') {
        setAlerts(a => [{ title: data.title, message: data.message }, ...a].slice(0, 5));
      }
    } catch {
      // ignore
    }
  });

  useEffect(() => {
    // initial telemetry
    const fetchTelemetry = async () => {
      try {
        if (selected?.id) {
          const t = await TelemetryAPI.query({ animal_id: selected.id });
          setTelemetry(t || []);
        }
      } catch {
        setTelemetry([]);
      }
    };
    fetchTelemetry();
  }, [selected]);

  const markers = useMemo(() => animals.map(a => ({
    id: a.id, lat: a.lat ?? 0, lng: a.lng ?? 0, title: a.name, subtitle: a.species
  })), [animals]);

  const heat = useMemo(() => telemetry.map(t => ({ lat: t.lat, lng: t.lng })), [telemetry]);

  const center = useMemo(() => {
    if (selected?.lat && selected?.lng) return [selected.lat, selected.lng];
    if (animals[0]) return [animals[0].lat || 0, animals[0].lng || 0];
    return [0, 0];
  }, [selected, animals]);

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-4 mt-4">
        <Sidebar animals={animals} onSelect={setSelected} selectedId={selected?.id} />
        <div className="space-y-4">
          <MapContainer center={center} zoom={6} markers={markers} heat={heat} onMarkerClick={(m) => {
            const a = animals.find(x => x.id === m.id);
            if (a) setSelected(a);
          }} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <MarkerList items={telemetry.map(t => ({ animalName: selected?.name || 'Animal', timestamp: t.timestamp || Date.now(), lat: t.lat || 0, lng: t.lng || 0 }))} />
            <Heatmap stats={Array.from({ length: 24 }, () => Math.floor(Math.random() * 100))} />
            <Timeline points={telemetry} />
          </div>
        </div>
      </div>
      <AlertToast alerts={alerts} />
    </div>
  );
}
