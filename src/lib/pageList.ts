import { PageInfo } from '@/lib/types'
import { pageInfo as artLineMouseNoise } from '@/pages/art/line/mouse/noise'
import { pageInfo as artLineMouseStraight } from '@/pages/art/line/mouse/straight'
import { pageInfo as artLineSimpleNoise } from '@/pages/art/line/simple/noise'
import { pageInfo as artLineSimpleStraight } from '@/pages/art/line/simple/straight'
import { pageInfo as artMoveGrid1 } from '@/pages/art/move/grid-1'
import { pageInfo as artMoveGrid2 } from '@/pages/art/move/grid-2'
import { pageInfo as artMoveGrid3 } from '@/pages/art/move/grid-3'
import { pageInfo as artMovePoint } from '@/pages/art/move/point'
import { pageInfo as artShapeHeartMove } from '@/pages/art/shape/heart/move'

export const PAGE_LIST: PageInfo[] = [
  artMovePoint,
  artMoveGrid1,
  artMoveGrid2,
  artMoveGrid3,
  artLineMouseStraight,
  artLineMouseNoise,
  artLineSimpleStraight,
  artLineSimpleNoise,
  artShapeHeartMove,
]
