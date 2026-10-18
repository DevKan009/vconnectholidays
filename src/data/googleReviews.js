// Real 5-star reviews copied from the VConnect Holidays Google Business
// profile (Google Search / Maps), October 2026. Text is verbatim apart from
// removing Google's reaction counts and section labels. Avatars and photos
// are the reviewers' own uploads, saved under /public/reviews/<slug>/.
// Dates are approximate, converted from Google's "x months ago" labels.

export const googleBusiness = {
  rating: 5.0,
  reviewCount: 41,
  reviewsUrl:
    'https://www.google.com/search?q=Vconnect+holidays+Apollo+Premier+Indore#lrd=0x396302a97eaaaaab:0x1eb4b75ad2c2bf18,1',
  writeReviewUrl:
    'https://www.google.com/search?q=Vconnect+holidays+Apollo+Premier+Indore#lrd=0x396302a97eaaaaab:0x1eb4b75ad2c2bf18,3',
  mapsUrl: 'https://maps.google.com/?cid=2212594917656674072',
}

const review = (slug, name, meta, date, text, photoCount = 0) => ({
  slug,
  name,
  meta,
  date,
  text,
  avatar: `/reviews/${slug}/avatar.webp`,
  photos: Array.from({ length: photoCount }, (_, i) => `/reviews/${slug}/photo-${i + 1}.webp`),
})

export const googleReviews = [
  review(
    'archie-agrawal',
    'Archie Agrawal',
    '2 reviews · 7 photos',
    'Oct 2026',
    'This was my first experience with Vconnect but surely not the last. A very carefully crafted itinerary which was best suited for me and my family. Vanita mam gives a truly transparent experience for booking and travel without you needing to put much efforts. Thank you Vanita ji for making our Europe experience so memorable.',
    4,
  ),
  review(
    'kunika-patidar',
    'Kunika Patidar',
    'Local Guide · 11 reviews',
    '2024',
    'We thank Vconnect Holidays for providing an exceptional service in planning our trip to Switzerland and Italy. From start to finish, they ensured that every detail was precisely arranged to create an unforgettable experience. The itinerary was perfectly balanced between relaxation and adventure. They recommended a mix of iconic landmarks and off-the-beaten-path destinations, which made our trip both exciting and unique. The blend of Swiss alpine beauty and Italian cultural treasures was spot on.\n\nThe activities planned for us were well-organized and catered to our interests. From a scenic train ride through the Swiss Alps to a gondola ride, each experience was thoughtfully included.\nMrs. Vanita Parekh Jain and her team was highly responsive and attentive to our needs. The arrangements were seamless, and the experiences exceeded our expectations.\nOur honeymoon was truly magical, thanks to the meticulous planning and attention to detail provided by vconnect. We would highly recommend their services to anyone looking to create a memorable and well-organized trip.\n\nThank you, Vconnect! :)',
    5,
  ),
  review(
    'parag-palod',
    'Parag Palod',
    'Local Guide · 4 reviews',
    '2025',
    '"We recently returned from an incredible Dubai and Abu Dhabi 10 days trip organised by Vconnect Holidays. Their exceptional service, attention to details, and expertise made our journey truly unforgettable. From booking to departure, their team was responsive, helpful, and professional. We specially thanks Vanitaji and Ayanji for making our journey memorable"\n\nSeamless itinerary planning, considering our preferences and budget. Comfortable and clean hotel Accommodation with excellent amenities. Smooth transfers and guided tours starting from arrival to departure. Knowledgeable and friendly guides enhanced our experiences. Competitive pricing and inclusive packages.And Last but not the least they effortlessly managed last-minute changes in our plans, ensuring we didn\'t miss any activities on our itinerary\n\n"I highly recommend Vconnect Holiday for anyone planning a trip. Their dedication to customer satisfaction and passion for travel shines through in every aspect of their service."',
    6,
  ),
  review(
    'sankalp-jagetia',
    'Sankalp Jagetia',
    '4 reviews',
    'Oct 2026',
    'I booked a Bali trip with Vconnect Holidays in September and I was 100% satisfied. They stitch a detailed itinerary according to your preferences and interests. The cost of the whole trip was value for money too. Even if you have any hiccups during the trip, they are responsive and help you instantly. 10/10 recommended.',
  ),
  review(
    'gaurav-lohiya',
    'Gaurav Lohiya',
    '2 reviews · 5 photos',
    '2025',
    'Good tour company\nTrusted , reliable and a great team , “\nHave booked a couple of tour with them and always a great experience\n“Kruger National park “ you were amazing !!\nAnd recent hongkong\nDisney land was magical !!!',
    4,
  ),
  review(
    'anshul-shah',
    'Anshul Shah',
    '5 reviews',
    '2025',
    'We booked our Dubai family trip from Connect holidays. Everything was well planned, from hotels to transfers to sightseeing tickets. V connect team was very supportive through out the trip. We highly recommend VConnect holidays to anyone planning vacations. I would like to thank VConnect holidays for their fabulous service and Mr.Ayan choksey for his humble gesture and support.',
  ),
  review(
    'anuj-pareek',
    'Anuj Pareek',
    'Local Guide · 13 reviews',
    '2025',
    'After our successful trip to Gangtok and Ooty , we once again trusted our last minute travel saviour V Connect Holidays . This time it was Kerala ! 😍 wonderfully planned trip with well guided driver and top notch property recommendations. Kudos to the entire team of V Connect for delivering such a smooth and flawless experience.\nLooking forward to explore more and more\nCheers ✌️',
    2,
  ),
  review(
    'ashita-birla',
    'Ashita Birla',
    '3 reviews',
    '2024',
    'The day since I got in touch with Vanita & Team V connect, all my trips are planned by them. They customise the trip according to our need and provide ultimate services for all the amenities they provide and are awake midnight to take the calls if any problem arises. Vanita & her team is really very polite, very communicative and very professional with their work. The process of planning the trip, visa, travels and the entire itinerary is planned in such an amazing way that you enjoy your trip to the fullest. Team V connect I provide my sincere gratitude for an amazing service. I highly recommend everyone to plan there trip from Vanita & her team.',
  ),
  review(
    'uday-kunte',
    'Uday Kunte',
    '3 reviews · 4 photos',
    '2025',
    'It was very nice well organised and well planned and managed tour.\nWe should appreciate v-connect particularly Vinita for quick rescheduling tour during natural calamities.',
    4,
  ),
  review(
    'arushi-singh',
    'Arushi Singh',
    '3 reviews',
    '2025',
    'We recently had europe trio with them.\nHer work is excellent.\nAll the process from starting of planning to end of trip, she handles all…very promt response even at 2 at night,always available for you in another country.\nAll the stays were good and comfortable according to our need…\nAll went smooth\nWill suggest all to have a trip with them 👍',
  ),
  review(
    'gaurav-jhawar',
    'Gaurav Jhawar',
    '9 reviews · 10 photos',
    '2024',
    'Thanks team V Connect, our all stays, transportation was wonderful.\nWe explored Bali fullest.',
    4,
  ),
  review(
    'mayank-gupta',
    'Mayank Gupta',
    'Local Guide · 5 reviews',
    '2024',
    'I recently had the pleasure of booking my vacation through vconnect Holidays, and I am thrilled with the experience!\n\nDuring my trip, they provided excellent on-ground support. Their local partners were professional and reliable, enhancing my overall experience.\n\nI recommend Vconnect holidays to anyone looking for a trustworthy and dedicated travel partner.',
  ),
  review(
    'ronak-dafaria',
    'Ronak Dafaria',
    '5 reviews',
    'Jun 2026',
    'They prepare itnery accordingly to your need with cost effective,by maintaining quality and happiness of being out of your regular world\nWe are happy and satisfied that we got needful according to our package',
  ),
  review(
    'manish-kumar-kharmania',
    'Manish Kumar Kharmania',
    '1 review',
    'Feb 2026',
    'We had an awesome experience with VConnect Holidays i would refer indore people to concern them for any type of package as they provide the best of the best experience for any tour 🥰🥰🥰🥰🥰🥰🥰🥰😍',
  ),
]

// Review cards show this many of each reviewer's photos; the photo strip shows the rest.
export const CARD_PHOTOS = 3
