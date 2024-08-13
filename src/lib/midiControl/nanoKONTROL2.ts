const KEY = {
  TRACK_PREVIOUS: 58,
  TRACK_NEXT: 59,
  CYCLE: 46,
  SET: 60,
  MAKER_PREVIOUS: 61,
  MAKER_NEXT: 62,
  REWIND: 43,
  FAST_FORWARD: 44,
  STOP: 42,
  PLAY: 41,
  RECORD: 45,
  UNIT_SOLO: 32,
  UNIT_MUTE: 48,
  UNIT_REC: 64,
  UNIT_KNOB: 16,
  UNIT_SLIDER: 0,
}

export type Unit = {
  solo: boolean
  mute: boolean
  rec: boolean
  knob: number
  slider: number
}

const unitTypeList = [1, 2, 3, 4, 5, 6, 7, 8] as const

export type UnitType = (typeof unitTypeList)[number]

export type UnitList = {
  [key in UnitType]: Unit
}

const initUnitValue: Unit = {
  solo: false,
  mute: false,
  rec: false,
  knob: 0,
  slider: 0,
}

class DtoNanoKONTROL2 {
  constructor() {
    this._trackNext = false
    this._trackPrevious = false
    this._cycle = false
    this._set = false
    this._makerPrevious = false
    this._makerNext = false
    this._rewind = false
    this._fastForward = false
    this._stop = false
    this._play = false
    this._record = false

    this._unit = {
      1: initUnitValue,
      2: initUnitValue,
      3: initUnitValue,
      4: initUnitValue,
      5: initUnitValue,
      6: initUnitValue,
      7: initUnitValue,
      8: initUnitValue,
    }
  }

  private _trackPrevious: boolean
  get trackPrevious(): boolean {
    return this._trackPrevious
  }
  set trackPrevious(value: boolean) {
    this._trackPrevious = value
  }

  private _trackNext: boolean
  get trackNext(): boolean {
    return this._trackNext
  }
  set trackNext(value: boolean) {
    this._trackNext = value
  }

  private _cycle: boolean
  get cycle(): boolean {
    return this._cycle
  }
  set cycle(value: boolean) {
    this._cycle = value
  }

  private _set: boolean
  get set(): boolean {
    return this._set
  }
  set set(value: boolean) {
    this._set = value
  }

  private _makerPrevious: boolean
  get makerPrevious(): boolean {
    return this._makerPrevious
  }
  set makerPrevious(value: boolean) {
    this._makerPrevious = value
  }

  private _makerNext: boolean
  get makerNext(): boolean {
    return this._makerNext
  }
  set makerNext(value: boolean) {
    this._makerNext = value
  }

  private _rewind: boolean
  get rewind(): boolean {
    return this._rewind
  }
  set rewind(value: boolean) {
    this._rewind = value
  }

  private _fastForward: boolean
  get fastForward(): boolean {
    return this._fastForward
  }
  set fastForward(value: boolean) {
    this._fastForward = value
  }

  private _stop: boolean
  get stop(): boolean {
    return this._stop
  }
  set stop(value: boolean) {
    this._stop = value
  }

  private _play: boolean
  get play(): boolean {
    return this._play
  }
  set play(value: boolean) {
    this._play = value
  }

  private _record: boolean
  get record(): boolean {
    return this._record
  }
  set record(value: boolean) {
    this._record = value
  }

  private _unit: UnitList
  get unit(): UnitList {
    return this._unit
  }
  set unit(value: UnitList) {
    this._unit = value
  }
}

type NanoKONTROL2Type = {
  trackPrevious: boolean
  trackNext: boolean
  cycle: boolean
  set: boolean
  makerPrevious: boolean
  makerNext: boolean
  rewind: boolean
  fastForward: boolean
  stop: boolean
  play: boolean
  record: boolean
  unit: UnitList
}

export class NanoKONTROL2 {
  private data: DtoNanoKONTROL2

  constructor(data: DtoNanoKONTROL2) {
    this.data = data
  }

  get trackPrevious(): boolean {
    return this.data.trackPrevious
  }

  get trackNext(): boolean {
    return this.data.trackNext
  }

  get cycle(): boolean {
    return this.data.cycle
  }

  get set(): boolean {
    return this.data.set
  }

  get makerPrevious(): boolean {
    return this.data.makerPrevious
  }

  get makerNext(): boolean {
    return this.data.makerNext
  }

  get rewind(): boolean {
    return this.data.rewind
  }

  get fastForward(): boolean {
    return this.data.fastForward
  }

  get stop(): boolean {
    return this.data.stop
  }

  get play(): boolean {
    return this.data.play
  }

  get record(): boolean {
    return this.data.record
  }

  get unit(): UnitList {
    return this.data.unit
  }

  toObject(): NanoKONTROL2Type {
    return {
      trackPrevious: this.trackPrevious,
      trackNext: this.trackNext,
      cycle: this.cycle,
      set: this.set,
      makerPrevious: this.makerPrevious,
      makerNext: this.makerNext,
      rewind: this.rewind,
      fastForward: this.fastForward,
      stop: this.stop,
      play: this.play,
      record: this.record,
      unit: this.unit,
    }
  }

  toJSON(): string {
    return JSON.stringify(this.toObject())
  }
}

export const setup = async () => {
  const data = new DtoNanoKONTROL2()

  try {
    // return await navigator.requestMIDIAccess()
    const access = await navigator.requestMIDIAccess() //.then(onMIDISuccess, onMIDIFailure)

    access.inputs.forEach((input) => {
      if (input.name === 'nanoKONTROL2 SLIDER/KNOB') {
        input.onmidimessage = (e: WebMidi.MIDIMessageEvent) => {
          const accessData = e.data
          const key = accessData[1]
          const isPressed = accessData[2] === 127

          // 2値
          // 押している間のみ
          if (key === KEY.TRACK_PREVIOUS) {
            data.trackPrevious = isPressed
          }
          if (key === KEY.TRACK_NEXT) {
            data.trackNext = isPressed
          }
          if (key === KEY.SET) {
            data.set = isPressed
          }
          if (key === KEY.MAKER_PREVIOUS) {
            data.makerPrevious = isPressed
          }
          if (key === KEY.MAKER_NEXT) {
            data.makerNext = isPressed
          }
          if (key === KEY.STOP) {
            data.stop = isPressed
            data.rewind = false
            data.fastForward = false
            data.play = false
            data.record = false
          }

          // 押したら反転
          if (key === KEY.CYCLE && isPressed) {
            data.cycle = !data.cycle
          }
          if (key === KEY.REWIND && isPressed) {
            data.rewind = !data.rewind
            data.fastForward = false
          }
          if (key === KEY.FAST_FORWARD && isPressed) {
            data.fastForward = !data.fastForward
            data.rewind = false
          }
          if (key === KEY.PLAY && isPressed) {
            data.play = !data.play
            data.stop = false
            data.record = false
          }
          if (key === KEY.RECORD && isPressed) {
            data.record = !data.record
            data.stop = false
            data.play = false
          }

          // unit
          // solo, mute, rec: boolean
          // knob, slider: number
          const temp = JSON.parse(JSON.stringify(data.unit))
          for (const unitIndex of unitTypeList) {
            // unitIndexは1から始まるので、1引いた値が差分
            const diff = unitIndex - 1

            // Solo: 32-39
            if (key === KEY.UNIT_SOLO + diff && isPressed) {
              const unit = temp[unitIndex]
              unit.solo = !unit.solo
              data.unit = {
                ...temp,
                [unitIndex]: unit, // 変更したユニットのみを反映
              }
            }
            // Mute: 48-55
            if (key === KEY.UNIT_MUTE + diff && isPressed) {
              temp[unitIndex].mute = !temp[unitIndex].mute
              data.unit[unitIndex] = temp[unitIndex] // 変更したユニットのみを反映
            }
            // Rec: 64-71
            if (key === KEY.UNIT_REC + diff && isPressed) {
              temp[unitIndex].rec = !temp[unitIndex].rec
              data.unit[unitIndex] = temp[unitIndex] // 変更したユニットのみを反映
            }
            // ノブ: 16-23
            if (key === KEY.UNIT_KNOB + diff) {
              temp[unitIndex].knob = accessData[2]
              data.unit[unitIndex] = temp[unitIndex] // 変更したユニットのみを反映
            }
            // スライダー: 0-7
            if (key === KEY.UNIT_SLIDER + diff) {
              temp[unitIndex].slider = accessData[2]
              data.unit[unitIndex] = temp[unitIndex] // 変更したユニットのみを反映
            }
          }
        }
      }
    })

    return new NanoKONTROL2(data)
  } catch (e) {
    console.error(e)
  }
}
