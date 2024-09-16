import React, { useState, useEffect } from 'react'
import {
  CModal,
  CModalFooter,
  CModalHeader,
  CListGroup,
  CListGroupItem,
  CImage,
  CModalTitle,
  CModalBody,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormCheck,
  CButtonGroup,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CPagination,
  CPaginationItem,
} from '@coreui/react'
import { jwtDecode } from "jwt-decode";
// import { ToastContainer, toast } from 'react-toastify';

// import 'react-toastify/dist/ReactToastify.css';
// import toast, { Toaster } from 'react-hot-toast';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import '../../../scss/custom-coreui.scss'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import moment from 'moment'
import { TextField } from '@mui/material';
import { ACTIVITYTYPE_URL, DIVISION_URL, DMS_BASE64_URL, DMS_TOKEN_URL, ORDERTYPE_URL, PHOTOUPLOAD_URL, PHOTOUPLOADEXCEL_URL, TOTALEXECMIS_URL, TOTALEXECMISEXCEL_URL, UPLOAD_DAMAGE_MATERIAL_DATA } from '../../../utils/ConstantURL'
import { IoMdDownload } from "react-icons/io";
import { useSelector } from 'react-redux'



const DamageMaterial = () => {
  const colorModes = useSelector((state) => state.colorModes)
  console.log("stored themme:::", colorModes)

  const textSmallStyle = {
    fontSize: '0.875rem', // Adjust as needed
  }

  const componentHeightStyle = {
    height: '2.5rem', // Adjust as needed
    padding: 10,
  }

  const buttonStyle = {
    fontSize: '0.875rem', // Adjust as needed
    padding: '0.25rem 0.5rem', // Adjust padding as needed
  }


  const [imageGallery, setImageGallery] = useState(false)
  const materials = [
    { id: 'Meter Seal', label: 'Meter Seal' },
    { id: 'Gunny Bag Seal', label: 'Gunny Bag Seal' },
    { id: 'MCR', label: 'MCR' },
    { id: 'Notice', label: 'Notice' }
  ];
  const [divisions, setDivisions] = useState([]);
  const [orderTypes, setOrderTypes] = useState([]);
  const [activityTypes, setActivityTypes] = useState([]);
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false)




  const [selectedValues, setSelectedValues] = useState({
    division: '',
    material:'',
    sno:'',
    remarks:''
   
  });

  const handleChange = (event, type) => {
    setSelectedValues(prevValues => ({
      ...prevValues,
      [type]: event.target.value
    }));
  };



  const handleRadioChange = (event) => {
    setSelectedValues(prevValues => ({
      ...prevValues,
      caseType: event.target.value
    }));
  };

  const handleDateChange = (newValue, type) => {
    setSelectedValues(prevValues => ({
      ...prevValues,
      [type]: newValue // Directly set the new date value
    }));
  };

  useEffect(() => {
    // Fetch data from the API
    const fetchDivisions = async () => {
      try {
        // const response = await axios.post(DIVISION_URL, {
        //   id: '41007656',
        //   divisionIds: "W2VKP','W2UTN','W2TGN','W2PLM','W2MGN','W2JKP','W2DWK','W1PJB','W1NJF','W1NGL','W1MDK"
        // },
        // headers: {
        //   Authorization: `Bearer ${token}`, // Include token in Authorization header
        // });
        const token = sessionStorage.getItem('authToken');
        // Decode token and use data
        const decodedToken = jwtDecode(token);
        console.log('Decoded Token:', decodedToken);
        const divids = decodedToken.DivisionId
        console.log('Decodedfff Token:', divids);
        // Split  by commas
        const itemsArray = divids.split(',');
        // Map each item 
        const quotedItemsArray = itemsArray.map(item => `'${item}'`);
        //  Join the array with commas
        let divs = quotedItemsArray.join(',');
        // Remove the first and last single quotes if they exist
        if (divs.startsWith("'") && divs.endsWith("'")) {
          divs = divs.slice(1, -1);
        }

        console.log(divs);

        const response = await axios.post(DIVISION_URL, {
          id: '41007656',
          divisionIds: `${divs}`
        }, {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in Authorization header
          }
        });
        // Parse and set data
        if (response.data && Array.isArray(response.data.response)) {
          console.log("test:::", response.data.response)
          // console.log("")
          setDivisions(response.data.response);
        }
      } catch (error) {
        console.error('Error fetching division data:', error);
      }
    };

    const fetchOrderTypes = async () => {
      try {

        const token = sessionStorage.getItem('authToken');



        const response = await axios.get(ORDERTYPE_URL, {
          headers: {
            Authorization: `Bearer ${token}` // Include token in Authorization header
          }
        });

        // Parse and set data
        if (response.data && Array.isArray(response.data.orderTypes)) {
          console.log("test:::", response.data.orderTypes)
          // console.log("")
          setOrderTypes(response.data.orderTypes);
        }
      } catch (error) {
        console.error('Error fetching division data:', error);
      }
    };

    fetchDivisions();
    fetchOrderTypes();
  }, []);


  useEffect(() => {


    const fetchActivityTypes = async () => {
      try {
        setActivityTypes([])


        const token = sessionStorage.getItem('authToken');
const decodedToken = jwtDecode(token);
        console.log('Decoded Token:', decodedToken);
        const response = await axios.post(ACTIVITYTYPE_URL, {
          // id: '41007656',
          id:decodedToken.userId,
          type: `${selectedValues.order}`
        }, {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in Authorization header
          }
        });

        // Parse and set data
        if (response.data && Array.isArray(response.data.activity)) {
          console.log("test:::", response.data.activity)
          // console.log("")

          const sortedActivity = response.data.activity.sort((a, b) => {
            if (a.id < b.id) return -1;
            if (a.id > b.id) return 1;
            return 0;
          });

          setActivityTypes(sortedActivity);


          // setActivityTypes(response.data.activity);
        }
      } catch (error) {
        console.error('Error fetching division data:', error);
      }
    };

    fetchActivityTypes();

  }, [selectedValues.order]);











  const handleViewClick = async () => {







    if (selectedValues.division === '' || selectedValues.division == null) {
      toast.error('Division is Mandatory', {
        position: "top-center",
        autoClose: 1000,
        progress: undefined,
      });
      return;
    }

    if (selectedValues.material === '' || selectedValues.material == null) {
      toast.error('Material Type is Mandatory', {
        position: "top-center",
        autoClose: 1000,
        progress: undefined,
      });
      return;
    }

    if (selectedValues.sno === '' || selectedValues.sno == null) {
      toast.error('Serial No is Mandatory', {
        position: "top-center",
        autoClose: 1000,
        progress: undefined,
      });
      return;
    }

    if (selectedValues.remarks === '' || selectedValues.remarks == null) {
      toast.error('Remarks is Mandatory', {
        position: "top-center",
        autoClose: 1000,
        progress: undefined,
      });
      return;
    }




    const token = sessionStorage.getItem('authToken');
    const decodedToken = jwtDecode(token);
    const processingToastId = toast.loading('Processing... Please wait', {
      position: "top-center",
    });
    try {
      setLoader(true); // Show loader initially
      setData([]); // Clear previous data before starting new fetch
  


        const response = await axios.post(
          UPLOAD_DAMAGE_MATERIAL_DATA,
          {


            userId: decodedToken.userId,
            division: selectedValues.division,
            subdivision:'',
            materialType: selectedValues.material,
            serialNo: selectedValues.sno,
            remark: selectedValues.remarks,
            punchBy: decodedToken.userId,
            entryDate: moment().toISOString() // Use moment to get the current date and time in ISO format


        
          },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include token in Authorization header
            },
          }
        );

        if (response.data && response.status === 200) {
         
            toast.update(processingToastId, {
              render: 'Damage Material Uploaded',
              type: "success",
              isLoading: false,
              autoClose: 1000,
            });
            setSelectedValues({
              division: '',
              material:'',
              sno:'',
              remarks:''          
            })
            setLoader(false);
            return;
          }


       
  

    } catch (error) {
      // Handle errors

      toast.update(processingToastId, {
        render: 'Error fetching data',
        type: "error",
        isLoading: false,
        autoClose: 1000,
      });
      console.error("Error fetching data:", error);
      setLoader(false);
    }
  };












  return (
    <CRow>
      <ToastContainer
      />


  



      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader className="text-center" style={{ fontSize: '1.3rem' }}>
            {/* <strong>Total Case Execution Report</strong> */}
            <strong>DAMAGE MATERIAL RECORD</strong>

          </CCardHeader>
          <CCardBody>
          
            <CRow
            // className="mb-3"
            >
              <CCol sm={4} className="mb-1">
                <CFormSelect
                  id="floatingSelect"
                  floatingLabel={
                    <>
                      <span style={textSmallStyle}>Division</span>{' '}
                      <span className="text-danger">*</span>
                    </>
                  }
                  aria-label="Division"
                  // style={componentHeightStyle}
                  // style={{
                  //   height: '2rem', // Reduced height
                  //   padding: '0.25rem 0.5rem', // Reduced padding
                  //   fontSize: '0.875rem', // Adjust font size as needed
                  // }}
                  value={selectedValues.division} // Bind to state
                  onChange={(event) => handleChange(event, 'division')}
                  className="custom-form-select" // Use the custom class
                >
                  <option>Open this select menu</option>
                  {divisions.map((division) => (
                    <option key={division.divCode} value={division.divCode}>
                      {division.divName}
                    </option>
                  ))}

                  {/* <option value="1">Alaknanda</option>
                  <option value="2">Dwarka</option>
                  <option value="3">Hauz Khas</option> */}
                </CFormSelect>
              </CCol>
              <CCol sm={4} className="mb-1">
                <CFormSelect
                  id="floatingSelect"
                  floatingLabel={
                    <>
                      <span style={textSmallStyle}>Material Type</span>{' '}
                      <span className="text-danger">*</span>
                    </>
                  }
                  aria-label="Division"
                  // style={componentHeightStyle}
                  // style={{
                  //   height: '2rem', // Reduced height
                  //   padding: '0.25rem 0.5rem', // Reduced padding
                  //   fontSize: '0.875rem', // Adjust font size as needed
                  // }}
                  value={selectedValues.material} // Bind to state
                  onChange={(event) => handleChange(event, 'material')}
                  className="custom-form-select" // Use the custom class
                >
                  <option>Open this select menu</option>
                  {materials.map((material) => (
                    <option key={material.id} value={material.id}>
                      {material.label}
                    </option>
                  ))}

                  {/* <option value="1">Alaknanda</option>
                  <option value="2">Dwarka</option>
                  <option value="3">Hauz Khas</option> */}
                </CFormSelect>
              </CCol>

              <CCol sm={4}>
                <CFormInput
                  type="text"
                  id="floatingInput"
                  floatingClassName="mb-3"
                  floatingLabel={
                    <>
                      <span style={textSmallStyle}>Serial No</span>
                    </>
                  }
                  placeholder="Enter Serial No"
                  className="custom-form-select"

                  value={selectedValues.sno} // Bind to state
                  // onChange={(event) => handleChange(event, 'caNo')}
                  onChange={(event) => handleChange(event, 'sno')}

               />
              </CCol>
           
            </CRow>
            <CRow className="mb-1">
              <CCol sm={4}>
                <CFormInput
                  type="text"
                  id="floatingInput"
                  floatingClassName="mb-3"
                  floatingLabel={
                    <>
                      <span style={textSmallStyle}>Remark</span>
                    </>
                  }
                  placeholder="Enter remarks"
                  className="custom-form-select"


                  value={selectedValues.remarks} // Bind to state
                  onChange={(event) => handleChange(event, 'remarks')}

                />
              </CCol>

          
            </CRow>

            <CRow className="justify-content-center">
              <CCol xs={12} sm={6} md={4} lg={3} className="mb-2 d-flex justify-content-center">
                <CButton color="danger" variant="outline" className="w-100" onClick={handleViewClick}>
                  Submit
                </CButton>
              </CCol>
              {/* <CCol xs={12} sm={6} md={4} lg={3} className="mb-2 d-flex justify-content-center">
                <CButton color="danger" variant="outline" className="w-100" onClick={handleExcelClick}>
                  Excel
                </CButton>
              </CCol> */}
            </CRow>

            {/* STARTT */}

          </CCardBody>
        </CCard>

        {(data.length > 0) &&



          <CCard className="mb-4">
            <CCardBody>
              <CRow>
                <CCol sm={4} className="mb-1">
                </CCol>
              </CRow>

              <CTable align="middle" className="mb-0 border" hover responsive>
                {/* <CTableHead className="text-nowrap">
                  <CTableRow>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      Case type

                    </CTableHeaderCell>
                    <CTableHeaderCell
                      className="bg-body-tertiary"
                    >
                      Division
                    </CTableHeaderCell>
                    <CTableHeaderCell
                      className="bg-body-tertiary text-center"
                    >
                      Sub Division
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Vendor Code</CTableHeaderCell>
                    <CTableHeaderCell
                      className="bg-body-tertiary text-center"
                    >
                      CA No
                    </CTableHeaderCell>
                    <CTableHeaderCell
                      className="bg-body-tertiary"
                    >
                      Order No
                    </CTableHeaderCell>

                    <CTableHeaderCell
                      className="bg-body-tertiary"
                    >
                      Order Type
                    </CTableHeaderCell>
                    <CTableHeaderCell
                      className="bg-body-tertiary"
                    >
                      Account Class
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">
                      Basic Start Date
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">
                      Basic Finish Date
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">
                      Name
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">
                      Father Name
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary"
                      style={{ paddingLeft: '16px', paddingRight: '16px' }}
                    >
                      <span style={{ color: '#F3F4F7' }}>*****************</span>Address<span style={{ color: '#F3F4F7' }}>*****************</span>
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">
                      Mobile No
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">BP No</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Pole No</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Cable Size</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Cable Length</CTableHeaderCell>

                    <CTableHeaderCell className="bg-body-tertiary">Planner Group</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Activity Reason</CTableHeaderCell>
                  </CTableRow>
                </CTableHead> */}
                <CTableHead className="text-nowrap">
                  <CTableRow>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      {/* <CIcon icon={cilPeople} /> */}
                      Case type
                    </CTableHeaderCell>
                    <CTableHeaderCell
                      className="bg-body-tertiary"
                    //  onClick={() => handleSort2('Name')}
                    >
                      Activity Date
                      {/* {orderBy === 'user.name' && (order === 'asc' ? '▲' : '▼')} */}
                      {/* {orderBy2 === 'Name' && (order === 'asc' ? '▲' : '▼')} */}
                    </CTableHeaderCell>
                    <CTableHeaderCell
                      className="bg-body-tertiary text-center"
                    // onClick={() => handleSort2('UserID')}
                    >
                      Division
                      {/* {orderBy2 === 'UserID' && (order === 'asc' ? '▲' : '▼')} */}
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Order Number</CTableHeaderCell>
                    <CTableHeaderCell
                      className="bg-body-tertiary text-center"
                    // onClick={() => handleSort2('Division')}
                    >
                      CA No
                      {/* {orderBy2 === 'Division' && (order === 'asc' ? '▲' : '▼')} */}
                    </CTableHeaderCell>
                    <CTableHeaderCell
                      className="bg-body-tertiary"
                    // onClick={() => handleSort2('Designation')}
                    >
                      Order Type
                      {/* {orderBy2 === 'Designation' && (order === 'asc' ? '▲' : '▼')} */}
                    </CTableHeaderCell>

                    <CTableHeaderCell
                      className="bg-body-tertiary"
                    // onClick={() => handleSort2('Role')}
                    >
                      Activity Type
                      {/* {orderBy2 === 'Role' && (order === 'asc' ? '▲' : '▼')} */}
                    </CTableHeaderCell>
                    <CTableHeaderCell
                      className="bg-body-tertiary"
                    // onClick={() => handleSort2('Status')}
                    >
                      New Meter Number
                      {/* {orderBy2 === 'Status' && (order === 'asc' ? '▲' : '▼')} */}
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">
                      {/* Password */}
                      Old Meter No
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">
                      {/* Action */}
                      Gunny Bag Number
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">
                      {/* Action */}
                      Lineman Name
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">
                      {/* Action */}
                      Photo
                    </CTableHeaderCell>


                  </CTableRow>
                </CTableHead>

                <CTableBody>


                  {paginatedData.map((item, index) => (
                    <CTableRow key={index} style={{ fontSize: 10 }}>
                      <CTableDataCell className="text-center">{item.caseType}</CTableDataCell>
                      <CTableDataCell className="text-center">
                        {moment(item.activityDate, 'DD-MM-YYYY HH:mm:ss').format('DD/MM/YYYY')}
                      </CTableDataCell>

                      <CTableDataCell className="text-center">{item.division}</CTableDataCell>
                      <CTableDataCell className="text-center">{item.orderId}</CTableDataCell>
                      <CTableDataCell className="text-center">{item.caNo}</CTableDataCell>
                      <CTableDataCell className="text-center">{item.orderType}</CTableDataCell>
                      <CTableDataCell className="text-center">{item.activityType}</CTableDataCell>
                      <CTableDataCell className="text-center">{item.newMeterNo}</CTableDataCell>

                      <CTableDataCell className="text-center">
                        {item.oldMeterNo == "" ? "NA" : item.oldMeterNo}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        {item.gunnyBagNo == "" ? "NA" : item.gunnyBagNo}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">{item.linemanName}</CTableDataCell>
                      <CTableDataCell className="text-center">

                        <CButton color="danger" variant="outline"
                          // onClick={() => {
                          //   setImageGallery(true)
                          //   setSelectedItem(item)
                          // }}
                          onClick={() => handleButtonClick(item)}

                        >View</CButton>

                      </CTableDataCell>






                    </CTableRow>
                  ))}


                </CTableBody>
              </CTable>
              <CPagination className="mt-3 justify-content-end" align="end">
                <CPaginationItem disabled={page === 1} onClick={() => setPage(page - 1)}>
                  Previous
                </CPaginationItem>

                {getPageNumbers().map((pageNumber) => (
                  <CPaginationItem
                    key={pageNumber}
                    active={pageNumber === page}
                    onClick={() => handlePageChange(pageNumber)}

                  // onClick={() => setPage(pageNumber)}
                  >
                    {pageNumber}
                  </CPaginationItem>
                ))}

                <CPaginationItem
                  // disabled={page === Math.ceil(paginatedData.length / rowsPerPage)}
                  // onClick={() => setPage(page + 1)}
                  disabled={isNextButtonDisabled} // Disable if less than rowsPerPage items on the current page
                  onClick={() => handlePageChange(page + 1)}
                >
                  Next
                </CPaginationItem>
              </CPagination>

            </CCardBody>
          </CCard>

        }


      </CCol>
    </CRow>
  )
}

export default DamageMaterial








