// Tarifní data podle skupin cestujících a typu jízdného
export const TARIFF_GROUPS = {
  adult: {
    label: 'Dospělý',
    multiplier: 1.0,
    description: 'Plné jízdné',
  },
  student: {
    label: 'Student / dítě (6-15 let)',
    multiplier: 0.75,
    description: 'Zlevněné jízdné',
  },
  senior: {
    label: 'Senior / ZTP (65+)',
    multiplier: 0.65,
    description: 'Zvýhodněné jízdné',
  },
  child: {
    label: 'Malé dítě (do 6 let)',
    multiplier: 0.0,
    description: 'Bez jízdného (volně)',
  },
};

export const fareCatalog = {
  standard: {
    short: {
      I: { cash: 11, card: 25, electronic: 50 },
      'I+II': { cash: 13, card: 28, electronic: 50 },
    },
    long: {
      I: { cash: 18, card: 25, electronic: 50 },
      'I+II': { cash: 22, card: 28, electronic: 50 },
    },
  },
  reduced: {
    short: {
      I: { cash: 9, card: 18, electronic: 40 },
      'I+II': { cash: 11, card: 21, electronic: 40 },
    },
    long: {
      I: { cash: 13, card: 18, electronic: 40 },
      'I+II': { cash: 16, card: 21, electronic: 40 },
    },
  },
  night: {
    short: {
      I: { cash: 28, card: null, electronic: 40 },
      'I+II': { cash: 28, card: null, electronic: 40 },
    },
    long: {
      I: { cash: 28, card: null, electronic: 40 },
      'I+II': { cash: 28, card: null, electronic: 40 },
    },
  },
  supplement: {
    short: {
      I: { cash: 8, card: null, electronic: 10 },
      'I+II': { cash: 8, card: null, electronic: 10 },
    },
    long: {
      I: { cash: 8, card: null, electronic: 10 },
      'I+II': { cash: 8, card: null, electronic: 10 },
    },
  },
  luggage: {
    short: {
      I: { cash: 10, card: 18, electronic: 40 },
      'I+II': { cash: 13, card: 21, electronic: 40 },
    },
    long: {
      I: { cash: 10, card: 18, electronic: 40 },
      'I+II': { cash: 13, card: 21, electronic: 40 },
    },
  },
};

export const tariffRows = [
  { label: 'Základní jízdné nad 3 zastávkové úseky - zóna I', zoneI: 18, zoneII: 25, max: 50, category: 'standard' },
  { label: 'Základní jízdné nad 3 zastávkové úseky - zóna I + II', zoneI: 22, zoneII: 28, max: 50, category: 'standard' },
  { label: 'Základní jízdné do 3 zastávkových úseků - zóna I', zoneI: 11, zoneII: 25, max: 50, category: 'standard' },
  { label: 'Základní jízdné do 3 zastávkových úseků - zóna I + II', zoneI: 13, zoneII: 28, max: 50, category: 'standard' },
  { label: 'Zlevněné jízdné nad 3 zastávkové úseky - zóna I', zoneI: 13, zoneII: 18, max: 40, category: 'reduced' },
  { label: 'Zlevněné jízdné nad 3 zastávkové úseky - zóna I + II', zoneI: 16, zoneII: 21, max: 40, category: 'reduced' },
  { label: 'Zlevněné jízdné do 3 zastávkových úseků - zóna I', zoneI: 9, zoneII: 18, max: 40, category: 'reduced' },
  { label: 'Zlevněné jízdné do 3 zastávkových úseků - zóna I + II', zoneI: 11, zoneII: 21, max: 40, category: 'reduced' },
  { label: 'Jízdné pro noční linky', zoneI: 28, zoneII: null, max: 40, category: 'night' },
  { label: 'Příplatek k časové jízdence za jízdu z/do II. zóny', zoneI: 8, zoneII: null, max: 10, category: 'supplement' },
  { label: 'Dovozné - spoluzavazadla a psi bez schránky - zóna I', zoneI: 10, zoneII: 18, max: 40, category: 'luggage' },
  { label: 'Dovozné - spoluzavazadla a psi bez schránky - zóna I+II', zoneI: 13, zoneII: 21, max: 40, category: 'luggage' },
];

export const lineRoute = {
  number: '99',
  label: 'Linka 99',
  direction: 'Dukla – Krajský úřad / návrat na Duklu',
  stops: [
    'Dukla, vozovna',
    'Hlavní nádraží (st. 2)',
    'U Marka',
    'Palackého',
    'Masarykovo nám. (st. 3)',
    'Náměstí Republiky (st. 1)',
    'Krajský úřad',
    'Sakařova',
    'Holubova',
    'Bezdíčkova',
    'Židov',
    'Dubina, garáže',
    'Dubina, centrum',
    'Dubina, sever',
    'Dubina, Dubinská',
    'Dubina, penzion',
    'Dubina, točna',
    'Blahoutova',
    'Na Drážce',
    'Slovany, Dašická',
    'Slovany, Spojilská',
    'Slovany, U Přejezdu',
    'Slovany, točna',
    'Černá za Bory, odb. žel. zast.',
    'Holandská',
    'Černá za Bory, prodejna',
    'Černá za Bory',
    'Holandská',
    'Černá za Bory, pošta',
    'Černá za Bory, silo',
    'Zámeček',
    'Průmyslová',
    'Pardubičky, točna',
    'Kyjevská',
    'Nemocnice',
    'Štrossova',
    'U Kostelíčka',
    'Krajský úřad',
    'Náměstí Republiky (st. 2)',
    'Masarykovo nám.',
    'Palackého',
    'U Marka',
    'Hlavní nádraží',
    'Dukla, vozovna',
  ],
};

export const stopSequence = lineRoute.stops.map((stop, index) => ({
  stop,
  direction: index < lineRoute.stops.length / 2 ? 'Dukla → Krajský úřad' : 'Krajský úřad → Dukla',
  note: index === 0 ? 'Odjezd z vozovny.' : 'Příští zastávka dle jízdního řádu.',
}));

export function calculateFinalPrice(basePrice, passengerGroup) {
  if (basePrice === null || basePrice === undefined) return null;
  if (passengerGroup === 'child') return 0;

  const multiplier = TARIFF_GROUPS[passengerGroup]?.multiplier || 1.0;
  const finalPrice = Math.round(basePrice * multiplier);

  return finalPrice < 5 ? 0 : finalPrice;
}

export function formatPrice(value) {
  return value === null || value === undefined ? '–' : `${value} Kč`;
}
