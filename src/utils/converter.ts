// @ts-nocheck
import * as math from 'mathjs';

export type BaseUnit = {
  dimensions: number[];
  key: string;
};

export type Prefix = {
  name: string;
};

export type Unit = {
  name: string;
  base: BaseUnit;
  prefixes: Prefix[];
};

export function isSameUnit(unit1: string, unit2: string) {
  const a = math.unit(1, unit1);
  const b = math.unit(1, unit2);

  return a.equals(b);
}

export function getUnits(baseunit: string): Unit[] {
  const units = Object.values(math.Unit.UNITS) as Unit[];

  return units
    .filter(unit => unit.base.key === baseunit.toUpperCase())
    .sort((a, b) => b.name.length - a.name.length)
    .reduce((accumulator, current) => {
      if (
        accumulator.filter((value: Unit) =>
          isSameUnit(value.name, current.name),
        ).length === 0
      ) {
        accumulator.push(current);
      }

      return accumulator;
    }, [])
    .sort((a: Unit, b: Unit) => a.name.localeCompare(b.name));
}

export function getUnit(unit: string): Unit[] {
  const units = Object.values(math.Unit.UNITS) as Unit[];

  return units.filter(value => value.name === unit);
}

export function getPrefixes(unit: string): Prefix[] {
  const unitInfos = getUnit(unit);

  return unitInfos
    .map(value => Object.values(value.prefixes))
    .flat(2)
    .reduce((accumulator, current) => {
      if (
        accumulator.filter((value: Unit) => value.value === current.value)
          .length === 0
      ) {
        accumulator.push(current);
      }

      return accumulator;
    }, [])
    .sort((a, b) => b.value - a.value)
    .sort((a, b) => {
      if (a.name === '' && b.name !== '') {
        return -1;
      }

      if (a.name !== '' && b.name === '') {
        return 1;
      }

      return 0;
    });
}

export function getBaseUnits() {
  const baseUnits = Object.values(math.Unit.BASE_UNITS) as BaseUnit[];

  return baseUnits
    .filter((baseunit: BaseUnit) => baseunit.key !== 'NONE')
    .map((baseunit: BaseUnit) => baseunit.key);
}

export function convert(unit1: any, unit2: any) {
  const a = math.unit(unit1.value, `${unit1.prefix}${unit1.name}`);

  return a.toNumeric(`${unit2.prefix}${unit2.name}`);
}
