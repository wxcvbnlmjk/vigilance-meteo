import { useState, useEffect } from 'react'
import './App.css'
import { Map } from './components/Map'
import { Vigilance, VigilanceFilters } from './types/vigilance'
import { getVigilances } from './services/vigilanceApi'

function App() {
  const [vigilances, setVigilances] = useState<Vigilance[]>([]);
  const [filters, setFilters] = useState<VigilanceFilters>({});
  
  // Listes uniques pour les filtres
  const [uniqueDates, setUniqueDates] = useState<string[]>([]);
  const [uniqueDepartments, setUniqueDepartments] = useState<{code: string, name: string}[]>([]);
  const [uniquePhenomena, setUniquePhenomena] = useState<{id: number, name: string}[]>([]);

  // Charger les vigilances
  useEffect(() => {
    const loadVigilances = async () => {
      const data = await getVigilances();
      setVigilances(data);

      // Extraire les valeurs uniques pour les filtres
      const dates = [...new Set(data.map(v => 
        new Date(v.begin_time).toLocaleDateString('fr-FR')
      ))].sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

      const departments = [...new Set(data.map(v => 
        JSON.stringify({ code: v.domain_id, name: v.domain_id })
      ))].map(str => JSON.parse(str));

      const phenomena = [...new Set(data.map(v => 
        JSON.stringify({ id: v.phenomenon_id, name: v.phenomenon })
      ))].map(str => JSON.parse(str));

      setUniqueDates(dates);
      setUniqueDepartments(departments);
      setUniquePhenomena(phenomena);
    };

    loadVigilances();
  }, []);

  // Filtrer les vigilances en fonction des filtres sélectionnés
  const filteredVigilances = vigilances.filter(vigilance => {
    if (filters.date && new Date(vigilance.begin_time).toLocaleDateString('fr-FR') !== filters.date) return false;
    if (filters.department && vigilance.domain_id !== filters.department) return false;
    if (filters.phenomenonType && vigilance.phenomenon_id.toString() !== filters.phenomenonType) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-base-100">
      <header className="navbar bg-base-200 shadow-lg">
        <div className="flex-1">
          <h1 className="text-xl font-bold px-4">Vigilances Météo</h1>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Filtres */}
          <div className="md:col-span-1 space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Date</span>
              </label>
              <select 
                className="select select-bordered w-full"
                value={filters.date || ''}
                onChange={(e) => setFilters({...filters, date: e.target.value})}
              >
                <option value="">Toutes les dates</option>
                {uniqueDates.map(date => (
                  <option key={date} value={date}>{date}</option>
                ))}
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Département</span>
              </label>
              <select 
                className="select select-bordered w-full"
                value={filters.department || ''}
                onChange={(e) => setFilters({...filters, department: e.target.value})}
              >
                <option value="">Tous les départements</option>
                {uniqueDepartments.map(dept => (
                  <option key={dept.code} value={dept.code}>
                    {dept.code} - {dept.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Type de vigilance</span>
              </label>
              <select 
                className="select select-bordered w-full"
                value={filters.phenomenonType || ''}
                onChange={(e) => setFilters({...filters, phenomenonType: e.target.value})}
              >
                <option value="">Tous les types</option>
                {uniquePhenomena.map(phenomenon => (
                  <option key={phenomenon.id} value={phenomenon.id}>
                    {phenomenon.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Carte */}
          <div className="md:col-span-3 bg-base-200 rounded-lg relative" style={{ height: '600px' }}>
            <Map vigilances={filteredVigilances} />
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
