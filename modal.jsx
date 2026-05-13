/* global React, Icon */
const { useState: useS3, useEffect: useE3 } = React;

const DOW = ["L", "M", "M", "J", "V", "S", "D"];
const DOW_FULL = ["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"];

// ===== FORM MODAL =====
const ClienteVIPModal = ({ initial, mode, rangeMode, onClose, onSave, onDelete }) => {
  const [data, setData] = useS3(() => {
    const defaults = {
      plate: "", idType: "CC", idNum: "", first: "", last: "",
      company: "", phone: "",
      start: new Date().toISOString().slice(0, 10),
      end: new Date(Date.now() + 90*86400000).toISOString().slice(0, 10),
      days: 90,
      dow: [true, true, true, true, true, false, false],
      status: "active",
      weighs: false,
    };
    return initial ? { ...defaults, ...initial } : defaults;
  });
  const [errors, setErrors] = useS3({});
  const readOnly = mode === "view";

  useE3(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const update = (k, v) => setData(d => ({...d, [k]: v}));
  const toggleDow = (i) => setData(d => ({...d, dow: d.dow.map((x, j) => j === i ? !x : x)}));

  const validate = () => {
    const e = {};
    if (!/^[A-Z]{3}-?[0-9]{3}$/i.test(data.plate.replace(/\s/g, ''))) e.plate = "Formato inválido (ej. ABC-123)";
    if (!data.idNum) e.idNum = "Requerido";
    if (!data.first) e.first = "Requerido";
    if (!data.last) e.last = "Requerido";
    if (rangeMode === "dates" && new Date(data.end) < new Date(data.start)) e.end = "La fecha fin debe ser posterior";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = () => {
    if (!validate()) return;
    onSave(data);
  };

  const titles = {
    create: ["Crear Usuario VIP", "Registra un nuevo conductor con acceso preferencial"],
    edit:   ["Editar Usuario VIP", "Actualiza la información del conductor autorizado"],
    view:   ["Detalle del Usuario VIP", "Información del conductor con acceso preferencial"],
  };
  const [title, sub] = titles[mode];

  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="vip-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2>{title}</h2>
            <p>{sub}</p>
          </div>
          <button className="modal-close" onClick={onClose}><Icon.X size={18}/></button>
        </div>

        <div className="modal-body">
          <div className="form-section">
            <h3 className="form-section-title">Vehículo</h3>
            <div className="form-grid">
              <div className="field">
                <label>PLACA <span style={{color:'var(--accent-red)'}}>*</span></label>
                <div className="input-wrap">
                  <input className="plate-input" type="text" placeholder="ABC-123"
                    maxLength={8}
                    disabled={readOnly}
                    value={data.plate}
                    onChange={e => update("plate", e.target.value.toUpperCase())}
                    style={errors.plate ? {borderColor:'var(--accent-red)'} : null}/>
                </div>
                {errors.plate && <div className="helper" style={{color:'var(--accent-red)'}}>{errors.plate}</div>}
              </div>
              <div className="field">
                <label>EMPRESA / TRANSPORTADORA</label>
                <input type="text" placeholder="Nombre de la empresa"
                  disabled={readOnly}
                  value={data.company}
                  onChange={e => update("company", e.target.value)}/>
              </div>
              <div className="field" style={{gridColumn:'1/-1'}}>
                <label>PESA EN BÁSCULA</label>
                <label style={{display:'flex',alignItems:'center',gap:8,cursor:readOnly?'default':'pointer',fontWeight:400,fontSize:13}}>
                  <input type="checkbox"
                    disabled={readOnly}
                    checked={!!data.weighs}
                    onChange={e => update("weighs", e.target.checked)}/>
                  Sí pesa en báscula
                </label>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3 className="form-section-title">Conductor</h3>
            <div className="form-grid">
              <div className="field">
                <label>TIPO DE IDENTIFICACIÓN</label>
                <div className="input-wrap">
                  <select disabled={readOnly} value={data.idType} onChange={e => update("idType", e.target.value)}>
                    <option value="CC">Cédula de Ciudadanía</option>
                    <option value="CE">Cédula de Extranjería</option>
                    <option value="PA">Pasaporte</option>
                    <option value="NIT">NIT</option>
                  </select>
                  <span className="input-icon"><Icon.ChevDown/></span>
                </div>
              </div>
              <div className="field">
                <label>NÚMERO DE IDENTIFICACIÓN <span style={{color:'var(--accent-red)'}}>*</span></label>
                <input type="text" placeholder="0000000000"
                  disabled={readOnly}
                  value={data.idNum}
                  onChange={e => update("idNum", e.target.value)}
                  style={errors.idNum ? {borderColor:'var(--accent-red)'} : null}/>
                {errors.idNum && <div className="helper" style={{color:'var(--accent-red)'}}>{errors.idNum}</div>}
              </div>
              <div className="field">
                <label>NOMBRE <span style={{color:'var(--accent-red)'}}>*</span></label>
                <input type="text" placeholder="Nombre"
                  disabled={readOnly}
                  value={data.first}
                  onChange={e => update("first", e.target.value)}
                  style={errors.first ? {borderColor:'var(--accent-red)'} : null}/>
              </div>
              <div className="field">
                <label>APELLIDO <span style={{color:'var(--accent-red)'}}>*</span></label>
                <input type="text" placeholder="Apellido"
                  disabled={readOnly}
                  value={data.last}
                  onChange={e => update("last", e.target.value)}
                  style={errors.last ? {borderColor:'var(--accent-red)'} : null}/>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3 className="form-section-title">Rango de días de acceso</h3>
            {rangeMode === "dates" ? (
              <div className="form-grid">
                <div className="field">
                  <label>FECHA INICIO</label>
                  <input type="date" disabled={readOnly}
                    value={data.start}
                    onChange={e => update("start", e.target.value)}/>
                </div>
                <div className="field">
                  <label>FECHA FIN</label>
                  <input type="date" disabled={readOnly}
                    value={data.end}
                    onChange={e => update("end", e.target.value)}
                    style={errors.end ? {borderColor:'var(--accent-red)'} : null}/>
                  {errors.end && <div className="helper" style={{color:'var(--accent-red)'}}>{errors.end}</div>}
                </div>
              </div>
            ) : (
              <div className="field">
                <label>DURACIÓN DEL ACCESO (DÍAS DESDE HOY)</label>
                <input type="number" min="1" max="730" disabled={readOnly}
                  value={data.days}
                  onChange={e => update("days", parseInt(e.target.value) || 0)}/>
                <div className="helper">El acceso vencerá el {new Date(Date.now() + (data.days||0)*86400000).toLocaleDateString('es-CO')}</div>
              </div>
            )}
          </div>
        </div>

        <div className="modal-footer">
          {mode === "edit" && (
            <button className="btn btn-danger" onClick={onDelete} style={{marginRight:'auto'}}>
              <Icon.Trash size={14}/> Eliminar
            </button>
          )}
          <button className="btn btn-secondary" onClick={onClose}>{readOnly ? "Cerrar" : "Cancelar"}</button>
          {!readOnly && (
            <button className="btn btn-primary" onClick={submit}>
              <Icon.Check size={14}/> {mode === "create" ? "Crear Usuario VIP" : "Guardar cambios"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// ===== DELETE CONFIRM =====
const ConfirmDelete = ({ item, onClose, onConfirm }) => {
  useE3(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="vip-modal" style={{maxWidth: 460}} onClick={e => e.stopPropagation()}>
        <div className="modal-body" style={{paddingTop: 28, paddingBottom: 8}}>
          <div className="delete-icon-wrap"><Icon.Alert size={26}/></div>
          <h2 style={{margin:'0 0 6px', fontSize:18, fontWeight:600}}>Eliminar Usuario VIP</h2>
          <p style={{margin:'0 0 14px', color:'var(--text-secondary)', fontSize:13}}>
            Esta acción no se puede deshacer.
          </p>
          <div style={{
            background:'#fafbfc', border:'1px solid var(--border)',
            borderRadius:8, padding:'12px 14px', display:'flex', alignItems:'center', gap:12
          }}>
            <span className="vip-plate"><Icon.Truck size={12}/>{item.plate}</span>
            <div>
              <div style={{fontWeight:500}}>{item.first} {item.last}</div>
              <div style={{fontSize:12, color:'var(--text-muted)'}}>{item.idType} {item.idNum}</div>
            </div>
          </div>
          <p style={{margin:'14px 0 0', fontSize:13, color:'var(--text-secondary)', lineHeight:1.5}}>
            El conductor perderá su acceso preferencial inmediatamente.
          </p>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>Cancelar</button>
          <button className="btn btn-primary" style={{background:'var(--accent-red)'}}
            onClick={onConfirm}><Icon.Trash size={14}/> Sí, eliminar</button>
        </div>
      </div>
    </div>
  );
};

// ===== TOAST =====
const Toast = ({ t, onClose }) => {
  useE3(() => {
    const id = setTimeout(onClose, 3500);
    return () => clearTimeout(id);
  }, [onClose]);
  const iconMap = { success: <Icon.Check/>, error: <Icon.Alert size={14}/>, info: <Icon.Alert size={14}/> };
  return (
    <div className={`vip-toast ${t.type}`}>
      <span className="toast-icon">{iconMap[t.type]}</span>
      <span>{t.message}</span>
      <button className="toast-close" onClick={onClose}><Icon.X size={14}/></button>
    </div>
  );
};
const ToastStack = ({ toasts, onDismiss }) => (
  <div className="toast-stack">
    {toasts.map(t => <Toast key={t.id} t={t} onClose={() => onDismiss(t.id)}/>)}
  </div>
);
window.ToastStack = ToastStack;

window.ClienteVIPModal = ClienteVIPModal;
window.ConfirmDelete = ConfirmDelete;
