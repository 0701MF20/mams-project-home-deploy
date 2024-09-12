import React, { useEffect, useState } from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CRow,
  CCol
} from '@coreui/react'
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
  cilPowerStandby

} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { useNavigate } from 'react-router-dom'

import avatar8 from './../../assets/images/avatars/8.jpg'
import profile from './../../assets/images/avatars/profile.png'
import { jwtDecode } from 'jwt-decode'
const AppHeaderDropdown = () => {
  const navigate = useNavigate()


  const [data, setData] = useState({
    name: '',
    role: '',
    loginId: ''
  })

  
  const roleMapping = {
    I: 'INSTALLER',
    V: 'VENDOR',
    U: 'VIEWER',
    PV: 'POWER VENDOR',
    MMGA: 'MMG_ADMIN',
    AD: 'MMG_AUDIT',
    A: 'Admin'  
  }
  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();


    navigate('/login')
  };
  useEffect(() => {
    const fetchData = async () => {


      const token = sessionStorage.getItem('authToken');

      const decodedToken = jwtDecode(token);
      console.log('Decoded Token:hmmmmmmmmmmmmmmm', decodedToken);
      setData((prev) => ({
        ...prev,
        name: decodedToken.LoginName,
        // role: decodedToken.Role,
        role: roleMapping[decodedToken.Role] || decodedToken.Role, 

        loginId: decodedToken.LoginId
      }));

    };

    fetchData();
  }, []);





  return (
    // <CDropdown variant="nav-item">
    //   <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
    //     {/* <CAvatar src={avatar8} size="md" /> */}
    //     <CAvatar src={profile} size="md" />
    //     {/* profile */}
    //   </CDropdownToggle>
    //   <CDropdownMenu className="pt-0" placement="bottom-end">
    //     <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">Account</CDropdownHeader>
    //     <CDropdownItem href="#">
    //       <CIcon icon={cilBell} className="me-2" />
    //       Updates
    //       <CBadge color="info" className="ms-2">
    //         42
    //       </CBadge>
    //     </CDropdownItem>


    //     {/* <CDropdownItem href="#">
    //       <CIcon icon={cilEnvelopeOpen} className="me-2" />
    //       Messages
    //       <CBadge color="success" className="ms-2">
    //         42
    //       </CBadge>
    //     </CDropdownItem>
    //     <CDropdownItem href="#">
    //       <CIcon icon={cilTask} className="me-2" />
    //       Tasks
    //       <CBadge color="danger" className="ms-2">
    //         42
    //       </CBadge>
    //     </CDropdownItem>
    //     <CDropdownItem href="#">
    //       <CIcon icon={cilCommentSquare} className="me-2" />
    //       Comments
    //       <CBadge color="warning" className="ms-2">
    //         42
    //       </CBadge>
    //     </CDropdownItem> */}



    //     <CDropdownHeader className="bg-body-secondary fw-semibold my-2">Settings</CDropdownHeader>
    //     <CDropdownItem href="#">
    //       <CIcon icon={cilUser} className="me-2" />
    //       Profile
    //     </CDropdownItem>
    //     <CDropdownItem href="#">
    //       <CIcon icon={cilSettings} className="me-2" />
    //       Settings
    //     </CDropdownItem>
    //     {/* <CDropdownItem href="#">
    //       <CIcon icon={cilCreditCard} className="me-2" />
    //       Payments
    //       <CBadge color="secondary" className="ms-2">
    //         42
    //       </CBadge>
    //     </CDropdownItem> */}
    //     {/* <CDropdownItem href="#">
    //       <CIcon icon={cilFile} className="me-2" />
    //       Projects
    //       <CBadge color="primary" className="ms-2">
    //         42
    //       </CBadge>
    //     </CDropdownItem> */}
    //     <CDropdownDivider />
    //     <CDropdownItem href="#">
    //       <CIcon
    //        icon={cilPowerStandby}
    //         className="me-2" />

    //        Logout
    //     </CDropdownItem>
    //   </CDropdownMenu>
    // </CDropdown>


    //   <CDropdown variant="nav-item">
    //   <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
    //     <CAvatar src={profile} size="md" />
    //   </CDropdownToggle>
    //   <CDropdownMenu className="pt-0" placement="bottom-end" style={{ minWidth: '250px' }}>
    //     <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">
    //       <CRow className="align-items-center">
    //         <CCol xs="3">
    //           <CAvatar src={profile} size="md" />
    //         </CCol>
    //         <CCol xs="9">
    //           <div className="fw-bold">{userName}</div>
    //           <div className="text-muted">{userRole}</div>
    //         </CCol>
    //       </CRow>
    //     </CDropdownHeader>

    //     <CDropdownDivider />

    //     <CDropdownItem href="#">
    //       <CIcon icon={cilUser} className="me-2" />
    //       Profile
    //     </CDropdownItem>
    //     <CDropdownItem href="#">
    //       <CIcon icon={cilSettings} className="me-2" />
    //       Settings
    //     </CDropdownItem>

    //     <CDropdownDivider />

    //     <CDropdownItem href="#">
    //       <CIcon icon={cilPowerStandby} className="me-2" />
    //       Logout
    //     </CDropdownItem>
    //   </CDropdownMenu>
    // </CDropdown>


    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        <CAvatar src={profile} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end" style={{ minWidth: '250px' }}>
        <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">
          <CRow className="align-items-center">
            <CCol xs="3">
              <CAvatar src={profile} size="md" />
            </CCol>
            <CCol xs="9">
              <div className="fw-bold">{data.name}</div>
              <div className="text-muted">{data.role}</div>
              <div className="text-muted">{data.loginId}</div> {/* Display login ID */}
            </CCol>
          </CRow>
        </CDropdownHeader>

        <CDropdownDivider />

        {/* <CDropdownItem href="#">
      <CIcon icon={cilUser} className="me-2" />
      Profile
    </CDropdownItem> */}
        <CDropdownItem href="#">
          <CIcon icon={cilSettings} className="me-2" />
          Settings
        </CDropdownItem>

        <CDropdownDivider />

        <CDropdownItem onClick={handleLogout}>
          <CIcon icon={cilPowerStandby} className="me-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
