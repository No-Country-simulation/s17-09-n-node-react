import { Case } from "./caseActions";


  export const INPUTS_FORM_UPD = 
  [
  {label: "Nombre del caso", name: 'caseName', defaultVal: 'Caso 3' },
  {label: "Jurado", name: 'jury',  defaultVal: 'Jurado 2' },
  {label: "Numero del caso", name: 'caseNumber',  defaultVal: '123456' },
  {label: "Solicitante", name: 'applicant',  defaultVal: 'Aplicant 2' },
  {label: "Demandado", name: 'respondent',  defaultVal: 'Respondent 1' }
      ] as const 

      export const INPUTS_FORM: { label: string; name: keyof Case }[] = 
      [
      {label: "Nombre del caso", name: 'caseName' },
      {label: "Jurado", name: 'jury' },
      {label: "Numero del caso", name: 'caseNumber' },
      {label: "Solicitante", name: 'applicant' },
      {label: "Demandado", name: 'respondent' }
          ] as const
    

      export const MODEL_TYPE = {
        options:[
          { label: 'Sucesión', value: 'SUCCESSION' },
          { label: 'Ejecución', value: 'EXECUTION' },
          { label: 'Terminación', value: 'TERMINATION' },
          { label: 'Daños y pérdidas', value: 'DAMAGES_AND_LOSSES' },
          { label: 'Constrato de disputa', value: 'CONTRACT_DISPUTE' },
          { label: 'Derecho familiar', value: 'FAMILY_LAW' },
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
  } as const 



