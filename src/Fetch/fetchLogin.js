// import React from 'react';
// import { useGlobalContext } from '../store/context';

// const FetchLogin = () => {
//   const { grantAccess } = useGlobalContext()
//   if (grantAccess.length !== 0) {
//     var myHeaders = new Headers();
// myHeaders.append("signatures", "lWMVR8oHqcoW4RFuV3GZAD6Wv1X7EQs8y8ntHBsgkug=");
// myHeaders.append("timestamps", "1614848109");
// myHeaders.append("Content-Type", "application/json");

// var raw = JSON.stringify({
//   "mobile": `${grantAccess.userLogin.mobile}`,
//   "password": `${grantAccess.userLogin.password}`
// });

// var requestOptions = {
//   method: 'POST',
//   headers: myHeaders,
//   body: raw,
//   redirect: 'follow'
// };

// fetch("http://localhost:5016/api/v1/login", requestOptions)
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));





//   }



//     return (
//         <div>
//             hello
//         </div>
//     )
// }

// export default FetchLogin


