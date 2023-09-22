import { arrayMap } from './object'

describe('arrayMap', () => {
  it('should return array', () => {
    expect(arrayMap(3, () => 0)).toEqual([0, 0, 0])
  })
  it('should return array', () => {
    expect(arrayMap(3, index => index)).toEqual([0, 1, 2])
  })
})
