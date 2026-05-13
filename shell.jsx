/* global React, Icon, SupervisaLogo */
const { useState: useS1 } = React;

// ===== SIDEBAR =====
const Sidebar = ({ active, onNavigate }) => {
  const [open, setOpen] = useS1({
    SISTEMA: true,
    PUNTOS: true,
    CAMARAS: true,
    BASCULAS: true,
    LOGS: true,
    CONFIG: true,
    CLIENTES: true,
  });
  const toggle = (k) => setOpen(s => ({ ...s, [k]: !s[k] }));

  const Section = ({ id, icon, label, children }) => (
    <React.Fragment>
      <div className="nav-section" data-collapsed={!open[id]} onClick={() => toggle(id)}>
        <span className="icon">{icon}</span>
        <span>{label}</span>
        <span className="chev"><Icon.ChevDown/></span>
      </div>
      <div className="nav-list">{children}</div>
    </React.Fragment>
  );

  const Item = ({ id, k, label }) => (
    <a className={"nav-item" + (active === id ? " active" : "")}
       onClick={(e) => { e.preventDefault(); onNavigate && onNavigate(id); }}>
      <span className="key">{k}</span>
      <span>{label}</span>
    </a>
  );

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-logo"><SupervisaLogo/></div>
        <div className="brand-name">Supervisa</div>
        <div className="brand-sub">Management Portal</div>
      </div>

      <Section id="SISTEMA" icon={<Icon.Settings size={14}/>} label="Sistema">
        <Item id="usuarios" k="U" label="Usuarios"/>
        <Item id="empresas" k="E" label="Empresas"/>
        <Item id="perfiles" k="P" label="Perfiles"/>
        <Item id="permisos" k="P" label="Permisos"/>
      </Section>

      <Section id="CLIENTES" icon={<Icon.Star size={14}/>} label="Clientes">
        <Item id="clientes-vip" k="V" label="Usuarios VIP"/>
      </Section>

      <Section id="PUNTOS" icon={<Icon.Truck size={14}/>} label="Puntos de Control">
        <Item id="zonas" k="Z" label="Zonas"/>
        <Item id="puntos" k="P" label="Puntos de Control"/>
      </Section>

      <Section id="CAMARAS" icon={<Icon.Eye size={14}/>} label="Manejo de Cámaras">
        <Item id="camaras" k="C" label="Cámaras"/>
        <Item id="fabricantes" k="F" label="Fabricantes"/>
      </Section>

      <Section id="BASCULAS" icon={<Icon.Truck size={14}/>} label="Básculas">
        <Item id="basculas" k="B" label="Básculas"/>
        <Item id="mensajes" k="G" label="Gestión de mensajes"/>
        <Item id="monitoreo" k="I" label="Interfaz de Monitoreo"/>
        <Item id="manual" k="G" label="Gestión Manual"/>
        <Item id="manuales" k="M" label="Manuales"/>
        <Item id="pcmano" k="P" label="PC de mano"/>
      </Section>

      <Section id="LOGS" icon={<Icon.Clock size={14}/>} label="Logs">
        <Item id="logs" k="L" label="Logs"/>
      </Section>

      <Section id="CONFIG" icon={<Icon.Settings size={14}/>} label="Configuraciones">
        <Item id="config" k="C" label="Configuraciones"/>
        <Item id="limpia" k="L" label="Limpiadores"/>
        <Item id="resp" k="R" label="Respaldos"/>
      </Section>

      <div className="nav-section" style={{cursor:'default'}}>
        <span className="icon"><Icon.Calendar size={14}/></span>
        <span>Reportes</span>
      </div>
      <div className="nav-section" style={{cursor:'default'}}>
        <span className="icon"><Icon.Alert size={14}/></span>
        <span>Tiquetes</span>
      </div>
      <div className="nav-section" style={{cursor:'default'}}>
        <span className="icon"><Icon.Settings size={14}/></span>
        <span>Servicios Externos</span>
      </div>
    </aside>
  );
};

// ===== TOPBAR =====
const Topbar = ({ crumbs }) => (
  <div className="topbar">
    <button className="menu-btn" title="Menú"><Icon.Dots/></button>
    <div className="crumb">
      {crumbs.map((c, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span className="sep">/</span>}
          <span className={i === crumbs.length - 1 ? "current" : ""}>
            {i === crumbs.length - 1 ? c : <a href="#">{c}</a>}
          </span>
        </React.Fragment>
      ))}
    </div>
    <div className="spacer"/>
    <button className="gear">
      <Icon.Settings size={14}/>
      <Icon.ChevDown size={10}/>
    </button>
  </div>
);

window.Sidebar = Sidebar;
window.Topbar = Topbar;
