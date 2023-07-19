/**
 * get Average (mean)
 * @param array 2-dimensional array
 * @returns average
 */
export const average = (array: number[][]) => {
  const values = array.flat()
  const sum = values.reduce((pre, cur) => pre + cur, 0)
  return sum / values.length
}

/**
 * get Median
 * @param array 2-dimensional array
 * @returns median value
 */
export const median = (array: number[][]) => {
  const values = array.flat()
  values.sort()
  const size = values.length
  return (size % 2 === 1 ? values[size / 2 | 0] : (values[size / 2 - 1] + values[size / 2]) / 2)
}

/**
 * get representantive value
 * @param array 2-dimensional array
 * @param represent average | median
 * @returns representantive value
 */
export const representativeValue =
  (array: number[][], represent: 'average' | 'median') =>
    (represent === 'average' ? average(array) : median(array))
