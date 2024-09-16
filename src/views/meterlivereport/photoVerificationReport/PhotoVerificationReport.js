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
import { ACTIVITYTYPE_URL, DIVISION_URL, DMS_BASE64_URL, DMS_TOKEN_URL, ORDERTYPE_URL, PHOTO_VERIFICATION_REPORT, PHOTOUPLOAD_URL, PHOTOUPLOADEXCEL_URL, TOTALEXECMIS_URL, TOTALEXECMISEXCEL_URL } from '../../../utils/ConstantURL'
import { IoMdDownload } from "react-icons/io";
import { useSelector } from 'react-redux'



const PhotoVerificationReport = () => {
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


  const [divisions, setDivisions] = useState([]);
  const [orderTypes, setOrderTypes] = useState([]);
  const [activityTypes, setActivityTypes] = useState([]);
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false)




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
    if (selectedValues.order === '' || selectedValues.order == null) {
      toast.error('Order Type is Mandatory', {
        position: "top-center",
        autoClose: 1000,
        progress: undefined,
      });
      return;
    }

    if (selectedValues.activity === '' || selectedValues.activity == null) {
      toast.error('Activity Type is Mandatory', {
        position: "top-center",
        autoClose: 1000,
        progress: undefined,
      });
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
      orderNo: selectedValues.orderno,
      ca: selectedValues.caNo,
      installerId: selectedValues.installername
    };

    try {
      setLoader(true);

      const response = await axios.post(PHOTOUPLOADEXCEL_URL, requestPayload, {
        responseType: 'blob', // Ensure the response is handled as a blob
        headers: {
          Authorization: `Bearer ${token}`, // Include token in Authorization header
        }
      });

      // Check for successful response and headers
      if (response.status === 200) {
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

        // Optional: Inform the user that the file was downloaded
        toast.success('File downloaded successfully!', {
          position: "top-center",
          autoClose: 1000,
          progress: undefined,
        });
      } else {
        throw new Error('Unexpected response status');
      }
    } catch (error) {


      // Handle errors
      // console.error('Error during file download:', error);
      // toast.error('Error fetching data', {
      //   position: "top-center",
      //   autoClose: 1000,
      //   progress: undefined,
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


    // if (selectedValues.caseType === '' || selectedValues.caseType == null) {
    //   toast.error('Type is Mandatory', {
    //     position: "top-center",
    //     autoClose: 1000,
    //     progress: undefined,
    //   });
    //   return;
    // }

    // if (selectedValues.datefrom === '' || selectedValues.datefrom == null) {
    //   toast.error('Date From is Mandatory', {
    //     position: "top-center",
    //     autoClose: 1000,
    //     progress: undefined,
    //   });
    //   return;
    // }

    // if (selectedValues.dateTo === '' || selectedValues.dateTo == null) {
    //   toast.error('Date To is Mandatory', {
    //     position: "top-center",
    //     autoClose: 1000,
    //     progress: undefined,
    //   });
    //   return;
    // }

    // if (selectedValues.division === '' || selectedValues.division == null) {
    //   toast.error('Division is Mandatory', {
    //     position: "top-center",
    //     autoClose: 1000,
    //     progress: undefined,
    //   });
    //   return;
    // }

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

    // if (selectedValues.caseType === 'LOOSE' && selectedValues.order == 'ZDIN') {
    //   toast.error('ZDIN not available for Loose Case Type', {
    //     position: "top-center",
    //     autoClose: 1000,
    //     progress: undefined,
    //   });
    //   return;
    // }

    // const dateFrom = new Date(selectedValues.datefrom);
    // const dateTo = new Date(selectedValues.dateTo);

    // if (dateFrom > dateTo) {
    //   toast.error('Date From should be less than Date To', {
    //     position: "top-center",
    //     autoClose: 1000,
    //     progress: undefined,
    //   });
    //   return;
    // }



    const token = sessionStorage.getItem('authToken');
    const decodedToken = jwtDecode(token);

    let pageNumber = 1;
    const pageSize = 50;
    const processingToastId = toast.loading('Processing... Please wait', {
      position: "top-center",
    });

    try {
      setLoader(true); // Show loader initially
      setData([]); // Clear previous data before starting new fetch
      // Show a "processing" toast before starting the API call


      while (true) {
        const response = await axios.post(
          PHOTO_VERIFICATION_REPORT,
          {
            //pagination need to end on backend
            // pageNumber: pageNumber,


            division: selectedValues.division,
            caNumber: selectedValues.caNo,
            orderNo: selectedValues.orderno,
            orderType: selectedValues.order,
            verificationDateFrom: selectedValues.datefrom,
            verificationDateTo: selectedValues.dateTo,
            activityType: selectedValues.activity,
            case: selectedValues.caseType,
            userId: decodedToken.userId
          },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include token in Authorization header
            },
          }
        );

        if (response.data && response.status === 200) {
          const fetchedData = response.data.vData;

          if (fetchedData.length === 0 && pageNumber === 1) {
            // toast.error('No Data Found', {
            //   position: "top-center",
            //   autoClose: 1000,
            //   progress: undefined,
            // });
            console.log("test1121")
            toast.update(processingToastId, {
              render: 'No Data Found',
              type: "error",
              isLoading: false,
              autoClose: 1000,
            });
            setLoader(false);
            return;
          }

          setData((prevData) => [...prevData, ...fetchedData]); // Append new data to the existing data

          // Stop the loader after the first batch of data is fetched
          if (pageNumber === 1) {
            setLoader(false);
          }

          // If the fetched data size is less than the page size, no need to fetch more
          if (fetchedData.length < pageSize) {
            break;
          }

          pageNumber++; // Increment page number for next fetch
        }
        else if (response.status == 400 && response.status.message) {

          // Successfully fetched all data
          toast.update(processingToastId, {
            render: 'Data fetched successfully',
            type: "success",
            isLoading: false,
            autoClose: 1000,
          });
          return
        }
        else {

          toast.update(processingToastId, {
            render: 'Error fetching data',
            type: "error",
            isLoading: false,
            autoClose: 1000,
          });

          // If an error or no data in the response, stop fetching
          setLoader(false);
          break;
        }
      }

      // Successfully fetched all data
      toast.update(processingToastId, {
        render: 'Data fetched successfully',
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });

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
      item.caNumber.toLowerCase().includes(lowercasedSearchTerm) ||
      item.orderNo.toLowerCase().includes(lowercasedSearchTerm) ||
      item.orderType.toLowerCase().includes(lowercasedSearchTerm) ||
      item.division.toLowerCase().includes(lowercasedSearchTerm)
    )
  })

  const sortedAndFilteredData = filteredData.slice().sort((a, b) => {
    if (orderBy === 'caNumber') {
      return order === 'asc' ? a.caNumber.localeCompare(b.caNumber) : b.caNumber.localeCompare(a.caNumber)
    } else if (orderBy === 'orderNo') {
      return order === 'asc' ? a.orderNo.localeCompare(b.orderNo) : b.orderNo.localeCompare(a.orderNo)
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

  //test

  const images = [
    { id: 1, src: 'https://via.placeholder.com/150/0000FF/808080?text=Image+1', title: 'Image 1' },
    { id: 2, src: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Image+2', title: 'Image 2' },
    { id: 3, src: 'https://via.placeholder.com/150/00FF00/000000?text=Image+3', title: 'Image 3' },
    { id: 4, src: 'https://via.placeholder.com/150/FFFF00/000000?text=Image+4', title: 'Image 4' },
    { id: 5, src: 'https://via.placeholder.com/150/FF00FF/FFFFFF?text=Image+5', title: 'Image 5' },
  ];
  // State to manage selected image
  // const [selectedImage, setSelectedImage] = useState(images[0]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  console.log("test::::123:::", selectedItem)
  // useEffect(() => {

  //   selectedImage



  // }, [selectedItem])




  const [token, setToken] = useState(null);
  const [cookie, setCookie] = useState(null);

  const [error, setError] = useState(null);



  const [mamsImages, setMamsImages] = useState([]);


  const mapDataToImages = (data) => {
    return [
      { id: 1, src: data.cancelImageDocId, title: 'Cancel Image' },
      { id: 2, src: data.cancellationNoticeDocId, title: 'Cancellation Notice Image' },
      { id: 3, src: data.labTestingDocId, title: 'Lab Testing Image' },
      { id: 4, src: data.labTestingNoticeDocId, title: 'Lab Testing Notice Image' },
      { id: 5, src: data.mcrImageDocId, title: 'MCR Image' },
      { id: 6, src: data.meterAfterActivityDocId, title: 'Meter After Activity Image' },
      { id: 7, src: data.meterBeforeActivityDocId, title: 'Meter Before Activity Image' },
      { id: 8, src: data.nearbyMtr1DocId, title: 'Nearby Meter 1 Image' },
      { id: 9, src: data.nearbyMtr2DocId, title: 'Nearby Meter 2 Image' },
      { id: 10, src: data.newMeterDocId, title: 'New Meter Image' },
      { id: 11, src: data.oldMeterGunnyDocId, title: 'Gunny bag Image' },
      { id: 12, src: data.oldMeterReadingDocId, title: 'Old Meter Image' },
      { id: 13, src: data.poleBusbarDocId, title: 'Pole Busbar Image' },
    ].filter(image => image.src); // Filter out images with empty src
  };

  // const handleImageClick = async (image) => {
  //   if (image.src) {
  //     // Fetch base64 image
  //     const base64Image = await fetchBase64Image(image.src);

  //     if (base64Image) {
  //       // Update the selected image with the base64 data
  //       setSelectedImage({
  //         ...image,
  //         src: `data:image/png;base64,${base64Image}`, // Assuming the image is PNG, adjust accordingly
  //       });
  //     }
  //   }
  // };

  const handleImageClick = async (image) => {
    console.log("actual img:::", image)
    if (image.src.startsWith('data:image')) {
      // Image already has base64 data, just set it as selected
      setSelectedImage(image);
    } else if (image.src) {
      // Fetch base64 image if not already fetched
      console.log("test::::::img", image)
      console.log("test::::::img_src", image.src)

      const base64Image = await fetchBase64Image(image.src);

      if (base64Image) {
        const updatedImage = {
          ...image,
          src: `data:image/png;base64,${base64Image}`, // Assuming the image is PNG, adjust accordingly
        };
        setSelectedImage(updatedImage);

        // Update mamsImages with the new base64 data to avoid future API calls
        setMamsImages((prevImages) =>
          prevImages.map((img) => (img.id === image.id ? updatedImage : img))
        );
      }
    }
  };


  const handleButtonClick = async (item) => {
    // Map the data to the mamsImages format
    const images = mapDataToImages(item);
    console.log("item---test::::::----", item)
    setMamsImages(images);

    // Optionally set the first image as selected and fetch the base64 data
    if (images.length > 0) {
      await handleImageClick(images[0]);
    }

    setImageGallery(true);
  };
  // const handleButtonClick = (item) => {
  //   // Map the data to the mamsImages format
  //   const images = mapDataToImages(item);
  //   console.log("item---test::::::----", item)
  //   setMamsImages(images);
  //   setSelectedImage(images[0]); 
  //   console.log("item---test::++++++++++++::::----", images[0])

  //   // Optionally set the first image as selected
  //   setImageGallery(true);
  // };

  const fetchBase64Image = async (docId) => {
    try {
      const toastId = toast.info('Fetching image...', {
        autoClose: false, // Keep the toast open until it's manually closed
      });
      const response = await axios.post(DMS_BASE64_URL,
        {
          TokenKey: `${token}`,
          Cookiee: `${cookie}`,
          DocumentID: `${docId}`
        }

      );
      // Success toast
      toast.update(toastId, {
        render: 'Image fetched successfully!',
        type: 'success',
        autoClose: 5000, // Auto close after 5 seconds
      });
      return response.data.Result;
    } catch (error) {
      console.error('Error fetching base64 image:', error);
      // Error toast
      toast.update(toastId, {
        render: 'Error fetching image!',
        type: 'error',
        autoClose: 5000, // Auto close after 5 seconds
      });

      return null;
    }
  };


  // const downloadImage = (src) => {
  //   // Function to handle image download
  //   console.log('Download image:', src);
  // };

  // const downloadAllImages = () => {
  //   // Function to handle downloading all images
  //   console.log('Download all images');
  // };


  ///earlier code:::::
  // const downloadImage = (src) => {
  //   const link = document.createElement('a');
  //   link.href = src;
  //   link.download = 'image.png';
  //   link.click();
  // };

  // const downloadAllImages = () => {
  //   mamsImages.forEach(image => {
  //     if (image.src.startsWith('data:image')) {
  //       downloadImage(image.src);
  //     }
  //   });
  // };


  const downloadImage = (src, filename) => {
    const link = document.createElement('a');
    link.href = src;
    link.download = filename;
    link.click();
  };

  const downloadAllImages = () => {
    mamsImages.forEach(image => {
      if (image.src.startsWith('data:image')) {
        // Generate filename based on the image title, or default to 'image.png'
        const filename = image.title ? `${image.title}.png` : 'image.png';
        downloadImage(image.src, filename);
      }
    });
  };



  useEffect(() => {
    const fetchToken = async () => {
      try {
        // Make the POST request with axios
        const response = await axios.post(
          DMS_TOKEN_URL,
          {
            Key: "!@B$E$#RK@!",
            KeySource: "RAKSHAK",
            Application: "Raskshak"
          }
        );
        if (response.status == 200) {
          // Handle the response data
          console.log("test:::::::::++++++++++", response.data)

          setToken(response.data.Key);
          setCookie(response.data.Result);
        }

      } catch (err) {
        // Handle any errors
        // setError(err.message);
      }
    };



    fetchToken();
  }, []);


  const handleClose = () => {
    setMamsImages([]); // Clear images data
    setSelectedImage(null); // Clear selected image
    setImageGallery(false); // Close the modal
  };







  return (
    <CRow>
      <ToastContainer
      />


      <CModal
        size="lg"
        visible={imageGallery}
        // onClose={() => setImageGallery(false)}
        onClose={() => handleClose()}
        aria-labelledby="imageGalleryModal"
      >
        <CModalHeader closeButton>
          <CModalTitle id="imageGalleryModal" className="text-center w-100">Image Gallery</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol xs={4}>
              <CListGroup>
                {mamsImages.map((image) => (
                  <CListGroupItem
                    key={image.id}
                    action
                    active={image.id === (selectedImage?.id || -1)}
                    // onClick={() => setSelectedImage(image)}
                    onClick={() => handleImageClick(image)} // Update click handler here
                  >
                    {image.title}
                  </CListGroupItem>
                ))}
              </CListGroup>
            </CCol>
            <CCol xs={8}>
              {/* {selectedImage && (
                <div className="text-center">
                  <h5 >{selectedImage.title}</h5>
                  <CImage src={selectedImage.src} alt={selectedImage.title} fluid />
                  <CButton color="primary" 
                  onClick={() => downloadImage(selectedImage.src,selectedImage.title)}
                  >
                    Download
                  </CButton>
                  <CButton color="secondary" 
                 
                  onClick={() => {
                    console.log('Selected Image Src:', selectedImage?.src); // Debugging
                    if (selectedImage?.src) {
                      window.open(selectedImage.src, '_blank');
                    } else {
                      console.error('Selected image source is missing or invalid.');
                    }
                  }}
                  >
                    View
                  </CButton>
                </div>
              )} */}


              {selectedImage && (
                <div>
                  {/* Row for title and buttons */}
                  <CRow className="align-items-center mb-3">
                    <CCol xs={12} md={6} className="d-flex align-items-center">
                      <h5 className="mb-0">{selectedImage.title}</h5>
                    </CCol>
                    <CCol xs={12} md={6} className="d-flex justify-content-end">
                      <CButton color="primary" onClick={() => downloadImage(selectedImage.src, selectedImage.title)}>
                        <IoMdDownload className="me-2" />Download
                      </CButton>
                      {/* <CButton color="secondary" className="ms-2" onClick={() => {
                          console.log('Selected Image Src:', selectedImage?.src); // Debugging
                          if (selectedImage?.src) {
                            window.open(selectedImage.src, '_blank');
                          } else {
                            console.error('Selected image source is missing or invalid.');
                          }
                        }}>
                          View
                        </CButton> */}
                    </CCol>
                  </CRow>
                  {/* Row for image */}
                  <CRow>
                    <CCol xs={12}>
                      <CImage src={selectedImage.src} alt={selectedImage.title} fluid />
                    </CCol>
                  </CRow>
                </div>
              )}
            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={downloadAllImages}>
            Download All
          </CButton>
          <CButton color="secondary"
            // onClick={() => setImageGallery(false)}
            onClick={() => handleClose()}
          >
            Close
          </CButton>
        </CModalFooter>
      </CModal>




      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader className="text-center" style={{ fontSize: '1.3rem' }}>
            {/* <strong>Total Case Execution Report</strong> */}
            <strong>PHOTO VERIFICATION REPORT</strong>

          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm={4} className="mb-1">
                <CFormLabel
                  htmlFor="staticEmail"
                  className="col-sm-3 col-form-label"
                  style={textSmallStyle}
                >
                  <strong>Type</strong>    <span className="text-danger">*</span>:
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

                  <CFormCheck
                    type="radio"
                    button={{ color: 'danger', variant: 'outline' }}
                    name="btnradio"
                    id="btnradio3"
                    autoComplete="off"
                    value="NON-TAB"
                    label="Non-Tab"
                    checked={selectedValues.caseType === "NON-TAB"} // Check if selected
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
                                // color: 'white', // Text color when typing
                                // handling dark theme
                                color: colorModes == 'light' ? 'black' : 'white'

                              },
                            },
                            '& .MuiInputLabel-root': {
                              // handling dark theme
                              color: colorModes == 'light' ? 'black' : 'white',
                              // color: 'white', // Default label color
                              fontSize: '14px', // Label font size
                              // Styles for floating label when not focused
                              '&.Mui-shrink': {
                                // color: 'white', // Color of the floating label when shrunk
                                // handling dark theme
                                color: colorModes == 'light' ? 'black' : 'white',
                              },
                              // Ensure label color remains white when not focused
                              '&.MuiInputLabel-formControl': {
                                // color: 'white', // Color of the label in rest state
                                // handling dark theme
                                color: colorModes == 'light' ? 'black' : 'white',
                              },
                            },
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': {
                                // borderColor: 'rgba(255, 255, 255, 0.3)', // Border color
                                borderColor: colorModes == 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'grey',
                                // handling dark theme
                                //  borderColor: colorModes == 'light' ? rgba(255, 255, 255, 0.1) : rgba(255, 255, 255, 0.3),
                              },
                              '&:hover fieldset': {
                                // borderColor: 'rgba(255, 255, 255, 0.5)', // Border color on hover
                                // borderColor: 'rgba(255, 255, 255, 0.5)',
                                borderColor: colorModes == 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'grey',
                                // handling dark theme
                                // borderColor: colorModes == 'light' ? rgba(255, 255, 255, 0.1) : rgba(255, 255, 255, 0.3),
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: colorModes == 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'grey', // Border color when focused
                                // handling dark theme
                                // borderColor: colorModes == 'light' ? rgba(255, 255, 255, 0.1) : rgba(255, 255, 255, 0.3),
                              },
                              '& .MuiInputAdornment-root .MuiIconButton-root': {
                                // color: 'white', // Icon color
                                // handling dark theme
                                color: colorModes == 'light' ? 'black' : 'white',
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
                    disableFuture
                    slots={{
                      textField: (params) => (
                        <TextField
                          {...params}
                          sx={{
                            width: '100%', // Adjust the width of the input
                            '& .MuiInputBase-root': {
                              borderRadius: '5px',
                              '& input': {
                                // color: 'white', // Text color when typing
                                color: colorModes == 'light' ? 'black' : 'white'
                              },
                            },
                            '& .MuiInputLabel-root': {
                              // color: 'white', // Default label color
                              color: colorModes == 'light' ? 'black' : 'white',

                              fontSize: '14px', // Label font size
                              // Styles for floating label when not focused
                              '&.Mui-shrink': {
                                // color: 'white', // Color of the floating label when shrunk
                                color: colorModes == 'light' ? 'black' : 'white',

                              },
                              // Ensure label color remains white when not focused
                              '&.MuiInputLabel-formControl': {
                                // color: 'white', // Color of the label in rest state
                                color: colorModes == 'light' ? 'black' : 'white',

                              },
                            },
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': {
                                // borderColor: 'rgba(255, 255, 255, 0.3)', // Border color
                                borderColor: colorModes == 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'grey',

                              },
                              '&:hover fieldset': {
                                // borderColor: 'rgba(255, 255, 255, 0.5)', // Border color on hover
                                borderColor: colorModes == 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'grey',

                              },
                              '&.Mui-focused fieldset': {
                                borderColor: colorModes == 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'grey', // Border color when focused

                                // borderColor: 'rgba(255, 255, 255, 0.7)', // Border color when focused
                              },
                              '& .MuiInputAdornment-root .MuiIconButton-root': {
                                // color: 'white', // Icon color
                                color: colorModes == 'light' ? 'black' : 'white',

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
              <CCol sm={4} className="mb-1">
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
                      Verification Date
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">
                      {/* Action */}
                      Verified By                    </CTableHeaderCell>


                  </CTableRow>
                </CTableHead>

                <CTableBody>


                  {paginatedData.map((item, index) => (
                    <CTableRow key={index} style={{ fontSize: 10 }}>
                      <CTableDataCell className="text-center">
                        {selectedValues.caseType || "NA"}
                      </CTableDataCell>

                      <CTableDataCell className="text-center">
                        {item.activityDate ? moment(item.activityDate, 'DD-MM-YYYY HH:mm:ss').format('DD/MM/YYYY') : "NA"}
                      </CTableDataCell>

                      <CTableDataCell className="text-center">
                        {item.division || "NA"}
                      </CTableDataCell>

                      <CTableDataCell className="text-center">
                        {item.orderNo || "NA"}
                      </CTableDataCell>

                      <CTableDataCell className="text-center">
                        {item.caNumber || "NA"}
                      </CTableDataCell>

                      <CTableDataCell className="text-center">
                        {item.orderType || "NA"}
                      </CTableDataCell>

                      <CTableDataCell className="text-center">
                        {item.activityType || "NA"}
                      </CTableDataCell>

                      <CTableDataCell className="text-center">
                        {item.meterNo || "NA"}
                      </CTableDataCell>

                      <CTableDataCell className="text-center">
                        {item.oldMeterNo ? item.oldMeterNo : "NA"}
                      </CTableDataCell>

                      <CTableDataCell className="text-center">
                        {item.gunnyBagNo ? item.gunnyBagNo : "NA"}
                      </CTableDataCell>

                      <CTableDataCell className="text-center">
                        {item.linemanName || "NA"}
                      </CTableDataCell>

                      <CTableDataCell className="text-center">
                        {item.verificationDate ? moment(item.verificationDate, 'DD-MM-YYYY HH:mm:ss').format('DD/MM/YYYY') : "NA"}
                      </CTableDataCell>

                      <CTableDataCell className="text-center">
                        {item.punchBy || "NA"}
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

export default PhotoVerificationReport








