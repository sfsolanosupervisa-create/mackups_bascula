/* global React, ReactDOM, Sidebar, Topbar,
          BasculaCard, StepBar, GestionModal, STEPS_B1, STEPS_B2,
          ClientesVIPList, ClienteVIPModal, ConfirmDelete, ToastStack, SAMPLE_DATA,
          useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakColor */

// ===== MONITORING VIEW =====
const ALL_BASCULAS = [
  { id: 'b1', label: 'Báscula 1' },
  { id: 'b2', label: 'Báscula 2' },
];

function MonitoringView() {
  const [step1, setStep1] = React.useState(0);
  const [step2, setStep2] = React.useState(0);
  const [active, setActive] = React.useState('b1');
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalSource, setModalSource] = React.useState(null);
  const [toast, setToast] = React.useState(null);
  const [refreshing, setRefreshing] = React.useState(false);
  const [tags, setTags] = React.useState([
    { id: 'b1', label: 'Báscula 1' },
    { id: 'b2', label: 'Báscula 2' },
  ]);

  const submitForm = (form) => {
    setModalOpen(false);
    setToast(`Pesaje enviado: ${form.placa} · ${form.peso} Kg`);
    setTimeout(() => setToast(null), 2400);
    if (modalSource === 'b1') setStep1(0);
    if (modalSource === 'b2') setStep2(0);
  };

  const refresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 700);
  };

  const removeTag = (id) => {
    setTags(t => {
      const next = t.filter(x => x.id !== id);
      if (id === active && next.length > 0) setActive(next[0].id);
      return next;
    });
  };

  const addTag = (id) => {
    const def = ALL_BASCULAS.find(b => b.id === id);
    if (!def) return;
    setTags(t => t.find(x => x.id === id) ? t : [...t, def]);
    setActive(id);
  };

  const liveStep1 = STEPS_B1[step1];
  const liveStep2 = STEPS_B2[step2];

  React.useEffect(() => {
    if (liveStep1.autoLoop) {
      const t = setTimeout(() => setStep1(0), 3400);
      return () => clearTimeout(t);
    }
  }, [step1]);

  React.useEffect(() => {
    if (liveStep2.autoLoop) {
      const t = setTimeout(() => setStep2(0), 3400);
      return () => clearTimeout(t);
    }
  }, [step2]);

  const isShown = (id) => !!tags.find(t => t.id === id);
  const missing = ALL_BASCULAS.filter(b => !isShown(b.id));

  const activeIsB1 = active === 'b1' && isShown('b1');
  const activeIsB2 = active === 'b2' && isShown('b2');

  React.useEffect(() => {
    if (!isShown(active) && tags.length > 0) setActive(tags[0].id);
  }, [tags]);

  const activeStep = activeIsB1 ? step1 : activeIsB2 ? step2 : 0;
  const activeTotal = activeIsB1 ? STEPS_B1.length : activeIsB2 ? STEPS_B2.length : 1;
  const activeLabel = activeIsB1 ? 'Báscula 1' : activeIsB2 ? 'Báscula 2' : '—';
  const setActiveStep = (n) => {
    if (activeIsB1) setStep1(n);
    else if (activeIsB2) setStep2(n);
  };

  const openModal = (src) => {
    setModalSource(src);
    setModalOpen(true);
  };

  return (
    <div className="view-monitoring">
      <main className="main">
        <div className="topbar">
          <div className="topbar__crumbs">
            <span className="topbar__crumbs-dot">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/>
              </svg>
            </span>
            <strong>Supervisa</strong>
            <span>/</span>
            <span>Interfaz de Monitoreo</span>
          </div>
          <span className="topbar__gear">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
          </span>
        </div>

        <div className="page">
          <div className="page__toolbar">
            <div className="tag-select">
              {tags.map(t => (
                <span key={t.id} className="tag-chip">
                  {t.label}
                  <span className="tag-chip__x" onClick={() => removeTag(t.id)}>×</span>
                </span>
              ))}
              {missing.map(b => (
                <button key={b.id} className="tag-add" onClick={() => addTag(b.id)} title={`Agregar ${b.label}`}>
                  + {b.label}
                </button>
              ))}
              <span className="tag-select__caret">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </span>
            </div>
            <button className={'btn-refresh' + (refreshing ? ' btn-refresh--spin' : '')} onClick={refresh}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 4 23 10 17 10"/>
                <polyline points="1 20 1 14 7 14"/>
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
              </svg>
            </button>
          </div>

          <div className="cards-wrap">
            <div className={'cards-grid' + (tags.length === 1 ? ' cards-grid--single' : '')}>
              {isShown('b1') && (
                <BasculaCard
                  title="Báscula 1"
                  step={liveStep1}
                  interactive={true}
                  isSelected={active === 'b1'}
                  onSelect={() => setActive('b1')}
                  onOpenModal={() => openModal('b1')}
                  onLiberar={() => {
                    alert('Báscula liberada correctamente');
                    setStep1(4);
                  }}
                />
              )}
              {isShown('b2') && (
                <BasculaCard
                  title="Báscula 2"
                  step={liveStep2}
                  interactive={true}
                  isSelected={active === 'b2'}
                  onSelect={() => setActive('b2')}
                  onOpenModal={() => openModal('b2')}
                  onLiberar={() => {
                    alert('Báscula liberada correctamente');
                    setStep2(6);
                  }}
                />
              )}
              {tags.length === 0 && (
                <div className="cards-empty">
                  Selecciona una báscula para visualizar su estado.
                </div>
              )}
            </div>
          </div>

          {tags.length > 0 && (
            <StepBar
              step={activeStep}
              totalSteps={activeTotal}
              setStep={setActiveStep}
              activeLabel={activeLabel}
            />
          )}
        </div>
      </main>

      {modalOpen && (
        <GestionModal
          onClose={() => setModalOpen(false)}
          onSubmit={submitForm}
          plate={modalSource === 'b1' ? liveStep1.plate : liveStep2.plate}
          weight={modalSource === 'b1' ? liveStep1.weight : liveStep2.weight}
        />
      )}

      {toast && (
        <div className="mon-toast">
          <span style={{color:'#6ec53c'}}>✓</span> {toast}
        </div>
      )}
    </div>
  );
}

// ===== VIP VIEW =====
const VIP_TWEAK_DEFAULTS = {
  accent: "#2bc48a",
  density: "comfortable",
  rangeMode: "dates",
};

function VIPView() {
  const [t, setTweak] = useTweaks(VIP_TWEAK_DEFAULTS);
  const [data, setData] = React.useState(SAMPLE_DATA);
  const [modal, setModal] = React.useState(null);
  const [confirm, setConfirm] = React.useState(null);
  const [toasts, setToasts] = React.useState([]);

  React.useEffect(() => {
    document.documentElement.style.setProperty("--accent", t.accent);
    document.documentElement.style.setProperty("--sidebar-active", t.accent);
    document.documentElement.dataset.density = t.density;
  }, [t.accent, t.density]);

  const pushToast = React.useCallback((message, type = "success") => {
    const id = Date.now() + Math.random();
    setToasts(ts => [...ts, { id, message, type }]);
  }, []);
  const dismiss = (id) => setToasts(ts => ts.filter(x => x.id !== id));

  const handleSave = (item) => {
    if (modal.mode === "create") {
      setData(d => [{...item, id: Date.now()}, ...d]);
      pushToast(`Usuario VIP ${item.first} ${item.last} creado correctamente`);
    } else {
      setData(d => d.map(x => x.id === item.id ? item : x));
      pushToast(`Cambios guardados para ${item.first} ${item.last}`);
    }
    setModal(null);
  };

  const handleDelete = () => {
    const it = confirm;
    setData(d => d.filter(x => x.id !== it.id));
    setConfirm(null);
    setModal(null);
    pushToast(`Usuario VIP ${it.first} ${it.last} eliminado`, "error");
  };

  const handleToggleActive = (r) => {
    setData(d => d.map(x => x.id === r.id
      ? { ...x, status: x.status === 'inactive' ? 'active' : 'inactive' } : x));
    pushToast(`${r.first} ${r.last} ${r.status === 'inactive' ? 'activado' : 'desactivado'}`,
      r.status === 'inactive' ? 'success' : 'info');
  };

  const handleRenew = (r) => {
    const newEnd = new Date(Date.now() + 90*86400000).toISOString().slice(0, 10);
    setData(d => d.map(x => x.id === r.id ? { ...x, end: newEnd, status: 'active' } : x));
    pushToast(`Acceso de ${r.first} ${r.last} renovado por 90 días`);
  };

  return (
    <div className="view-vip">
      <main className="main">
        <Topbar crumbs={["Supervisa", "Clientes", "Usuarios VIP"]}/>
        <ClientesVIPList
          data={data}
          onCreate={() => setModal({ mode: "create", item: null })}
          onEdit={(r) => setModal({ mode: "edit", item: r })}
          onView={(r) => setModal({ mode: "view", item: r })}
          onDelete={(r) => setConfirm(r)}
          onToggleActive={handleToggleActive}
          onRenew={handleRenew}
        />
      </main>

      {modal && (
        <ClienteVIPModal
          mode={modal.mode}
          initial={modal.item}
          rangeMode={t.rangeMode}
          onClose={() => setModal(null)}
          onSave={handleSave}
          onDelete={() => setConfirm(modal.item)}
        />
      )}

      {confirm && (
        <ConfirmDelete
          item={confirm}
          onClose={() => setConfirm(null)}
          onConfirm={handleDelete}
        />
      )}

      <ToastStack toasts={toasts} onDismiss={dismiss}/>

      <TweaksPanel title="Tweaks">
        <TweakSection title="Color de acento">
          <TweakColor
            value={t.accent}
            options={["#2bc48a", "#3666d4", "#d77a39", "#8a52c2", "#e6473d"]}
            onChange={(v) => setTweak("accent", v)}
          />
        </TweakSection>
        <TweakSection title="Densidad de tabla">
          <TweakRadio
            value={t.density}
            options={[
              { value: "comfortable", label: "Cómoda" },
              { value: "compact", label: "Compacta" },
            ]}
            onChange={(v) => setTweak("density", v)}
          />
        </TweakSection>
        <TweakSection title="Captura de rango">
          <TweakRadio
            value={t.rangeMode}
            options={[
              { value: "dates", label: "Fechas" },
              { value: "days", label: "Días" },
            ]}
            onChange={(v) => setTweak("rangeMode", v)}
          />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

// ===== MAIN APP =====
function App() {
  const [view, setView] = React.useState('monitoreo');

  return (
    <div className="app">
      <Sidebar active={view} onNavigate={setView}/>
      {view === 'monitoreo' && <MonitoringView/>}
      {view === 'clientes-vip' && <VIPView/>}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
