import Field from '../Field';
import { formatMonto } from '../../../lib/pago';

function siNo(v) {
  return v === true ? 'Sí' : v === false ? 'No' : '—';
}

export default function TabProyecto({ p }) {
  return (
    <div className="grid grid-cols-1 gap-5">
      <Field label="Recursos con los que dispondrá el prestador" value={p.recursosMateriales} multiline rows={5} />
      <Field label="Recursos humanos" value={p.recursosHumanos} multiline rows={4} />
      <Field label="Infraestructura" value={p.recursosInfraestructura} multiline rows={3} />
      <Field label="Apoyo económico (mensual)" value={formatMonto(p.monto)} />
      <div className="grid grid-cols-2 gap-4">
        <Field label="Viáticos — Alimentos" value={siNo(p.viaticosAlimentos)} />
        <Field label="Viáticos — Transporte" value={siNo(p.viaticosTransporte)} />
      </div>
      <Field label="Horario del prestador" value={p.horarioPrestador} multiline rows={2} />
      <Field label="Inducción" value={p.induccion} multiline rows={4} />
      <Field label="Duración de la inducción (horas)" value={p.horasInduccion} />
      <Field label="Justificación" value={p.justificacion} multiline rows={6} />
      <Field label="Objetivos generales" value={p.objetivosGenerales} multiline rows={3} />
      <Field label="Objetivos específicos" value={p.objetivoEspecificos} multiline rows={5} />
      <Field label="Beneficiarios" value={p.beneficiarios} multiline rows={3} />
      <Field label="Supervisión — Instrumentos" value={p.supervisionInstrumentos} multiline rows={2} />
      <Field label="Supervisión — Periodicidad" value={p.supervisionPeriodicidad} multiline rows={2} />
      <Field label="Supervisión — Criterios" value={p.supervisionCriterios} multiline rows={3} />
    </div>
  );
}
