:root {
  font-family: Inter, "Segoe UI", sans-serif;
  line-height: 1.5;
  color: #17212d;
  background: #edf4fb;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  box-sizing: border-box;
}

html, body, #root {
  min-height: 100%;
  margin: 0;
}

body {
  min-height: 100vh;
  background: linear-gradient(180deg, #f3f8ff 0%, #ebf0f8 100%);
}

button, select {
  font: inherit;
}

.page-shell {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 20px;
  display: grid;
  grid-template-columns: 1.35fr 0.8fr;
  gap: 24px;
}

.panel {
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid #dde8f5;
  border-radius: 20px;
  box-shadow: 0 18px 40px rgba(32, 64, 96, 0.08);
  padding: 24px;
}

.header-block {
  margin-bottom: 20px;
}

.eyebrow {
  margin: 0 0 8px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #376d9d;
  font-size: 0.75rem;
  font-weight: 700;
}

h1 {
  margin: 0;
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  line-height: 1.1;
}

.settings-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 9px;
  margin-bottom: 14px;
}

.field label,
.toggle-group label {
  color: #4f6174;
  font-size: 0.9rem;
  font-weight: 700;
}

select {
  width: 100%;
  border: 1px solid #dfe8f3;
  border-radius: 12px;
  padding: 12px 14px;
  background: #fff;
  color: #17212d;
  outline: none;
}

select:focus {
  border-color: #407cbd;
  box-shadow: 0 0 0 4px rgba(64, 124, 189, 0.12);
}

.toggle-group {
  margin-top: 8px;
  margin-bottom: 18px;
}

.segmented {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
  margin-top: 10px;
}

.segmented button {
  border: 1px solid #dfe8f3;
  border-radius: 10px;
  background: #eef5fe;
  color: #1b2430;
  padding: 11px 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
}

.segmented button.active {
  background: linear-gradient(135deg, #0d6ecf, #1f9fe4);
  color: #fff;
  border-color: transparent;
  box-shadow: 0 10px 20px rgba(19, 104, 189, 0.2);
}

.summary-box {
  margin-top: 12px;
  background: linear-gradient(135deg, #edf7ff, #f8fbff);
  border: 1px solid #dfeaf7;
  border-radius: 16px;
  padding: 18px 18px 16px;
}

.label {
  margin: 0 0 8px;
  color: #59768d;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.summary-ticket {
  color: #263a52;
  font-weight: 700;
  margin-bottom: 10px;
}

.price-box {
  font-size: clamp(2rem, 3vw, 2.8rem);
  font-weight: 900;
  color: #0d6ecf;
  letter-spacing: -0.04em;
}

.status-pill {
  margin-top: 14px;
  display: inline-flex;
  align-items: center;
  padding: 8px 12px;
  border-radius: 999px;
  background: #e9f8ef;
  color: #1a7d52;
  font-weight: 700;
  font-size: 0.85rem;
}

.table-wrap {
  margin-top: 22px;
  overflow: auto;
  border: 1px solid #e0eaf4;
  border-radius: 14px;
}

table {
  width: 100%;
  border-collapse: collapse;
  min-width: 640px;
}

th, td {
  text-align: left;
  padding: 12px 10px;
  border-bottom: 1px solid #eef4fb;
  font-size: 0.94rem;
}

th {
  background: #f3f8ff;
  color: #17212d;
  font-weight: 800;
}

tr:last-child td {
  border-bottom: none;
}

.panel-output {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.route-head {
  display: flex;
  align-items: center;
  gap: 14px;
}

.line-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ffd76d, #f7b600);
  font-weight: 900;
  font-size: 1.4rem;
  color: #1f2933;
}

.route-title {
  font-size: 1.3rem;
  font-weight: 800;
}

.route-subtitle {
  color: #5d7183;
  font-size: 0.92rem;
}

.announcement-box {
  background: #f8fafc;
  border: 1px solid #e3ecf6;
  border-radius: 14px;
  padding: 18px 16px;
  line-height: 1.6;
  min-height: 150px;
  color: #293f56;
}

.actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

button.primary,
button.secondary {
  appearance: none;
  border: none;
  border-radius: 12px;
  padding: 12px 18px;
  font-weight: 800;
  cursor: pointer;
}

button.primary {
  background: linear-gradient(135deg, #0f6fce, #1d9ce0);
  color: #fff;
  box-shadow: 0 12px 20px rgba(25, 96, 170, 0.18);
}

button.secondary {
  background: #eef3f9;
  color: #20314b;
  border: 1px solid #dde8f4;
}

.stop-chip {
  display: inline-flex;
  width: fit-content;
  padding: 8px 12px;
  border-radius: 999px;
  background: #ecf9ef;
  color: #1d754d;
  font-weight: 800;
}

@media (max-width: 900px) {
  .page-shell {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .settings-grid,
  .segmented {
    grid-template-columns: 1fr;
  }

  .panel {
    padding: 18px 16px;
  }
}
