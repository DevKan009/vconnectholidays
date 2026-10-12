#!/bin/bash
set -e
cd "$(dirname "$0")/../src/assets/images"

declare -A files=(
  ["logo-white.png"]="https://vconnectholidays.com/wp-content/uploads/2025/06/cropped-V-Connect-Logo-white-scaled-1.png"
  ["logo-footer.png"]="https://vconnectholidays.com/wp-content/uploads/2025/05/Logo-2.png"

  ["hero-riga.jpg"]="https://vconnectholidays.com/wp-content/uploads/2025/09/aerial-shot-beautiful-city-riga-latvia-winter-scaled.jpg"
  ["hero-heritage.png"]="https://vconnectholidays.com/wp-content/uploads/2025/09/view-world-monument-celebrate-world-heritage-day-scaled.png"
  ["hero-nyc.jpg"]="https://vconnectholidays.com/wp-content/uploads/2025/09/new-york-cityscape-scaled.jpg"

  ["dest-abu-dhabi.avif"]="https://vconnectholidays.com/wp-content/uploads/2025/07/ABU-DHABI-.avif"
  ["dest-vietnam.webp"]="https://vconnectholidays.com/wp-content/uploads/2025/07/VIETNAM.webp"
  ["dest-sri-lanka.jpg"]="https://vconnectholidays.com/wp-content/uploads/2025/07/SRI-LANKA-.jpg"
  ["dest-finland.webp"]="https://vconnectholidays.com/wp-content/uploads/2025/07/FINLAND.webp"
  ["dest-switzerland.webp"]="https://vconnectholidays.com/wp-content/uploads/2025/07/SWITZERLAND.webp"
  ["dest-fiji.jpg"]="https://vconnectholidays.com/wp-content/uploads/2025/07/FIJI-ISLAND.jpg"

  ["pkg-bali.jpeg"]="https://vconnectholidays.com/wp-content/uploads/2025/09/Bali-Indonesia.jpeg"
  ["pkg-abu-dhabi.jpeg"]="https://vconnectholidays.com/wp-content/uploads/2025/09/Abu-Dhabi.jpeg"
  ["pkg-singapore.jpg"]="https://vconnectholidays.com/wp-content/uploads/2025/05/singapore-merlion-park-downtown-singapore-business-district-1.jpg"
  ["pkg-thailand.jpeg"]="https://vconnectholidays.com/wp-content/uploads/2025/09/Phi-Phi-islands-Thailand.jpeg"
  ["pkg-phuket.jpeg"]="https://vconnectholidays.com/wp-content/uploads/2025/09/download.jpeg"
  ["pkg-seychelles.jpeg"]="https://vconnectholidays.com/wp-content/uploads/2025/09/Seychelles.jpeg"
  ["pkg-south-korea.jpg"]="https://vconnectholidays.com/wp-content/uploads/2025/09/korea-scaled.jpg"

  ["about-img1.jpeg"]="https://vconnectholidays.com/wp-content/uploads/2025/06/WhatsApp-Image-2025-06-07-at-9.52.25-PM-e1749551674579.jpeg"
  ["about-img2.jpeg"]="https://vconnectholidays.com/wp-content/uploads/2025/06/WhatsApp-Image-2025-06-04-at-3.25.35-PM-1-e1749547561624.jpeg"

  ["testi-mohak.jpeg"]="https://vconnectholidays.com/wp-content/uploads/2025/07/WhatsApp-Image-2025-07-09-at-5.35.13-PM-scaled-e1752146613834.jpeg"
  ["testi-generic-woman.jpg"]="https://vconnectholidays.com/wp-content/uploads/2025/05/women-casual-jeans-hat-girl-freedom-simplicity-concept.jpg"
  ["testi-fff.avif"]="https://vconnectholidays.com/wp-content/uploads/2025/07/fff-e1752567772494.avif"

  ["gallery-1.jpg"]="https://vconnectholidays.com/wp-content/uploads/2025/07/We-are-proud-to-be-the-reason-behind-their-happiness.jpg"
  ["gallery-2.jpg"]="https://vconnectholidays.com/wp-content/uploads/2025/07/WhatsApp-Image-2025-07-11-at-11.23.30_15f4d8f7.jpg"
  ["gallery-3.jpg"]="https://vconnectholidays.com/wp-content/uploads/2025/07/What-all-divers-should-remember-is-that-SCUBA-diving-is-a-fun-exploration-of-life.-When-you-dive-don.jpg"
  ["gallery-4.jpg"]="https://vconnectholidays.com/wp-content/uploads/2025/07/We-are-proud-to-be-the-reason-behind-their-happiness-a.jpg"
  ["gallery-5.jpg"]="https://vconnectholidays.com/wp-content/uploads/2025/07/Successfully-done-1st-corporate-tour-by-vconnectHappy-client-is-the-key-to-success-.-world-phuket-.jpg"

  ["team-1.jpg"]="https://vconnectholidays.com/wp-content/uploads/2025/05/Team-7.jpg"
  ["team-2.jpg"]="https://vconnectholidays.com/wp-content/uploads/2025/05/Team-6.jpg"
  ["team-3.jpg"]="https://vconnectholidays.com/wp-content/uploads/2025/05/Team-5.jpg"
  ["team-4.jpg"]="https://vconnectholidays.com/wp-content/uploads/2025/05/Team-4.jpg"

  ["about-banner.jpg"]="https://vconnectholidays.com/wp-content/uploads/2025/07/aa-3.jpg"
  ["about-benefit-bg.jpg"]="https://vconnectholidays.com/wp-content/uploads/2025/05/young-beautiful-woman-walking-on-campuhan-ridge-way-of-artists-in-bali-ubud.jpg"

  ["page-banner-default.jpg"]="https://vconnectholidays.com/wp-content/uploads/2025/05/nayarit-beach.jpg"
  ["tourpackages-banner.jpg"]="https://vconnectholidays.com/wp-content/uploads/2025/09/fijji-island-scaled.jpg"

  ["testi-sunil-bg.jpg"]="https://vconnectholidays.com/wp-content/uploads/2025/07/aa.jpg"
  ["testi-lucy-bg.avif"]="https://vconnectholidays.com/wp-content/uploads/2025/07/aa.avif"
)

for name in "${!files[@]}"; do
  url="${files[$name]}"
  echo "Downloading $name <- $url"
  curl -sL -A "Mozilla/5.0" -o "$name" "$url" || echo "FAILED: $name"
done

echo "Done. Files:"
ls -la
