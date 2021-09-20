import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../store/context';


const FetchRegister = () => {
  const { newUsers, RegisterAlert } = useGlobalContext()
  const [alertItem, setAlertItem] = useState({})
    var myHeaders = new Headers();
    myHeaders.append("signatures", "lWMVR8oHqcoW4RFuV3GZAD6Wv1X7EQs8y8ntHBsgkug=");
    myHeaders.append("Content-Type", "application/json");

  if (newUsers.length !== 0) {
    const { user } = newUsers;
    var raw = JSON.stringify({
      "email": `${user.email}`,
      "password": `${user.password}`,
      "mobile": `${user.mobile}`
    });
  }

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  
  if (newUsers.length !== 0) {
      fetch("http://localhost:5016/api/v1/register", requestOptions)
      .then(response => response.text())
        .then(result => console.log(result))
      .catch(error => console.log('error', error));
    console.log('heyyyyyy')
  }
  
  

    
    return (
        <div>
           ''
        </div>
    )
}

export default FetchRegister



