import { Motorbike } from './types';
import ktmImg from '../assets/images/ktm_300_exc_enduro_1792762726710.jpg';
import husqvarnaImg from '../assets/images/husqvarna_701_rally_1792762749903.jpg';
import tenereImg from '../assets/images/tenere_700_rally_1792762748528.jpg';
import gasgasImg from '../assets/images/gasgas_ec_enduro_1792762764004.jpg';
import betaImg from '../assets/images/beta_rr_racing_1792762764429.jpg';

export const MOTORBIKES_DATA: Motorbike[] = [
  {
    id: 'bike-01',
    brand: 'KTM',
    model: '300 EXC HARDENDURO TBI',
    year: 2024,
    displacement: '293 cc (2-Temps)',
    mileageOrHours: '24 h moteur',
    price: 9850,
    category: 'Enduro',
    condition: 'Occasion Révisée',
    status: 'disponible',
    imageUrl: ktmImg,
    highlightBadge: 'Coup de Cœur Atelier',
    description: 'Modèle Hardenduro officiel révisé à 100% dans notre atelier. Injection TBI parfaitement réglée, suspensions WP XACT à cartouche fermée revalvées.',
    keyFeatures: [
      'Bib mousse Michelin neufs avant & arrière',
      'Sabot moteur AXP Xtrem 8mm avec protection biellette',
      'Protège-disque arrière usiné CNC taillé dans la masse',
      'Radiateurs renforcés avec ventilateur d\'origine',
      'Piston et segmentation contrôlés sous tolérance d\'origine'
    ],
    inspectionStatus: 'Certifié Ride Factory — 32 points validés'
  },
  {
    id: 'bike-02',
    brand: 'HUSQVARNA',
    model: '701 ENDURO RALLY EXPEDITION',
    year: 2023,
    displacement: '692 cc Monocylindre',
    mileageOrHours: '4 850 km',
    price: 11400,
    category: 'Trail',
    condition: 'Préparée Atelier',
    status: 'disponible',
    imageUrl: husqvarnaImg,
    highlightBadge: 'Projet Rallye Raid',
    description: 'Une véritable arme de voyage tout-terrain et rallye raid. Équipée d\'une tour de navigation légère, suspensions WP XPLOR recalibrées et réservoir auxiliaire.',
    keyFeatures: [
      'Tour de navigation carbone avec double phare LED Baja Designs',
      'Échappement homologué titane et cartographie couple bas régime',
      'Crashbars Outback Motortek et sabot aluminium 5mm',
      'Pneus Pirelli Scorpion Rally neufs montés avec chambres 4mm',
      'Historique complet d\'entretien disponible'
    ],
    inspectionStatus: 'Certifié Ride Factory — Prête pour le désert ou le TET'
  },
  {
    id: 'bike-03',
    brand: 'YAMAHA',
    model: 'TÉNÉRÉ 700 RALLY EDITION',
    year: 2024,
    displacement: '689 cc CP2',
    mileageOrHours: '2 150 km',
    price: 10900,
    category: 'Adventure',
    condition: 'Occasion Révisée',
    status: 'reservee',
    imageUrl: tenereImg,
    highlightBadge: 'Option en cours',
    description: 'Coloris Heritage Racing bleu emblématique. Moteur CP2 réputé indestructible, premier entretien des 1000 km effectué dans les règles de l\'art chez Ride Factory.',
    keyFeatures: [
      'Silencieux Akrapovic slip-on d\'origine',
      'Selle rallye monobloc surélevée',
      'Sabot alu renforcé 4mm et protège-radiateur alu',
      'Repose-pieds enduro larges en acier cranté',
      'Garantie constructeur résiduelle préservée'
    ],
    inspectionStatus: 'Certifié Ride Factory — État showroom'
  },
  {
    id: 'bike-04',
    brand: 'GASGAS',
    model: 'EC 350F FACTORY EDITION',
    year: 2024,
    displacement: '349 cc (4-Temps DOHC)',
    mileageOrHours: '18 h moteur',
    price: 8990,
    category: 'Enduro',
    condition: 'Occasion Révisée',
    status: 'disponible',
    imageUrl: gasgasImg,
    highlightBadge: 'Sortie Atelier',
    description: 'L\'équilibre parfait entre la maniabilité d\'une 250 et le couple d\'une 450. Machine d\'un pilote amateur méticuleux, lavée et graissée après chaque sortie.',
    keyFeatures: [
      'Embrayage Braktec hydraulique avec fluide racing changé',
      'Tés de fourche usinés CNC anodisés rouge Factory',
      'Jantes Excel Takasago noires sans voile',
      'Filtre à air neuf pré-huilé Motorex',
      'Fourche et amortisseur vidangés pour la vente'
    ],
    inspectionStatus: 'Certifié Ride Factory — Sort de révision complète'
  },
  {
    id: 'bike-05',
    brand: 'BETA',
    model: 'RR 300 RACING 2T',
    year: 2024,
    displacement: '298 cc (2-Temps)',
    mileageOrHours: '0 km (Zéro heure)',
    price: 9950,
    category: 'Enduro',
    condition: 'Neuf',
    status: 'disponible',
    imageUrl: betaImg,
    highlightBadge: 'Véhicule Neuf',
    description: 'Version Racing haut de gamme neuve avec la prestigieuse fourche KYB AOS à cartouche fermée de 48mm et amortisseur arrière KYB développé pour la compétition.',
    keyFeatures: [
      'Fourche inversée Kayaba 48 mm à cartouche fermée',
      'Graissage par mélange direct racing pour gain de poids',
      'Tire-axe de roue avant rapide anodisé rouge',
      'Pignon arrière Supersprox aluminium/acier',
      'Facture d\'achat officielle Ride Factory et certificat de conformité'
    ],
    inspectionStatus: 'Véhicule Neuf — Préparation atelier offerte avant livraison'
  },
  {
    id: 'bike-06',
    brand: 'HONDA',
    model: 'CRF 450R SPECIAL RACING',
    year: 2023,
    displacement: '449 cc Unicam',
    mileageOrHours: '32 h moteur',
    price: 7400,
    category: 'Motocross',
    condition: 'Occasion Révisée',
    status: 'vendue',
    imageUrl: ktmImg,
    highlightBadge: 'Vendue par Ride Factory',
    description: 'Piste et cross pur. Moteur puissant et ultra-réactif avec contrôle de traction HSTC et 3 cartographies moteur au guidon. Jamais couru en championnat boueux.',
    keyFeatures: [
      'Compteur d\'heures officiel Honda connecté',
      'Piston changé préventivement à 30h avec facture et pièces visibles',
      'Ligne échappement Yoshimura RS-12 inox',
      'Suspensions Showa préparées pour 78-85 kg',
      'Kit chaîne et patins neufs'
    ],
    inspectionStatus: 'Certifié Ride Factory — Moteur reconditionné'
  }
];
