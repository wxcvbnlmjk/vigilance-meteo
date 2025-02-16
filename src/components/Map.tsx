import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Vigilance } from '../types/vigilance';
import { Department } from '../types/geojson';

// Fonction pour formater la date
const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Couleurs des vigilances avec leurs labels
const VIGILANCE_CONFIG: Record<number, { color: string; label: string }> = {
  2: { color: '#ffeb3b', label: 'Jaune - Soyez attentif' },
  3: { color: '#ff9800', label: 'Orange - Soyez très vigilant' },
  4: { color: '#f44336', label: 'Rouge - Vigilance absolue' }
};

// URL du GeoJSON des départements français
const DEPARTMENTS_GEOJSON_URL = 'https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/departements.geojson';

// Coordonnées de la France métropolitaine
const FRANCE_BOUNDS_COORDS = [
  [42.333, -5.142], // Sud-Ouest
  [50.7509, 9.561]   // Nord-Est
] as [[number, number], [number, number]];

const FRANCE_BOUNDS = L.latLngBounds(
  L.latLng(FRANCE_BOUNDS_COORDS[0]),
  L.latLng(FRANCE_BOUNDS_COORDS[1])
);

const FRANCE_CENTER: L.LatLngExpression = [46.227638, 2.213749];

interface MapProps {
  vigilances: Vigilance[];
}

export function Map({ vigilances }: MapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainer = useRef<HTMLDivElement>(null);
  const geoJsonLayerRef = useRef<L.GeoJSON | null>(null);

  useEffect(() => {
    if (mapRef.current || !mapContainer.current) return;

    // Créer la carte centrée sur la France
    mapRef.current = L.map(mapContainer.current, {
      center: FRANCE_CENTER,
      zoom: 6,
      minZoom: 5,
      maxZoom: 9,
      zoomControl: true,
      dragging: true,
      scrollWheelZoom: true,
      maxBounds: FRANCE_BOUNDS
    });

    // Ajouter la couche OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(mapRef.current);

    // S'assurer que la vue est centrée sur la France
    mapRef.current.fitBounds(FRANCE_BOUNDS, {
      padding: [20, 20], // Ajouter une marge
      animate: false     // Pas d'animation au chargement initial
    });

    // Charger et ajouter les départements
    fetch(DEPARTMENTS_GEOJSON_URL)
      .then(response => response.json())
      .then(data => {
        geoJsonLayerRef.current = L.geoJSON(data, {
          style: {
            fillColor: 'transparent',
            fillOpacity: 0,
            weight: 1,
            color: '#666',
          }
        }).addTo(mapRef.current!);

        // Mettre à jour les styles si des vigilances sont déjà chargées
        if (vigilances.length > 0) {
          updateDepartmentsStyle();
        }

        // Recentrer la carte après le chargement des départements
        mapRef.current?.fitBounds(FRANCE_BOUNDS, {
          padding: [20, 20],
          animate: false
        });
      });

    // Ajouter un gestionnaire d'événements pour maintenir la vue sur la France
    mapRef.current.on('moveend', () => {
      const currentBounds = mapRef.current?.getBounds();
      
      if (currentBounds && !FRANCE_BOUNDS.contains(currentBounds)) {
        mapRef.current?.fitBounds(FRANCE_BOUNDS, {
          padding: [20, 20],
          animate: true
        });
      }
    });

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  // Fonction pour mettre à jour les styles des départements
  const updateDepartmentsStyle = () => {
    if (!geoJsonLayerRef.current || !vigilances.length) return;

    geoJsonLayerRef.current.eachLayer((layer: L.Layer) => {
      const path = layer as L.Path;
      const geoJsonFeature = (layer as any).feature as Department;
      
      if (geoJsonFeature && geoJsonFeature.properties) {
        const vigilance = vigilances.find(v => 
          v.domain_id === geoJsonFeature.properties.code
        );
        
        if (vigilance && vigilance.color_id in VIGILANCE_CONFIG) {
          const config = VIGILANCE_CONFIG[vigilance.color_id];
          path.setStyle({
            fillColor: config.color,
            fillOpacity: 0.6
          });

          const popupContent = `
            <div class="p-4">
              <h3 class="text-lg font-bold mb-2">${geoJsonFeature.properties.nom}</h3>
              <div class="space-y-2">
                <p class="font-semibold" style="color: ${config.color}">
                  ${config.label}
                </p>
                <p class="font-medium">
                  Phénomène : ${vigilance.phenomenon}
                </p>
                <div class="text-sm">
                  <p>Début : ${formatDate(vigilance.begin_time)}</p>
                  <p>Fin : ${formatDate(vigilance.end_time)}</p>
                </div>
                <p class="text-xs text-gray-500 mt-2">
                  Mis à jour le ${formatDate(vigilance.product_datetime)}
                </p>
              </div>
            </div>
          `;

          path.bindPopup(popupContent, {
            maxWidth: 300,
            className: 'vigilance-popup'
          });
        }
      }
    });
  };

  // Mettre à jour les couleurs des départements quand les vigilances changent
  useEffect(() => {
    updateDepartmentsStyle();
  }, [vigilances]);

  return (
    <div 
      ref={mapContainer}
      style={{ 
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        borderRadius: '0.5rem',
        overflow: 'hidden'
      }}
    />
  );
} 