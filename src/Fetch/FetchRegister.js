// import React, { useEffect, useState } from 'react';
// import { useGlobalContext } from '../store/context';


// const FetchRegister = () => {
//     const { newUsers, RegisterAlert } = useGlobalContext()
//     // if (newUsers.length !== 0) {
//     //     console.log(newUsers)
//     // }

//     var myHeaders = new Headers();
//      myHeaders.append("signatures", "lWMVR8oHqcoW4RFuV3GZAD6Wv1X7EQs8y8ntHBsgkug=");
//      myHeaders.append("Content-Type", "application/json");
  
    
//     const [alertItem, setAlertItem] = useState([])
//     if (newUsers.length > 0) {
//         var { email, password, mobile } = newUsers.user
//         var raw = JSON.stringify({
//             "email": `${email}`,
//             "password": `${password}`,
//             "mobile": `${mobile}`
//         });
//     }


        
    
//     var requestOptions = {
//         method: 'POST',
//         headers: myHeaders,
//         body: raw,
//         redirect: 'follow'
//     };


//     useEffect(() => {
//         fetch("http://localhost:5016/api/v1/register", requestOptions)
//             .then(response => response.text())
//             .then(result => {
//                 setAlertItem(result)
//             },
//                 (error) => {
//                     console.log(error)
//                 }
//             )
//     }, [])
//     console.log(alertItem)
    
//     return alertItem
    
// }


// export default FetchRegister
