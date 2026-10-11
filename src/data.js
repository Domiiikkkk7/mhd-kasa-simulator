import { useMemo, useState } from 'react';
import { fareCatalog, tariffRows, stopSequence } from './data';

const fareLabels = {
  standard: 'Základní jízdné',
  reduced: 'Zlevněné jízdné',
  night: 'Jízdné pro noční linky',
  supplement: 'Příplatek k časové jízdence',
  luggage: 'Dovozné',
};

const paymentLabels = {
  cash: 'hotovost',
  card: 'karta',
  electronic: 'MHD / elektronická',
};

const zoneLabels = {
  I: 'zóna I',
  'I+II': 'zóna I + II',
};

const distanceLabels = {
  short: 'do 3 zastávkových úseků',
  long: 'nad 3 zastávkové úseky',
};

function formatPrice(value) {
  return value === null || value === undefined ? '–' : `${value} Kč`;
}

export default function App() {
  const [fareMode, setFareMode] = useState('standard');
  const [zone, setZone] = useState('I');
  const [distance, setDistance] = useState('short');
  const [payment, setPayment] = useState('cash');
  const [passengerType, setPassengerType] = useState('adult');
  const [stopIndex, setStopIndex] = useState(0);

  const selectedFare = useMemo(() => {
    const value = fareCatalog[fareMode]?.[distance]?.[zone]?.[payment];
    return value ?? null;
  }, [fareMode, distance, zone, payment]);

  const currentStop = stopSequence[stopIndex % stopSequence.length];

  const announcement = `Příští zastávka je: ${currentStop.stop}. Dále pokračuje směr ${currentStop.direction}. ${currentStop.note}`;

  const priceSummary = useMemo(() => {
    const modeLabel = fareLabels[fareMode] || 'Jízdné';
    const zoneLabel = zoneLabels[zone] || 'zóna I';
    const distanceLabel = distanceLabels[distance] || 'do 3 zastávkových úseků';

    return `${modeLabel} • ${zoneLabel} • ${distanceLabel}`;
  }, [fareMode, zone, distance]);

  return (
    <div className="page-shell">
      <div className="panel">
        <header className="header-block">
          <div>
            <p className="eyebrow">MHD tarifní simulátor</p>
            <h1>Kalibrace kasy a palubního hlášení</h1>
          </div>
        </header>

        <div className="settings-grid">
          <div className="field">
            <label>Typ jízdného</label>
            <select value={fareMode} onChange={(e) => setFareMode(e.target.value)}>
              {Object.entries(fareLabels).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>

          <div className="field">
            <label>Zóna</label>
            <select value={zone} onChange={(e) => setZone(e.target.value)}>
              {Object.entries(zoneLabels).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>

          <div className="field">
            <label>Délka cesty</label>
            <select value={distance} onChange={(e) => setDistance(e.target.value)}>
              {Object.entries(distanceLabels).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>

          <div className="field">
            <label>Platba</label>
            <select value={payment} onChange={(e) => setPayment(e.target.value)}>
              {Object.entries(paymentLabels).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="toggle-group">
          <label>Skupina cestujícího</label>
          <div className="segmented">
            {[
              { key: 'adult', label: 'Dospělý' },
              { key: 'student', label: 'Student / dítě' },
              { key: 'senior', label: 'Senior / ZTP' },
            ].map((item) => (
              <button
                key={item.key}
                type="button"
                className={passengerType === item.key ? 'active' : ''}
                onClick={() => setPassengerType(item.key)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="summary-box">
          <p className="label">Výpočet</p>
          <div className="summary-ticket">{priceSummary}</div>
          <div className="price-box">{selectedFare === null ? '–' : `${selectedFare} Kč`}</div>
          <div className="status-pill">
            {selectedFare === null
              ? 'Tento tarif není pro vybranou kombinaci dostupný.'
              : `Vybráno: ${paymentLabels[payment]} • ${passengerType === 'adult' ? 'dospělý' : passengerType === 'student' ? 'student/dítě' : 'senior/ZTP'}`}
          </div>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Typ jízdného</th>
                <th>zóna I</th>
                <th>zóna I + II</th>
                <th>Max. výše</th>
              </tr>
            </thead>
            <tbody>
              {tariffRows.map((row) => (
                <tr key={row.label}>
                  <td>{row.label}</td>
                  <td>{formatPrice(row.zoneI)}</td>
                  <td>{formatPrice(row.zoneII)}</td>
                  <td>{row.max ? `${row.max} Kč` : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <aside className="panel panel-output">
        <div className="route-head">
          <div className="line-badge">A</div>
          <div>
            <div className="route-title">Linka 101</div>
            <div className="route-subtitle">Směr: Nádraží / Vltavská</div>
          </div>
        </div>

        <div className="announcement-box">{announcement}</div>

        <div className="actions">
          <button type="button" className="primary" onClick={() => setStopIndex((current) => current + 1)}>
            Další zastávka
          </button>
          <button type="button" className="secondary" onClick={() => setStopIndex(0)}>
            Reset
          </button>
        </div>

        <div className="stop-chip">Nástup: {stopIndex + 1} / {stopSequence.length}</div>
      </aside>
    </div>
  );
}
