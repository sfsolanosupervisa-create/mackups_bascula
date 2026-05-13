// ---------- Truck SVG (top-down view) ----------
function Truck({ rumble }) {
  return (
    <svg width="160" height="92" viewBox="0 0 200 110" className={rumble ? 'truck-rumble' : ''}>
      <ellipse cx="100" cy="100" rx="86" ry="6" fill="rgba(0,0,0,0.35)"/>
      <rect x="6" y="18" width="138" height="72" rx="4" fill="#8b5a3c"/>
      <rect x="6" y="18" width="138" height="72" rx="4" fill="url(#trailerShade)"/>
      <line x1="34" y1="22" x2="34" y2="86" stroke="rgba(0,0,0,0.25)" strokeWidth="1"/>
      <line x1="62" y1="22" x2="62" y2="86" stroke="rgba(0,0,0,0.25)" strokeWidth="1"/>
      <line x1="90" y1="22" x2="90" y2="86" stroke="rgba(0,0,0,0.25)" strokeWidth="1"/>
      <line x1="118" y1="22" x2="118" y2="86" stroke="rgba(0,0,0,0.25)" strokeWidth="1"/>
      <rect x="144" y="40" width="8" height="28" fill="#3a3a3a"/>
      <rect x="150" y="20" width="44" height="68" rx="6" fill="#2c5b8a"/>
      <rect x="150" y="20" width="44" height="68" rx="6" fill="url(#cabShade)"/>
      <rect x="186" y="28" width="6" height="52" rx="2" fill="#0d1822" opacity="0.55"/>
      <rect x="154" y="24" width="38" height="4" fill="rgba(255,255,255,0.18)"/>
      <rect x="10" y="10" width="22" height="10" rx="2" fill="#1a1a1a"/>
      <rect x="10" y="88" width="22" height="10" rx="2" fill="#1a1a1a"/>
      <rect x="40" y="10" width="22" height="10" rx="2" fill="#1a1a1a"/>
      <rect x="40" y="88" width="22" height="10" rx="2" fill="#1a1a1a"/>
      <rect x="108" y="10" width="22" height="10" rx="2" fill="#1a1a1a"/>
      <rect x="108" y="88" width="22" height="10" rx="2" fill="#1a1a1a"/>
      <rect x="158" y="10" width="22" height="10" rx="2" fill="#1a1a1a"/>
      <rect x="158" y="88" width="22" height="10" rx="2" fill="#1a1a1a"/>
      <defs>
        <linearGradient id="trailerShade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="rgba(255,255,255,0.18)"/>
          <stop offset="0.4" stopColor="rgba(255,255,255,0)"/>
          <stop offset="0.6" stopColor="rgba(0,0,0,0)"/>
          <stop offset="1" stopColor="rgba(0,0,0,0.25)"/>
        </linearGradient>
        <linearGradient id="cabShade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="rgba(255,255,255,0.2)"/>
          <stop offset="0.5" stopColor="rgba(255,255,255,0)"/>
          <stop offset="1" stopColor="rgba(0,0,0,0.3)"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

// ---------- Báscula 1: clean flow (5 steps) ----------
const STEPS_B1 = [
  { // 1 - báscula disponible
    sensorsTop: ['off','off','off'], sensorsBottom: ['off','off','off'],
    truckPos: '-25%', truckVisible: false,
    weight: 0, weightBlink: false,
    plate: '',
    obs: 'BÁSCULA DISPONIBLE', obsKind: 'plain',
    operation: 'disp', state: 'active',
  },
  { // 2 - se activa
    sensorsTop: ['green','off','off'], sensorsBottom: ['green','off','off'],
    truckPos: '-25%', truckVisible: false,
    weight: 0, weightBlink: true,
    plate: '',
    obs: 'LA BÁSCULA SE ENCUENTRA EN PROCESO DE PESAJE', obsKind: 'alert',
    operation: 'busy', state: 'active',
  },
  { // 3 - vehículo ingresando (anim from -25% to 50%)
    sensorsTop: ['off','green','off'], sensorsBottom: ['off','green','off'],
    truckPos: '50%', truckVisible: true,
    truckAnim: { from: '-25%', to: '50%', duration: 2800 },
    weight: 4820, weightBlink: false,
    plate: 'ABC994',
    obs: 'VEHÍCULO INGRESANDO A LA BÁSCULA', obsKind: 'alert',
    operation: 'busy', state: 'active',
  },
  { // 4 - ubicado correctamente
    sensorsTop: ['green','green','off'], sensorsBottom: ['green','green','off'],
    truckPos: '50%', truckVisible: true,
    weight: 15230, weightBlink: false,
    plate: 'ABC994',
    obs: 'VEHÍCULO UBICADO CORRECTAMENTE', obsKind: 'success',
    operation: 'busy', state: 'active',
  },
  { // 5 - vehículo saliendo (anim from 50% to 120%)
    sensorsTop: ['off','off','off'], sensorsBottom: ['off','off','off'],
    truckPos: '120%', truckVisible: true,
    truckAnim: { from: '50%', to: '120%', duration: 2800 },
    weight: 3120, weightBlink: false,
    plate: 'ABC994',
    obs: 'VEHÍCULO SALIENDO DE LA BÁSCULA', obsKind: 'alert',
    operation: 'busy', state: 'active',
    autoLoop: true,
  },
];

// ---------- Báscula 2: flow with failure (7 steps) ----------
const STEPS_B2 = [
  { // 1 - estableciendo comunicación
    sensorsTop: ['off','off','off'], sensorsBottom: ['off','off','off'],
    truckPos: '-25%', truckVisible: false,
    weight: 0, weightBlink: false,
    plate: '',
    obs: 'ESPERE… ESTABLECIENDO COMUNICACIÓN CON UN TERCERO', obsKind: 'wait',
    operation: 'block', state: 'inactive',
    desc: 'Conectando con servicio externo.',
  },
  { // 2 - solicite ayuda (failure)
    sensorsTop: ['off','off','off'], sensorsBottom: ['off','off','off'],
    truckPos: '-25%', truckVisible: false,
    weight: 0, weightBlink: false,
    plate: '',
    obs: 'SOLICITE AYUDA', obsKind: 'bell',
    operation: 'block', state: 'inactive',
    desc: 'Fallo de comunicación: se requiere intervención del operador.',
  },
  { // 3 - en proceso (anim from -25% to 50%)
    sensorsTop: ['off','green','off'], sensorsBottom: ['off','green','off'],
    truckPos: '50%', truckVisible: true,
    truckAnim: { from: '-25%', to: '50%', duration: 2800 },
    weight: 4820, weightBlink: true,
    plate: 'XYZ712',
    obs: 'LA BÁSCULA SE ENCUENTRA EN PROCESO DE PESAJE', obsKind: 'alert',
    operation: 'busy', state: 'active',
  },
  { // 4 - ubicado correctamente
    sensorsTop: ['green','green','off'], sensorsBottom: ['green','green','off'],
    truckPos: '50%', truckVisible: true,
    weight: 6400, weightBlink: false,
    plate: 'XYZ712',
    obs: 'VEHÍCULO UBICADO CORRECTAMENTE', obsKind: 'success',
    operation: 'busy', state: 'active',
    desc: 'Vehículo correctamente posicionado sobre la báscula.',
  },
  { // 5 - peso registrado
    sensorsTop: ['green','green','off'], sensorsBottom: ['green','green','off'],
    truckPos: '50%', truckVisible: true,
    weight: 6400, weightBlink: false,
    plate: 'XYZ712',
    obs: 'PESO REGISTRADO 6,400 Kg', obsKind: 'success',
    operation: 'busy', state: 'active',
    desc: 'Peso confirmado y registrado en el sistema.',
  },
  { // 6 - vehículo saliendo
    sensorsTop: ['off','off','off'], sensorsBottom: ['off','off','off'],
    truckPos: '78%', truckVisible: true,
    weight: 3120, weightBlink: false,
    plate: 'XYZ712',
    obs: 'VEHÍCULO SALIENDO DE LA BÁSCULA', obsKind: 'alert',
    operation: 'busy', state: 'active',
    desc: 'Vehículo descendiendo. La báscula libera tras salida completa.',
  },
  { // 7 - disponible (auto-loop to step 1)
    sensorsTop: ['off','off','off'], sensorsBottom: ['off','off','off'],
    truckPos: '120%', truckVisible: false,
    weight: 0, weightBlink: false,
    plate: '',
    obs: 'BÁSCULA DISPONIBLE', obsKind: 'plain',
    operation: 'disp', state: 'active',
    autoLoop: true,
  },
];

// ---------- Sensor ----------
function Sensor({ state, dir }) {
  const arrow = dir === 'down'
    ? <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="7 10 12 15 17 10"/></svg>
    : <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="7 14 12 9 17 14"/></svg>;
  const cls = 'sensor' + (state === 'green' ? ' sensor--green'
    : state === 'yellow' ? ' sensor--yellow'
    : state === 'red' ? ' sensor--red' : '');
  return <span className={cls}>{arrow}</span>;
}

function SensorRow({ states, dir }) {
  return (
    <div className="sensors">
      {states.map((s, i) => <Sensor key={i} state={s} dir={dir} />)}
    </div>
  );
}

// ---------- Bascula Card ----------
function BasculaCard({ title, step, onOpenModal, onSelect, isSelected, interactive, onLiberar }) {
  const s = step;
  const [cameraOpen, setCameraOpen] = React.useState(false);
  const [cameraView, setCameraView] = React.useState('lpr'); // 'lpr' | 'panoramic'
  // Animate truck within a step when truckAnim is set
  const [animPos, setAnimPos] = React.useState(null);
  const [animDur, setAnimDur] = React.useState(1400);
  React.useEffect(() => {
    if (s.truckAnim) {
      setAnimDur(0);
      setAnimPos(s.truckAnim.from);
      const t = setTimeout(() => {
        setAnimDur(s.truckAnim.duration || 2500);
        setAnimPos(s.truckAnim.to);
      }, 60);
      return () => clearTimeout(t);
    } else {
      setAnimDur(1400);
      setAnimPos(null);
    }
  }, [s]);
  const displayPos = animPos != null ? animPos : s.truckPos;
  const fmt = (n) => n.toLocaleString('en-US');
  const opPill =
    s.operation === 'disp'   ? { cls:'badge--op-disp',   txt:'Disponible' }
  : s.operation === 'busy'   ? { cls:'badge--op-busy',   txt:'Ocupado' }
  : s.operation === 'block'  ? { cls:'badge--op-block',  txt:'Bloqueado' }
  : /*manual*/                 { cls:'badge--op-manual', txt:'Modo Manual' };
  const stPill = s.state === 'active'
    ? { cls:'badge--st-active',   icon:'✓', txt:'Activo' }
    : { cls:'badge--st-inactive', icon:'✕', txt:'Inactivo' };

  let obsIcon = null;
  if (s.obsKind === 'success') obsIcon = <span className="observation__check">✓</span>;
  else if (s.obsKind === 'alert') obsIcon = <svg className="observation__icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;
  else if (s.obsKind === 'wait') obsIcon = <span className="observation__spinner"/>;
  else if (s.obsKind === 'bell') obsIcon = <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e74c3c" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{filter:'drop-shadow(0 0 4px rgba(231,76,60,0.5))'}}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>;

  return (
    <div
      className={'bcard' + (isSelected ? ' bcard--selected' : '')}
      onClick={onSelect}
    >
      <div className="bcard__head">
        <button className="btn-camera" onClick={e => { e.stopPropagation(); setCameraOpen(!cameraOpen); }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
          {cameraOpen ? 'Cerrar Cámara' : 'Ver Cámara'}
        </button>
        <div className="bcard__title">{title}</div>
      </div>

      {cameraOpen ? (
        <div className="camera-view">
          <img 
            src={cameraView === 'panoramic' ? 'uploads/WhatsApp Image 2026-05-12 at 3.14.27 PM.jpeg' : 'uploads/camion.jpeg'} 
            alt="Cámara báscula" 
          />
          <div className="camera-view__controls">
            <button 
              className="btn-panoramic"
              onClick={e => { 
                e.stopPropagation(); 
                setCameraView(cameraView === 'lpr' ? 'panoramic' : 'lpr'); 
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M7 6V4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"/></svg>
              {cameraView === 'lpr' ? 'Cambiar a panorámica' : 'Cambiar a LPR'}
            </button>
          </div>
        </div>
      ) : (
        <>
          <SensorRow states={s.sensorsTop} dir="down" />

          <div className="road">
            <div className="road__line"/>
            <div
              className={'road__truck' + (s.truckVisible ? '' : ' road__truck--off') + (s.weightBlink ? ' road__truck--rumble' : '')}
              style={{ left: displayPos, transitionDuration: animDur + 'ms' }}
            >
              <Truck rumble={s.weightBlink}/>
            </div>
          </div>

          <SensorRow states={s.sensorsBottom} dir="up" />
        </>
      )}

      <div className={'observation observation--' + s.obsKind}>
        {obsIcon}<span>{s.obs}</span>
      </div>

      <div className={'lcd' + (s.weightBlink ? ' lcd--blink' : '')}>
        {s.weight == null ? '' : fmt(s.weight)}{s.weight != null && <span className="lcd__unit">Kg</span>}
      </div>

      <div className={'plate' + (s.plate ? '' : ' plate--empty')}>
        {s.plate || 'Sin lectura'}
      </div>

      <div className="badges">
        <div className="badge-cell">
          <span className="badge-cell__label">Operación</span>
          <span className={'badge-pill ' + opPill.cls}>{opPill.txt}</span>
        </div>
        <div className="badge-cell">
          <span className="badge-cell__label">Estado</span>
          <span className={'badge-pill ' + stPill.cls}>{stPill.icon} {stPill.txt}</span>
        </div>
        <div className="badge-cell">
          <span className="badge-cell__label">Sentido</span>
          <span className="badge-pill badge--neutral">ⓘ Entrada</span>
        </div>
      </div>

      <button
        className="btn-liberar"
        disabled={!interactive || s.operation === 'disp'}
        onClick={e => { e.stopPropagation(); onLiberar(); }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>
        Liberar Báscula
      </button>
    </div>
  );
}

// ---------- Step bar (simplified) ----------
function StepBar({ step, totalSteps, setStep, activeLabel }) {
  return (
    <div className="stepbar">
      <div className="stepbar__top">
        <div className="stepbar__title">
          Controlando: <strong>{activeLabel}</strong>
        </div>
        <div className="stepbar__desc">Paso {step + 1} de {totalSteps}</div>
      </div>
      <div className="stepbar__actions stepbar__actions--simple">
        <button className="btn" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}>
          ← Anterior
        </button>
        <button className="btn btn--ghost" onClick={() => setStep(0)}>
          ⟲ Reiniciar
        </button>
        <button className="btn btn--primary" onClick={() => setStep(Math.min(totalSteps - 1, step + 1))} disabled={step === totalSteps - 1}>
          Siguiente →
        </button>
      </div>
    </div>
  );
}

// ---------- Modal ----------
function GestionModal({ onClose, onSubmit, plate, weight }) {
  const [form, setForm] = React.useState({
    placa: plate || 'ABC994',
    peso: weight ? weight.toLocaleString('en-US') : '15,230',
    tipo: 'Pesaje de Entrada',
    documento: '',
    obs: '',
  });
  const upd = (k, v) => setForm(f => ({ ...f, [k]: v }));
  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h3 className="modal__title">Gestión Manual de Pesaje</h3>
        <p className="modal__sub">Confirma los datos del vehículo antes de enviar el registro.</p>
        <div className="field--row">
          <div className="field">
            <label className="field__lbl">Placa</label>
            <input className="field__in" value={form.placa} onChange={e => upd('placa', e.target.value.toUpperCase())}/>
          </div>
          <div className="field">
            <label className="field__lbl">Peso (Kg)</label>
            <input className="field__in" value={form.peso} onChange={e => upd('peso', e.target.value)}/>
          </div>
        </div>
        <div className="field">
          <label className="field__lbl">Tipo de operación</label>
          <select className="field__sel" value={form.tipo} onChange={e => upd('tipo', e.target.value)}>
            <option>Pesaje de Entrada</option>
            <option>Pesaje de Salida</option>
            <option>Tara</option>
            <option>Pesaje Auxiliar</option>
          </select>
        </div>
        <div className="field">
          <label className="field__lbl">Documento conductor</label>
          <input className="field__in" placeholder="Ej. CC 1.020.345.678" value={form.documento} onChange={e => upd('documento', e.target.value)}/>
        </div>
        <div className="field">
          <label className="field__lbl">Observaciones</label>
          <textarea className="field__ta" placeholder="Notas opcionales del operador..." value={form.obs} onChange={e => upd('obs', e.target.value)}/>
        </div>
        <div className="modal__actions">
          <button className="btn" onClick={onClose}>Cancelar</button>
          <button className="btn btn--primary" onClick={() => onSubmit(form)}>Enviar Pesaje</button>
        </div>
      </div>
    </div>
  );
}

window.BasculaCard = BasculaCard;
window.StepBar = StepBar;
window.GestionModal = GestionModal;
window.STEPS_B1 = STEPS_B1;
window.STEPS_B2 = STEPS_B2;
