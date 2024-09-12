import React, { useEffect, useState } from 'react'
import {
  CAvatar,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CFormInput,
  CFormLabel,
  CFormFloating,
  CFormSelect,
  CFormTextarea,
  CFormSwitch,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CFormCheck,
  CProgress,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import axios from 'axios'
import {
  cilBell,
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'
// import { DocsExample } from 'src/components'
// import { DocsExample } from '../../components'
// import { DocsExample } from '../../../components'
import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'
import { DocsExample } from '../../../components'
import { jwtDecode } from 'jwt-decode'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ROLE_RIGHTS_URL, ROLES_URL, UPDATE_ROLE_RIGHTS_URL } from '../../../utils/ConstantURL'
const RoleRights = () => {
  const tableExample = [
    {
      avatar: { src: avatar1, status: 'success' },
      user: {
        name: 'Yiorgos Avraamu',
        new: true,
        registered: 'Jan 1, 2023',
      },
      country: { name: 'USA', flag: cifUs },
      usage: {
        value: 50,
        period: 'Jun 11, 2023 - Jul 10, 2023',
        color: 'success',
      },
      payment: { name: 'Mastercard', icon: cibCcMastercard },
      activity: '10 sec ago',
    },
    {
      avatar: { src: avatar2, status: 'danger' },
      user: {
        name: 'Avram Tarasios',
        new: false,
        registered: 'Jan 1, 2023',
      },
      country: { name: 'Brazil', flag: cifBr },
      usage: {
        value: 22,
        period: 'Jun 11, 2023 - Jul 10, 2023',
        color: 'info',
      },
      payment: { name: 'Visa', icon: cibCcVisa },
      activity: '5 minutes ago',
    },
    {
      avatar: { src: avatar3, status: 'warning' },
      user: { name: 'Quintin Ed', new: true, registered: 'Jan 1, 2023' },
      country: { name: 'India', flag: cifIn },
      usage: {
        value: 74,
        period: 'Jun 11, 2023 - Jul 10, 2023',
        color: 'warning',
      },
      payment: { name: 'Stripe', icon: cibCcStripe },
      activity: '1 hour ago',
    },
    {
      avatar: { src: avatar4, status: 'secondary' },
      user: { name: 'Enéas Kwadwo', new: true, registered: 'Jan 1, 2023' },
      country: { name: 'France', flag: cifFr },
      usage: {
        value: 98,
        period: 'Jun 11, 2023 - Jul 10, 2023',
        color: 'danger',
      },
      payment: { name: 'PayPal', icon: cibCcPaypal },
      activity: 'Last month',
    },
    {
      avatar: { src: avatar5, status: 'success' },
      user: {
        name: 'Agapetus Tadeáš',
        new: true,
        registered: 'Jan 1, 2023',
      },
      country: { name: 'Spain', flag: cifEs },
      usage: {
        value: 22,
        period: 'Jun 11, 2023 - Jul 10, 2023',
        color: 'primary',
      },
      payment: { name: 'Google Wallet', icon: cibCcApplePay },
      activity: 'Last week',
    },
    {
      avatar: { src: avatar6, status: 'danger' },
      user: {
        name: 'Friderik Dávid',
        new: true,
        registered: 'Jan 1, 2023',
      },
      country: { name: 'Poland', flag: cifPl },
      usage: {
        value: 43,
        period: 'Jun 11, 2023 - Jul 10, 2023',
        color: 'success',
      },
      payment: { name: 'Amex', icon: cibCcAmex },
      activity: 'Last week',
    },
  ]

  const tableData = [
    { serial: 1, title: 'Home Page', status: true },
    { serial: 2, title: 'About Us', status: false },
    { serial: 3, title: 'Services', status: true },
    { serial: 4, title: 'Contact', status: false },
    { serial: 5, title: 'FAQ', status: true },
    { serial: 6, title: 'Support', status: false },
  ]

  const [inputData, setInputData] = useState({
    company: '',
    role: ''
  })

  const [roles, setRoles] = useState([])

  useEffect(() => {


    const fetchRoles = async () => {
      try {


        const token = sessionStorage.getItem('authToken');
        // Decode token and use data
        const decodedToken = jwtDecode(token);
        console.log('Decoded Token:', decodedToken);
        const role = decodedToken.Role

        const response = await axios.post(ROLES_URL, {
          id: decodedToken.userId,
          roleId: `${role}`
        }, {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in Authorization header
          }
        });
        // Parse and set data
        if (response.data && Array.isArray(response.data.response)) {
          console.log("test:::role", response.data.response)
          // console.log("")
          setRoles(response.data.response);
        }
      } catch (error) {
        console.error('Error fetching division data:', error);
      }
    };

    fetchRoles();
  }, []);


  const [showData, setShowData] = useState([]);

  const handleViewAccess = async () => {


    if (inputData.company.trim() === '' || inputData.company.trim() == null) {
      toast.error('Company is Mandatory', {
        position: "top-center",
        autoClose: 1000,
        progress: undefined,
      });
      return;
    }


    if (inputData.role.trim() === '' || inputData.role.trim() == null) {
      toast.error('Role is Mandatory', {
        position: "top-center",
        autoClose: 1000,
        progress: undefined,
      });
      return;
    }

    setShowData([])

    const token = sessionStorage.getItem('authToken');
    const decodedToken = jwtDecode(token);
    console.log('Decoded Token:', decodedToken);

    try {


      const response = await axios.post(
        ROLE_RIGHTS_URL,
        {
          userId: decodedToken.LoginId,
          roleName: inputData.role,
          company: inputData.company
        }
        ,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("test::_add_role_rights_viewss::::::::", response.data.response);

        setShowData(response.data.response)
        toast.success(response.data.message || "Role Rights Fetched", {
          position: "top-center",
          autoClose: 1000,
          progress: undefined,
        });

      } else {
        // If an error or no data in the response, show an error message

        toast.error('Role Rights Not Fetched. Please try again.', {
          position: "top-center",
          autoClose: 1000,
          progress: undefined,
        });
        setShowData([])
      }

    } catch (error) {
      // Handle errors
      console.error("Error fetching data:", error);
      setShowData([])
      toast.error('An error occurred. Please try again later.', {
        position: "top-center",
        autoClose: 1000,
        progress: undefined,
      });
    }
  };

  const handleSwitchChange = async (e, item) => {
    const newValue = e.target.checked; 
    const updatedData = {
        id: item.id,
        canView: newValue,
    };
    
    console.log("itemswicthyc:::", newValue);
    console.log("item:::", item);
    console.log("item::updated data:", updatedData);

    const token = sessionStorage.getItem('authToken');
    const decodedToken = jwtDecode(token);
    console.log('Decoded Token:', decodedToken);

    try {
        const response = await axios.post(
            UPDATE_ROLE_RIGHTS_URL,
            {
                roleName: inputData.role,
                pageName: item.pageName,
                // company: 'BRPL',
                company:inputData.company,
                canView: newValue,
                canEdit: true
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (response.status === 200) {
            console.log("test::_add_role_rights_viewss::::::::", response.data.message);

            toast.success(response.data.message || "Role Rights Changed", {
                position: "top-center",
                autoClose: 1000,
                progress: undefined,
            });
        } else {
            toast.error('Role Rights Not Fetched. Please try again.', {
                position: "top-center",
                autoClose: 1000,
                progress: undefined,
            });
        }

    } catch (error) {
        console.error("Error fetching data:", error);

        toast.error('An error occurred while updating role rights. Please try again.', {
            position: "top-center",
            autoClose: 1000,
            progress: undefined,
        });
    }
};




  return (
    <CRow>
      <ToastContainer />
      <CCol xs={12} sm={12} md={12} lg={12}>
        <CCard className="mb-4">
          <CCardHeader style={{ textAlign: 'center', fontSize: '20px' }}>
            <strong>Role Rights</strong>
          </CCardHeader>
          <CCardBody>
            <CRow className="mb-3">
              <CCol sm={6} xs={12} md={6} lg={6} className="mb-3">
                <CFormSelect
                  id="floatingSelect"
                  style={{ fontSize: '12px', height: 'auto' }}
                  floatingLabel={
                    <span style={{ fontSize: '14px', fontWeight: 'bold' }}>
                      <span style={{ color: 'black' }}>Company</span> <span className="text-danger">*</span>
                    </span>
                  }
                  aria-label="Floating label select example"

                  value={inputData?.company || ''}
                  onChange={(e) => setInputData({ ...inputData, company: e.target.value })}
                >
                  <option>Open this select menu</option>
                  <option value="BRPL">BRPL</option>
                  <option value="BYPL">BYPL</option>
                </CFormSelect>
              </CCol>

              <CCol sm={6} xs={12} md={6} lg={6} className="mb-3">
                <CFormSelect
                  id="floatingSelect"
                  style={{ fontSize: '12px', height: 'auto' }}
                  floatingLabel={
                    <span style={{ fontSize: '14px', fontWeight: 'bold' }}>
                      <span style={{ color: 'black' }}>Role</span> <span className="text-danger">*</span>
                    </span>
                  }
                  aria-label="Floating label select example"

                  value={inputData?.role || ''}
                  onChange={(e) => setInputData({ ...inputData, role: e.target.value })}
                >
                  <option>Select</option>
                  {roles.map((role) => (
                    <option key={role.roleValue} value={role.roleValue}>
                      {role.roleLabel}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
              {/* <CCol sm={4}>
                <CFormSelect
                  id="floatingSelect"
                  floatingLabel={<><span>Role</span> <span className="text-danger">*</span></>}

                  aria-label="Floating label select example"
                >
                  <option>Open this select menu</option>
                  <option value="1">Admin</option>
                  <option value="2">Installer</option>
                  <option value="3">Vendor</option>
                  <option value="4">MMG Admin</option>
                  <option value="5">MMG Audit</option>
                </CFormSelect>
              </CCol> */}
            </CRow>

            <CRow className="justify-content-center">
              <CCol xs={12} sm={6} md={4} lg={3} className="mb-2 d-flex justify-content-center">
                <CButton color="danger" variant="outline" className="w-100"
                  onClick={() => handleViewAccess()}
                >
                  View
                </CButton>
              </CCol>
              {/* <CCol xs={12} sm={6} md={4} lg={3} className="mb-2 d-flex justify-content-center">
                <CButton color="danger" variant="outline" className="w-100">
                  Save
                </CButton>
              </CCol> */}
            </CRow>
          </CCardBody>

          {showData.length > 0 &&
            <CTable align="middle" className="mb-0 border" hover responsive>
              <CTableHead className="text-nowrap">
                <CTableRow>
                  <CTableHeaderCell className="bg-body-tertiary text-center" style={{ width: '5%' }}>S.No</CTableHeaderCell>
                  <CTableHeaderCell className="bg-body-tertiary" style={{ width: '75%' }}>Page Title</CTableHeaderCell>
                  <CTableHeaderCell className="bg-body-tertiary text-center" style={{ width: '20%' }}>Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>


                {
                  showData.map((item, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell className="text-center" style={{ width: '5%' }}>{index + 1}</CTableDataCell>
                      <CTableDataCell style={{ width: '75%' }}>{item.pageName}</CTableDataCell>
                      <CTableDataCell
                        // className="text-center" 
                        style={{ width: '10%' }}>
                        <CFormSwitch
                          label=""
                          id={`switch-${index}`}
                          defaultChecked={item.canView}
                          onChange={(e) => handleSwitchChange(e, item)}
                        />
                      </CTableDataCell>
                    </CTableRow>
                  ))
                }


              </CTableBody>
            </CTable>
          }





        </CCard>
      </CCol>
    </CRow>
  )
}

export default RoleRights
