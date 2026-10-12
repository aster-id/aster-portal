import { type AtUriParts, type AtUriString, ifAtIdentifierString } from '@atproto/syntax'

/**
 * Hashtag.
 */
export interface AtTagUriParts {
  tag: string
}

/**
 * App in our catalog;
 * more info (name, icon, description) is fetched from `atstore.fyi`.
 *
 * To add one,
 * search the atstore for an app
 * (for example,
 * `https://atstore.fyi/xrpc/fyi.atstore.directory.searchListings?q=sifa`),
 * and use the `at://…` URI you see there as `atUri`.
 *
 * The visible list mirrors the research-ecosystem directory at
 * `https://atproto.science/ecosystem/`.
 * Ecosystem projects without an atstore listing can’t be added yet
 * (as of 2026-10: BlueNotes, Layers, ViewSift, SciOS Graph Infrastructure,
 * Standard.site itself, Groundmist.xyz, Matadisco, Podium, Underlay, atdata,
 * nebra, Habitat, Lea, Paperstars, Breadcrumbs, BioKEA, hypgen, GreenEarth
 * Social, Paper Skygest, Aster.id, Catalyze, Hypercerts, Astrosky and fray).
 */
export interface CatalogApp {
  /**
   * URI of the atstore listing.
   */
  atUri: AtUriString

  /**
   * Category message key (example: `apps.category.events`);
   * apps w/o category are hidden from lists,
   * but still have a detail page and can be used by the “open with” launcher.
   */
  category?: string | undefined

  /**
   * Whether to show the app “outside” of the apps page.
   */
  featured?: boolean | undefined

  /**
   * How the “open with” launcher opens things in this app.
   */
  launcher?: Launcher | undefined

  /**
   * Stamp of approval.
   */
  madeInEurope?: boolean | undefined

  /**
   * Custom category: apps recommended by eurosky.
   */
  recommended?: boolean | undefined
}

/**
 * Turn `at://` URI parts into a web URL for an app, if it supports them.
 */
export type FromAtUri = (parts: AtUriParts | AtTagUriParts) => string | undefined

/**
 * How the “open with” launcher opens things in an app.
 */
interface Launcher {
  /**
   * Turn `at://` URI parts into a web URL of this app.
   */
  fromAtUri: FromAtUri

  /**
   * Turn a web URL of this app into `at://` URI parts.
   */
  toAtUri: ToAtUri
}

/**
 * Turn a web URL of an app into `at://` URI parts, if it is one.
 */
export type ToAtUri = (url: URL) => AtUriParts | AtTagUriParts | undefined

/**
 * Catalog.
 */
export const apps: ReadonlyArray<CatalogApp> = [
  // — Annotation & knowledge tools —

  // lichen.wiki
  {
    atUri: 'at://did:plc:xfs42pjf3n7imvgrdrp7xvez/fyi.atstore.listing.detail/3mkihgsgwb27y',
    category: 'apps.category.readWrite',
  },
  // Margin
  {
    atUri: 'at://did:plc:rjqn3agdb74cszhqcpii4sne/fyi.atstore.listing.detail/3mkid4nadskrz',
    category: 'apps.category.bookmark',
  },
  // Semble
  {
    atUri: 'at://did:plc:k7wclckeajmuibxbamtbejjg/fyi.atstore.listing.detail/3mkiitkc44spk',
    category: 'apps.category.bookmark',
    featured: true,
    recommended: true,
  },
  // Skyreader
  {
    atUri: 'at://did:plc:ra4jsemddo2ii4pn5jaf6x4v/fyi.atstore.listing.detail/3mkmvxopqgsia',
    category: 'apps.category.readWrite',
  },
  // Skysquare
  {
    atUri: 'at://did:plc:7dfrk2q5qhd3e7yyel444gam/fyi.atstore.listing.detail/3mlgbqxse6kny',
    category: 'apps.category.readWrite',
  },

  // — Publishing (standard.site family) —

  // Chive
  {
    atUri: 'at://did:plc:7natp5xae72bddaqlkef2t4e/fyi.atstore.listing.detail/3mkkxgeomikmf',
    category: 'apps.category.readWrite',
    featured: true,
    madeInEurope: true,
  },
  // Octosphere
  {
    atUri: 'at://did:plc:dvy6bdnofdfc4php4s5b457d/fyi.atstore.listing.detail/3mjd5ck4rs6nw',
    category: 'apps.category.readWrite',
  },
  // Offprint
  {
    atUri: 'at://did:plc:pgjkomf37an4czloay5zeth6/fyi.atstore.listing.detail/3mkni5k5q5kxx',
    category: 'apps.category.readWrite',
  },
  // pckt
  {
    atUri: 'at://did:plc:revjuqmkvrw6fnkxppqtszpv/fyi.atstore.listing.detail/3mkkyjyup6kdv',
    category: 'apps.category.readWrite',
  },
  // Leaflet
  {
    atUri: 'at://did:plc:btxrwcaeyodrap5mnjw2fvmz/fyi.atstore.listing.detail/3mkijfr6sts5l',
    category: 'apps.category.readWrite',
    launcher: {
      fromAtUri: (parts) => {
        if ('tag' in parts) return
        // Leaflet has user links, but we don’t return them.
        // `https://leaflet.pub/p/${parts.authority}`
        if (!parts.collection) return
        if (parts.collection === 'site.standard.document' && parts.rkey)
          return `https://leaflet.pub/p/${parts.authority}/${parts.rkey}`
      },
      toAtUri: (url) => {
        if (url.hostname !== 'leaflet.pub') return
        const match = /^\/p\/([^/]+)(?:\/([^/]+))?\/?$/.exec(url.pathname)
        if (!match) return
        const [, rawAuthority, rkey] = match
        const authority = rawAuthority ? ifAtIdentifierString(rawAuthority) : undefined
        if (!authority) return
        if (rkey) return { authority, collection: 'site.standard.document', rkey }
        return { authority }
      },
    },
  },
  // Standard reader
  {
    atUri: 'at://did:plc:f4os2wz5fjl56xpwcvtnqu7m/fyi.atstore.listing.detail/3mpjb3fty62nt',
    category: 'apps.category.readWrite',
    launcher: {
      fromAtUri: (parts) => {
        if ('tag' in parts) return
        // Leaflet has user links, but we don’t return them.
        // `https://standard-reader.app/u/${parts.authority}`
        if (!parts.collection) return
        if (parts.collection === 'site.standard.document' && parts.rkey)
          return `https://standard-reader.app/a/${parts.authority}/${parts.rkey}`
      },
      toAtUri: (url) => {
        if (url.hostname !== 'standard-reader.app') return

        const profile = /^\/u\/([^/]+)\/?$/.exec(url.pathname)
        const profileAuthority = profile?.[1] ? ifAtIdentifierString(profile[1]) : undefined
        if (profileAuthority) return { authority: profileAuthority }

        const article = /^\/a\/([^/]+)\/([^/]+)\/?$/.exec(url.pathname)
        const articleAuthority = article ? ifAtIdentifierString(article[1]) : undefined
        if (article && articleAuthority) {
          return {
            authority: articleAuthority,
            collection: 'site.standard.document',
            rkey: article[2],
          }
        }
      },
    },
    recommended: true,
  },

  // — Data —

  // SensorThings (Meitheal)
  {
    atUri: 'at://did:plc:dvy6bdnofdfc4php4s5b457d/fyi.atstore.listing.detail/3mjbv5u2mocit',
    category: 'apps.category.development',
  },
  // lexicons.bio
  {
    atUri: 'at://did:plc:dvy6bdnofdfc4php4s5b457d/fyi.atstore.listing.detail/3mjdstabcw3fs',
    category: 'apps.category.development',
  },

  // — AI —

  // Tiles
  {
    atUri: 'at://did:plc:mqmcsjuerbjhu65mpmvkcuw2/fyi.atstore.listing.detail/3mnl4gh2rkkpc',
    category: 'apps.category.development',
  },
  // co/core
  {
    atUri: 'at://did:plc:5quuhkmwe2q4k3azfsgg7kdz/fyi.atstore.listing.detail/3mpjcr4d3ycv7',
    category: 'apps.category.development',
  },

  // — Citizen science —

  // Observ.ing
  {
    atUri: 'at://did:plc:dvy6bdnofdfc4php4s5b457d/fyi.atstore.listing.detail/3mjfqg3jqb642',
    category: 'apps.category.social',
  },
  // GainForest
  {
    atUri: 'at://did:plc:qoti4acfmc5wg6zzmtix6hse/fyi.atstore.listing.detail/3mqpstfiimsuz',
    category: 'apps.category.social',
    featured: true,
  },

  // — Communities —

  // Medsky
  {
    atUri: 'at://did:plc:an5cb3ab3cjswxhb3czqqjov/fyi.atstore.listing.detail/3mswtcqnitkb4',
    category: 'apps.category.social',
  },

  // — Networking —

  // Sifa ID
  {
    atUri: 'at://did:plc:2f2ahswozqy4v5lvu676375y/fyi.atstore.listing.detail/3mkduyazhqc6y',
    category: 'apps.category.personalPage',
    featured: true,
    recommended: true,
    madeInEurope: true,
  },

  // — Version control —

  // Tangled
  {
    atUri: 'at://did:plc:dvy6bdnofdfc4php4s5b457d/fyi.atstore.listing.detail/3mj66idq2fp2t',
    category: 'apps.category.development',
    madeInEurope: true,
  },

  // — Launcher only (hidden from the apps page) —

  // Bluesky
  {
    atUri: 'at://did:plc:dvy6bdnofdfc4php4s5b457d/fyi.atstore.listing.detail/3mj667g65ct2x',
    launcher: {
      fromAtUri: (parts) => {
        if ('tag' in parts) return `https://bsky.app/hashtag/${encodeURIComponent(parts.tag)}`
        const base = `https://bsky.app/profile/${parts.authority}`
        if (!parts.collection) return base
        if (parts.collection === 'app.bsky.feed.post' && parts.rkey) {
          return `${base}/post/${parts.rkey}`
        }
      },
      toAtUri: (url) => {
        if (url.hostname !== 'bsky.app') return

        const hashtagMatch = /^\/hashtag\/([^/]+)\/?$/.exec(url.pathname)
        if (hashtagMatch) {
          try {
            return { tag: decodeURIComponent(hashtagMatch[1]) }
          } catch {
            return
          }
        }

        const profileMatch = /^\/profile\/([^/]+)(?:\/post\/([^/]+))?\/?$/.exec(url.pathname)
        if (!profileMatch) return
        const [, rawAuthority, rkey] = profileMatch
        const authority = rawAuthority ? ifAtIdentifierString(rawAuthority) : undefined
        if (!authority) return
        if (rkey) return { authority, collection: 'app.bsky.feed.post', rkey }
        return { authority }
      },
    },
  },
  // Mu
  {
    atUri: 'at://did:plc:izttpdp3l6vss5crelt5kcux/fyi.atstore.listing.detail/3mqmb7emiusy5',
    launcher: {
      fromAtUri: (parts) => {
        if ('tag' in parts) return `https://mu.social/hashtag/${encodeURIComponent(parts.tag)}`
        const base = `https://mu.social/profile/${parts.authority}`
        if (!parts.collection) return base
        if (parts.collection === 'app.bsky.feed.post' && parts.rkey)
          return `${base}/post/${parts.rkey}`
      },
      toAtUri: (url) => {
        if (url.hostname !== 'mu.social') return

        const hashtagMatch = /^\/hashtag\/([^/]+)\/?$/.exec(url.pathname)
        if (hashtagMatch) {
          try {
            return { tag: decodeURIComponent(hashtagMatch[1]) }
          } catch {
            return
          }
        }

        const profileMatch = /^\/profile\/([^/]+)(?:\/post\/([^/]+))?\/?$/.exec(url.pathname)
        if (!profileMatch) return
        const [, rawAuthority, rkey] = profileMatch
        const authority = rawAuthority ? ifAtIdentifierString(rawAuthority) : undefined
        if (!authority) return
        if (rkey) return { authority, collection: 'app.bsky.feed.post', rkey }
        return { authority }
      },
    },
    madeInEurope: true,
  },
]
