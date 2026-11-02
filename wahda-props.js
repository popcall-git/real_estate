/* Wahda Real Estate — property data + renderer
   六套房源共用一套详情页模板，通过 ?id= 选择。
   数据与首页卡片严格一致：地址 / 价格 / 房卫车位 / 中介 / 看房时间。 */
(function (root) {
  var A = 'assets/wahda/';

  var ICON = {
    mosque: '<path d="M4 21V10l8-6 8 6v11"/><path d="M9 21v-7h6v7"/>',
    grocer: '<path d="M6 3h12l2 4v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7l2-4Z"/><path d="M4 9h16"/>',
    train: '<rect x="5" y="3" width="14" height="14" rx="3"/><path d="M8 21l2-4M16 21l-2-4M5 10h14"/>',
    school: '<path d="M3 21h18M5 21V9l7-5 7 5v12"/><path d="M10 21v-6h4v6"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    pin: '<path d="M3 17l6-6 4 4 7-7"/>'
  };

  var CHECK = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6"><path d="m5 13 4 4L19 7"/></svg>';
  var FACT = {
    bd: '<path d="M3 21h18M5 21V9l7-5 7 5v12"/><path d="M10 21v-6h4v6"/>',
    ba: '<path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3Z"/><path d="M6 12V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v6"/>',
    car: '<path d="M5 17h14l-1.4-5.6a2 2 0 0 0-2-1.4H8.4a2 2 0 0 0-2 1.4L5 17Z"/><circle cx="7.5" cy="18.5" r="1.6"/><circle cx="16.5" cy="18.5" r="1.6"/>'
  };

  var DATA = {

    /* ---------------- 1. Rosella ---------------- */
    rosella: {
      addr: '14 Rosella Street, Armadale VIC 3143',
      short: '14 Rosella Street',
      suburb: 'Armadale', state: 'VIC',
      price: '$1,850,000 – $2,050,000', priceNote: 'Price guide', priceMl: '$1.85M – $2.05M',
      bd: 4, ba: 3, car: 2, area: '612 m²', ptype: 'House',
      saleChip: 'Auction · Saturday 14 November, 11:00 am — onsite',
      subWhen: 'Auction Sat 14 Nov, 11:00 am',
      soi: 'Statement of Information (PDF)',
      tags: [{ t: 'Verified', c: 'verified' }, { t: 'Auction', c: 'auction' }],
      facts: [
        ['Property type', 'House'], ['Land size', '612 m²'], ['Floor area', '262 m² (28 sq)'],
        ['Year built', '2019'], ['Council rates', '$3,180 p.a.'], ['Zoning', 'Neighbourhood Residential']
      ],
      listed: 'Listed 3 days ago · 1,284 views · 41 saves',
      desc: [
        "Behind a quiet, hedge-lined frontage on one of Armadale's leafier streets, this four-bedroom home was built in 2019 and has been kept exactly as it was finished — pale oak floors, stone surfaces, and a rear wall of glass that opens the whole living zone to a north-facing garden.",
        "The plan does the hard work for a family. Two separate living areas mean the children and the adults are not in the same room by 7pm. A ground-floor study sits away from the main traffic and works just as well as a prayer room, with a door that closes. The kitchen has a butler's pantry large enough to keep the benches clear when guests arrive.",
        "Upstairs, the main suite faces north over the garden with a walk-in robe and a full ensuite; the remaining three bedrooms are all genuine doubles with built-in storage, serviced by a central bathroom and a separate powder room downstairs.",
        "Out the back, a covered deck steps onto lawn bordered by native planting — enough garden to be worth having, not so much that it owns your weekends. Double garage with internal access, 6.6 kW of solar, and a 3,000 litre tank plumbed to the garden.",
        "High Street is a four-minute walk for the 6 tram, the cafes and the halal grocer; Armadale station is seven minutes on foot and puts you at Flinders Street in eighteen."
      ],
      feats: {
        internal: ["Ducted reverse-cycle heating &amp; cooling", "Stone kitchen with butler's pantry", 'Two separate living zones', 'Ground-floor study / prayer room', 'European oak floors, double glazing', 'Laundry with external access'],
        external: ['North-facing rear garden', 'Covered alfresco deck', 'Double garage, internal access', '6.6 kW solar, 3,000 L rainwater tank', 'Alarm &amp; video intercom', 'Landscaped native garden']
      },
      insp: {
        rows: [['Sat 7 Nov', '11:00 – 11:30 am', 'Add to calendar'], ['Wed 11 Nov', '5:30 – 6:00 pm', 'Add to calendar'], ['Sat 14 Nov', '10:30 – 10:55 am', 'Add to calendar']],
        auction: ['Sat 14 Nov', '<b>Auction</b> — 11:00 am, onsite', 'Register to bid']
      },
      map: {
        h1: 'WATTLETREE RD', h2: 'MALVERN RD', v1: 'HIGH ST', v2: 'GLENFERRIE RD', sub: 'ROSELLA ST',
        station: 'Armadale Station',
        amen: [[104, 300, 'High St shops', 'end'], [600, 232, 'Prayer room', 'end'], [250, 310, 'Primary school', 'start']],
        pin: [352, 222, '14 Rosella St']
      },
      locSub: 'Armadale, VIC 3143 · City of Stonnington · 7.4 km from the CBD',
      dist: [
        ['mosque', 'Prayer room &amp; mosque', '1.2 km · 3 min drive', true],
        ['grocer', 'Halal grocer &amp; butcher', '450 m · 6 min walk', true],
        ['train', 'Armadale Station', '550 m · 7 min walk', false],
        ['school', 'Armadale Primary School', '750 m · 9 min walk', false],
        ['clock', 'CBD — Flinders Street', '7.4 km · 18 min train', false],
        ['pin', "Lauriston Girls' School", '1.1 km · 13 min walk', false]
      ],
      street: {
        img: A + 'rosella/web/street.jpg', pill: 'Rosella St, Armadale VIC 3143', name: '14 Rosella Street',
        cap: ['Rosella St, looking west', 'Rosella St, looking west', 'Outside 14 Rosella Street', 'Outside 14 Rosella Street', 'Rosella St, looking east', 'Rosella St, looking east']
      },
      costs: {
        sub: 'Estimates for a Victorian principal place of residence, based on the mid-point of the price guide.',
        rows: [
          ['Purchase price', 'Mid-point of $1.85M – $2.05M guide', '$1,950,000'],
          ['VIC land transfer duty', '5.5% — applies above $960,000', '$107,250'],
          ['Legal &amp; conveyancing', '', '~$1,800'],
          ['Building &amp; pest inspection', '', '~$650']
        ],
        total: '$2,059,700',
        note: 'Foreign purchasers also pay 8% additional duty in Victoria — about $156,000 on this price. Figures exclude any first-home concession and rate adjustments at settlement; confirm with your conveyancer.'
      },
      similar: ['pointcook', 'springfield', 'albion'],
      agency: { ini: 'MC', name: 'Morrow &amp; Co.', addr: '1084 High Street, Armadale VIC 3143', aIni: 'MH', aName: 'Mariam Haddad', role: 'Director &amp; Licensed Estate Agent<br>Licence 078421L', phone: '0402 118 774', first: 'Mariam' },
      verify: 'Checked by a human, 30 Oct 2026'
    },

    /* ---------------- 2. Lonsdale ---------------- */
    lonsdale: {
      addr: '2703/18 Lonsdale Street, Melbourne VIC 3000',
      short: '2703/18 Lonsdale Street',
      suburb: 'Melbourne', state: 'VIC',
      price: '$780,000', priceNote: 'Asking price', priceMl: '$780,000',
      bd: 2, ba: 2, car: 1, area: '78 m²', ptype: 'Apartment',
      saleChip: 'For sale · Private treaty',
      subWhen: 'Private treaty',
      soi: 'Statement of Information (PDF)',
      tags: [{ t: 'Apartment', c: '' }],
      facts: [
        ['Property type', 'Apartment'], ['Internal area', '78 m²'], ['Level', '27 of 38'],
        ['Year built', '2021'], ['Council rates', '$1,420 p.a.'], ['Owners corp', '$4,180 p.a.']
      ],
      listed: 'Listed 1 day ago · 412 views · 19 saves',
      desc: [
        "A two-bedroom, two-bathroom apartment on level 27 with both bedrooms on external walls — which sounds like a small thing until you have seen the alternative, where the second bedroom borrows light through a glass partition.",
        "The kitchen is compact but properly specified: stone benches, integrated appliances, and a breakfast bar that takes three stools without blocking the walkway. Living opens to a balcony big enough for a table and two chairs, facing north-east across the rooftops toward the Yarra.",
        "Both bathrooms have windows, rare at this price in the CBD. The second bedroom takes a queen bed with room for a desk. There is one secure car space on a stacker and a storage cage on the same level.",
        "The building has a 24-hour concierge, a residents' gym and a shared rooftop terrace. Tram stops for routes 86 and 96 are at the door, Melbourne Central is a three-minute walk, and the Queen Victoria Market is four minutes the other way.",
        "For an investor: the apartment has been rented at $680 per week to the same tenant since 2022, and the tenant would prefer to stay. That is a gross yield of about 4.5% before costs — the number to check against your own holding costs."
      ],
      feats: {
        internal: ['Two bedrooms on external walls', 'Stone kitchen, integrated appliances', 'Two bathrooms, both with windows', 'Reverse-cycle heating &amp; cooling', 'Built-in robes, mirrored', 'European laundry'],
        external: ['North-east balcony, 9 m²', 'One secure car space (stacker)', 'Storage cage on same level', 'Concierge, gym, rooftop terrace', 'Video intercom &amp; fob access', '6-star energy rating']
      },
      insp: {
        rows: [['Sat 7 Nov', '10:00 – 10:30 am', 'Add to calendar'], ['Sun 8 Nov', '10:30 – 11:00 am', 'Add to calendar'], ['Wed 11 Nov', '5:00 – 5:30 pm', 'Add to calendar']],
        auction: null
      },
      map: {
        h1: 'LITTLE LONSDALE ST', h2: 'LITTLE BOURKE ST', v1: 'ELIZABETH ST', v2: 'SWANSTON ST', sub: 'LONSDALE ST',
        station: 'Melbourne Central',
        amen: [[150, 300, 'QV Market', 'start'], [600, 232, 'Prayer room', 'end'], [330, 310, 'RMIT University', 'start']],
        pin: [352, 222, '18 Lonsdale St']
      },
      locSub: 'Melbourne, VIC 3000 · City of Melbourne · 0.4 km from the CBD grid',
      dist: [
        ['mosque', 'Prayer room (Lonsdale St)', '400 m · 5 min walk', true],
        ['grocer', 'Halal grocer &amp; butcher', '550 m · 7 min walk', true],
        ['train', 'Melbourne Central Station', '210 m · 3 min walk', false],
        ['school', 'RMIT University', '600 m · 8 min walk', false],
        ['clock', 'Flinders Street Station', '1.1 km · 14 min walk', false],
        ['pin', 'Queen Victoria Market', '380 m · 5 min walk', false]
      ],
      street: null,
      costs: {
        sub: 'Estimates for a Victorian principal place of residence at $780,000. Apartments attract duty on the contract price, not the land value.',
        rows: [
          ['Purchase price', '', '$780,000'],
          ['VIC land transfer duty', '$2,870 + 6.0% of the value above $130,000', '$41,870'],
          ['Legal &amp; conveyancing', '', '~$1,650'],
          ['Building &amp; pest inspection', 'Owners corp report recommended instead', '~$600']
        ],
        total: '$824,120',
        note: 'Foreign purchasers also pay 8% additional duty in Victoria — about $62,400 here — plus a land tax surcharge from the following year. First-home buyers may pay reduced duty; check your eligibility with the SRO calculator.'
      },
      similar: ['southbank', 'albion', 'rosella'],
      agency: { ini: 'HV', name: 'Haven Property', addr: '350 Collins Street, Melbourne VIC 3000', aIni: 'DW', aName: 'Daniel Wu', role: 'Senior Sales Consultant<br>Licence 091336L', phone: '0431 552 908', first: 'Daniel' },
      verify: 'Checked by a human, 1 Nov 2026'
    },

    /* ---------------- 3. Albion ---------------- */
    albion: {
      addr: '62 Albion Street, Surry Hills NSW 2010',
      short: '62 Albion Street',
      suburb: 'Surry Hills', state: 'NSW',
      price: '$1,600,000', priceNote: 'Price guide', priceMl: '$1.6M guide',
      bd: 3, ba: 1, car: 1, area: '186 m²', ptype: 'Terrace',
      saleChip: 'Auction · Saturday 14 November, 11:00 am — onsite',
      subWhen: 'Auction Sat 14 Nov, 11:00 am',
      soi: 'Contract of Sale &amp; building report',
      tags: [{ t: 'Auction', c: 'auction' }],
      facts: [
        ['Property type', 'Terrace'], ['Land size', '186 m²'], ['Floor area', '148 m² (16 sq)'],
        ['Year built', 'c.1890'], ['Council rates', '$1,980 p.a.'], ['Zoning', 'R1 General Residential']
      ],
      listed: 'Listed 5 days ago · 2,067 views · 74 saves',
      desc: [
        "A narrow-fronted Victorian terrace on the flat part of Albion Street, two streets back from Crown — which is the part of Surry Hills people actually want, because you can walk to the city and still sleep at night.",
        "The front two rooms keep what matters: 3.4-metre ceilings, original cornices, a working fireplace with its black marble surround, and the arched hallway that tells you the house has not been gutted. Behind that, a 2018 renovation did the unglamorous work properly — rewiring, re-plumbing, new roof, insulation, and a rear extension with a second living area opening to the courtyard.",
        "Three bedrooms upstairs, all with built-in storage; the main takes a king bed. One bathroom, but a large one, with a separate bath and a second toilet tucked into the laundry — the arrangement most terraces of this width end up with anyway.",
        "The courtyard is small and walled, which in practice means it is used every day: a table for six, a lemon tree, and a clothesline at the end. Rear lane access gives you one off-street space, which on this street is worth more than the third bedroom to some buyers.",
        "Central Station is a twelve-minute walk, the light rail on Devonshire is six, and the halal butcher on Cleveland Street is nine. School catchment is Surry Hills Public and Inner Sydney High."
      ],
      feats: {
        internal: ['3.4 m ceilings, original cornice', 'Working fireplace, black marble', '2018 rewiring &amp; re-plumbing', 'Rear extension, second living area', 'Built-in robes to all bedrooms', 'Second toilet in laundry'],
        external: ['Walled sandstone courtyard', 'Rear lane access, one car space', 'New roof &amp; insulation (2018)', 'Gas heating, ceiling fans', 'Security grilles to front windows', 'Walking distance to Central'],
      },
      insp: {
        rows: [['Sat 7 Nov', '11:00 – 11:30 am', 'Add to calendar'], ['Wed 11 Nov', '6:00 – 6:30 pm', 'Add to calendar'], ['Sat 14 Nov', '10:30 – 10:55 am', 'Add to calendar']],
        auction: ['Sat 14 Nov', '<b>Auction</b> — 11:00 am, onsite', 'Register to bid']
      },
      map: {
        h1: 'FOVEAUX ST', h2: 'DEVONSHIRE ST', v1: 'CROWN ST', v2: 'BOURKE ST', sub: 'ALBION ST',
        station: 'Central Station',
        amen: [[150, 300, 'Crown St shops', 'start'], [600, 232, 'Masjid &amp; prayer room', 'end'], [330, 310, 'Surry Hills Public', 'start']],
        pin: [352, 222, '62 Albion St']
      },
      locSub: 'Surry Hills, NSW 2010 · City of Sydney · 1.5 km from the CBD',
      dist: [
        ['mosque', 'Masjid &amp; prayer room', '700 m · 9 min walk', true],
        ['grocer', 'Halal butcher, Cleveland St', '850 m · 11 min walk', true],
        ['train', 'Central Station', '900 m · 12 min walk', false],
        ['school', 'Surry Hills Public School', '500 m · 6 min walk', false],
        ['clock', 'Sydney CBD — Town Hall', '1.5 km · 18 min walk', false],
        ['pin', 'Prince Alfred Park', '650 m · 8 min walk', false]
      ],
      street: {
        img: A + 'albion/web/street.jpg', pill: 'Albion St, Surry Hills NSW 2010', name: '62 Albion Street',
        cap: ['Albion St, looking north', 'Albion St, looking north', 'Outside 62 Albion Street', 'Outside 62 Albion Street', 'Albion St, looking south', 'Albion St, looking south']
      },
      costs: {
        sub: 'Estimates for a New South Wales principal place of residence, based on the auction price guide.',
        rows: [
          ['Purchase price', 'Auction guide', '$1,600,000'],
          ['NSW transfer duty', '$49,069 + 5.5% of the value above $1,212,000', '$70,409'],
          ['Legal &amp; conveyancing', '', '~$1,950'],
          ['Building &amp; pest inspection', 'Strata report not required — freehold', '~$700']
        ],
        total: '$1,673,059',
        note: 'Foreign purchasers pay 9% surcharge purchaser duty in NSW — about $144,000 here — plus an annual land tax surcharge. First-home buyer concessions cut off well below this price.'
      },
      similar: ['rosella', 'pointcook', 'lonsdale'],
      agency: { ini: 'SB', name: 'Southbank Realty', addr: '12 Crown Street, Surry Hills NSW 2010', aIni: 'AR', aName: 'Amelia Rossi', role: 'Principal &amp; Licensed Agent<br>Licence 10045231', phone: '0416 220 887', first: 'Amelia' },
      verify: 'Checked by a human, 31 Oct 2026'
    },

    /* ---------------- 4. Southbank ---------------- */
    southbank: {
      addr: 'PH2, 9 Riverside Quay, Southbank VIC 3006',
      short: 'PH2, 9 Riverside Quay',
      suburb: 'Southbank', state: 'VIC',
      price: '$3,200,000', priceNote: 'Private sale', priceMl: '$3,200,000',
      bd: 3, ba: 3, car: 2, area: '214 m²', ptype: 'Penthouse',
      saleChip: 'Private sale · Expressions of interest close 26 November',
      subWhen: 'EOI closes 26 Nov',
      soi: 'Statement of Information (PDF)',
      tags: [{ t: 'Premium', c: 'premium' }, { t: 'Penthouse', c: '' }],
      facts: [
        ['Property type', 'Penthouse'], ['Internal area', '214 m²'], ['Terrace', '46 m²'],
        ['Year built', '2016'], ['Council rates', '$3,620 p.a.'], ['Owners corp', '$12,840 p.a.']
      ],
      listed: 'Listed 8 days ago · 3,410 views · 96 saves',
      desc: [
        "The top floor of a 2016 building on Riverside Quay, bought off the plan by the current owner and never rented. Two apartments were combined during construction, which is why the living room is 9 metres wide and the glazing runs the full southern wall.",
        "From the living room you get the whole postcard: the Yarra, the CBD towers, and the Arts Centre spire lit at night. The terrace wraps the corner and takes a dining table for eight without anyone's chair backing onto the glass.",
        "Three bedrooms, all with ensuites, plus a powder room. The main suite has a walk-in robe, a book-matched marble bathroom with a bath set into the window, and a private slice of terrace. A study off the entry is big enough to be a fourth bedroom if you close it in.",
        "The building runs a concierge from 7am to 10pm, two lifts to the penthouse level, and two side-by-side car spaces with a storage cage. Owners corp is $12,840 a year — high, and worth asking about: it covers the facade maintenance programme and the pool, which is why the building still looks new at ten years old.",
        "Walk to Flinders Street in eight minutes, the NGV in six, and the prayer room on Dorcas Street in ten. This is not a family house and is not priced as one; it is for someone who wants the view, the lock-up-and-leave, and the address."
      ],
      feats: {
        internal: ['9 m wide living, full-height glazing', 'Three bedrooms, all ensuite', 'Book-matched marble bathrooms', 'Study / optional fourth bedroom', 'Wine store, 120 bottles', 'Zoned reverse-cycle air'],
        external: ['46 m² wraparound terrace', 'Two side-by-side car spaces', 'Storage cage, level B2', 'Concierge 7am–10pm, pool, gym', 'Two lifts to penthouse level', 'Facade maintenance programme']
      },
      insp: {
        rows: [],
        auction: null,
        private: 'Private viewings only — by appointment, seven days'
      },
      map: {
        h1: 'FLINDERS ST', h2: 'SOUTHBANK BLVD', v1: 'QUEENS BRIDGE ST', v2: 'CITY RD', sub: 'RIVERSIDE QUAY',
        station: 'Flinders Street Station',
        amen: [[150, 300, 'Crown dining precinct', 'start'], [600, 232, 'Prayer room', 'end'], [330, 310, 'NGV International', 'start']],
        pin: [352, 222, '9 Riverside Quay']
      },
      locSub: 'Southbank, VIC 3006 · City of Melbourne · 1.0 km from the CBD',
      dist: [
        ['mosque', 'Prayer room, Dorcas Street', '900 m · 11 min walk', true],
        ['grocer', 'Halal grocer &amp; butcher', '1.2 km · 15 min walk', true],
        ['train', 'Flinders Street Station', '650 m · 8 min walk', false],
        ['school', 'NGV International', '450 m · 6 min walk', false],
        ['clock', 'Melbourne CBD', '1.0 km · 12 min walk', false],
        ['pin', 'South Melbourne Market', '1.5 km · 18 min walk', false]
      ],
      street: null,
      costs: {
        sub: 'Estimates for a Victorian principal place of residence. The mid-point is the asking price — this is a private sale, not an auction.',
        rows: [
          ['Purchase price', 'Asking price', '$3,200,000'],
          ['VIC land transfer duty', '$110,000 + 6.5% of the value above $2,000,000', '$188,000'],
          ['Legal &amp; conveyancing', 'Penthouse contract review', '~$2,400'],
          ['Building &amp; pest inspection', 'Owners corp report recommended instead', '~$750']
        ],
        total: '$3,391,150',
        note: 'Foreign purchasers also pay 8% additional duty in Victoria — about $256,000 here. The owners corp levy of $12,840 p.a. is a real holding cost; ask for the last three years of minutes and the sinking fund balance.'
      },
      similar: ['lonsdale', 'rosella', 'springfield'],
      agency: { ini: 'AR', name: 'Ark Residences', addr: '9 Riverside Quay, Southbank VIC 3006', aIni: 'JC', aName: 'Julian Cheung', role: 'Associate Director<br>Licence 088902L', phone: '0450 337 216', first: 'Julian' },
      verify: 'Checked by a human, 28 Oct 2026'
    },

    /* ---------------- 5. Springfield ---------------- */
    springfield: {
      addr: '18 Sinnathamby Boulevard, Springfield QLD 4300',
      short: '18 Sinnathamby Boulevard',
      suburb: 'Springfield Central', state: 'QLD',
      price: '$1,120,000', priceNote: 'Offers over', priceMl: '$1.12M',
      bd: 4, ba: 2, car: 2, area: '540 m²', ptype: 'House',
      saleChip: 'For sale · Offers over $1,120,000',
      subWhen: 'Offers over $1.12M',
      soi: 'Form 6 disclosure statement (PDF)',
      tags: [{ t: 'Verified', c: 'verified' }],
      facts: [
        ['Property type', 'House'], ['Land size', '540 m²'], ['Floor area', '218 m² (23 sq)'],
        ['Year built', '2017'], ['Council rates', '$2,850 p.a.'], ['Zoning', 'Low density residential']
      ],
      listed: 'Listed 4 days ago · 1,102 views · 38 saves',
      desc: [
        "A two-storey, four-bedroom house on the boulevard side of Springfield Central, built in 2017 and still under its structural warranty until next year. Cream render, arched screening to the front, and a pool in the back — the finish level is a step above what most of the estate delivered.",
        "Downstairs is one continuous space: kitchen with a walk-in pantry and a 3-metre island, dining, and a living room that opens through stacker doors to the alfresco. There is a fifth room off the entry currently used as a study, which is where a prayer room naturally goes — it is away from the living area and has a door.",
        "Upstairs, the main suite runs the full width with a balcony, walk-in robe and a double-vanity ensuite. Three more bedrooms take queen beds; the family bathroom has a separate bath and a second toilet.",
        "The pool is 8 by 4 metres with a glass fence and a heat pump, so it is usable from September rather than December. The yard is flat, fully fenced, and small enough to maintain in twenty minutes.",
        "Springfield Central station is a six-minute drive for the 40-minute run to Brisbane Central; the Mater and the new hospital precinct are ten minutes. Orion shopping centre, the mosque on Springfield Greenbank Arterial and the Islamic college are all inside a five-kilometre radius — which is the reason most buyers look at this suburb in the first place."
      ],
      feats: {
        internal: ['4 bedrooms + study / prayer room', 'Walk-in pantry, 3 m island', 'Main suite with balcony &amp; WIR', 'Ducted air, ceiling fans throughout', 'Fifth room with door, off entry', 'Double remote garage, internal access'],
        external: ['8 × 4 m pool, heat pump', 'Glass pool fence, flat lawn', 'Covered alfresco, stacker doors', 'Fully fenced 540 m² block', '6.5 kW solar', 'Built 2017, structural warranty']
      },
      insp: {
        rows: [['Sat 7 Nov', '9:00 – 9:30 am', 'Add to calendar'], ['Sat 14 Nov', '9:00 – 9:30 am', 'Add to calendar']],
        auction: null
      },
      map: {
        h1: 'CENTENARY HWY', h2: 'SPRINGFIELD PKWY', v1: 'COMMERCIAL DR', v2: 'MAIN ST', sub: 'SINNATHAMBY BLVD',
        station: 'Springfield Central',
        amen: [[150, 300, 'Orion Shopping Centre', 'start'], [600, 232, 'Mosque &amp; prayer room', 'end'], [330, 310, 'Springfield Central SS', 'start']],
        pin: [352, 222, '18 Sinnathamby']
      },
      locSub: 'Springfield Central, QLD 4300 · City of Ipswich · 26 km from the Brisbane CBD',
      dist: [
        ['mosque', 'Mosque &amp; prayer room', '1.4 km · 4 min drive', true],
        ['grocer', 'Halal grocer &amp; butcher', '900 m · 11 min walk', true],
        ['train', 'Springfield Central Station', '1.8 km · 6 min drive', false],
        ['school', 'Springfield Central State School', '950 m · 12 min walk', false],
        ['clock', 'Brisbane CBD', '26 km · 40 min train', false],
        ['pin', 'Mater Private Hospital', '2.6 km · 7 min drive', false]
      ],
      street: null,
      costs: {
        sub: 'Estimates for a Queensland principal place of residence, based on the offers-over price.',
        rows: [
          ['Purchase price', 'Offers over', '$1,120,000'],
          ['QLD transfer duty', '$38,025 + 5.75% of the value above $1,000,000', '$44,925'],
          ['Legal &amp; conveyancing', '', '~$1,500'],
          ['Building &amp; pest inspection', 'Pool safety certificate included', '~$600']
        ],
        total: '$1,167,025',
        note: 'Foreign purchasers pay 8% additional foreign acquirer duty in Queensland — about $89,600 here — and cannot buy established dwellings without FIRB approval. Queensland duty is materially lower than Victoria or NSW at this price.'
      },
      similar: ['pointcook', 'rosella', 'albion'],
      agency: { ini: 'WQ', name: 'Wahda QLD', addr: '4 Orion Drive, Springfield Central QLD 4300', aIni: 'AR', aName: 'Aisha Rahman', role: 'Sales Agent<br>Licence 4561237', phone: '0433 908 214', first: 'Aisha' },
      verify: 'Checked by a human, 1 Nov 2026'
    },

    /* ---------------- 6. Point Cook ---------------- */
    pointcook: {
      addr: '38 Kestrel Drive, Point Cook VIC 3030',
      short: '38 Kestrel Drive',
      suburb: 'Point Cook', state: 'VIC',
      price: '$720,000', priceNote: 'Asking price', priceMl: '$720,000',
      bd: 3, ba: 2, car: 2, area: '448 m²', ptype: 'House',
      saleChip: 'For sale · Private treaty',
      subWhen: 'Private treaty',
      soi: 'Statement of Information (PDF)',
      tags: [{ t: 'New', c: '' }],
      facts: [
        ['Property type', 'House'], ['Land size', '448 m²'], ['Floor area', '176 m² (19 sq)'],
        ['Year built', '2012'], ['Council rates', '$2,120 p.a.'], ['Zoning', 'General Residential']
      ],
      listed: 'Listed 2 days ago · 688 views · 27 saves',
      desc: [
        "A single-storey, three-bedroom house on a quiet street in the older part of Point Cook — the part with mature trees and established front gardens, not the part still waiting for the landscaping to grow.",
        "The layout is the standard family plan done well: main bedroom at the front with a walk-in robe and ensuite, two more bedrooms with built-ins down a separate hallway, and an open kitchen-living-dining at the back that opens to a paved patio.",
        "Kitchen has a breakfast bar, a 900 mm cooktop, and a pantry that is a pantry rather than a cupboard. Floors are tile through the traffic areas and carpet in the bedrooms — original, but in good condition.",
        "Ducted heating and evaporative cooling, a double garage with drive-through rear access, and a 3 by 3 metre shed. The backyard is small, flat, and fully fenced, with a Hills hoist and enough lawn for a trampoline.",
        "Point Cook South P-9 is an 800-metre walk and the Islamic college on Boardwalk Boulevard is a five-minute drive. Williams Landing station is 2.4 km for the 32-minute run to the city, and the Princes Freeway on-ramp is four minutes away when you would rather drive.",
        "At $720,000 this is priced for a first home rather than a trade-up. Comparable three-bedroom houses in the estate have sold between $695,000 and $755,000 in the last six months."
      ],
      feats: {
        internal: ['Main bedroom with WIR &amp; ensuite', 'Two further bedrooms, built-ins', '900 mm cooktop, breakfast bar', 'Ducted heating, evaporative cooling', 'Tile living, carpeted bedrooms', 'Separate laundry with external door'],
        external: ['Paved patio, under-roof', 'Double garage, drive-through access', '3 × 3 m garden shed', 'Fully fenced 448 m² block', 'Hills hoist, flat lawn', 'Established street trees']
      },
      insp: {
        rows: [['Sat 7 Nov', '12:30 – 1:00 pm', 'Add to calendar'], ['Sat 14 Nov', '12:30 – 1:00 pm', 'Add to calendar']],
        auction: null
      },
      map: {
        h1: 'POINT COOK RD', h2: 'SNEYDES RD', v1: 'BOARDWALK BLVD', v2: 'PALMERS RD', sub: 'KESTREL DR',
        station: 'Williams Landing',
        amen: [[150, 300, 'Point Cook Town Centre', 'start'], [600, 232, 'Prayer room', 'end'], [330, 310, 'Point Cook P-9 College', 'start']],
        pin: [352, 222, '38 Kestrel Dr']
      },
      locSub: 'Point Cook, VIC 3030 · City of Wyndham · 22 km from the CBD',
      dist: [
        ['mosque', 'Prayer room &amp; musalla', '1.1 km · 3 min drive', true],
        ['grocer', 'Halal grocer &amp; butcher', '1.6 km · 5 min drive', true],
        ['train', 'Williams Landing Station', '2.4 km · 6 min drive', false],
        ['school', 'Point Cook P-9 College', '800 m · 10 min walk', false],
        ['clock', 'Melbourne CBD', '22 km · 32 min train', false],
        ['pin', 'Sanctuary Lakes shopping', '1.2 km · 15 min walk', false]
      ],
      street: {
        img: A + 'pointcook/web/street.jpg', pill: 'Kestrel Dr, Point Cook VIC 3030', name: '38 Kestrel Drive',
        cap: ['Kestrel Dr, looking west', 'Kestrel Dr, looking west', 'Outside 38 Kestrel Drive', 'Outside 38 Kestrel Drive', 'Kestrel Dr, looking east', 'Kestrel Dr, looking east']
      },
      costs: {
        sub: 'Estimates for a Victorian principal place of residence. At this price the duty drops sharply because the tier below $960,000 applies.',
        rows: [
          ['Purchase price', 'Asking price', '$720,000'],
          ['VIC land transfer duty', '$2,870 + 6.0% of the value above $130,000', '$38,270'],
          ['Legal &amp; conveyancing', '', '~$1,500'],
          ['Building &amp; pest inspection', '', '~$550']
        ],
        total: '$760,320',
        note: 'First-home buyers in Victoria may pay reduced or nil duty at this price — check the SRO calculator before you assume the $38,270 above. Foreign purchasers pay 8% additional duty, about $57,600.'
      },
      similar: ['springfield', 'rosella', 'lonsdale'],
      agency: { ini: 'MC', name: 'Morrow &amp; Co.', addr: '1084 High Street, Armadale VIC 3143', aIni: 'NF', aName: 'Nadia Farah', role: 'Sales Consultant<br>Licence 092771L', phone: '0421 776 330', first: 'Nadia' },
      verify: 'Checked by a human, 1 Nov 2026'
    }
  };

  var ORDER = ['rosella', 'lonsdale', 'albion', 'southbank', 'springfield', 'pointcook'];

  /* ---------- helpers ---------- */
  function el(s) { var d = document.createElement('div'); d.innerHTML = s; return d.firstChild; }
  function blockByTitle(t) {
    var bs = document.querySelectorAll('.block');
    for (var i = 0; i < bs.length; i++) {
      var h = bs[i].querySelector('h2');
      if (h && h.textContent.replace(/\s+/g, ' ').trim() === t) return bs[i];
    }
    return null;
  }

  function photosFor(id) {
    var d = DATA[id], w = A + id + '/web/';
    if (id === 'rosella') return [
      { src: w + 'exterior.jpg', alt: 'Front of 14 Rosella Street, Armadale' },
      { src: w + 'street.jpg', alt: 'Street view from the opposite footpath' },
      { src: w + 'kitchen.jpg', alt: 'Kitchen with stone island' },
      { src: w + 'living.jpg', alt: 'Open plan living and dining' },
      { src: w + 'garden.jpg', alt: 'Rear garden and deck' },
      { src: w + 'bedroom.jpg', alt: 'Main bedroom' },
      { src: w + 'bathroom.jpg', alt: 'Main bathroom' }
    ];
    var map = {
      lonsdale: [['cover', 'Living room with skyline view'], ['kitchen', 'Kitchen with stone benchtop'], ['bedroom', 'Main bedroom with built-in robe'], ['view', 'Balcony outlook over the city']],
      albion: [['cover', 'Front of the terrace from Albion Street'], ['street', 'Street view from the opposite footpath'], ['living', 'Living room with original fireplace'], ['courtyard', 'Walled rear courtyard']],
      southbank: [['cover', 'Terrace at dusk'], ['living', 'Living room with full-height glazing'], ['bedroom', 'Main bedroom at dusk'], ['bathroom', 'Ensuite with marble and freestanding bath']],
      springfield: [['cover', 'Front of the house with pool'], ['kitchen', 'Kitchen and dining'], ['living', 'Family living room'], ['garden', 'Backyard lawn and alfresco']],
      pointcook: [['cover', 'Front of the house from the street'], ['street', 'Street view from the opposite footpath'], ['kitchen', 'Kitchen with breakfast bar'], ['garden', 'Rear patio and lawn']]
    };
    return (map[id] || []).map(function (p) { return { src: w + p[0] + '.jpg', alt: p[1] }; });
  }

  function mapSvg(m) {
    var amb = '';
    m.amen.forEach(function (a) {
      var anchor = a[3], tx = anchor === 'end' ? a[0] - 12 : a[0] + 12;
      amb += '<circle cx="' + a[0] + '" cy="' + a[1] + '" r="5" fill="#B08A3E"/>' +
        '<text x="' + tx + '" y="' + (a[1] + 4) + '" font-family="Plus Jakarta Sans,sans-serif" font-size="9.5" fill="#6E6656" text-anchor="' + anchor + '">' + a[2] + '</text>';
    });
    var px = m.pin[0], py = m.pin[1];
    var boxW = Math.max(96, m.pin[2].length * 6.6 + 18);
    return '' +
      '<svg viewBox="0 0 760 420" role="img" aria-label="Indicative map of the streets around ' + m.pin[2] + '">' +
      '<rect width="760" height="420" fill="#EDE6D6"/>' +
      '<rect x="488" y="148" width="148" height="52" rx="5" fill="#D7E3CF"/>' +
      '<text x="562" y="180" font-family="Plus Jakarta Sans,sans-serif" font-size="9.5" fill="#5F7357" text-anchor="middle" letter-spacing=".08em">PARK</text>' +
      '<path d="M178 0V420" stroke="#E3DAC6" stroke-width="18"/>' +
      '<path d="M178 0V420" stroke="#B9AD94" stroke-width="2" stroke-dasharray="7 7"/>' +
      '<g stroke-linecap="butt">' +
      '<path d="M0 56H760" stroke="#DFD4BD" stroke-width="26"/><path d="M0 56H760" stroke="#FDFAF2" stroke-width="22"/>' +
      '<path d="M0 360H760" stroke="#DFD4BD" stroke-width="28"/><path d="M0 360H760" stroke="#FDFAF2" stroke-width="24"/>' +
      '<path d="M104 0V420" stroke="#DFD4BD" stroke-width="36"/><path d="M104 0V420" stroke="#FDFAF2" stroke-width="32"/>' +
      '<path d="M654 0V420" stroke="#DFD4BD" stroke-width="30"/><path d="M654 0V420" stroke="#FDFAF2" stroke-width="26"/>' +
      '</g>' +
      '<g stroke="#FAF5E7">' +
      '<path d="M0 138H760" stroke-width="11"/><path d="M0 208H760" stroke-width="13"/><path d="M0 278H760" stroke-width="11"/>' +
      '<path d="M306 0V420" stroke-width="11"/><path d="M474 0V420" stroke-width="11"/>' +
      '</g>' +
      '<circle cx="178" cy="240" r="6" fill="#fff" stroke="#0C4A3C" stroke-width="2.4"/>' +
      '<text x="192" y="244" font-family="Plus Jakarta Sans,sans-serif" font-size="10" fill="#3B463F" font-weight="600">' + m.station + '</text>' +
      '<text x="330" y="51" font-family="Plus Jakarta Sans,sans-serif" font-size="9.5" fill="#8A8272" text-anchor="middle">' + m.h1 + '</text>' +
      '<text x="330" y="365" font-family="Plus Jakarta Sans,sans-serif" font-size="9.5" fill="#8A8272" text-anchor="middle">' + m.h2 + '</text>' +
      '<text x="104" y="150" font-family="Plus Jakarta Sans,sans-serif" font-size="9.5" fill="#8A8272" text-anchor="middle" transform="rotate(-90 104 150)">' + m.v1 + '</text>' +
      '<text x="654" y="290" font-family="Plus Jakarta Sans,sans-serif" font-size="9.5" fill="#8A8272" text-anchor="middle" transform="rotate(-90 654 290)">' + m.v2 + '</text>' +
      '<text x="30" y="204" font-family="Plus Jakarta Sans,sans-serif" font-size="9" fill="#9A9282" letter-spacing=".04em">' + m.sub + '</text>' +
      '<g>' + amb + '</g>' +
      '<g>' +
      '<circle cx="' + px + '" cy="' + py + '" r="26" fill="rgba(12,74,60,.10)"/>' +
      '<circle cx="' + px + '" cy="' + py + '" r="15" fill="rgba(12,74,60,.16)"/>' +
      '<path d="M' + px + ' ' + (py - 17) + 'c-7.2 0-13 5.8-13 13 0 9.3 13 21 13 21s13-11.7 13-21c0-7.2-5.8-13-13-13Z" fill="#0C4A3C"/>' +
      '<circle cx="' + px + '" cy="' + (py - 4) + '" r="4.6" fill="#fff"/>' +
      '<rect x="' + (px + 18) + '" y="' + (py - 11) + '" width="' + boxW + '" height="22" rx="6" fill="#fff" opacity=".96"/>' +
      '<text x="' + (px + 26) + '" y="' + (py + 4) + '" font-family="Plus Jakarta Sans,sans-serif" font-size="10.5" fill="#0C4A3C" font-weight="700">' + m.pin[2] + '</text>' +
      '</g>' +
      '<g transform="translate(46,58)"><circle r="15" fill="#fff" opacity=".92"/><path d="M0 -9l4.5 12L0 7.5-4.5 3Z" fill="#0C4A3C"/>' +
      '<text y="-19" font-family="Plus Jakarta Sans,sans-serif" font-size="8.5" fill="#8A8272" text-anchor="middle" font-weight="700">N</text></g>' +
      '<g transform="translate(660,400)"><line x1="0" y1="0" x2="88" y2="0" stroke="#8A8272" stroke-width="1.6"/>' +
      '<line x1="0" y1="-4" x2="0" y2="4" stroke="#8A8272" stroke-width="1.6"/>' +
      '<line x1="88" y1="-4" x2="88" y2="4" stroke="#8A8272" stroke-width="1.6"/>' +
      '<text x="44" y="-8" font-family="Plus Jakarta Sans,sans-serif" font-size="8.5" fill="#8A8272" text-anchor="middle">200 m</text></g>' +
      '</svg>';
  }

  /* ---------- renderer ---------- */
  function render(P) {
    var photos = P.photos, n = photos.length;

    document.title = P.addr + ' — Wahda Real Estate';
    var og = document.querySelector('meta[property="og:title"]');
    if (og) og.setAttribute('content', P.addr + ' — Wahda Real Estate');

    /* breadcrumb */
    var cr = document.querySelectorAll('.crumbs a');
    if (cr[2]) cr[2].textContent = P.state;
    if (cr[3]) cr[3].textContent = P.suburb;
    var cur = document.querySelector('.crumbs .cur');
    if (cur) cur.textContent = P.short;

    /* photo tab count */
    var ptn = document.querySelector('.pg-tab .n');
    if (ptn) ptn.textContent = n;

    /* gallery：5 张时填满 3 列×2 行；只有 4 张时第 4 格横跨右侧两列 */
    var g = document.getElementById('gallery');
    if (g) {
      var slots = Math.min(n, 5);
      g.className = 'gallery' + (slots === 4 ? ' four' : '');
      var tags = P.tags.map(function (t) {
        return '<span class="tag ' + (t.c || '') + '">' + t.t + '</span>';
      }).join('');
      var html = '';
      photos.slice(0, slots).forEach(function (ph, i) {
        if (i === 0) {
          html += '<div class="gi big" data-i="0">' +
            '<img src="' + ph.src + '" alt="' + ph.alt + '">' +
            '<div class="tags">' + tags + '</div>' +
            '<div class="g-actions">' +
            '<button class="gbtn save" aria-label="Save property"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l8.8 8.8 8.8-8.8a5.5 5.5 0 0 0 0-7.8Z"/></svg></button>' +
            '<button class="gbtn" aria-label="Share"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7"/><path d="M16 6l-4-4-4 4M12 2v14"/></svg></button>' +
            '</div>' +
            '<span class="g-count">1 / ' + n + '</span>' +
            '<button class="g-all"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><rect x="3" y="3" width="7" height="7" rx="1.4"/><rect x="14" y="3" width="7" height="7" rx="1.4"/><rect x="3" y="14" width="7" height="7" rx="1.4"/><rect x="14" y="14" width="7" height="7" rx="1.4"/></svg> View all ' + n + ' photos</button>' +
            '</div>';
        } else {
          html += '<div class="gi" data-i="' + i + '"><img src="' + ph.src + '" alt="' + ph.alt + '"></div>';
        }
      });
      g.innerHTML = html;
    }

    /* head */
    var pb = document.querySelector('.price-big'); if (pb) pb.textContent = P.price;
    var pn = document.querySelector('.price-note'); if (pn) pn.textContent = P.priceNote;
    var h1 = document.querySelector('#pHead h1'); if (h1) h1.textContent = P.addr;

    var fl = document.querySelector('.factline');
    if (fl) {
      function ico(k) { return '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7">' + FACT[k] + '</svg> '; }
      fl.innerHTML =
        '<span>' + ico('bd') + P.bd + '</span><i></i>' +
        '<span>' + ico('ba') + P.ba + '</span><i></i>' +
        '<span>' + ico('car') + P.car + '</span><i></i>' +
        '<span>' + P.area + '</span><i></i>' +
        '<span>' + P.ptype + '</span>';
    }

    var sc = document.querySelector('.sale-chip');
    if (sc) sc.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 3h12l3 6-9 12L3 9l3-6Z"/></svg> ' + P.saleChip;
    var soi = document.querySelector('.soi');
    if (soi) soi.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z"/><path d="M14 3v5h5"/></svg> ' + P.soi;

    /* facts */
    var fg = document.querySelector('.facts');
    if (fg) fg.innerHTML = P.facts.map(function (f) {
      return '<div class="fact"><div class="k">' + f[0] + '</div><div class="v">' + f[1] + '</div></div>';
    }).join('');

    /* description */
    var ds = blockByTitle('About this property').querySelector('.h-sub');
    if (ds) ds.textContent = P.listed;
    var de = document.getElementById('desc');
    if (de) {
      de.innerHTML = P.desc.map(function (p, i) {
        return '<p' + (i > 1 ? ' class="extra"' : '') + '>' + p + '</p>';
      }).join('');
      de.classList.remove('open');
    }
    var rm = document.getElementById('readMore');
    if (rm) rm.childNodes[0].textContent = 'Read more ';

    /* features */
    var fc = document.querySelector('.feat-cols');
    if (fc) {
      function col(title, arr) {
        return '<div><h4>' + title + '</h4><ul>' + arr.map(function (x) {
          return '<li>' + CHECK + ' ' + x + '</li>';
        }).join('') + '</ul></div>';
      }
      fc.innerHTML = col('Internal', P.feats.internal) + col('External', P.feats.external);
    }

    /* inspections */
    var ic = document.querySelector('.insp-card');
    if (ic) {
      var rows = '';
      if (P.insp.rows.length) {
        P.insp.rows.forEach(function (r) {
          rows += '<div class="insp-row"><span class="day">' + r[0] + '</span><span class="time">' + r[1] + '</span><a class="act" href="#">' + r[2] + '</a></div>';
        });
      } else if (P.insp.private) {
        rows += '<div class="insp-row"><span class="day">By appointment</span><span class="time">' + P.insp.private + '</span><a class="act" href="#enquire">Request a time</a></div>';
      }
      if (P.insp.auction) {
        rows += '<div class="insp-row auction"><span class="day">' + P.insp.auction[0] + '</span><span class="time">' + P.insp.auction[1] + '</span><a class="act" href="#">' + P.insp.auction[2] + '</a></div>';
      }
      ic.innerHTML = rows;
    }
    var ih = blockByTitle('Inspections').querySelector('.h-sub');
    if (ih) ih.textContent = P.insp.rows.length
      ? 'No registration needed — just turn up. Photo ID may be requested onsite.'
      : 'This one is not open for advertised inspections. Request a private time with the agent.';

    /* location */
    var lm = blockByTitle('Location');
    var lsub = lm.querySelector('.h-sub');
    if (lsub) lsub.textContent = P.locSub;
    var svgOld = lm.querySelector('.mapwrap svg');
    if (svgOld) svgOld.outerHTML = mapSvg(P.map);
    var dl = lm.querySelector('.dist');
    if (dl) {
      dl.innerHTML = P.dist.map(function (d) {
        return '<div' + (d[3] ? ' class="hi"' : '') + '><span class="ic"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">' + ICON[d[0]] + '</svg></span><span class="nm">' + d[1] + '</span><span class="far">' + d[2] + '</span></div>';
      }).join('');
    }

    /* street view */
    var sb = blockByTitle('Street view');
    if (sb) {
      if (!P.street) {
        sb.style.display = 'none';
      } else {
        var si = document.getElementById('streetImg');
        if (si) { si.src = P.street.img; si.alt = 'Street-level view of ' + P.addr + ' from the opposite footpath'; }
        var pill = document.querySelector('.addr-pill');
        if (pill) pill.textContent = P.street.pill;
        var sa = document.getElementById('svAddr');
        if (sa) sa.textContent = P.street.name;
      }
    }

    /* costs */
    var cb = blockByTitle('What it costs to buy');
    if (cb) {
      var csub = cb.querySelector('.h-sub'); if (csub) csub.textContent = P.costs.sub;
      var cr2 = cb.querySelector('.costs');
      if (cr2) {
        cr2.innerHTML = P.costs.rows.map(function (r) {
          return '<div class="cost-row"><span class="k">' + r[0] + (r[1] ? '<small>' + r[1] + '</small>' : '') + '</span><span class="v">' + r[2] + '</span></div>';
        }).join('') + '<div class="cost-row tot"><span class="k">Estimated upfront total</span><span class="v">' + P.costs.total + '</span></div>';
      }
      var cn = cb.querySelector('.note'); if (cn) cn.innerHTML = P.costs.note;
    }

    /* similar */
    var sm = blockByTitle('Similar properties');
    if (sm && P.similar) {
      var grid = sm.querySelector('.sim');
      if (grid) {
        grid.innerHTML = P.similar.map(function (id) {
          var o = DATA[id];
          /* 相似卡片只放短价，价格区间用 M 记法，避免撑高卡片 */
          var priceHtml = /auction/i.test(o.saleChip) && !/\$/.test(o.price)
            ? 'Auction<small>' + o.subWhen.replace('Auction ', '') + '</small>'
            : o.priceMl;
          return '<a class="card" href="wahda-property.html?id=' + id + '">' +
            '<div class="ph"><img src="' + A + id + '/web/cover.jpg" alt="' + o.short + ', ' + o.suburb + '"></div>' +
            '<div class="body">' +
            '<div class="price">' + priceHtml + '</div>' +
            '<div class="addr">' + o.addr + '</div>' +
            '<div class="meta"><span>' + o.bd + ' bd</span><span>' + o.ba + ' ba</span><span>' + o.car + ' car</span><span>' + o.area + '</span></div>' +
            '</div></a>';
        }).join('');
      }
      var sh = sm.querySelector('.h-sub');
      if (sh) sh.textContent = 'Matched on ' + P.ptype.toLowerCase() + ' or price band. Every listing below is live on Wahda.';
    }

    /* rail: agency */
    var ag = document.querySelector('.rail-card .agency');
    if (ag) {
      ag.querySelector('.logo').textContent = P.agency.ini;
      ag.querySelector('.nm').innerHTML = P.agency.name;
      ag.querySelector('.sub').textContent = P.agency.addr;
    }
    var pe = document.querySelector('.rail-card .person');
    if (pe) {
      pe.querySelector('.ava').textContent = P.agency.aIni;
      pe.querySelector('.nm').textContent = P.agency.aName;
      pe.querySelector('.role').innerHTML = P.agency.role;
    }

    /* form copy */
    var fs = document.querySelector('.form-sec .s');
    if (fs) fs.innerHTML = 'Your details go to ' + P.agency.name + ' only — never sold on.';
    var ta = document.getElementById('m');
    if (ta) {
      ta.value = 'Hi ' + P.agency.first + ', is ' + P.short + ' still available' +
        (P.insp.rows.length ? ' for inspection this Saturday?' : ' to view privately?');
    }
    var th = document.querySelector('#thanks p');
    if (th) th.textContent = P.agency.first + ' usually replies within two hours during business days. A copy has been emailed to you.';
    var vf = document.querySelector('.verify b');
    if (vf) vf.textContent = P.verify;

    /* sticky sub bar */
    var sa2 = document.querySelector('.subbar .addr'); if (sa2) sa2.textContent = P.addr;
    var sp = document.querySelector('.subbar .pr'); if (sp) sp.textContent = P.priceMl;
    var sw = document.querySelectorAll('.subbar .in > span')[1]; if (sw) sw.textContent = P.subWhen;
  }

  function get() {
    var q = (root.location.search.match(/[?&]id=([^&]+)/) || [])[1];
    var id = q && DATA[q] ? q : 'rosella';
    var P = JSON.parse(JSON.stringify(DATA[id]));
    P.id = id;
    P.photos = photosFor(id);
    return P;
  }

  root.WAHDA = { get: get, render: render, data: DATA, order: ORDER };
})(window);
