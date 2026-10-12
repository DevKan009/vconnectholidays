import { useEffect } from 'react'

const SITE_NAME = 'Vconnect Holidays'

export default function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} – ${SITE_NAME}` : `${SITE_NAME} – Holidays | Airtickets | Visas | Honeymoon trips`
  }, [title])
}
