import { Vigilance } from '../types/vigilance';

interface ApiResponse {
  total_count: number;
  results: Vigilance[];
}

const API_URL = 'https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/weatherref-france-vigilance-meteo-departement/records';

export async function getVigilances(date_debut: string, date_fin: string): Promise<Vigilance[]> {
  try {
    // Filtre : date_debut <= end_time AND date_fin >= begin_time
    const dateFilter = `end_time>='${date_debut}' AND begin_time<='${date_fin}'`;
    // Première requête : color_id > 2
    const query1 = `color_id>2 AND ${dateFilter}`;
    const response1 = await fetch(`${API_URL}?where=${encodeURIComponent(query1)}&limit=100`);
    if (!response1.ok) {
      throw new Error(`HTTP error! status: ${response1.status}`);
    }
    const data1: ApiResponse = await response1.json();

    const allDomainIds: string[] = [
      '01', '02', '03', '04', '05', '06', '07', '08', '09',
      '10', '11', '12', '13', '14', '15', '16', '17', '18', '19',
      '2A', '2B',
      '21', '22', '23', '24', '25', '26', '27', '28', '29',
      '30', '31', '32', '33', '34', '35', '36', '37', '38', '39',
      '40', '41', '42', '43', '44', '45', '46', '47', '48', '49',
      '50', '51', '52', '53', '54', '55', '56', '57', '58', '59',
      '60', '61', '62', '63', '64', '65', '66', '67', '68', '69',
      '70', '71', '72', '73', '74', '75', '76', '77', '78', '79',
      '80', '81', '82', '83', '84', '85', '86', '87', '88', '89',
      '90', '91', '92', '93', '94', '95',
      '971', '972', '973', '974', '976',
      '975', '977', '978', '984', '986', '987', '988'
    ];
    const presentDomainIds = new Set(data1.results.map(v => v.domain_id.toString().padStart(2, '0')));
    const missingDomainIds = allDomainIds.filter(id => !presentDomainIds.has(id));

    let data2: ApiResponse = { total_count: 0, results: [] };
    if (missingDomainIds.length > 0) {
      const domainIdsStr = missingDomainIds.map(id => `'${id}'`).join(",");
      const query2 = `color_id=2 AND ${dateFilter} AND domain_id IN (${domainIdsStr})`;
      const response2 = await fetch(`${API_URL}?where=${encodeURIComponent(query2)}&limit=100`);
      if (!response2.ok) {
        throw new Error(`HTTP error! status: ${response2.status}`);
      }
      data2 = await response2.json();
    }

    const allVigilances = [...data1.results, ...data2.results].map(vigilance => ({
      ...vigilance,
      domain_id: vigilance.domain_id.toString().padStart(2, '0')
    }));
    return allVigilances;
  } catch (error) {
    console.error('Erreur lors de la récupération des vigilances:', error);
    return [];
  }
} 