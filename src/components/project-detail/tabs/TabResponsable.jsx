import Field from '../Field';

export default function TabResponsable({ p }) {
  // El responsable puede venir en respDeProyectos (array) o en solicitante.
  const resp = p.respDeProyectos?.[0] || null;
  const s = p.solicitante || {};

  return (
    <div className="grid grid-cols-1 gap-5">
      <Field label="Nombres" value={resp?.nombres ?? s.firstName} />
      <Field label="Primer apellido" value={resp?.primerApellido ?? s.lastName} />
      <Field label="Segundo apellido" value={resp?.segundoApellido} />
      <Field label="Título" value={resp?.titulo} />
      <Field label="Cargo" value={resp?.cargo} />
      <Field label="Email" value={resp?.email ?? s.email} />
      <Field label="Teléfono" value={resp?.telefono} />
      <Field label="Teléfono 2" value={resp?.telefono2} />
    </div>
  );
}
