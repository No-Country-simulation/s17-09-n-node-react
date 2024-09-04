

  export const INPUTS_FORM = 
  [
  {label: "Nombre del caso", name: 'caseName', defaultVal: 'Caso 3' },
  {label: "Jurado", name: 'jury',  defaultVal: 'Jurado 3' },
  {label: "Numero del caso", name: 'caseNumber',  defaultVal: '123456' },
  {label: "Solicitante", name: 'applicant',  defaultVal: 'Pepe' },
  {label: "Demandado", name: 'respondent',  defaultVal: 'Marta' }
      ] as const

      export const MODEL_TYPE = {
        options:[
          { label: 'Sucesión', value: 'SUCCESSION' },
          { label: 'Ejecución', value: 'EXECUTION' },
          { label: 'Terminación', value: 'TERMINATION' },
          { label: 'Daños y pérdidas', value: 'DAMAGES_AND_LOSSES' },
          { label: 'Constrato de disputa', value: 'CONTRACT_DISPUTE' },
          { label: 'Criminal', value: 'CRIMINAL' },
          { label: 'Propiedad y disputa', value: 'PROPERTY_DISPUTE' },
          { label: 'Lesiones personales', value: 'PERSONAL_INJURY' },
          { label: 'Propiedad intelectual', value: 'INTELLECTUAL_PROPERTY' },
        ]
      } as const

  export const MODEL_STATUS = {
    options:[
      { label: 'Iniciado', value: 'INITIATED' },
      { label: 'Evidencia', value: 'EVIDENCE' },
      { label: 'Juicio', value: 'JUDGMENT' },
      { label: 'Cerrado', value: 'CLOSED' },
    ]
  }


