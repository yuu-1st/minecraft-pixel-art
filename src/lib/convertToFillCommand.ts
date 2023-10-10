type Axis = 'x' | 'y' | 'z'

interface CheckBlock {
  block: string
  isFilled: boolean
}

function makeFillCommand (
  fromX: number,
  fromY: number,
  fromZ: number,
  vertical: Axis,
  horizontal: Axis,
  verticalStart: number,
  horizontalStart: number,
  verticalLength: number,
  horizontalLength: number,
  block: string
): string {
  const vL = verticalLength + verticalStart
  const hL = horizontalLength + horizontalStart
  const frX = fromX + (vertical === 'x' ? verticalStart : 0) + (horizontal === 'x' ? horizontalStart : 0)
  const frY = fromY + (vertical === 'y' ? verticalStart : 0) + (horizontal === 'y' ? horizontalStart : 0)
  const frZ = fromZ + (vertical === 'z' ? verticalStart : 0) + (horizontal === 'z' ? horizontalStart : 0)
  const toX = fromX + (vertical === 'x' ? vL : 0) + (horizontal === 'x' ? hL : 0)
  const toY = fromY + (vertical === 'y' ? vL : 0) + (horizontal === 'y' ? hL : 0)
  const toZ = fromZ + (vertical === 'z' ? vL : 0) + (horizontal === 'z' ? hL : 0)
  return `fill ${frX} ${frY} ${frZ} ${toX} ${toY} ${toZ} ${block}`
}

/**
 * Generates a fill command from block data
 * @param blocks block data
 * @param fromX starting position of X coordinate
 * @param fromY starting position of Y coordinate
 * @param fromZ starting position of Z coordinate
 * @param vertical vertical axis
 * @param horizontal horizontal axis
 * @returns fill command
 */
export function convertToFillCommand (
  blocks: string[][],
  fromX: number,
  fromY: number,
  fromZ: number,
  vertical: Axis,
  horizontal: Axis
): string[] {
  const fillCommands: string[] = []
  const height = blocks.length
  const width = blocks[0].length
  const checkBlock: CheckBlock[][] = blocks.map(blockRow => {
    return blockRow.map(block => {
      return { block, isFilled: false }
    })
  })
  for (let y = 0; y < height; y++) {
    let start = 0
    let targetBlock = checkBlock[y][0]
    for (let x = 0; x < width; x++) {
      const currentBlock = checkBlock[y][x]
      if (currentBlock.block !== targetBlock.block) {
        fillCommands.push(
          makeFillCommand(
            fromX,
            fromY,
            fromZ,
            vertical,
            horizontal,
            y,
            start,
            0,
            x - start - 1,
            targetBlock.block
          )
        )
        start = x
        targetBlock = currentBlock
      }
    }
    fillCommands.push(
      makeFillCommand(
        fromX,
        fromY,
        fromZ,
        vertical,
        horizontal,
        y,
        start,
        0,
        width - start - 1,
        targetBlock.block
      )
    )
  }
  return fillCommands
}
