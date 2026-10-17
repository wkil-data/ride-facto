import { ServiceItem } from './types';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'entretien',
    number: '01',
    title: 'ENTRETIEN',
    shortDesc: 'Maintenance périodique rigoureuse selon les tolérances constructeur et l\'intensité de vos sorties.',
    items: [
      'Vidanges moteur & boîte (huiles racing haute viscosité)',
      'Remplacement filtres à huile & filtres à air préparés',
      'Bougies racing & calage allumage',
      'Purge & réfection circuits de freinage (liquide haute température)',
      'Transmission (tension, graissage, contrôle pignons & couronnes)',
      'Liquides de refroidissement sans eau (Evans) & classiques',
      'Contrôle complet des jeux, serrages au couple et roulements'
    ],
    fullDescription: 'Un moteur entretenu avec précision ne vous laisse jamais en carafe au milieu des bois ou au fond d\'une ornière. Chez Ride Factory, chaque entretien respecte un protocole strict de vérification en 32 points, avec traçabilité complète des pièces et des fluides utilisés.',
    leadTime: '24h à 48h sur rendez-vous',
    recommendedFor: ['Enduro 2T & 4T', 'Trail & Maxi-Trail', 'Motocross', 'Routière'],
    image: '/src/assets/images/engine_preparation_detail_1791293915497.jpg',
  },
  {
    id: 'reparation',
    number: '02',
    title: 'RÉPARATION',
    shortDesc: 'Interventions mécaniques, électroniques et réfection complète après choc ou casse moteur.',
    items: [
      'Diagnostic électronique multimarques approfondi',
      'Partie cycle : biellettes, fourches, amortisseurs, bras oscillant',
      'Moteur : segmentation, piston, bielle, distribution, boîte',
      'Remplacement roulements de roues, colonne et biellettes',
      'Freinage : réfection étriers, maîtres-cylindres, disques flottants',
      'Électricité & faisceau : démarreur, stator, commodos renforcés'
    ],
    fullDescription: 'Une fuite de spy, une boîte qui accroche, un jeu anormal ou une perte de compression : nous diagnostiquons la cause réelle avant de remplacer quoi que ce soit. Nous travaillons avec outillage spécialisé et pièces d\'origine ou renforcées pour garantir la fiabilité.',
    leadTime: 'Sur devis après diagnostic',
    recommendedFor: ['Toutes cylindrées', 'Motos accidentées', 'Remise en état après saison'],
    image: '/src/assets/images/hero_enduro_workshop_1791293882530.jpg',
  },
  {
    id: 'preparation',
    number: '03',
    title: 'PRÉPARATION',
    shortDesc: 'Optimisation sur-mesure pour l\'enduro hard, les championnats MX ou les expéditions rally raid.',
    items: [
      'Enduro : suspensions personnalisées, sangles de tirage, culasse haute compression',
      'Trail & Maxi-trail : renforts crashbars, suspension surélevée, platines rallye',
      'Motocross : cartographies moteur, départ assisté, échappements racing',
      'Adventure : navigation cockpit, réservoirs grande contenance, faisceau auxiliaire étanche'
    ],
    fullDescription: 'Une moto de série est un compromis d\'usine. Notre atelier adapte votre machine à votre gabarit, votre discipline et votre niveau de pilotage. Nous calibrons les suspensions en fonction de votre poids avec équipement complet pour une motricité absolue.',
    leadTime: '3 à 7 jours ouvrés selon package',
    recommendedFor: ['Enduro Extrême', 'Rallye Raid', 'Bivouac Trail', 'Motocross FMB'],
    image: '/src/assets/images/dirt_offroad_action_1791293893287.jpg',
  },
  {
    id: 'pneumatiques',
    number: '04',
    title: 'PNEUMATIQUES',
    shortDesc: 'Spécialiste montage pneus, chambres renforcées 4mm et bib mousse sans déformation ni pincement.',
    items: [
      'Pneus enduro homologués FIM (toutes gommes et carcasses)',
      'Pneus trail 50/50 & profil adventure grand raid',
      'Chambres à air ultra-renforcées 4mm & valves tubeless',
      'Bib mousse : montage machine dédié, lubrification silicone généreuse',
      'Double gripster & perçage jante pour basse pression',
      'Équilibrage dynamique pour maxi-trails & trails routiers'
    ],
    fullDescription: 'Monter un bib mousse neuf ou un pneu gomme tendre sans abîmer les tringles ni pincer requiert un coup de main précis et une monteuse professionnelle adaptée. Nous stockons les marques de référence pour vous faire repartir avec la pression ou la fermeté idéale pour le terrain.',
    leadTime: 'Montage express (30-45 min sur rendez-vous)',
    recommendedFor: ['Michelin Bib Mousse', 'Hard Enduro Gummy', 'Adventure Tubeless'],
    image: '/src/assets/images/workshop_tires_mousse_1791293904780.jpg',
  },
];
