import { useEffect } from 'react'

export interface SeoProps {
  title:       string
  description?: string
  image?:      string
  icon?:       string            // ← URL do favicon para esta rota
  [key: string]: string | undefined
}

export default function useSeo({
  title,
  description,
  image,
  icon,
  ...rest
}: SeoProps) {
  useEffect(() => {
    // 1) <title>
    document.title = title

    // 2) <meta name="description">
    if (description) {
      let tag = document.querySelector<HTMLMetaElement>("meta[name='description']")
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('name','description')
        document.head.appendChild(tag)
      }
      tag.content = description
    }

    // 3) <meta property="og:image">
    if (image) {
      let tag = document.querySelector<HTMLMetaElement>("meta[property='og:image']")
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('property','og:image')
        document.head.appendChild(tag)
      }
      tag.content = image
    }

    // 4) <link rel="icon" href="...">
    if (icon) {
      let link = document.querySelector<HTMLLinkElement>("link[rel~='icon']")
      if (!link) {
        link = document.createElement('link')
        link.setAttribute('rel','icon')
        document.head.appendChild(link)
      }
      link.href = icon
    }

    // 5) quaisquer outras meta tags (og:type, twitter:card, etc)
    Object.entries(rest).forEach(([key, value]) => {
      if (!value) return
      const attr = key.startsWith('og:') ? 'property' : 'name'
      let tag = document.querySelector<HTMLMetaElement>(
        `meta[${attr}='${key}']`
      )
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute(attr, key)
        document.head.appendChild(tag)
      }
      tag.content = value
    })
  }, [title, description, image, icon, JSON.stringify(rest)])
}
