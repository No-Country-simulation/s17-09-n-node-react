import { Case } from '../services/cases.service'

export const INPUTS_FORM_UPD = [
  { label: 'Nombre del caso', name: 'caseName', defaultVal: 'Caso 3' },
  { label: 'Jurado', name: 'jury', defaultVal: 'Jurado 2' },
  { label: 'Número del caso', name: 'caseNumber', defaultVal: '123456' },
  { label: 'Solicitante', name: 'applicant', defaultVal: 'Aplicant 2' },
  { label: 'Demandado', name: 'respondent', defaultVal: 'Respondent 1' },
] as const

export const INPUTS_FORM: { label: string; name: keyof Case }[] = [
  { label: 'Nombre del caso', name: 'caseName' },
  { label: 'Jurado', name: 'jury' },
  { label: 'Número del caso', name: 'caseNumber' },
  { label: 'Solicitante', name: 'applicant' },
  { label: 'Demandado', name: 'respondent' },
] as const

export const MODEL_TYPE = {
  options: [
    { label: 'Sucesión', value: 'SUCCESSION' },
    { label: 'Ejecución', value: 'EXECUTION' },
    { label: 'Despido', value: 'TERMINATION' },
    { label: 'Daños y perjucios', value: 'DAMAGES_AND_LOSSES' },
    { label: 'Disputa contractual', value: 'CONTRACT_DISPUTE' },
    { label: 'Derecho de familia', value: 'FAMILY_LAW' },
    { label: 'Penal', value: 'CRIMINAL' },
    { label: 'Disputa de propiedad', value: 'PROPERTY_DISPUTE' },
    { label: 'Lesiones personales', value: 'PERSONAL_INJURY' },
    { label: 'Propiedad intelectual', value: 'INTELLECTUAL_PROPERTY' },
  ],
} as const

export const MODEL_STATUS = {
  options: [
    { label: 'Inicio', value: 'INITIATED' },
    { label: 'Prueba', value: 'EVIDENCE' },
    { label: 'Sentencia', value: 'JUDGMENT' },
    { label: 'Archivado', value: 'CLOSED' },
  ],
}
