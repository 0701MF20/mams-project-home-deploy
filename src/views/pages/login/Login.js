import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CImage
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { cilLockLocked, cilUser } from '@coreui/icons'
import '../../../assets/styles/customStyles.css'
import logo from '../../../assets/images/logo.png'
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import axios from 'axios'
import { jwtDecode } from "jwt-decode";
import { LOGIN_URL, ROLE_RIGHTS_URL } from '../../../utils/ConstantURL'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  //sample handleLogin
  // const handleLogin = () => {
  //   // Perform login logic here
  //   dispatch({ type: 'LOGIN_SUCCESS' }) // Dispatch login success action
  //   navigate('/dashboard') // Navigate to the dashboard
  // }


  // const handleLogin = async () => {
  //   try {
  //     // Perform login request with fetch
  //     const response = await fetch(LOGIN_URL, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         id: username.trim(),
  //         password: password.trim(),
  //       }),
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       const { token } = data;
  //       console.log("Token:", token);

  //       // Store token in localStorage
  //       localStorage.setItem('authToken', token);

  //       // Decode token and use data
  //       const decodedToken = jwtDecode(token);
  //       console.log('Decoded Token:', decodedToken);

  //       // Dispatch login success action
  //       dispatch({ type: 'LOGIN_SUCCESS' });

  //       // Navigate to the dashboard
  //       navigate('/dashboard');
  //     } else {
  //       // Handle non-200 responses
  //       console.error('Login failed with status:', response.status);
  //     }
  //   } catch (error) {
  //     // Handle errors
  //     console.error('Login Error:', error);
  //   }
  // };

  // new additions
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem('authToken');

        if (token) {
          // Decode token and use data
          const decodedToken = jwtDecode(token);

          const response2 = await axios.post(
            ROLE_RIGHTS_URL,
            {
              userId: decodedToken.LoginId,
              roleName: decodedToken.Role,
              company: decodedToken.CompCode
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response2.status === 200) {
            const roleRights = response2.data.response; // Extract roleRights from the response

            dispatch({ type: 'LOGIN_SUCCESS' }); // Dispatch login success action
            dispatch({ type: 'setRoleRights', roleRights });

            toast.success('Successfully Logged in', {
              position: 'top-center',
              autoClose: 1000,
              progress: undefined,
            });

            navigate('/dashboard'); // Navigate to the dashboard
          }
        } else {
          // Handle case where token is not found
          // toast.error('No authentication token found.');
        }
      } catch (error) {
        console.error('Error fetching role rights:', error);
        toast.error('Error during login. Please try again.');
      }
    };

    fetchData();
  }, [dispatch, navigate]); // Include dispatch and navigate in dependency array



  const handleLogin = async () => {

    if (username.trim() == '' || username.trim() == null) {
      toast.error('User Id is Mandatory', {
        position: "top-center",
        autoClose: 1000,
        progress: undefined,
      });
    }
    if (password.trim() == '' || password.trim() == null) {
      toast.error('Password is Mandatory', {
        position: "top-center",
        autoClose: 1000,
        progress: undefined,
      });
    }
    try {
      const response = await axios.post(LOGIN_URL, {
        id: username.trim(),
        password: password.trim()
      });

      if (response.status === 200) {
        const { token } = response.data;
        console.log("tken:::", token)
        // Store token in localStorage
        // localStorage.setItem('authToken', token);
        sessionStorage.setItem('authToken', token);

        // Decode token and use data
        const decodedToken = jwtDecode(token);
        console.log('Decoded Token:', decodedToken);

        // adding this is not navigating me to dashboard why?
        const response2 = await axios.post(ROLE_RIGHTS_URL,
          {
            userId: decodedToken.LoginId,
            roleName: decodedToken.Role,
            company: decodedToken.CompCode
          },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include token in Authorization header
            }
          }
        );
        if (response2.status == 200) {
          // console.log("response::::role",response2.data.response)
          // dispatch({ type: 'setRoleRights', roleRights })

          // dispatch({ type: 'LOGIN_SUCCESS' }) // Dispatch login success action
          // navigate('/dashboard') // Navigate to the dashboard

          const roleRights = response2.data.response; // Extract roleRights from the response
          console.log("Role Rights:", roleRights);


          dispatch({ type: 'LOGIN_SUCCESS' }) // Dispatch login success action
          // Dispatch actions to update Redux store
          dispatch({ type: 'setRoleRights', roleRights })

          toast.success('Successfully Logged in', {
            position: "top-center",
            autoClose: 1000,
            progress: undefined,
          });

          navigate('/dashboard') // Navigate to the dashboard

          // // Dispatch actions to update Redux store
          // dispatch({ type: 'setRoleRights', roleRights });
          // dispatch({ type: 'LOGIN_SUCCESS' }); // Dispatch login success action

          // // Navigate to the dashboard
          // navigate('/dashboard');

        }





        // dispatch({ type: 'LOGIN_SUCCESS' }) // Dispatch login success action
        // navigate('/dashboard') // Navigate to the dashboard

      }


    } catch (error) {

      toast.error(error, {
        position: "top-center",
        autoClose: 1000,
        progress: undefined,
      });
    }



  }


  // const handleLogin = async () => {
  //   try {
  //     const response = await axios.post(LOGIN_URL, {
  //       id: username.trim(),
  //       password: password.trim()
  //     });

  //     if (response.status === 200) {
  //       const { token } = response.data;
  //       console.log("tken:::", token)
  //       // Store token in localStorage
  //       localStorage.setItem('authToken', token);

  //       // Decode token and use data
  //       const decodedToken = jwtDecode(token);
  //       console.log('Decoded Token:', decodedToken);

  //       // Example: Access specific fields
  //       const userId = decodedToken.userId; // Adjust based on your token's structure
  //       const role = decodedToken.role; // Adjust based on your token's structure

  //       console.log('User ID:', userId);
  //       console.log('Role:', role);

  //       // // Dispatch login success action
  //       // dispatch({ type: 'LOGIN_SUCCESS' });

  //       // // Navigate to the dashboard
  //       // navigate('/dashboard');

  //   dispatch({ type: 'LOGIN_SUCCESS' }) // Dispatch login success action
  //   navigate('/dashboard') // Navigate to the dashboard

  //     } 

  //     // else {
  //     //   console.error('Login failed with status:', response.status);
  //     //   // Handle non-200 responses if necessary
  //     // }
  //   } catch (error) {


  //     // if (axios.isAxiosError(error)) {
  //     //   // Handle errors from Axios requests
  //     //   if (error.response) {
  //     //     // The server responded with a status other than 2xx
  //     //     console.error('Server Error:', error.response.data);
  //     //     console.error('Status Code:', error.response.status);
  //     //   } else if (error.request) {
  //     //     // The request was made but no response was received
  //     //     console.error('Network Error:', error.request);
  //     //   } else {
  //     //     // Something happened in setting up the request
  //     //     console.error('Error Message:', error.message);
  //     //   }
  //     // } else {
  //     //   // Handle errors that are not from Axios
  //     //   console.error('Unexpected Error:', error);
  //     // }
  //   }
  // };



  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <ToastContainer />
        <CRow className="justify-content-center">
          <CCol md={5}>
            {/* <CCol md={8}> */}
            <CCardGroup>



              <CCard className="p-4">
                <CCardBody>


                  <CContainer>
                    <CRow className="justify-content-center">
                      <CCol xs="auto">
                        <div
                          style={{
                            backgroundColor: 'white',
                            borderRadius: '50%',
                            width: '150px',
                            height: '150px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            padding: '40px 10px 40px 10px',

                            border: '2px solid #DD3333', // Add the border color and thickness
                          }}
                        >
                          <CImage
                            src={logo}
                            alt="Logo"
                            style={{
                              maxWidth: '80%',
                              maxHeight: '80%',
                              objectFit: 'contain',
                            }}
                          />
                          <h4 style={{ fontSize: '12px', margin: '5px 0 0 0', textAlign: 'center', color: 'black' }}>
                            Rajdhani Power Ltd.
                          </h4>
                        </div>
                      </CCol>
                    </CRow>
                  </CContainer>



                  <CForm>
                    <h2 style={{ textAlign: 'center', marginTop: '10px' }}>MAMS Login</h2>
                    <p style={{ textAlign: 'center' }} className="text-body-secondary">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="Username" autoComplete="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        // type="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      {/* <CInputGroupText onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }}>
                        {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                      </CInputGroupText> */}
                    </CInputGroup>
                    <CRow>
                      {/* <CCol xs={6}> */}
                      <CCol xs={12}>
                        <CButton color="primary" className="px-4" onClick={handleLogin}
                          style={{ width: '100%', backgroundColor: '#DD3333', borderColor: '#DD3333' }}>
                          Login
                        </CButton>
                      </CCol>
                      {/* <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol> */}
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>

            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
