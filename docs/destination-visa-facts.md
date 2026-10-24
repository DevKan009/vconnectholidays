# Destination visa facts: check for Indian passport holders

The short "Visa" fact on each international destination page comes from `facts.entry` in
`src/data/destinations.js`. Each string below was checked against the current entry rule for
**Indian ordinary-passport holders travelling as tourists**.

- **Date checked:** 24 October 2026 (all rows)
- **Scope:** only `facts.entry` strings changed. No visa details or links were added to the pages.
  Domestic permit strings were not touched. The visa wording in the Switzerland, France and Nepal
  `summary` fields was checked and is still correct, so it was left as it was.
- **Sources:** official pages were read directly for the four changed rows (Royal Thai Embassy
  New Delhi, Sri Lanka eta.gov.lk notice, Immigration Malaysia visa list, Seychelles ICS visitor's
  permit page). For unchanged rows, the rule was confirmed through the *(secondary)* sources listed.
  The *(official)* link next to them is the government portal to use for the next recheck.

## Summary of changes

| Destination | Old string | New string |
|---|---|---|
| Thailand | Visa-free for short stays | Visa-free 30 days + TDAC form |
| Malaysia | Visa-free for short stays | Visa-free 30 days + MDAC form |
| Sri Lanka | ETA (online) | Free ETA (apply online) |
| Seychelles | Visitor permit on arrival | No visa; online travel authorisation |

The other 16 international destinations were checked and left unchanged.

## Watch list

- **Malaysia:** the visa exemption for Indians officially runs **until 31 December 2026**. If it is not
  extended, change the string to `e-Visa (we arrange it)` from 1 January 2027. Recheck in December 2026.
- **Thailand:** visa-free stays dropped from 60 to 30 days on 15 September 2026. Make sure any
  package copy or itineraries longer than 30 days reflect this.
- **UAE:** reports say UK visas may stop qualifying Indians for visa on arrival. This doesn't affect
  our string, since we arrange the e-Visa anyway.
- **Schengen (Switzerland, France):** ETIAS does not apply to Indians, who still need a Schengen visa.
  The EES biometric border registration is a border step, not a visa change.

## By destination

### UAE
| Old | New | Reason | Sources | Checked |
|---|---|---|---|---|
| e-Visa (we arrange it) | unchanged, verified | Indians need a tourist visa in advance (through an airline, hotel or licensed agent). Visa on arrival is only for holders of certain US/EU visas or residence permits. | https://www.business-standard.com/immigration/uae-changes-visa-rules-for-indians-who-can-still-get-visa-on-arrival-126070100476_1.html *(secondary)*; https://www.tribuneindia.com/news/business/uae-visa-on-arrival-policy-for-indians-changed-heres-who-still-qualifies-in-2026/ *(secondary)*; official: https://icp.gov.ae | 2026-10-24 |

### Thailand
| Old | New | Reason | Sources | Checked |
|---|---|---|---|---|
| Visa-free for short stays | Visa-free 30 days + TDAC form | Since 15 Sep 2026 Indians get 30 days visa-free (down from 60). The Royal Thai Embassy in New Delhi confirms this. The free online Thailand Digital Arrival Card (TDAC) is mandatory before arrival. | https://newdelhi.thaiembassy.org/en/page/visa (official); https://tdac.immigration.go.th (official TDAC portal); https://www.business-standard.com/immigration/thailand-changes-visa-free-rules-what-the-30-day-limit-means-for-indians-126092100653_1.html *(secondary)*; https://visasnews.com/en/thailand-to-officially-cut-visa-free-stay-to-30-days-on-september-15-2026/ *(secondary, cites Royal Gazette 31 Aug 2026)* | 2026-10-24 |

### Bali (Indonesia)
| Old | New | Reason | Sources | Checked |
|---|---|---|---|---|
| Visa on arrival | unchanged, verified | Indians get a 30-day visa on arrival, also available online in advance as an e-VOA. The free All Indonesia arrival card and the Bali tourist levy are separate formalities and don't change the visa type. | https://evisa.imigrasi.go.id (official); https://allindonesia.imigrasi.go.id (official arrival card); https://lovebali.baliprov.go.id (official levy) | 2026-10-24 |

### Singapore
| Old | New | Reason | Sources | Checked |
|---|---|---|---|---|
| e-Visa (we arrange it) | unchanged, verified | Indians need a visa, applied for through authorised agents and issued electronically. There is no visa on arrival. The free SG Arrival Card is separate. | https://www.ica.gov.sg/enter-transit-depart/entering-singapore/visa_requirements (official); https://visa2fly.com/blog/Singapore-Visa-for-ndians-2026 *(secondary)* | 2026-10-24 |

### Maldives
| Old | New | Reason | Sources | Checked |
|---|---|---|---|---|
| Free visa on arrival | unchanged, verified | All nationalities, Indians included, get a free 30-day tourist visa on arrival. The IMUGA traveller declaration (within 96 hours of travel) is a separate formality. | https://immigration.gov.mv (official); https://imuga.immigration.gov.mv (official IMUGA); https://visa2fly.com/blog/Maldives-Visa-for-Indians-2026 *(secondary)* | 2026-10-24 |

### Vietnam
| Old | New | Reason | Sources | Checked |
|---|---|---|---|---|
| e-Visa (we arrange it) | unchanged, verified | No general visa exemption for Indians. The 90-day e-visa from evisa.gov.vn is the standard route. A Phu Quoc-only exemption exists but doesn't cover our itineraries. | https://evisa.gov.vn (official); https://blog.wego.com/vietnam-visa-indian-citizens-2026/ *(secondary)* | 2026-10-24 |

### Switzerland
| Old | New | Reason | Sources | Checked |
|---|---|---|---|---|
| Schengen visa (we arrange it) | unchanged, verified | Indians still need a Schengen short-stay visa. ETIAS does not apply to visa-required nationals. The `summary` sentence ("we take care of the Schengen visa for you") is still correct. | https://www.sem.admin.ch/sem/en/home/themen/einreise.html (official); https://visa2fly.com/blog/New-Schengen-Visa-Rules-for-Indians-in-2026 *(secondary)* | 2026-10-24 |

### Malaysia
| Old | New | Reason | Sources | Checked |
|---|---|---|---|---|
| Visa-free for short stays | Visa-free 30 days + MDAC form | Indians can stay up to 30 days visa-free (air entry) under an exemption that Immigration Malaysia lists as valid "until 31st December 2026". The Malaysia Digital Arrival Card (MDAC) is mandatory for non-exempt foreigners (Indians are not exempt) within 3 days before arrival. **Recheck in December 2026.** | https://www.imi.gov.my/index.php/en/main-services/visa/visa-requirement-by-country/ (official); https://imigresen-online.imi.gov.my/mdac/main (official MDAC); https://en.wikipedia.org/wiki/Malaysia_Digital_Arrival_Card *(secondary, exemption list)* | 2026-10-24 |

### Sri Lanka
| Old | New | Reason | Sources | Checked |
|---|---|---|---|---|
| ETA (online) | Free ETA (apply online) | Since 25 May 2026 India is one of 40 countries whose nationals get a free 30-day tourist ETA. An ETA must still be obtained online before arrival. | https://www.eta.gov.lk/slvisa/ (official notice); https://blog.wego.com/sri-lanka-free-visa-for-indians-entry-rules-eta-guide-and-travel-tips/ *(secondary)* | 2026-10-24 |

### France
| Old | New | Reason | Sources | Checked |
|---|---|---|---|---|
| Schengen visa (we arrange it) | unchanged, verified | Same Schengen rule as Switzerland. The `summary` ("pairs beautifully with Switzerland on one Schengen visa") is still correct. | https://france-visas.gouv.fr (official) | 2026-10-24 |

### Turkey
| Old | New | Reason | Sources | Checked |
|---|---|---|---|---|
| Visa required (we arrange it) | unchanged, verified | No visa on arrival. The e-Visa is open only to Indians who hold a valid US/UK/Schengen/Irish visa or residence permit. Everyone else needs a sticker visa. | https://www.evisa.gov.tr (official); https://visa2fly.com/blog/Turkey-Visa-for-Indians *(secondary)* | 2026-10-24 |

### United Kingdom
| Old | New | Reason | Sources | Checked |
|---|---|---|---|---|
| UK visitor visa (we arrange it) | unchanged, verified | Indians need a Standard Visitor visa. The UK ETA scheme does not apply to visa nationals such as Indians. | https://www.gov.uk/standard-visitor (official); https://www.businesstoday.in/amp/nri/visa/story/explained-uks-new-eta-rule-for-travellers-what-changes-from-2026-and-why-indians-are-unaffected-503478-2025-11-24 *(secondary)* | 2026-10-24 |

### Japan
| Old | New | Reason | Sources | Checked |
|---|---|---|---|---|
| e-Visa (we arrange it) | unchanged, verified | Single-entry tourist eVISA (up to 90 days, air entry) is available to Indians. Applications from India are lodged through the embassy's VFS channel and the visa is issued digitally. | https://www.mofa.go.jp/j_info/visit/visa/visaonline.html (official); https://www.businesstoday.in/amp/nri/visa/story/planning-to-visit-japan-in-2026-evisa-eligibility-documents-fees-what-travellers-must-know-511416-2026-01-19 *(secondary)* | 2026-10-24 |

### Nepal
| Old | New | Reason | Sources | Checked |
|---|---|---|---|---|
| No visa needed | unchanged, verified | Indians enter visa-free (1950 treaty) with a passport or voter ID. The `summary` ("no visa needed for Indian travellers") is still correct. | https://www.indembkathmandu.gov.in (official, Embassy of India Kathmandu); https://godigit.com/international-travel-insurance/visa/nepal-visa-for-indians *(secondary)* | 2026-10-24 |

### Bhutan
| Old | New | Reason | Sources | Checked |
|---|---|---|---|---|
| No visa; entry permit (we arrange it) | unchanged, verified | Indians need no visa but get an entry permit (online or at entry) and pay an SDF of ₹1,200 per person per night. | https://www.bhutan.travel (official, Dept. of Tourism); https://www.godigit.com/international-travel-insurance/visa/bhutan-visa-for-indians *(secondary)* | 2026-10-24 |

### Mauritius
| Old | New | Reason | Sources | Checked |
|---|---|---|---|---|
| Free visa on arrival | unchanged, verified | Indians need no advance visa. A free entry permit/visa is granted on arrival for tourism. Sources differ on the length (60 vs 90 days), which our string doesn't state. | https://passport.govmu.org (official, Passport & Immigration Office); https://blog.wego.com/mauritius-visa-from-india/ *(secondary)* | 2026-10-24 |

### Seychelles
| Old | New | Reason | Sources | Checked |
|---|---|---|---|---|
| Visitor permit on arrival | No visa; online travel authorisation | No visa is needed and a free Visitor's Permit is still issued on arrival, but every visitor must first get a paid online Travel Authorisation (about €10). Airlines check it at check-in, so the old string left out a mandatory pre-travel step. | https://www.ics.gov.sc/permits/visitors-permit (official, visitor's permit); https://seychelles.govtas.com (official TA portal); https://airseychelles.com/en/node/5647 *(airline)*; https://www.travel.state.gov/content/travel/en/international-travel/International-Travel-Country-Information-Pages/Seychelles.html *(US govt)* | 2026-10-24 |

### South Korea
| Old | New | Reason | Sources | Checked |
|---|---|---|---|---|
| Visa required (we arrange it) | unchanged, verified | India is not visa-exempt, so K-ETA does not apply. Indians need a C-3-9 visitor visa applied for in advance. | https://www.visa.go.kr (official); https://www.goodreturns.in/classroom/south-korea-visa-for-indians-2026-k-eta-rules-and-entry-requirements-011-1511893.html *(secondary)* | 2026-10-24 |

### Australia
| Old | New | Reason | Sources | Checked |
|---|---|---|---|---|
| Visitor visa (we arrange it) | unchanged, verified | Indians can't use the ETA (601) or eVisitor (651). The Visitor visa (subclass 600) is the route. | https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/visitor-600 (official); https://happyfares.in/blog/australia-visa-for-indians-2026-complete-guide/ *(secondary)* | 2026-10-24 |

### Azerbaijan
| Old | New | Reason | Sources | Checked |
|---|---|---|---|---|
| e-Visa (we arrange it) | unchanged, verified | No visa on arrival. Indians use the ASAN e-visa (single entry, up to 30 days, air entry). | https://evisa.gov.az (official); https://blog.wego.com/azerbaijan-visa-for-indians/ *(secondary)* | 2026-10-24 |
