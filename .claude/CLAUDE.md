# mackups_bascula — Memoria del proyecto

## ¿Qué es este proyecto?
Mockups interactivos del sistema de básculas de Supervisa. Combina dos proyectos anteriores en una sola app React (sin build step — Babel standalone en el browser):
- **Interfaz de Monitoreo** — visualización en tiempo real del estado de las básculas
- **Usuarios VIP** — gestión de conductores y vehículos con acceso preferencial

Desplegado en: https://mackupsbascula.vercel.app/

---

## Arquitectura de archivos

```
mackups_bascula/
├── index.html          # Entrada — carga todos los JSX en orden vía Babel standalone
├── app.jsx             # App root: MonitoringView + VIPView + navegación por sidebar
├── shell.jsx           # Sidebar (onNavigate) + Topbar
├── monitoring.jsx      # BasculaCard, StepBar, GestionModal, STEPS_B1, STEPS_B2
├── list.jsx            # ClientesVIPList, SAMPLE_DATA — tabla de usuarios VIP
├── modal.jsx           # ClienteVIPModal, ConfirmDelete, ToastStack
├── icons.jsx           # Icon.* (SVGs) + SupervisaLogo
├── tweaks-panel.jsx    # Panel de tweaks visuales (acento, densidad, rangeMode)
├── styles.css          # CSS combinado — scoped con .view-monitoring y .view-vip
└── supervisa-logo.jpeg # Logo de Supervisa
```

### Orden de carga en index.html
`tweaks-panel.jsx` → `icons.jsx` → `shell.jsx` → `monitoring.jsx` → `list.jsx` → `modal.jsx` → `app.jsx`

---

## Repos
| Repo | URL | Rama |
|------|-----|------|
| GitHub (propio) | https://github.com/sfsolanosupervisa-create/mackups_bascula | main |
| Bitbucket (institucional) | https://bitbucket.org/SUPERVISA_SA/sw-documentacion-basculas-general | DIDP-459-mockups-basculas |

En Bitbucket los archivos viven en `Mockups/Mockups_interactivos/`. Cuando se haga push hay que actualizar **ambos repos**.

Para push a GitHub se necesita token (el usuario lo provee — regenerar tras cada uso).

---

## Lo que se ha hecho

- [x] Combinación de los dos proyectos en una sola app con sidebar de navegación
- [x] Resolución de conflictos CSS: `.vip-modal`, `.vip-toast`, `.vip-plate`, `.mon-toast`
- [x] Fix CSS: `.modal-bg .modal` (antes era `.modal-bg .inner-modal`)
- [x] Checkbox "Sí pesa en báscula" en modal VIP (campo `weighs`) — visible en crear, editar y ver
- [x] Sincronización de flechas de sensores: `sensorsTop` y `sensorsBottom` ahora iguales en cada step
  - Verde = camión presente sobre el sensor
  - Amarillo = camión aproximándose o saliendo

---

## Pendiente / Por revisar

- [ ] Verificar visualmente el checkbox "Sí pesa" en el modal VIP (el usuario reportó que no quedó bien — revisar con Playwright o screenshot)
- [ ] MCP Playwright agregado (`npx @playwright/mcp@latest`) — requiere reiniciar Claude Code para activarse
- [ ] Evaluar si el checkbox necesita ajuste de estilos en el formulario

---

## Notas de CSS importantes
- `.view-monitoring .btn` → estilo con borde y border-radius 4px (estilo monitoreo)
- `.view-vip .btn` → pill sin borde (estilo VIP)
- Modales: `.modal-bg .modal` = GestionModal (monitoreo) / `.modal-overlay .vip-modal` = ClienteVIPModal (VIP)
- La carpeta `uploads/` contiene imágenes referenciadas en `monitoring.jsx` (cámara del camión)
