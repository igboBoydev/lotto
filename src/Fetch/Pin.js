// import formik from 'formik'


// const schema = yup.object().shape({
//   firstName: yup.string().required(),
//   lastName: yup.string().required(),
//   username: yup.string().required(),
//   city: yup.string().required(),
//   state: yup.string().required(),
//   zip: yup.string().required(),
//   terms: yup.bool().required().oneOf([true], 'Terms must be accepted'),
// });

// function FormExample() {
//   return (
//     <Formik
//       validationSchema={schema}
//       onSubmit={console.log}
//       initialValues={{
//         firstName: 'Mark',
//         lastName: 'Otto',
//         username: '',
//         city: '',
//         state: '',
//         zip: '',
//         terms: false,
//       }}
//     >
//       {({
//         handleSubmit,
//         handleChange,
//         handleBlur,
//         values,
//         touched,
//         isValid,
//         errors,
//       }) => (
//         <Form noValidate onSubmit={handleSubmit}>
//           <Form.Row>
//             <Form.Group as={Col} md="4" controlId="validationFormik01">
//               <Form.Label>First name</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="firstName"
//                 value={values.firstName}
//                 onChange={handleChange}
//                 isValid={touched.firstName && !errors.firstName}
//               />
//               <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//             </Form.Group>
//             <Form.Group as={Col} md="4" controlId="validationFormik02">
//               <Form.Label>Last name</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="lastName"
//                 value={values.lastName}
//                 onChange={handleChange}
//                 isValid={touched.lastName && !errors.lastName}
//               />

//               <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//             </Form.Group>
//             <Form.Group as={Col} md="4" controlId="validationFormikUsername">
//               <Form.Label>Username</Form.Label>
//               <InputGroup hasValidation>
//                 <InputGroup.Prepend>
//                   <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
//                 </InputGroup.Prepend>
//                 <Form.Control
//                   type="text"
//                   placeholder="Username"
//                   aria-describedby="inputGroupPrepend"
//                   name="username"
//                   value={values.username}
//                   onChange={handleChange}
//                   isInvalid={!!errors.username}
//                 />
//                 <Form.Control.Feedback type="invalid">
//                   {errors.username}
//                 </Form.Control.Feedback>
//               </InputGroup>
//             </Form.Group>
//           </Form.Row>
//           <Form.Row>
//             <Form.Group as={Col} md="6" controlId="validationFormik03">
//               <Form.Label>City</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="City"
//                 name="city"
//                 value={values.city}
//                 onChange={handleChange}
//                 isInvalid={!!errors.city}
//               />

//               <Form.Control.Feedback type="invalid">
//                 {errors.city}
//               </Form.Control.Feedback>
//             </Form.Group>
//             <Form.Group as={Col} md="3" controlId="validationFormik04">
//               <Form.Label>State</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="State"
//                 name="state"
//                 value={values.state}
//                 onChange={handleChange}
//                 isInvalid={!!errors.state}
//               />
//               <Form.Control.Feedback type="invalid">
//                 {errors.state}
//               </Form.Control.Feedback>
//             </Form.Group>
//             <Form.Group as={Col} md="3" controlId="validationFormik05">
//               <Form.Label>Zip</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Zip"
//                 name="zip"
//                 value={values.zip}
//                 onChange={handleChange}
//                 isInvalid={!!errors.zip}
//               />

//               <Form.Control.Feedback type="invalid">
//                 {errors.zip}
//               </Form.Control.Feedback>
//             </Form.Group>
//           </Form.Row>
//           <Form.Group>
//             <Form.Check
//               required
//               name="terms"
//               label="Agree to terms and conditions"
//               onChange={handleChange}
//               isInvalid={!!errors.terms}
//               feedback={errors.terms}
//               id="validationFormik0"
//             />
//           </Form.Group>
//           <Button type="submit">Submit form</Button>
//         </Form>
//       )}
//     </Formik>
//   );
// }

// render(<FormExample />);




// import React, { useState, useEffect } from 'react';
// import { Form, Button } from 'react-bootstrap';
// import { useGlobalContext } from '../store/context';

// const Result = () => {
//     const [odds, setOdds] = useState('')
//     let token = localStorage.getItem('adminToken')
//     const [name, setName] = useState('')
//     const [arr, setArr] = useState([])
//     const [gameType, setGameType] = useState('')
//     const [success, setSuccess] = useState(null)
//     const [error, setError] = useState(null)
//     const [showAlert, setShowAlert] = useState(false)
//     const [type, setType] = useState('')
//     const [lottoE, setLottoE] = useState('')
//     const [lottoS, setLottoS] = useState('')
//     const [amount, setAmount] = useState('')
//     const [types, setTypes] = useState('')

//     const handleSubmit = (e) => {
//         e.preventDefault()
//         setGameType(name)
//         setArr(odds)

//         if (amount && types) {
//             var myHeaders = new Headers();
//             myHeaders.append("signatures", "lWMVR8oHqcoW4RFuV3GZAD6Wv1X7EQs8y8ntHBsgkug=");
//             myHeaders.append("Authorization", `Bearer ${token}`);
//             myHeaders.append("Content-Type", "application/json");

//             var raw = JSON.stringify({
//                 "type": `${types}`,
//                 "value": `${amount}`
//             });

//             var requestOptions = {
//                 method: 'POST',
//                 headers: myHeaders,
//                 body: raw,
//                 redirect: 'follow'
//             };

//             fetch("http://localhost:5016/api/v2/auth/postMaxAmount", requestOptions)
//                 .then(response => response.json())
//                 .then(result => {
//                     if (result.success) {
//                         const { message } = result.success
//                         console.log(message)
//                         setSuccess(message)
//                     }
//                 })
//                 .catch(error => console.log('error', error));
//         }else if (gameType && arr.length >= 1) {
//             var myHeaders = new Headers();
//             myHeaders.append("signatures", "lWMVR8oHqcoW4RFuV3GZAD6Wv1X7EQs8y8ntHBsgkug=");
//             myHeaders.append("timestamps", "1614848109");
//             myHeaders.append("Authorization", `Bearer ${token}`);
//             myHeaders.append("Content-Type", "application/json");

//             var raw = JSON.stringify({
//                 "names": `${gameType}`,
//                 "odds": `${arr}`
//             });

//             var requestOptions = {
//                 method: 'POST',
//                 headers: myHeaders,
//                 body: raw,
//                 redirect: 'follow'
//             };

//             fetch("http://localhost:5016/api/v2/auth/postResult", requestOptions)
//                 .then(response => response.json())
//                 .then(result => {
//                     if (result.success) {
//                         console.log(result)
//                         const { message } = result.success;
//                         setSuccess(message)
//                     } else {
//                         const { message } = result.error;
//                         setError(message)
//                     }
//                 },
//                     (error) => {
//                         console.log(error)
//                     }
//                 )
//         } else if (lottoE) {
//             var myHeaders = new Headers();
//             myHeaders.append("timestamps", "1614848109");
//             myHeaders.append("signatures", "lWMVR8oHqcoW4RFuV3GZAD6Wv1X7EQs8y8ntHBsgkug=");
//             myHeaders.append("Authorization", `Bearer ${token}`);
//             myHeaders.append("Content-Type", "application/json");

//             var raw = JSON.stringify({
//                 "odds": `${lottoE}`
//             });

//             var requestOptions = {
//                 method: 'POST',
//                 headers: myHeaders,
//                 body: raw,
//                 redirect: 'follow'
//             };

//             fetch("http://localhost:5016/api/v2/auth/postLottoExpressOdds", requestOptions)
//                 .then(response => response.json())
//                 .then(result => {
//                     if (result.success) {
//                         const { message } = result.success;
//                         setSuccess(message)
//                     } else {
//                         const { message } = result.error;
//                         setError(message)
//                     }
//                 },
//                     (error) => {
//                         console.log(error)
//                     }
//                 )
//         } else if (lottoS && type) {
//             var myHeaders = new Headers();
//             myHeaders.append("signatures", "lWMVR8oHqcoW4RFuV3GZAD6Wv1X7EQs8y8ntHBsgkug=");
//             myHeaders.append("timestamps", "1614848109");
//             myHeaders.append("Authorization", `Bearer ${token}`);
//             myHeaders.append("Content-Type", "application/json");

//             var raw = JSON.stringify({
//                 "type": `${type}`,
//                 "odds": `${lottoS}`
//             });

//             var requestOptions = {
//                 method: 'POST',
//                 headers: myHeaders,
//                 body: raw,
//                 redirect: 'follow'
//             };

//             fetch("http://localhost:5016/api/v2/auth/postSoftLottoOdds", requestOptions)
//                 .then(response => response.json())
//                 .then(result => {
//                     if (result.success) {
//                         const { message } = result.success;
//                         setSuccess(message)
//                     } else {
//                         const { message } = result.error;
//                         setError(message)
//                     }
//                 },
//                     (error) => {
//                         console.log(error)
//                     }
//                 )
//         } 
//     }

//     const handleExpress = (e) => {
//         e.preventDefault()
//         console.log(e.target.name)
//         setLottoE(e.target.value)
//         console.log(lottoE)
//     }

//     const handleSoft = (e) => {
//         e.preventDefault()
//         setLottoS(e.target.value)
//     }


//     const handleType = (e) => {
//         e.preventDefault()
//         setType(e.target.value)
//     }


//     const handleChange = (e) => {
//         e.preventDefault()
//         let value = e.target.value;
//         setAmount(value)
//     }

//     const handleChange1 = (e) => {
//         e.preventDefault()
//         let value = e.target.value;
//         setAmount(value)
//     }

//     const handleSelect = (e) => {
//         e.preventDefault()
//         let value = e.target.value;
//         setName(value)
//     }

//     const handleSelect1 = (e) => {
//         e.preventDefault()
//         let value = e.target.value;
//         setTypes(value)
//     }

//     useEffect(() => {
//         setTimeout(() => {
//             setShowAlert(!showAlert)
//         }, 3000)
//     }, [success, error]);

//     return (
//         <section className='register_section d-flex justify-content-center'>
//             <Form noValidate onSubmit={handleSubmit}>
//             {success ? <section className='mt-2 green'>
//                             {showAlert && <span>{success}</span>}
//              </section> : <section className='mt-2 p_red'>
//                             {showAlert && <span>{error}</span>}
//              </section>
//                         }
//               <Form.Group className='mt-2' controlId="exampleForm.SelectCustom">
//                 <Form.Label>Game Type:</Form.Label>
//                     <Form.Control as="select" required onChange={handleSelect} custom>
//                     <option name='NAP 1' value='NAP 1'>NAP 1</option>
//                     <option name='NAP 2' value='NAP 2'>NAP 2</option>
//                     <option name='NAP 3' value='NAP 3'>NAP 3</option>
//                     <option name='NAP 4' value='NAP 4'>NAP 4</option>
//                     <option name='NAP 5' value='NAP 5'>NAP 5</option>
//                     <option name='PERM 2' value='PERM 2'>PERM 2</option>
//                     <option name='PERM 3' value='PERM 3'>PERM 3</option>
//                     <option name='PERM 4' value='PERM 4'>PERM 4</option>
//                     <option name='PERM 5' value='PERM 5'>PERM 5</option>
//                     <option name='1 BANKER' value='1 BANKER'>1 BANKER</option>
//                     <option name=' AGAINST' value='AGAINST'>AGAINST</option>
//                 </Form.Control>
//               </Form.Group>
//                <Form.Group className='mt-2 admin_form' controlId="validationCustom01">
//                             <Form.Label>Numbers Seperated by Commas:</Form.Label>
//                             <Form.Control
//                                 required
//                                 type="text"
//                                 name="odds"
//                                 onChange={handleChange}
//                                 placeholder="22,33,2,17,88"
//                                 required
//                             />
//                             <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//                         </Form.Group>
//               <Form.Group className='mt-2' controlId="exampleForm.SelectCustom">
//                 <Form.Label>Game Type for Amount Update:</Form.Label>
//                     <Form.Control as="select" required onChange={handleSelect1} custom>
//                     <option name='NAP 1' value='NAP 1'>NAP 1</option>
//                     <option name='NAP 2' value='NAP 2'>NAP 2</option>
//                     <option name='NAP 3' value='NAP 3'>NAP 3</option>
//                     <option name='NAP 4' value='NAP 4'>NAP 4</option>
//                     <option name='NAP 5' value='NAP 5'>NAP 5</option>
//                 </Form.Control>
//               </Form.Group>
//                <Form.Group className='mt-2 admin_form' controlId="validationCustom01">
//                             <Form.Label>Max game Amount</Form.Label>
//                             <Form.Control
//                                 required
//                                 type="text"
//                                 name="amount"
//                                 onChange={handleChange1}
//                                 placeholder="20"
//                                 required
//                             />
//                             <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//                         </Form.Group>
//                         <Form.Group className='mt-2 admin_form' controlId="validationCustom01">
//                             <Form.Label>Lotto Express Odd</Form.Label>
//                             <Form.Control
//                                 required
//                                 type="text"
//                                 name="Lotto Express"
//                                 onChange={handleExpress}
//                                 placeholder="400"
//                                 required
//                             />
//                             <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//                         </Form.Group>
//                         <Form.Group className='mt-2 admin_form' controlId="validationCustom01">
//                             <Form.Label>Soft Lotto Odd for Regular</Form.Label>
//                             <Form.Control
//                                 required
//                                 type="text"
//                                 name="Sofft Lotto For Regular"
//                                 onChange={handleSoft}
//                                 placeholder="240"
//                                 required
//                             />
//                             <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//                         </Form.Group>
//                         <Form.Group className='mt-2 admin_form' controlId="validationCustom01">
//                             <Form.Label>Soft Lotto Odd for Ordered Games</Form.Label>
//                             <Form.Control as="select" onChange={handleType} custom>
//                                 <option value='Regular'>Rgeular</option>
//                                 <option value='Ordered'>Ordered</option>
//                             </Form.Control>
//                             <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//                         </Form.Group>
          
//                <Form.Text id="passwordHelpBlock" muted>
//                   Please provide the correct numbers and their respective gameType here.
//                </Form.Text>
//                  <Button className='mt-2 mb-3' type='submit' variant="outline-success">Submit</Button>
//             </Form>
//         </section>
//     )
// }

// export default Result