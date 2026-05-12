const SidebarIcons = {
  caret: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><polyline points="6 9 12 15 18 9"/></svg>,
  gear: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  cog: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.43 12.98c.04-.32.07-.65.07-.98s-.03-.66-.07-.98l2.11-1.65a.5.5 0 0 0 .12-.64l-2-3.46a.5.5 0 0 0-.61-.22l-2.49 1a7.03 7.03 0 0 0-1.69-.98l-.38-2.65A.5.5 0 0 0 14 2h-4a.5.5 0 0 0-.49.42l-.38 2.65c-.61.25-1.17.58-1.69.98l-2.49-1a.5.5 0 0 0-.61.22l-2 3.46a.5.5 0 0 0 .12.64L4.57 11c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65a.5.5 0 0 0-.12.64l2 3.46a.5.5 0 0 0 .61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.05.24.25.42.49.42h4c.24 0 .44-.18.49-.42l.38-2.65c.61-.25 1.17-.58 1.69-.98l2.49 1a.5.5 0 0 0 .61-.22l2-3.46a.5.5 0 0 0-.12-.64l-2.11-1.65zM12 15.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z"/></svg>,
  pin: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 21s-7-7.4-7-12a7 7 0 0 1 14 0c0 4.6-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>,
  camera: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>,
  scale: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M3 21h18"/><path d="M12 3v18"/><path d="M5 7l-2 6h6L7 7"/><path d="M19 7l-2 6h6L21 7"/></svg>,
  logs: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 7h8M8 11h8M8 15h5"/></svg>,
  chip: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="5" y="5" width="14" height="14" rx="2"/><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"/></svg>,
  report: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>,
  ticket: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a2 2 0 1 0 0 4v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 1 0 0-4V8z"/></svg>,
  ext: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 8h18M8 4v4"/></svg>,
};

function SidebarSection({ icon, title, items, defaultOpen=true, activeId }) {
  const [open, setOpen] = React.useState(defaultOpen);
  return (
    <div className="sidebar__section">
      <div className="sidebar__section-head" onClick={() => setOpen(o => !o)}>
        <div className="sidebar__section-head-l">
          <span style={{display:'inline-flex',width:14,height:14,opacity:.85}}>{icon}</span>
          <span>{title}</span>
        </div>
        <span style={{transform: open ? 'rotate(0)' : 'rotate(-90deg)', transition:'transform .2s'}}>{SidebarIcons.caret}</span>
      </div>
      {open && (
        <div className="sidebar__items">
          {items.map(it => (
            <div key={it.id} className={`sidebar__item${it.id === activeId ? ' sidebar__item--active' : ''}`}>
              <span className="sidebar__badge">{it.b}</span>
              <span>{it.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <div className="sidebar__logo sidebar__logo--image">
          <img src="uploads/images.jpeg" alt="Supervisa" />
        </div>
        <div className="sidebar__brand-name">Supervisa</div>
        <div className="sidebar__brand-sub">Management Portal</div>
      </div>

      <SidebarSection icon={SidebarIcons.gear} title="Sistema" items={[
        {id:'usuarios', b:'U', label:'Usuarios'},
        {id:'empresas', b:'E', label:'Empresas'},
        {id:'perfiles', b:'P', label:'Perfiles'},
        {id:'permisos', b:'P', label:'Permisos'},
      ]} />
      <SidebarSection icon={SidebarIcons.pin} title="Puntos de Control" items={[
        {id:'zonas', b:'Z', label:'Zonas'},
        {id:'puntosc', b:'P', label:'Puntos de Control'},
      ]} />
      <SidebarSection icon={SidebarIcons.camera} title="Manejo de Cámaras" items={[
        {id:'camaras', b:'C', label:'Cámaras'},
        {id:'fabricantes', b:'F', label:'Fabricantes'},
      ]} />
      <SidebarSection icon={SidebarIcons.scale} title="Básculas" items={[
        {id:'basculas', b:'B', label:'Básculas'},
        {id:'gmsg', b:'G', label:'Gestión de mensajes'},
        {id:'monitor', b:'I', label:'Interfaz de Monitoreo'},
        {id:'gman', b:'G', label:'Gestión Manual'},
        {id:'manuales', b:'M', label:'Manuales'},
        {id:'pcmano', b:'P', label:'PC de mano'},
      ]} activeId="monitor" />
      <SidebarSection icon={SidebarIcons.logs} title="Logs" items={[
        {id:'logs', b:'L', label:'Logs'},
      ]} />
      <SidebarSection icon={SidebarIcons.chip} title="Configuraciones" items={[
        {id:'config', b:'C', label:'Configuraciones'},
        {id:'limp', b:'L', label:'Limpiadores'},
        {id:'resp', b:'R', label:'Respaldos'},
      ]} />
      <div style={{padding:'8px 18px'}}>
        <div className="sidebar__item sidebar__item--root"><span className="sidebar__badge">{SidebarIcons.report}</span> Reportes</div>
        <div className="sidebar__item sidebar__item--root"><span className="sidebar__badge">{SidebarIcons.ticket}</span> Tiquetes</div>
        <div className="sidebar__item sidebar__item--root"><span className="sidebar__badge">{SidebarIcons.ext}</span> Servicios Externos</div>
      </div>
    </aside>
  );
}

window.Sidebar = Sidebar;
window.SidebarIcons = SidebarIcons;
