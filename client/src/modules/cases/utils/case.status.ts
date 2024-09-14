const CaseTypes: { [key: string]: string } = {
  SUCCESSION: 'Sucesión',
  EXECUTION: 'Ejecución',
  TERMINATION: 'Despido',
  DAMAGES_AND_LOSSES: 'Daños y perjuicios',
  CONTRACT_DISPUTE: 'Disputa contractual',
  FAMILY_LAW: 'Derecho de familia',
  CRIMINAL: 'Penal',
  PROPERTY_DISPUTE: 'Disputa de propiedad',
  PERSONAL_INJURY: 'Lesiones personales',
  INTELLECTUAL_PROPERTY: 'Propiedad intelectual',
}

const CasesStatus: { [key: string]: string } = {
  INITIATED: 'Inicio',
  EVIDENCE: 'Prueba',
  JUDGMENT: 'Sentencia',
  CLOSED: 'Archivado',
}

export default {
  CaseTypes,
  CasesStatus,
}
