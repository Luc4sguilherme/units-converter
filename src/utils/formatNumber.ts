import * as math from 'mathjs';

export default (
  number: number | math.BigNumber | math.Fraction,
  precision: number,
) => math.format(number, { notation: 'auto', precision });
