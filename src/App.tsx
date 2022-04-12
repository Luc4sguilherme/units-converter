import { useMemo, useState } from 'react';

import Converter from './components/Converter';
import { getBaseUnits } from './utils/converter';

import './App.css';

function App() {
  const bases = useMemo(() => getBaseUnits(), []);
  const [base, setBase] = useState(bases[0]);

  return (
    <div className="container">
      <div className="unit-type-wrapper">
        <select
          name="unit-type"
          className="unit-type"
          onChange={event => setBase(event.currentTarget.value)}
        >
          {bases.map(baseunit => (
            <option key={baseunit} value={baseunit}>
              {baseunit.replaceAll('_', ' ')}
            </option>
          ))}
        </select>
      </div>

      <Converter base={base} />
    </div>
  );
}

export default App;
