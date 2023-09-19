import {
  FillCommandObject,
  PositionArray,
  addFillCommandObjectToArray,
  convertToObject,
  createArrayFromFillCommands
} from './convertToObject'

describe('test convertToObject', () => {
  describe.each<[string, PositionArray, FillCommandObject]>([
    [
      'fill ~ ~ ~ ~ ~ ~ minecraft:stone',
      [0, 0, 0],
      {
        fromX: 0,
        fromY: 0,
        fromZ: 0,
        toX: 0,
        toY: 0,
        toZ: 0,
        block: 'minecraft:stone'
      }
    ],
    [
      'fill ~ ~ ~ ~ ~ ~ minecraft:stone',
      [1, 2, 3],
      {
        fromX: 1,
        fromY: 2,
        fromZ: 3,
        toX: 1,
        toY: 2,
        toZ: 3,
        block: 'minecraft:stone'
      }
    ],
    [
      'fill 1 2 3 4 5 6 minecraft:stone',
      [0, 0, 0],
      {
        fromX: 1,
        fromY: 2,
        fromZ: 3,
        toX: 4,
        toY: 5,
        toZ: 6,
        block: 'minecraft:stone'
      }
    ],
    [
      'fill ~1 ~2 ~3 ~4 ~5 ~6 minecraft:stone',
      [10, 20, 30],
      {
        fromX: 11,
        fromY: 22,
        fromZ: 33,
        toX: 14,
        toY: 25,
        toZ: 36,
        block: 'minecraft:stone'
      }
    ],
    [
      '/fill ~1 ~2 ~3 ~4 ~5 ~6 minecraft:stone',
      [10, 20, 30],
      {
        fromX: 11,
        fromY: 22,
        fromZ: 33,
        toX: 14,
        toY: 25,
        toZ: 36,
        block: 'minecraft:stone'
      }
    ]
  ])('success', (command, defaultPosition, expected) => {
    it(`test convertToObject(${command})`, () => {
      const result = convertToObject(command, defaultPosition)
      expect(result).toEqual(expected)
    })
  })

  describe.each<[string, FillCommandObject]>([
    [
      'fill ~1 ~2 ~3 ~4 ~5 ~6 minecraft:stone',
      {
        fromX: 1,
        fromY: 2,
        fromZ: 3,
        toX: 4,
        toY: 5,
        toZ: 6,
        block: 'minecraft:stone'
      }
    ]
  ])('success use default', (command, expected) => {
    it(`test convertToObject(${command})`, () => {
      const result = convertToObject(command)
      expect(result).toEqual(expected)
    })
  })

  describe.each<[string, PositionArray, string]>([
    [
      'fill ^ ^ ^ ^ ^ ^ minecraft:stone',
      [0, 0, 0],
      'The command is not support ^.'
    ],
    [
      'fill ~a ~ ~ ~ ~ ~ minecraft:stone',
      [0, 0, 0],
      'The position ~a is invalid.'
    ],
    ['fill ~ ~ ~ ~ ~ minecraft:stone', [0, 0, 0], 'The command is invalid.'],
    ['fill ~ ~ ~ ~  ~ minecraft:stone', [0, 0, 0], 'The position 4 is empty.'],
    [
      'execute as @a at @s run fill ~ ~ ~ ~ ~ ~ minecraft:stone',
      [0, 0, 0],
      'The command is not fill command.'
    ],
    [
      'fill ^1 ^2 ^3 ^4 ^5 ^6 minecraft:stone',
      [0, 0, 0],
      'The command is not support ^.'
    ]
  ])('error', (command, defaultPosition, expected) => {
    it(`test convertToObject(${command})`, () => {
      expect(() => {
        convertToObject(command, defaultPosition)
      }).toThrow(expected)
    })
  })
})

describe('test addFillCommandObjectToArray', () => {
  describe.each<[number, number, 'x' | 'y' | 'z', number, string[][]]>([
    [
      0,
      0,
      'z',
      0,
      [
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', '']
      ]
    ],
    [
      0,
      0,
      'z',
      4,
      [
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', 'stone', 'stone', 'stone', 'stone', '', '', '', ''],
        ['', '', 'stone', 'stone', 'stone', 'stone', '', '', '', ''],
        ['', '', 'stone', 'stone', 'stone', 'stone', '', '', '', ''],
        ['', '', 'stone', 'stone', 'stone', 'stone', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', '']
      ]
    ],
    [
      0,
      0,
      'y',
      4,
      [
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', 'stone', 'stone', 'stone', 'stone', '', '', ''],
        ['', '', '', 'stone', 'stone', 'stone', 'stone', '', '', ''],
        ['', '', '', 'stone', 'stone', 'stone', 'stone', '', '', ''],
        ['', '', '', 'stone', 'stone', 'stone', 'stone', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', '']
      ]
    ],
    [
      0,
      0,
      'x',
      4,
      [
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', 'stone', 'stone', 'stone', 'stone', '', '', ''],
        ['', '', '', 'stone', 'stone', 'stone', 'stone', '', '', ''],
        ['', '', '', 'stone', 'stone', 'stone', 'stone', '', '', ''],
        ['', '', '', 'stone', 'stone', 'stone', 'stone', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', '']
      ]
    ],
    [
      1,
      3,
      'y',
      4,
      [
        ['stone', 'stone', 'stone', 'stone', '', '', '', '', '', ''],
        ['stone', 'stone', 'stone', 'stone', '', '', '', '', '', ''],
        ['stone', 'stone', 'stone', 'stone', '', '', '', '', '', ''],
        ['stone', 'stone', 'stone', 'stone', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', '']
      ]
    ],
    [
      2,
      3,
      'y',
      4,
      [
        ['stone', 'stone', 'stone', 'stone', '', '', '', '', '', ''],
        ['stone', 'stone', 'stone', 'stone', '', '', '', '', '', ''],
        ['stone', 'stone', 'stone', 'stone', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', '']
      ]
    ]
  ])('success', (startX, startY, planePosition, planeTarget, expected) => {
    const command = {
      fromX: 1,
      fromY: 2,
      fromZ: 3,
      toX: 4,
      toY: 5,
      toZ: 6,
      block: 'stone'
    }
    const targetArray = Array.from({ length: 10 }, () =>
      Array.from({ length: 10 }, () => '')
    )
    it(`test fillArray(${startX}, ${startY}, ${planePosition}, ${planeTarget})`, () => {
      const result = addFillCommandObjectToArray(
        command,
        targetArray,
        startX,
        startY,
        planePosition,
        planeTarget
      )
      expect(result).toEqual(expected)
    })
  })
})

describe('test createArrayFromFillCommands', () => {
  describe.each<[string[], string[][]]>([
    [
      [
        'fill 1 0 1 3 0 3 stone',
        'fill 1 0 4 3 0 6 white_wool',
        'fill 1 0 7 3 0 9 stone'
      ],
      [
        [
          'stone',
          'stone',
          'stone',
          'white_wool',
          'white_wool',
          'white_wool',
          'stone',
          'stone',
          'stone'
        ],
        [
          'stone',
          'stone',
          'stone',
          'white_wool',
          'white_wool',
          'white_wool',
          'stone',
          'stone',
          'stone'
        ],
        [
          'stone',
          'stone',
          'stone',
          'white_wool',
          'white_wool',
          'white_wool',
          'stone',
          'stone',
          'stone'
        ]
      ]
    ],
    [
      ['fill 1 0 1 3 0 3 stone', 'fill 2 0 4 4 0 6 white_wool'],
      [
        ['stone', 'stone', 'stone', 'air', 'air', 'air'],
        ['stone', 'stone', 'stone', 'white_wool', 'white_wool', 'white_wool'],
        ['stone', 'stone', 'stone', 'white_wool', 'white_wool', 'white_wool'],
        ['air', 'air', 'air', 'white_wool', 'white_wool', 'white_wool']
      ]
    ]
  ])('success simple', (commands, expected) => {
    it(`test createArrayFromFillCommands(${commands[0]})`, () => {
      const result = createArrayFromFillCommands(commands)
      expect(result).toEqual(expected)
    })
  })
})
