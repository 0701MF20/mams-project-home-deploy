import React, { useState, useEffect } from 'react'
import CIcon from '@coreui/icons-react'

import {
  CModal,
  CAlert,
  CImage,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CAlertHeading,
  CModalFooter, CModalContent,
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
import {
  cilCheckCircle,
  // cisLockUnlocked,
  // cil-lock-unlocked,
  cilArrowLeft,
  cilTrash,
  cilChevronLeft,
  cilChevronRight,
  cilArrowBottom,
  cilArrowRight,
  cilDelete,
  cilFilter,
  cibCcAmex,
  cilUserFollow,
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
  cilTouchApp,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilX,
  cilUserFemale,
  cilLockUnlocked,
  cilCloudUpload,
  cilImage
} from '@coreui/icons'
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
import { ACTIVITYTYPE_URL, DIVISION_URL, DMS_BASE64_URL, DMS_TOKEN_URL, GET_UNVERF_PHOTO_DETAILS, ORDERTYPE_URL, PHOTO_VERIFICATION_SUBMISSION, TOTALEXECMIS_URL, TOTALEXECMISEXCEL_URL } from '../../../utils/ConstantURL'
import { useSelector } from 'react-redux'



const MeterPhotoVerification = () => {
  const colorModes = useSelector((state) => state.colorModes)

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

  const containerStyle = {
    position: 'relative',
    display: 'inline-block',
  };

  const iconOverlayStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'none',
    background: 'rgba(0, 0, 0, 0.5)',
    borderRadius: '50%',
    padding: '10px',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '24px',
    zIndex: '10', // Ensure the icon is on top of other content
  };

  const imageStyle = {
    cursor: 'pointer',
    width: '100px',
    height: 'auto',
  };
  const [divisions, setDivisions] = useState([]);
  const [orderTypes, setOrderTypes] = useState([]);
  const [activityTypes, setActivityTypes] = useState([]);
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false)

  const [caseType, setCaseType] = useState('')

  const [selectedValues, setSelectedValues] = useState({
    division: '',
    order: '',
    activity: '',
    installername: '',
    caNo: '',
    orderno: '',
    datefrom: null,
    dateTo: null,
    caseType: 'ORDER BASED',
    metrno: ''
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


  const [token, setToken] = useState('')
  const [cookie, setCookie] = useState('')
  const [selectedImages, setSelectedImages] = useState({});

  console.log("tetsttttt:::", data)
  console.log("loadvgv::", loader)
  const [selectedVerify, setSelectedVerify] = useState({});
  // Function to fetch base64 image for a given document ID
  const fetchBase64Image = async (docId) => {
    // const toastId = toast.info('Fetching image...', { autoClose: false });

    try {
      const token1 = sessionStorage.getItem('authToken');
      const decodedToken = jwtDecode(token1);

      const response = await axios.post(
        DMS_BASE64_URL,
        {
          userId: decodedToken.userId,
          tokenKey: `${token}`,
          cookiee: `${cookie}`,
          documentID: `${docId}`
        },
        { headers: { Authorization: `Bearer ${token1}` } }
      );

      // toast.update(toastId, { render: 'Image fetched successfully!', type: 'success', autoClose: 5000 });
      return response.data.Result;
    } catch (error) {
      console.error('Error fetching base64 image:', error);
      // toast.update(toastId, { render: 'Error fetching image!', type: 'error', autoClose: 5000 });
      return null;
    }
  };

  // Fetch token and cookie on component mount
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token1 = sessionStorage.getItem('authToken');
        const decodedToken = jwtDecode(token1);

        const response = await axios.post(
          DMS_TOKEN_URL,
          { userId: decodedToken.userId, Key: "!@B$E$#RK@!", KeySource: "RAKSHAK", Application: "Raskshak" },
          { headers: { Authorization: `Bearer ${token1}` } }
        );

        if (response.status === 200) {
          setToken(response.data.Key);
          setCookie(response.data.Result);
        }
      } catch (err) {
        console.error('Error fetching token:', err);
      }
    };

    fetchToken();
  }, []);

  // Fetch images for all document IDs and store them in setSelectedImages
  // useEffect(() => {
  //   console.log("lol::::::::::::::::")
  //   const fetchImages = async () => {
  //     if (token && cookie) {
  //       const docIdList = {
  //         filE_CONS_SIGNATURE: selectedVerify.filE_CONS_SIGNATURE,
  //         filE_LAB_TESTING_NOTICE: selectedVerify.filE_LAB_TESTING_NOTICE,
  //         filE_METER_BEFORE_ACTIVITY: selectedVerify.filE_METER_BEFORE_ACTIVITY,
  //         filE_NEW_METER: selectedVerify.filE_NEW_METER,
  //         filE_OLD_METER_GUNNYBAG: selectedVerify.filE_OLD_METER_GUNNYBAG,
  //         filE_OLD_METER_READING: selectedVerify.filE_OLD_METER_READING,
  //         filE_POLE_BUSBAR: selectedVerify.filE_POLE_BUSBAR
  //       };
  //       console.log("lol:::::mmmmmmmmmmm:::::::::::")
  //       const fetchedImages = {};
  //       for (const [key, docId] of Object.entries(docIdList)) {
  //         if (docId) {
  //           const base64Image = await fetchBase64Image(docId);
  //           if (base64Image) {
  //             fetchedImages[key] = base64Image;
  //           }
  //         }
  //       }

  //       setSelectedImages(fetchedImages);
  //     }
  //   };

  //   fetchImages();
  // }, [token, cookie, selectedVerify]);




  // // Function to fetch images for all document IDs
  // const fetchImagesBeforeModal = async (docId) => {
  //   const toastId = toast.info('Fetching image...', { autoClose: false });

  //   const docIdList = {
  //     filE_CONS_SIGNATURE: docId.filE_CONS_SIGNATURE,
  //     filE_LAB_TESTING_NOTICE: docId.filE_LAB_TESTING_NOTICE,
  //     filE_METER_BEFORE_ACTIVITY: docId.filE_METER_BEFORE_ACTIVITY,
  //     filE_NEW_METER: docId.filE_NEW_METER,
  //     filE_OLD_METER_GUNNYBAG: docId.filE_OLD_METER_GUNNYBAG,
  //     filE_OLD_METER_READING: docId.filE_OLD_METER_READING,
  //     filE_POLE_BUSBAR: docId.filE_POLE_BUSBAR
  //   }; x

  //   const fetchedImages = {};
  //   for (const [key, docId] of Object.entries(docIdList)) {
  //     if (docId) {
  //       const base64Image = await fetchBase64Image(docId);
  //       if (base64Image) {
  //         fetchedImages[key] = base64Image;
  //       }
  //       toast.update(toastId, { render: 'Image fetched successfully!', type: 'success', autoClose: 5000 });

  //     }
  //   }

  //   setSelectedImages(fetchedImages);
  // };

  const fetchImagesBeforeModal = async (docIds) => {
    const toastId = toast.info('Fetching images...', { autoClose: false });

    const docIdList = {
      filE_CONS_SIGNATURE: docIds.filE_CONS_SIGNATURE,
      filE_LAB_TESTING_NOTICE: docIds.filE_LAB_TESTING_NOTICE,
      filE_METER_BEFORE_ACTIVITY: docIds.filE_METER_BEFORE_ACTIVITY,
      filE_NEW_METER: docIds.filE_NEW_METER,
      filE_OLD_METER_GUNNYBAG: docIds.filE_OLD_METER_GUNNYBAG,
      filE_OLD_METER_READING: docIds.filE_OLD_METER_READING,
      filE_POLE_BUSBAR: docIds.filE_POLE_BUSBAR
    };

    const fetchedImages = {};
    let success = true;

    for (const [key, docId] of Object.entries(docIdList)) {
      if (docId) {
        try {
          const base64Image = await fetchBase64Image(docId);
          if (base64Image) {
            fetchedImages[key] = base64Image;
          }
        } catch (error) {
          console.error(`Error fetching image for ${key}:`, error);
          success = false;
        }
      }
    }

    if (success) {
      toast.update(toastId, { render: 'All images fetched successfully!', type: 'success', autoClose: 5000 });
    } else {
      toast.update(toastId, { render: 'Error fetching some images.', type: 'error', autoClose: 5000 });
    }

    setSelectedImages(fetchedImages);
  };




  // Function to handle "Verify" button click (fetch images before opening modal)
  const handleVerifyClick = async (item) => {
    // await fetchToken(); // Ensure token and cookie are fetched
    await fetchImagesBeforeModal(item); // Fetch images for document IDs
    setVisibleXL(true); // Open the modal after images are fetched
  };







  // Function to handle image click and open in a new tab
  const handleImageClick = (base64Image) => {
    const newTab = window.open();
    newTab.document.body.innerHTML = `<img src="data:image/jpeg;base64,${base64Image}" alt="Fetched Image" />`;
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
          // id: '41007656',
          id: decodedToken.userId,
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



        const token = sessionStorage.getItem('authToken');
        const decodedToken = jwtDecode(token);
        console.log('Decoded Token:', decodedToken);
        const response = await axios.post(ACTIVITYTYPE_URL, {
          // id: '41007656',
          id: decodedToken.userId,
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















  const [order, setOrder] = useState('asc')
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState('')
  const [orderBy, setOrderBy] = useState('division') // Changed from `orderBy2` to `orderBy`

  // for testing-start
  // const totalPages = Math.ceil(tableExample2.length / rowsPerPage)
  const totalPages = Math.ceil(data.length / rowsPerPage)

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }



  // const filteredData = data.filter((item) => {

  //   const lowercasedSearchTerm = searchTerm.toLowerCase()
  //   return (
  //     item.name.toLowerCase().includes(lowercasedSearchTerm) ||
  //     item.ca.toLowerCase().includes(lowercasedSearchTerm) ||
  //     item.division.toLowerCase().includes(lowercasedSearchTerm) ||
  //     item.orderType.toLowerCase().includes(lowercasedSearchTerm)
  //   )
  // })

  const filteredData = data.filter((item) => {

    const lowercasedSearchTerm = searchTerm.toLowerCase()
    return (
      item.division.toLowerCase().includes(lowercasedSearchTerm) ||
      item.ordeR_TYPE.toLowerCase().includes(lowercasedSearchTerm) ||
      item.pM_ACTIVITY.toLowerCase().includes(lowercasedSearchTerm) ||
      item.taB_LOGIN_ID.toLowerCase().includes(lowercasedSearchTerm)
    )
  })

  const sortedAndFilteredData = filteredData.slice().sort((a, b) => {
    if (orderBy === 'division') {
      return order === 'asc' ? a.division.localeCompare(b.division) : b.division.localeCompare(a.division)
    } else if (orderBy === 'ordeR_TYPE') {
      return order === 'asc' ? a.ordeR_TYPE.localeCompare(b.ordeR_TYPE) : b.ordeR_TYPE.localeCompare(a.ordeR_TYPE)
    } else if (orderBy === 'pM_ACTIVITY') {
      return order === 'asc'
        ? a.pM_ACTIVITY.localeCompare(b.pM_ACTIVITY)
        : b.pM_ACTIVITY.localeCompare(a.pM_ACTIVITY)
    } else if (orderBy === 'taB_LOGIN_ID') {
      return order === 'asc'
        ? a.taB_LOGIN_ID.localeCompare(b.taB_LOGIN_ID)
        : b.taB_LOGIN_ID.localeCompare(a.taB_LOGIN_ID)
    }
    return 0
  })





  const paginatedData = sortedAndFilteredData.slice((page - 1) * rowsPerPage, page * rowsPerPage)

  //for testing-end
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage)
    }
  }

  // Calculate the page numbers to be displayed
  const getPageNumbers = () => {
    const pageNumbers = []
    const start = Math.max(1, page - 1)
    const end = Math.min(totalPages, page + 1)

    for (let i = start; i <= end; i++) {
      pageNumbers.push(i)
    }

    return pageNumbers
  }
  const isNextButtonDisabled = paginatedData.length < rowsPerPage && page === totalPages;
  const [visibleXL, setVisibleXL] = useState(false);

  // const [selectedImage, setSelectedImage] = useState(null);

  // const handleImageClick = (url) => {
  //   setSelectedImage(url);
  // };

  // const handleCloseImage = () => {
  //   setSelectedImage(null);
  // };

  // const handleImageClick = (url) => {
  //   window.open(url, '_blank'); // Open image in a new tab
  // };


  const options = [
    { value: '', label: 'Select' },
    { value: 'Not Applicable', label: 'Not Applicable' },
    { value: 'Not-Available', label: 'Not-Available' },
    { value: 'Blur-Photographs', label: 'Blur-Photographs' },
    { value: 'Wrong Photo', label: 'Wrong Photo' },
    { value: 'OK', label: 'OK' }
  ];




  const handleViewClick = async () => {

    if (selectedValues.caseType === '' || selectedValues.caseType == null) {

      toast.error('Type is Mandatory', {
        position: "top-center",
        autoClose: 1000,
        progress: undefined,
      })
      return;
    }

    // if (selectedValues.datefrom === '' || selectedValues.datefrom == null) {

    //   toast.error('Date From is Mandatory', {
    //     position: "top-center",
    //     autoClose: 1000,
    //     progress: undefined,
    //   })
    //   return;
    // }

    // if (selectedValues.dateTo === '' || selectedValues.dateTo == null) {

    //   toast.error('Date To is Mandatory', {
    //     position: "top-center",
    //     autoClose: 1000,
    //     progress: undefined,
    //   })
    //   return;
    // }
    if (selectedValues.division === '' || selectedValues.division == null) {

      toast.error('Division is Mandatory', {
        position: "top-center",
        autoClose: 1000,
        progress: undefined,
      })
      return;
    }




    if (selectedValues.caseType === 'LOOSE' && selectedValues.order == 'ZDIN') {

      toast.error('ZDIN not allowed in loose case', {
        position: "top-center",
        autoClose: 1000,
        progress: undefined,
      })
      return;
    }

    const dateFrom = new Date(selectedValues.datefrom);
    const dateTo = new Date(selectedValues.dateTo);

    if (dateFrom > dateTo) {
      toast.error('Date From should be less than Date To', {
        position: "top-center",
        autoClose: 1000,
        progress: undefined,
      });
      return;
    }





    const tokenI = sessionStorage.getItem('authToken');
    let allData = []; // Initialize an array to hold all fetched data
    let pageNumber = 1;
    const pageSize = 100;

    const decodedToken = jwtDecode(tokenI);
    console.log('Decoded Token:', decodedToken);



    try {
      setLoader(true); // Show loader initially


      // Fetch the first page of data
      const processingToastId = toast.loading('Processing... Please wait', {
        position: "top-center",
      });
      // setCaseType(selectedValues.caseType)
      const response = await axios.post(
        GET_UNVERF_PHOTO_DETAILS,
        {
          userId: decodedToken.userId,
          pageNumber: pageNumber,
          pageSize: pageSize,
          case: selectedValues.caseType,
          division: selectedValues.division,
          dateFrom: selectedValues.datefrom,
          dateTo: selectedValues.dateTo,
          orderType: selectedValues.order,
          activityType: selectedValues.activity,
          linemanId: selectedValues.linemanId,
          orderId: selectedValues.orderno,
          caNo: selectedValues.caNo,
          meterNo: selectedValues.metrno




        },
        {
          headers: {
            Authorization: `Bearer ${tokenI}`, // Include token in Authorization header
          },
        }
      );

      if (response.data && response.status == 200) {
        setCaseType(selectedValues.caseType)
        const fetchedData = response.data.data;
        console.log("page 1:::", fetchedData)
        if (fetchedData.length == 0) {
          toast.error('No Data Found', {
            position: "top-center",
            autoClose: 1000,
            progress: undefined,
          })
          setLoader(false);
          return
        }

        allData = [...allData, ...fetchedData]; // Append the new data to the existing data
        setData(allData); // Update the state with the accumulated data

        setLoader(false); // Hide loader after the first batch of data is loaded

        // If the fetched data size is less than the page size, no need to fetch more
        if (fetchedData.length < pageSize) {
          // alert('Complete data fetched');
          toast.update(processingToastId, {
            render: 'Data fetched successfully',
            type: "success",
            isLoading: false,
            autoClose: 1000,
          });
          return;
        }

        // Fetch the rest of the data in the background
        while (true) {
          pageNumber++;
          const bgResponse = await axios.post(
            GET_UNVERF_PHOTO_DETAILS,
            {
              userId: decodedToken.userId,
              pageNumber: pageNumber,
              pageSize: pageSize,
              case: selectedValues.caseType,
              division: selectedValues.division,
              dateFrom: selectedValues.datefrom,
              dateTo: selectedValues.dateTo,
              orderType: selectedValues.order,
              activityType: selectedValues.activity,
              linemanId: selectedValues.linemanId,
              orderId: selectedValues.orderno,
              caNo: selectedValues.caNo,
              meterNo: selectedValues.metrno

            },
            {
              headers: {
                Authorization: `Bearer ${tokenI}`, // Include token in Authorization header
              },
            }
          );

          if (bgResponse.data) {
            const bgFetchedData = bgResponse.data.data;
            console.log("page 1:::" + pageNumber + "::::" + bgResponse.data.data)
            if (bgFetchedData.length === 0) break; // Stop if there's no data returned

            allData = [...allData, ...bgFetchedData]; // Append the new data to the existing data
            setData(allData); // Update the state with the accumulated data

            // Stop fetching if the number of records fetched is less than the page size
            if (bgFetchedData.length < pageSize) {
              toast.update(processingToastId, {
                render: 'Data fetched successfully',
                type: "success",
                isLoading: false,
                autoClose: 1000,
              });
              break;
            }
          } else {
            break; // Stop if there's no data returned
          }
        }

        // Once all data is fetched
        // alert('Complete data fetched');
      }
      else if (response.data.message && response.status == 400) {
        // toast.error(response.data.message, {
        //   position: "top-center",
        //   autoClose: 1000,
        //   progress: undefined,
        // })
        toast.update(processingToastId, {
          render: 'No Data Found',
          type: "error",
          isLoading: false,
          autoClose: 1000,
        });
        setLoader(false);
        return
      }
      else {
        setLoader(false); // Hide loader if no data is returned
      }
    } catch (error) {
      // Handle errors
      setLoader(false);
    } finally {
      // Finalize loading
      setLoader(false);

    }
  };


  const [verificationParameter, setVerificationParameter] = useState({
    //start
    verificationDate: null,
    verifyFlag: 'Y',
    newMtrSta: '',
    newMtrVis: '',
    newMtrCblVis: '',
    newMtrCaMark: '',
    newMtrCblDtlsMark: '',
    poleBbSta: '',
    poleBbSpVis: '',
    poleBbCblConVis: '',
    poleBbCblFixVis: '',
    oldMtrRdSta: '',
    oldMtrRdVis: '',
    oldMtrNumVis: '',
    gunnySta: '',
    gunnyNoVis: '',
    gunnyBagVis: '',
    gunnyTestNtcVis: '',
    mtrActBefSta: '',
    mtrActBefBkVis: '',
    mtrActBefCblVis: '',
    mtrActAftSta: '',
    mtrActAftMtrNoVis: '',
    mtrActAftCaMark: '',
    mtrActAftCblDtlsMark: '',
    mtrActAftCblVis: '',
    mcrPhotoSta: '',
    mcrDtlsVis: '',
    mcrConSignVis: '',
    labNtcSta: '',
    labNtcDtlsVis: '',
    labNtcSignVis: '',
    cancelNtcSta: '',
    cancelNtcDtlsVis: '',
    cancelNtcSignVis: '',
    //end
  });


  const handleSelectParameterChange = (event) => {
    const { name, value } = event.target;

    setVerificationParameter((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleVerification = async () => {

    //Photo-1
    if ((selectedVerify.ordeR_TYPE == "ZDIN" || selectedVerify.ordeR_TYPE == "ZDRP") && (verificationParameter.newMtrSta === '' || verificationParameter.newMtrSta == null)) {
      toast.error('New Meter Photograph With Background - Status is Mandatory', {
        position: "top-center",
        autoClose: 1000,
        progress: undefined,
      });
      return;
    }
    if (verificationParameter.newMtrSta === 'OK') {
      if (verificationParameter.newMtrVis === '' || verificationParameter.newMtrVis === null) {
        toast.error('New Meter Number Visible is Mandatory', {
          position: "top-center",
          autoClose: 1000,
          progress: undefined,
        });
        return;
      }

      if (verificationParameter.newMtrCblVis === '' || verificationParameter.newMtrCblVis === null) {
        toast.error('I/C & O/G Cables Visible is Mandatory', {
          position: "top-center",
          autoClose: 1000,
          progress: undefined,
        });
        return;
      }

      if (verificationParameter.newMtrCaMark === '' || verificationParameter.newMtrCaMark === null) {
        toast.error('CA No & Activity Date Marked on Meter Box is Mandatory', {
          position: "top-center",
          autoClose: 1000,
          progress: undefined,
        });
        return;
      }

      if (verificationParameter.newMtrCblDtlsMark === '' || verificationParameter.newMtrCblDtlsMark === null) {
        toast.error('Cable Drum Detail Marked on Cable is Mandatory', {
          position: "top-center",
          autoClose: 1000,
          progress: undefined,
        });
        return;
      }

    }

    //Photo-2
    if ((selectedVerify.ordeR_TYPE == "ZDIN" || selectedVerify.ordeR_TYPE == "ZDRP") && (verificationParameter.poleBbSta === '' || verificationParameter.poleBbSta == null)) {
      toast.error('Pole/Busbar End Cable Connection Photograph - Status is Mandatory', {
        position: "top-center",
        autoClose: 1000,
        progress: undefined,
      });
      return;
    }
    if (verificationParameter.poleBbSta === 'OK') {
      if (verificationParameter.poleBbSpVis === '' || verificationParameter.poleBbSpVis === null) {
        toast.error('Pole/Busbar Supply Point Visible is Mandatory', {
          position: "top-center",
          autoClose: 1000,
          progress: undefined,
        });
        return;
      }

      if (verificationParameter.poleBbCblConVis === '' || verificationParameter.poleBbCblConVis === null) {
        toast.error('Cable Connections Visible is Mandatory', {
          position: "top-center",
          autoClose: 1000,
          progress: undefined,
        });
        return;
      }

      if (verificationParameter.poleBbCblFixVis === '' || verificationParameter.poleBbCblFixVis === null) {
        toast.error('Cable Fixers Visible is Mandatory', {
          position: "top-center",
          autoClose: 1000,
          progress: undefined,
        });
        return;
      }


    }


    //Photo-3
    if ((selectedVerify.ordeR_TYPE == "ZDRP" || selectedVerify.ordeR_TYPE == "ZDRM" || selectedVerify.ordeR_TYPE == "ZDIV") && (verificationParameter.oldMtrRdSta === '' || verificationParameter.oldMtrRdSta == null)) {
      toast.error('Old  Meter Photograph with Reading - Status is Mandatory', {
        position: "top-center",
        autoClose: 1000,
        progress: undefined,
      });
      return;
    }
    if (verificationParameter.oldMtrRdSta === 'OK') {
      if (verificationParameter.oldMtrRdVis === '' || verificationParameter.oldMtrRdVis === null) {
        toast.error('Old Meter Number Visible is Mandatory', {
          position: "top-center",
          autoClose: 1000,
          progress: undefined,
        });
        return;
      }

      if (verificationParameter.oldMtrNumVis === '' || verificationParameter.oldMtrNumVis === null) {
        toast.error('Old Meter Reading Visible is Mandatory', {
          position: "top-center",
          autoClose: 1000,
          progress: undefined,
        });
        return;
      }

    }

    //Photo-4
    if ((selectedVerify.ordeR_TYPE == "ZDRP" || selectedVerify.ordeR_TYPE == "ZDRM" || selectedVerify.ordeR_TYPE == "ZDIV") && (verificationParameter.gunnySta === '' || verificationParameter.gunnySta == null)) {
      toast.error('Old Meter Photograph With Gunny Bag - Status is Mandatory', {
        position: "top-center",
        autoClose: 1000,
        progress: undefined,
      });
      return;
    }
    if (verificationParameter.gunnySta === 'OK') {
      if (verificationParameter.gunnyNoVis === '' || verificationParameter.gunnyNoVis === null) {
        toast.error('Gunny Bag Number Visible is Mandatory', {
          position: "top-center",
          autoClose: 1000,
          progress: undefined,
        });
        return;
      }

      if (verificationParameter.gunnyBagVis === '' || verificationParameter.gunnyBagVis === null) {
        toast.error('Gunny Bag Visible is Mandatory', {
          position: "top-center",
          autoClose: 1000,
          progress: undefined,
        });
        return;
      }
      if (verificationParameter.gunnyTestNtcVis === '' || verificationParameter.gunnyTestNtcVis === null) {
        toast.error('Test Notice in Bag Visible is Mandatory', {
          position: "top-center",
          autoClose: 1000,
          progress: undefined,
        });
        return;
      }

    }


    //Photo-5
    if ((selectedVerify.ordeR_TYPE == "ZMSO" || selectedVerify.ordeR_TYPE == "ZMSC") && (verificationParameter.mtrActBefSta === '' || verificationParameter.mtrActBefSta == null)) {
      toast.error('Meter Photograph with Background, Before Activity - Status is Mandatory', {
        position: "top-center",
        autoClose: 1000,
        progress: undefined,
      });
      return;
    }
    if (verificationParameter.mtrActBefSta === 'OK') {
      if (verificationParameter.mtrActBefBkVis === '' || verificationParameter.mtrActBefBkVis === null) {
        toast.error('Back Ground Visible is Mandatory', {
          position: "top-center",
          autoClose: 1000,
          progress: undefined,
        });
        return;
      }

      if (verificationParameter.mtrActBefCblVis === '' || verificationParameter.mtrActBefCblVis === null) {
        toast.error('I/C & O/G Cables Visible is Mandatory', {
          position: "top-center",
          autoClose: 1000,
          progress: undefined,
        });
        return;
      }


    }



    //Photo-6
    if ((selectedVerify.ordeR_TYPE == "ZMSO" || selectedVerify.ordeR_TYPE == "ZMSC" || selectedVerify.ordeR_TYPE == "ZDIV") && (verificationParameter.mtrActAftSta === '' || verificationParameter.mtrActAftSta == null)) {
      toast.error('Meter Photograph With Background, After Activity - Status is Mandatory', {
        position: "top-center",
        autoClose: 1000,
        progress: undefined,
      });
      return;
    }
    if (verificationParameter.mtrActAftSta === 'OK') {
      if (verificationParameter.mtrActAftMtrNoVis === '' || verificationParameter.mtrActAftMtrNoVis === null) {
        toast.error('Meter No Visible is Mandatory', {
          position: "top-center",
          autoClose: 1000,
          progress: undefined,
        });
        return;
      }

      if (verificationParameter.mtrActAftCblVis === '' || verificationParameter.mtrActAftCblVis === null) {
        toast.error('I/C & O/G Cables Visible is Mandatory', {
          position: "top-center",
          autoClose: 1000,
          progress: undefined,
        });
        return;
      }
      if (verificationParameter.mtrActAftCaMark === '' || verificationParameter.mtrActAftCaMark === null) {
        toast.error('CA No & Activity Date Marked on Meter Box is Mandatory', {
          position: "top-center",
          autoClose: 1000,
          progress: undefined,
        });
        return;
      }
      if (verificationParameter.mtrActAftCblDtlsMark === '' || verificationParameter.mtrActAftCblDtlsMark === null) {
        toast.error('Cable Drum Detail Marked on Cable is Mandatory', {
          position: "top-center",
          autoClose: 1000,
          progress: undefined,
        });
        return;
      }


    }


    //Photo-7
    if ((verificationParameter.mcrPhotoSta === '' || verificationParameter.mcrPhotoSta == null)) {
      toast.error('MCR Photograph - Status is Mandatory', {
        position: "top-center",
        autoClose: 1000,
        progress: undefined,
      });
      return;
    }
    if (verificationParameter.mcrPhotoSta === 'OK') {
      if (verificationParameter.mcrDtlsVis === '' || verificationParameter.mcrDtlsVis === null) {
        toast.error('MCR Details Visible', {
          position: "top-center",
          autoClose: 1000,
          progress: undefined,
        });
        return;
      }

      if (verificationParameter.mcrConSignVis === '' || verificationParameter.mcrConSignVis === null) {
        toast.error('Consumer Signature Visible is Mandatory', {
          position: "top-center",
          autoClose: 1000,
          progress: undefined,
        });
        return;
      }



    }

    //Photo-8
    if ((selectedVerify.ordeR_TYPE == "ZDRP" || selectedVerify.ordeR_TYPE == "ZDRM") && (selectedVerify.gunnybaG_OLD) && (verificationParameter.labNtcSta === '' || verificationParameter.labNtcSta == null)) {
      toast.error('Lab Testing Notice - Status is Mandatory', {
        position: "top-center",
        autoClose: 1000,
        progress: undefined,
      });
      return;
    }
    if (verificationParameter.labNtcSta === 'OK') {
      if (verificationParameter.labNtcDtlsVis === '' || verificationParameter.labNtcDtlsVis === null) {
        toast.error('Lab Notice Details Visible is Mandatory', {
          position: "top-center",
          autoClose: 1000,
          progress: undefined,
        });
        return;
      }

      if (verificationParameter.labNtcSignVis === '' || verificationParameter.labNtcSignVis === null) {
        toast.error('Consumer Signature Visible is Mandatory', {
          position: "top-center",
          autoClose: 1000,
          progress: undefined,
        });
        return;
      }



    }

    //Photo-9
    if ((verificationParameter.cancelNtcSta === '' || verificationParameter.cancelNtcSta == null) && selectedVerify.lM_LOOSEFLAG == 'Cancel') {
      toast.error('Cancellation Notice Photograph - Status is Mandatory', {
        position: "top-center",
        autoClose: 1000,
        progress: undefined,
      });
      return;
    }
    if (verificationParameter.cancelNtcSta === 'OK') {
      if (verificationParameter.cancelNtcDtlsVis === '' || verificationParameter.cancelNtcDtlsVis === null) {
        toast.error('Cancellation Notice Details Visible is Mandatory', {
          position: "top-center",
          autoClose: 1000,
          progress: undefined,
        });
        return;
      }

      if (verificationParameter.cancelNtcSignVis === '' || verificationParameter.cancelNtcSignVis === null) {
        toast.error('Consumer Signature Visible is Mandatory', {
          position: "top-center",
          autoClose: 1000,
          progress: undefined,
        });
        return;
      }



    }




    const tokenI = sessionStorage.getItem('authToken');
    const decodedToken = jwtDecode(tokenI);

    const d = {


      userId: decodedToken.userId,
      division: selectedVerify.division,
      subDivision: selectedVerify.suB_DIVISION,
      caNumber: selectedVerify.cA_NO,
      orderNo: selectedVerify.orderid,
      orderType: selectedVerify.ordeR_TYPE,
      verificationDate: moment().toISOString(),
      activityType: selectedVerify.pM_ACTIVITY,
      entryDate: moment().toISOString(),
      punchBy: decodedToken.userId,
      linemanId: selectedVerify.taB_LOGIN_ID,
      linemanName: selectedVerify.taB_LOGIN_ID,
      deviceNo: selectedVerify.deviceno,
      meterNo: selectedVerify.neW_METER_NO,
      gunnyBagNo: selectedVerify.gunnybaG_OLD,
      verifyFlag: "C",
      newMtrSta: verificationParameter.newMtrSta,
      newMtrVis: verificationParameter.newMtrVis,
      newMtrCblVis: verificationParameter.newMtrCblVis,
      newMtrCaMark: verificationParameter.newMtrCaMark,
      newMtrCblDtlsMark: verificationParameter.newMtrCblDtlsMark,
      poleBbSta: verificationParameter.poleBbSta,
      poleBbSpVis: verificationParameter.poleBbSpVis,
      poleBbCblConVis: verificationParameter.poleBbCblConVis,
      poleBbCblFixVis: verificationParameter.poleBbCblFixVis,
      oldMtrRdSta: verificationParameter.oldMtrRdSta,
      oldMtrRdVis: verificationParameter.oldMtrRdVis,
      oldMtrNumVis: verificationParameter.oldMtrNumVis,
      gunnySta: verificationParameter.gunnySta,
      gunnyNoVis: verificationParameter.gunnyNoVis,
      gunnyBagVis: verificationParameter.gunnyBagVis,
      gunnyTestNtcVis: verificationParameter.gunnyTestNtcVis,
      mtrActBefSta: verificationParameter.mtrActBefSta,
      mtrActBefBkVis: verificationParameter.mtrActBefBkVis,
      mtrActBefCblVis: verificationParameter.mtrActBefCblVis,
      mtrActAftSta: verificationParameter.mtrActAftSta,
      mtrActAftMtrNoVis: verificationParameter.mtrActAftMtrNoVis,
      mtrActAftCaMark: verificationParameter.mtrActAftCaMark,
      mtrActAftCblDtlsMark: verificationParameter.mtrActAftCblDtlsMark,
      mtrActAftCblVis: verificationParameter.mtrActAftCblVis,
      mcrPhotoSta: verificationParameter.mcrPhotoSta,
      mcrDtlsVis: verificationParameter.mcrDtlsVis,
      mcrConSignVis: verificationParameter.mcrConSignVis,
      labNtcSta: verificationParameter.labNtcSta,
      labNtcDtlsVis: verificationParameter.labNtcDtlsVis,
      labNtcSignVis: verificationParameter.labNtcSignVis,
      cancelNtcSta: verificationParameter.cancelNtcSta,
      cancelNtcDtlsVis: verificationParameter.cancelNtcDtlsVis,
      cancelNtcSignVis: verificationParameter.cancelNtcSignVis,
      looseFlag: selectedValues.caseType
    }




    console.log("3456rt7y8:>>>>>>>>>>>>>>>>>>>>>>::", d)

    const processingToastId = toast.loading('Processing... Please wait', {
      position: "top-center",
    });
    try {





      const response = await axios.post(
        PHOTO_VERIFICATION_SUBMISSION
        ,
        {

          userId: decodedToken.userId,
          division: selectedVerify.division,
          subDivision: selectedVerify.suB_DIVISION,
          caNumber: selectedVerify.cA_NO,
          orderNo: selectedVerify.orderid,
          orderType: selectedVerify.ordeR_TYPE,
          verificationDate: moment().toISOString(),
          activityType: selectedVerify.pM_ACTIVITY,
          entryDate: moment().toISOString(),
          punchBy: decodedToken.userId,
          linemanId: selectedVerify.taB_LOGIN_ID,
          linemanName: selectedVerify.taB_LOGIN_ID,
          deviceNo: selectedVerify.deviceno,
          meterNo: selectedVerify.neW_METER_NO,
          gunnyBagNo: selectedVerify.gunnybaG_OLD,
          verifyFlag: "C",
          newMtrSta: verificationParameter.newMtrSta,
          newMtrVis: verificationParameter.newMtrVis,
          newMtrCblVis: verificationParameter.newMtrCblVis,
          newMtrCaMark: verificationParameter.newMtrCaMark,
          newMtrCblDtlsMark: verificationParameter.newMtrCblDtlsMark,
          poleBbSta: verificationParameter.poleBbSta,
          poleBbSpVis: verificationParameter.poleBbSpVis,
          poleBbCblConVis: verificationParameter.poleBbCblConVis,
          poleBbCblFixVis: verificationParameter.poleBbCblFixVis,
          oldMtrRdSta: verificationParameter.oldMtrRdSta,
          oldMtrRdVis: verificationParameter.oldMtrRdVis,
          oldMtrNumVis: verificationParameter.oldMtrNumVis,
          gunnySta: verificationParameter.gunnySta,
          gunnyNoVis: verificationParameter.gunnyNoVis,
          gunnyBagVis: verificationParameter.gunnyBagVis,
          gunnyTestNtcVis: verificationParameter.gunnyTestNtcVis,
          mtrActBefSta: verificationParameter.mtrActBefSta,
          mtrActBefBkVis: verificationParameter.mtrActBefBkVis,
          mtrActBefCblVis: verificationParameter.mtrActBefCblVis,
          mtrActAftSta: verificationParameter.mtrActAftSta,
          mtrActAftMtrNoVis: verificationParameter.mtrActAftMtrNoVis,
          mtrActAftCaMark: verificationParameter.mtrActAftCaMark,
          mtrActAftCblDtlsMark: verificationParameter.mtrActAftCblDtlsMark,
          mtrActAftCblVis: verificationParameter.mtrActAftCblVis,
          mcrPhotoSta: verificationParameter.mcrPhotoSta,
          mcrDtlsVis: verificationParameter.mcrDtlsVis,
          mcrConSignVis: verificationParameter.mcrConSignVis,
          labNtcSta: verificationParameter.labNtcSta,
          labNtcDtlsVis: verificationParameter.labNtcDtlsVis,
          labNtcSignVis: verificationParameter.labNtcSignVis,
          cancelNtcSta: verificationParameter.cancelNtcSta,
          cancelNtcDtlsVis: verificationParameter.cancelNtcDtlsVis,
          cancelNtcSignVis: verificationParameter.cancelNtcSignVis,
          looseFlag: selectedValues.caseType

        },
        {
          headers: {
            Authorization: `Bearer ${tokenI}`,
          },
        }
      );

      if (response.status === 200) {

        toast.update(processingToastId, {
          render: 'Photo Verification Completed',
          type: "success",
          isLoading: false,
          autoClose: 1000,
        });
        // setImageFields({})
        // setUploadStatus({});
        setSelectedVerify({
          verificationDate: null,
          verifyFlag: '',
          newMtrSta: '',
          newMtrVis: '',
          newMtrCblVis: '',
          newMtrCaMark: '',
          newMtrCblDtlsMark: '',
          poleBbSta: '',
          poleBbSpVis: '',
          poleBbCblConVis: '',
          poleBbCblFixVis: '',
          oldMtrRdSta: '',
          oldMtrRdVis: '',
          oldMtrNumVis: '',
          gunnySta: '',
          gunnyNoVis: '',
          gunnyBagVis: '',
          gunnyTestNtcVis: '',
          mtrActBefSta: '',
          mtrActBefBkVis: '',
          mtrActBefCblVis: '',
          mtrActAftSta: '',
          mtrActAftMtrNoVis: '',
          mtrActAftCaMark: '',
          mtrActAftCblDtlsMark: '',
          mtrActAftCblVis: '',
          mcrPhotoSta: '',
          mcrDtlsVis: '',
          mcrConSignVis: '',
          labNtcSta: '',
          labNtcDtlsVis: '',
          labNtcSignVis: '',
          cancelNtcSta: '',
          cancelNtcDtlsVis: '',
          cancelNtcSignVis: '',

        })
        // setSelectedImage({})
        setSelectedValues({
          division: '',
          order: '',
          activity: '',
          installername: '',
          caNo: '',
          orderno: '',
          datefrom: null,
          // dateTo: null,
          caseType: '',
          meterno: '',
          newMtrImg: '',
          poleBBCblImg: '',
          oldMtrReadImg: '',
          OldMtrGunnyImg: '',
          mtrBefActImg: '',
          mtrAfterActImg: '',
          mcrImg: '',
          labNtcImg: '',
          cancelNtcImg: '',
          linemanId: ''
        }
        )
        setSelectedImages({})
        setSelectedVerify({})

        setVisibleXL(false)
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

  console.log("hgfghjk::::::", verificationParameter)


  const handleClose = () => {
    setVisibleXL(false)

    setSelectedVerify({
      verificationDate: null,
      verifyFlag: '',
      newMtrSta: '',
      newMtrVis: '',
      newMtrCblVis: '',
      newMtrCaMark: '',
      newMtrCblDtlsMark: '',
      poleBbSta: '',
      poleBbSpVis: '',
      poleBbCblConVis: '',
      poleBbCblFixVis: '',
      oldMtrRdSta: '',
      oldMtrRdVis: '',
      oldMtrNumVis: '',
      gunnySta: '',
      gunnyNoVis: '',
      gunnyBagVis: '',
      gunnyTestNtcVis: '',
      mtrActBefSta: '',
      mtrActBefBkVis: '',
      mtrActBefCblVis: '',
      mtrActAftSta: '',
      mtrActAftMtrNoVis: '',
      mtrActAftCaMark: '',
      mtrActAftCblDtlsMark: '',
      mtrActAftCblVis: '',
      mcrPhotoSta: '',
      mcrDtlsVis: '',
      mcrConSignVis: '',
      labNtcSta: '',
      labNtcDtlsVis: '',
      labNtcSignVis: '',
      cancelNtcSta: '',
      cancelNtcDtlsVis: '',
      cancelNtcSignVis: '',

    })
    // setSelectedImage({})
    setSelectedValues({
      division: '',
      order: '',
      activity: '',
      installername: '',
      caNo: '',
      orderno: '',
      datefrom: null,
      // dateTo: null,
      caseType: '',
      meterno: '',
      newMtrImg: '',
      poleBBCblImg: '',
      oldMtrReadImg: '',
      OldMtrGunnyImg: '',
      mtrBefActImg: '',
      mtrAfterActImg: '',
      mcrImg: '',
      labNtcImg: '',
      cancelNtcImg: '',
      linemanId: ''
    }
    )


    setVerificationParameter({
      verificationDate: null,
      verifyFlag: '',
      newMtrSta: '',
      newMtrVis: '',
      newMtrCblVis: '',
      newMtrCaMark: '',
      newMtrCblDtlsMark: '',
      poleBbSta: '',
      poleBbSpVis: '',
      poleBbCblConVis: '',
      poleBbCblFixVis: '',
      oldMtrRdSta: '',
      oldMtrRdVis: '',
      oldMtrNumVis: '',
      gunnySta: '',
      gunnyNoVis: '',
      gunnyBagVis: '',
      gunnyTestNtcVis: '',
      mtrActBefSta: '',
      mtrActBefBkVis: '',
      mtrActBefCblVis: '',
      mtrActAftSta: '',
      mtrActAftMtrNoVis: '',
      mtrActAftCaMark: '',
      mtrActAftCblDtlsMark: '',
      mtrActAftCblVis: '',
      mcrPhotoSta: '',
      mcrDtlsVis: '',
      mcrConSignVis: '',
      labNtcSta: '',
      labNtcDtlsVis: '',
      labNtcSignVis: '',
      cancelNtcSta: '',
      cancelNtcDtlsVis: '',
      cancelNtcSignVis: '',
    })

    setSelectedImages({})
    setSelectedVerify({})
  }


  return (
    <CRow>
      <ToastContainer

      />

      <CModal
        backdrop="static"
        scrollable
        size="xl"
        visible={visibleXL}
        onClose={() =>
          handleClose()
          // setVisibleXL(false)
        }
        aria-labelledby="extraLargeModalTitle"
      >
        <CModalHeader closeButton>
          <CModalTitle id="extraLargeModalTitle">Photo Verification Form</CModalTitle>
        </CModalHeader>
        <CModalBody>


          <CAlert color="success">
            <CAlertHeading as="h4">Verification Details</CAlertHeading>
            <hr />

            <CRow>
              <CCol>
                <strong>Case Type:</strong> {selectedValues.caseType || "NA"}
              </CCol>
              <CCol>
                <strong>CA No:</strong> {selectedVerify.cA_NO || "NA"}
              </CCol>
              <CCol>
                <strong>Activity Date:</strong> {selectedVerify.activitY_DATE ? moment(selectedVerify.activitY_DATE).format('DD-MM-YYYY') : "NA"}
              </CCol>
              <CCol>
                <strong>Tab Login ID:</strong> {selectedVerify.taB_LOGIN_ID || "NA"}
              </CCol>
            </CRow>

            <CRow>
              <CCol>
                <strong>Division:</strong> {selectedVerify.division || "NA"}
              </CCol>
              <CCol>
                <strong>Device No:</strong> {selectedVerify.deviceno || "NA"}
              </CCol>
              <CCol>
                <strong>Order ID:</strong> {selectedVerify.orderid || "NA"}
              </CCol>
              <CCol>
                <strong>Order Type:</strong> {selectedVerify.ordeR_TYPE || "NA"}
              </CCol>
            </CRow>

            <CRow>
              <CCol>
                <strong>PM Activity:</strong> {selectedVerify.pM_ACTIVITY || "NA"}
              </CCol>

              <CCol>
                <strong>Old Meter No:</strong> {selectedVerify.olD_METER_NO || "NA"}
              </CCol>
              <CCol>
                <strong>New Meter No:</strong> {selectedVerify.neW_METER_NO || "NA"}
              </CCol>
              <CCol>
                <strong>Gunnybag Old:</strong> {selectedVerify.gunnybaG_OLD || "NA"}
              </CCol>
            </CRow>



          </CAlert>

          {/* Row 1 */}
          {(selectedVerify.ordeR_TYPE == "ZDIN" || selectedVerify.ordeR_TYPE == "ZDRP") &&
            <CCard className="mb-3" style={{ backgroundColor: '#f8f9fa' }}>
              {selectedImages.filE_NEW_METER ? (
                <CCardBody>
                  <CRow className="mb-3">
                    <CCol sm={2} className="d-flex align-items-center text-start font-weight-bold" style={{ overflowWrap: 'break-word' }}>
                      <strong>New Meter Photograph With Background</strong>
                    </CCol>
                    <CCol sm={8}>



                      <CFormSelect
                        name="newMtrSta"  // The name must match the key in the verificationParameter object
                        value={verificationParameter.newMtrSta}
                        onChange={handleSelectParameterChange}
                      >
                        {options.map((option, index) => (
                          <option key={index} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </CFormSelect>



                      <div className="mt-2">
                        <div className="d-flex">
                          <CCol sm={6} style={{ backgroundColor: '#e9ecef', borderRadius: '0.25rem', padding: '0.5rem', marginRight: '0.5rem' }}>
                            <div>
                              <div className="fw-bold">New Meter Number Visible</div>
                              <div className="d-flex ">
                                <CFormCheck
                                  type="radio"
                                  name="newMtrVis"
                                  id="newMtrVisYes"
                                  value="Yes"
                                  label="Yes"
                                  className="me-2"
                                  checked={verificationParameter.newMtrVis === 'Yes'}
                                  onChange={handleSelectParameterChange}
                                />
                                <CFormCheck
                                  type="radio"
                                  name="newMtrVis"
                                  id="newMtrVisANo"
                                  value="No"
                                  label="No"
                                  checked={verificationParameter.newMtrVis === 'No'}
                                  onChange={handleSelectParameterChange}
                                />
                              </div>
                            </div>
                          </CCol>
                          <CCol sm={6} style={{ backgroundColor: '#e9ecef', borderRadius: '0.25rem', padding: '0.5rem', marginRight: '0.5rem' }}>
                            <div  >
                              <div className="fw-bold">I/C & O/G Cables Visible</div>
                              <div className="d-flex ">
                                <CFormCheck
                                  type="radio"
                                  name="newMtrCblVis"
                                  id="newMtrCblVisYes"
                                  value="Yes"
                                  label="Yes"
                                  className="me-2" // Margin end for spacing
                                  checked={verificationParameter.newMtrCblVis === 'Yes'}
                                  onChange={handleSelectParameterChange}
                                />
                                <CFormCheck
                                  type="radio"
                                  name="newMtrCblVis"
                                  id="newMtrCblVisNo"
                                  value="No"
                                  label="No"
                                  checked={verificationParameter.newMtrCblVis === 'No'}
                                  onChange={handleSelectParameterChange}
                                />
                              </div>
                            </div>
                          </CCol>
                        </div>
                      </div>
                      <div className="mt-2">
                        <div className="d-flex">
                          <CCol sm={6} style={{ backgroundColor: '#e9ecef', borderRadius: '0.25rem', padding: '0.5rem', marginRight: '0.5rem' }}>
                            <div>
                              <div className="fw-bold">CA No & Activity Date Marked on Meter Box</div>
                              <div className="d-flex ">
                                <CFormCheck
                                  type="radio"
                                  name="newMtrCaMark"
                                  id="newMtrCaMarkYes"
                                  value="Yes"
                                  label="Yes"
                                  className="me-2" // Margin end for spacing
                                  checked={verificationParameter.newMtrCaMark === 'Yes'}
                                  onChange={handleSelectParameterChange}
                                />
                                <CFormCheck
                                  type="radio"
                                  name="newMtrCaMark"
                                  id="newMtrCaMarkNo"
                                  value="No"
                                  label="No"
                                  checked={verificationParameter.newMtrCaMark === 'No'}
                                  onChange={handleSelectParameterChange}
                                />
                              </div>
                            </div>
                          </CCol>
                          <CCol sm={6} style={{ backgroundColor: '#e9ecef', borderRadius: '0.25rem', padding: '0.5rem', marginRight: '0.5rem' }}>
                            <div  >
                              <div className="fw-bold">Cable Drum Detail Marked on Cable</div>
                              <div className="d-flex ">
                                <CFormCheck
                                  type="radio"
                                  name="newMtrCblDtlsMark"
                                  id="newMtrCblDtlsMarkYes"
                                  value="Yes"
                                  label="Yes"
                                  className="me-2" // Margin end for spacing
                                  checked={verificationParameter.newMtrCblDtlsMark === 'Yes'}
                                  onChange={handleSelectParameterChange}
                                />
                                <CFormCheck
                                  type="radio"
                                  name="newMtrCblDtlsMark"
                                  id="newMtrCblDtlsMarkNo"
                                  value="No"
                                  label="No"
                                  checked={verificationParameter.newMtrCblDtlsMark === 'No'}
                                  onChange={handleSelectParameterChange}
                                />
                              </div>
                            </div>
                          </CCol>
                        </div>
                      </div>
                    </CCol>
                    <CCol sm={2} className="d-flex align-items-center justify-content-center font-weight-bold">

                      {/* <CImage
                      src={`data:image/jpeg;base64,${selectedImages.filE_NEW_METER}`}
                      alt="New Meter Photograph With Background"
                      className="img-thumbnail"
                      onClick={() => handleImageClick(selectedImages.filE_NEW_METER)}
                      style={{ cursor: 'pointer', width: '100px', height: 'auto' }}
                    /> */}


                      <div
                        style={containerStyle}
                        onMouseEnter={(e) => {
                          const overlay = e.currentTarget.querySelector('.icon-overlay');
                          if (overlay) overlay.style.display = 'flex';
                        }}
                        onMouseLeave={(e) => {
                          const overlay = e.currentTarget.querySelector('.icon-overlay');
                          if (overlay) overlay.style.display = 'none';
                        }}
                      >
                        <CImage
                          src={`data:image/jpeg;base64,${selectedImages.filE_NEW_METER}`}
                          alt="New Meter Photograph With Background"
                          className="img-thumbnail"
                          onClick={() => handleImageClick(selectedImages.filE_NEW_METER)}
                          style={imageStyle}
                        />
                        <div className="icon-overlay" style={iconOverlayStyle}>
                          <CIcon icon={cilTouchApp} />
                        </div>
                      </div>
                    </CCol>
                  </CRow>
                </CCardBody>
              ) :
                (
                  <span>Loading...</span>
                )}
            </CCard>}



          {/* row2 */}
          {(selectedVerify.ordeR_TYPE == "ZDIN" || selectedVerify.ordeR_TYPE == "ZDRP") &&
            <CCard className="mb-3" style={{ backgroundColor: '#f8f9fa' }}>
              {selectedImages.filE_POLE_BUSBAR ? (
                <CCardBody>
                  <CRow className="mb-3">
                    <CCol sm={2} className="d-flex align-items-center text-start font-weight-bold" style={{ overflowWrap: 'break-word' }}>
                      <strong>Pole/Busbar End Cable Connection Photograph</strong>
                    </CCol>
                    <CCol sm={8}>



                      <CFormSelect
                        name="poleBbSta"  // The name must match the key in the verificationParameter object
                        value={verificationParameter.poleBbSta}
                        onChange={handleSelectParameterChange}>
                        {options.map((option, index) => (
                          <option key={index} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </CFormSelect>



                      <div className="mt-2">
                        <div className="d-flex">
                          <CCol sm={6} style={{ backgroundColor: '#e9ecef', borderRadius: '0.25rem', padding: '0.5rem', marginRight: '0.5rem' }}>
                            <div>
                              <div className="fw-bold">Supply Point Visible</div>
                              <div className="d-flex ">
                                <CFormCheck
                                  type="radio"
                                  name="poleBbSpVis"
                                  id="poleBbSpVisYes"
                                  value="Yes"
                                  label="Yes"
                                  className="me-2"
                                  checked={verificationParameter.poleBbSpVis === 'Yes'}
                                  onChange={handleSelectParameterChange}
                                />
                                <CFormCheck
                                  type="radio"
                                  name="poleBbSpVis"
                                  id="poleBbSpVisNo"
                                  value="No"
                                  label="No"
                                  checked={verificationParameter.poleBbSpVis === 'No'}
                                  onChange={handleSelectParameterChange}
                                />
                              </div>
                            </div>
                          </CCol>
                          <CCol sm={6} style={{ backgroundColor: '#e9ecef', borderRadius: '0.25rem', padding: '0.5rem', marginRight: '0.5rem' }}>
                            <div  >
                              <div className="fw-bold">Cable Connections Visible</div>
                              <div className="d-flex ">
                                <CFormCheck
                                  type="radio"
                                  name="poleBbCblConVis"
                                  id="poleBbCblConVisYes"
                                  value="Yes"
                                  label="Yes"
                                  className="me-2" // Margin end for spacing
                                  checked={verificationParameter.poleBbCblConVis === 'Yes'}
                                  onChange={handleSelectParameterChange}
                                />
                                <CFormCheck
                                  type="radio"
                                  name="poleBbCblConVis"
                                  id="poleBbCblConVisNo"
                                  value="No"
                                  label="No"
                                  checked={verificationParameter.poleBbCblConVis === 'No'}
                                  onChange={handleSelectParameterChange}
                                />
                              </div>
                            </div>
                          </CCol>
                        </div>
                      </div>
                      <div className="mt-2">
                        <div className="d-flex">
                          <CCol sm={6} style={{ backgroundColor: '#e9ecef', borderRadius: '0.25rem', padding: '0.5rem', marginRight: '0.5rem' }}>
                            <div>
                              <div className="fw-bold">Cable Fixers Visible</div>
                              <div className="d-flex ">
                                <CFormCheck
                                  type="radio"
                                  name="poleBbCblFixVis"
                                  id="poleBbCblFixVisYes"
                                  value="Yes"
                                  label="Yes"
                                  className="me-2" // Margin end for spacing
                                  checked={verificationParameter.poleBbCblFixVis === 'Yes'}
                                  onChange={handleSelectParameterChange}
                                />
                                <CFormCheck
                                  type="radio"
                                  name="poleBbCblFixVis"
                                  id="poleBbCblFixVisNo"
                                  value="No"
                                  label="No"
                                  checked={verificationParameter.poleBbCblFixVis === 'No'}
                                  onChange={handleSelectParameterChange}
                                />
                              </div>
                            </div>
                          </CCol>

                        </div>
                      </div>
                    </CCol>
                    <CCol sm={2} className="d-flex align-items-center justify-content-center font-weight-bold">
                      {/* <CImage
                    src="https://via.placeholder.com/150"
                    alt="Photo 1"
                    className="img-thumbnail"
                    onClick={() => handleImageClick("https://via.placeholder.com/150")}
                    style={{ cursor: 'pointer', width: '100px', height: 'auto' }}
                  /> */}
                      <div
                        style={containerStyle}
                        onMouseEnter={(e) => {
                          const overlay = e.currentTarget.querySelector('.icon-overlay');
                          if (overlay) overlay.style.display = 'flex';
                        }}
                        onMouseLeave={(e) => {
                          const overlay = e.currentTarget.querySelector('.icon-overlay');
                          if (overlay) overlay.style.display = 'none';
                        }}
                      >
                        <CImage
                          src={`data:image/jpeg;base64,${selectedImages.filE_POLE_BUSBAR}`}
                          alt="Pole/Busbar End Cable Connection Photograph"
                          className="img-thumbnail"
                          onClick={() => handleImageClick(selectedImages.filE_POLE_BUSBAR)}
                          style={{ cursor: 'pointer', width: '100px', height: 'auto' }}
                        />
                        <div className="icon-overlay" style={iconOverlayStyle}>
                          <CIcon icon={cilTouchApp} />
                        </div>
                      </div>
                    </CCol>
                  </CRow>
                </CCardBody>) :
                (
                  <span>Loading...</span>
                )}
            </CCard>}

          {/* row3 */}
          {(selectedVerify.ordeR_TYPE == "ZDIV" || selectedVerify.ordeR_TYPE == "ZDRP" || selectedVerify.ordeR_TYPE == "ZDRM") &&
            <CCard className="mb-3" style={{ backgroundColor: '#f8f9fa' }}>
              {selectedImages.filE_OLD_METER_READING ? (
                <CCardBody>
                  <CRow className="mb-3">
                    <CCol sm={2} className="d-flex align-items-center text-start font-weight-bold" style={{ overflowWrap: 'break-word' }}>
                      <strong>Old  Meter Photograph with Reading</strong>
                    </CCol>
                    <CCol sm={8}>



                      <CFormSelect
                        name="oldMtrRdSta"  // The name must match the key in the verificationParameter object
                        value={verificationParameter.oldMtrRdSta}
                        onChange={handleSelectParameterChange}
                      >
                        {options.map((option, index) => (
                          <option key={index} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </CFormSelect>



                      <div className="mt-2">
                        <div className="d-flex">
                          <CCol sm={6} style={{ backgroundColor: '#e9ecef', borderRadius: '0.25rem', padding: '0.5rem', marginRight: '0.5rem' }}>
                            <div>
                              <div className="fw-bold">Old Meter Number Visible</div>
                              <div className="d-flex ">
                                <CFormCheck
                                  type="radio"
                                  name="oldMtrNumVis"
                                  id="oldMtrNumVisYes"
                                  value="Yes"
                                  label="Yes"
                                  className="me-2"
                                  checked={verificationParameter.oldMtrNumVis === 'Yes'}
                                  onChange={handleSelectParameterChange}
                                />
                                <CFormCheck
                                  type="radio"
                                  name="oldMtrNumVis"
                                  id="oldMtrNumVisNo"
                                  value="No"
                                  label="No"
                                  checked={verificationParameter.oldMtrNumVis === 'No'}
                                  onChange={handleSelectParameterChange}
                                />
                              </div>
                            </div>
                          </CCol>
                          <CCol sm={6} style={{ backgroundColor: '#e9ecef', borderRadius: '0.25rem', padding: '0.5rem', marginRight: '0.5rem' }}>
                            <div  >
                              <div className="fw-bold">Old Meter Reading Visible</div>
                              <div className="d-flex ">
                                <CFormCheck
                                  type="radio"
                                  name="oldMtrRdVis"
                                  id="oldMtrRdVisYes"
                                  value="Yes"
                                  label="Yes"
                                  className="me-2" // Margin end for spacing
                                  checked={verificationParameter.oldMtrRdVis === 'Yes'}
                                  onChange={handleSelectParameterChange}
                                />
                                <CFormCheck
                                  type="radio"
                                  name="oldMtrRdVis"
                                  id="oldMtrRdVisNo"
                                  value="No"
                                  label="No"
                                  checked={verificationParameter.oldMtrRdVis === 'No'}
                                  onChange={handleSelectParameterChange}
                                />
                              </div>
                            </div>
                          </CCol>
                        </div>
                      </div>



                    </CCol>
                    <CCol sm={2} className="d-flex align-items-center justify-content-center font-weight-bold">
                      {/* <CImage
                      src="https://via.placeholder.com/150"
                      alt="Photo 1"
                      className="img-thumbnail"
                      onClick={() => handleImageClick("https://via.placeholder.com/150")}
                      style={{ cursor: 'pointer', width: '100px', height: 'auto' }}
                    /> */}
                      <div
                        style={containerStyle}
                        onMouseEnter={(e) => {
                          const overlay = e.currentTarget.querySelector('.icon-overlay');
                          if (overlay) overlay.style.display = 'flex';
                        }}
                        onMouseLeave={(e) => {
                          const overlay = e.currentTarget.querySelector('.icon-overlay');
                          if (overlay) overlay.style.display = 'none';
                        }}
                      >
                        <CImage
                          src={`data:image/jpeg;base64,${selectedImages.filE_OLD_METER_READING}`}
                          alt="Old Meter Reading"
                          className="img-thumbnail"
                          onClick={() => handleImageClick(selectedImages.filE_OLD_METER_READING)}
                          style={{ cursor: 'pointer', width: '100px', height: 'auto' }}
                        />
                        <div className="icon-overlay" style={iconOverlayStyle}>
                          <CIcon icon={cilTouchApp} />
                        </div>
                      </div>

                    </CCol>
                  </CRow>
                </CCardBody>) :
                (
                  <span>Loading...</span>
                )}
            </CCard>}

          {/* row4 */}
          {(selectedVerify.ordeR_TYPE == "ZDRM" || selectedVerify.ordeR_TYPE == "ZDRP") &&
            <CCard className="mb-3" style={{ backgroundColor: '#f8f9fa' }}>
              {selectedImages.filE_OLD_METER_GUNNYBAG ? (
                <CCardBody>
                  <CRow className="mb-3">
                    <CCol sm={2} className="d-flex align-items-center text-start font-weight-bold" style={{ overflowWrap: 'break-word' }}>
                      <strong>Old Meter Photograph With Gunny Bag</strong>
                    </CCol>
                    <CCol sm={8}>



                      <CFormSelect
                        name="gunnySta"  // The name must match the key in the verificationParameter object
                        value={verificationParameter.gunnySta}
                        onChange={handleSelectParameterChange}
                      >
                        {options.map((option, index) => (
                          <option key={index} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </CFormSelect>



                      <div className="mt-2">
                        <div className="d-flex">
                          <CCol sm={6} style={{ backgroundColor: '#e9ecef', borderRadius: '0.25rem', padding: '0.5rem', marginRight: '0.5rem' }}>
                            <div>
                              <div className="fw-bold">Gunny Bag Number Visible</div>
                              <div className="d-flex ">
                                <CFormCheck
                                  type="radio"
                                  name="gunnyNoVis"
                                  id="gunnyNoVisYes"
                                  value="Yes"
                                  label="Yes"
                                  className="me-2"
                                  checked={verificationParameter.gunnyNoVis === 'Yes'}
                                  onChange={handleSelectParameterChange}
                                />
                                <CFormCheck
                                  type="radio"
                                  name="gunnyNoVis"
                                  id="gunnyNoVisNo"
                                  value="No"
                                  label="No"
                                  checked={verificationParameter.gunnyNoVis === 'No'}
                                  onChange={handleSelectParameterChange}
                                />
                              </div>
                            </div>
                          </CCol>
                          <CCol sm={6} style={{ backgroundColor: '#e9ecef', borderRadius: '0.25rem', padding: '0.5rem', marginRight: '0.5rem' }}>
                            <div  >
                              <div className="fw-bold">Gunny Bag Visible</div>
                              <div className="d-flex ">
                                <CFormCheck
                                  type="radio"
                                  name="gunnyBagVis"
                                  id="gunnyBagVisYes"
                                  value="Yes"
                                  label="Yes"
                                  className="me-2" // Margin end for spacing
                                  checked={verificationParameter.gunnyBagVis === 'Yes'}
                                  onChange={handleSelectParameterChange}
                                />
                                <CFormCheck
                                  type="radio"
                                  name="gunnyBagVis"
                                  id="gunnyBagVisNo"
                                  value="No"
                                  label="No"
                                  checked={verificationParameter.gunnyBagVis === 'No'}
                                  onChange={handleSelectParameterChange}
                                />
                              </div>
                            </div>
                          </CCol>
                        </div>
                      </div>
                      <div className="mt-2">
                        <div className="d-flex">
                          <CCol sm={6} style={{ backgroundColor: '#e9ecef', borderRadius: '0.25rem', padding: '0.5rem', marginRight: '0.5rem' }}>
                            <div>
                              <div className="fw-bold">Test Notice in Bag Visible</div>
                              <div className="d-flex ">
                                <CFormCheck
                                  type="radio"
                                  name="gunnyTestNtcVis"
                                  id="gunnyTestNtcVisYes"
                                  value="Yes"
                                  label="Yes"
                                  className="me-2" // Margin end for spacing
                                  checked={verificationParameter.gunnyTestNtcVis === 'Yes'}
                                  onChange={handleSelectParameterChange}
                                />
                                <CFormCheck
                                  type="radio"
                                  name="gunnyTestNtcVis"
                                  id="gunnyTestNtcVisNo"
                                  value="No"
                                  label="No"
                                  checked={verificationParameter.gunnyTestNtcVis === 'No'}
                                  onChange={handleSelectParameterChange}
                                />
                              </div>
                            </div>
                          </CCol>

                        </div>
                      </div>
                    </CCol>
                    <CCol sm={2} className="d-flex align-items-center justify-content-center font-weight-bold">
                      {/* <CImage
                      src="https://via.placeholder.com/150"
                      alt="Photo 1"
                      className="img-thumbnail"
                      onClick={() => handleImageClick("https://via.placeholder.com/150")}
                      style={{ cursor: 'pointer', width: '100px', height: 'auto' }}
                    /> */}
                      <div
                        style={containerStyle}
                        onMouseEnter={(e) => {
                          const overlay = e.currentTarget.querySelector('.icon-overlay');
                          if (overlay) overlay.style.display = 'flex';
                        }}
                        onMouseLeave={(e) => {
                          const overlay = e.currentTarget.querySelector('.icon-overlay');
                          if (overlay) overlay.style.display = 'none';
                        }}
                      >
                        <CImage
                          src={`data:image/jpeg;base64,${selectedImages.filE_OLD_METER_GUNNYBAG}`}
                          alt="Old Meter Photograph With Gunny Bag"
                          className="img-thumbnail"
                          onClick={() => handleImageClick(selectedImages.filE_OLD_METER_GUNNYBAG)}
                          style={{ cursor: 'pointer', width: '100px', height: 'auto' }}
                        />
                        <div className="icon-overlay" style={iconOverlayStyle}>
                          <CIcon icon={cilTouchApp} />
                        </div>
                      </div>
                    </CCol>
                  </CRow>
                </CCardBody>
              ) :
                (
                  <span>Loading...</span>
                )}
            </CCard>}

          {/* row5 */}
          {(selectedVerify.ordeR_TYPE == "ZMSO" || selectedVerify.ordeR_TYPE == "ZMSC") && (
            <CCard className="mb-3" style={{ backgroundColor: '#f8f9fa' }}>
              {selectedImages.filE_METER_BEFORE_ACTIVITY ? (
                <CCardBody>
                  <CRow className="mb-3">
                    <CCol sm={2} className="d-flex align-items-center text-start font-weight-bold" style={{ overflowWrap: 'break-word' }}>
                      <strong>Meter Photograph with Background, Before Activity</strong>
                    </CCol>
                    <CCol sm={8}>



                      <CFormSelect
                        name="mtrActBefSta"  // The name must match the key in the verificationParameter object
                        value={verificationParameter.mtrActBefSta}
                        onChange={handleSelectParameterChange}
                      >
                        {options.map((option, index) => (
                          <option key={index} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </CFormSelect>



                      <div className="mt-2">
                        <div className="d-flex">
                          <CCol sm={6} style={{ backgroundColor: '#e9ecef', borderRadius: '0.25rem', padding: '0.5rem', marginRight: '0.5rem' }}>
                            <div>
                              <div className="fw-bold">Back Ground Visible</div>
                              <div className="d-flex ">
                                <CFormCheck
                                  type="radio"
                                  name="mtrActBefBkVis"
                                  id="mtrActBefBkVisYes"
                                  value="Yes"
                                  label="Yes"
                                  className="me-2"
                                  checked={verificationParameter.mtrActBefBkVis === 'Yes'}
                                  onChange={handleSelectParameterChange}
                                />
                                <CFormCheck
                                  type="radio"
                                  name="mtrActBefBkVis"
                                  id="mtrActBefBkVisNo"
                                  value="No"
                                  label="No"
                                  checked={verificationParameter.mtrActBefBkVis === 'No'}
                                  onChange={handleSelectParameterChange}
                                />
                              </div>
                            </div>
                          </CCol>
                          <CCol sm={6} style={{ backgroundColor: '#e9ecef', borderRadius: '0.25rem', padding: '0.5rem', marginRight: '0.5rem' }}>
                            <div  >
                              <div className="fw-bold">I/C & O/G Cables Visible</div>
                              <div className="d-flex ">
                                <CFormCheck
                                  type="radio"
                                  name="mtrActBefCblVis"
                                  id="mtrActBefCblVisYes"
                                  value="Yes"
                                  label="Yes"
                                  className="me-2" // Margin end for spacing
                                  checked={verificationParameter.mtrActBefBkVis === 'Yes'}
                                  onChange={handleSelectParameterChange}
                                />
                                <CFormCheck
                                  type="radio"
                                  name="mtrActBefCblVis"
                                  id="mtrActBefCblVisNo"
                                  value="No"
                                  label="No"
                                  checked={verificationParameter.mtrActBefBkVis === 'No'}
                                  onChange={handleSelectParameterChange}
                                />
                              </div>
                            </div>
                          </CCol>
                        </div>
                      </div>



                    </CCol>
                    <CCol sm={2} className="d-flex align-items-center justify-content-center font-weight-bold">
                      {/* <CImage
                      src="https://via.placeholder.com/150"
                      alt="Photo 1"
                      className="img-thumbnail"
                      onClick={() => handleImageClick("https://via.placeholder.com/150")}
                      style={{ cursor: 'pointer', width: '100px', height: 'auto' }}
                    /> */}
                      <div
                        style={containerStyle}
                        onMouseEnter={(e) => {
                          const overlay = e.currentTarget.querySelector('.icon-overlay');
                          if (overlay) overlay.style.display = 'flex';
                        }}
                        onMouseLeave={(e) => {
                          const overlay = e.currentTarget.querySelector('.icon-overlay');
                          if (overlay) overlay.style.display = 'none';
                        }}
                      >
                        <CImage
                          src={`data:image/jpeg;base64,${selectedImages.filE_METER_BEFORE_ACTIVITY}`}
                          alt="Meter Photograph with Background, Before Activity"
                          className="img-thumbnail"
                          onClick={() => handleImageClick(selectedImages.filE_METER_BEFORE_ACTIVITY)}
                          style={{ cursor: 'pointer', width: '100px', height: 'auto' }}
                        />
                        <div className="icon-overlay" style={iconOverlayStyle}>
                          <CIcon icon={cilTouchApp} />
                        </div>
                      </div>
                    </CCol>
                  </CRow>
                </CCardBody>) :
                (
                  <span>Loading...</span>
                )}
            </CCard>)}


          {/* Row 6 */}
          {(selectedVerify.ordeR_TYPE == "ZMSO" || selectedVerify.ordeR_TYPE == "ZMSC" || selectedVerify.ordeR_TYPE == "ZDIV") && (
            <CCard className="mb-3" style={{ backgroundColor: '#f8f9fa' }}>
              {selectedImages.filE_METER_BEFORE_ACTIVITY ? (
                <CCardBody>
                  <CRow className="mb-3">
                    <CCol sm={2} className="d-flex align-items-center text-start font-weight-bold" style={{ overflowWrap: 'break-word' }}>
                      <strong>Meter Photograph With Background, After Activity</strong>
                    </CCol>
                    <CCol sm={8}>



                      <CFormSelect
                        name="mtrActAftSta"  // The name must match the key in the verificationParameter object
                        value={verificationParameter.mtrActAftSta}
                        onChange={handleSelectParameterChange}
                      >
                        {options.map((option, index) => (
                          <option key={index} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </CFormSelect>



                      <div className="mt-2">
                        <div className="d-flex">
                          <CCol sm={6} style={{ backgroundColor: '#e9ecef', borderRadius: '0.25rem', padding: '0.5rem', marginRight: '0.5rem' }}>
                            <div>
                              <div className="fw-bold">New Meter Number Visible</div>
                              <div className="d-flex ">
                                <CFormCheck
                                  type="radio"
                                  name="mtrActAftMtrNoVis"
                                  id="mtrActAftMtrNoVisYes"
                                  value="Yes"
                                  label="Yes"
                                  className="me-2"
                                  checked={verificationParameter.mtrActAftMtrNoVis === 'Yes'}
                                  onChange={handleSelectParameterChange}
                                />
                                <CFormCheck
                                  type="radio"
                                  name="mtrActAftMtrNoVis"
                                  id="mtrActAftMtrNoVisNo"
                                  value="No"
                                  label="No"
                                  checked={verificationParameter.mtrActAftMtrNoVis === 'No'}
                                  onChange={handleSelectParameterChange}
                                />
                              </div>
                            </div>
                          </CCol>
                          <CCol sm={6} style={{ backgroundColor: '#e9ecef', borderRadius: '0.25rem', padding: '0.5rem', marginRight: '0.5rem' }}>
                            <div  >
                              <div className="fw-bold">I/C & O/G Cables Visible</div>
                              <div className="d-flex ">
                                <CFormCheck
                                  type="radio"
                                  name="mtrActAftCblVis"
                                  id="mtrActAftCblVisYes"
                                  value="Yes"
                                  label="Yes"
                                  className="me-2" // Margin end for spacing
                                  checked={verificationParameter.mtrActAftMtrNoVis === 'Yes'}
                                  onChange={handleSelectParameterChange}
                                />
                                <CFormCheck
                                  type="radio"
                                  name="mtrActAftCblVis"
                                  id="mtrActAftCblVisNo"
                                  value="No"

                                  label="No"
                                  checked={verificationParameter.mtrActAftMtrNoVis === 'No'}
                                  onChange={handleSelectParameterChange}
                                />
                              </div>
                            </div>
                          </CCol>
                        </div>
                      </div>
                      <div className="mt-2">
                        <div className="d-flex">
                          <CCol sm={6} style={{ backgroundColor: '#e9ecef', borderRadius: '0.25rem', padding: '0.5rem', marginRight: '0.5rem' }}>
                            <div>
                              <div className="fw-bold">CA No & Activity Date Marked on Meter Box</div>
                              <div className="d-flex ">
                                <CFormCheck
                                  type="radio"
                                  name="mtrActAftCaMark"
                                  id="mtrActAftCaMarkYes"
                                  value="Yes"
                                  label="Yes"
                                  className="me-2" // Margin end for spacing
                                  checked={verificationParameter.mtrActAftCaMark === 'Yes'}
                                  onChange={handleSelectParameterChange}
                                />
                                <CFormCheck
                                  type="radio"
                                  name="mtrActAftCaMark"
                                  id="mtrActAftCaMarkNo"
                                  value="No"
                                  label="No"
                                  checked={verificationParameter.mtrActAftCaMark === 'No'}
                                  onChange={handleSelectParameterChange}
                                />
                              </div>
                            </div>
                          </CCol>
                          <CCol sm={6} style={{ backgroundColor: '#e9ecef', borderRadius: '0.25rem', padding: '0.5rem', marginRight: '0.5rem' }}>
                            <div  >
                              <div className="fw-bold">Cable Drum Detail Marked on Cable</div>
                              <div className="d-flex ">
                                <CFormCheck
                                  type="radio"
                                  name="mtrActAftCblDtlsMark"
                                  id="mtrActAftCblDtlsMarkYes"
                                  value="Yes"
                                  label="Yes"
                                  className="me-2" // Margin end for spacing
                                  checked={verificationParameter.mtrActAftCblDtlsMark === 'Yes'}
                                  onChange={handleSelectParameterChange}
                                />
                                <CFormCheck
                                  type="radio"
                                  name="mtrActAftCblDtlsMark"
                                  id="mtrActAftCblDtlsMarkNo"
                                  value="No"
                                  label="No"
                                  checked={verificationParameter.mtrActAftCblDtlsMark === 'No'}
                                  onChange={handleSelectParameterChange}
                                />
                              </div>
                            </div>
                          </CCol>
                        </div>
                      </div>
                    </CCol>
                    <CCol sm={2} className="d-flex align-items-center justify-content-center font-weight-bold">
                      {/* <CImage
                      src="https://via.placeholder.com/150"
                      alt="Photo 1"
                      className="img-thumbnail"
                      onClick={() => handleImageClick("https://via.placeholder.com/150")}
                      style={{ cursor: 'pointer', width: '100px', height: 'auto' }}
                    /> */}
                      <div
                        style={containerStyle}
                        onMouseEnter={(e) => {
                          const overlay = e.currentTarget.querySelector('.icon-overlay');
                          if (overlay) overlay.style.display = 'flex';
                        }}
                        onMouseLeave={(e) => {
                          const overlay = e.currentTarget.querySelector('.icon-overlay');
                          if (overlay) overlay.style.display = 'none';
                        }}
                      >
                        <CImage
                          src={`data:image/jpeg;base64,${selectedImages.filE_METER_BEFORE_ACTIVITY}`}
                          alt="Meter Photograph With Background, After Activity"
                          className="img-thumbnail"
                          onClick={() => handleImageClick(selectedImages.filE_METER_BEFORE_ACTIVITY)}
                          style={{ cursor: 'pointer', width: '100px', height: 'auto' }}
                        />
                        <div className="icon-overlay" style={iconOverlayStyle}>
                          <CIcon icon={cilTouchApp} />
                        </div>
                      </div>
                    </CCol>
                  </CRow>
                </CCardBody>) :
                (
                  <span>Loading...</span>
                )}
            </CCard>)}

          {/* row7 */}
          <CCard className="mb-3" style={{ backgroundColor: '#f8f9fa' }}>
            {selectedImages.filE_METER_BEFORE_ACTIVITY ? (
              <CCardBody>
                <CRow className="mb-3">
                  <CCol sm={2} className="d-flex align-items-center text-start font-weight-bold" style={{ overflowWrap: 'break-word' }}>
                    <strong>MCR Photograph</strong>
                  </CCol>
                  <CCol sm={8}>



                    <CFormSelect
                      name="mcrPhotoSta"  // The name must match the key in the verificationParameter object
                      value={verificationParameter.mcrPhotoSta}
                      onChange={handleSelectParameterChange}
                    >
                      {options.map((option, index) => (
                        <option key={index} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </CFormSelect>



                    <div className="mt-2">
                      <div className="d-flex">
                        <CCol sm={6} style={{ backgroundColor: '#e9ecef', borderRadius: '0.25rem', padding: '0.5rem', marginRight: '0.5rem' }}>
                          <div>
                            <div className="fw-bold">MCR Details Visible</div>
                            <div className="d-flex ">
                              <CFormCheck
                                type="radio"
                                name="mcrDtlsVis"
                                id="mcrDtlsVisYes"
                                value="Yes"
                                label="Yes"
                                className="me-2"
                                checked={verificationParameter.mcrDtlsVis === 'Yes'}
                                onChange={handleSelectParameterChange}
                              />
                              <CFormCheck
                                type="radio"
                                name="mcrDtlsVis"
                                id="mcrDtlsVisNo"
                                value="No"
                                label="No"
                                checked={verificationParameter.mcrDtlsVis === 'No'}
                                onChange={handleSelectParameterChange}
                              />
                            </div>
                          </div>
                        </CCol>
                        <CCol sm={6} style={{ backgroundColor: '#e9ecef', borderRadius: '0.25rem', padding: '0.5rem', marginRight: '0.5rem' }}>
                          <div  >
                            <div className="fw-bold">Consumer Signature Visible</div>
                            <div className="d-flex ">
                              <CFormCheck
                                type="radio"
                                name="mcrConSignVis"
                                id="mcrConSignVisYes"
                                value="Yes"
                                label="Yes"
                                className="me-2" // Margin end for spacing
                                checked={verificationParameter.mcrConSignVis === 'Yes'}
                                onChange={handleSelectParameterChange}
                              />
                              <CFormCheck
                                type="radio"
                                name="mcrConSignVis"
                                id="mcrConSignVisNo"
                                value="No"
                                label="No"
                                checked={verificationParameter.mcrConSignVis === 'No'}
                                onChange={handleSelectParameterChange}
                              />
                            </div>
                          </div>
                        </CCol>
                      </div>
                    </div>



                  </CCol>
                  <CCol sm={2} className="d-flex align-items-center justify-content-center font-weight-bold">
                    {/* <CImage
                      src="https://via.placeholder.com/150"
                      alt="Photo 1"
                      className="img-thumbnail"
                      onClick={() => handleImageClick("https://via.placeholder.com/150")}
                      style={{ cursor: 'pointer', width: '100px', height: 'auto' }}
                    /> */}
                    <div
                      style={containerStyle}
                      onMouseEnter={(e) => {
                        const overlay = e.currentTarget.querySelector('.icon-overlay');
                        if (overlay) overlay.style.display = 'flex';
                      }}
                      onMouseLeave={(e) => {
                        const overlay = e.currentTarget.querySelector('.icon-overlay');
                        if (overlay) overlay.style.display = 'none';
                      }}
                    >

                      <CImage
                        src={`data:image/jpeg;base64,${selectedImages.filE_METER_BEFORE_ACTIVITY}`}
                        alt="MCR Photograph"
                        className="img-thumbnail"
                        onClick={() => handleImageClick(selectedImages.filE_METER_BEFORE_ACTIVITY)}
                        style={{ cursor: 'pointer', width: '100px', height: 'auto' }}
                      />
                      <div className="icon-overlay" style={iconOverlayStyle}>
                        <CIcon icon={cilTouchApp} />
                      </div>
                    </div>
                  </CCol>
                </CRow>
              </CCardBody>) :
              (
                <span>Loading...</span>
              )}
          </CCard>


          {/* row8*/}
          {(selectedVerify.ordeR_TYPE == "ZDRP" || selectedVerify.ordeR_TYPE == "ZDRM") &&
            <CCard className="mb-3" style={{ backgroundColor: '#f8f9fa' }}>
              {selectedImages.filE_METER_BEFORE_ACTIVITY ? (
                <CCardBody>
                  <CRow className="mb-3">
                    <CCol sm={2} className="d-flex align-items-center text-start font-weight-bold" style={{ overflowWrap: 'break-word' }}>
                      <strong>Lab Notice Photograph</strong>
                    </CCol>
                    <CCol sm={8}>



                      <CFormSelect
                        name="labNtcSta"  // The name must match the key in the verificationParameter object
                        value={verificationParameter.labNtcSta}
                        onChange={handleSelectParameterChange}
                      >
                        {options.map((option, index) => (
                          <option key={index} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </CFormSelect>



                      <div className="mt-2">
                        <div className="d-flex">
                          <CCol sm={6} style={{ backgroundColor: '#e9ecef', borderRadius: '0.25rem', padding: '0.5rem', marginRight: '0.5rem' }}>
                            <div>
                              <div className="fw-bold">Lab Notice Details Visible</div>
                              <div className="d-flex ">
                                <CFormCheck
                                  type="radio"
                                  name="labNtcDtlsVis"
                                  id="labNtcDtlsVisYes"
                                  value="Yes"
                                  label="Yes"
                                  className="me-2"
                                  checked={verificationParameter.labNtcDtlsVis === 'Yes'}
                                  onChange={handleSelectParameterChange}
                                />
                                <CFormCheck
                                  type="radio"
                                  name="labNtcDtlsVis"
                                  id="labNtcDtlsVisNo"
                                  value="No"
                                  label="No"
                                  checked={verificationParameter.labNtcDtlsVis === 'No'}
                                  onChange={handleSelectParameterChange}
                                />
                              </div>
                            </div>
                          </CCol>
                          <CCol sm={6} style={{ backgroundColor: '#e9ecef', borderRadius: '0.25rem', padding: '0.5rem', marginRight: '0.5rem' }}>
                            <div  >
                              <div className="fw-bold">Consumer Signature Visible</div>
                              <div className="d-flex ">
                                <CFormCheck
                                  type="radio"
                                  name="labNtcSignVis"
                                  id="labNtcSignVisYes"
                                  value="Yes"
                                  label="Yes"
                                  className="me-2" // Margin end for spacing
                                  checked={verificationParameter.labNtcSignVis === 'Yes'}
                                  onChange={handleSelectParameterChange}
                                />
                                <CFormCheck
                                  type="radio"
                                  name="labNtcSignVis"
                                  id="labNtcSignVisNo"
                                  value="No"
                                  label="No"
                                  checked={verificationParameter.labNtcSignVis === 'No'}
                                  onChange={handleSelectParameterChange}
                                />
                              </div>
                            </div>
                          </CCol>
                        </div>
                      </div>



                    </CCol>
                    <CCol sm={2} className="d-flex align-items-center justify-content-center font-weight-bold">
                      {/* <CImage
                      src="https://via.placeholder.com/150"
                      alt="Photo 1"
                      className="img-thumbnail"
                      onClick={() => handleImageClick("https://via.placeholder.com/150")}
                      style={{ cursor: 'pointer', width: '100px', height: 'auto' }}
                    /> */}
                      <div
                        style={containerStyle}
                        onMouseEnter={(e) => {
                          const overlay = e.currentTarget.querySelector('.icon-overlay');
                          if (overlay) overlay.style.display = 'flex';
                        }}
                        onMouseLeave={(e) => {
                          const overlay = e.currentTarget.querySelector('.icon-overlay');
                          if (overlay) overlay.style.display = 'none';
                        }}
                      >

                        <CImage
                          src={`data:image/jpeg;base64,${selectedImages.filE_METER_BEFORE_ACTIVITY}`}
                          alt="Lab Notice Photograph"
                          className="img-thumbnail"
                          onClick={() => handleImageClick(selectedImages.filE_METER_BEFORE_ACTIVITY)}
                          style={{ cursor: 'pointer', width: '100px', height: 'auto' }}
                        />
                        <div className="icon-overlay" style={iconOverlayStyle}>
                          <CIcon icon={cilTouchApp} />
                        </div>
                      </div>
                    </CCol>
                  </CRow>
                </CCardBody>)
                :
                (
                  <span>Loading...</span>
                )}
            </CCard>}


          {/* row9*/}
          {(selectedVerify.ordeR_TYPE == "ZDRP" || selectedVerify.ordeR_TYPE == "ZDRM") && (
            <CCard className="mb-3" style={{ backgroundColor: '#f8f9fa' }}>
              {selectedImages.filE_METER_BEFORE_ACTIVITY ? (
                <CCardBody>
                  <CRow className="mb-3">
                    <CCol sm={2} className="d-flex align-items-center text-start font-weight-bold" style={{ overflowWrap: 'break-word' }}>
                      <strong>Cancellation Notice Photograph</strong>
                    </CCol>
                    <CCol sm={8}>



                      <CFormSelect
                        name="cancelNtcSta"  // The name must match the key in the verificationParameter object
                        value={verificationParameter.cancelNtcSta}
                        onChange={handleSelectParameterChange}
                      >
                        {options.map((option, index) => (
                          <option key={index} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </CFormSelect>



                      <div className="mt-2">
                        <div className="d-flex">
                          <CCol sm={6} style={{ backgroundColor: '#e9ecef', borderRadius: '0.25rem', padding: '0.5rem', marginRight: '0.5rem' }}>
                            <div>
                              <div className="fw-bold">Cancellation Notice Details Visible</div>
                              <div className="d-flex ">
                                <CFormCheck
                                  type="radio"
                                  name="cancelNtcDtlsVis"
                                  id="cancelNtcDtlsVisYes"
                                  value="Yes"
                                  label="Yes"
                                  className="me-2"
                                  checked={verificationParameter.cancelNtcDtlsVis === 'Yes'}
                                  onChange={handleSelectParameterChange}
                                />
                                <CFormCheck
                                  type="radio"
                                  name="cancelNtcDtlsVis"
                                  id="cancelNtcDtlsVisNo"
                                  value="No"
                                  label="No"
                                  checked={verificationParameter.cancelNtcDtlsVis === 'No'}
                                  onChange={handleSelectParameterChange}
                                />
                              </div>
                            </div>
                          </CCol>
                          <CCol sm={6} style={{ backgroundColor: '#e9ecef', borderRadius: '0.25rem', padding: '0.5rem', marginRight: '0.5rem' }}>
                            <div  >
                              <div className="fw-bold">Consumer Signature Visible</div>
                              <div className="d-flex ">
                                <CFormCheck
                                  type="radio"
                                  name="cancelNtcSignVis"
                                  id="cancelNtcSignVisYes"
                                  value="Yes"
                                  label="Yes"
                                  className="me-2" // Margin end for spacing
                                  checked={verificationParameter.cancelNtcSignVis === 'No'}
                                  onChange={handleSelectParameterChange}
                                />
                                <CFormCheck
                                  type="radio"
                                  name="cancelNtcSignVis"
                                  id="cancelNtcSignVisNo"
                                  value="No"
                                  label="No"
                                  checked={verificationParameter.cancelNtcSignVis === 'No'}
                                  onChange={handleSelectParameterChange}
                                />
                              </div>
                            </div>
                          </CCol>
                        </div>
                      </div>



                    </CCol>
                    <CCol sm={2} className="d-flex align-items-center justify-content-center font-weight-bold">
                      {/* <CImage
                      src="https://via.placeholder.com/150"
                      alt="Photo 1"
                      className="img-thumbnail"
                      onClick={() => handleImageClick("https://via.placeholder.com/150")}
                      style={{ cursor: 'pointer', width: '100px', height: 'auto' }}
                    /> */}
                      <div
                        style={containerStyle}
                        onMouseEnter={(e) => {
                          const overlay = e.currentTarget.querySelector('.icon-overlay');
                          if (overlay) overlay.style.display = 'flex';
                        }}
                        onMouseLeave={(e) => {
                          const overlay = e.currentTarget.querySelector('.icon-overlay');
                          if (overlay) overlay.style.display = 'none';
                        }}
                      >
                        <CImage
                          src={`data:image/jpeg;base64,${selectedImages.filE_METER_BEFORE_ACTIVITY}`}
                          alt="Cancellation Notice Photograph"
                          className="img-thumbnail"
                          onClick={() => handleImageClick(selectedImages.filE_METER_BEFORE_ACTIVITY)}
                          style={{ cursor: 'pointer', width: '100px', height: 'auto' }}
                        />
                        <div className="icon-overlay" style={iconOverlayStyle}>
                          <CIcon icon={cilTouchApp} />
                        </div>
                      </div>
                    </CCol>
                  </CRow>
                </CCardBody>)
                :
                (
                  <span>Loading...</span>
                )}
            </CCard>)}

          <CModalFooter>
            <CButton color="primary" onClick={() => handleVerification()}>Submit</CButton>
            <CButton color="secondary" onClick={() => handleClose()}>Cancel</CButton>
          </CModalFooter>
        </CModalBody>
      </CModal>






      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader className="text-center" style={{ fontSize: '1.3rem' }}>
            {/* <strong>Total Case Execution Report</strong> */}
            <strong>Meter Photo Verification</strong>

          </CCardHeader>
          <CCardBody>
            <CRow>


              <CCol sm={3}

                className="mb-1">
                <CFormLabel
                  htmlFor="staticEmail"
                  className="col-sm-3 col-form-label"
                  style={textSmallStyle}
                >
                  <strong>Type</strong><span className="text-danger">*</span>:
                </CFormLabel>

                <CButtonGroup role="group" aria-label="Basic radio button group">

                  {/* <CFormCheck
                    type="radio"
                    button={{ color: 'danger', variant: 'outline' }}
                    name="btnradio"
                    id="btnradio-label"
                    disabled
                    className="fw-bold text-white"
                    style={{ cursor: 'default', backgroundColor: 'danger', borderColor: 'transparent' }}
                    label="Type"
                  /> */}


                  <CFormCheck
                    type="radio"
                    button={{ color: 'danger', variant: 'outline' }}
                    name="btnradio"
                    id="btnradio1"
                    autoComplete="off"
                    value="ORDER BASED"
                    checked={selectedValues.caseType === "ORDER BASED"} // Check if selected
                    onChange={handleRadioChange} // Handle radio change
                    label="Order"
                  />
                  <CFormCheck
                    type="radio"
                    button={{ color: 'danger', variant: 'outline' }}
                    name="btnradio"
                    id="btnradio2"
                    autoComplete="off"
                    value="LOOSE"
                    checked={selectedValues.caseType === "LOOSE"} // Check if selected
                    onChange={handleRadioChange} // Handle radio change
                    label="Loose"
                  />
                  <CFormCheck
                    type="radio"
                    button={{ color: 'danger', variant: 'outline' }}
                    name="btnradio"
                    id="btnradio3"
                    autoComplete="off"
                    value="NON-TAB"
                    checked={selectedValues.caseType === "NON-TAB"} // Check if selected
                    onChange={handleRadioChange} // Handle radio change
                    label="Non-Tab"
                  />
                </CButtonGroup>





              </CCol>

              <CCol sm={3} className="mb-1">
                <CFormSelect
                  id="floatingSelect"
                  floatingLabel={
                    <>
                      <span style={textSmallStyle}>Division</span>{' '}
                      <span className="text-danger">*</span>
                    </>
                  }
                  aria-label="Division"

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


                </CFormSelect>
              </CCol>

              <CCol sm={3} className="mb-1">
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                  <DatePicker
                    label="Activity Date From*"
                    format="DD/MM/YYYY"
                    // style={componentHeightStyle}
                    value={selectedValues.datefrom}
                    onChange={(newValue) => handleDateChange(newValue, 'datefrom')}
                    disableFuture

                    //another trial
                    slots={{
                      textField: (params) => (
                        <TextField
                          {...params}
                          sx={{
                            width: '100%', // Adjust the width of the input
                            '& .MuiInputBase-root': {
                              borderRadius: '5px',
                              '& input': {
                                color: colorModes == 'light' ? 'black' : 'white'

                                // color: 'white', // Text color when typing
                              },
                            },
                            '& .MuiInputLabel-root': {
                              color: colorModes == 'light' ? 'black' : 'white',

                              // color: 'white', // Default label color
                              fontSize: '14px', // Label font size
                              // Styles for floating label when not focused
                              '&.Mui-shrink': {
                                color: colorModes == 'light' ? 'black' : 'white',

                                // color: 'white', // Color of the floating label when shrunk
                              },
                              // Ensure label color remains white when not focused
                              '&.MuiInputLabel-formControl': {
                                color: colorModes == 'light' ? 'black' : 'white',

                                // color: 'white', // Color of the label in rest state
                              },
                            },
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': {
                                // borderColor: 'rgba(255, 255, 255, 0.3)', // Border color
                                borderColor: colorModes == 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'grey',

                              },
                              '&:hover fieldset': {
                                borderColor: colorModes == 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'grey',

                                // borderColor: 'rgba(255, 255, 255, 0.5)', // Border color on hover
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: colorModes == 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'grey', // Border color when focused

                                // borderColor: 'rgba(255, 255, 255, 0.7)', // Border color when focused
                              },
                              '& .MuiInputAdornment-root .MuiIconButton-root': {
                                color: colorModes == 'light' ? 'black' : 'white',

                                // color: 'white', // Icon color
                              },
                            },
                          }}
                        />
                      ),
                    }}
                  />
                </LocalizationProvider>
              </CCol>

              <CCol sm={3} className="mb-1">
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                  <DatePicker
                    label="Activity Date To*"
                    format="DD/MM/YYYY"
                    // style={componentHeightStyle}
                    //another trial

                    value={selectedValues.dateTo}
                    onChange={(newValue) => handleDateChange(newValue, 'dateTo')}
                    disableFuture
                    //another trial
                    slots={{
                      textField: (params) => (
                        <TextField
                          {...params}
                          sx={{
                            width: '100%', // Adjust the width of the input
                            '& .MuiInputBase-root': {
                              borderRadius: '5px',
                              '& input': {
                                color: colorModes == 'light' ? 'black' : 'white'

                                // color: 'white', // Text color when typing
                              },
                            },
                            '& .MuiInputLabel-root': {
                              color: colorModes == 'light' ? 'black' : 'white',

                              // color: 'white', // Default label color
                              fontSize: '14px', // Label font size
                              // Styles for floating label when not focused
                              '&.Mui-shrink': {
                                color: colorModes == 'light' ? 'black' : 'white',

                                // color: 'white', // Color of the floating label when shrunk
                              },
                              // Ensure label color remains white when not focused
                              '&.MuiInputLabel-formControl': {
                                color: colorModes == 'light' ? 'black' : 'white',

                                // color: 'white', // Color of the label in rest state
                              },
                            },
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': {
                                // borderColor: 'rgba(255, 255, 255, 0.3)', // Border color
                                borderColor: colorModes == 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'grey',

                              },
                              '&:hover fieldset': {
                                borderColor: colorModes == 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'grey',

                                // borderColor: 'rgba(255, 255, 255, 0.5)', // Border color on hover
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: colorModes == 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'grey', // Border color when focused

                                // borderColor: 'rgba(255, 255, 255, 0.7)', // Border color when focused
                              },
                              '& .MuiInputAdornment-root .MuiIconButton-root': {
                                color: colorModes == 'light' ? 'black' : 'white',

                                // color: 'white', // Icon color
                              },
                            },
                          }}
                        />
                      ),
                    }}
                  />
                </LocalizationProvider>
              </CCol>

            </CRow>

            <CRow>

              {/* <CCol sm={3} className="mb-1">
                <CFormSelect
                  id="floatingSelect"
                  floatingLabel={
                    <>
                      <span style={textSmallStyle}>Division</span>{' '}
                      <span className="text-danger">*</span>
                    </>
                  }
                  aria-label="Division"

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


                </CFormSelect>
              </CCol> */}
              <CCol sm={3} className="mb-1">
                <CFormSelect
                  id="floatingSelect"
                  floatingLabel={
                    <>
                      <span style={textSmallStyle}>Order Type</span>{' '}
                      <span className="text-danger">*</span>
                    </>
                  }
                  aria-label="Order Type"
                  // style={componentHeightStyle}
                  className="custom-form-select"
                  value={selectedValues.order} // Bind to state
                  onChange={(event) => handleChange(event, 'order')}
                >
                  <option>Open this select menu</option>

                  {orderTypes.map((orderTypes) => (
                    <option key={orderTypes.id} value={orderTypes.id}>
                      {orderTypes.id}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
              <CCol sm={3} className="mb-1">
                <CFormSelect
                  id="floatingSelect"
                  floatingLabel={
                    <>
                      <span style={textSmallStyle}>Activity Type</span>{' '}
                      <span className="text-danger">*</span>
                    </>
                  }
                  aria-label="Activity Type"
                  // style={componentHeightStyle}
                  className="custom-form-select"
                  value={selectedValues.activity} // Bind to state
                  onChange={(event) => handleChange(event, 'activity')}
                >
                  <option>Open this select menu</option>

                  {activityTypes.map((activityTypes) => (
                    <option key={activityTypes.id} value={activityTypes.id}>
                      {activityTypes.label}
                    </option>
                  ))}

                </CFormSelect>
              </CCol>

              <CCol sm={3} className="mb-1">
                <CFormSelect
                  id="floatingSelect"
                  floatingLabel={
                    <>
                      <span style={textSmallStyle}>Installer</span>{' '}
                      <span className="text-danger">*</span>
                    </>
                  }
                  aria-label="Activity Type"
                  // style={componentHeightStyle}
                  className="custom-form-select"
                  value={selectedValues.installername} // Bind to state
                  onChange={(event) => handleChange(event, 'installername')}
                >
                  <option>Open this select menu</option>
                  <option>Open this select menu</option>
                  <option>Open this select menu</option>
                  <option>Open this select menu</option>
                  <option>Open this select menu</option>


                  {/* {activityTypes.map((activityTypes) => (
                    <option key={activityTypes.id} value={activityTypes.id}>
                      {activityTypes.label}
                    </option>
                  ))} */}

                </CFormSelect>
              </CCol>
              <CCol sm={3}>
                <CFormInput
                  type="text"
                  id="floatingInput"
                  floatingClassName="mb-3"
                  floatingLabel={
                    <>
                      <span style={textSmallStyle}>Order No</span>
                    </>
                  }
                  placeholder="Enter Order No"
                  className="custom-form-select"


                  value={selectedValues.orderno} // Bind to state
                  // onChange={(event) => handleChange(event, 'orderno')}
                  onChange={(event) => {
                    const value = event.target.value;
                    // Remove any non-digit characters and limit to 10 digits
                    const filteredValue = value.replace(/\D/g, '').slice(0, 10);
                    handleChange({ target: { value: filteredValue } }, 'orderno');
                  }}
                />
              </CCol>

            </CRow>
            <CRow className="mb-1">
              {/* <CCol sm={4}>
                <CFormInput
                  type="text"
                  id="floatingInput"
                  floatingClassName="mb-3"
                  floatingLabel={
                    <>
                      <span style={textSmallStyle}>Installer Id</span>
                    </>
                  }
                  placeholder="Enter Installer Id"
                  className="custom-form-select"


                  value={selectedValues.installername} // Bind to state
                  onChange={(event) => handleChange(event, 'installername')}

                />
              </CCol> */}
              {/* <CCol sm={4}>
                <CFormInput
                  type="text"
                  id="floatingInput"
                  floatingClassName="mb-3"
                  floatingLabel={
                    <>
                      <span style={textSmallStyle}>Order No</span>
                    </>
                  }
                  placeholder="Enter Order No"
                  className="custom-form-select"


                  value={selectedValues.orderno} // Bind to state
                  // onChange={(event) => handleChange(event, 'orderno')}
                  onChange={(event) => {
                    const value = event.target.value;
                    // Remove any non-digit characters and limit to 10 digits
                    const filteredValue = value.replace(/\D/g, '').slice(0, 10);
                    handleChange({ target: { value: filteredValue } }, 'orderno');
                  }}
                />
              </CCol> */}
              <CCol sm={3}>
                <CFormInput
                  type="text"
                  id="floatingInput"
                  floatingClassName="mb-3"
                  floatingLabel={
                    <>
                      <span style={textSmallStyle}>CA No</span>
                    </>
                  }
                  placeholder="Enter CA No"
                  className="custom-form-select"

                  value={selectedValues.caNo} // Bind to state
                  // onChange={(event) => handleChange(event, 'caNo')}
                  onChange={(event) => {
                    const value = event.target.value;
                    // Remove any non-digit characters and limit to 10 digits
                    const filteredValue = value.replace(/\D/g, '').slice(0, 9);
                    handleChange({ target: { value: filteredValue } }, 'caNo');
                  }}
                />
              </CCol>
              <CCol sm={3}>
                <CFormInput
                  type="text"
                  id="floatingInput"
                  floatingClassName="mb-3"
                  floatingLabel={
                    <>
                      <span style={textSmallStyle}>Meter No</span>
                    </>
                  }
                  placeholder="Enter Meter No"
                  className="custom-form-select"

                  value={selectedValues.caNo} // Bind to state
                  // onChange={(event) => handleChange(event, 'caNo')}
                  onChange={(event) => {
                    const value = event.target.value;
                    // Remove any non-digit characters and limit to 10 digits
                    const filteredValue = value.replace(/\D/g, '').slice(0, 9);
                    handleChange({ target: { value: filteredValue } }, 'caNo');
                  }}
                />
              </CCol>
            </CRow>

            <CRow className="justify-content-center">
              <CCol xs={12} sm={6} md={4} lg={3} className="mb-2 d-flex justify-content-center">
                <CButton color="danger" variant="outline" className="w-100" onClick={handleViewClick}>
                  View
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

        {/* {(data.length > 0) && */}

        {(data.length > 0 && loader == false) &&

          <CCard className="mb-4">
            <CCardBody>
              <CRow>
                <CCol sm={4} className="mb-1">
                </CCol>
              </CRow>

              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead className="text-nowrap">
                  <CTableRow>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      Entry Date
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      Case Type
                    </CTableHeaderCell>
                    <CTableHeaderCell
                      className="bg-body-tertiary"
                    //  onClick={() => handleSort2('Name')}
                    >
                      Division
                      {/* {orderBy === 'user.name' && (order === 'asc' ? '▲' : '▼')} */}
                      {/* {orderBy2 === 'Name' && (order === 'asc' ? '▲' : '▼')} */}
                    </CTableHeaderCell>
                    <CTableHeaderCell
                      className="bg-body-tertiary text-center"
                    // onClick={() => handleSort2('UserID')}
                    >
                      Sub Division
                      {/* {orderBy2 === 'UserID' && (order === 'asc' ? '▲' : '▼')} */}
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Order No</CTableHeaderCell>
                    <CTableHeaderCell
                      className="bg-body-tertiary text-center"
                    // onClick={() => handleSort2('Division')}
                    >
                      Order Type
                      {/* {orderBy2 === 'Division' && (order === 'asc' ? '▲' : '▼')} */}
                    </CTableHeaderCell>
                    <CTableHeaderCell
                      className="bg-body-tertiary"
                    // onClick={() => handleSort2('Designation')}
                    >
                      Activity Type
                      {/* {orderBy2 === 'Designation' && (order === 'asc' ? '▲' : '▼')} */}
                    </CTableHeaderCell>

                    <CTableHeaderCell
                      className="bg-body-tertiary"
                    // onClick={() => handleSort2('Role')}
                    >
                      New Meter No
                      {/* {orderBy2 === 'Role' && (order === 'asc' ? '▲' : '▼')} */}
                    </CTableHeaderCell>
                    <CTableHeaderCell
                      className="bg-body-tertiary"
                    // onClick={() => handleSort2('Status')}
                    >
                      Old Meter No
                      {/* {orderBy2 === 'Status' && (order === 'asc' ? '▲' : '▼')} */}
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">
                      Gunny Bag No
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">
                      Lineman Id
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      Punch Date
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      Action
                    </CTableHeaderCell>




                  </CTableRow>
                </CTableHead>

                <CTableBody>


                  {paginatedData.map((item, index) => (
                    <CTableRow key={index} style={{ fontSize: 10 }}>
                      <CTableDataCell className="text-center">
                        {item.entrY_DATE ? moment(item.entrY_DATE).format('DD-MM-YYYY') : 'NA'}
                      </CTableDataCell>

                      <CTableDataCell className="text-center">
                        {selectedValues.caseType ? selectedValues.caseType : 'NA'}
                      </CTableDataCell>

                      <CTableDataCell className="text-center">
                        {item.division ? item.division : 'NA'}
                      </CTableDataCell>

                      <CTableDataCell className="text-center">
                        {item.suB_DIVISION ? item.suB_DIVISION : 'NA'}
                      </CTableDataCell>

                      <CTableDataCell className="text-center">
                        {item.orderid ? item.orderid : 'NA'}
                      </CTableDataCell>

                      <CTableDataCell className="text-center">
                        {item.ordeR_TYPE ? item.ordeR_TYPE : 'NA'}
                      </CTableDataCell>

                      <CTableDataCell className="text-center">
                        {item.pM_ACTIVITY ? item.pM_ACTIVITY : 'NA'}
                      </CTableDataCell>

                      <CTableDataCell className="text-center">
                        {item.neW_METER_NO ? item.neW_METER_NO : 'NA'}
                      </CTableDataCell>

                      <CTableDataCell className="text-center">
                        {item.olD_METER_NO ? item.olD_METER_NO : 'NA'}
                      </CTableDataCell>

                      <CTableDataCell className="text-center">
                        {item.gunnybaG_OLD ? item.gunnybaG_OLD : 'NA'}
                      </CTableDataCell>

                      <CTableDataCell className="text-center">
                        {item.taB_LOGIN_ID ? item.taB_LOGIN_ID : 'NA'}
                      </CTableDataCell>

                      <CTableDataCell className="text-center">
                        {item.activitY_DATE ? moment(item.activitY_DATE).format('DD-MM-YYYY') : 'NA'}
                      </CTableDataCell>

                      <CTableDataCell className="text-center">

                        <CButton color="danger" variant="outline" className="w-100" onClick={() => {
                          setSelectedVerify(item)
                          // setVisibleXL(!visibleXL)
                          handleVerifyClick(item)
                        }}>
                          Verify
                        </CButton>
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

              {/* <CButton color="danger" variant="outline" className="w-100" onClick={() => setVisibleXL(!visibleXL)}>
              Open Photo Verification Form
            </CButton> */}

            </CCardBody>
          </CCard>
        }

        {/* // } */}


      </CCol>
    </CRow>
  )
}

export default MeterPhotoVerification
