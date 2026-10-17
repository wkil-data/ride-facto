export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  items: string[];
  fullDescription: string;
  leadTime: string;
  recommendedFor: string[];
  image: string;
}

export interface ShopProduct {
  id: string;
  name: string;
  category: 'HUILES & ENTRETIEN' | 'PNEUS' | 'PIÈCES' | 'PROTECTIONS' | 'ACCESSOIRES' | 'ÉQUIPEMENT PILOTE';
  brand: string;
  price: number;
  inStock: boolean;
  shortDescription: string;
  specs: string[];
  reference: string;
}

export interface Motorbike {
  id: string;
  brand: string;
  model: string;
  year: number;
  displacement: string;
  mileageOrHours: string;
  price: number;
  category: string;
  condition: string;
  status?: 'disponible' | 'reservee' | 'vendue';
  imageUrl?: string;
  galleryUrls?: string[];
  description: string;
  keyFeatures: string[];
  inspectionStatus: string;
  highlightBadge?: string;
}

export interface AppointmentFormData {
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  motoMarque: string;
  motoModele: string;
  motoAnnee: string;
  kilometrage: string;
  heuresMoteur: string;
  typeIntervention: 'Entretien' | 'Réparation' | 'Pneus' | 'Diagnostic' | 'Préparation' | 'Autre';
  description: string;
  dateSouhaitee: string;
  photos: string[];
}
