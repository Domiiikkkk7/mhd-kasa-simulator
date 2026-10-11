import { useMemo, useState } from 'react';
import {
  calculateFinalPrice,
  fareCatalog,
  formatPrice,
  lineRoutes,
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
  const [selectedLine, setSelectedLine] = useState('98');
  const [selectedDirection, setSelectedDirection] = useState('A');
  const [fareMode, setFareMode] = useState('standard');
  const [zone, setZone] = useState('I');
  const [distance, setDistance] = useState('short');
  const [payment, setPayment] = useState('cash');
  const [passengerType, setPassengerType] = useState('adult');
  const [stopIndex, setStopIndex] = useState(0);

  const lineRoute = lineRoutes[selectedLine];
  const directionData = lineRoute.directions[selectedDirection];
  const currentStop = directionData.stops[stopIndex % directionData.stops.length];

  const baseFare = useMemo(() => {
    const value = fareCatalog[fareMode]?.[distance]?.[zone]?.[payment];
    return value ?? null;
  }, [fareMode, distance, zone, payment]);

  const finalFare = useMemo(() => {
    return baseFare === null ? null : calculateFinalPrice(baseFare, passengerType);
  }, [baseFare, passengerType]);

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
    setStopIndex(0);
  };

  const travelerLabel = TARIFF_GROUPS[passengerType]?.label || 'Dospělý';

  return (
    <div className="page-shell">
      <div className="panel panel-main">
        <header className="header-block">
          <div>
            <p className="eyebrow">MHD tarifní terminál</p>
            <h1>Kasa + Palubní systém</h1>
          </div>
        </header>

        <div className="line-selector">
          <label>Vyber linku</label>
          <div className="line-buttons">
            {Object.keys(lineRoutes).map((lineNum) => (
              <button
                key={lineNum}
                className={selectedLine === lineNum ? 'line-btn active' : 'line-btn'}
                onClick={() => {
                  setSelectedLine(lineNum);
                  setSelectedDirection(Object.keys(lineRoutes[lineNum].directions)[0]);
                  setStopIndex(0);
                }}
              >
                {lineNum}
              </button>
            ))}
          </div>
        </div>

        <div className="direction-selector">
          <label>Směr</label>
          <div className="direction-buttons">
            {Object.entries(lineRoute.directions).map(([dir, data]) => (
              <button
                key={dir}
                className={selectedDirection === dir ? 'dir-btn active' : 'dir-btn'}
                onClick={() => {
                  setSelectedDirection(dir);
                  setStopIndex(0);
                }}
              >
                <span className="dir-label">{dir}</span>
                <span className="dir-dest">{data.destination}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="route-banner">
          <div className="route-pill">Linka {lineRoute.number}</div>
          <div className="route-meta">{directionData.destination}</div>
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
            <div className="route-title">Linka {lineRoute.number}</div>
            <div className="route-subtitle">Směr {selectedDirection}: {directionData.destination}</div>
          </div>
        </div>

        <div className="announcement-box">
          <div className="announcement-label">Palubní hlášení</div>
          <div className="announcement-line">
            Příští zastávka je: <strong>{currentStop}</strong>.
          </div>
          <div className="announcement-line">
            Směr: <strong>{directionData.destination}</strong>
          </div>
          <div className="announcement-line">
            {stopIndex === 0 ? 'Odjezd z vozovny.' : 'Prosíme, držte se a buďte opatrní.'}
          </div>
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
          <div className="stop-list-title">Trasa ({directionData.stops.length} zastávek)</div>
          <ul className="stop-list-scrollable">
            {directionData.stops.map((stop, index) => (
              <li 
                key={`${stop}-${index}`} 
                className={index === stopIndex % directionData.stops.length ? 'active-stop' : ''}
              >
                <span className="stop-index">{index + 1}</span>
                <span className="stop-name">{stop}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="stop-chip">Stanice: {stopIndex + 1} / {directionData.stops.length}</div>
      </aside>
    </div>
  );
}
