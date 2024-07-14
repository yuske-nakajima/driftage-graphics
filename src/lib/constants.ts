/*
上下左右 キーコード
 */
export const KEY_CODE = {
  UP: 38,
  DOWN: 40,
  LEFT: 37,
  RIGHT: 39,
}

export const KEY_CODE_DISPLAY: Map<number, { text: string; mark: string }> =
  new Map([
    [KEY_CODE.UP, { text: 'UP', mark: '↑' }],
    [KEY_CODE.DOWN, { text: 'DOWN', mark: '↓' }],
    [KEY_CODE.LEFT, { text: 'LEFT', mark: '←' }],
    [KEY_CODE.RIGHT, { text: 'RIGHT', mark: '→' }],
  ])
