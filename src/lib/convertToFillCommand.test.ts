import { convertToFillCommand } from './convertToFillCommand'

describe('test convertToFillCommand', () => {
  describe.each<[string[][], string[]]>([
    [[['stone', 'stone', 'stone']], ['fill 0 0 0 0 0 2 stone']],
    [
      [
        ['stone', 'stone', 'stone'],
        ['sand', 'sand', 'sand']
      ],
      ['fill 0 0 0 0 0 2 stone', 'fill 1 0 0 1 0 2 sand']
    ],
    [
      [
        ['stone', 'stone', 'sand', 'stone'],
        ['sand', 'sand', 'sand', 'sand'],
        ['stone', 'sand', 'stone', 'sand']
      ],
      [
        'fill 0 0 0 0 0 1 stone',
        'fill 0 0 2 0 0 2 sand',
        'fill 0 0 3 0 0 3 stone',
        'fill 1 0 0 1 0 3 sand',
        'fill 2 0 0 2 0 0 stone',
        'fill 2 0 1 2 0 1 sand',
        'fill 2 0 2 2 0 2 stone',
        'fill 2 0 3 2 0 3 sand'
      ]
    ]
  ])('test %s', (blocks, expected) => {
    test('convertToFillCommand', () => {
      expect(convertToFillCommand(blocks, 0, 0, 0, 'x', 'z')).toEqual(expected)
    })
  })
})
