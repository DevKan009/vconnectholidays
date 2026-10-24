import { useEffect } from 'react'
import { DEFAULT_DESCRIPTION, formatTitle } from '../data/seo'

// Sets the title and description after navigation. The first load already has
// them in the HTML (scripts/prerender-meta.mjs); this keeps them right as the
// visitor moves around. Accepts (title, description) or a PAGE_META entry.
export default function usePageTitle(titleOrMeta, descriptionArg) {
  const isMeta = titleOrMeta && typeof titleOrMeta === 'object'
  const title = isMeta ? titleOrMeta.title : titleOrMeta
  const description = isMeta ? titleOrMeta.description : descriptionArg

  useEffect(() => {
    document.title = formatTitle(title)
  }, [title])

  useEffect(() => {
    const meta = document.querySelector('meta[name="description"]')
    if (!meta) return
    meta.setAttribute('content', description || DEFAULT_DESCRIPTION)
  }, [description])
}
