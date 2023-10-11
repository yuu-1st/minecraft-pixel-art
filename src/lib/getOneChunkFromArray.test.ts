import { createMapDataFromFill } from './convertToObject'
import { getOneChunkFromArray } from './getOneChunkFromArray'
import { arrayMap } from './object'

describe('getOneChunkFromArray', () => {
  const fillCommand = `
    /fill 0 0 0 20 0 20 stone
    /fill 20 0 0 40 0 20 white_wool
    /fill 40 0 0 60 0 20 red_wool
    /fill 0 0 20 20 0 40 orange_wool
    /fill 20 0 20 40 0 40 yellow_wool
    /fill 40 0 20 60 0 40 lime_wool
    /fill 0 0 40 20 0 60 green_wool
    /fill 20 0 40 40 0 60 cyan_wool
    /fill 40 0 40 60 0 60 blue_wool
    `
  const { blockMap, numberedArray } = createMapDataFromFill(fillCommand)
  // blockMapはconvertToObject.test.tsでテスト済みであることが前提

  const findNumberedArray = (
    block: string
  ): { blockName: string, blockNumber: number } => {
    const findIndex = numberedArray.findIndex(
      numberedBlock => numberedBlock === block
    )
    if (findIndex === -1) {
      throw new Error('not found')
    }
    return { blockName: block, blockNumber: findIndex }
  }

  describe.each([
    [
      [0, 0],
      arrayMap(16, () => arrayMap(16, () => findNumberedArray('stone')))
    ],
    [
      [0, 1],
      arrayMap(16, indexZ =>
        arrayMap(16, indexX => {
          if (indexX < 4) {
            return findNumberedArray('stone')
          } else {
            return findNumberedArray('white_wool')
          }
        })
      )
    ],
    [
      [0, 3],
      arrayMap(16, indexZ =>
        arrayMap(16, indexX => {
          if (indexX < 13) {
            return findNumberedArray('red_wool')
          } else {
            return { blockName: '', blockNumber: -1 }
          }
        })
      )
    ],
    [
      [0, -1],
      arrayMap(16, indexZ =>
        arrayMap(16, indexX => {
          return { blockName: '', blockNumber: -1 }
        })
      )
    ]
  ])('success simple', (chunk, expected) => {
    it(`test getOneChunkFromArray(${chunk[0]}, ${chunk[1]})`, () => {
      expect(getOneChunkFromArray(blockMap, chunk[0], chunk[1])).toEqual(
        expected
      )
    })
  })

  describe.each([
    [
      [0, 0],
      0,
      1,
      arrayMap(16, indexZ =>
        arrayMap(16, indexX => {
          if (indexX < 1) {
            return { blockName: '', blockNumber: -1 }
          } else {
            return findNumberedArray('stone')
          }
        })
      )
    ]
  ])('success with startX and startZ', (chunk, startX, startZ, expected) => {
    it(`test getOneChunkFromArray(${chunk[0]}, ${chunk[1]}, ${startX}, ${startZ})`, () => {
      expect(
        getOneChunkFromArray(blockMap, chunk[0], chunk[1], startX, startZ)
      ).toEqual(expected)
    })
  })
})
