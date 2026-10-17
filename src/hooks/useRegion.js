import { useSearchParams } from 'react-router-dom'
import { isRegion } from '../data/destinations'
import { track } from '../utils/enquiry'

// International / Domestic choice kept in the URL (?region=domestic) so it
// survives links, refreshes and the back button.
export default function useRegion(source) {
  const [params, setParams] = useSearchParams()
  const value = params.get('region')
  const region = isRegion(value) ? value : 'international'

  function setRegion(next) {
    if (next === region) return
    track('region_switch', { region: next, source })
    setParams(
      (prev) => {
        const p = new URLSearchParams(prev)
        if (next === 'international') p.delete('region')
        else p.set('region', next)
        return p
      },
      { replace: true, preventScrollReset: true },
    )
  }

  return [region, setRegion]
}
