

export type Case ={
    caseName:   string,
    jury:       string,
    caseNumber: string,
    applicant:  string,
    respondent: string,
    type:       string,
    status:     string, 
    userId:     string   
}

export const newCase = async(data: Case) => {
//export const newCase = async(data) => {


    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZDNiNTJjMDY4MDRkYTMwZWIyYzljNiIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTcyNTQwMjA0NCwiZXhwIjoxNzI1NDAyOTQ0fQ.mVK46exsB3GmMGe_SXP0Bv3Wl44Eccl1Z2ID4nJtxjA'
    //let res
    try {
   const  res = await fetch(`https://s17-09-n-node-react.onrender.com/api/v1/cases`, {  //TO-DO: cambair link
      method: "POST",
      headers: {
         "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
       },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
        throw new Error('No se pudo crear el caso');
      }
      console.log("res de fun: ",res)
      return res

    
   }   catch (error) {
    console.error('Error del server: ', error)
    throw error
   }

   
}