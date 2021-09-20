import React from 'react'
import { useGlobalContext } from '../store/context'



const FetchVerify = () => {
  const { value } = useGlobalContext();
 

 
    var myHeaders = new Headers();
    myHeaders.append("signatures", "lWMVR8oHqcoW4RFuV3GZAD6Wv1X7EQs8y8ntHBsgkug=");
    myHeaders.append("Content-Type", "application/json");

  if (value.length !== 0) {
    var raw = JSON.stringify({
      "otp": `${value.otp}`,
      "mobile": `${value.mobile}`
    });
  }

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
  };
  
  if (value.length !== 0) {

    fetch("http://localhost:5016/api/v1/validate-otp", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }
//     return (
//         <div>
            
//         </div>
//     )
    return (
        <div>
           ''
        </div>
    )
}

export default FetchVerify
