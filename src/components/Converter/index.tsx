import './styles.css';

import { useEffect, useState } from 'react';

import { convert, getUnits, Unit } from '../../utils/converter';
import formatNumber from '../../utils/formatNumber';
import Control from '../Control';

type ConverterProps = {
  base: string;
};

export default function Converter({ base }: ConverterProps) {
  const [units, setUnits] = useState<Unit[]>(getUnits(base));
  const [unit1, setUnit1] = useState({
    name: units[0].name,
    prefix: '',
    value: '1',
  });
  const [unit2, setUnit2] = useState({
    name: units[0].name,
    prefix: '',
    value: '1',
  });

  useEffect(() => {
    const value = convert(
      {
        value: unit1.value,
        name: unit1.name,
        prefix: unit1.prefix,
      },
      {
        name: unit2.name,
        prefix: unit2.prefix,
      },
    );

    setUnit2(prev => ({ ...prev, value: formatNumber(value, 6) }));
  }, [base, unit1.value, unit1.name, unit1.prefix, unit2.name, unit2.prefix]);

  return (
    <div className="converter-wrapper">
      <Control
        units={units}
        unit={unit1}
        base={base}
        setUnits={setUnits}
        setUnit={setUnit1}
      />
      <span>=</span>
      <Control
        units={units}
        unit={unit2}
        base={base}
        setUnits={setUnits}
        setUnit={setUnit2}
      />
    </div>
  );
}
