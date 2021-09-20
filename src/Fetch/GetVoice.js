import React from 'react'
import { useGlobalContext } from '../store/context';

const GetVoice = () => {
    const { voice } = useGlobalContext();
    if (voice.voices) {
        console.log('hello world')
    }
    var myHeaders = new Headers();
myHeaders.append("Authorization", "test_sk_DlzKdyZ6xHZLsA0WoS8fviJiC");
myHeaders.append("signatures", "lWMVR8oHqcoW4RFuV3GZAD6Wv1X7EQs8y8ntHBsgkug=");
myHeaders.append("Content-Type", "application/json");

    if (voice.voices) {
        const { voices } = voice;
        var raw = JSON.stringify({
        "mobile": `${voices}`
    });
    } else {
        return null;
    }

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };



fetch("http://localhost:5016/api/v1/resend-voice", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
    return (
        <div>
            
        </div>
    )
}

export default GetVoice
