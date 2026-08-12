import Field from '../Field';
import { unidadReceptoraDe } from '../../../lib/format';

export default function TabGenerales({ p }) {
  const unidad = p.unidadesReceptoras?.[0];
  const dependencia = unidad?.dependencia;
  const direccion = unidad?.direccion;
  const telefono = unidad?.telefono1;

  return (
    <div className="grid grid-cols-1 gap-5">
      <Field label="Núm. de Proyecto" value={p.id} />
      <Field label="Nombre del Proyecto Social" value={p.nombre} required multiline rows={3} />
      <Field label="Institución" value={unidad?.institucion} required />
      <Field label="Sector" value={unidad?.sector?.nombre} />
      <Field label="Dependencia" value={dependencia} />
      <Field label="Dirección" value={direccion} />
      <Field label="Teléfono" value={telefono} />
      <Field label="Unidad Receptora" value={unidadReceptoraDe(p)} />
      <Field label="Número de semestres que estará vigente" value={p.semestres} />
      <Field label="Función en la que incide" value={p.funcion?.nombre} />
      <Field label="Modalidad" value={p.modalidad?.nombre} />
      <Field label="Área prioritaria de desarrollo" value={p.area?.nombre} />
      <Field label="Ámbito" value={p.ambito} />
    </div>
  );
}
