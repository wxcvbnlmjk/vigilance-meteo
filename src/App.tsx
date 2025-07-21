import { useState, useEffect } from 'react'
import './App.css'
import { Map } from './components/Map'
import { ThemeToggle } from './components/ThemeToggle'
import { Vigilance, VigilanceFilters } from './types/vigilance'
import { getVigilances } from './services/vigilanceApi'

// Définition de l'interface pour les départements
interface Department {
  code: string;
  name: string;
}

// Liste des départements français avec leurs noms
const DEPARTMENTS: Record<string, string> = {
  "01": "Ain",
  "02": "Aisne",
  "03": "Allier",
  "04": "Alpes-de-Haute-Provence",
  "05": "Hautes-Alpes",
  "06": "Alpes-Maritimes",
  "07": "Ardèche",
  "08": "Ardennes",
  "09": "Ariège",
  "10": "Aube",
  "11": "Aude",
  "12": "Aveyron",
  "13": "Bouches-du-Rhône",
  "14": "Calvados",
  "15": "Cantal",
  "16": "Charente",
  "17": "Charente-Maritime",
  "18": "Cher",
  "19": "Corrèze",
  "2A": "Corse-du-Sud",
  "2B": "Haute-Corse",
  "21": "Côte-d'Or",
  "22": "Côtes-d'Armor",
  "23": "Creuse",
  "24": "Dordogne",
  "25": "Doubs",
  "26": "Drôme",
  "27": "Eure",
  "28": "Eure-et-Loir",
  "29": "Finistère",
  "30": "Gard",
  "31": "Haute-Garonne",
  "32": "Gers",
  "33": "Gironde",
  "34": "Hérault",
  "35": "Ille-et-Vilaine",
  "36": "Indre",
  "37": "Indre-et-Loire",
  "38": "Isère",
  "39": "Jura",
  "40": "Landes",
  "41": "Loir-et-Cher",
  "42": "Loire",
  "43": "Haute-Loire",
  "44": "Loire-Atlantique",
  "45": "Loiret",
  "46": "Lot",
  "47": "Lot-et-Garonne",
  "48": "Lozère",
  "49": "Maine-et-Loire",
  "50": "Manche",
  "51": "Marne",
  "52": "Haute-Marne",
  "53": "Mayenne",
  "54": "Meurthe-et-Moselle",
  "55": "Meuse",
  "56": "Morbihan",
  "57": "Moselle",
  "58": "Nièvre",
  "59": "Nord",
  "60": "Oise",
  "61": "Orne",
  "62": "Pas-de-Calais",
  "63": "Puy-de-Dôme",
  "64": "Pyrénées-Atlantiques",
  "65": "Hautes-Pyrénées",
  "66": "Pyrénées-Orientales",
  "67": "Bas-Rhin",
  "68": "Haut-Rhin",
  "69": "Rhône",
  "70": "Haute-Saône",
  "71": "Saône-et-Loire",
  "72": "Sarthe",
  "73": "Savoie",
  "74": "Haute-Savoie",
  "75": "Paris",
  "76": "Seine-Maritime",
  "77": "Seine-et-Marne",
  "78": "Yvelines",
  "79": "Deux-Sèvres",
  "80": "Somme",
  "81": "Tarn",
  "82": "Tarn-et-Garonne",
  "83": "Var",
  "84": "Vaucluse",
  "85": "Vendée",
  "86": "Vienne",
  "87": "Haute-Vienne",
  "88": "Vosges",
  "89": "Yonne",
  "90": "Territoire de Belfort",
  "91": "Essonne",
  "92": "Hauts-de-Seine",
  "93": "Seine-Saint-Denis",
  "94": "Val-de-Marne",
  "95": "Val-d'Oise"
};

const getTodayRange = () => {
  const now = new Date();
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);
  const end = new Date(now);
  end.setHours(23, 59, 59, 999);
  return { date_debut: start.toLocaleDateString("fr-FR"), date_fin: end.toLocaleDateString("fr-FR") };
};

const getTomorrowRange = () => {
  const now = new Date();
  const start = new Date(now);
  start.setDate(start.getDate() + 1);
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setHours(23, 59, 59, 999);
  return { date_debut: start.toLocaleDateString("fr-FR"), date_fin: end.toLocaleDateString("fr-FR") };
};

function App() {
  const [selectedDate, setSelectedDate] = useState<string>('today');
  // const [vigilances, setVigilances] = useState<Vigilance[]>([]);
  const [filters, setFilters] = useState<VigilanceFilters>({});
  const [filteredVigilances, setFilteredVigilances] = useState<Vigilance[]>([]);
  const [allVigilances, setAllVigilances] = useState<Vigilance[]>([]);
  const [loading, setLoading] = useState<boolean>(false); // Ajout de l'état de chargement
  
  // Listes uniques pour les filtres
  // const [uniqueDates, setUniqueDates] = useState<string[]>([]);
  const [uniqueDepartments, setUniqueDepartments] = useState<Department[]>([]);
  const [uniquePhenomena, setUniquePhenomena] = useState<{id: number, name: string}[]>([]);

  // Charger les vigilances
  useEffect(() => {
    let range = { date_debut: '', date_fin: '' };
    if (selectedDate === 'today') {
      range = getTodayRange();
    } else if (selectedDate === 'tomorrow') {
      range = getTomorrowRange();
    }
    const loadVigilances = async () => {
      setLoading(true); // Début du chargement
      const data = await getVigilances(range.date_debut, range.date_fin);
      
      // Filtrer pour exclure FRA des vigilances
      const filteredData = data.filter(v => v.domain_id !== 'FRA');
      
      // setVigilances(filteredData);
      setAllVigilances(filteredData);
      setFilteredVigilances(filteredData);

      // Extraire les valeurs uniques pour les filtres
      // const dates = [...new Set(filteredData.map(v => 
      //   new Date(v.begin_time).toLocaleDateString('fr-FR')
      // ))].sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

      // Créer la liste des départements uniques avec leurs noms
      const departmentSet = new Set();
      const departments = filteredData
        .filter(v => v.domain_id !== 'FRA')
        .reduce((acc, v) => {
          if (!departmentSet.has(v.domain_id)) {
            departmentSet.add(v.domain_id);
            acc.push({
              code: v.domain_id,
              name: DEPARTMENTS[v.domain_id] || v.domain_id
            });
          }
          return acc;
        }, [] as { code: string; name: string }[])
        .sort((a, b) => a.name.localeCompare(b.name, 'fr-FR'));

      const phenomena = [...new Set(filteredData.map(v => 
        JSON.stringify({ id: v.phenomenon_id, name: v.phenomenon })
      ))].map(str => JSON.parse(str));

      // setUniqueDates(dates);
      setUniqueDepartments(departments);
      setUniquePhenomena(phenomena);
      setLoading(false); // Fin du chargement
    };

    loadVigilances();
  }, [selectedDate]);

  // Mettre à jour les vigilances filtrées quand les filtres changent
  useEffect(() => {
    let newVigilances = [...allVigilances];

    // Si un département est sélectionné, ne garder que ses vigilances
    if (filters.department) {
      newVigilances = newVigilances.filter(v => v.domain_id === filters.department);
    }

    // Appliquer les autres filtres
    newVigilances = newVigilances.filter(vigilance => {
      if (filters.date && new Date(vigilance.begin_time).toLocaleDateString('fr-FR') !== filters.date) return false;
      if (filters.phenomenonType && vigilance.phenomenon_id.toString() !== filters.phenomenonType) return false;
      return true;
    });

    // Mettre à jour les vigilances filtrées
    setFilteredVigilances(newVigilances);
    
    // Si un département est sélectionné, masquer les autres départements
    // if (filters.department) {
    //   setVigilances(newVigilances);
    // } else {
    //   setVigilances(allVigilances);
    // }
  }, [filters, allVigilances]);

  // Gestionnaires de changement des filtres
  // const handleDateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   setFilters(prev => ({ ...prev, date: e.target.value }));
  // };

  const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters(prev => ({ ...prev, department: e.target.value }));
  };

  const handlePhenomenonChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters(prev => ({ ...prev, phenomenonType: e.target.value }));
  };

  return (
    <div className="min-h-screen bg-base-100">
      <header className="navbar bg-base-200 shadow-lg min-h-8 py-1">
        <div className="flex-1">
          <h1 className="text-xl font-bold px-4">Vigilances Météo</h1>
        </div>
        <div className="flex-none">
          <ThemeToggle />
        </div>
      </header>

      <main className="container mx-auto px-2 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          {/* Filtres */}
          <div className="md:col-span-1 space-y-2">
            <div className="form-control">
              <label className="label min-h-6 py-1">
                <span className="label-text text-sm">Date</span>
              </label>
              <select 
                className="select select-bordered w-full h-8 text-sm"
                value={selectedDate}
                onChange={e => setSelectedDate(e.target.value)}
              >
                <option value="today">Aujourd'hui</option>
                <option value="tomorrow">Demain</option>
              </select>
            </div>

            <div className="form-control">
              <label className="label min-h-6 py-1">
                <span className="label-text text-sm">Département</span>
              </label>
              <select 
                className="select select-bordered w-full h-8 text-sm"
                value={filters.department || ''}
                onChange={handleDepartmentChange}
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
              <label className="label min-h-6 py-1">
                <span className="label-text text-sm">Type de vigilance</span>
              </label>
              <select 
                className="select select-bordered w-full h-8 text-sm"
                value={filters.phenomenonType || ''}
                onChange={handlePhenomenonChange}
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
          <div className="md:col-span-3 bg-base-200 rounded-lg relative" style={{ height: '400px' }}>
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <span className="loading loading-spinner loading-lg text-primary" />
                {/* <span className="ml-4 text-lg">Chargement des vigilances météo...</span> */}
              </div>
            ) : (
              <Map vigilances={filteredVigilances} />
            )}
          </div>
      </div>
      </main>
      </div>
  )
}

export default App
