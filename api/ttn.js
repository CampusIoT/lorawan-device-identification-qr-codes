const TTN_URL= 'https://eu1.cloud.thethings.network/api/v3'
const API_KEY = 'NNSXS.WA72CZH2KFB2SWY5FHQOQXZQIPPBQIRJKGOBRIA.TYMDBKXME2BGINAVN4XQRLHSNJQWXBG6GJQMBQT7UDIPQ7IWIHSQ'

export async function getAppList(APIkey){
    const url = 'https://lns.campusiot.imag.fr/api/applications'
    const headers = new Headers()
    headers.append('Centent-Type', 'application/json')
    headers.append('Accept', 'application/json')
    headers.append('Grpc-Metadata-Authorization','Bearer' + ' eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJjaGlycHN0YWNrLWFwcGxpY2F0aW9uLXNlcnZlciIsImV4cCI6MTYxNTk5Mjg1NywiaXNzIjoiY2hpcnBzdGFjay1hcHBsaWNhdGlvbi1zZXJ2ZXIiLCJuYmYiOjE2MTU5MDY0NTcsInN1YiI6InVzZXIiLCJ1c2VybmFtZSI6Ikd1ZXN0U2FuZGJveCJ9.Kt0U1vJpjT02MRIGdt5o_kRkofEWKQ---x8wXC91UmI')

    const appList = await fetch(url, {
        method : "GET",
        headers: headers
    })  
    .then(response => console.log(response))
    .then(result => console.log(result))
    .catch((error) => {
        alert("Sorry error")
        console.log(error)
    })
}