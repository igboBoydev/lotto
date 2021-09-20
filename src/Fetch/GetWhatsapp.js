import React from 'react'
import { useGlobalContext } from '../store/context';

const GetWhatsapp = () => {
  const { whatsapp } = useGlobalContext();
 
  
    var myHeaders = new Headers();
myHeaders.append("signatures", "lWMVR8oHqcoW4RFuV3GZAD6Wv1X7EQs8y8ntHBsgkug=");
myHeaders.append("timestamps", "1614848109");
  myHeaders.append("Content-Type", "application/json");
  

  if (whatsapp) {
    const { whatsapps } = whatsapp;
    var raw = JSON.stringify({
      "mobile": `${whatsapps}`
    });
  }



var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

  fetch("http://localhost:5016/api/v1/resend-whatsapp", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
    return (
        <div>
            
        </div>
    )
}

export default GetWhatsapp
