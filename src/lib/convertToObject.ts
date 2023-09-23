export type PositionArray = [
  positionX: number,
  positionY: number,
  positionZ: number
]

export interface FillCommandObject {
  fromX: number
  fromY: number
  fromZ: number
  toX: number
  toY: number
  toZ: number
  block: string
}

/**
 * Convert fill command to object
 * @param command fill command
 * @param defaultX default x
 * @param defaultY default y
 * @param defaultZ default z
 * @returns object
 */
export function convertToObject (
  command: string,
  defaultPosition: PositionArray = [0, 0, 0]
): FillCommandObject {
  const fillCommand = command.split(' ')
  if (fillCommand[0] !== '/fill' && fillCommand[0] !== 'fill') {
    throw new Error('The command is not fill command.')
  }
  if (fillCommand.length < 8) {
    throw new Error('The command is invalid.')
  }
  const positions = fillCommand.slice(1, 7)
  const block = fillCommand[7]
  const checkPosition = positions.map((position, index) => {
    if (position.length === 0) {
      throw new Error(`The position ${index} is empty.`)
    } else if (position === '~') {
      return defaultPosition[index % 3]
    } else if (position === '^') {
      throw new Error('The command is not support ^.')
    } else if (/^(~|\^)?-?\d+$/.test(position)) {
      if (position.startsWith('~')) {
        return defaultPosition[index % 3] + Number(position.slice(1))
      }
      if (position.startsWith('^')) {
        throw new Error('The command is not support ^.')
      }
      return Number(position)
    } else {
      throw new Error(`The position ${position} is invalid.`)
    }
  })
  return {
    fromX: checkPosition[0],
    fromY: checkPosition[1],
    fromZ: checkPosition[2],
    toX: checkPosition[3],
    toY: checkPosition[4],
    toZ: checkPosition[5],
    block
  }
}

/**
 * Read FillCommandObject, and fill the specified area of 2D array.
 * @param fillCommandObject FillCommandObject
 * @param targetArray 2D array to fill. You need to secure the required size in advance.
 * @param startX X coordinate of 0,0
 * @param startY Y coordinate of 0,0
 * @param planePosition Plane axis
 * @param planeTarget Plane axis value
 * @returns Filled 2D array
 */
export function addFillCommandObjectToArray (
  fillCommandObject: FillCommandObject,
  targetArray: string[][],
  startX: number,
  startY: number,
  planePosition: 'x' | 'y' | 'z',
  planeTarget: number
): string[][] {
  const { fromX, fromY, fromZ, toX, toY, toZ, block } = fillCommandObject
  const minX = Math.min(fromX, toX)
  const maxX = Math.max(fromX, toX)
  const minY = Math.min(fromY, toY)
  const maxY = Math.max(fromY, toY)
  const minZ = Math.min(fromZ, toZ)
  const maxZ = Math.max(fromZ, toZ)
  const firstMin = (planePosition === 'x' ? minY : minX) - startX
  const firstMax = (planePosition === 'x' ? maxY : maxX) - startX
  const secondMin = (planePosition === 'z' ? minY : minZ) - startY
  const secondMax = (planePosition === 'z' ? maxY : maxZ) - startY
  const planeMin =
    planePosition === 'x' ? minX : planePosition === 'y' ? minY : minZ
  const planeMax =
    planePosition === 'x' ? maxX : planePosition === 'y' ? maxY : maxZ

  if (!(planeMin <= planeTarget && planeTarget <= planeMax)) {
    return targetArray.map(row => [...row])
  }

  const fillArray = targetArray.map((row, rowIndex) => {
    if (rowIndex < firstMin || rowIndex > firstMax) {
      return row
    }
    return row.map((column, columnIndex) => {
      if (columnIndex < secondMin || columnIndex > secondMax) {
        return column
      }
      return block
    })
  })
  return fillArray
}

/**
 * Create a 2D array from multiple fill commands.
 * @param fillCommands An array of fill commands.
 * @param planePosition The axis of the plane.
 * @param planeTarget The value of the axis of the plane. Treat the block on the axis of the specified value as a plane.
 * @param defaultBlock The default block. If no block is specified in the fill command, it will be used.
 * @returns 2D array
 */
export function createArrayFromFillCommands (
  fillCommands: string[],
  planePosition: 'x' | 'y' | 'z' = 'y',
  planeTarget: number = 0,
  defaultBlock = 'air'
): string[][] {
  const fillCommandObjects = fillCommands.map(command =>
    convertToObject(command, [0, 0, 0])
  )
  const { fromX, fromY, fromZ, toX, toY, toZ } = fillCommandObjects.reduce(
    (prev, current) => {
      return {
        fromX: Math.min(prev.fromX, current.fromX),
        fromY: Math.min(prev.fromY, current.fromY),
        fromZ: Math.min(prev.fromZ, current.fromZ),
        toX: Math.max(prev.toX, current.toX),
        toY: Math.max(prev.toY, current.toY),
        toZ: Math.max(prev.toZ, current.toZ)
      }
    },
    {
      fromX: Infinity,
      fromY: Infinity,
      fromZ: Infinity,
      toX: -Infinity,
      toY: -Infinity,
      toZ: -Infinity
    }
  )
  const arraySizeX = Math.abs(toX - fromX) + 1
  const arraySizeY = Math.abs(toY - fromY) + 1
  const arraySizeZ = Math.abs(toZ - fromZ) + 1
  const arraySizeFirst = planePosition === 'x' ? arraySizeY : arraySizeX
  const arraySizeSecond = planePosition === 'z' ? arraySizeY : arraySizeZ
  let array = Array.from({ length: arraySizeFirst }, () =>
    Array.from({ length: arraySizeSecond }, () => defaultBlock)
  )
  const startFirst = planePosition === 'x' ? fromY : fromX
  const startSecond = planePosition === 'z' ? fromY : fromZ

  fillCommandObjects.forEach(fillCommandObject => {
    array = addFillCommandObjectToArray(
      fillCommandObject,
      array,
      startFirst,
      startSecond,
      planePosition,
      planeTarget
    )
  })
  return array
}

export interface BlockCellData {
  blockName: string
  blockNumber: number
}

export interface MapBlockData {
  numberedArray: string[]
  blockMap: BlockCellData[][]
}

/**
 * From 2D array of String, assign number of the same kind of block,
 * and return the correspondence between the type of block and the number,
 * and an array including the number and the name of the block.
 * @param array 2D array of String
 * @returns The correspondence between the type of block and the number,
 * and an array including the number and the name of the block.
 */
export function convertArrayToNumberedArray (array: string[][]): MapBlockData {
  const blockMapArray = new Map<string, number>()
  let number = 0
  const blockMap: BlockCellData[][] = array.map(row =>
    row.map(column => {
      const blockNumber = blockMapArray.get(column)
      if (blockNumber === undefined) {
        blockMapArray.set(column, number)
        number++
      }
      return {
        blockName: column,
        blockNumber: blockMapArray.get(column) ?? 0
      }
    })
  )
  const numberedArray = [] as string[]
  blockMapArray.forEach((value, key) => {
    numberedArray[value] = key
  })
  return {
    numberedArray,
    blockMap
  }
}

/**
 * Create a MapBlockData from a fill command.
 * @param fillCommand fill command
 * @returns MapBlockData
 */
export function createMapDataFromFill (fillCommand: string): MapBlockData {
  const formatFillCommand = fillCommand.split('\n').flatMap(command => {
    if (command.trim().length === 0) {
      return []
    }
    return command.trim()
  })
  const fillCommandObject = createArrayFromFillCommands(formatFillCommand)
  const blockCellData = convertArrayToNumberedArray(fillCommandObject)
  return blockCellData
}
