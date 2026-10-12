import destAbuDhabi from '../assets/images/dest-abu-dhabi.avif'
import destVietnam from '../assets/images/dest-vietnam.webp'
import destSriLanka from '../assets/images/dest-sri-lanka.jpg'
import destFinland from '../assets/images/dest-finland.webp'
import destSwitzerland from '../assets/images/dest-switzerland.webp'
import destFiji from '../assets/images/dest-fiji.jpg'

import pkgBali from '../assets/images/pkg-bali.jpeg'
import pkgAbuDhabi from '../assets/images/pkg-abu-dhabi.jpeg'
import pkgSingapore from '../assets/images/pkg-singapore.jpg'
import pkgThailand from '../assets/images/pkg-thailand.jpeg'
import pkgPhuket from '../assets/images/pkg-phuket.jpeg'
import pkgSeychelles from '../assets/images/pkg-seychelles.jpeg'
import pkgSouthKorea from '../assets/images/pkg-south-korea.jpg'

import testiShachi from '../assets/images/about-img2.jpeg'
import testiPrakhar from '../assets/images/about-img1.jpeg'
import testiMohak from '../assets/images/testi-mohak.jpeg'
import testiSunil from '../assets/images/testi-fff.avif'
import testiLucy from '../assets/images/testi-generic-woman.jpg'
import testiAnanya from '../assets/images/testi-ananya.jpg'
import testiRahul from '../assets/images/testi-rahul.jpg'
import testiRajesh from '../assets/images/testi-rajesh.jpg'

import gallery1 from '../assets/images/gallery-1.jpg'
import gallery2 from '../assets/images/gallery-2.jpg'
import gallery3 from '../assets/images/gallery-3.jpg'
import gallery4 from '../assets/images/gallery-4.jpg'
import gallery5 from '../assets/images/gallery-5.jpg'

import team1 from '../assets/images/team-1.jpg'
import team2 from '../assets/images/team-2.jpg'
import team3 from '../assets/images/team-3.jpg'
import team4 from '../assets/images/team-4.jpg'

// Homepage "Discover Your Next Dream Destination" cards.
export const homeDestinations = [
  { title: 'Abu Dhabi', subtitle: 'Middle East', image: destAbuDhabi },
  { title: 'Vietnam', subtitle: 'Southeast Asia', image: destVietnam },
  { title: 'Sri Lanka', subtitle: 'South Asia', image: destSriLanka },
  { title: 'Finland', subtitle: 'Northern Europe', image: destFinland },
  { title: 'Switzerland', subtitle: 'Europe', image: destSwitzerland },
  { title: 'Fiji Island', subtitle: 'South Pacific Ocean', image: destFiji },
]

// Destination list page cards (distinct subtitles from the homepage set).
export const destinationList = [
  { title: 'Abu Dhabi', subtitle: 'UAE', image: destAbuDhabi },
  { title: 'Vietnam', subtitle: "Let's explore Southeast Asia", image: destVietnam },
  { title: 'Sri Lanka', subtitle: 'South Asia', image: destSriLanka },
  { title: 'Finland', subtitle: "Let's go Scandinavia", image: destFinland },
  { title: 'Switzerland', subtitle: "It's time for Europe", image: destSwitzerland },
  { title: 'Fiji Island', subtitle: "Let's plan your holiday for an island nation", image: destFiji },
]

export const homePackages = [
  {
    title: 'Bali',
    subtitle: 'Bali - 06 Nights,07 Days',
    cost: 'Package cost : INR 83500 per head.',
    duration: '7 Days 6 Night',
    image: pkgBali,
  },
  {
    title: 'Abu Dhabi',
    subtitle: 'Abu Dhabi - 04 Nights, 05 Days',
    cost: 'Connect for Package',
    duration: '5 Days 4 Night',
    image: pkgAbuDhabi,
  },
  {
    title: 'Singapore',
    subtitle: 'Singapore - 04 Nights, 05 Days',
    cost: 'Connect for Package',
    duration: '5 Days 4 Night',
    image: pkgSingapore,
  },
  {
    title: 'Thailand',
    subtitle: 'Thailand - 6 Nights, 7 Days',
    cost: 'Connect for Package',
    duration: '7 Days 6 Night',
    image: pkgThailand,
  },
  {
    title: 'Thailand',
    subtitle: 'Phuket & Krabi',
    cost: 'Package Cost INR 42,999',
    duration: 'Connect for Package details*',
    image: pkgPhuket,
  },
  {
    title: 'Seychelles',
    subtitle: 'Seychelles - 6 Nights, 7 Days',
    cost: 'Connect for Package',
    duration: '7 Days 6 Night',
    image: pkgSeychelles,
  },
  {
    title: 'South Korea',
    subtitle: '4 Days Tour Exploring Temples In Korea',
    cost: 'Connect for Package',
    duration: '4 Days 3 Night',
    image: pkgSouthKorea,
  },
]

export const tourPackages = [
  { title: 'Vietnam', subtitle: '7 Days Holiday In Vietnam', price: 'From : RS. 1,01,000', duration: '7 Days 6 Night', image: destVietnam },
  { title: 'Thailand', subtitle: '7 Days Holiday In Thailand', price: 'From : Rs. 78,300', duration: '6 Days 5 Night', image: pkgPhuket },
  { title: 'Singapore', subtitle: 'Explore Singapore 7-Day Tour', price: 'From : Rs. 97,800', duration: '7 Days 6 Night', image: pkgSingapore },
  { title: 'Indonesia', subtitle: '7 - Days Tour Exploring Bali', price: 'From : Rs. 79,000', duration: '7 Days 6 Night', image: pkgBali },
  { title: 'UAE', subtitle: '5 Days Holiday & Tour Abu Dhabi', price: 'From : Rs. 76,000', duration: '5 Days 4 Night', image: pkgAbuDhabi },
  { title: 'Sri Lanka', subtitle: '6 Days To Explore Sri Lanka', price: 'From : Rs. 71,800', duration: '6 Days 5 Night', image: destSriLanka },
  { title: 'France', subtitle: '8 Days Tour Exploring Paris & Swiss', price: 'From : Rs. 1,64,650', duration: '8 Days 7 Night', image: destSwitzerland },
  { title: 'Europe', subtitle: '5 Days Holiday To Golden Triangle Of Europe', price: 'From : Rs. 1,18,700', duration: '8 Days 7 Night', image: destFinland },
]

export const testimonials = {
  shachi: {
    name: 'Shachi & Samyak',
    role: 'Honeymoon Travelers',
    image: testiShachi,
    quote:
      'Our honeymoon in Bali was absolutely magical, all thanks to Vanita Di, Gurbani, and the amazing team! Everything was perfectly planned—flights, hotel bookings, a beautiful itinerary, and stunning properties. The transfers were seamless, and your prompt support throughout made the entire trip completely stress-free. Thank you so much for making our honeymoon so memorable!',
  },
  ananya: {
    name: 'Ananya Sharma',
    role: 'Solo & Leisure Traveler',
    image: testiAnanya,
    quote:
      'Traveling solo to Vietnam felt daunting at first, but VConnect Holidays planned everything down to the finest detail. From private airport pickups to boutique heritage stays in Hanoi and the Halong Bay cruise, every detail was handled flawlessly. Having 24/7 on-trip assistance gave me complete peace of mind throughout my trip.',
  },
  rahul: {
    name: 'Rahul & Sneha Kapoor',
    role: 'Honeymoon Travelers',
    image: testiRahul,
    quote:
      'Our Seychelles getaway was pure paradise! The beach villa recommendations, private island catamaran cruise, and candle-lit sunset dining arrangements exceeded all expectations. Everything went smoothly without a single hiccup. Thank you for making our honeymoon truly extraordinary!',
  },
  rajesh: {
    name: 'Rajesh Singhal',
    role: 'Family Vacation',
    image: testiRajesh,
    quote:
      'We booked a 7-day UAE tour for our entire extended family, from grandparents to toddlers. The team arranged spacious private vehicles, skip-the-line passes for attractions in Abu Dhabi and Dubai, and comfortable pacing that suited everyone. Highly professional and dependable!',
  },
  prakhar: {
    name: 'Prakhar Agarwal',
    role: 'Family Traveler',
    image: testiPrakhar,
    quote:
      'This was the perfect Europe vacation for our family! The itinerary was balanced with fun activities for the kids and relaxation for us. The hotel choices were fantastic, with amenities to keep everyone happy. We’re already planning our next trip!',
  },
  mohak: {
    name: 'Mohak & Aashi',
    role: 'Couples Vacation',
    image: testiMohak,
    quote:
      'I just wanted to extend my heartfelt thanks for planning such a wonderful trip to Switzerland and Italy for us. Every detail—from the accommodations to the tours, transfers, and local experiences—was perfectly arranged, and it made our journey truly seamless and memorable. Switzerland’s breathtaking landscapes and Italy’s rich culture and cuisine were brought to life thanks to your thoughtful planning and recommendations.',
  },
  kavita: {
    name: 'Dr. Kavita & Vikram Mehta',
    role: 'Anniversary Trip',
    image: testiLucy,
    quote:
      'We had only two weeks to plan our 10th anniversary trip to Finland and Scandinavia. VConnect Holidays expedited our visas effortlessly and booked us into the most magical glass igloo in Rovaniemi. Watching the Northern Lights from our bed was a dream fulfilled!',
  },
  sunil: {
    name: 'Sunil Shrivastav',
    role: 'Corporate & Leisure Traveler',
    image: testiSunil,
    quote:
      'Planning corporate retreats and international travel is usually a hassle, but this time it was seamless. The team organized everything from flights to meeting rooms and weekend city excursions, leaving me free to focus on work. Exceptional service!',
  },
  lucy: {
    name: 'Lucy Anderson',
    role: 'Adventure Enthusiast',
    image: testiLucy,
    quote:
      'What an adrenaline rush! From zip-lining through the rainforest to white-water rafting, this adventure package was amazing. The guides were friendly, certified, and very knowledgeable about the local culture and wildlife!',
  },
}

export const homeTestimonials = [
  testimonials.shachi,
  testimonials.ananya,
  testimonials.rahul,
  testimonials.rajesh,
  testimonials.prakhar,
  testimonials.mohak,
  testimonials.kavita,
  testimonials.sunil,
  testimonials.lucy,
]

export const packagesTestimonials = [
  testimonials.rahul,
  testimonials.ananya,
  testimonials.rajesh,
  testimonials.shachi,
  testimonials.prakhar,
  testimonials.mohak,
  testimonials.kavita,
  testimonials.sunil,
  testimonials.lucy,
]

export const homeFaqs = [
  {
    q: 'Why should I book with VConnect Holidays instead of booking online myself?',
    a: 'While online portals offer options, we offer peace of mind and expertise. With us, you get a dedicated travel expert who customizes your trip to your preferences, handles all the complex logistics, and provides 24/7 on-trip support. We save you time, prevent common travel mistakes, and often have access to better deals and arrangements.',
  },
  {
    q: 'What types of holiday packages do you offer?',
    a: 'We offer a wide range of packages to suit every traveler, including romantic honeymoon getaways, fun-filled family vacations, adventurous trips, relaxing beach holidays, cultural tours, and more. We specialize in destinations across India like Himachal, Kerala, and Goa, as well as international hotspots like Dubai, Maldives, Thailand, and Europe.',
  },
  {
    q: 'Can you create a custom tour package for me?',
    a: 'Absolutely! Customization is our specialty. If you have a specific destination or travel plan in mind, our experts will work with you to design a tailor-made itinerary that fits your interests, timeline, and budget perfectly.',
  },
  {
    q: 'What if I face an issue during my trip? Is there someone I can contact?',
    a: 'Yes! When you book with us, you are never alone. You will be provided with a dedicated contact number for our on-trip support team, which is available 24/7 to assist you with any emergencies or issues you may face during your vacation.',
  },
  {
    q: 'When will I receive my flight tickets, hotel vouchers, and other travel documents?',
    a: 'You will receive all your travel documents, including e-tickets, hotel confirmation vouchers, and a detailed day-by-day itinerary, via email well before your departure date, typically after the final payment has been cleared.',
  },
]

export const gallery = [
  { src: testiShachi, tall: false },
  { src: testiMohak, tall: true },
  { src: testiPrakhar, tall: true },
  { src: gallery1, tall: false },
  { src: gallery2, tall: false },
  { src: gallery3, tall: true },
  { src: gallery4, tall: true },
  { src: gallery5, tall: false },
]

export const team = [
  { name: 'Damian Stevens', image: team1 },
  { name: 'Nadia Ingram', image: team2 },
  { name: 'Mark Sherman', image: team3 },
  { name: 'Ivory Malcom', image: team4 },
]

export const aboutFaqTabs = ['Travel', 'Places', 'Booking & Refund', 'Transportation Facilities']

export const whyChooseUs = [
  {
    icon: 'user',
    title: 'Expert Guidance',
    text: 'Our experienced travel experts ensure every detail of your trip is perfect.',
  },
  {
    icon: 'money',
    title: 'Best Price Guarantee',
    text: 'We offer value-for-money packages without compromising on quality.',
  },
  {
    icon: 'globe',
    title: 'Sustainable Travel Practices',
    text: 'We support eco-friendly tourism to preserve the environment & local communities.',
  },
]

export const aboutBenefits = [
  {
    icon: 'plan',
    title: 'Expert Travel Planning',
    text: "We design itineraries tailored to clients' preferences and budget.",
  },
  {
    icon: 'globe',
    title: 'Diverse Destinations',
    text: 'many destinations around the world that you can visit.',
  },
  {
    icon: 'booking',
    title: 'Seamless Booking',
    text: 'We will help make sure your travel reservation goes smoothly.',
  },
  {
    icon: 'guide',
    title: 'Best Travel Guide',
    text: 'Our expert guides will ensure your every trip is perfect.',
  },
]

export const stats = {
  travellers: 25,
  destinations: 100,
  years: 7,
}

export const aboutStats = {
  travellers: 25,
  destinations: 100,
  years: 7,
}

export const contactInfo = {
  address: '408, Apollo Premier, Vijay Nagar Square, Indore',
  email: 'Vanita@Vconnectholidays.Com',
  phones: ['73540 46384', '93990 90152'],
}
