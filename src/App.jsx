import { useMemo, useState } from 'react';
import {
  calculateFinalPrice,
  fareCatalog,
  formatPrice,
  lineRoute,
  stopSequence,
  tariffRows,
  TARIFF_GROUPS,
} from './data';

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

const fareOrder = ['standard', 'reduced', 'night', 'supplement', 'luggage'];

export default function App() {
  const [fareMode, setFareMode] = useState('standard');
  const [zone, setZone] = useState('I');
  const [distance, setDistance] = useState('short');
  const [payment, setPayment] = useState('cash');
  const [passengerType, setPassengerType] = useState('adult');
  const [stopIndex, setStopIndex] = useState(0);

  const baseFare = useMemo(() => {
    const value = fareCatalog[fareMode]?.[distance]?.[zone]?.[payment];
    return value ?? null;
  }, [fareMode, distance, zone, payment]);

  const finalFare = useMemo(() => {
    return baseFare === null ? null : calculateFinalPrice(baseFare, passengerType);
  }, [baseFare, passengerType]);

  const currentStop = stopSequence[stopIndex % stopSequence.length];

  const priceSummary = useMemo(() => {
    const modeLabel = fareLabels[fareMode] || 'Jízdné';
    const zoneLabel = zoneLabels[zone] || 'zóna I';
    const distanceLabel = distanceLabels[distance] || 'do 3 zastávkových úseků';
    return `${modeLabel} • ${zoneLabel} • ${distanceLabel}`;
  }, [fareMode, zone, distance]);

  const rotateFare = () => {
    const currentIndex = fareOrder.indexOf(fareMode);
    const nextIndex = (currentIndex + 1) % fareOrder.length;
    setFareMode(fareOrder[nextIndex]);
  };

  const resetTariff = () => {
    setFareMode('standard');
    setZone('I');
    setDistance('short');
    setPayment('cash');
    setPassengerType('adult');
  };

  const travelerLabel = TARIFF_GROUPS[passengerType]?.label || 'Dospělý';

  return (
    <div className="page-shell">
      <div className="panel panel-main">
        <header className="header-block">
          <div>
            <p className="eyebrow">MHD tarifní simulátor</p>
            <h1>Kasa + palubní hlášení</h1>
          </div>
        </header>

        <div className="route-banner">
          <div className="route-pill">{lineRoute.label}</div>
          <div className="route-meta">{lineRoute.direction}</div>
        </div>

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
            {Object.entries(TARIFF_GROUPS).map(([key, item]) => (
              <button
                key={key}
                type="button"
                className={passengerType === key ? 'active' : ''}
                onClick={() => setPassengerType(key)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="summary-box">
          <p className="label">Výpočet</p>
          <div className="summary-ticket">{priceSummary}</div>
          <div className="price-box">{finalFare === null ? '–' : `${finalFare} Kč`}</div>
          <div className="status-pill">
            {finalFare === null
              ? 'Tento tarif není pro vybranou kombinaci dostupný.'
              : `Vybráno: ${paymentLabels[payment]} • ${travelerLabel}`}
          </div>
        </div>

        <div className="detail-box">
          <div className="detail-header">Detailní výpočet</div>
          <div className="detail-row">
            <span>Základní cena</span>
            <strong>{baseFare === null ? '–' : `${baseFare} Kč`}</strong>
          </div>
          <div className="detail-row">
            <span>Skupina</span>
            <strong>{travelerLabel}</strong>
          </div>
          <div className="detail-row">
            <span>Výsledná cena</span>
            <strong>{finalFare === null ? '–' : `${finalFare} Kč`}</strong>
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
                  <td>{row.zoneI === null ? '—' : `${row.zoneI} Kč`}</td>
                  <td>{row.zoneII === null ? '—' : `${row.zoneII} Kč`}</td>
                  <td>{row.max ? `${row.max} Kč` : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <aside className="panel panel-output">
        <div className="route-head">
          <div className="line-badge">{lineRoute.number}</div>
          <div>
            <div className="route-title">{lineRoute.label}</div>
            <div className="route-subtitle">{lineRoute.direction}</div>
          </div>
        </div>

        <div className="announcement-box">
          <div className="announcement-label">Palubní hlášení</div>
          <div className="announcement-line">
            Příští zastávka je: <strong>{currentStop.stop}</strong>.
          </div>
          <div className="announcement-line">
            Dále pokračuje směr <strong>{currentStop.direction}</strong>.
          </div>
          <div className="announcement-line">{currentStop.note}</div>
        </div>

        <div className="actions">
          <button type="button" className="primary" onClick={() => setStopIndex((value) => value + 1)}>
            Další zastávka
          </button>
          <button type="button" className="secondary" onClick={rotateFare}>
            Přepnout tarif
          </button>
          <button type="button" className="ghost" onClick={resetTariff}>
            Reset
          </button>
        </div>

        <div className="stop-list-box">
          <div className="stop-list-title">Trasa</div>
          <ul>
            {lineRoute.stops.map((stop, index) => (
              <li key={`${stop}-${index}`} className={index === stopIndex % lineRoute.stops.length ? 'active-stop' : ''}>
                {stop}
              </li>
            ))}
          </ul>
        </div>

        <div className="stop-chip">Nástup: {stopIndex + 1} / {lineRoute.stops.length}</div>
      </aside>
    </div>
  );
}
