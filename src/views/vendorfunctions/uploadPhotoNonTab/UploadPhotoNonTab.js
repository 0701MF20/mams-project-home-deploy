import React, { useState, useEffect } from 'react'
import CIcon from '@coreui/icons-react'

import {
    CAlert,
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
    cibTwitter,
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
import axios, { Axios } from 'axios'
import '../../../scss/custom-coreui.scss'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import moment from 'moment'
import { TextField } from '@mui/material';
import { ACTIVITYTYPE_URL, DIVISION_URL, DMS_BASE64_URL, DMS_TOKEN_URL, ORDERTYPE_URL, PHOTOUPLOAD_URL, PHOTOUPLOADEXCEL_URL, TOTALEXECMIS_URL, TOTALEXECMISEXCEL_URL, UPLOAD_NON_TAB_DATA } from '../../../utils/ConstantURL'
import { IoMdDownload } from "react-icons/io";
import { useSelector } from 'react-redux'
import { generateDocumentId } from '../../../utils/functions';



const UploadPhotoNonTab = () => {
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

    });


    const [selectedImages, setSelectedImages] = useState({
        // newMtrImg: '',
        // poleBBCblImg: '',
        // oldMtrReadImg: '',
        // OldMtrGunnyImg: '',
        // mtrBefActImg: '',
        // mtrAfterActImg: '',
        // mcrImg: '',
        // labNtcImg: '',
        // cancelNtcImg: ''
    });


    // const [selectedValues, setSelectedValues] = useState({
    //     division: '',
    //     order: '',
    //     activity: '',
    //     installername: '',
    //     caNo: '',
    //     orderno: '',
    //     datefrom: null,
    //     dateTo: null,
    //     caseType: '',
    //     meterno: ''
    // });

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


    const imageFieldMappings = {
        newMtrImg: "New Meter Photograph With Background",
        poleBBCblImg: "PoleBusbar End Cable Connection",
        oldMtrReadImg: "Old Meter Photograph with Reading",
        OldMtrGunnyImg: "Old Meter Photograph With Gunny Bag",
        mtrBefActImg: "Meter Photograph with Background Before Activity",
        mtrAfterActImg: "Meter Photograph With Background After Activity",
        mcrImg: "MCR Photograph",
        labNtcImg: "Lab Notice Photograph",
        cancelNtcImg: "Cancellation Notice Photograph",
    };



    const [imageFields, setImageFields] = useState({});

    // Function to create and set imageFields
    const logImageFields = () => {
        const updatedImageFields = Object.keys(imageFieldMappings).reduce((acc, field) => {
            acc[field] = selectedImages[imageFieldMappings[field]] ?? ''; // Use nullish coalescing to handle undefined values
            return acc;
        }, {});

        setImageFields(updatedImageFields);
        console.log("Image Fields:", updatedImageFields);
    };

    // Call the function whenever selectedImages change
    useEffect(() => {
        logImageFields();
    }, [selectedImages]);








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
            item.caseType.toLowerCase().includes(lowercasedSearchTerm) ||
            item.division.toLowerCase().includes(lowercasedSearchTerm) ||
            item.orderId.toLowerCase().includes(lowercasedSearchTerm) ||
            item.caNo.toLowerCase().includes(lowercasedSearchTerm)
        )
    })

    const sortedAndFilteredData = filteredData.slice().sort((a, b) => {
        if (orderBy === 'caseType') {
            return order === 'asc' ? a.caseType.localeCompare(b.caseType) : b.caseType.localeCompare(a.caseType)
        } else if (orderBy === 'division') {
            return order === 'asc' ? a.division.localeCompare(b.ca) : b.division.localeCompare(a.ca)
        } else if (orderBy === 'orderId') {
            return order === 'asc'
                ? a.orderId.localeCompare(b.orderId)
                : b.orderId.localeCompare(a.orderId)
        } else if (orderBy === 'caNo') {
            return order === 'asc'
                ? a.caNo.localeCompare(b.caNo)
                : b.caNo.localeCompare(a.caNo)
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




    const [token, setToken] = useState('');
    const [cookie, setCookie] = useState('');

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

            const tokeni = sessionStorage.getItem('authToken');
            const decodedToken = jwtDecode(tokeni);

            const toastId = toast.info('Fetching image...', {
                autoClose: false, // Keep the toast open until it's manually closed
            });
            const response = await axios.post(DMS_BASE64_URL,
                {
                    userId: decodedToken.userId,
                    TokenKey: `${token}`,
                    Cookiee: `${cookie}`,
                    DocumentID: `${docId}`
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include token in Authorization header
                    },
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

                const tokeni = sessionStorage.getItem('authToken');
                const decodedToken = jwtDecode(tokeni);
                console.log('Decoded Token:', decodedToken);

                const data = {
                    userId: decodedToken.userId,
                    key: "!@B$E$#RK@!",
                    keySource: "RAKSHAK",
                    application: "Raskshak"
                }
                console.log("dfghjkl:", data, decodedToken.userId)
                console.log("dfghssssssssjkl:", token)

                // Make the POST request with axios
                const response = await axios.post(
                    DMS_TOKEN_URL,
                    {
                        userId: decodedToken.userId,
                        key: "!@B$E$#RK@!",
                        keySource: "RAKSHAK",
                        application: "Raskshak"
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${tokeni}`, // Include token in Authorization header
                        },
                    }
                );
                if (response.status == 200) {
                    // Handle the response data
                    console.log("test:::::::::++++++++++mmmmmmmmmmmmmmmmmmm", response.data)

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




    const [modalVisible, setModalVisible] = useState(false);

    // const toggleModal = () => {
    //     setModalVisible(!modalVisible);
    // };

    const toggleModal = () => {
        setModalVisible(false);
    };
    const [hoveredCategory, setHoveredCategory] = useState(null); // To track hovered category


    const imageCategories = [
        'New Meter Photograph With Background',
        'PoleBusbar End Cable Connection',
        'Old Meter Photograph with Reading',
        'Old Meter Photograph With Gunny Bag',
        'Meter Photograph with Background Before Activity',
        'Meter Photograph With Background After Activity',
        'MCR Photograph',
        'Lab Notice Photograph',
        'Cancellation Notice Photograph',
    ];
    const handleUploadClick = (category) => {
        // Handle the image upload functionality here
        console.log(`Upload clicked for ${category}`);
        // You can add file input and upload logic here
    };
    console.log("test11111111111", modalVisible)




    // const [selectedImagesB64, setSelectedImagesB64] = useState({
    //     newMtrImg: '',
    //     poleBBCblImg: '',
    //     oldMtrReadImg: '',
    //     OldMtrGunnyImg: '',
    //     mtrBefActImg: '',
    //     mtrAfterActImg: '',
    //     mcrImg: '',
    //     labNtcImg: '',
    //     cancelNtcImg: ''
    // });
    console.log("image doc_id:::", selectedImages)


    const [uploadStatus, setUploadStatus] = useState({});

    const handleImageUpload = async (category) => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';

        fileInput.onchange = async () => {
            const file = fileInput.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onloadend = async () => {
                    const base64String = reader.result.split(',')[1]; // Convert to base64
                    console.log("base:::", base64String)
                    // Use category as the file name for the API call
                    const fileName = category;
                    console.log("filename:::", fileName)
                    // Call the API function to upload the image and get the document ID
                    const documentId = await generateDocumentId(token, cookie, base64String, fileName);
                    console.log("doc:::", documentId)

                    if (documentId) {
                        setSelectedImages((prevState) => ({
                            ...prevState,
                            [category]: documentId,  // Store the document ID
                        }));

                        // Mark upload as complete for this category
                        setUploadStatus((prevState) => ({
                            ...prevState,
                            [category]: 'completed'
                        }));
                        toast.success(`${fileName} Selected`, {
                            position: "top-right",
                            autoClose: 1000,
                            progress: undefined,
                        });
                    } else {
                        console.error('Upload failed');
                        toast.success(`Selected Image Upload Failed`, {
                            position: "top-right",
                            autoClose: 1000,
                            progress: undefined,
                        });
                    }
                };
                reader.readAsDataURL(file); // Convert file to base64 string
            }
        };

        fileInput.click();
    };

    const handleDelete = (category) => {
        // Reset the document ID and upload status
        setSelectedImages((prevState) => ({
            ...prevState,
            [category]: '', // Clear the document ID
        }));

        setUploadStatus((prevState) => ({
            ...prevState,
            [category]: '', // Clear the upload status
        }));
    };



    console.log("upload stattus:::", uploadStatus)



    const handleViewClick = async () => {


        if (selectedValues.division === '' || selectedValues.division == null) {
            toast.error('Division is Mandatory', {
                position: "top-center",
                autoClose: 1000,
                progress: undefined,
            });
            return;
        }

        if (selectedValues.caNo === '' || selectedValues.caNo == null) {
            toast.error('CA No is Mandatory', {
                position: "top-center",
                autoClose: 1000,
                progress: undefined,
            });
            return;
        }


        if (selectedValues.orderno === '' || selectedValues.orderno == null) {
            toast.error('Order No is Mandatory', {
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

        if (selectedValues.meterno === '' || selectedValues.meterno == null) {
            toast.error('Meter No is Mandatory', {
                position: "top-center",
                autoClose: 1000,
                progress: undefined,
            });
            return;
        }
        if (selectedValues.linemanId === '' || selectedValues.linemanId == null) {
            toast.error('Lineman Id is Mandatory', {
                position: "top-center",
                autoClose: 1000,
                progress: undefined,
            });
            return;
        }

        if (selectedValues.datefrom === '' || selectedValues.datefrom == null) {
            toast.error('Date is Mandatory', {
                position: "top-center",
                autoClose: 1000,
                progress: undefined,
            });
            return;
        }





        const isAnyImageFieldFilled = Object.values(imageFields).some(value => value !== '');

        if (!isAnyImageFieldFilled) {
            toast.error('At least one image field must be filled', {
                position: "top-center",
                autoClose: 1000,
                progress: undefined,
            });
            return;
        }



        const tokenI = sessionStorage.getItem('authToken');
        const decodedToken = jwtDecode(tokenI);
        // const formattedDateFrom = moment(selectedValues.datefrom).format('YYYY-MM-DD HH:mm:ss'); 
        // console.log("form",formattedDateFrom)
        const d = {
            userId: decodedToken.userId,
            orderNo: selectedValues.orderno,
            caNumber: selectedValues.caNo,
            division: selectedValues.division,
            subDivision: "",
            linemanId: selectedValues.linemanId,
            orderType: selectedValues.order,
            activityType: selectedValues.activity,
            punchDate: selectedValues.datefrom,
            meterNo: selectedValues.meterno,
            signConImg: "",
            labTestingNoticeImg: imageFields.labNtcImg,
            meterAfterActImg: imageFields.mtrAfterActImg,
            meterBeforeActImg: imageFields.mtrBefActImg,
            newMeterImg: imageFields.newMtrImg,
            gunnyBagImg: imageFields.OldMtrGunnyImg,
            oldMeterReadingImg: imageFields.oldMtrReadImg,
            poleBusbarImg: imageFields.poleBBCblImg,
            fileNearbyMtr1Img: "",
            fileNearbyMtr2Img: "",
            punchBy: decodedToken.userId

        }
        console.log("3456rt7y8:::", d)

        try {

            const processingToastId = toast.loading('Processing... Please wait', {
                position: "top-center",
            });




            const response = await axios.post(
                UPLOAD_NON_TAB_DATA,
                {
                    userId: decodedToken.userId,
                    orderNo: selectedValues.orderno,
                    caNumber: selectedValues.caNo,
                    division: selectedValues.division,
                    subDivision: "",
                    linemanId: selectedValues.linemanId,
                    orderType: selectedValues.order,
                    activityType: selectedValues.activity,
                    punchDate: selectedValues.datefrom,
                    meterNo: selectedValues.meterno,
                    signConImg: "",
                    labTestingNoticeImg: imageFields.labNtcImg,
                    meterAfterActImg: imageFields.mtrAfterActImg,
                    meterBeforeActImg: imageFields.mtrBefActImg,
                    newMeterImg: imageFields.newMtrImg,
                    gunnyBagImg: imageFields.OldMtrGunnyImg,
                    oldMeterReadingImg: imageFields.oldMtrReadImg,
                    poleBusbarImg: imageFields.poleBBCblImg,
                    fileNearbyMtr1Img: "",
                    fileNearbyMtr2Img: "",
                    punchBy: decodedToken.userId

                },
                {
                    headers: {
                        Authorization: `Bearer ${tokenI}`,
                    },
                }
            );

            if (response.status === 200) {

                toast.update(processingToastId, {
                    render: 'Non-Data Uploaded',
                    type: "success",
                    isLoading: false,
                    autoClose: 1000,
                });
                setImageFields({})
                setUploadStatus({});
                setSelectedImage({})
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



            {/* <CModal
                backdrop="static"
                visible={modalVisible}
                onClose={() => toggleModal()}
            >
                <CModalHeader onClose={() => toggleModal()}>
                    <strong>Upload Images</strong>
                </CModalHeader>
                <CModalBody>
                    <CListGroup>
                        {imageCategories.map((category, index) => (
                            <CListGroupItem key={index} className="d-flex justify-content-between align-items-center">
                                {category}
                           
                                  <CButton
                                color="primary"
                                variant="outline"
                                onClick={() => handleImageUpload(category)}
                                disabled={uploadStatus[category] === 'completed'}
                            >
                                {uploadStatus[category] === 'completed' ? (
                                    <CIcon icon={cilCheckCircle} />
                                ) : (
                                    <CIcon icon={cilCloudUpload} />
                                )}
                            </CButton>
                            </CListGroupItem>
                        ))}
                    </CListGroup>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => toggleModal()}>
                        Cancel
                    </CButton>
                </CModalFooter>
            </CModal> */}

            <CModal backdrop="static" visible={modalVisible}
                onClose={() =>
                    toggleModal()

                }

            >
                <CModalHeader onClose={() => toggleModal()}>
                    <strong>Upload Images</strong>
                </CModalHeader>
                <CModalBody>
                    {/* Conditional message using CoreUI CAlert */}
                    {/* {showAlert && ( */}
                    <CAlert color="warning">
                        Please upload at least one image.
                    </CAlert>
                    {/* )} */}
                    <CListGroup>
                        {imageCategories.map((category, index) => (
                            <CListGroupItem
                                key={index}
                                className="d-flex justify-content-between align-items-center"
                            >
                                {category}
                                <div className="upload-btn-container">
                                    {uploadStatus[category] === "completed" ? (
                                        <CButton
                                            color={hoveredCategory === category ? "danger" : "success"}
                                            //   shape="pill" 
                                            // color="success" // Green color when upload is complete
                                            style={{ backgroundColor: "#4caf50", borderColor: "#4caf50", color: "white" }}  // Custom background and border color

                                            variant="outline"
                                            className="upload-completed-btn"
                                            onMouseEnter={() => setHoveredCategory(category)}
                                            onMouseLeave={() => setHoveredCategory(null)}
                                            onClick={() => handleDelete(category)} // Handle delete functionality
                                        >
                                            {hoveredCategory === category ? (
                                                <CIcon icon={cilTrash} /> // Show delete icon on hover
                                            ) : (
                                                <CIcon icon={cilCheckCircle} /> // Show check icon when not hovered
                                            )}
                                        </CButton>
                                    ) : (
                                        <CButton
                                            color="primary"
                                            // shape="pill" 
                                            variant="outline"
                                            style={{ backgroundColor: "#9e9e9e", borderColor: "#9e9e9e", color: "white" }}  // Custom grey background and border color

                                            onClick={() => handleImageUpload(category)}
                                        >
                                            <CIcon icon={cilCloudUpload} />
                                        </CButton>
                                    )}
                                </div>
                            </CListGroupItem>
                        ))}
                    </CListGroup>
                </CModalBody>
                {/* <CModalFooter>
    <CButton color="secondary" onClick={() => toggleModal()}>
      Cancel
    </CButton>
  </CModalFooter> */}


                <CModalFooter>
                    <CButton
                        color="secondary"
                        onClick={() => {
                            setUploadStatus({}); // Clear the status data
                            setSelectedImages({}); // Clear all document IDs
                            toggleModal(); // Close the modal
                        }}
                    >
                        Cancel
                    </CButton>
                    <CButton
                        color="primary"
                        // onClick={handleSave} // Use the handleSave function to handle the save logic

                        onClick={() => toggleModal()} // Close the modal without clearing data
                    >
                        Save
                    </CButton>
                </CModalFooter>
            </CModal>


            {/* new addition ended */}




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
                        <strong>UPLOAD PHOTOGRAPH-NON TAB CASES</strong>

                    </CCardHeader>
                    <CCardBody>
                        <CRow>
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

                            <CCol sm={4}>
                                <CFormInput
                                    type="text"
                                    id="floatingInput"
                                    floatingClassName="mb-3"
                                    floatingLabel={
                                        <>
                                            <span style={textSmallStyle}>CA No</span>
                                            <span className="text-danger">*</span>
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
                                        const filteredValue = value.replace(/\D/g, '').slice(0, 12);
                                        handleChange({ target: { value: filteredValue } }, 'orderno');
                                    }}

                                />
                            </CCol>

                        </CRow>

                        <CRow
                        >
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
                            <CCol sm={4}>
                                <CFormInput
                                    type="text"
                                    id="floatingInput"
                                    floatingClassName="mb-3"
                                    floatingLabel={
                                        <>
                                            <span style={textSmallStyle}>Meter No</span>
                                            <span className="text-danger">*</span>
                                        </>
                                    }
                                    placeholder="Enter Meter No"
                                    className="custom-form-select"


                                    value={selectedValues.meterno} // Bind to state
                                    // onChange={(event) => handleChange(event, 'orderno')}
                                    onChange={(event) => {
                                        const value = event.target.value;
                                        // Remove any non-digit characters and limit to 10 digits
                                        const filteredValue = value.replace(/\D/g, '').slice(0, 8);
                                        handleChange({ target: { value: filteredValue } }, 'meterno');
                                    }}

                                />
                            </CCol>

                        </CRow>




                        <CRow className="mb-3 align-items-center">
                            <CCol sm={4}>
                                <CFormInput
                                    type="text"
                                    id="floatingInput"
                                    floatingClassName="mb-3"
                                    floatingLabel={
                                        <>
                                            <span style={textSmallStyle}>Lineman Id</span>
                                            <span className="text-danger">*</span>
                                        </>
                                    }
                                    placeholder="Enter Lineman Id"
                                    className="custom-form-select"


                                    value={selectedValues.linemanId} // Bind to state
                                    onChange={(event) => {
                                        // const value = event.target.value;
                                        handleChange(event, 'linemanId')

                                    }}

                                />
                            </CCol>
                            <CCol sm={4} className="mb-1">
                                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                                    <DatePicker
                                        label="Activity*"
                                        format="DD/MM/YYYY"
                                        value={selectedValues.datefrom}
                                        onChange={(newValue) => handleDateChange(newValue, 'datefrom')}
                                        disableFuture
                                        slots={{
                                            textField: (params) => (
                                                <TextField
                                                    {...params}
                                                    sx={{
                                                        width: '100%',
                                                        '& .MuiInputBase-root': {
                                                            borderRadius: '5px',
                                                            '& input': {
                                                                color: colorModes === 'light' ? 'black' : 'white',
                                                            },
                                                        },
                                                        '& .MuiInputLabel-root': {
                                                            color: colorModes === 'light' ? 'black' : 'white',
                                                            fontSize: '14px',
                                                            '&.Mui-shrink': {
                                                                color: colorModes === 'light' ? 'black' : 'white',
                                                            },
                                                            '&.MuiInputLabel-formControl': {
                                                                color: colorModes === 'light' ? 'black' : 'white',
                                                            },
                                                        },
                                                        '& .MuiOutlinedInput-root': {
                                                            '& fieldset': {
                                                                borderColor: colorModes === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'grey',
                                                            },
                                                            '&:hover fieldset': {
                                                                borderColor: colorModes === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'grey',
                                                            },
                                                            '&.Mui-focused fieldset': {
                                                                borderColor: colorModes === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'grey',
                                                            },
                                                            '& .MuiInputAdornment-root .MuiIconButton-root': {
                                                                color: colorModes === 'light' ? 'black' : 'white',
                                                            },
                                                        },
                                                    }}
                                                />
                                            ),
                                        }}
                                    />
                                </LocalizationProvider>
                            </CCol>



                            <CCol sm={4} className="d-flex justify-content-center mb-1">
                                <CButton
                                    color="primary"
                                    variant="outline"
                                    className="w-100 d-flex align-items-center justify-content-center"
                                    // onClick={toggleModal}
                                    onClick={() => setModalVisible(true)}
                                    style={{
                                        padding: '10px 20px',
                                        fontSize: '16px',
                                    }}
                                >
                                    <CIcon icon={cilImage} className="me-2" />
                                    Capture Image
                                </CButton>
                            </CCol>

                            {/* <CCol sm={4} className="d-flex justify-content-center mb-1">
                                <CFormInput
                                    type="text"
                                    // value={`${imagesUploaded} Images Uploaded`}
                                    value={`8 Images Uploaded`}
                                    readOnly
                                    className="w-100 d-flex align-items-center justify-content-center text-center"
                                    style={{
                                        padding: '10px 20px',
                                        fontSize: '16px',
                                        fontWeight: 'bold'
                                    }}
                                />







                            </CCol> */}
                        </CRow>







                        <CRow className="justify-content-center">
                            <CCol xs={12} sm={6} md={4} lg={3}
                                // className="mb-2 d-flex justify-content-center"
                                className="d-flex justify-content-center mb-1"
                            >
                                <CButton color="danger" variant="outline"
                                    // className="w-100" 
                                    className="w-100 d-flex align-items-center justify-content-center"
                                    onClick={handleViewClick}>
                                    SUBMIT
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

                {/* {(data.length > 0) &&

                    <CCard className="mb-4">
                        <CCardBody>
                            <CRow>
                                <CCol sm={4} className="mb-1">
                                </CCol>
                            </CRow>
                        </CCardBody>
                    </CCard>

                } */}


            </CCol>
        </CRow>
    )
}

export default UploadPhotoNonTab











