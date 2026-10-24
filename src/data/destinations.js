// Single source for every destination on the site: the home page section,
// Tour Packages, the Destination list and the /destinations/<slug> pages.
//
// Order inside each region list = popularity rank. The first 7 show on the
// home page (first 5 on phones). Covers and place photos live under
// /public/destinations/<slug>/ — `cover.webp` (~1920px) and one
// `<place-slug>.webp` (~800px) per place. Missing photos fall back to a
// gold placeholder, so entries can go live before their photos arrive.
//
// priceFrom: null shows "Price on request".

import destAbuDhabi from '../assets/images/dest-abu-dhabi.avif'
import destVietnam from '../assets/images/dest-vietnam.webp'
import destSriLanka from '../assets/images/dest-sri-lanka.jpg'
import destFinland from '../assets/images/dest-finland.webp'
import destSwitzerland from '../assets/images/dest-switzerland.webp'

import pkgBali from '../assets/images/pkg-bali.jpeg'
import pkgAbuDhabi from '../assets/images/pkg-abu-dhabi.jpeg'
import pkgSingapore from '../assets/images/pkg-singapore.jpg'
import pkgThailand from '../assets/images/pkg-thailand.jpeg'
import pkgPhuket from '../assets/images/pkg-phuket.jpeg'
import pkgSeychelles from '../assets/images/pkg-seychelles.jpeg'
import pkgSouthKorea from '../assets/images/pkg-south-korea.jpg'

export const REGIONS = [
  { id: 'international', label: 'International' },
  { id: 'domestic', label: 'Domestic' },
]

export const HOME_COUNT = 7
export const HOME_COUNT_PHONE = 5

const place = (name, city, blurb) => ({ name, city, blurb })

const international = [
  {
    slug: 'uae',
    country: 'UAE',
    place: 'Dubai & Abu Dhabi',
    cover: destAbuDhabi,
    duration: { days: 5, nights: 4 },
    priceFrom: 76000,
    summary:
      'Glittering skylines, golden deserts and world-class shopping, just a short flight from home. Pair the energy of Dubai with the calm grandeur of Abu Dhabi for a trip the whole family will love.',
    facts: { bestTime: 'Nov – Mar', entry: 'e-Visa (we arrange it)', travel: '3 – 4 hrs flight', idealDays: '5 – 6 days' },
    places: [
      place('Burj Khalifa', 'Dubai', "Ride up to the observation deck of the world's tallest building for sweeping city views."),
      place('Desert Safari', 'Dubai', 'Dune bashing, camel rides and a barbecue dinner under the stars.'),
      place('Dubai Marina', 'Dubai', 'An evening dhow cruise past glowing towers and waterfront cafés.'),
      place('Sheikh Zayed Grand Mosque', 'Abu Dhabi', 'A breathtaking white-marble mosque, especially beautiful at sunset.'),
      place('Ferrari World', 'Abu Dhabi', 'Home to some of the fastest roller coasters on the planet.'),
      place('Louvre Abu Dhabi', 'Abu Dhabi', 'World art under a floating dome that filters the sunlight like rain.'),
    ],
    packages: [
      { title: '5 Days Holiday & Tour Abu Dhabi', duration: { days: 5, nights: 4 }, priceFrom: 76000, image: pkgAbuDhabi },
    ],
  },
  {
    slug: 'thailand',
    country: 'Thailand',
    place: 'Phuket & Krabi',
    cover: pkgPhuket,
    duration: { days: 6, nights: 5 },
    priceFrom: 42999,
    summary:
      'Turquoise bays, limestone cliffs and lively night markets. Phuket and Krabi are perfect for honeymooners, families and friends looking for beaches with plenty to do.',
    facts: { bestTime: 'Nov – Apr', entry: 'Visa-free 30 days + TDAC form', travel: '4 – 5 hrs flight', idealDays: '6 – 7 days' },
    places: [
      place('Phi Phi Islands', 'Krabi', 'Speedboat to crystal lagoons, Maya Bay and snorkelling spots.'),
      place('Railay Beach', 'Krabi', 'A cliff-ringed beach reachable only by longtail boat.'),
      place('James Bond Island', 'Phang Nga Bay', 'Canoe through sea caves around the famous limestone pinnacle.'),
      place('Big Buddha', 'Phuket', 'A 45-metre marble Buddha with panoramic island views.'),
      place('Old Phuket Town', 'Phuket', 'Colourful Sino-Portuguese shophouses, cafés and street art.'),
      place('Bangla Road', 'Phuket', "Patong's buzzing strip of nightlife, shows and street food."),
    ],
    packages: [
      { title: 'Phuket & Krabi', duration: null, priceFrom: 42999, image: pkgPhuket },
      { title: '7 Days Holiday In Thailand', duration: { days: 6, nights: 5 }, priceFrom: 78300, image: pkgThailand },
    ],
  },
  {
    slug: 'bali',
    country: 'Indonesia',
    place: 'Bali',
    cover: pkgBali,
    duration: { days: 7, nights: 6 },
    priceFrom: 79000,
    summary:
      'Rice terraces, cliff-top temples and private pool villas. Bali blends romance, culture and adventure, which is why it tops so many honeymoon wish lists.',
    facts: { bestTime: 'Apr – Oct', entry: 'Visa on arrival', travel: '7 – 9 hrs flight', idealDays: '6 – 7 days' },
    places: [
      place('Ubud', 'Central Bali', 'Art villages, the Monkey Forest and lush jungle swings.'),
      place('Tegallalang Rice Terraces', 'Ubud', 'Emerald terraces carved into the hillside, best early morning.'),
      place('Uluwatu Temple', 'South Bali', 'A clifftop temple with a Kecak fire dance at sunset.'),
      place('Tanah Lot', 'Tabanan', 'A sea temple perched on a rock, surrounded by crashing waves.'),
      place('Nusa Penida', 'Nusa Islands', 'Kelingking Beach and dramatic cliffs on a day trip by boat.'),
      place('Seminyak', 'South Bali', 'Beach clubs, boutiques and some of the best dining on the island.'),
    ],
    packages: [
      { title: '7 Days Tour Exploring Bali', duration: { days: 7, nights: 6 }, priceFrom: 79000, image: pkgBali },
    ],
  },
  {
    slug: 'singapore',
    country: 'Singapore',
    place: 'Singapore City & Sentosa',
    cover: pkgSingapore,
    duration: { days: 7, nights: 6 },
    priceFrom: 97800,
    summary:
      'Spotless streets, futuristic gardens and theme parks the kids will never forget. Singapore is easy, safe and packed with experiences for every age.',
    facts: { bestTime: 'Feb – Apr', entry: 'e-Visa (we arrange it)', travel: '5 – 6 hrs flight', idealDays: '4 – 5 days' },
    places: [
      place('Gardens by the Bay', 'Marina Bay', 'Supertrees, the Cloud Forest and a nightly light show.'),
      place('Marina Bay Sands', 'Marina Bay', 'The iconic skyline, rooftop views and the evening laser show.'),
      place('Universal Studios', 'Sentosa', 'Rides and shows from your favourite movies.'),
      place('S.E.A. Aquarium', 'Sentosa', 'Walk past manta rays and sharks in one of the largest aquariums.'),
      place('Singapore Zoo & Night Safari', 'Mandai', 'Open-concept zoo by day, a tram safari by night.'),
      place('Chinatown & Little India', 'City', 'Temples, hawker food and the best shopping for souvenirs.'),
    ],
    packages: [
      { title: 'Explore Singapore 7-Day Tour', duration: { days: 7, nights: 6 }, priceFrom: 97800, image: pkgSingapore },
    ],
  },
  {
    slug: 'maldives',
    country: 'Maldives',
    place: 'Malé & Resort Islands',
    duration: { days: 5, nights: 4 },
    priceFrom: null,
    summary:
      'Overwater villas, private sandbanks and reefs alive with colour. The Maldives is the ultimate barefoot escape for couples and anyone who needs to switch off.',
    facts: { bestTime: 'Nov – Apr', entry: 'Free visa on arrival', travel: '2 – 4 hrs flight', idealDays: '4 – 5 days' },
    places: [
      place('Overwater Villa Stay', 'Resort islands', 'Wake up above the lagoon with steps straight into the sea.'),
      place('Sandbank Picnic', 'North Malé Atoll', 'A private strip of sand in the middle of the ocean.'),
      place('Snorkelling & Diving', 'Ari Atoll', 'Swim with turtles, manta rays and whale sharks.'),
      place('Sunset Dolphin Cruise', 'Resort islands', 'Watch dolphins play as the sky turns gold.'),
      place('Malé City', 'Malé', 'The fish market, Friday Mosque and colourful streets.'),
      place('Maafushi', 'Kaafu Atoll', 'A local island with budget-friendly stays and water sports.'),
    ],
    packages: [],
  },
  {
    slug: 'vietnam',
    country: 'Vietnam',
    place: 'Hanoi & Ha Long Bay',
    cover: destVietnam,
    duration: { days: 7, nights: 6 },
    priceFrom: 101000,
    summary:
      'Emerald bays, buzzing old quarters and some of the best food in Asia. Vietnam is great value and full of surprises from north to south.',
    facts: { bestTime: 'Oct – Apr', entry: 'e-Visa (we arrange it)', travel: '5 – 6 hrs flight', idealDays: '7 – 8 days' },
    places: [
      place('Ha Long Bay Cruise', 'Quang Ninh', 'An overnight cruise among thousands of limestone islands.'),
      place('Hanoi Old Quarter', 'Hanoi', 'Street food, lakeside walks and the famous Train Street.'),
      place('Ninh Binh', 'Ninh Binh', "Row through rice paddies and caves in 'Ha Long Bay on land'."),
      place('Golden Bridge', 'Da Nang', 'A walkway held by giant stone hands in the Ba Na Hills.'),
      place('Hoi An Ancient Town', 'Hoi An', 'Lantern-lit lanes, tailors and riverside dinners.'),
      place('Cu Chi Tunnels', 'Ho Chi Minh City', 'Crawl through the historic wartime tunnel network.'),
    ],
    packages: [
      { title: '7 Days Holiday In Vietnam', duration: { days: 7, nights: 6 }, priceFrom: 101000, image: destVietnam },
    ],
  },
  {
    slug: 'switzerland',
    country: 'Switzerland',
    place: 'Interlaken & Lucerne',
    cover: destSwitzerland,
    duration: { days: 8, nights: 7 },
    priceFrom: null,
    summary:
      'Snow peaks, glacier lakes and scenic trains straight out of a film. Switzerland is the dream European holiday, and we take care of the Schengen visa for you.',
    facts: { bestTime: 'May – Sep, Dec – Feb for snow', entry: 'Schengen visa (we arrange it)', travel: '9 – 10 hrs flight', idealDays: '6 – 8 days' },
    places: [
      place('Jungfraujoch', 'Interlaken', "The 'Top of Europe', with snow all year round."),
      place('Mount Titlis', 'Engelberg', 'A rotating cable car and the cliff-edge suspension bridge.'),
      place('Chapel Bridge', 'Lucerne', 'A flower-lined wooden bridge across the old town.'),
      place('Lake Brienz', 'Interlaken', 'Turquoise water and boat rides past waterfalls.'),
      place('Glacier Express', 'Zermatt to St. Moritz', 'One of the most scenic train journeys in the world.'),
      place('Rhine Falls', 'Schaffhausen', "Europe's most powerful waterfall, up close by boat."),
    ],
    packages: [
      { title: 'Holiday To Golden Triangle Of Europe', duration: { days: 8, nights: 7 }, priceFrom: 118700, image: destFinland },
    ],
  },
  {
    slug: 'malaysia',
    country: 'Malaysia',
    place: 'Kuala Lumpur & Langkawi',
    duration: { days: 6, nights: 5 },
    priceFrom: null,
    summary: 'Modern city lights in Kuala Lumpur and island calm in Langkawi, with great food and easy entry for Indians.',
    facts: { bestTime: 'Dec – Apr', entry: 'Visa-free 30 days + MDAC form', travel: '5 – 6 hrs flight', idealDays: '5 – 6 days' },
    places: [
      place('Petronas Twin Towers', 'Kuala Lumpur', 'The skybridge and city views from the iconic towers.'),
      place('Batu Caves', 'Kuala Lumpur', 'Rainbow steps up to a cave temple guarded by Lord Murugan.'),
      place('Genting Highlands', 'Pahang', 'Cable car to cool hills, theme parks and casinos.'),
      place('Langkawi Sky Bridge', 'Langkawi', 'A curved bridge high above the rainforest.'),
    ],
    packages: [],
  },
  {
    slug: 'sri-lanka',
    country: 'Sri Lanka',
    place: 'Kandy & Bentota',
    cover: destSriLanka,
    duration: { days: 6, nights: 5 },
    priceFrom: 71800,
    summary: 'Tea hills, ancient temples and golden beaches, all within a few hours of each other and a short hop from India.',
    facts: { bestTime: 'Dec – Apr', entry: 'Free ETA (apply online)', travel: '2 – 3 hrs flight', idealDays: '6 – 7 days' },
    places: [
      place('Temple of the Tooth', 'Kandy', 'The sacred Buddhist temple beside Kandy Lake.'),
      place('Sigiriya Rock', 'Dambulla', 'Climb the ancient rock fortress for a stunning view.'),
      place('Nuwara Eliya', 'Central Hills', "Tea estates and cool weather in 'Little England'."),
      place('Bentota Beach', 'Bentota', 'River safaris, water sports and a quiet beach stay.'),
    ],
    packages: [
      { title: '6 Days To Explore Sri Lanka', duration: { days: 6, nights: 5 }, priceFrom: 71800, image: destSriLanka },
    ],
  },
  {
    slug: 'france',
    country: 'France',
    place: 'Paris',
    duration: { days: 8, nights: 7 },
    priceFrom: 164650,
    summary: 'The Eiffel Tower, the Louvre and long café afternoons. Paris pairs beautifully with Switzerland on one Schengen visa.',
    facts: { bestTime: 'Apr – Jun, Sep – Oct', entry: 'Schengen visa (we arrange it)', travel: '9 – 10 hrs flight', idealDays: '4 – 5 days in Paris' },
    places: [
      place('Eiffel Tower', 'Paris', 'Go up at dusk and watch the city light up.'),
      place('Louvre Museum', 'Paris', 'The Mona Lisa and the glass pyramid.'),
      place('Seine River Cruise', 'Paris', 'Glide past Notre-Dame and the city bridges.'),
      place('Disneyland Paris', 'Marne-la-Vallée', 'A magical day out for kids and grown-ups alike.'),
    ],
    packages: [
      { title: '8 Days Tour Exploring Paris & Swiss', duration: { days: 8, nights: 7 }, priceFrom: 164650, image: destSwitzerland },
    ],
  },
  {
    slug: 'turkey',
    country: 'Turkey',
    place: 'Istanbul & Cappadocia',
    duration: { days: 8, nights: 7 },
    priceFrom: null,
    summary: 'Where Europe meets Asia: grand mosques and bazaars in Istanbul, then sunrise balloon rides over the fairy chimneys of Cappadocia.',
    facts: { bestTime: 'Apr – Jun, Sep – Nov', entry: 'Visa required (we arrange it)', travel: '7 – 8 hrs flight', idealDays: '7 – 8 days' },
    places: [
      place('Hagia Sophia', 'Istanbul', 'A 1,500-year-old landmark of two empires.'),
      place('Grand Bazaar', 'Istanbul', 'Lamps, spices and carpets in one of the oldest markets.'),
      place('Hot Air Balloon Ride', 'Cappadocia', 'Float over valleys of fairy chimneys at sunrise.'),
      place('Pamukkale', 'Denizli', 'White travertine terraces filled with warm mineral water.'),
    ],
    packages: [],
  },
  {
    slug: 'united-kingdom',
    country: 'United Kingdom',
    place: 'London',
    duration: { days: 7, nights: 6 },
    priceFrom: null,
    summary: 'Royal palaces, West End shows and day trips into the English and Scottish countryside.',
    facts: { bestTime: 'May – Sep', entry: 'UK visitor visa (we arrange it)', travel: '9 – 10 hrs flight', idealDays: '6 – 8 days' },
    places: [
      place('Buckingham Palace', 'London', 'Catch the Changing of the Guard.'),
      place('London Eye', 'London', 'Views over Big Ben and the Thames.'),
      place('Warner Bros. Studio Tour', 'Watford', 'Walk through the sets of Harry Potter.'),
      place('Edinburgh Castle', 'Edinburgh', 'A historic fortress above the Scottish capital.'),
    ],
    packages: [],
  },
  {
    slug: 'japan',
    country: 'Japan',
    place: 'Tokyo & Kyoto',
    duration: { days: 8, nights: 7 },
    priceFrom: null,
    summary: 'Neon cities, quiet temples and the bullet train in between. Spring cherry blossoms and autumn colours are unforgettable.',
    facts: { bestTime: 'Mar – May, Oct – Nov', entry: 'e-Visa (we arrange it)', travel: '8 – 10 hrs flight', idealDays: '7 – 9 days' },
    places: [
      place('Shibuya Crossing', 'Tokyo', "The world's busiest crossing, best seen from above."),
      place('Mount Fuji', 'Hakone', "Lake cruises and views of Japan's iconic peak."),
      place('Fushimi Inari Shrine', 'Kyoto', 'Thousands of orange torii gates up the hillside.'),
      place('Nara Park', 'Nara', 'Friendly deer and the giant Buddha of Todai-ji.'),
    ],
    packages: [],
  },
  {
    slug: 'nepal',
    country: 'Nepal',
    place: 'Kathmandu & Pokhara',
    duration: { days: 6, nights: 5 },
    priceFrom: null,
    summary: 'Himalayan sunrises, sacred temples and lakeside calm, with no visa needed for Indian travellers.',
    facts: { bestTime: 'Oct – Dec, Mar – May', entry: 'No visa needed', travel: '1.5 hrs flight or by road', idealDays: '5 – 7 days' },
    places: [
      place('Pashupatinath Temple', 'Kathmandu', 'One of the holiest Shiva temples, on the Bagmati river.'),
      place('Boudhanath Stupa', 'Kathmandu', 'A giant stupa circled by prayer wheels.'),
      place('Phewa Lake', 'Pokhara', 'Boat rides with the Annapurna range reflected in the water.'),
      place('Sarangkot Sunrise', 'Pokhara', 'Sunrise over the Himalayas, and paragliding after.'),
    ],
    packages: [],
  },
  {
    slug: 'bhutan',
    country: 'Bhutan',
    place: 'Paro & Thimphu',
    duration: { days: 6, nights: 5 },
    priceFrom: null,
    summary: 'The land of happiness: cliffside monasteries, prayer flags and clean mountain air.',
    facts: { bestTime: 'Mar – May, Sep – Nov', entry: 'No visa; entry permit (we arrange it)', travel: '2 – 3 hrs flight or by road', idealDays: '5 – 6 days' },
    places: [
      place("Tiger's Nest Monastery", 'Paro', 'A sacred monastery clinging to a cliff, reached by a scenic hike.'),
      place('Buddha Dordenma', 'Thimphu', 'A giant golden Buddha overlooking the valley.'),
      place('Punakha Dzong', 'Punakha', 'A beautiful fortress where two rivers meet.'),
      place('Dochula Pass', 'Thimphu–Punakha', '108 stupas with Himalayan views on clear days.'),
    ],
    packages: [],
  },
  {
    slug: 'mauritius',
    country: 'Mauritius',
    place: 'Port Louis & Île aux Cerfs',
    duration: { days: 6, nights: 5 },
    priceFrom: null,
    summary: 'Lagoons, waterfalls and a warm welcome. Mauritius feels close to home and is ideal for honeymoons.',
    facts: { bestTime: 'May – Dec', entry: 'Free visa on arrival', travel: '6 – 7 hrs flight', idealDays: '6 – 7 days' },
    places: [
      place('Île aux Cerfs', 'East coast', 'Speedboat to a postcard island with water sports.'),
      place('Seven Coloured Earth', 'Chamarel', 'Sand dunes in seven colours and a waterfall nearby.'),
      place('Grand Bassin', 'Savanne', 'A sacred lake with a towering statue of Lord Shiva.'),
      place('Port Louis Waterfront', 'Port Louis', 'Markets, museums and seaside dining.'),
    ],
    packages: [],
  },
  {
    slug: 'seychelles',
    country: 'Seychelles',
    place: 'Mahé & Praslin',
    cover: pkgSeychelles,
    duration: { days: 7, nights: 6 },
    priceFrom: null,
    summary: 'Granite boulders, powder-white beaches and giant tortoises. Seychelles is a quiet, luxurious island escape.',
    facts: { bestTime: 'Apr – May, Oct – Nov', entry: 'No visa; online travel authorisation', travel: '4 – 5 hrs flight', idealDays: '6 – 7 days' },
    places: [
      place('Anse Source d’Argent', 'La Digue', 'One of the most photographed beaches in the world.'),
      place('Vallée de Mai', 'Praslin', 'A UNESCO palm forest, home to the coco de mer.'),
      place('Beau Vallon Beach', 'Mahé', 'Calm water and sunset dinners on the sand.'),
      place('Curieuse Island', 'Praslin', 'Meet giant Aldabra tortoises in the wild.'),
    ],
    packages: [
      { title: 'Seychelles Island Holiday', duration: { days: 7, nights: 6 }, priceFrom: null, image: pkgSeychelles },
    ],
  },
  {
    slug: 'south-korea',
    country: 'South Korea',
    place: 'Seoul & Jeju',
    cover: pkgSouthKorea,
    duration: { days: 6, nights: 5 },
    priceFrom: null,
    summary: 'Royal palaces and K-pop streets in Seoul, then volcanic beaches and tangerine farms on Jeju Island.',
    facts: { bestTime: 'Apr – Jun, Sep – Nov', entry: 'Visa required (we arrange it)', travel: '8 – 9 hrs flight', idealDays: '6 – 7 days' },
    places: [
      place('Gyeongbokgung Palace', 'Seoul', 'Wear a hanbok and watch the guard ceremony.'),
      place('N Seoul Tower', 'Seoul', 'City views and the famous love locks.'),
      place('Nami Island', 'Chuncheon', 'Tree-lined paths made famous by K-dramas.'),
      place('Seongsan Ilchulbong', 'Jeju', 'A volcanic crater, best climbed at sunrise.'),
    ],
    packages: [
      { title: '4 Days Tour Exploring Temples In Korea', duration: { days: 4, nights: 3 }, priceFrom: null, image: pkgSouthKorea },
    ],
  },
  {
    slug: 'australia',
    country: 'Australia',
    place: 'Sydney & Melbourne',
    duration: { days: 9, nights: 8 },
    priceFrom: null,
    summary: 'Harbour cities, wild coastlines and wildlife you will see nowhere else on earth.',
    facts: { bestTime: 'Sep – Nov, Mar – May', entry: 'Visitor visa (we arrange it)', travel: '12 – 14 hrs flight', idealDays: '9 – 12 days' },
    places: [
      place('Sydney Opera House', 'Sydney', 'Harbour views and the Bridge from Circular Quay.'),
      place('Bondi Beach', 'Sydney', 'The coastal walk and a famous surf beach.'),
      place('Great Ocean Road', 'Victoria', 'The Twelve Apostles on a classic coastal drive.'),
      place('Phillip Island', 'Victoria', 'Watch the little penguins parade home at dusk.'),
    ],
    packages: [],
  },
  {
    slug: 'azerbaijan',
    country: 'Azerbaijan',
    place: 'Baku',
    duration: { days: 5, nights: 4 },
    priceFrom: null,
    summary: 'The land of fire: a medieval old city, futuristic towers and mud volcanoes, a short direct flight away.',
    facts: { bestTime: 'Apr – Jun, Sep – Oct', entry: 'e-Visa (we arrange it)', travel: '3 – 4 hrs flight', idealDays: '4 – 5 days' },
    places: [
      place('Old City (Icherisheher)', 'Baku', 'Walled lanes, the Maiden Tower and the Shirvanshah palace.'),
      place('Flame Towers', 'Baku', 'Three towers that light up like fire at night.'),
      place('Gabala', 'Gabala', 'Cable cars, mountain lakes and green forests.'),
      place('Gobustan', 'Gobustan', 'Ancient rock art and bubbling mud volcanoes.'),
    ],
    packages: [],
  },
]

const domestic = [
  {
    slug: 'kashmir',
    country: 'Jammu & Kashmir',
    place: 'Srinagar & Gulmarg',
    duration: { days: 6, nights: 5 },
    priceFrom: null,
    summary:
      'Houseboats on Dal Lake, meadows full of flowers and snow-covered slopes. Kashmir truly lives up to its name as paradise on earth.',
    facts: { bestTime: 'Mar – Oct, Dec – Feb for snow', entry: 'No permit needed', travel: 'Fly to Srinagar', idealDays: '6 – 7 days' },
    places: [
      place('Dal Lake', 'Srinagar', 'A shikara ride and a night on a traditional houseboat.'),
      place('Mughal Gardens', 'Srinagar', 'Terraced gardens of Nishat and Shalimar by the lake.'),
      place('Gulmarg Gondola', 'Gulmarg', 'One of the highest cable cars in the world.'),
      place('Pahalgam', 'Pahalgam', 'Betaab Valley and Aru Valley along the Lidder river.'),
      place('Sonamarg', 'Sonamarg', "The 'meadow of gold' and the Thajiwas glacier."),
      place('Doodhpathri', 'Budgam', 'Quiet green meadows with a milky white stream.'),
    ],
    packages: [],
  },
  {
    slug: 'himachal',
    country: 'Himachal Pradesh',
    place: 'Manali & Shimla',
    duration: { days: 6, nights: 5 },
    priceFrom: null,
    summary: 'Pine forests, snow points and colonial hill towns. A favourite for families, honeymooners and road-trippers.',
    facts: { bestTime: 'Mar – Jun, Dec – Jan for snow', entry: 'Permit for Rohtang only', travel: 'Fly to Chandigarh or Bhuntar', idealDays: '6 – 7 days' },
    places: [
      place('Mall Road', 'Shimla', 'Colonial buildings, cafés and the Ridge.'),
      place('Kufri', 'Shimla', 'Snow activities and mountain views near Shimla.'),
      place('Solang Valley', 'Manali', 'Paragliding in summer, skiing in winter.'),
      place('Atal Tunnel & Sissu', 'Lahaul', 'Drive through the long tunnel to waterfalls and snow.'),
      place('Hadimba Temple', 'Manali', 'A wooden temple deep in a cedar forest.'),
      place('Old Manali', 'Manali', 'Riverside cafés and a laid-back village feel.'),
    ],
    packages: [],
  },
  {
    slug: 'goa',
    country: 'Goa',
    place: 'North & South Goa',
    duration: { days: 4, nights: 3 },
    priceFrom: null,
    summary: 'Beaches, sunsets, seafood and Portuguese charm. Lively in the north, peaceful in the south.',
    facts: { bestTime: 'Nov – Feb', entry: 'No permit needed', travel: 'Fly to Goa (GOI / GOX)', idealDays: '4 – 5 days' },
    places: [
      place('Baga & Calangute', 'North Goa', 'Water sports, shacks and nightlife.'),
      place('Fort Aguada', 'North Goa', 'A 17th-century fort and lighthouse over the sea.'),
      place('Old Goa Churches', 'Old Goa', 'The Basilica of Bom Jesus and Sé Cathedral.'),
      place('Fontainhas', 'Panaji', 'Colourful Latin Quarter streets for a heritage walk.'),
      place('Palolem Beach', 'South Goa', 'A calm crescent beach with kayaking and dolphin trips.'),
      place('Dudhsagar Falls', 'Goa–Karnataka border', 'A four-tiered waterfall, best after the monsoon.'),
    ],
    packages: [],
  },
  {
    slug: 'kerala',
    country: 'Kerala',
    place: 'Munnar & Alleppey',
    duration: { days: 6, nights: 5 },
    priceFrom: null,
    summary: "God's Own Country: misty tea hills, a night on a houseboat and slow days on the backwaters.",
    facts: { bestTime: 'Sep – Mar', entry: 'No permit needed', travel: 'Fly to Kochi', idealDays: '6 – 7 days' },
    places: [
      place('Tea Gardens', 'Munnar', 'Rolling tea estates and a visit to the tea museum.'),
      place('Eravikulam National Park', 'Munnar', 'Home of the rare Nilgiri tahr.'),
      place('Houseboat Cruise', 'Alleppey', 'A night afloat on the palm-lined backwaters.'),
      place('Thekkady', 'Periyar', 'A boat safari in the wildlife reserve and spice plantations.'),
      place('Fort Kochi', 'Kochi', 'Chinese fishing nets, art cafés and Kathakali shows.'),
      place('Varkala Cliff', 'Varkala', 'A clifftop walk above a beautiful beach.'),
    ],
    packages: [],
  },
  {
    slug: 'rajasthan',
    country: 'Rajasthan',
    place: 'Jaipur & Udaipur',
    duration: { days: 6, nights: 5 },
    priceFrom: null,
    summary: 'Forts, palaces and lakes in the land of kings. Rajasthan is colourful, royal and full of stories.',
    facts: { bestTime: 'Oct – Mar', entry: 'No permit needed', travel: 'Fly to Jaipur or Udaipur', idealDays: '6 – 8 days' },
    places: [
      place('Amber Fort', 'Jaipur', 'A hilltop fort of mirrors and sandstone.'),
      place('Hawa Mahal', 'Jaipur', "The pink 'palace of winds' with 953 windows."),
      place('City Palace', 'Udaipur', 'A grand palace complex on the banks of Lake Pichola.'),
      place('Lake Pichola', 'Udaipur', 'A sunset boat ride past the Lake Palace.'),
      place('Mehrangarh Fort', 'Jodhpur', 'A mighty fort above the blue city.'),
      place('Sam Sand Dunes', 'Jaisalmer', 'A camel ride and a night in a desert camp.'),
    ],
    packages: [],
  },
  {
    slug: 'ladakh',
    country: 'Ladakh',
    place: 'Leh & Pangong',
    duration: { days: 7, nights: 6 },
    priceFrom: null,
    summary: 'High passes, blue lakes and ancient monasteries. Ladakh is a once-in-a-lifetime adventure on the roof of the world.',
    facts: { bestTime: 'May – Sep', entry: 'Permit for some areas (we arrange it)', travel: 'Fly to Leh', idealDays: '7 – 8 days' },
    places: [
      place('Pangong Lake', 'Pangong', 'A lake that changes from blue to green through the day.'),
      place('Nubra Valley', 'Nubra', 'Sand dunes and double-humped camels at Hunder.'),
      place('Khardung La', 'Leh', 'One of the highest motorable passes in the world.'),
      place('Thiksey Monastery', 'Leh', 'A hilltop monastery with a giant Maitreya Buddha.'),
      place('Magnetic Hill', 'Leh', 'The road where cars seem to roll uphill.'),
      place('Shanti Stupa', 'Leh', 'Sunset views over Leh town.'),
    ],
    packages: [],
  },
  {
    slug: 'andaman',
    country: 'Andaman',
    place: 'Havelock & Port Blair',
    duration: { days: 6, nights: 5 },
    priceFrom: null,
    summary: 'Clear water, white sand and coral reefs. The Andamans are India\'s best island holiday for families and couples.',
    facts: { bestTime: 'Oct – May', entry: 'No permit needed', travel: 'Fly to Port Blair', idealDays: '5 – 7 days' },
    places: [
      place('Radhanagar Beach', 'Havelock', 'One of Asia\'s finest beaches, perfect at sunset.'),
      place('Elephant Beach', 'Havelock', 'Snorkelling and sea walking over coral.'),
      place('Cellular Jail', 'Port Blair', 'A moving light and sound show on India\'s freedom struggle.'),
      place('Neil Island', 'Shaheed Dweep', 'A natural rock bridge and quiet beaches.'),
      place('Ross Island', 'Port Blair', 'Colonial ruins taken over by trees and deer.'),
      place('Scuba Diving', 'Havelock', 'Beginner-friendly dives with certified instructors.'),
    ],
    packages: [],
  },
  {
    slug: 'uttarakhand',
    country: 'Uttarakhand',
    place: 'Rishikesh & Mussoorie',
    duration: { days: 5, nights: 4 },
    priceFrom: null,
    summary: 'River rafting and yoga by the Ganga, then the cool hills of the Queen of Hills.',
    facts: { bestTime: 'Mar – Jun, Sep – Nov', entry: 'No permit needed', travel: 'Fly to Dehradun', idealDays: '5 – 6 days' },
    places: [
      place('Laxman Jhula', 'Rishikesh', 'The iconic suspension bridge over the Ganga.'),
      place('Ganga Aarti', 'Haridwar', 'The evening aarti at Har Ki Pauri.'),
      place('River Rafting', 'Rishikesh', 'White-water rafting on the Ganga.'),
      place('Kempty Falls', 'Mussoorie', 'A popular waterfall in the hills.'),
    ],
    packages: [],
  },
  {
    slug: 'sikkim',
    country: 'Sikkim',
    place: 'Gangtok',
    duration: { days: 5, nights: 4 },
    priceFrom: null,
    summary: 'Monasteries, mountain lakes and close-up views of Kanchenjunga in one of India\'s cleanest states.',
    facts: { bestTime: 'Mar – May, Oct – Dec', entry: 'Permit for Nathula (we arrange it)', travel: 'Fly to Bagdogra or Pakyong', idealDays: '5 – 6 days' },
    places: [
      place('Tsomgo Lake', 'East Sikkim', 'A glacial lake at 12,000 feet.'),
      place('Nathula Pass', 'East Sikkim', 'The historic pass on the India–China border.'),
      place('Rumtek Monastery', 'Gangtok', 'One of the largest monasteries in Sikkim.'),
      place('MG Marg', 'Gangtok', 'A walking street of cafés and shops.'),
    ],
    packages: [],
  },
  {
    slug: 'darjeeling',
    country: 'West Bengal',
    place: 'Darjeeling',
    duration: { days: 4, nights: 3 },
    priceFrom: null,
    summary: 'The toy train, tea estates and sunrise over Kanchenjunga from Tiger Hill.',
    facts: { bestTime: 'Mar – May, Oct – Dec', entry: 'No permit needed', travel: 'Fly to Bagdogra', idealDays: '3 – 4 days' },
    places: [
      place('Tiger Hill', 'Darjeeling', 'Sunrise over Kanchenjunga and Everest on clear days.'),
      place('Toy Train', 'Darjeeling', 'The UNESCO Himalayan railway joy ride.'),
      place('Batasia Loop', 'Darjeeling', 'A spiral railway loop with a war memorial.'),
      place('Happy Valley Tea Estate', 'Darjeeling', 'See how the famous tea is made.'),
    ],
    packages: [],
  },
  {
    slug: 'meghalaya',
    country: 'Meghalaya',
    place: 'Shillong & Cherrapunji',
    duration: { days: 5, nights: 4 },
    priceFrom: null,
    summary: 'Living root bridges, crystal-clear rivers and waterfalls in the abode of clouds.',
    facts: { bestTime: 'Oct – Jun', entry: 'No permit needed', travel: 'Fly to Guwahati or Shillong', idealDays: '5 – 6 days' },
    places: [
      place('Double Decker Root Bridge', 'Cherrapunji', 'A bridge grown from living tree roots.'),
      place('Dawki River', 'Dawki', 'Boat on water so clear it looks like glass.'),
      place('Nohkalikai Falls', 'Cherrapunji', "India's tallest plunge waterfall."),
      place('Mawlynnong', 'East Khasi Hills', "Asia's cleanest village."),
    ],
    packages: [],
  },
  {
    slug: 'madhya-pradesh',
    country: 'Madhya Pradesh',
    place: 'Ujjain, Omkareshwar & Pachmarhi',
    duration: { days: 5, nights: 4 },
    priceFrom: null,
    summary:
      'Two jyotirlingas and the only hill station in central India, all close to our Indore office. A perfect short break for families.',
    facts: { bestTime: 'Oct – Mar', entry: 'No permit needed', travel: 'By road from Indore', idealDays: '4 – 5 days' },
    places: [
      place('Mahakaleshwar Temple', 'Ujjain', 'The Bhasma Aarti at one of the twelve jyotirlingas.'),
      place('Mahakal Lok', 'Ujjain', 'A grand corridor of murals and statues.'),
      place('Omkareshwar Temple', 'Omkareshwar', 'A jyotirlinga on an island shaped like Om.'),
      place('Bee Falls', 'Pachmarhi', 'A refreshing waterfall in the Satpura hills.'),
      place('Dhupgarh', 'Pachmarhi', 'The highest point in Madhya Pradesh, best at sunset.'),
      place('Mandu', 'Dhar', 'Afghan-era palaces and the romantic Jahaz Mahal.'),
    ],
    packages: [],
  },
  {
    slug: 'uttar-pradesh',
    country: 'Uttar Pradesh',
    place: 'Agra & Varanasi',
    duration: { days: 5, nights: 4 },
    priceFrom: null,
    summary: 'The Taj Mahal at sunrise and the evening Ganga Aarti in Varanasi: two of India\'s most moving sights.',
    facts: { bestTime: 'Oct – Mar', entry: 'No permit needed', travel: 'Fly to Agra or Varanasi', idealDays: '4 – 5 days' },
    places: [
      place('Taj Mahal', 'Agra', 'Visit at sunrise for soft light and fewer crowds.'),
      place('Agra Fort', 'Agra', 'A red sandstone fort with views of the Taj.'),
      place('Ganga Aarti', 'Varanasi', 'The evening ceremony at Dashashwamedh Ghat.'),
      place('Kashi Vishwanath', 'Varanasi', 'The golden temple and its new corridor.'),
    ],
    packages: [],
  },
  {
    slug: 'karnataka',
    country: 'Karnataka',
    place: 'Coorg & Hampi',
    duration: { days: 6, nights: 5 },
    priceFrom: null,
    summary: 'Coffee estates and misty hills in Coorg, then the boulder-strewn ruins of the Vijayanagara empire.',
    facts: { bestTime: 'Oct – Mar', entry: 'No permit needed', travel: 'Fly to Bengaluru or Mysuru', idealDays: '5 – 6 days' },
    places: [
      place('Abbey Falls', 'Coorg', 'A waterfall surrounded by coffee plantations.'),
      place('Dubare Elephant Camp', 'Coorg', 'Bathe and feed elephants by the river.'),
      place('Virupaksha Temple', 'Hampi', 'A living temple at the heart of the ruins.'),
      place('Mysore Palace', 'Mysuru', 'Lit up with thousands of bulbs on Sunday evenings.'),
    ],
    packages: [],
  },
  {
    slug: 'tamil-nadu',
    country: 'Tamil Nadu',
    place: 'Ooty & Kodaikanal',
    duration: { days: 5, nights: 4 },
    priceFrom: null,
    summary: 'The Nilgiri toy train, lakes and tea gardens in two of South India\'s favourite hill stations.',
    facts: { bestTime: 'Oct – Jun', entry: 'No permit needed', travel: 'Fly to Coimbatore or Madurai', idealDays: '5 – 6 days' },
    places: [
      place('Nilgiri Mountain Railway', 'Ooty', 'The UNESCO toy train through the hills.'),
      place('Ooty Lake', 'Ooty', 'Boating surrounded by eucalyptus trees.'),
      place('Kodai Lake', 'Kodaikanal', 'A star-shaped lake for cycling and boating.'),
      place('Coaker’s Walk', 'Kodaikanal', 'A cliffside path above the clouds.'),
    ],
    packages: [],
  },
  {
    slug: 'gujarat',
    country: 'Gujarat',
    place: 'Rann of Kutch & Dwarka–Somnath',
    duration: { days: 6, nights: 5 },
    priceFrom: null,
    summary: 'The white desert under a full moon, the Statue of Unity and two of India\'s most sacred temples.',
    facts: { bestTime: 'Nov – Feb', entry: 'Permit for White Rann (we arrange it)', travel: 'Fly to Bhuj or Ahmedabad', idealDays: '6 – 7 days' },
    places: [
      place('White Rann', 'Kutch', 'Endless salt desert, magical on a full-moon night.'),
      place('Dwarkadhish Temple', 'Dwarka', 'The ancient temple of Lord Krishna.'),
      place('Somnath Temple', 'Somnath', 'The first of the twelve jyotirlingas, by the sea.'),
      place('Statue of Unity', 'Kevadia', "The world's tallest statue."),
    ],
    packages: [],
  },
  {
    slug: 'lakshadweep',
    country: 'Lakshadweep',
    place: 'Agatti & Bangaram',
    duration: { days: 5, nights: 4 },
    priceFrom: null,
    summary: 'Untouched coral islands with lagoons so clear you can see the fish from the boat.',
    facts: { bestTime: 'Oct – May', entry: 'Entry permit (we arrange it)', travel: 'Fly to Agatti via Kochi', idealDays: '4 – 5 days' },
    places: [
      place('Agatti Lagoon', 'Agatti', 'Snorkelling and kayaking in a turquoise lagoon.'),
      place('Bangaram Island', 'Bangaram', 'A tiny island ringed by white sand.'),
      place('Kadmat Island', 'Kadmat', 'One of the best scuba diving spots in India.'),
      place('Glass-bottom Boat Ride', 'Agatti', 'See the coral reef without getting wet.'),
    ],
    packages: [],
  },
  {
    slug: 'maharashtra',
    country: 'Maharashtra',
    place: 'Lonavala & Mahabaleshwar',
    duration: { days: 4, nights: 3 },
    priceFrom: null,
    summary: 'Green ghats, strawberry farms and misty viewpoints, best during and just after the monsoon.',
    facts: { bestTime: 'Jun – Feb', entry: 'No permit needed', travel: 'Fly to Pune or Mumbai', idealDays: '3 – 4 days' },
    places: [
      place('Tiger’s Point', 'Lonavala', 'Valley views and waterfalls in the monsoon.'),
      place('Karla Caves', 'Lonavala', 'Ancient Buddhist rock-cut caves.'),
      place('Venna Lake', 'Mahabaleshwar', 'Boating and horse rides by the lake.'),
      place('Strawberry Farms', 'Panchgani', 'Pick fresh strawberries in season.'),
    ],
    packages: [],
  },
  {
    slug: 'odisha',
    country: 'Odisha',
    place: 'Puri & Konark',
    duration: { days: 4, nights: 3 },
    priceFrom: null,
    summary: 'The Jagannath temple, the stone chariot of Konark and the calm Chilika lake.',
    facts: { bestTime: 'Oct – Mar', entry: 'No permit needed', travel: 'Fly to Bhubaneswar', idealDays: '4 – 5 days' },
    places: [
      place('Jagannath Temple', 'Puri', 'One of the Char Dham pilgrimage sites.'),
      place('Konark Sun Temple', 'Konark', 'A UNESCO temple carved as a giant chariot.'),
      place('Chilika Lake', 'Satapada', 'Spot Irrawaddy dolphins and migratory birds.'),
      place('Puri Beach', 'Puri', 'Sand art and sunrise by the sea.'),
    ],
    packages: [],
  },
  {
    slug: 'arunachal',
    country: 'Arunachal Pradesh',
    place: 'Tawang',
    duration: { days: 7, nights: 6 },
    priceFrom: null,
    summary: 'High mountain passes, frozen lakes and the largest monastery in India, in the land of the dawn-lit mountains.',
    facts: { bestTime: 'Mar – Jun, Sep – Oct', entry: 'Inner Line Permit (we arrange it)', travel: 'Fly to Guwahati or Tezpur', idealDays: '7 – 8 days' },
    places: [
      place('Tawang Monastery', 'Tawang', 'The largest monastery in India.'),
      place('Sela Pass', 'West Kameng', 'A snow-covered pass with a sacred lake.'),
      place('Madhuri Lake', 'Tawang', 'A striking lake formed by an earthquake.'),
      place('Dirang', 'West Kameng', 'Hot springs, apple orchards and a quiet valley.'),
    ],
    packages: [],
  },
]

function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[’'.()]/g, '')
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function finish(list, region) {
  return list.map((d, i) => ({
    ...d,
    region,
    rank: i + 1,
    cover: d.cover || `/destinations/${d.slug}/cover.webp`,
    places: d.places.map((p) => ({ ...p, image: p.image || `/destinations/${d.slug}/${slugify(p.name)}.webp` })),
  }))
}

export const destinations = [...finish(international, 'international'), ...finish(domestic, 'domestic')]

export function getDestination(slug) {
  return destinations.find((d) => d.slug === slug)
}

export function destinationsByRegion(region) {
  return destinations.filter((d) => d.region === region)
}

export function isRegion(value) {
  return REGIONS.some((r) => r.id === value)
}

export function regionLabel(region) {
  return REGIONS.find((r) => r.id === region)?.label ?? ''
}

export function formatPrice(price) {
  return price ? `From ₹${price.toLocaleString('en-IN')}` : 'Price on request'
}

export function formatDuration(duration) {
  return duration ? `${duration.days}D / ${duration.nights}N` : ''
}

export function tripLine(d) {
  return [formatDuration(d.duration), formatPrice(d.priceFrom)].filter(Boolean).join(' · ')
}

export function tripName(d) {
  return d.country === d.place ? d.place : `${d.country} – ${d.place}`
}
