import React, { useState, useEffect } from 'react'
import {
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
import { ACTIVITYTYPE_URL, DIVISION_URL, ORDERTYPE_URL, TOTALEXECMIS_URL, TOTALEXECMISEXCEL_URL } from '../../../utils/ConstantURL'
import { useSelector } from 'react-redux'

const tableExample2 = [
  {
    Company: 'BRPL',
    Division: 'S1ALN',
    SubDiv: '2510DDK',
    VendorCode: '2556781',
    CANo: '000154518440',
    OrderNo: '001035367359',
    OrderType: 'ZDIN',
    AccountClass: 'SLCC',
    BasicStartDate: '8/8/2024 12:00:00 AM',
    BasicFinishDate: '8/9/2024 12:00:00 AM',
    Name: 'MOHIT.. ... KUMAR..',
    FatherName: 'S/O LAKHAN SINGH',
    Address:
      'B-1277 BABA PHATE SINGH MARG GOVIND PURI NEAR DEEPALYA SCHOOL 2ND FLOOR TRANSIT CAMP RAJIV GHANDHI COLONY DELHI 110019',
    MobileNo: '9315319510',
    BPNo: '0910382361',
    PoleNo: 'ALNK428',
    CableSize: '2X25LT',
    CableLength: 'Overhead (18 )',
    PlannerGroup: 'MMG',
    ActivityReason: '01',
  },
  {
    Company: 'BRPL',
    Division: 'S1ALN',
    SubDiv: '2510DDK',
    VendorCode: '2556782',
    CANo: '000154518441',
    OrderNo: '001035367360',
    OrderType: 'ZDIN',
    AccountClass: 'SLCC',
    BasicStartDate: '8/10/2024 12:00:00 AM',
    BasicFinishDate: '8/11/2024 12:00:00 AM',
    Name: 'RAJESH KUMAR',
    FatherName: 'S/O RAM CHANDRA',
    Address: 'C-2345 NEW STREET NEAR METRO STATION DELHI 110020',
    MobileNo: '9315319511',
    BPNo: '0910382362',
    PoleNo: 'ALNK429',
    CableSize: '3X25LT',
    CableLength: 'Underground (20 )',
    PlannerGroup: 'MMG',
    ActivityReason: '02',
  },
  {
    Company: 'BRPL',
    Division: 'S1ALN',
    SubDiv: '2510DDK',
    VendorCode: '2556783',
    CANo: '000154518442',
    OrderNo: '001035367361',
    OrderType: 'ZDIN',
    AccountClass: 'SLCC',
    BasicStartDate: '8/12/2024 12:00:00 AM',
    BasicFinishDate: '8/13/2024 12:00:00 AM',
    Name: 'ANITA SHARMA',
    FatherName: 'S/O KAMAL SHARMA',
    Address: 'D-3456 OLD VILLAGE NEAR SCHOOL DELHI 110021',
    MobileNo: '9315319512',
    BPNo: '0910382363',
    PoleNo: 'ALNK430',
    CableSize: '4X25LT',
    CableLength: 'Overhead (22 )',
    PlannerGroup: 'MMG',
    ActivityReason: '03',
  },
  {
    Company: 'BRPL',
    Division: 'S1ALN',
    SubDiv: '2510DDK',
    VendorCode: '2556783',
    CANo: '000154518442',
    OrderNo: '001035367361',
    OrderType: 'ZDIN',
    AccountClass: 'SLCC',
    BasicStartDate: '8/12/2024 12:00:00 AM',
    BasicFinishDate: '8/13/2024 12:00:00 AM',
    Name: 'ANITA SHARMA',
    FatherName: 'S/O KAMAL SHARMA',
    Address: 'D-3456 OLD VILLAGE NEAR SCHOOL DELHI 110021',
    MobileNo: '9315319512',
    BPNo: '0910382363',
    PoleNo: 'ALNK430',
    CableSize: '4X25LT',
    CableLength: 'Overhead (22 )',
    PlannerGroup: 'MMG',
    ActivityReason: '03',
  },
  {
    Company: 'BRPL',
    Division: 'S1ALN',
    SubDiv: '2510DDK',
    VendorCode: '2556783',
    CANo: '000154518442',
    OrderNo: '001035367361',
    OrderType: 'ZDIN',
    AccountClass: 'SLCC',
    BasicStartDate: '8/12/2024 12:00:00 AM',
    BasicFinishDate: '8/13/2024 12:00:00 AM',
    Name: 'ANITA SHARMA',
    FatherName: 'S/O KAMAL SHARMA',
    Address: 'D-3456 OLD VILLAGE NEAR SCHOOL DELHI 110021',
    MobileNo: '9315319512',
    BPNo: '0910382363',
    PoleNo: 'ALNK430',
    CableSize: '4X25LT',
    CableLength: 'Overhead (22 )',
    PlannerGroup: 'MMG',
    ActivityReason: '03',
  },
  {
    Company: 'BRPL',
    Division: 'S1ALN',
    SubDiv: '2510DDK',
    VendorCode: '2556783',
    CANo: '000154518442',
    OrderNo: '001035367361',
    OrderType: 'ZDIN',
    AccountClass: 'SLCC',
    BasicStartDate: '8/12/2024 12:00:00 AM',
    BasicFinishDate: '8/13/2024 12:00:00 AM',
    Name: 'ANITA SHARMA',
    FatherName: 'S/O KAMAL SHARMA',
    Address: 'D-3456 OLD VILLAGE NEAR SCHOOL DELHI 110021',
    MobileNo: '9315319512',
    BPNo: '0910382363',
    PoleNo: 'ALNK430',
    CableSize: '4X25LT',
    CableLength: 'Overhead (22 )',
    PlannerGroup: 'MMG',
    ActivityReason: '03',
  },
  {
    Company: 'BRPL',
    Division: 'S1ALN',
    SubDiv: '2510DDK',
    VendorCode: '2556783',
    CANo: '000154518442',
    OrderNo: '001035367361',
    OrderType: 'ZDIN',
    AccountClass: 'SLCC',
    BasicStartDate: '8/12/2024 12:00:00 AM',
    BasicFinishDate: '8/13/2024 12:00:00 AM',
    Name: 'ANITA SHARMA',
    FatherName: 'S/O KAMAL SHARMA',
    Address: 'D-3456 OLD VILLAGE NEAR SCHOOL DELHI 110021',
    MobileNo: '9315319512',
    BPNo: '0910382363',
    PoleNo: 'ALNK430',
    CableSize: '4X25LT',
    CableLength: 'Overhead (22 )',
    PlannerGroup: 'MMG',
    ActivityReason: '03',
  },
]

const TotalCaseExec = () => {
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
    caseType: 'ORDER BASED'
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

          const existingDivisions = response.data.response;

          // New divisions to add
          const newDivisions = [
            { divCode: 'South', divName: 'SOUTH' },
            { divCode: 'West', divName: 'WEST' },
            { divCode: 'All', divName: 'ALL' }
          ];

          // Combine existing and new divisions
          const allDivisions = [...existingDivisions, ...newDivisions];

          // Set combined divisions
          setDivisions(allDivisions);





          // setDivisions(response.data.response);
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



  // const handleViewClick = async () => {


  //   if (selectedValues.caseType === '' || selectedValues.caseType == null) {

  //     toast.error('Type is Mandatory', {
  //       position: "top-center",
  //       autoClose: 1000,
  //       progress: undefined,
  //     })
  //     return;
  //   }

  //   if (selectedValues.datefrom === '' || selectedValues.datefrom == null) {

  //     toast.error('Date From is Mandatory', {
  //       position: "top-center",
  //       autoClose: 1000,
  //       progress: undefined,
  //     })
  //     return;
  //   }

  //   if (selectedValues.dateTo === '' || selectedValues.dateTo == null) {

  //     toast.error('Date To is Mandatory', {
  //       position: "top-center",
  //       autoClose: 1000,
  //       progress: undefined,
  //     })
  //     return;
  //   }
  //   if (selectedValues.division === '' || selectedValues.division == null) {

  //     toast.error('Division is Mandatory', {
  //       position: "top-center",
  //       autoClose: 1000,
  //       progress: undefined,
  //     })
  //     return;
  //   }
  //   if (selectedValues.order === '' || selectedValues.order == null) {

  //     toast.error('Order Type is Mandatory', {
  //       position: "top-center",
  //       autoClose: 1000,
  //       progress: undefined,
  //     })
  //     return;
  //   }

  //   if (selectedValues.activity === '' || selectedValues.activity == null) {

  //     toast.error('Activity Type is Mandatory', {
  //       position: "top-center",
  //       autoClose: 1000,
  //       progress: undefined,
  //     })
  //     return;
  //   }





  //   const token = sessionStorage.getItem('authToken');
  //   const check = {
  //     userId: "41007656",
  //     pageNumber: 1,
  //     caseType: selectedValues.caseType,
  //     division: selectedValues.division,
  //     orderType: selectedValues.order,
  //     activityType: selectedValues.activity,
  //     dateFrom: selectedValues.datefrom,
  //     dateTo: selectedValues.dateTo,
  //     orderNo: selectedValues.orderno,
  //     ca: selectedValues.caNo,
  //     installerId: selectedValues.installername
  //   }
  //   console.log("rtyu:::", check)
  //   try {
  //     setLoader(true)
  //     const response = await axios.post(TOTALEXECMIS_URL,
  //       {
  //         userId: "41007656",
  //         pageNumber: 1,
  //         caseType: selectedValues.caseType,
  //         division: selectedValues.division,
  //         orderType: selectedValues.order,
  //         activityType: selectedValues.activity,
  //         dateFrom: selectedValues.datefrom,
  //         dateTo: selectedValues.dateTo,
  //         orderNo: selectedValues.orderno,
  //         ca: selectedValues.caNo,
  //         installerId: selectedValues.installername
  //       }
  //       , {
  //         headers: {
  //           Authorization: `Bearer ${token}`, // Include token in Authorization header
  //         }
  //       });
  //     if (response.data) {
  //       setLoader(false)
  //       console.log("test:::", response.data.orderList)
  //       setData(response.data.orderList)

  //     }

  //   } catch (error) {
  //     // setError('Error fetching data'); // Handle errors
  //     setLoader(false)
  //   } finally {
  //     // setLoading(false); // End loading

  //   }
  // };



  //  const handleExcelClick = async () => {


  //     if (selectedValues.caseType === '' || selectedValues.caseType == null) {

  //       toast.error('Type is Mandatory', {
  //         position: "top-center",
  //         autoClose: 1000,
  //         progress: undefined,
  //       })
  //       return;
  //     }

  //     if (selectedValues.datefrom === '' || selectedValues.datefrom == null) {

  //       toast.error('Date From is Mandatory', {
  //         position: "top-center",
  //         autoClose: 1000,
  //         progress: undefined,
  //       })
  //       return;
  //     }

  //     if (selectedValues.dateTo === '' || selectedValues.dateTo == null) {

  //       toast.error('Date To is Mandatory', {
  //         position: "top-center",
  //         autoClose: 1000,
  //         progress: undefined,
  //       })
  //       return;
  //     }
  //     if (selectedValues.division === '' || selectedValues.division == null) {

  //       toast.error('Division is Mandatory', {
  //         position: "top-center",
  //         autoClose: 1000,
  //         progress: undefined,
  //       })
  //       return;
  //     }
  //     if (selectedValues.order === '' || selectedValues.order == null) {

  //       toast.error('Order Type is Mandatory', {
  //         position: "top-center",
  //         autoClose: 1000,
  //         progress: undefined,
  //       })
  //       return;
  //     }

  //     if (selectedValues.activity === '' || selectedValues.activity == null) {

  //       toast.error('Activity Type is Mandatory', {
  //         position: "top-center",
  //         autoClose: 1000,
  //         progress: undefined,
  //       })
  //       return;
  //     }





  //     const token = sessionStorage.getItem('authToken');
  //     const check = {
  //       userId: "41007656",
  //       pageNumber: 1,
  //       caseType: selectedValues.caseType,
  //       division: selectedValues.division,
  //       orderType: selectedValues.order,
  //       activityType: selectedValues.activity,
  //       dateFrom: selectedValues.datefrom,
  //       dateTo: selectedValues.dateTo,
  //       orderNo: selectedValues.orderno,
  //       ca: selectedValues.caNo,
  //       installerId: selectedValues.installername
  //     }
  //     console.log("rtyu:::", check)
  //     try {
  //       setLoader(true)
  //       const response = await axios.post(TOTALEXECMISEXCEL_URL,
  //         {
  //           userId: "41007656",
  //           pageNumber: 1,
  //           caseType: selectedValues.caseType,
  //           division: selectedValues.division,
  //           orderType: selectedValues.order,
  //           activityType: selectedValues.activity,
  //           dateFrom: selectedValues.datefrom,
  //           dateTo: selectedValues.dateTo,
  //           orderNo: selectedValues.orderno,
  //           ca: selectedValues.caNo,
  //           installerId: selectedValues.installername
  //         }
  //         , {
  //           headers: {
  //             Authorization: `Bearer ${token}`, // Include token in Authorization header
  //           }
  //         });
  //       if (response.data) {
  //         setLoader(false)
  //         console.log("test:::", response.data.orderList)
  //         setData(response.data.orderList)

  //       }

  //     } catch (error) {
  //       // setError('Error fetching data'); // Handle errors
  //       setLoader(false)
  //     } finally {
  //       // setLoading(false); // End loading

  //     }
  //   };
  const handleExcelClick = async () => {
    if (selectedValues.caseType === '' || selectedValues.caseType == null) {
      toast.error('Type is Mandatory', {
        position: "top-center",
        autoClose: 1000,
        progress: undefined,
      });
      return;
    }

    if (selectedValues.datefrom === '' || selectedValues.datefrom == null) {
      toast.error('Date From is Mandatory', {
        position: "top-center",
        autoClose: 1000,
        progress: undefined,
      });
      return;
    }

    if (selectedValues.dateTo === '' || selectedValues.dateTo == null) {
      toast.error('Date To is Mandatory', {
        position: "top-center",
        autoClose: 1000,
        progress: undefined,
      });
      return;
    }

    if (selectedValues.division === '' || selectedValues.division == null) {
      toast.error('Division is Mandatory', {
        position: "top-center",
        autoClose: 1000,
        progress: undefined,
      });
      return;
    }
    // if (selectedValues.order === '' || selectedValues.order == null) {
    //   toast.error('Order Type is Mandatory', {
    //     position: "top-center",
    //     autoClose: 1000,
    //     progress: undefined,
    //   });
    //   return;
    // }



    // if (selectedValues.activity === '' || selectedValues.activity == null) {
    //   toast.error('Activity Type is Mandatory', {
    //     position: "top-center",
    //     autoClose: 1000,
    //     progress: undefined,
    //   });
    //   return;
    // }


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


    // Fetch the first page of data
    const processingToastId = toast.loading('Processing... Please wait', {
      position: "top-center",
    });


    const token = sessionStorage.getItem('authToken');
    const decodedToken = jwtDecode(token);
    console.log('Decoded Token:', decodedToken);

    const requestPayload = {
      userId: decodedToken.userId,
      pageNumber: 1,
      caseType: selectedValues.caseType,
      division: selectedValues.division,
      orderType: selectedValues.order,
      activityType: selectedValues.activity,
      dateFrom: selectedValues.datefrom,
      dateTo: selectedValues.dateTo,
      // orderNo: selectedValues.orderno,
      // ca: selectedValues.caNo,
      // installerId: selectedValues.installername

      orderNo: selectedValues.caseType == "LOOSE" ? selectedValues.orderno : selectedValues.orderno == '' ? '' : "00" + selectedValues.orderno,
      ca: selectedValues.caseType == "LOOSE" ? selectedValues.caNo : selectedValues.caNo == "" ? "" : "000" + selectedValues.caNo,
      installerId: selectedValues.installername,
    };

    try {
      setLoader(true);

      const response = await axios.post(TOTALEXECMISEXCEL_URL, requestPayload, {
        responseType: 'blob', // Ensure the response is handled as a blob
        headers: {
          Authorization: `Bearer ${token}`, // Include token in Authorization header
        }
      });

      // Check for successful response and headers
      if (response.status === 200) {
        setCaseType(selectedValues.caseType)

        // Create a URL for the Blob
        const url = window.URL.createObjectURL(new Blob([response.data], { type: response.headers['content-type'] }));

        // Extract the filename from the content-disposition header
        const contentDisposition = response.headers['content-disposition'];
        const filename = contentDisposition ? contentDisposition.split('filename=')[1].split(';')[0].replace(/"/g, '') : 'data.xlsx';

        // Create a link element and click it to trigger the download
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename); // Set the filename
        document.body.appendChild(link);
        link.click();
        link.remove();

        // Clean up the URL object
        window.URL.revokeObjectURL(url);

        // // Optional: Inform the user that the file was downloaded
        // toast.success('File downloaded successfully!', {
        //   position: "top-center",
        //   autoClose: 1000,
        //   progress: undefined,
        // });
        toast.update(processingToastId, {
          render: 'File downloaded successfully!',
          type: "success",
          isLoading: false,
          autoClose: 1000,
        });



      }

      // else{
      //   console.log("dfghj")
      // }

      // else {
      //   // Handle non-200 responses that are not errors
      //   const errorMessage = response.data.message || 'Unexpected error occurred';
      //   toast.update(processingToastId, {
      //     render: errorMessage,
      //     type: "error",
      //     isLoading: false,
      //     autoClose: 1000,
      //   });

      //   console.log('Error::::')
      // }





    } catch (error) {
      // Handle errors
      // console.error('Error during file download:', error);
      // toast.error('Error fetching data', {
      //   position: "top-center",
      //   autoClose: 1000,
      //   progress: undefined,
      // });


      // toast.update(processingToastId, {
      //   render: `Error:${error}`,
      //   type: "error",
      //   isLoading: false,
      //   autoClose: 1000,
      // });


      if (error.response) {
        // The server responded with a status code different from 2xx
        if (error.response.status === 404) {
          // Handle "No Content" scenario
          console.log('No data found.');

          toast.update(processingToastId, {
            render: `No Data Found`,
            type: "error",
            isLoading: false,
            autoClose: 1000,
          });
        } else if (error.response.status === 500) {
          // Handle server errors
          console.error('Server error occurred:', error.response.data);
          toast.update(processingToastId, {
            render: `Error:${error}`,
            type: "error",
            isLoading: false,
            autoClose: 1000,
          });

        } else {
          // Handle other HTTP status codes
          console.error('Request failed with status code:', error.response.status);
          toast.update(processingToastId, {
            render: `Error:${error}`,
            type: "error",
            isLoading: false,
            autoClose: 1000,
          });
        }
      } else {
        // Handle network or other errors
        console.error('An error occurred:', error.message);
      }





    } finally {
      setLoader(false); // End loading
    }
  };






  const handleViewClick = async () => {

    if (selectedValues.caseType === '' || selectedValues.caseType == null) {

      toast.error('Type is Mandatory', {
        position: "top-center",
        autoClose: 1000,
        progress: undefined,
      })
      return;
    }

    if (selectedValues.datefrom === '' || selectedValues.datefrom == null) {

      toast.error('Date From is Mandatory', {
        position: "top-center",
        autoClose: 1000,
        progress: undefined,
      })
      return;
    }

    if (selectedValues.dateTo === '' || selectedValues.dateTo == null) {

      toast.error('Date To is Mandatory', {
        position: "top-center",
        autoClose: 1000,
        progress: undefined,
      })
      return;
    }
    if (selectedValues.division === '' || selectedValues.division == null) {

      toast.error('Division is Mandatory', {
        position: "top-center",
        autoClose: 1000,
        progress: undefined,
      })
      return;
    }


    // if (selectedValues.order === '' || selectedValues.order == null) {

    //   toast.error('Order Type is Mandatory', {
    //     position: "top-center",
    //     autoClose: 1000,
    //     progress: undefined,
    //   })
    //   return;
    // }

    // if (selectedValues.activity === '' || selectedValues.activity == null) {

    //   toast.error('Activity Type is Mandatory', {
    //     position: "top-center",
    //     autoClose: 1000,
    //     progress: undefined,
    //   })
    //   return;
    // }


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

    const token = sessionStorage.getItem('authToken');
    let allData = []; // Initialize an array to hold all fetched data
    let pageNumber = 1;
    const pageSize = 50;

    const decodedToken = jwtDecode(token);
    console.log('Decoded Token:', decodedToken);

    setData([])

    try {
      setLoader(true); // Show loader initially


      // Fetch the first page of data
      const processingToastId = toast.loading('Processing... Please wait', {
        position: "top-center",
      });
      // setCaseType(selectedValues.caseType)
      const response = await axios.post(
        TOTALEXECMIS_URL,
        {
          userId: decodedToken.userId,
          pageNumber: pageNumber,
          caseType: selectedValues.caseType,
          division: selectedValues.division,
          orderType: selectedValues.order,
          activityType: selectedValues.activity,
          dateFrom: selectedValues.datefrom,
          dateTo: selectedValues.dateTo,

          // orderNo: selectedValues.orderno,
          // ca: selectedValues.caNo,
          // installerId: selectedValues.installername,
          orderNo: selectedValues.caseType == "LOOSE" ? selectedValues.orderno : selectedValues.orderno == '' ? '' : "00" + selectedValues.orderno,
          ca: selectedValues.caseType == "LOOSE" ? selectedValues.caNo : selectedValues.caNo == "" ? "" : "000" + selectedValues.caNo,
          installerId: selectedValues.installername,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in Authorization header
          },
        }
      );
      // debugger;
      if (response.data && response.status == 200) {
        setCaseType(selectedValues.caseType)
        const fetchedData = response.data.orderList;
        console.log("page 1:::", fetchedData)
        if (fetchedData.length == 0) {
          // toast.error('No Data Found', {
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
            TOTALEXECMIS_URL,
            {
              userId: decodedToken.userId,
              pageNumber: pageNumber,
              caseType: selectedValues.caseType,
              division: selectedValues.division,
              orderType: selectedValues.order,
              activityType: selectedValues.activity,
              dateFrom: selectedValues.datefrom,
              dateTo: selectedValues.dateTo,
              orderNo: selectedValues.orderno,
              ca: selectedValues.caNo,
              installerId: selectedValues.installername,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`, // Include token in Authorization header
              },
            }
          );

          if (bgResponse.data) {
            const bgFetchedData = bgResponse.data.orderList;
            console.log("page 1:::" + pageNumber + "::::" + bgResponse.data)
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
      else if (response.status == 400&&response.data.message ) {
   
        toast.update(processingToastId, {
          render: response.data.message || 'No Data Found',
          type: "error",
          isLoading: false,
          autoClose: 1000,
        });


    
        setLoader(false);
        return
      }
      else {
        toast.update(processingToastId, {
          render: 'Error occurred while fetching data',
          type: "error",
          isLoading: false,
          autoClose: 1000,
        });

        setLoader(false); 
      }
    } catch (error) {
      toast.update(processingToastId, {
        render: 'Error fetching data: ' + (error.message || 'Unknown error'),
        type: "error",
        isLoading: false,
        autoClose: 1000,
      });
      setLoader(false);
    } finally {
      setLoader(false);

    }


    
  };






  const [order, setOrder] = useState('asc')
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState('')
  const [orderBy, setOrderBy] = useState('Name') // Changed from `orderBy2` to `orderBy`

  // for testing-start
  // const totalPages = Math.ceil(tableExample2.length / rowsPerPage)
  const totalPages = Math.ceil(data.length / rowsPerPage)

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  // const filteredData = tableExample2.filter((item) => {

  //   const lowercasedSearchTerm = searchTerm.toLowerCase()
  //   return (
  //     item.Name.toLowerCase().includes(lowercasedSearchTerm) ||
  //     item.CANo.toLowerCase().includes(lowercasedSearchTerm) ||
  //     item.Division.toLowerCase().includes(lowercasedSearchTerm) ||
  //     item.OrderType.toLowerCase().includes(lowercasedSearchTerm)
  //   )
  // })

  const filteredData = data.filter((item) => {

    const lowercasedSearchTerm = searchTerm.toLowerCase()
    return (
      item.name.toLowerCase().includes(lowercasedSearchTerm) ||
      item.ca.toLowerCase().includes(lowercasedSearchTerm) ||
      item.division.toLowerCase().includes(lowercasedSearchTerm) ||
      item.orderType.toLowerCase().includes(lowercasedSearchTerm)
    )
  })

  const sortedAndFilteredData = filteredData.slice().sort((a, b) => {
    if (orderBy === 'name') {
      return order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    } else if (orderBy === 'ca') {
      return order === 'asc' ? a.ca.localeCompare(b.ca) : b.ca.localeCompare(a.ca)
    } else if (orderBy === 'orderType') {
      return order === 'asc'
        ? a.orderType.localeCompare(b.orderType)
        : b.orderType.localeCompare(a.orderType)
    } else if (orderBy === 'division') {
      return order === 'asc'
        ? a.division.localeCompare(b.division)
        : b.division.localeCompare(a.division)
    }
    return 0
  })
  // const sortedAndFilteredData = filteredData.slice().sort((a, b) => {
  //   if (orderBy === 'Name') {
  //     return order === 'asc' ? a.Name.localeCompare(b.Name) : b.Name.localeCompare(a.Name)
  //   } else if (orderBy === 'CANo') {
  //     return order === 'asc' ? a.CANo.localeCompare(b.CANo) : b.CANo.localeCompare(a.CANo)
  //   } else if (orderBy === 'OrderType') {
  //     return order === 'asc'
  //       ? a.OrderType.localeCompare(b.OrderType)
  //       : b.OrderType.localeCompare(a.OrderType)
  //   } else if (orderBy === 'Division') {
  //     return order === 'asc'
  //       ? a.Division.localeCompare(b.Division)
  //       : b.Division.localeCompare(a.Division)
  //   }
  //   return 0
  // })

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

  return (
    <CRow>
      <ToastContainer

      />
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader className="text-center" style={{ fontSize: '1.3rem' }}>
            {/* <strong>Total Case Execution Report</strong> */}
            <strong>TOTAL CASE EXECUTION REPORT</strong>

          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm={4} className="mb-1">
                <CFormLabel
                  htmlFor="staticEmail"
                  className="col-sm-3 col-form-label"
                  style={textSmallStyle}
                >
                  Type<span className="text-danger">*</span>:
                </CFormLabel>
                <CButtonGroup role="group" aria-label="Basic radio button group">
                  <CFormCheck
                    type="radio"
                    button={{ color: 'danger', variant: 'outline' }}
                    name="btnradio"
                    id="btnradio1"
                    autoComplete="off"
                    value="ORDER BASED"

                    checked={selectedValues.caseType === "ORDER BASED"} // Check if selected
                    onChange={handleRadioChange} // Handle radio change
                    label="Order Based"
                  />
                  <CFormCheck
                    type="radio"
                    button={{ color: 'danger', variant: 'outline' }}
                    name="btnradio"
                    id="btnradio2"
                    autoComplete="off"
                    value="LOOSE"
                    label="Loose"
                    checked={selectedValues.caseType === "LOOSE"} // Check if selected
                    onChange={handleRadioChange} // Handle radio change
                  />
                </CButtonGroup>
              </CCol>

              <CCol sm={4} className="mb-1">
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

              <CCol sm={4} className="mb-1">
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                  <DatePicker
                    label="Activity Date To*"
                    format="DD/MM/YYYY"
                    // style={componentHeightStyle}
                    //another trial

                    value={selectedValues.dateTo}
                    onChange={(newValue) => handleDateChange(newValue, 'dateTo')}
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
                    disableFuture
                  // slots={{
                  //   textField: (params) => (
                  //     <TextField
                  //       {...params}
                  //       sx={{
                  //         width: '100%', // Adjust the width of the input
                  //         '& .MuiInputBase-root': {
                  //           borderRadius: '5px',
                  //           '& input': {
                  //             color: colorModes == 'light' ? 'black' : 'white'

                  //             // color: 'white', // Text color when typing
                  //           },
                  //         },
                  //         '& .MuiInputLabel-root': {
                  //           color: colorModes == 'light' ? 'black' : 'white',

                  //           // color: 'white', // Default label color
                  //           fontSize: '14px', // Label font size
                  //           // Styles for floating label when not focused
                  //           '&.Mui-shrink': {
                  //             color: colorModes == 'light' ? 'black' : 'white',

                  //             // color: 'white', // Color of the floating label when shrunk
                  //           },
                  //           // Ensure label color remains white when not focused
                  //           '&.MuiInputLabel-formControl': {
                  //             color: colorModes == 'light' ? 'black' : 'white',

                  //             // color: 'white', // Color of the label in rest state
                  //           },
                  //         },
                  //         '& .MuiOutlinedInput-root': {
                  //           '& fieldset': {
                  //             borderColor: colorModes == 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'grey',

                  //             // borderColor: 'rgba(255, 255, 255, 0.3)', // Border color
                  //           },
                  //           '&:hover fieldset': {
                  //             borderColor: 'rgba(255, 255, 255, 0.5)', // Border color on hover
                  //           },
                  //           '&.Mui-focused fieldset': {
                  //             // borderColor: 'rgba(255, 255, 255, 0.7)', // Border color when focused
                  //             borderColor: colorModes == 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'grey',

                  //           },
                  //           '& .MuiInputAdornment-root .MuiIconButton-root': {
                  //             color: colorModes == 'light' ? 'black' : 'white',

                  //             // color: 'white', // Icon color
                  //           },
                  //         },
                  //       }}
                  //     />
                  //   ),
                  // }}
                  />
                </LocalizationProvider>
              </CCol>
            </CRow>

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
                      <span style={textSmallStyle}>Order Type</span>{' '}
                      {/* <span className="text-danger">*</span> */}
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
              <CCol sm={4} className="mb-1">
                <CFormSelect
                  id="floatingSelect"
                  floatingLabel={
                    <>
                      <span style={textSmallStyle}>Activity Type</span>{' '}
                      {/* <span className="text-danger">*</span> */}
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
            </CRow>
            <CRow className="mb-1">
              <CCol sm={4}>
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
              </CCol>
              <CCol sm={4}>
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
              <CCol sm={4}>
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
            </CRow>

            <CRow className="justify-content-center">
              <CCol xs={12} sm={6} md={4} lg={3} className="mb-2 d-flex justify-content-center">
                <CButton color="danger" variant="outline" className="w-100" onClick={handleViewClick}>
                  View
                </CButton>
              </CCol>
              <CCol xs={12} sm={6} md={4} lg={3} className="mb-2 d-flex justify-content-center">
                <CButton color="danger" variant="outline" className="w-100" onClick={handleExcelClick}>
                  Excel
                </CButton>
              </CCol>
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
                <CTableHead className="text-nowrap">
                  <CTableRow>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      {/* <CIcon icon={cilPeople} /> */}
                      Company
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
                    <CTableHeaderCell className="bg-body-tertiary">Vendor Code</CTableHeaderCell>
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
                      Order No
                      {/* {orderBy2 === 'Designation' && (order === 'asc' ? '▲' : '▼')} */}
                    </CTableHeaderCell>

                    <CTableHeaderCell
                      className="bg-body-tertiary"
                    // onClick={() => handleSort2('Role')}
                    >
                      Order Type
                      {/* {orderBy2 === 'Role' && (order === 'asc' ? '▲' : '▼')} */}
                    </CTableHeaderCell>
                    <CTableHeaderCell
                      className="bg-body-tertiary"
                    // onClick={() => handleSort2('Status')}
                    >
                      Account Class
                      {/* {orderBy2 === 'Status' && (order === 'asc' ? '▲' : '▼')} */}
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">
                      {/* Password */}
                      Basic Start Date
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">
                      {/* Action */}
                      Basic Finish Date
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">
                      {/* Action */}
                      Name
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">
                      {/* Action */}
                      Father Name
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary"
                      // style={{ width: '300px' }}
                      style={{ paddingLeft: '16px', paddingRight: '16px' }}
                    >
                      {/* Action */}
                      <span style={{ color: '#F3F4F7' }}>*****************</span>Address<span style={{ color: '#F3F4F7' }}>*****************</span>
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">
                      {/* Action */}
                      Mobile No
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">BP No</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Pole No</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Cable Size</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Cable Length</CTableHeaderCell>

                    <CTableHeaderCell className="bg-body-tertiary">Planner Group</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Activity Reason</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>

                <CTableBody>
                  {/* {paginatedData.map((item, index) => (
                  <CTableRow key={index} style={{ fontSize: 10 }}>
                    <CTableDataCell className="text-center">{item.Company}</CTableDataCell>
                    <CTableDataCell className="text-center">{item.Division}</CTableDataCell>

                    <CTableDataCell className="text-center">{item.SubDiv}</CTableDataCell>
                    <CTableDataCell className="text-center">{item.VendorCode}</CTableDataCell>
                    <CTableDataCell className="text-center">{item.CANo}</CTableDataCell>
                    <CTableDataCell className="text-center">{item.OrderNo}</CTableDataCell>
                    <CTableDataCell className="text-center">{item.OrderType}</CTableDataCell>
                    <CTableDataCell className="text-center">{item.AccountClass}</CTableDataCell>

                    <CTableDataCell className="text-center">
                      {moment(item.BasicStartDate).format('DD/MM/YYYY')}
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      {moment(item.BasicFinishDate).format('DD/MM/YYYY')}
                    </CTableDataCell>
                    <CTableDataCell className="text-center">{item.Name}</CTableDataCell>
                    <CTableDataCell className="text-center">{item.FatherName}</CTableDataCell>
                    <CTableDataCell className="text-center"
                      //  style="word-wrap: break-word; width: 300px;"
                      style={{ width: '300px', overflowWrap: 'break-word' }}
                    >{item.Address}</CTableDataCell>
                    <CTableDataCell className="text-center">{item.MobileNo}</CTableDataCell>
                    <CTableDataCell className="text-center">{item.BPNo}</CTableDataCell>
                    <CTableDataCell className="text-center">{item.PoleNo}</CTableDataCell>
                    <CTableDataCell className="text-center">{item.CableSize}</CTableDataCell>
                    <CTableDataCell className="text-center">{item.CableLength}</CTableDataCell>
                    <CTableDataCell className="text-center">{item.PlannerGroup}</CTableDataCell>
                    <CTableDataCell className="text-center">{item.ActivityReason}</CTableDataCell>
                  </CTableRow>
                ))} */}

                  {paginatedData.map((item, index) => (
                    <CTableRow key={index} style={{ fontSize: 10 }}>
                      <CTableDataCell className="text-center">{item.companyCode}</CTableDataCell>
                      <CTableDataCell className="text-center">{item.division}</CTableDataCell>

                      <CTableDataCell className="text-center">{item.subDiv == "" || item.subDiv == null ? "NA" : item.subDiv}</CTableDataCell>
                      <CTableDataCell className="text-center">{item.vendorCode}</CTableDataCell>
                      <CTableDataCell className="text-center">{item.ca}</CTableDataCell>
                      <CTableDataCell className="text-center">{item.orderId}</CTableDataCell>
                      <CTableDataCell className="text-center">{item.orderType}</CTableDataCell>
                      <CTableDataCell className="text-center">{caseType == 'LOOSE' ? 'NA' : item.accountClass}</CTableDataCell>

                      <CTableDataCell className="text-center">
                        {moment(item.startDate, 'DD-MM-YYYY HH:mm:ss').format('DD/MM/YYYY')}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        {caseType == 'LOOSE' ? 'NA' : moment(item.finishDate, 'DD-MM-YYYY HH:mm:ss').format('DD/MM/YYYY')}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">{caseType == 'LOOSE' ? item.consumerName : item.name}</CTableDataCell>
                      <CTableDataCell className="text-center">{caseType == 'LOOSE' ? 'NA' : item.fatherName}</CTableDataCell>
                      <CTableDataCell className="text-center"
                        //  style="word-wrap: break-word; width: 300px;"
                        style={{ width: '300px', overflowWrap: 'break-word' }}
                      >{item.address == "" ? "NA" : item.address}</CTableDataCell>
                      <CTableDataCell className="text-center">{item.telNo == "" || item.telNo == null ? "NA" : item.telNo}</CTableDataCell>
                      <CTableDataCell className="text-center">{item.bpNo == "" || item.bpNo == null ? "NA" : item.bpNo}</CTableDataCell>
                      <CTableDataCell className="text-center">{item.poleNo == "" || item.poleNo == null ? "NA" : item.poleNo}</CTableDataCell>
                      <CTableDataCell className="text-center">{item.cableSize == "" || item.cableSize == null ? "NA" : item.cableSize}</CTableDataCell>
                      <CTableDataCell className="text-center">{item.CableLength == "" || item.CableLength == null ? "NA" : item.cableLength}</CTableDataCell>
                      <CTableDataCell className="text-center">{item.plannerGroup == "" || item.plannerGroup == null ? "NA" : item.plannerGroup}</CTableDataCell>
                      <CTableDataCell className="text-center">{item.ActivityReason == "" || item.ActivityReason == null ? "NA" : item.activityReason}</CTableDataCell>
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

export default TotalCaseExec
