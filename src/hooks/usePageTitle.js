import { useEffect } from 'react'

const SITE_NAME = 'Vconnect Holidays'
const DEFAULT_DESCRIPTION =
  'VConnect Holidays - Holidays | Airtickets | Visas | Honeymoon trips. Trusted travel specialists crafting bespoke domestic and international vacations since 2018.'

export default function usePageTitle(title, description) {
  useEffect(() => {
    document.title = title ? `${title} – ${SITE_NAME}` : `${SITE_NAME} – Holidays | Airtickets | Visas | Honeymoon trips`
  }, [title])

  useEffect(() => {
    const meta = document.querySelector('meta[name="description"]')
    if (!meta) return
    meta.setAttribute('content', description || DEFAULT_DESCRIPTION)
  }, [description])
}
