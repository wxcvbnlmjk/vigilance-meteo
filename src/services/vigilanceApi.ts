import { Vigilance } from '../types/vigilance';

interface ApiResponse {
  total_count: number;
  results: Vigilance[];
}

const API_URL = 'https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/weatherref-france-vigilance-meteo-departement/records';

export async function getVigilances(): Promise<Vigilance[]> {
  try {
    // Récupérer uniquement les vigilances actives avec une date de fin supérieure à maintenant
    const now = new Date().toISOString();
    const query = `color_id>1 AND end_time>'${now}'`;
    const response = await fetch(`${API_URL}?where=${encodeURIComponent(query)}&limit=100`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: ApiResponse = await response.json();
    
    return data.results.map(vigilance => ({
      ...vigilance,
      domain_id: vigilance.domain_id.toString().padStart(2, '0')
    }));
  } catch (error) {
    console.error('Erreur lors de la récupération des vigilances:', error);
    return [];
  }
} 