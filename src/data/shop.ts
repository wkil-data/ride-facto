import { ShopProduct } from './types';

export const SHOP_PRODUCTS: ShopProduct[] = [
  {
    id: 'prod-01',
    name: 'Motorex Cross Power 2T (4L)',
    category: 'HUILES & ENTRETIEN',
    brand: 'Motorex',
    price: 68.00,
    inStock: true,
    shortDescription: 'Huile 100% synthèse de compétition pour moteurs 2-temps off-road à injection ou prémélange.',
    specs: ['Norme JASO FD / API TC', 'Combustion propre sans calamine', 'Formulation anti-friction compétition'],
    reference: 'MO-CP-2T-4L'
  },
  {
    id: 'prod-02',
    name: 'Motul 300V Factory Line 15W60 Off-Road (4L)',
    category: 'HUILES & ENTRETIEN',
    brand: 'Motul',
    price: 76.50,
    inStock: true,
    shortDescription: 'Technologie ESTER Core pour moteurs 4-temps soumis aux contraintes extrêmes d\'embrayage.',
    specs: ['Grade 15W60 tout-terrain', 'Protection maximale de boîte', 'Stabilité thermique rallye raid'],
    reference: 'MT-300V-4T-1560'
  },
  {
    id: 'prod-03',
    name: 'Liquide de Frein Motul RBF 660 Factory Line (500ml)',
    category: 'HUILES & ENTRETIEN',
    brand: 'Motul',
    price: 19.90,
    inStock: true,
    shortDescription: 'Point d\'ébullition exceptionnel à 325°C, idéal pour éviter le fading de la pédale arrière.',
    specs: ['Point d\'ébullition à sec : 325°C', 'Compatible DOT 4', 'Formule compétition'],
    reference: 'MT-RBF-660'
  },
  {
    id: 'prod-04',
    name: 'Michelin Enduro Medium 140/80-18 70R TT',
    category: 'PNEUS',
    brand: 'Michelin',
    price: 94.00,
    inStock: true,
    shortDescription: 'Le pneu champion du monde d\'enduro FIM : grip phénoménal sur rochers, racines et terre meuble.',
    specs: ['Homologué FIM', 'Dimension 140/80-18', 'Gomme Medium polyvalente'],
    reference: 'MICH-END-MED-18'
  },
  {
    id: 'prod-05',
    name: 'Michelin Bib Mousse M14 (140/80-18)',
    category: 'PNEUS',
    brand: 'Michelin',
    price: 139.00,
    inStock: true,
    shortDescription: 'L\'invention originale Michelin anti-crevaison totale. Équivaut à environ 0.9 bar.',
    specs: ['Zéro risque de crevaison', 'Fourni avec tube gel de montage', 'Durabilité racing'],
    reference: 'MICH-MOUSSE-M14'
  },
  {
    id: 'prod-06',
    name: 'Metzeler MCE 6 Days Extreme 90/90-21 FIM',
    category: 'PNEUS',
    brand: 'Metzeler',
    price: 78.00,
    inStock: true,
    shortDescription: 'Pneu avant de référence pour un guidage ultra-précis en ornières et dévers humides.',
    specs: ['Avant 90/90-21', 'Carcasse renforcée', 'Homologation FIM'],
    reference: 'METZ-6DAYS-21'
  },
  {
    id: 'prod-07',
    name: 'Kit Chaîne D.I.D 520 VT2 Enduro Racing X-Ring Gold',
    category: 'PIÈCES',
    brand: 'D.I.D',
    price: 145.00,
    inStock: true,
    shortDescription: 'Chaîne étroite conçue spécifiquement pour l\'enduro avec joints toriques à friction minimale.',
    specs: ['Pas 520 - 118 maillons', 'Joints X-Ring à friction réduite', 'Plaquettes or dorées'],
    reference: 'DID-520VT2-GLD'
  },
  {
    id: 'prod-08',
    name: 'Plaquettes de Frein Brembo Sinter Tout-Terrain (Paire)',
    category: 'PIÈCES',
    brand: 'Brembo',
    price: 38.50,
    inStock: true,
    shortDescription: 'Composé métal fritté ultra-résistant à la boue et à l\'échauffement en descente raide.',
    specs: ['Garniture frittée racing', 'Tenue dans l\'eau & la boue', 'Disponibles Av/Ar'],
    reference: 'BRM-SINT-TT'
  },
  {
    id: 'prod-09',
    name: 'Sabot Moteur AXP Xtrem 8mm HDPE Haute Densité',
    category: 'PROTECTIONS',
    brand: 'AXP Racing',
    price: 159.00,
    inStock: true,
    shortDescription: 'Protection intégrale du cadre, des carters et de la biellette d\'amortisseur en PEHD 8mm glissant.',
    specs: ['Épaisseur 8mm incassable', 'Absorption des chocs sans vibration', 'Protection biellette intégrée'],
    reference: 'AXP-XTR-8MM'
  },
  {
    id: 'prod-10',
    name: 'Protège-Mains Barkbusters VPS Aluminium Renforcé',
    category: 'PROTECTIONS',
    brand: 'Barkbusters',
    price: 115.00,
    inStock: true,
    shortDescription: 'Barre en aluminium trempé traité thermiquement avec coques déflectrices VPS ajustables.',
    specs: ['Arceau aluminium 2 points', 'Déflecteur ajustable en hauteur', 'Résistance maximale aux chutes'],
    reference: 'BARK-VPS-BK'
  },
  {
    id: 'prod-11',
    name: 'Sangle de Tirage Hard Enduro Ride Factory (Avant + Arrière)',
    category: 'ACCESSOIRES',
    brand: 'Ride Factory',
    price: 34.00,
    inStock: true,
    shortDescription: 'Sangles de traction ultra-résistantes avec coutures renforcées en X pour franchissement en pente.',
    specs: ['Sangles polyester 1200kg', 'Montage direct sur té et cadre', 'Logo brodé résistant boue'],
    reference: 'RF-STRAP-SET'
  },
  {
    id: 'prod-12',
    name: 'Gants Ride Factory Technical Enduro Grip Noir/Orange',
    category: 'ÉQUIPEMENT PILOTE',
    brand: 'Ride Factory Workshop',
    price: 39.00,
    inStock: true,
    shortDescription: 'Paume Clarino monocouche respirante pour un ressenti poignée chirurgical et inserts silicone index.',
    specs: ['Paume Clarino respirante', 'Doigts pré-courbés anti-ampoules', 'Grip silicone freins & embrayage'],
    reference: 'RF-GLOVE-V1'
  }
];
