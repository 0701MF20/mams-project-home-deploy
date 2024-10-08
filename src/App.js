// import React, { Suspense, useEffect } from 'react'
// import { HashRouter, Route, Routes,Navigate  } from 'react-router-dom'
// import { useSelector } from 'react-redux'

// import { CSpinner, useColorModes } from '@coreui/react'
// import './scss/style.scss'

// // Containers
// const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// // Pages
// const Login = React.lazy(() => import('./views/pages/login/Login'))
// const Register = React.lazy(() => import('./views/pages/register/Register'))
// const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
// const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

// const App = () => {
//   const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
//   const storedTheme = useSelector((state) => state.theme)
//   const isLoggedIn = useSelector((state) => state.isLoggedIn)

//   console.log("tyu:::",storedTheme)
//   console.log("tyu::2222:",isLoggedIn)
//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.href.split('?')[1])
//     const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
//     if (theme) {
//       setColorMode(theme)
//     }

//     if (isColorModeSet()) {
//       return
//     }

//     setColorMode(storedTheme)
//   }, []) // eslint-disable-line react-hooks/exhaustive-deps

//   return (
//     <HashRouter>
//       <Suspense
//         fallback={
//           <div className="pt-3 text-center">
//             <CSpinner color="primary" variant="grow" />
//           </div>
//         }
//       >
//         <Routes>
//           <Route exact path="/login" name="Login Page" element={<Login />} />
//           <Route exact path="/register" name="Register Page" element={<Register />} />
//           <Route exact path="/404" name="Page 404" element={<Page404 />} />
//           <Route exact path="/500" name="Page 500" element={<Page500 />} />
//           {/* <Route path="*" name="Home" element={<DefaultLayout />} /> */}
//           {/* <Route path="*" name="Home" element={isLoggedIn ? <DefaultLayout /> : <Navigate to="/login" />} /> */}
//           <Route path="*" name="Home" element={isLoggedIn ? <DefaultLayout /> : <Navigate to="/login" />} />

//         </Routes>
//       </Suspense>
//     </HashRouter>
//   )
// }

// export default App









//with browserRouter

// import React, { Suspense, useEffect } from 'react'
// import {BrowserRouter, HashRouter, Route, Routes,Navigate  } from 'react-router-dom'
// import { useSelector } from 'react-redux'

// import { CSpinner, useColorModes } from '@coreui/react'
// import './scss/style.scss'

// // Containers
// const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// // Pages
// const Login = React.lazy(() => import('./views/pages/login/Login'))
// const Register = React.lazy(() => import('./views/pages/register/Register'))
// const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
// const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

// const App = () => {
//   const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
//   const storedTheme = useSelector((state) => state.theme)
//   const isLoggedIn = useSelector((state) => state.isLoggedIn)

//   console.log("tyu:::",storedTheme)
//   console.log("tyu::2222:",isLoggedIn)
//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.href.split('?')[1])
//     const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
//     if (theme) {
//       setColorMode(theme)
//     }

//     if (isColorModeSet()) {
//       return
//     }

//     setColorMode(storedTheme)
//   }, []) // eslint-disable-line react-hooks/exhaustive-deps

//   return (
//     <HashRouter>
//     {/* <BrowserRouter> */}
//       <Suspense
//         fallback={
//           <div className="pt-3 text-center">
//             <CSpinner color="primary" variant="grow" />
//           </div>
//         }
//       >
//         <Routes>
//           <Route exact path="/login" name="Login Page" element={<Login />} />
//           <Route exact path="/register" name="Register Page" element={<Register />} />
//           <Route exact path="/404" name="Page 404" element={<Page404 />} />
//           <Route exact path="/500" name="Page 500" element={<Page500 />} />
//           {/* <Route path="*" name="Home" element={<DefaultLayout />} /> */}
//           {/* <Route path="*" name="Home" element={isLoggedIn ? <DefaultLayout /> : <Navigate to="/login" />} /> */}
//           <Route path="*" name="Home" element={isLoggedIn ? <DefaultLayout /> : <Navigate to="/login" />} />

//         </Routes>
//       </Suspense>
//      </HashRouter>
//   )
// }

// export default App




import React, { Suspense, useEffect } from 'react'
import { BrowserRouter, Route, Routes,Navigate  } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { CSpinner, useColorModes } from '@coreui/react'
import './scss/style.scss'

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const storedTheme = useSelector((state) => state.theme)
  const isLoggedIn = useSelector((state) => state.isLoggedIn)

  console.log("tyu:::",storedTheme)
  console.log("tyu::2222:",isLoggedIn)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1])
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
    if (theme) {
      setColorMode(theme)
    }

    if (isColorModeSet()) {
      return
    }

    setColorMode(storedTheme)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <BrowserRouter
    //  basename="/MAMS_NEW"
     >
      <Suspense
        fallback={
          // <div className="pt-3 text-center">
          //   <CSpinner color="primary" variant="grow" />
          // </div>
          <div className="d-flex justify-content-center align-items-center vh-100">
      <CSpinner color="danger" variant="grow" />
    </div>
        }
      >
        <Routes>
          <Route exact path="/login" name="Login Page" element={<Login />} />
          <Route exact path="/register" name="Register Page" element={<Register />} />
          <Route exact path="/404" name="Page 404" element={<Page404 />} />
          <Route exact path="/500" name="Page 500" element={<Page500 />} />
          {/* <Route path="*" name="Home" element={<DefaultLayout />} /> */}
          {/* <Route path="*" name="Home" element={isLoggedIn ? <DefaultLayout /> : <Navigate to="/login" />} /> */}
          <Route path="*" name="Home" element={isLoggedIn ? <DefaultLayout /> : <Navigate to="/login" />} />

        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App




