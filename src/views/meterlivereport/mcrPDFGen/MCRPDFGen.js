// import React, { useState } from 'react'
// import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow, CFormInput } from '@coreui/react'
// import pdfMake from 'pdfmake/build/pdfmake'
// import pdfFonts from 'pdfmake/build/vfs_fonts'
// import htmlToPdfmake from 'html-to-pdfmake'
// import '../../../scss/custom-coreui.scss'

// pdfMake.vfs = pdfFonts.pdfMake.vfs

// const MCRPDFGen = () => {
//   const [installerName, setInstallerName] = useState('dfghjkljhgfd')
//   const [orderNo, setOrderNo] = useState('dfghjgfdgsf')
//   const [caNo, setCaNo] = useState('fghjkgfxg')

//   const generateHtmlString = () => {
//     return `
//       <div style="padding: 20px;">
//         <h1 style="text-align: center;">Hello World!</h1>
//         <p>Installer Name: ${installerName}</p>
//         <p>Order No: ${orderNo}</p>
//         <p>CA No: ${caNo}</p>
//       </div>
//     `
//   }

//   const generatePdf = () => {
//     const htmlString = generateHtmlString()
//     const pdfContent = htmlToPdfmake(htmlString)

//     const docDefinition = {
//       content: pdfContent,
//       defaultStyle: {
//         fontSize: 12,
//       },
//     }

//     pdfMake.createPdf(docDefinition).download('document.pdf')
//   }

//   const printHtml = () => {
//     const htmlString = generateHtmlString()
//     const printWindow = window.open('', '_blank')
//     printWindow.document.open()
//     printWindow.document.write(htmlString)
//     printWindow.document.close()
//     printWindow.print()
//   }

//   return (
//     <CRow>
//       <CCol xs={12}>
//         <CCard className="mb-4">
//           <CCardHeader className="text-center" style={{ fontSize: '1.3rem' }}>
//             <strong>Generate and Print Document</strong>
//           </CCardHeader>
//           <CCardBody>
//             <CRow className="mb-1">
//               <CCol sm={4}>
//                 <CFormInput
//                   type="text"
//                   id="floatingInput"
//                   floatingClassName="mb-3"
//                   floatingLabel={<span style={{ fontSize: '0.875rem' }}>Installer Name</span>}
//                   placeholder="Enter Installer Name"
//                   value={installerName}
//                   onChange={(e) => setInstallerName(e.target.value)}
//                   className="custom-form-select"
//                 />
//               </CCol>
//               <CCol sm={4}>
//                 <CFormInput
//                   type="text"
//                   id="floatingInput"
//                   floatingClassName="mb-3"
//                   floatingLabel={<span style={{ fontSize: '0.875rem' }}>Order No</span>}
//                   placeholder="Enter Order No"
//                   value={orderNo}
//                   onChange={(e) => setOrderNo(e.target.value)}
//                   className="custom-form-select"
//                 />
//               </CCol>
//               <CCol sm={4}>
//                 <CFormInput
//                   type="text"
//                   id="floatingInput"
//                   floatingClassName="mb-3"
//                   floatingLabel={<span style={{ fontSize: '0.875rem' }}>CA No</span>}
//                   placeholder="Enter CA No"
//                   value={caNo}
//                   onChange={(e) => setCaNo(e.target.value)}
//                   className="custom-form-select"
//                 />
//               </CCol>
//             </CRow>

//             <CRow className="justify-content-center">
//               <CCol xs={12} sm={6} md={4} lg={3} className="mb-2 d-flex justify-content-center">
//                 <CButton color="danger" variant="outline" className="w-100" onClick={generatePdf}>
//                   Generate PDF
//                 </CButton>
//               </CCol>
//               <CCol xs={12} sm={6} md={4} lg={3} className="mb-2 d-flex justify-content-center">
//                 <CButton color="warning" variant="outline" className="w-100" onClick={printHtml}>
//                   Print HTML
//                 </CButton>
//               </CCol>
//             </CRow>
//           </CCardBody>
//         </CCard>
//       </CCol>
//     </CRow>
//   )
// }

// export default MCRPDFGen

import React, { useState, useRef } from 'react'
import {
  CButton, CCard, CCardBody, CCardHeader, CCol, CRow, CFormInput,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CPagination,
  CPaginationItem
} from '@coreui/react'
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import pdfMake from 'pdfmake/build/pdfmake'
// import pdfFonts from 'pdfmake/build/vfs_fonts'
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

import htmlToPdfmake from 'html-to-pdfmake'
import '../../../scss/custom-coreui.scss'
import { PDF_DATA_URL } from '../../../utils/ConstantURL'
import axios from 'axios'
import { GrFormView } from "react-icons/gr";
import { RiDownloadLine } from "react-icons/ri";
import { MdPrint } from "react-icons/md";

import { bsesLogo } from '../../../assets/images/bseslogo';
import { jwtDecode } from 'jwt-decode';


// import logo from '../../../assets/images/logo.png'

// pdfMake.vfs = pdfFonts.pdfMake.vfs
pdfMake.vfs = pdfFonts.pdfMake.vfs;


const MCRPDFGen = () => {
  const [installerName, setInstallerName] = useState('')
  const [orderNo, setOrderNo] = useState('')
  const [caNo, setCaNo] = useState('')
  const iframeRef = useRef(null)
  const [viewpdf, setViewPdf] = useState(false)
  const [mcrData, setMcrData] = useState({

  })


  const [selectedValues, setSelectedValues] = useState({
    orderNo: '',
    caNo: '',
    meterNo: ''
  });

  const handleChange = (event, type) => {
    setSelectedValues(prevValues => ({
      ...prevValues,
      [type]: event.target.value
    }));
  };


  const generateHtmlString = (item) => {

    // const dataaa = {
    //   "companyCode": "BRPL",
    //   "division": "W2PLM",
    //   "vendorCode": "2538075",
    //   "ca": "000154527688",
    //   "orderId": "001035432909",
    //   "orderType": "ZDIN",
    //   "accountClass": "SLCC",
    //   "startDate": "16-08-2024 00:00:00",
    //   "finishDate": "19-08-2024 00:00:00",
    //   "name": "VED PRAKASH . SHARMA",
    //   "fatherName": "LT SH RAGHUNANDAN LAL SHARMA",
    //   "address": "RZ 430 A G/FLR PARKING KH NO 64/9/2, GALI NO 9 RAJ NAGAR I PALAM COLONY NEAR . DELHI 110045",
    //   "telNo": "9582571779",
    //   "bpNo": "0910370302",
    //   "poleNo": "PLMN162",
    //   "cableSize": "2X25LT",
    //   "cableLength": "Overhead (25 )",
    //   "plannerGroup": "MMG",
    //   "activityReason": "01",
    //   "activityDate": "20-08-2024 12:27:09",
    //   "meterNo": "000000000041293357",
    //   "newMeterNo": "41293357",
    //   "photoAttached": "1-PH",
    //   "newMeterType": "Normal",
    //   "mrKva": "0",
    //   "mrKvah": "00",
    //   "mrKw": "0",
    //   "mrKwh": "00",
    //   "oldMeterNo": "",
    //   "oldMeterPhase": "",
    //   "oldMeterType": "",
    //   "oldMeterStatus": "",
    //   "oldMeterCondition": "",
    //   "oldMrKva": "",
    //   "mrKvahOld": "",
    //   "oldMrKw": "",
    //   "oldMrKwh": "",
    //   "oldMtrIfNotAvbl": "",
    //   "oldMtrIfAvbl": "",
    //   "exMeterNo": "",
    //   "exMeterPhase": "",
    //   "exMeterType": "",
    //   "exMtrKva": "",
    //   "exMtrKvah": "",
    //   "exMtrKw": "",
    //   "exMtrKwh": "",
    //   "exMeterCond": "",
    //   "exMeterReadingAvail": "",
    //   "nptmCableType": "",
    //   "nptmCableLaying": "",
    //   "mptmCableSize": "",
    //   "mptmCableFrom": "",
    //   "mptmCableTo": "",
    //   "mptmCableLength": "",
    //   "mptmCableDrumNo": "",
    //   "bbtmCableType": "New",
    //   "bbtmCableSize": "2*25",
    //   "bbtmCableFrom": "381",
    //   "bbtmCableTo": "382",
    //   "bbtmCableLength": "1",
    //   "bbtmCableDrumNo": "3133",
    //   "mopCableType": "New",
    //   "mopCableSize": "2*25",
    //   "mopCableFrom": "380",
    //   "mopCableTo": "381",
    //   "mopCableLength": "1",
    //   "bmopCableDrumNo": "3133",
    //   "rmvdCableSize": "",
    //   "rmvdCblDrumNo": "",
    //   "rmvdCblFrom": "",
    //   "rmvdCblTo": "",
    //   "rmvdLength": "",
    //   "newBBType": "New",
    //   "newBBNo": "R23VE14/6741",
    //   "newBBSize": "1 PH 4 WAY",
    //   "newNoOfMtrConn": "1",
    //   "oldBBNo": "",
    //   "oldBBSize": "",
    //   "exBBNo": "",
    //   "exBBSize": "",
    //   "exBBNoOfMtrs": "",
    //   "newMtrTrmSeal1": "RAK225764",
    //   "newMtrTrmSeal2": "",
    //   "newMtrBoxSeal1": "RAK225765",
    //   "newMtrBoxSeal2": "RAK225766",
    //   "newBBSeal1": "RAK225767",
    //   "newBBSeal2": "",
    //   "gunnyBagNo": "",
    //   "gunnySealNo": "",
    //   "noticeNo": "",
    //   "labTestingDate": "",
    //   "labNoticeDate": "",
    //   "reasonNPGunnyBag": "",
    //   "mtrRmvdBy": "",
    //   "remTrmSeal1": "",
    //   "remTrmSeal2": "",
    //   "remBoxSeal1": "",
    //   "remBoxSeal2": "",
    //   "remBBSeal1": "",
    //   "remBBSeal2": "",
    //   "nAccMtrBox": "",
    //   "nAccMtrType": "",
    //   "nAccLugQuant": "0",
    //   "nAccLugSize": "",
    //   "nAccPRC": "0",
    //   "nAccPRCSize": "",
    //   "nAccSaddleClampNo": "04",
    //   "nAccSaddleClampSize": "",
    //   "nAccSaddleBracketQty": "",
    //   "nAccSaddleBracketType": "",
    //   "nAccEyeHook": "0",
    //   "nAccEyeHookSize": "",
    //   "nAccCableAnchor": "0",
    //   "nAccFastner": "0",
    //   "nAccShearingNuts": "",
    //   "nAccReadingCord": "0",
    //   "nAccDCUNo": "",
    //   "nAccSIMNo": "",
    //   "rmvdMtrBox": "",
    //   "rmvdMtrBoxType": "",
    //   "rmvdprc": "",
    //   "rmvdprcSize": "",
    //   "rmvdBracketQuant": "",
    //   "rmvdBracketType": "",
    //   "rmvdMtrSeal": "",
    //   "rmvdMtrSealQty": "",
    //   "rmvddcu": "",
    //   "rmvdsim": "",
    //   "elcbInstalled": "Yes",
    //   "elcbStatus": "OK",
    //   "mcbInstalled": "Yes",
    //   "mcbStatus": "OK",
    //   "meterLocation": "Outside- Wall on Front Side",
    //   "mtrLocStatus": "Safe",
    //   "mtrQualityStatus": "QC-OK",
    //   "mtrInstHeight": "Correct",
    //   "mtrReadingPortAllignmnt": "OK",
    //   "mtrConnTightness": "OK",
    //   "mtrSealingStatus": "OK",
    //   "bbSealingStatus": "OK",
    //   "earthingMtrIp": "OK",
    //   "earthingMtrOp": "OK",
    //   "earthingMtrBb": "OK",
    //   "earthingPoleEnd": "OK",
    //   "cableSaddeling": "OK",
    //   "cblFixConsumerEnd": "OK",
    //   "cblFixPoleEnd": "OK",
    //   "jointServiceCbl": "No",
    //   "flowerMtrBoxGland": "Yes",
    //   "markingMtr": "Yes",
    //   "markingCbl": "Yes",
    //   "dbFpLock": "Yes",
    //   "poleCondition": "OK",
    //   "siteConstraint": "No",
    //   "tfSticker": "Yes",
    //   "tfStickerNo": "",
    //   "tfNearbyMtr1": "41078200",
    //   "tfNearbyMtr2": "21820916",
    //   "subDiv": "2660S09",
    //   "actReason": "01",
    //   "mtrConnFrom": "Busbar",
    //   "supplyPoint": "Busbar ",
    //   "cblConnType": "Loop Cable",
    //   "happyCodeAvail": "No",
    //   "happyCodeNo": "",
    //   "reasonHappyCode": "Wrong Phone No.",
    //   "consumerName": "Ved prakash sharma ",
    //   "consumerTelNo": "9582571779",
    //   "siteSuperName": "Nagesh ",
    //   "linemanName": "SUBHASH",
    //   "helperName": "Surendra ",
    //   "installerRmrk": "Na",
    //   "lat": "28.5844102",
    //   "long": "77.0870948",
    //   "entryDate": "20-08-2024 12:27:09",
    //   "appVersion": "Version 1.1.1",
    //   "looseFlag": "ORDER BASED",
    //   "lM_Division": "W2PLM",
    //   "lM_VendorCode": "2538075",
    //   "lM_CustomerCA": "000",
    //   "lM_AccountClass": "",
    //   "lM_StartDate": "",
    //   "lM_CustomerName": "",
    //   "lM_CustomerAddress": "",
    //   "lM_CustomerTelNo": "",
    //   "customerDeviceNo": "000000000041293357"
    // }
    const dataaa = item;

    console.log("inside test", item)
    const HtmlContent = `
   <style>
    body {
        font-family: Arial, sans-serif;
        font-size: 5px; /* Decreased font size */
        line-height: 0.8; /* Adjusted line height */
        margin: 10px; /* Reduced margins */
        padding: 0;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        margin: 10px 0; /* Reduced margin */
        border: 1px solid black; /* Reduced border size */
    }

    th,
    td {
        border: 0.5px solid black; /* Reduced border size */
        padding: 2px; /* Reduced padding */
        text-align: left;
        font-size: 5px; /* Decreased font size */
    }

    th {
        background-color: #f2f2f2;
    }

    .report-title {
        text-align: center;
        padding-right: 40px; /* Adjusted padding */
    }

      .logo-cell {
        text-align: center;
        padding: 10px 0; /* Add padding to vertically center if necessary */
    }

    .logo-cell img {
        display: block;
        margin: 0 auto; /* Horizontally centers the image */
    }
</style>



</head>

<body>
    <table>
        <thead>
          <tr>
    <th colspan="8" class="logo-cell" style="text-align: center;">
        <img src="data:image/png;base64,${bsesLogo}" height="20" width="80" alt="bses_logo">
    </th>
</tr>
            <tr>
                <th colspan="8" style="text-align: center;">BSES Rajdhani Power Ltd</th>
            </tr>
            <tr>
                <th colspan="8" class="report-title" style="text-align: center;">Meter Activity Report-${dataaa.activityType}  <span
                        style="padding-left: 50px;">Report No:${dataaa.ca}${moment(dataaa.activityDate).format('DDMMYYYY')}</span></th>
            </tr>
        </thead>
        <tbody style="border-top: 2px solid black; border-bottom: 2px solid black;">
            <tr>
                <td colspan="2">Division:${dataaa.division}</td>
                <td colspan="2">Date:${moment(dataaa.activityDate).utc().format('DD/MM/YYYY')}</td>
                <td colspan="2">CA No.:${dataaa.ca}</td>
                <td colspan="2">Order No:${dataaa.orderId == '' ? 'Loose Order' : dataaa.orderId}</td>
            </tr>
            <tr>
                <td colspan="2">S Load (kW):${dataaa.sLoad==""?"NA":dataaa.sLoad}</td>
                <td colspan="2">Ac Class:${dataaa.looseFlag == 'ORDER BASED' ? dataaa.accountClass : dataaa.lM_AccountClass}</td>
                <td colspan="2">Sub Div:${dataaa.fSubDiv==''||dataaa.fSubDiv==null?dataaa.subDiv==''||dataaa.subDiv==null?'NA':dataaa.subDiv:dataaa.fSubDiv}</td>
                <td colspan="2">Mob No:${dataaa.looseFlag == 'ORDER BASED' ? dataaa.telNo : dataaa.lM_CustomerTelNo}</td>
            </tr>
        </tbody>
        <tbody style="border-bottom: 2px solid black;">
            <tr>
                <td colspan="8">Name:${dataaa.looseFlag == 'ORDER BASED' ? dataaa.name : dataaa.lM_CustomerName}</td>
            </tr>
            <tr>
                <td colspan="8">Address:${dataaa.looseFlag == 'ORDER BASED' ? dataaa.address : dataaa.lM_CustomerAddress}</td>
            </tr>
        </tbody>
        <thead>
            <tr>
                <th colspan="2" style="text-align: center;">New Meter Detail</th>
                <th colspan="2" style="text-align: center;">Old/Existing Meter Detail</th>
                <th colspan="2" style="text-align: center;border-left: 2px solid black;">Gunny Bag Detail</th>
                <th colspan="2" style="text-align: center;">Supply Point Detail</th>
            </tr>
        </thead>
        <tbody style="border-top: 2px solid black; border-bottom: 2px solid black;">
            <tr>
                <td>Meter No</td>
                <td style="text-align: center;">${dataaa.newMeterNo != '' ? dataaa.newMeterNo : 'NA'}</td>
                <td style="text-align: center;" colspan="2">${dataaa.exMeterNo != ''
        ? dataaa.exMeterNo
        : dataaa.oldMeterNo != ''
          ? dataaa.oldMeterNo
          : 'NA'
      }</td>
                <td  colspan="2" style="border-left: 2px solid black;">Bag No:${dataaa.gunnyBagNo != '' ? dataaa.gunnyBagNo : 'NA'
      }</td>
                <td colspan="2">Type:${dataaa.mtrConnFrom != '' ? dataaa.mtrConnFrom : 'NA'
      }</td>
            </tr>
            <tr>
                <td>Meter Type</td>
                <td style="text-align: center;">${dataaa.photoAttached != '' ? dataaa.photoAttached : 'NA'
      }/${dataaa.newMeterType != '' ? dataaa.newMeterType : 'NA'}</td>
                <td style="text-align: center;" colspan="2">${dataaa.exMeterPhase != ''
        ? dataaa.exMeterPhase
        : dataaa.oldMeterPhase != ''
          ? dataaa.oldMeterPhase
          : 'NA'
      }/${dataaa.exMeterType != ''
        ? dataaa.exMeterType
        : dataaa.oldMeterType != ''
          ? dataaa.oldMeterType
          : 'NA'
      }</td>
                <td colspan="2" style="border-left: 2px solid black;">Notice No:${dataaa.noticeNo != '' ? dataaa.noticeNo : 'NA'
      }</td>
                <td colspan="2">Sup Pt Sr No:${dataaa.supplyPoint != '' ? dataaa.supplyPoint : 'NA'
      }</td>
            </tr>
            <tr>
                <td>kWh Rdg</td>
                <td style="text-align: center;">${dataaa.mrKwh != '' ? dataaa.mrKwh : 'NA'
      }</td>
                <td style="text-align: center;" colspan="2">${dataaa.exMtrKwh != ''
        ? dataaa.exMtrKwh
        : dataaa.oldMrKwh != ''
          ? dataaa.oldMrKwh
          : 'NA'
      }</td>
                <td colspan="2" style="border-left: 2px solid black;">Bag Seal No:${dataaa.gunnySealNo != '' ? dataaa.gunnySealNo : 'NA'
      }</td>
                <td colspan="2">Con Type:${dataaa.cblConnType != '' ? dataaa.cblConnType : 'NA'
      }</td>
            </tr>
            <tr>
                <td>kVAh Rdg</td>
                <td style="text-align: center;">${dataaa.mrKvah != '' ? dataaa.mrKvah : 'NA'
      }</td>
                <td style="text-align: center;" colspan="2">${dataaa.exMtrKvah != ''
        ? dataaa.exMtrKvah
        : dataaa.mrKvahOld != ''
          ? dataaa.mrKvahOld
          : 'NA'
      }</td>
                <td colspan="2" style="border-left: 2px solid black;">Test Date:${
      // lab != '' ? lab : 'NA'
      dataaa.labTestingDate == '' ? 'NA' : dataaa.labTestingDate
      // data.isGunnyBag == 'Yes' ? (lab == '' ? 'NA' : lab) : 'NA'
      }</td>
                <td colspan="2">Cable Laying:${dataaa.nptmCableLaying != '' ? dataaa.nptmCableLaying : 'NA'
      }</td>
            </tr>

 <tr>
                <td>Old Meter Remark</td>
               
                <td style="text-align: center;" colspan="3">${dataaa.oldMtrIfNotAvbl != '' ? dataaa.oldMtrIfNotAvbl : 'NA'
      }</td>
                 <td  style="border-left: 2px solid black;">Gunny Bag Remark</td>
               
                <td style="text-align: center;" colspan="3">${dataaa.reasonNPGunnyBag != '' ? dataaa.reasonNPGunnyBag : 'NA'
      }</td>
             
            </tr>


        </tbody>


        <thead>
            <tr>
                <th style="text-align: center;">Seal Type</th>
                <th style="text-align: center;">New Seals</th>
                <th colspan="2" style="text-align: center;">Removed Seals</th>
                <th style="text-align: center;border-left: 2px solid black;">New Cable</th>
                <th style="text-align: center;">PM Cable</th>
                <th style="text-align: center;">BM Cable</th>
                <th style="text-align: center;">OP Cable</th>
            </tr>
        </thead>

        <tbody style="border-top: 2px solid black; border-bottom: 2px solid black;">
            <tr>
                <td>Tr Seal-1</td>
                <td style="text-align: center;">${dataaa.newMtrTrmSeal1 != ''
        ? dataaa.newMtrTrmSeal1
        : 'NA'
      }</td>
                <td style="text-align: center;" colspan="2">${dataaa.remTrmSeal1 != '' ? dataaa.remTrmSeal1 : 'NA'
      }</td>
                <td style="border-left: 2px solid black;">Drum No</td>
                <td style="text-align: center;">${dataaa.mptmCableDrumNo != '' ? dataaa.mptmCableDrumNo : 'NA'
      }</td>
                <td style="text-align: center;">${dataaa.bbtmCableDrumNo != '' ? dataaa.bbtmCableDrumNo : 'NA'
      }</td>
                <td style="text-align: center;">${dataaa.bmopCableDrumNo != ''
        ? dataaa.bmopCableDrumNo
        : 'NA'
      }</td>
            </tr>
            <tr>
                <td>Tr Seal-2</td>
                <td style="text-align: center;">${dataaa.newMtrTrmSeal2 != ''
        ? dataaa.newMtrTrmSeal2
        : 'NA'
      }</td>
                <td colspan="2" style="text-align: center;">${dataaa.remTrmSeal2 != '' ? dataaa.remTrmSeal2 : 'NA'
      }</td>
                <td style="border-left: 2px solid black;">Cable Size</td>
                <td style="text-align: center;">${dataaa.mptmCableSize != '' ? dataaa.mptmCableSize : 'NA'
      }</td>
                <td style="text-align: center;">${dataaa.bbtmCableSize != '' ? dataaa.bbtmCableSize : 'NA'
      }</td>
                <td style="text-align: center;">${dataaa.mopCableSize != '' ? dataaa.mopCableSize : 'NA'
      }</td>
            </tr>
            <tr>
                <td>Box Seal-1</td>
                <td style="text-align: center;">${dataaa.newMtrBoxSeal1 != '' ? dataaa.newMtrBoxSeal1 : 'NA'
      }</td>
                <td colspan="2" style="text-align: center;">${dataaa.remBoxSeal1 != '' ? dataaa.remBoxSeal1 : 'NA'
      }</td>
                <td style="border-left: 2px solid black;">Sr No From</td>
                <td style="text-align: center;">${dataaa.mptmCableFrom != '' ? dataaa.mptmCableFrom : 'NA'
      }</td>
                <td style="text-align: center;">${dataaa.bbtmCableFrom != '' ? dataaa.bbtmCableFrom : 'NA'
      }</td>
                <td style="text-align: center;">${dataaa.mopCableFrom != '' ? dataaa.mopCableFrom : 'NA'
      }</td>
            </tr>
            <tr>
                <td>Box Seal-2</td>
                <td style="text-align: center;">${dataaa.newMtrBoxSeal2 != '' ? dataaa.newMtrBoxSeal2 : 'NA'
      }</td>
                <td style="text-align: center;" colspan="2">${dataaa.remBoxSeal2 != '' ? dataaa.remBoxSeal2 : 'NA'
      }</td>
                <td style="border-left: 2px solid black;">Sr No To</td>
                <td style="text-align: center;">${dataaa.mptmCableTo != '' ? dataaa.mptmCableTo : 'NA'
      }</td>
                <td style="text-align: center;">${dataaa.bbtmCableTo != '' ? dataaa.bbtmCableTo : 'NA'
      }</td>
                <td style="text-align: center;">${dataaa.mopCableTo != '' ? dataaa.mopCableTo : 'NA'
      }</td>
            </tr>
            <tr>
                <td>Busbar Seal-1</td>
                <td style="text-align: center;">${dataaa.newBBSeal1 != '' ? dataaa.newBBSeal1 : 'NA'
      }</td>
                <td style="text-align: center;" colspan="2">${dataaa.remBBSeal1 != '' ? dataaa.remBBSeal1 : 'NA'
      }</td>
                <td style="border-left: 2px solid black;">Length (m)</td>
                <td style="text-align: center;">${dataaa.mptmCableLength != '' ? dataaa.mptmCableLength : 'NA'
      }</td>
                <td style="text-align: center;">${dataaa.bbtmCableLength != '' ? dataaa.bbtmCableLength : 'NA'
      }</td>
                <td style="text-align: center;">${dataaa.mopCableLength != ''
        ? dataaa.mopCableLength
        : 'NA'
      }</td>
            </tr>
            <tr>
                <td>Busbar Seal-2</td>
                <td style="text-align: center;">${dataaa.newBBSeal2 != '' ? dataaa.newBBSeal2 : 'NA'
      }</td>
                <td style="text-align: center;" colspan="2">${dataaa.remBBSeal2 != '' ? dataaa.remBBSeal2 : 'NA'
      }</td>
                <td style="border-left: 2px solid black;">Type</td>
                <td style="text-align: center;">${dataaa.nptmCableType != '' ? dataaa.nptmCableType : 'NA'
      }</td>
                <td style="text-align: center;">${dataaa.bbtmCableType != '' ? dataaa.bbtmCableType : 'NA'
      }</td>
                <td style="text-align: center;">${dataaa.mopCableType != '' ? dataaa.mopCableType : 'NA'
      }</td>
            </tr>

        </tbody>

        <thead>
            <tr>
                <th colspan="4" style="text-align: center;">New Accessories Used-Details</th>
                <th colspan="4" style="text-align: center;border-left: 2px solid black;">Removed Accessories -Details</th>
            </tr>
        </thead>

        <tbody style="border-top: 2px solid black; border-bottom: 2px solid black;">
            <tr>
                <td colspan="2">Busbar No:${dataaa.newBBNo != '' ? dataaa.newBBNo : 'NA'
      }</td>
                <td colspan="2">Busbar Type:${dataaa.newBBType != '' ? dataaa.newBBType : 'NA'
      }</td>
                <td colspan="2" style="border-left: 2px solid black;">Removed Cable Length:${dataaa.rmvdLength != '' ? dataaa.rmvdLength : 'NA'
      }</td>
                <td colspan="2">Removed Cable Size:${dataaa.rmvdCableSize != '' ? dataaa.rmvdCableSize : 'NA'
      }</td>
            </tr>
            <tr>
                <td colspan="2">Busbar Con:${dataaa.newBBSize != '' ? dataaa.newBBSize : 'NA'
      }</td>
                <td colspan="2">Box Sr:${dataaa.nAccMtrBox != '' ? dataaa.nAccMtrBox : 'NA'
      }</td>
                <td colspan="4" style="border-left: 2px solid black;">Reason for Cable Not Removed:
                <strong>${dataaa.reasonForCableNotRemoved!=''?dataaa.reasonForCableNotRemoved:'NA'}</strong>
                </td>
            </tr>
            <tr>
                <td colspan="2">I-Hook:${dataaa.nAccEyeHook != '' ? dataaa.nAccEyeHook : 'NA'
      }/${dataaa.nAccEyeHookSize != '' ? dataaa.nAccEyeHookSize : 'NA'}</td>
                <td colspan="2">PRC:${dataaa.nAccPRC != '' ? dataaa.nAccPRC : 'NA'}/${dataaa.nAccPRCSize != '' ? dataaa.nAccPRCSize : 'NA'
      }</td>
                <td colspan="2" style="border-left: 2px solid black;">Busbar No:${dataaa.oldBBNo != '' ? dataaa.oldBBNo : 'NA'
      }</td>
                <td colspan="2">Busbar Type:${dataaa.oldBBSize != '' ? dataaa.oldBBSize : 'NA'
      }</td>
            </tr>
            <tr>
                <td colspan="2">Anchor:${dataaa.nAccCableAnchor != '' ? dataaa.nAccCableAnchor : 'NA'
      }</td>
                <td colspan="2">Saddle:${dataaa.nAccSaddleClampNo != '' ? dataaa.nAccSaddleClampNo : 'NA'
      }</td>
                <td colspan="2" style="border-left: 2px solid black;">Busbar Con:${dataaa.oldBBSize != '' ? dataaa.oldBBSize : 'NA'
      }</td>
                <td colspan="2">Box Sr:${dataaa.rmvdMtrBox != '' ? dataaa.rmvdMtrBox : 'NA'
      }</td>
            </tr>
            <tr>
                <td colspan="2">Fastners:${dataaa.nAccFastner != '' ? dataaa.nAccFastner : 'NA'
      }</td>
                <td colspan="2">Bracket:${dataaa.nAccSaddleBracketQty != '' ? dataaa.nAccSaddleBracketQty : 'NA'
      }/${dataaa.nAccSaddleBracketType != '' ? dataaa.nAccSaddleBracketType : 'NA'}</td>
                <td colspan="2" style="border-left: 2px solid black;">Bracket:${dataaa.rmvdBracketQuant != '' ? dataaa.rmvdBracketQuant : 'NA'
      }/${dataaa.rmvdBracketType != '' ? dataaa.rmvdBracketType : 'NA'}</td>
                <td colspan="2">PRC:${dataaa.rmvdprc != '' ? dataaa.rmvdprc : 'NA'}/${dataaa.rmvdprcSize != '' ? dataaa.rmvdprcSize : 'NA'
      }</td>
            </tr>


        </tbody>

        <thead>
            <tr>
                <th colspan="2" style="text-align: center;">Safety Compliances</th>
                <th colspan="6" style="text-align: center;border-left: 2px solid black;">QC Compliances</th>
            </tr>
        </thead>

        <tbody style="border-top: 2px solid black; border-bottom: 2px solid black;">
            <tr>
                <td colspan="2">ELCB:${dataaa.elcbInstalled != '' ? dataaa.elcbInstalled : 'NA'
      }/${dataaa.elcbStatus != '' ? dataaa.elcbStatus : 'NA'}</td>
                <td colspan="2"  style="border-left: 2px solid black;">Meter Height:${dataaa.mtrInstHeight != '' ? dataaa.mtrInstHeight : 'NA'
      }</td>
                <td colspan="2">Port Allignment:${dataaa.mtrReadingPortAllignmnt != '' ? dataaa.mtrReadingPortAllignmnt : 'NA'
      }</td>
                <td colspan="2">Cable Sadeling:${dataaa.cableSaddeling != '' ? dataaa.cableSaddeling : 'NA'
      }</td>
            </tr>
            <tr>
                <td colspan="2">MCB:${dataaa.mcbInstalled != '' ? dataaa.mcbInstalled : 'NA'
      }/${dataaa.mcbStatus != '' ? dataaa.mcbStatus : 'NA'}</td>
                <td colspan="2"  style="border-left: 2px solid black;">Meter Seals:${dataaa.mtrSealingStatus != '' ? dataaa.mtrSealingStatus : 'NA'
      }</td>
                <td colspan="2">Busbar Seals:${dataaa.bbSealingStatus != '' ? dataaa.bbSealingStatus : 'NA'
      }</td>
                <td colspan="2">Cons End Cable Fixtures:${dataaa.cblFixConsumerEnd != '' ? dataaa.cblFixConsumerEnd : 'NA'
      }</td>
            </tr>
            <tr>
                <td colspan="2">Safety:${dataaa.mtrLocStatus != '' ? dataaa.mtrLocStatus : 'NA'
      }</td>
                <td colspan="2"  style="border-left: 2px solid black;">Earthing at Input:${dataaa.earthingMtrIp != '' ? dataaa.earthingMtrIp : 'NA'
      }</td>
                <td colspan="2">Earthing at Output:${dataaa.earthingMtrOp != '' ? dataaa.earthingMtrOp : 'NA'
      }</td>
                <td colspan="2">Pole End Cable Fixture:${dataaa.cblFixPoleEnd != '' ? dataaa.cblFixPoleEnd : 'NA'
      }</td>
            </tr>
            <tr>
                <td colspan="2">QC Status:${dataaa.mtrQualityStatus != ''
        ? dataaa.mtrQualityStatus
        : 'NA'
      }</td>
                <td colspan="2"  style="border-left: 2px solid black;">Earthing at Busbar:${dataaa.earthingMtrBb != '' ? dataaa.earthingMtrBb : 'NA'
      }</td>
                <td colspan="2">Earthing at Pole-end:${dataaa.earthingPoleEnd != '' ? dataaa.earthingPoleEnd : 'NA'
      }</td>
                <td colspan="2">Joint in Sr Cable:${dataaa.jointServiceCbl != '' ? dataaa.jointServiceCbl : 'NA'
      }</td>
            </tr>
            <tr>
                <td colspan="2">Consumer Wiring:${dataaa.consumerWiring==""?"NA":dataaa.consumerWiring}</td>
                <td colspan="2"  style="border-left: 2px solid black;">Flower:${dataaa.flowerMtrBoxGland != '' ? dataaa.flowerMtrBoxGland : 'NA'
      }</td>
                <td colspan="2">Marking on Meter:${dataaa.markingMtr != '' ? dataaa.markingMtr : 'NA'
      }</td>
                <td colspan="2">Marking on Cable:${dataaa.markingCbl != '' ? dataaa.markingCbl : 'NA'
      }</td>
            </tr>

            <tr>
                <td colspan="2">Consumer Wiring Status:${dataaa.consumerWiringStatus==""?"NA":dataaa.consumerWiringStatus}</td>
                <td colspan="2"  style="border-left: 2px solid black;">DP/FP Locked:${dataaa.dbFpLock != '' ? dataaa.dbFpLock : 'NA'
      }</td>
                <td colspan="2">Pole Condition:${dataaa.poleCondition != '' ? dataaa.poleCondition : 'NA'
      }</td>
                <td colspan="2">DB:${dataaa.db!=""?dataaa.db:'NA'}</strong></td>
            </tr>
            <tr>
                <td colspan="2">Meter Loc:${dataaa.meterLocation != '' ? dataaa.meterLocation : 'NA'
      }</td>
                <td colspan="6"  style="border-left: 2px solid black;">Site Constraint:${dataaa.siteConstraint != '' ? dataaa.siteConstraint : 'NA'
      }</td>

            </tr>

        </tbody>
        <thead>
            <tr>
                <th colspan="8" style="text-align: center;">Other Information</th>
            </tr>
        </thead>
        <tbody style="border-top: 2px solid black; border-bottom: 2px solid black;">
            <tr>
                <td colspan="2">Happy Ness Code:${dataaa.happyCodeAvail != '' ? dataaa.happyCodeAvail : 'NA'
      }</td>
                <td colspan="6">Reason for No-Happyness Code::${dataaa.reasonHappyCode != '' ? dataaa.reasonHappyCode : 'NA'
      }</td>

            </tr>
            <tr>
                <td colspan="2">Nearby Meter-1:${dataaa.tfNearbyMtr1 != '' ? dataaa.tfNearbyMtr1 : 'NA'
      }</td>
                <td colspan="2">Nearby Meter-2:${dataaa.tfNearbyMtr2 != '' ? dataaa.tfNearbyMtr2 : 'NA'
      }</td>
                <td colspan="2">TF Sticker:${dataaa.tfSticker != '' ? dataaa.tfSticker : 'NA'
      }</td>
                <td colspan="2">TF Sticker No:${dataaa.tfStickerNo != '' ? dataaa.tfStickerNo : 'NA'
      }</td>
            </tr>
            <tr>
                <td colspan="8">Remarks:${dataaa.installerRmrk != '' ? dataaa.installerRmrk : 'NA'
      }</td>

            </tr>
            <tr>
                <td colspan="2">Lineman:${dataaa.linemanName != '' ? dataaa.linemanName : 'NA'
      }</td>
                <td colspan="2">Lineman ID:${dataaa.linemanId != '' ? dataaa.linemanId : 'NA'}</td>
                <td colspan="2">Helper:${dataaa.helperName != '' ? dataaa.helperName : 'NA'
      }</td>
                <td colspan="2">Supervisor:${dataaa.siteSuperName != '' ? dataaa.siteSuperName : 'NA'
      }</td>
            </tr>
            <tr>
                <td colspan="4">Consumer / Rep. Name:${dataaa.consumerName != '' ? dataaa.consumerName : 'NA'
      }</td>
                <td colspan="4">Contact Number:${dataaa.consumerTelNo != '' ? dataaa.consumerTelNo : 'NA'
      }</td>

            </tr>
            <tr>
                <td colspan="2">Time:${dataaa.entryDate != '' ? dataaa.entryDate : 'NA'
      }</td>
                <td colspan="2">LATITUDE:${dataaa.lat != '' ? dataaa.lat : 'NA'
      }</td>
                <td colspan="2">LONGITUDE:${dataaa.long != '' ? dataaa.long : 'NA'
      }</td>
                <td colspan="2">App Ver:${dataaa.appVersion != '' ? dataaa.appVersion : 'NA'
      }</td>

            </tr>
            <tr>
            <td colspan="8" style="text-align: center;">Registered office: BSES Rajdhani Power Limited-BSES Bhawan, Nehru Place, New Delhi-110019.
                CIN No: U74899DL2001PLC111527, Email: brpl.customercare@relianceada.com, Website: www.bsesdelhi.com</td>

        </tr>
        </tbody>
       

    </table>
  
    `;

    return HtmlContent + '</body>';


  }

  const generatePdf = (item) => {
    console.log("item::::", item)
    const htmlString = generateHtmlString(item)
    const pdfContent = htmlToPdfmake(htmlString)

    const docDefinition = {
      content: pdfContent,
      defaultStyle: {
        fontSize: 8,
      },
    }

    pdfMake.createPdf(docDefinition).download('document.pdf')
  }

  // const viewPdf = () => {
  //   setViewPdf(true)
  //   const htmlString = generateHtmlString()
  //   const pdfContent = htmlToPdfmake(htmlString)

  //   const docDefinition = {
  //     content: pdfContent,
  //     defaultStyle: {
  //       fontSize: 12,
  //     },
  //   }

  //   pdfMake.createPdf(docDefinition).getDataUrl((dataUrl) => {
  //     if (iframeRef.current) {
  //       iframeRef.current.src = dataUrl
  //     }
  //   })
  // }


  const viewPdf = (item) => {
    const htmlString = generateHtmlString(item)
    const pdfContent = htmlToPdfmake(htmlString)

    const docDefinition = {
      content: pdfContent,
      defaultStyle: {
        fontSize: 8,
      },
    }

    // Create the PDF and open it in a new tab
    pdfMake.createPdf(docDefinition).getBlob((blob) => {
      const url = URL.createObjectURL(blob)
      window.open(url, '_blank')
    })
  }

  const printPdf = (item) => {
    const htmlString = generateHtmlString(item)
    const pdfContent = htmlToPdfmake(htmlString)

    const docDefinition = {
      content: pdfContent,
      defaultStyle: {
        fontSize: 8,
      },
    }

    // Create the PDF and print it directly
    pdfMake.createPdf(docDefinition).print()
  }


  const printHtml = () => {
    const htmlString = generateHtmlString()
    const printWindow = window.open('', '_blank')
    printWindow.document.open()
    printWindow.document.write(htmlString)
    printWindow.document.close()
    printWindow.print()
  }

  const [data, setData] = useState([]);

  const handleViewClick = async () => {

    const token = sessionStorage.getItem('authToken');
    if (
      (selectedValues.orderNo === '' || selectedValues.orderNo == null) &&
      (selectedValues.caNo === '' || selectedValues.caNo == null) &&
      (selectedValues.meterNo === '' || selectedValues.meterNo == null)
    ) {
      toast.error('At least one of Order No, CA No, or Device No must be provided', {
        position: "top-center",
        autoClose: 1000,
        progress: undefined,
      });
      return;
    }
    const decodedToken = jwtDecode(token);
    console.log('Decoded Token:', decodedToken);

    const processingToastId = toast.loading('Processing... Please wait', {
      position: "top-center",
    });
    try {
      // setLoader(true); // Show loader initially
      setData([]); // Clear previous data before starting new fetch
      
      const response = await axios.post(
        PDF_DATA_URL,
        {
          userId: decodedToken.userId,
          orderNo: selectedValues.orderNo,
          ca: selectedValues.caNo,
          deviceNo: selectedValues.meterNo,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data && response.status === 200) {
        const fetchedData = response.data.orderList;
        console.log("test::15456::::", fetchedData)
        setData((prevData) => [...prevData, ...fetchedData]);
        toast.update(processingToastId, {
          render: 'Data fetched successfully',
          type: "success",
          isLoading: false,
          autoClose: 1000,
        });
        // setLoader(false);

      }


      // else if(response.status==400&&response.data.message)
      // {
      //   toast.update(processingToastId, {
      //     render: response.data.message,
      //     type: "success",
      //     isLoading: false,
      //     autoClose: 1000,
      //   });
      // }
      // else {
      //   // setLoader(false);
      //   toast.update(processingToastId, {
      //     render: 'Error fetching data',
      //     type: "error",
      //     isLoading: false,
      //     autoClose: 1000,
      //   });
      // }




    } catch (error) {
      // Handle errors
      // console.error("Error fetching data:", error);
      // toast.update(processingToastId, {
      //   render: 'Error fetching data',
      //   type: "error",
      //   isLoading: false,
      //   autoClose: 1000,
      // });
      // setLoader(false);



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






    }
  };









  return (
    <CRow>
      <ToastContainer/>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader className="text-center" style={{ fontSize: '1.3rem' }}>
            <strong>MCR UPLOAD REPORT</strong>
          </CCardHeader>
          <CCardBody>
            <CRow className="mb-1">

              <CCol sm={4}>

              <CFormInput
                  type="text"
                  id="floatingInput"
                  floatingClassName="mb-3"
                  floatingLabel={<span style={{ fontSize: '0.875rem' }}>Order No</span>}
                  placeholder="Enter Order No"
                  // value={caNo}
                  // onChange={(e) => setCaNo(e.target.value)}
                  value={selectedValues.orderNo} // Bind to state

                  // onChange={(event) => handleChange(event, 'caNo')}
                  onChange={(event) => {
                    const value = event.target.value;
                    // Remove any non-digit characters and limit to 10 digits
                    const filteredValue = value.replace(/\D/g, '').slice(0, 12);
                    handleChange({ target: { value: filteredValue } }, 'orderNo');
                  }}
                  className="custom-form-select"
                />


               
              </CCol>
              <CCol sm={4}>
                <CFormInput
                  type="text"
                  id="floatingInput"
                  floatingClassName="mb-3"
                  floatingLabel={<span style={{ fontSize: '0.875rem' }}>CA No</span>}
                  placeholder="Enter CA No"
                  // value={caNo}
                  // onChange={(e) => setCaNo(e.target.value)}
                  value={selectedValues.caNo} // Bind to state

                  // onChange={(event) => handleChange(event, 'caNo')}
                  onChange={(event) => {
                    const value = event.target.value;
                    // Remove any non-digit characters and limit to 10 digits
                    const filteredValue = value.replace(/\D/g, '').slice(0, 9);
                    handleChange({ target: { value: filteredValue } }, 'caNo');
                  }}
                  className="custom-form-select"
                />
              </CCol>
              <CCol sm={4}>
                <CFormInput
                  type="text"
                  id="floatingInput"
                  floatingClassName="mb-3"
                  floatingLabel={<span style={{ fontSize: '0.875rem' }}>Meter No</span>}
                  placeholder="Enter Meter No"
                  value={selectedValues.meterNo} // Bind to state

                  // onChange={(event) => handleChange(event, 'meterNo')}
                  onChange={(event) => {
                    const value = event.target.value;
                    // Remove any non-digit characters and limit to 10 digits
                    const filteredValue = value.replace(/\D/g, '').slice(0,8);
                    handleChange({ target: { value: filteredValue } }, 'meterNo');
                  }}

                  className="custom-form-select"
                />
              </CCol>
            </CRow>

            <CRow className="justify-content-center">
              {/* handleViewClick */}
              <CCol xs={12} sm={6} md={4} lg={3} className="mb-2 d-flex justify-content-center">
                <CButton color="danger" variant="outline" className="w-100" onClick={() => handleViewClick()}>
                  Process
                </CButton>
              </CCol>


              {/* <CCol xs={12} sm={6} md={4} lg={3} className="mb-2 d-flex justify-content-center">
                <CButton color="danger" variant="outline" className="w-100" onClick={generatePdf}>
                  Generate PDF
                </CButton>
              </CCol> */}
              {/*  <CCol xs={12} sm={6} md={4} lg={3} className="mb-2 d-flex justify-content-center">
                <CButton color="primary" variant="outline" className="w-100" onClick={viewPdf}>
                  View PDF
                </CButton>
              </CCol>

              <CCol xs={12} sm={6} md={4} lg={3} className="mb-2 d-flex justify-content-center">
                <CButton color="warning" variant="outline" className="w-100" onClick={printHtml}>
                  Print HTML
                </CButton>
              </CCol> */}



            </CRow>





            {/* {viewpdf && (
              <CRow className="justify-content-center">
                <CCol xs={12}>
                  <iframe
                    ref={iframeRef}
                    style={{
                      width: '100%',
                      height: '500px',
                      border: '1px solid #ddd',
                      marginTop: '20px',
                    }}
                  />
                </CCol>
              </CRow>
            )} */}
          </CCardBody>




        </CCard>
      </CCol>



      <CCol xs={12}>
        <CCardBody>

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
                        Type
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
                      // onClick={() => handleSort2('Status')}
                      >
                        New Meter Number
                        {/* {orderBy2 === 'Status' && (order === 'asc' ? '▲' : '▼')} */}
                      </CTableHeaderCell>
                      <CTableHeaderCell className="bg-body-tertiary">
                        Old Meter No
                      </CTableHeaderCell>

                      <CTableHeaderCell className="bg-body-tertiary">
                        Lineman Name
                      </CTableHeaderCell>
                      <CTableHeaderCell className="bg-body-tertiary">
                        PDF Action
                      </CTableHeaderCell>


                    </CTableRow>
                  </CTableHead>

                  <CTableBody>


                    {data.map((item, index) => (
                      <CTableRow key={index} style={{ fontSize: 10 }}>
                        <CTableDataCell className="text-center">{item.looseFlag}</CTableDataCell>
                        <CTableDataCell className="text-center">
                          {/* {item.activityDate} */}
                          {/* {moment(item.activityDate, 'DD-MM-YYYY HH:mm:ss').format('DD/MM/YYYY')} */}
                          {moment(item.activityDate).utc().format('DD/MM/YYYY')}
                        </CTableDataCell>

                        <CTableDataCell className="text-center">{item.looseFlag=="LOOSE"?item.lM_Division:item.division}</CTableDataCell>
                        <CTableDataCell className="text-center">{item.orderId==""?"NA":item.orderId}</CTableDataCell>
                        <CTableDataCell className="text-center">{item.ca}</CTableDataCell>
                        <CTableDataCell className="text-center">{item.orderType}</CTableDataCell>
                        {/* <CTableDataCell className="text-center">{item.activityType}</CTableDataCell> */}
                        <CTableDataCell className="text-center">{item.newMeterNo==""?"NA":item.newMeterNo}</CTableDataCell>

                        <CTableDataCell className="text-center">
                          {item.oldMeterNo==""?"NA":item.oldMeterNo}
                        </CTableDataCell>

                        <CTableDataCell className="text-center">{item.linemanName==""?"NA":item.linemanName}</CTableDataCell>
                        <CTableDataCell className="text-center">

                          <CButton color="danger" variant="outline"
                            // onClick={() => {
                            //   setImageGallery(true)
                            //   setSelectedItem(item)
                            // }}
                            // onClick={() => handleButtonClick(item)}
                            onClick={() => viewPdf(item)}
                            className="me-2"
                          ><GrFormView />
                          </CButton>
                          <CButton color="danger" variant="outline"
                            onClick={() => generatePdf(item)}
                            className="me-2"
                          ><RiDownloadLine />
                          </CButton>

                          <CButton color="danger" variant="outline"
                            onClick={() => printPdf(item)}

                          ><MdPrint />
                          </CButton>

                        </CTableDataCell>


                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
              </CCardBody>
            </CCard>
          }
        </CCardBody>
      </CCol>


    </CRow>

  )
}

export default MCRPDFGen
