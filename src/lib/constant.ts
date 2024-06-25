import { PageListItem } from '@/lib/types'
import { siteInfo as artLineSimpleStraightSiteInfo } from '@/pages/art/line/simple/straight'

export const PAGE_LIST: PageListItem[] = [
  {
    title: '揺れる点',
    href: 'art/move/point',
  },
  {
    title: '格子',
    href: 'art/move/grid-1',
  },
  {
    title: '格子と点',
    href: 'art/move/grid-2',
  },
  {
    title: 'ひし形格子と点',
    href: 'art/move/grid-3',
  },
  {
    title: '真ん中から線を引く',
    href: 'art/line/mouse/straight',
  },
  {
    title: '真ん中からまっすぐではない線を引く',
    href: 'art/line/mouse/noise',
  },
  {
    href: 'art/line/simple/straight',
    ...artLineSimpleStraightSiteInfo,
  },
]
