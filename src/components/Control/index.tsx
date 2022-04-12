import './styles.css';

import { useEffect, useRef, useState } from 'react';

import { getPrefixes, getUnits, Prefix, Unit } from '../../utils/converter';

type UnitState = {
  name: string;
  prefix: string;
  value: string;
};

type ControlProps = {
  base: string;
  units: Unit[];
  readOnly: boolean;
  unit: UnitState;
  setUnits: React.Dispatch<React.SetStateAction<Unit[]>>;
  setUnit: React.Dispatch<React.SetStateAction<UnitState>>;
};

export default function Control({
  base,
  unit,
  units,
  readOnly,
  setUnit,
  setUnits,
}: ControlProps) {
  const [prefixes, setPrefixes] = useState<Prefix[]>([]);

  const unitRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    setUnits(getUnits(base));
  }, [base]);

  function setUnitEventHandler(event: Event) {
    event.preventDefault();

    setUnit(prev => ({ ...prev, prefix: '' }));
    setUnit(prev => ({
      ...prev,
      name: (event.currentTarget as HTMLSelectElement).value,
    }));
  }

  useEffect(() => {
    if (unitRef.current) {
      unitRef.current.addEventListener('change', setUnitEventHandler);
    }

    if (units[0].name) {
      setUnit(prev => ({ ...prev, name: units[0].name }));
      setUnit(prev => ({ ...prev, prefix: '' }));
    }

    return () => {
      unitRef.current?.removeEventListener('change', setUnitEventHandler);
    };
  }, [units]);

  useEffect(() => {
    setPrefixes(getPrefixes(unit.name));
  }, [unit]);

  function maxLengthCheck(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.currentTarget.value.length > event.currentTarget.maxLength) {
      return event.currentTarget.value.slice(0, event.currentTarget.maxLength);
    }

    return event.currentTarget.value;
  }

  return (
    <div className="control-wrapper">
      <input
        type="number"
        name="unit-value"
        className="unit-value"
        value={unit.value}
        maxLength={12}
        readOnly={readOnly}
        onChange={event =>
          setUnit(prev => ({
            ...prev,
            value: maxLengthCheck(event),
          }))
        }
      />

      <div className="unit-wrapper">
        {prefixes.length > 1 ? (
          <select
            name="prefix"
            className="prefix"
            value={unit.prefix}
            onChange={event =>
              setUnit(prev => ({ ...prev, prefix: event.currentTarget.value }))
            }
          >
            {prefixes.map((prefix: Prefix) => (
              <option key={prefix.name} value={prefix.name}>
                {prefix.name}
              </option>
            ))}
          </select>
        ) : (
          ''
        )}

        <select name="unit-name" className="unit-name" ref={unitRef}>
          {units.map((value: Prefix) => (
            <option key={value.name} value={value.name}>
              {value.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
