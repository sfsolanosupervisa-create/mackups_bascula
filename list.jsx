/* global React, Icon */
const { useState: useS2, useMemo: useM2, useEffect: useE2, useRef: useR2 } = React;

// Sample data
const SAMPLE = [
  { id: 1, plate: "ABC-123", idType: "CC", idNum: "1.045.678.234", first: "Carlos", last: "Ramírez González", company: "Logística del Caribe S.A.S.", phone: "+57 310 555 1234", start: "2026-04-15", end: "2026-12-31", status: "active" },
  { id: 2, plate: "XKZ-845", idType: "CC", idNum: "52.789.123",    first: "María",  last: "Fernández López",     company: "Transportes Andinos",         phone: "+57 315 442 8901", start: "2026-01-10", end: "2026-05-12", status: "warn" },
  { id: 3, plate: "TRP-019", idType: "CE", idNum: "612.445",        first: "Andrés", last: "Restrepo Ochoa",       company: "Carbones del Norte",          phone: "+57 320 110 4422", start: "2025-09-01", end: "2026-03-30", status: "expired" },
  { id: 4, plate: "WBR-562", idType: "CC", idNum: "1.098.234.567", first: "Laura",  last: "Mendoza Vargas",       company: "AgroExport Colombia",         phone: "+57 304 887 2210", start: "2026-05-01", end: "2027-05-01", status: "active" },
  { id: 5, plate: "JPL-308", idType: "CC", idNum: "79.345.612",    first: "Diego",  last: "Salazar Quintero",     company: "Cementos del Valle",          phone: "+57 312 003 9988", start: "2026-04-20", end: "2026-05-20", status: "warn" },
  { id: 6, plate: "QRM-714", idType: "CC", idNum: "63.554.211",    first: "Patricia", last: "Gómez Herrera",      company: "Acerías Pacífico",            phone: "+57 318 776 5544", start: "2026-03-01", end: "2026-09-01", status: "active" },
  { id: 7, plate: "LDV-201", idType: "PA", idNum: "P98745632",     first: "Roberto", last: "Acosta Bermúdez",     company: "Petrolera del Sur",           phone: "+57 321 558 4477", start: "2025-11-15", end: "2026-04-15", status: "expired" },
  { id: 8, plate: "FNT-922", idType: "CC", idNum: "1.022.987.654", first: "Sandra", last: "Vélez Cárdenas",       company: "Comercializadora Norte",      phone: "+57 313 224 1188", start: "2026-04-01", end: "2026-10-31", status: "active" },
];

const fmtDate = (s) => {
  const [y, m, d] = s.split('-');
  return `${d}/${m}/${y}`;
};
const daysBetween = (a, b) => Math.round((new Date(b) - new Date(a)) / 86400000);
const initials = (f, l) => (f[0] + (l[0] || '')).toUpperCase();
const statusInfo = {
  active:  { label: "Vigente",   cls: "active" },
  warn:    { label: "Por vencer", cls: "warn" },
  expired: { label: "Vencido",   cls: "expired" },
  inactive:{ label: "Inactivo",  cls: "inactive" },
};

const PAGE_SIZE = 6;

// ===== STATS STRIP =====
const StatsStrip = ({ data, activeFilter, onFilterClick }) => {
  const counts = useM2(() => {
    const c = { total: data.length, active: 0, warn: 0, expired: 0 };
    data.forEach(d => { if (c[d.status] !== undefined) c[d.status]++; });
    return c;
  }, [data]);

  const Card = ({ tone, icon, num, label, value }) => (
    <div className="stat" style={{
      cursor:'pointer',
      borderColor: activeFilter === value ? 'var(--accent)' : undefined,
      boxShadow: activeFilter === value ? '0 0 0 2px rgba(43,196,138,0.15)' : undefined,
    }} onClick={() => onFilterClick(value)}>
      <div className={`stat-icon ${tone}`}>{icon}</div>
      <div><div className="stat-num">{num}</div><div className="stat-label">{label}</div></div>
    </div>
  );

  return (
    <div className="stats-row">
      <Card tone="gray"   icon={<Icon.Star size={18}/>}  num={counts.total}   label="USUARIOS VIP" value=""/>
      <Card tone="green"  icon={<Icon.Check size={18}/>} num={counts.active}  label="VIGENTES"     value="active"/>
      <Card tone="yellow" icon={<Icon.Clock size={18}/>} num={counts.warn}    label="POR VENCER"   value="warn"/>
      <Card tone="red"    icon={<Icon.Alert size={18}/>} num={counts.expired} label="VENCIDOS"     value="expired"/>
    </div>
  );
};

// ===== FILTERS =====
const Filters = ({ q, setQ, onClear }) => (
  <div className="filters-box">
    <div className="filters-grid">
      <div className="field">
        <label>PLACA</label>
        <div className="input-wrap">
          <input type="text" placeholder="Buscar" value={q.plate}
            onChange={e => setQ({...q, plate: e.target.value.toUpperCase()})}/>
          <span className="input-icon"><Icon.Search/></span>
        </div>
      </div>
      <div className="field">
        <label>IDENTIFICACIÓN</label>
        <div className="input-wrap">
          <input type="text" placeholder="Buscar" value={q.id}
            onChange={e => setQ({...q, id: e.target.value})}/>
          <span className="input-icon"><Icon.Search/></span>
        </div>
      </div>
      <div className="field">
        <label>NOMBRE / APELLIDO</label>
        <div className="input-wrap">
          <input type="text" placeholder="Buscar" value={q.name}
            onChange={e => setQ({...q, name: e.target.value})}/>
          <span className="input-icon"><Icon.Search/></span>
        </div>
      </div>
      <div className="field">
        <label>ESTADO</label>
        <div className="input-wrap">
          <select value={q.status} onChange={e => setQ({...q, status: e.target.value})}>
            <option value="">Todos</option>
            <option value="active">Vigente</option>
            <option value="warn">Por vencer</option>
            <option value="expired">Vencido</option>
          </select>
          <span className="input-icon"><Icon.ChevDown/></span>
        </div>
      </div>
    </div>
    <div className="filter-actions">
      <button className="btn btn-secondary" onClick={onClear}>Limpiar filtros</button>
    </div>
  </div>
);

// ===== ACTION MENU =====
const ActionMenu = ({ r, onClose, onView, onEdit, onDelete, onToggleActive, onRenew }) => {
  const ref = useR2();
  useE2(() => {
    const onClick = (e) => { if (ref.current && !ref.current.contains(e.target)) onClose(); };
    setTimeout(() => document.addEventListener("mousedown", onClick), 0);
    return () => document.removeEventListener("mousedown", onClick);
  }, [onClose]);
  return (
    <div className="action-menu" ref={ref}>
      <button onClick={() => { onView(r); onClose(); }}><Icon.Eye size={14}/> Ver detalle</button>
      <button onClick={() => { onEdit(r); onClose(); }}><Icon.Edit size={14}/> Editar</button>
      <button onClick={() => { onRenew(r); onClose(); }}><Icon.Clock size={14}/> Renovar acceso</button>
      <button onClick={() => { onToggleActive(r); onClose(); }}>
        <Icon.Check size={14}/> {r.status === 'inactive' ? 'Activar' : 'Desactivar'}
      </button>
      <div className="divider"/>
      <button className="danger" onClick={() => { onDelete(r); onClose(); }}>
        <Icon.Trash size={14}/> Eliminar
      </button>
    </div>
  );
};

// ===== TABLE ROW =====
const Row = ({ r, onEdit, onView, onDelete, onToggleActive, onRenew, openMenu, setOpenMenu }) => {
  const today = new Date();
  const left = daysBetween(today, new Date(r.end));
  const total = daysBetween(new Date(r.start), new Date(r.end));
  const colorIdx = (r.id % 6) + 1;
  return (
    <tr className="clickable" onClick={() => onView(r)}>
      <td><span className="vip-plate"><Icon.Truck size={12}/>{r.plate}</span></td>
      <td>
        <div className="driver">
          <div className={`avatar c${colorIdx}`}>{initials(r.first, r.last)}</div>
          <div>
            <div className="name">{r.first} {r.last}</div>
            <div className="id-num">{r.idType} {r.idNum}</div>
          </div>
        </div>
      </td>
      <td style={{color:'var(--text-secondary)'}}>{r.company}</td>
      <td>
        <div className="range-cell">
          <div className="dates">{fmtDate(r.start)} → {fmtDate(r.end)}</div>
          <div className="days-left">
            {left > 0 ? `${left} días restantes` : left === 0 ? 'Vence hoy' : `Vencido hace ${-left} días`} · {total} días total
          </div>
        </div>
      </td>
      <td>
        <span className={`badge ${statusInfo[r.status].cls}`}>
          <span className="dot"/>{statusInfo[r.status].label}
        </span>
      </td>
      <td className="actions" onClick={(e) => e.stopPropagation()}>
        <button className="btn-icon edit" title="Editar" onClick={() => onEdit(r)}><Icon.Edit/></button>
        <button className="btn-icon" title="Más acciones"
          onClick={() => setOpenMenu(openMenu === r.id ? null : r.id)}><Icon.Dots/></button>
        {openMenu === r.id && (
          <ActionMenu r={r} onClose={() => setOpenMenu(null)}
            onView={onView} onEdit={onEdit} onDelete={onDelete}
            onToggleActive={onToggleActive} onRenew={onRenew}/>
        )}
      </td>
    </tr>
  );
};

// ===== LIST PAGE =====
const ClientesVIPList = ({ data, onCreate, onEdit, onView, onDelete, onToggleActive, onRenew }) => {
  const [q, setQ] = useS2({ plate: "", id: "", name: "", status: "" });
  const [sort, setSort] = useS2({ key: "first", dir: "asc" });
  const [page, setPage] = useS2(1);
  const [openMenu, setOpenMenu] = useS2(null);

  const filtered = useM2(() => {
    let rows = data.filter(r => {
      if (q.plate && !r.plate.includes(q.plate)) return false;
      if (q.id && !r.idNum.includes(q.id)) return false;
      if (q.name) {
        const nm = (r.first + " " + r.last).toLowerCase();
        if (!nm.includes(q.name.toLowerCase())) return false;
      }
      if (q.status && r.status !== q.status) return false;
      return true;
    });
    rows = [...rows].sort((a, b) => {
      const av = (a[sort.key] || '').toString().toLowerCase();
      const bv = (b[sort.key] || '').toString().toLowerCase();
      const c = av < bv ? -1 : av > bv ? 1 : 0;
      return sort.dir === 'asc' ? c : -c;
    });
    return rows;
  }, [data, q, sort]);

  useE2(() => { setPage(1); }, [q.plate, q.id, q.name, q.status]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageRows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSort = (key) => {
    setSort(s => s.key === key
      ? { key, dir: s.dir === 'asc' ? 'desc' : 'asc' }
      : { key, dir: 'asc' });
  };
  const sortArrow = (key) => sort.key !== key ? '↕' : sort.dir === 'asc' ? '▲' : '▼';
  const thProps = (key) => ({
    className: "sortable" + (sort.key === key ? " sorted" : ""),
    onClick: () => handleSort(key),
  });

  const activeChips = [
    q.plate && { k: 'plate', label: `Placa: ${q.plate}` },
    q.id && { k: 'id', label: `ID: ${q.id}` },
    q.name && { k: 'name', label: `Nombre: ${q.name}` },
    q.status && { k: 'status', label: `Estado: ${statusInfo[q.status].label}` },
  ].filter(Boolean);

  const clearAll = () => setQ({plate:"",id:"",name:"",status:""});

  return (
    <div className="content-card">
      <div className="page-header">
        <div>
          <h1 className="page-title">Usuarios VIP</h1>
          <p className="page-subtitle">Conductores y vehículos con acceso preferencial autorizado</p>
        </div>
        <div style={{display:'flex', gap:10}}>
          <button className="btn btn-primary" onClick={onCreate}><Icon.Plus/> Crear Usuario VIP</button>
        </div>
      </div>

      <StatsStrip data={data} activeFilter={q.status}
        onFilterClick={(v) => setQ({...q, status: v})}/>

      <Filters q={q} setQ={setQ} onClear={clearAll}/>

      <div className="results-summary">
        Mostrando <strong>{filtered.length}</strong> de <strong>{data.length}</strong> clientes
        {activeChips.map(c => (
          <span key={c.k} className="chip-filter">
            {c.label}
            <button onClick={() => setQ({...q, [c.k]: ""})}><Icon.X size={12}/></button>
          </span>
        ))}
      </div>

      <div className="table-wrap">
        <table className="data">
          <thead>
            <tr>
              <th {...thProps("plate")}>PLACA <span className="sort-arrow">{sortArrow("plate")}</span></th>
              <th {...thProps("first")}>CONDUCTOR <span className="sort-arrow">{sortArrow("first")}</span></th>
              <th {...thProps("company")}>EMPRESA <span className="sort-arrow">{sortArrow("company")}</span></th>
              <th {...thProps("end")}>RANGO DE ACCESO <span className="sort-arrow">{sortArrow("end")}</span></th>
              <th {...thProps("status")}>ESTADO <span className="sort-arrow">{sortArrow("status")}</span></th>
              <th style={{textAlign:'right'}}>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {pageRows.length === 0 ? (
              <tr><td colSpan={6} className="empty">
                <Icon.Search size={36}/>
                <div>No se encontraron clientes con los filtros aplicados.</div>
                <button className="btn btn-secondary" style={{marginTop:14}} onClick={clearAll}>Limpiar filtros</button>
              </td></tr>
            ) : pageRows.map((r) => (
              <Row key={r.id} r={r} onEdit={onEdit} onView={onView} onDelete={onDelete}
                onToggleActive={onToggleActive} onRenew={onRenew}
                openMenu={openMenu} setOpenMenu={setOpenMenu}/>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination-row">
        <span>Mostrando página {page} de {totalPages} de un total de {filtered.length}</span>
        <div className="pager">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}><Icon.ChevLeft/></button>
          {Array.from({length: totalPages}, (_, i) => i + 1).map(p => (
            <button key={p} className={p === page ? "active" : ""} onClick={() => setPage(p)}>{p}</button>
          ))}
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}><Icon.ChevRight/></button>
        </div>
      </div>
    </div>
  );
};

window.ClientesVIPList = ClientesVIPList;
window.SAMPLE_DATA = SAMPLE;
window.statusInfo = statusInfo;
