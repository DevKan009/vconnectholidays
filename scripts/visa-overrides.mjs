// Hand edits applied after normalize-visa-data.mjs, for pages whose reference
// text can't be cleaned by rules alone. Every change is logged.

export function applyOverrides({ eVisas, visas, note }) {
  const find = (list, slug) => list.find((v) => v.slug === slug)

  // Sri Lanka e-visa: after the COVID steps are dropped, keep the one step that still applies.
  const lk = find(eVisas, 'sri-lanka')
  if (lk) {
    for (const s of lk.sections) {
      s.items = s.items.filter((t) => !/^step 2/i.test(t))
    }
    lk.sections[0]?.items.push('Online ETA application through the official portal (eta.gov.lk)')
    lk.facts.processing ??= '3–4 working days'
    note('sri-lanka', 'corrected', {
      from: 'Step 2: Apply for Tourist ETA through the official ETA portal www.eta.gov.lk …',
      to: 'Online ETA application through the official portal (eta.gov.lk)',
      why: 'Quarantine "steps" removed with the COVID rules; the ETA itself still applies',
    })
  }

  // Dubai: "K.B VISA" is unexplained agent shorthand.
  const ae = find(eVisas, 'uae')
  if (ae) {
    const before = ae.options.length
    ae.options = ae.options.filter((t) => !/k\.?\s?b\.? visa/i.test(t))
    if (ae.options.length !== before) note('uae', 'dropped', { text: '30 DAYS SINGLE ENTRY K.B VISA', why: 'Unexplained agent shorthand; not a visa type a traveller can choose' })
  }

  // Saudi Arabia: the Umrah block is a garbled numbered list on the reference page.
  const sa = find(eVisas, 'saudi-arabia')
  if (sa) {
    const umrah = sa.sections.find((s) => s.title === 'Umrah')
    if (umrah) {
      const from = umrah.items.join(' | ')
      umrah.items = [
        'E-visa',
        'Airport transfers both ways (groups only)',
        'Mecca to Medina transfer by coach (groups only)',
        'Ziyarat in Mecca and Medina by coach (groups only)',
        'Insurance',
        'Group rates need a minimum of 35 travellers',
        'Individual travellers get the visa and insurance only, without transport or ziyarat',
        '90 days validity and 90 days stay',
      ]
      umrah.title = 'Umrah (groups & individuals)'
      note('saudi-arabia', 'corrected', { from, to: umrah.items.join(' | '), why: 'Numbering and run-together lines on the reference page untangled' })
    }
  }

  // South Africa: the reference lists form sections, not documents.
  const za = find(eVisas, 'south-africa')
  if (za && za.sections[0]) {
    za.sections[0].title = 'Application form sections'
    za.sections[0].id = 'application-form-sections'
    za.sections[0].notes.unshift('The online form asks for the following details. Keep them ready before you apply.')
  }

  // Malaysia: one combined list for tourist, family-visit and business e-visas.
  const my = find(eVisas, 'malaysia')
  if (my && my.sections[0]) {
    Object.assign(my.sections[0], { id: 'tourist-family-business', title: 'Tourist, family visit & business' })
    my.sections[0].notes.unshift('30-day single-entry e-visa. Multiple-entry e-visas are not available yet.')
    my.facts.stay ??= '30 days'
    my.facts.entries ??= 'Single'
  }

  // Turkey: the reference packs validity, stay and entries into one line.
  const tr = find(eVisas, 'turkey')
  if (tr) Object.assign(tr.facts, { validity: '90 days', stay: '30 days', entries: 'Single' })

  // USA: the reference list reads like a Schengen template (no DS-160 or interview).
  const us = find(visas, 'usa')
  if (us) {
    for (const s of us.sections) s.notes.unshift('Includes the online DS-160 form and an in-person interview at the US consulate; our team books the appointment.')
    note('usa', 'factChecked', {
      text: 'USA Tourist / Business visa requirement lists',
      result: 'Kept as on the reference site, with a note added about the DS-160 form and interview. NEEDS CLIENT REVIEW: the reference list appears copied from a Schengen template',
      source: 'https://travel.state.gov/content/travel/en/us-visas/tourism-visit/visitor.html',
    })
  }

  // Qatar: the reference page repeats the Armenian embassy's address.
  const qa = find(eVisas, 'qatar')
  if (qa && qa.embassy.some((e) => /Armenia Street/.test(e))) {
    note('qatar', 'dropped', { text: qa.embassy.join(' '), why: 'Wrong address: it is the Embassy of Armenia, copied from the Armenia page' })
    qa.embassy = []
  }

  // Ethiopia/East Africa list "Ethiopian Birr" against East Africa, plus a stray "Rupee".
  const ea = find(eVisas, 'east-africa')
  if (ea) {
    note('east-africa', 'corrected', { from: `Currency: ${ea.currency}`, to: 'Currency: Kenyan, Ugandan and Rwandan currencies', why: 'East Africa Tourist Visa covers Kenya, Uganda and Rwanda; reference showed Ethiopian Birr / Rupee' })
    ea.currency = 'Kenyan shilling, Ugandan shilling, Rwandan franc'
  }
}
