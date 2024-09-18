import type { PageInfo } from '@/lib/types'
import { pageInfo as artCellPointLeftTopParallelogram } from '@/pages/art/cell/point/left-top-parallelogram'
import { pageInfo as artCellPointLeftTopParallelogramMove } from '@/pages/art/cell/point/left-top-parallelogram-move'
import { pageInfo as artCellPointLeftTopRollingSquare1 } from '@/pages/art/cell/point/left-top-rolling-square1'
import { pageInfo as artCellPointLeftTopRollingSquare2 } from '@/pages/art/cell/point/left-top-rolling-square2'
import { pageInfo as artCellPointLeftTopSquare } from '@/pages/art/cell/point/left-top-square'
import { pageInfo as artCellPointLeftTopSquareMove } from '@/pages/art/cell/point/left-top-square-move'
import { pageInfo as artClockCirclePie } from '@/pages/art/clock/circle/pie'
import { pageInfo as artClockCircleSingle } from '@/pages/art/clock/circle/single'
import { pageInfo as artClockCircleTube } from '@/pages/art/clock/circle/tube'
import { pageInfo as artClockCircleTubeSmooth } from '@/pages/art/clock/circle/tube-smooth'
import { pageInfo as artClockGridTube } from '@/pages/art/clock/grid/tube'
import { pageInfo as artControlMidiLaunchpadMiniMk3Display } from '@/pages/art/control/midi/launchpad-mini-mk3/display'
import { pageInfo as artControlMidiLaunchpadMiniMk3Display2 } from '@/pages/art/control/midi/launchpad-mini-mk3/display2'
import { pageInfo as artControlMidiLaunchpadMiniMk3Display3 } from '@/pages/art/control/midi/launchpad-mini-mk3/display3'
import { pageInfo as artControlMidiNanoKontrolDisplay } from '@/pages/art/control/midi/nano-kontrol2/display'
import { pageInfo as artControlMidiNanoKontrolProduct } from '@/pages/art/control/midi/nano-kontrol2/product'
import { pageInfo as artControlMidiNanoKontrolProductBackPattern } from '@/pages/art/control/midi/nano-kontrol2/product-back-pattern'
import { pageInfo as artJapanesePatternSeigaihaBasic } from '@/pages/art/japanese-pattern/seigaiha/basic'
import { pageInfo as artJapanesePatternSeigaihaMove } from '@/pages/art/japanese-pattern/seigaiha/move'
import { pageInfo as artLineMouseNoise } from '@/pages/art/line/mouse/noise'
import { pageInfo as artLineMouseStraight } from '@/pages/art/line/mouse/straight'
import { pageInfo as artLineSimpleNoise } from '@/pages/art/line/simple/noise'
import { pageInfo as artLineSimpleStraight } from '@/pages/art/line/simple/straight'
import { pageInfo as artMoveGrid1 } from '@/pages/art/move/grid-1'
import { pageInfo as artMoveGrid2 } from '@/pages/art/move/grid-2'
import { pageInfo as artMoveGrid3 } from '@/pages/art/move/grid-3'
import { pageInfo as artMovePoint } from '@/pages/art/move/point'
import { pageInfo as artPatternCircleLineUp } from '@/pages/art/pattern/circle/line-up'
import { pageInfo as artPatternCircleLineUpInteractive } from '@/pages/art/pattern/circle/line-up-interactive'
import { pageInfo as artPatternCircleLineUpMove } from '@/pages/art/pattern/circle/line-up-move'
import { pageInfo as artShapeHeartMove } from '@/pages/art/shape/heart/move'
import { pageInfo as artTrigBasic } from '@/pages/art/trig/basic'
import { pageInfo as artTrigPoint } from '@/pages/art/trig/point'

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
  artPatternCircleLineUp,
  artPatternCircleLineUpMove,
  artPatternCircleLineUpInteractive,
  artJapanesePatternSeigaihaBasic,
  artJapanesePatternSeigaihaMove,
  artCellPointLeftTopSquare,
  artCellPointLeftTopSquareMove,
  artCellPointLeftTopParallelogram,
  artCellPointLeftTopParallelogramMove,
  artCellPointLeftTopRollingSquare1,
  artCellPointLeftTopRollingSquare2,
  artControlMidiNanoKontrolDisplay,
  artControlMidiNanoKontrolProduct,
  artControlMidiNanoKontrolProductBackPattern,
  artControlMidiLaunchpadMiniMk3Display,
  artControlMidiLaunchpadMiniMk3Display2,
  artControlMidiLaunchpadMiniMk3Display3,
  artClockCircleSingle,
  artClockCirclePie,
  artClockCircleTube,
  artClockCircleTubeSmooth,
  artClockGridTube,
  artTrigBasic,
  artTrigPoint,
]
