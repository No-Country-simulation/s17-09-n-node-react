const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZGU2ZjI2YjQwMDcyMTUzZDQyNzk1YyIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzI2MDc4MzUzLCJleHAiOjE3MjYwNzkyNTN9.M7avqCZfoqcghpeIE_G7Hj613108r35YukQYcmLCfUY'
const API_BACK = 'https://s17-09-n-node-react.onrender.com/api/v1'
export interface Case {
    caseName:   string
    jury:       string
    caseNumber: string
    applicant:  string
    respondent: string
    type:       typeTipo 
    status:     typeStatus 
    userId:     string   
  } 

export type typeStatus = 'INITIATED' | 'EVIDENCE' | 'JUDGMENT' | 'CLOSED';
export type typeTipo = 'SUCCESSION' | 'EXECUTION' | 'TERMINATION'| 'DAMAGES_AND_LOSSES' |'CONTRACT_DISPUTE' |'FAMILY_LAW'| 'CRIMINAL'| 'PROPERTY_DISPUTE' |'PERSONAL_INJURY' |'INTELLECTUAL_PROPERTY'

export const newCase = async(data: Case) => {

     let res
    try {
     res = await fetch(`${API_BACK}/cases`, {  //TO-DO: cambair link
      method: "POST",
      headers: {
         "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
       },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      console.log("No se creo el caso fun: ",res)
      }
      return res
   }   catch (error) {
    console.error('Error del server: ', error)
    return res
   }
   
}


export const updateCase = async(data: Case, id: string) => {

    let res
   try {
    res = await fetch(`${API_BACK}/cases/${id}`, {  //TO-DO: cambair link
     method: "PUT",
     headers: {
        "Content-Type": "application/json",
       "Authorization": `Bearer ${token}`
      },
     body: JSON.stringify(data),
   });
   if (!res.ok) {
     console.log("No se puedo actualizar el caso fun: ",res)
     }
     return res
  }   catch (error) {
   console.error('Error del server: ', error)
   return res
  }
}

export const getCase = async(id: string) => {
  let res
  try {
   res = await fetch(`${API_BACK}/cases/${id}`, {  //TO-DO: cambair link
    method: "GET",
    headers: {
       "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
     },

  });
  if (!res.ok) {
    console.log("No se puedo encontrar el caso: ",res)
    }
    const data = await res.json()
    console.log('desde fun ', data)
    return data
 }   catch (error) {
  console.error('Error del server: ', error)
  return res
 }
}


export const deleteCase = async (id: string) => {
  let res;
  try {
    res = await fetch(`${API_BACK}/cases/${id}`, {  // TO-DO: cambiar link
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      console.log("No se pudo eliminar el caso: ", res);
    }

    const data = await res.json();
    console.log('Caso eliminado:', data);
    return data;
  } catch (error) {
    console.error('Error del server: ', error);
    return res;
  }
};