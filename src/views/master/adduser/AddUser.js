import React, { useEffect, useState } from 'react'
import {
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
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CFormCheck,
  CProgress,
  CAvatar,
  CCardFooter,
  // CInput,
  CButtonGroup,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CSpinner,
  CTooltip,
  CContainer,
  CPagination,
  CPaginationItem,
} from '@coreui/react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
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
} from '@coreui/icons'
import PropTypes from 'prop-types'

import CIcon from '@coreui/icons-react'
import { cilBell } from '@coreui/icons'
// import { DocsExample } from '../../../components'
import { DocsExample } from '../../../components'
import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'
import { ADD_USER_URL, DIVISION_URL, MAMS_EMPLOYEE_URL, RESET_PWD_URL, ROLES_URL, UPDATE_USER_URL, VENDOR_LIST_URL } from '../../../utils/ConstantURL'
import { jwtDecode } from 'jwt-decode'

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

const tableExample2 = [
  {
    SNo: 1,
    Name: 'RAHUL KATARIA',
    UserID: 'MS112',
    IMEINo: '',
    MobileNo: '8708795911',
    Division: 'S2HKS',
    Designation: '',
    Role: 'Admin',
    Status: 'Active',
    PasswordReset: 'Reset Password',
    Action: 'Update',
  },
  {
    SNo: 2,
    Name: 'Hardeep Singh',
    UserID: '41017580',
    IMEINo: '865295059826552',
    MobileNo: '8010953059',
    Division: 'W1JFR',
    Designation: 'LR_Engineer',
    Role: 'Admin',
    Status: 'Active',
    PasswordReset: 'Reset Password',
    Action: 'Update',
  },
  {
    SNo: 3,
    Name: 'Jitender Singh Gussain',
    UserID: '41009619',
    IMEINo: 'NA',
    MobileNo: '8076386765',
    Division: 'S2RKP',
    Designation: 'engineer',
    Role: 'Admin',
    Status: 'Inactive',
    PasswordReset: 'Reset Password',
    Action: 'Update',
  },
  {
    SNo: 4,
    Name: 'Pushp Dutt Pandey',
    UserID: 'SF7488',
    IMEINo: '',
    MobileNo: '9873460201',
    Division: 'S2SKT',
    Designation: 'Div.Co-ordinator',
    Role: 'Admin',
    Status: 'Active',
    PasswordReset: 'Reset Password',
    Action: 'Update',
  },
  {
    SNo: 5,
    Name: 'Mukesh Aggarwal',
    UserID: '41016344',
    IMEINo: '12345678912345',
    MobileNo: '8470945750',
    Division: 'W1MDK',
    Designation: 'Asst. Manager',
    Role: 'Admin',
    Status: 'Active',
    PasswordReset: 'Reset Password',
    Action: 'Update',
  },
  {
    SNo: 6,
    Name: 'Jitender',
    UserID: '41017409',
    IMEINo: 'b549aa4d43f73c3b',
    MobileNo: '9555757889',
    Division: 'W2MGN',
    Designation: 'Supervisor',
    Role: 'Admin',
    Status: 'Active',
    PasswordReset: 'Reset Password',
    Action: 'Update',
  },
  {
    SNo: 7,
    Name: 'Dinesh kumar',
    UserID: 'SF7489',
    IMEINo: 'NA',
    MobileNo: 'NA',
    Division: 'S2SKT',
    Designation: 'Div coordinator',
    Role: 'Admin',
    Status: 'Active',
    PasswordReset: 'Reset Password',
    Action: 'Update',
  },
  {
    SNo: 8,
    Name: 'Apoorva Neelabh',
    UserID: '41019678',
    IMEINo: '51b64058fc37158b',
    MobileNo: '9599331421',
    Division: 'S1ALN',
    Designation: 'Assistant Manager',
    Role: 'Admin',
    Status: 'Inactive',
    PasswordReset: 'Reset Password',
    Action: 'Update',
  },
  {
    SNo: 9,
    Name: 'PRANSHU PAL',
    UserID: '41016513',
    IMEINo: '866047048131431',
    MobileNo: '8470945861',
    Division: 'W1NGL',
    Designation: 'COORDINATOR',
    Role: 'Admin',
    Status: 'Active',
    PasswordReset: 'Reset Password',
    Action: 'Update',
  },
  {
    SNo: 10,
    Name: 'ASHISH K SINGH',
    UserID: '41017396',
    IMEINo: '864449034556062',
    MobileNo: '9555875279',
    Division: 'W1JFR',
    Designation: 'MMG Coordinator',
    Role: 'Admin',
    Status: 'Active',
    PasswordReset: 'Reset Password',
    Action: 'Update',
  },
  {
    SNo: 11,
    Name: 'Vijay Singh',
    UserID: '41016287',
    IMEINo: '12345678912345',
    MobileNo: '1234567890',
    Division: 'W2UTN',
    Designation: 'Sr.Supervisor',
    Role: 'Admin',
    Status: 'Active',
    PasswordReset: 'Reset Password',
    Action: 'Update',
  },
  {
    SNo: 12,
    Name: 'ARVINDRA PANDEY',
    UserID: '41007661',
    IMEINo: '',
    MobileNo: '',
    Division: 'W2JKP',
    Designation: 'MMG Coordinator',
    Role: 'Admin',
    Status: 'Active',
    PasswordReset: 'Reset Password',
    Action: 'Update',
  },
  {
    SNo: 13,
    Name: 'Chandrasekhar Dash',
    UserID: '41003111',
    IMEINo: '',
    MobileNo: '',
    Division: 'W1NJF',
    Designation: 'Sr Manager',
    Role: 'Admin',
    Status: 'Active',
    PasswordReset: 'Reset Password',
    Action: 'Update',
  },
  {
    SNo: 14,
    Name: 'Manoj Phondani',
    UserID: '41017631',
    IMEINo: '',
    MobileNo: '9758556390',
    Division: 'S2VKJ',
    Designation: 'ENGINEER',
    Role: 'Admin',
    Status: 'Active',
    PasswordReset: 'Reset Password',
    Action: 'Update',
  },
  {
    SNo: 15,
    Name: 'Deepak',
    UserID: '41016554',
    IMEINo: 'NA',
    MobileNo: '',
    Division: 'S1KHP',
    Designation: 'MMG-SUPERVISOR',
    Role: 'Admin',
    Status: 'Active',
    PasswordReset: 'Reset Password',
    Action: 'Update',
  },
  {
    SNo: 16,
    Name: 'KUNDAN KUMAR',
    UserID: '41014600',
    IMEINo: '',
    MobileNo: '8010930103',
    Division: 'S1NZD',
    Designation: 'MANAGER',
    Role: 'Admin',
    Status: 'Active',
    PasswordReset: 'Reset Password',
    Action: 'Update',
  },
  {
    SNo: 17,
    Name: 'Pradeep Kumar',
    UserID: '41016512',
    IMEINo: '12345678912345',
    MobileNo: '',
    Division: 'W2PLM',
    Designation: 'Sr.Supervisor',
    Role: 'Admin',
    Status: 'Active',
    PasswordReset: 'Reset Password',
    Action: 'Update',
  },
  {
    SNo: 18,
    Name: 'Rajesh Verma',
    UserID: '40134736',
    IMEINo: '',
    MobileNo: '',
    Division: 'W1NJF',
    Designation: 'Asst. Manager',
    Role: 'Admin',
    Status: 'Active',
    PasswordReset: 'Reset Password',
    Action: '',
  },
]

const AddUser = () => {
  const [showAddUserForm, setShowAddUserForm] = useState(false)
  const [showUpdateUserForm, setShowUpdateUserForm] = useState(false)
  console.log('dfghj::::::', showAddUserForm)
  const [selectedUser, setSelectedUser] = useState({
    activeFlag: '',
    company: '',
    designation: '',
    divisions: '',
    empType: '',
    mobileNo: '',
    role: '',
    status: '',
    userId: '',
    userName: '',
    vendorId: '',
  });

  const [order, setOrder] = useState('asc')
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState('')
  const [data, setData] = useState([])


  const [reload, setReload] = useState(false)
  // for testing-start
  // const totalPages2 = Math.ceil(tableExample2.length / rowsPerPage)
  const totalPages2 = Math.ceil(data.length / rowsPerPage)

  const [orderBy2, setOrderBy2] = useState('Name')


  const handleSort2 = (property) => {
    const isAsc = orderBy2 === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy2(property)
  }
  //EARLIER CODE
  // const filteredData2 = tableExample2.filter((item) => {
  //   const lowercasedSearchTerm = searchTerm.toLowerCase()
  //   return (
  //     item.Name.toLowerCase().includes(lowercasedSearchTerm) ||
  //     item.UserID.toLowerCase().includes(lowercasedSearchTerm) ||
  //     item.Division.toLowerCase().includes(lowercasedSearchTerm) ||
  //     item.Designation.toLowerCase().includes(lowercasedSearchTerm) ||
  //     item.Role.toLowerCase().includes(lowercasedSearchTerm)
  //   )
  // })

  const filteredData2 = data.filter((item) => {
    const lowercasedSearchTerm = searchTerm.toLowerCase()
    return (
      item.userName.toLowerCase().includes(lowercasedSearchTerm) ||
      item.userId.toLowerCase().includes(lowercasedSearchTerm) ||
      item.divisions.toLowerCase().includes(lowercasedSearchTerm) ||
      item.designation.toLowerCase().includes(lowercasedSearchTerm) ||
      item.role.toLowerCase().includes(lowercasedSearchTerm)
    )
  })


  // const sortedData2 = tableExample2.slice().sort((a, b) => {
  //   if (order === 'asc') {
  //     return a.Name.localeCompare(b.Name)
  //   } else {
  //     return b.Name.localeCompare(a.Name)
  //   }
  // })

  //earlier code
  // const sortedAndFilteredData2 = filteredData2.slice().sort((a, b) => {
  //   if (orderBy2 === 'Name') {
  //     return order === 'asc' ? a.Name.localeCompare(b.Name) : b.Name.localeCompare(a.Name)
  //   } else if (orderBy2 === 'UserID') {
  //     return order === 'asc' ? a.UserID.localeCompare(b.UserID) : b.UserID.localeCompare(a.UserID)
  //   } else if (orderBy2 === 'Division') {
  //     return order === 'asc'
  //       ? a.Division.localeCompare(b.Division)
  //       : b.Division.localeCompare(a.Division)
  //   } else if (orderBy2 === 'Role') {
  //     return order === 'asc' ? a.Role.localeCompare(b.Role) : b.Role.localeCompare(a.Role)
  //   } else if (orderBy2 === 'Designation') {
  //     return order === 'asc'
  //       ? a.Designation.localeCompare(b.Designation)
  //       : b.Designation.localeCompare(a.Designation)
  //   } else if (orderBy2 === 'Status') {
  //     return order === 'asc' ? a.Status.localeCompare(b.Status) : b.Status.localeCompare(a.Status)
  //   }
  //   return 0
  // })


  const sortedAndFilteredData2 = filteredData2.slice().sort((a, b) => {
    if (orderBy2 === 'Name') {
      return order === 'asc' ? a.userName.localeCompare(b.userName) : b.userName.localeCompare(a.userName)
    } else if (orderBy2 === 'UserID') {
      return order === 'asc' ? a.userId.localeCompare(b.userId) : b.userId.localeCompare(a.userId)
    } else if (orderBy2 === 'Division') {
      return order === 'asc'
        ? a.divisions.localeCompare(b.divisions)
        : b.divisions.localeCompare(a.divisions)
    } else if (orderBy2 === 'Role') {
      return order === 'asc' ? a.role.localeCompare(b.role) : b.role.localeCompare(a.role)
    } else if (orderBy2 === 'Designation') {
      return order === 'asc'
        ? a.designation.localeCompare(b.designation)
        : b.designation.localeCompare(a.designation)
    } else if (orderBy2 === 'Status') {
      return order === 'asc' ? a.status.localeCompare(b.status) : b.status.localeCompare(a.status)
    }
    return 0
  })


  const sortedData2 = data.slice().sort((a, b) => {
    if (orderBy2 === 'Name') {
      return order === 'asc' ? a.userName.localeCompare(b.userName) : b.userName.localeCompare(a.userName)
    } else if (orderBy2 === 'UserID') {
      return order === 'asc' ? a.userId.localeCompare(b.userId) : b.userId.localeCompare(a.userId)
    } else if (orderBy2 === 'Division') {
      return order === 'asc'
        ? a.divisions.localeCompare(b.divisions)
        : b.divisions.localeCompare(a.divisions)
    } else if (orderBy2 === 'Role') {
      return order === 'asc' ? a.role.localeCompare(b.role) : b.role.localeCompare(a.role)
    } else if (orderBy2 === 'Designation') {
      return order === 'asc'
        ? a.designation.localeCompare(b.designation)
        : b.designation.localeCompare(a.designation)
    } else if (orderBy2 === 'Status') {
      return order === 'asc' ? a.status.localeCompare(b.status) : b.status.localeCompare(a.status)
    }
    return 0
  })


  // const sortedData2 = tableExample2.slice().sort((a, b) => {
  //   if (orderBy2 === 'Name') {
  //     return order === 'asc' ? a.Name.localeCompare(b.Name) : b.Name.localeCompare(a.Name)
  //   } else if (orderBy2 === 'UserID') {
  //     return order === 'asc' ? a.UserID.localeCompare(b.UserID) : b.UserID.localeCompare(a.UserID)
  //   } else if (orderBy2 === 'Division') {
  //     return order === 'asc'
  //       ? a.Division.localeCompare(b.Division)
  //       : b.Division.localeCompare(a.Division)
  //   } else if (orderBy2 === 'Role') {
  //     return order === 'asc' ? a.Role.localeCompare(b.Role) : b.Role.localeCompare(a.Role)
  //   } else if (orderBy2 === 'Designation') {
  //     return order === 'asc'
  //       ? a.Designation.localeCompare(b.Designation)
  //       : b.Designation.localeCompare(a.Designation)
  //   } else if (orderBy2 === 'Status') {
  //     return order === 'asc' ? a.Status.localeCompare(b.Status) : b.Status.localeCompare(a.Status)
  //   }
  //   return 0
  // })

  // const paginatedData2 = sortedData2.slice((page - 1) * rowsPerPage, page * rowsPerPage)

  const paginatedData2 = sortedAndFilteredData2.slice((page - 1) * rowsPerPage, page * rowsPerPage)

  //for testig-end
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages2) {
      setPage(newPage)
    }
  }

  // Calculate the page numbers to be displayed
  const getPageNumbers = () => {
    const pageNumbers = []
    const start = Math.max(1, page - 1)
    const end = Math.min(totalPages2, page + 1)

    for (let i = start; i <= end; i++) {
      pageNumbers.push(i)
    }

    return pageNumbers
  }


  // const [data1,setData1]=useState([]);
  const [load1, setLoad1] = useState(false)
  const [emptyData, setEmptyData] = useState(false)


  useEffect(() => {
    const fetchData = async () => {


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


      try {
        // setLoader(true); // Show loader initially
        setData([]); // Clear previous data before starting new fetch
        setLoad1(true)
        const response = await axios.post(MAMS_EMPLOYEE_URL,
          {


            userID: decodedToken.userId,
            sType: "0",
            divisions: divs
            //,
            //   role: decodedToken.Role

          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data && response.status === 200) {
          const fetchedData = response.data.userDtls;
          console.log("test::15456::::", fetchedData);
          setData((prevData) => [...prevData, ...fetchedData]);
          // setLoader(false);
          setLoad1(false)
          setEmptyData(false)

        }
        else {
          // setLoader(false);
          setLoad1(false)
          setEmptyData(true)
        }
      } catch (error) {
        // Handle errors
        console.error("Error fetching data:", error);
        // setLoader(false);
        setLoad1(false)
      }




    };

    fetchData();
  }, [reload]); // Make sure dependencies are correct here



  const [divisions, setDivisions] = useState([]);
  const [roles, setRoles] = useState([]);
  const [div, setDiv] = useState('');




  useEffect(() => {
    const fetchDivisions = async () => {
      try {

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
        setDiv(divs)

        const response = await axios.post(DIVISION_URL, {
          id: `${decodedToken.userId}`,
          divisionIds: `${divs}`
        }, {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in Authorization header
          }
        });
        // Parse and set data
        if (response.data && Array.isArray(response.data.response)) {
          console.log("test:::division", response.data.response)
          // console.log("")
          setDivisions(response.data.response);
        }
      } catch (error) {
        console.error('Error fetching division data:', error);
      }
    };

    const fetchRoles = async () => {
      try {


        const token = sessionStorage.getItem('authToken');
        // Decode token and use data
        const decodedToken = jwtDecode(token);
        console.log('Decoded Token:', decodedToken);
        const role = decodedToken.Role

        const response = await axios.post(ROLES_URL, {
          // id: '41007656',
          id: `${decodedToken.userId}`,
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

    fetchDivisions();
    fetchRoles();
  }, []);


  // div
  const [vendorList, setVendorList] = useState([]);


  // useEffect(() => {
  //   const VendorListData = async () => {
  //     const token = sessionStorage.getItem('authToken');

  //     // Decode token and use data
  //     const decodedToken = jwtDecode(token);
  //     console.log('Decoded Token:', decodedToken);
  //     console.log("seklefghfyugy:::", selectedUser)


  //     try {


  //       const response = await axios.post(VENDOR_LIST_URL,
  //         {
  //           divisionId: selectedUser.divisions,
  //           userId: decodedToken.userId
  //         },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );

  //       if (response.data && response.status === 200) {
  //         const fetchedData = response.data.response;
  //         console.log("test::15456bhhhhhhhhh::::vendor testststt", fetchedData);
  //         // setData((prevData) => [...prevData, ...fetchedData]);
  //         setVendorList(fetchedData)


  //         // setLoader(false);

  //       } else {
  //         // setLoader(false);
  //       }
  //     } catch (error) {
  //       // Handle errors
  //       console.error("Error fetching data:", error);
  //       // setLoader(false);
  //     }




  //   };

  //   VendorListData();
  // }, [selectedUser.divisions]); // Make sure dependencies are correct here

  useEffect(() => {
    const VendorListData = async () => {
      const token = sessionStorage.getItem('authToken');

      // Decode token and use data
      const decodedToken = jwtDecode(token);
      console.log('Decoded Token:', decodedToken);
      console.log("selectedUser:::", selectedUser);

      try {
        const response = await axios.post(
          VENDOR_LIST_URL,
          {
            divisionId: selectedUser.divisions,
            userId: decodedToken.userId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data && response.status === 200) {
          const fetchedData = response.data.response;
          console.log("Vendor List fetched:", fetchedData);
          setVendorList(fetchedData);
        }
      } catch (error) {
        console.error("Error fetching vendor list data:", error);
      }
    };

    VendorListData();
  }, [selectedUser.divisions]);


  const handleUpdateUser = async () => {

    if (selectedUser.userName === '' || selectedUser.userName == null) {
      toast.error('Username is Mandatory', {
        position: "top-center",
        autoClose: 1000,
        progress: undefined,
      });
      return;
    }

    if (selectedUser.userId === '' || selectedUser.userId == null) {
      toast.error('User Id is Mandatory', {
        position: "top-center",
        autoClose: 1000,
        progress: undefined,
      });
      return;
    }

    if (selectedUser.mobileNo.length != 10 || selectedUser.mobileNo == null || selectedUser.mobileNo.length === '') {
      toast.error('Mobile No is Mandatory', {
        position: "top-center",
        autoClose: 1000,
        progress: undefined,
      });
      return;
    }

    if (selectedUser.designation === '' || selectedUser.designation == null) {
      toast.error('Designation is Mandatory', {
        position: "top-center",
        autoClose: 1000,
        progress: undefined,
      });
      return;
    }

    if (selectedUser.divisions === '' || selectedUser.divisions == null) {
      toast.error('Division is Mandatory', {
        position: "top-center",
        autoClose: 1000,
        progress: undefined,
      });
      return;
    }

    if (selectedUser.role === '' || selectedUser.role == null) {
      toast.error('Role is Mandatory', {
        position: "top-center",
        autoClose: 1000,
        progress: undefined,
      });
      return;
    }

    if (selectedUser.activeFlag.trim() === '' || selectedUser.status.trim() == null) {
      toast.error('Status is Mandatory', {
        position: "top-center",
        autoClose: 1000,
        progress: undefined,
      });
      return;
    }






    const token = sessionStorage.getItem('authToken');
    const decodedToken = jwtDecode(token);
    console.log('Decoded Token:', decodedToken);


    try {
      // setLoader(true); // Show loader initially

      const response = await axios.post(
        UPDATE_USER_URL,
        {
          id: decodedToken.userId.trim(),
          name: selectedUser.userName,
          designation: selectedUser.designation,
          status: selectedUser.activeFlag,
          userId: selectedUser.userId,
          mobileNo: selectedUser.mobileNo,
          division: selectedUser.divisions,
          role: selectedUser.role,
          company: selectedUser.company,
          vendorId: selectedUser.vendorId,
          empType: selectedUser.role,
          vendorName: selectedUser.role == 'V' ? selectedUser.userName : '',
          empId: selectedUser.userId,
          circle: selectedUser.divisions.charAt(0) == 'S' ? 'South' : selectedUser.divisions.charAt(0) == 'W' ? 'West' : selectedUser.divisions.charAt(0),
          activeFlag: selectedUser.activeFlag,
          vendorFlag: selectedUser.activeFlag
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in Authorization header
          },
        }
      );

      if (response.status === 200) {

        console.log("test::_add", response.data)

        toast.success(response.data.message, {
          position: "top-center",
          autoClose: 1000,
          progress: undefined,
        });


        setReload(prevValue => !prevValue);


      } else {
        // If an error or no data in the response, stop fetching
      }

    } catch (error) {
      // Handle errors
      console.error("Error fetching data:", error);
      // setLoader(false);
    }
    finally {
      // setShowAddUserForm(false)
      setShowUpdateUserForm(false)
    }
  };

  const handleAddUser = async () => {


    // NEW USER::::


    if (selectedUser.userName === '' || selectedUser.userName == null) {
      toast.error('Username is Mandatory', {
        position: "top-center",
        autoClose: 1000,
        progress: undefined,
      });
      return;
    }

    if (selectedUser.userId === '' || selectedUser.userId == null) {
      toast.error('User Id is Mandatory', {
        position: "top-center",
        autoClose: 1000,
        progress: undefined,
      });
      return;
    }

    if (selectedUser.mobileNo === '' || selectedUser.mobileNo == null) {
      toast.error('Mobile No is Mandatory', {
        position: "top-center",
        autoClose: 1000,
        progress: undefined,
      });
      return;
    }

    if (selectedUser.designation === '' || selectedUser.designation == null) {
      toast.error('Designation is Mandatory', {
        position: "top-center",
        autoClose: 1000,
        progress: undefined,
      });
      return;
    }

    if (selectedUser.divisions === '' || selectedUser.divisions == null) {
      toast.error('Division is Mandatory', {
        position: "top-center",
        autoClose: 1000,
        progress: undefined,
      });
      return;
    }

    if (selectedUser.role === '' || selectedUser.role == null) {
      toast.error('Role is Mandatory', {
        position: "top-center",
        autoClose: 1000,
        progress: undefined,
      });
      return;
    }

    if (selectedUser.activeFlag.trim() === '' || selectedUser.status.trim() == null) {
      toast.error('Status is Mandatory', {
        position: "top-center",
        autoClose: 1000,
        progress: undefined,
      });
      return;
    }






    const token = sessionStorage.getItem('authToken');
    const decodedToken = jwtDecode(token);
    console.log('Decoded Token:', decodedToken);


    try {
      // setLoader(true); // Show loader initially

      const response = await axios.post(
        ADD_USER_URL,
        {
          id: decodedToken.userId.trim(),
          name: selectedUser.userName,
          designation: selectedUser.designation,
          status: selectedUser.activeFlag,
          userId: selectedUser.userId,
          mobileNo: selectedUser.mobileNo,
          division: selectedUser.divisions,
          role: selectedUser.role,
          // password: "12345678",
          company: selectedUser.company,
          vendorId: selectedUser.vendorId,
          empType: selectedUser.role,
          vendorName: selectedUser.role == 'V' ? selectedUser.userName : '',
          empId: selectedUser.userId,
          circle: selectedUser.divisions.charAt(0) == 'S' ? 'South' : selectedUser.divisions.charAt(0) == 'W' ? 'West' : selectedUser.divisions.charAt(0)
        }
        ,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in Authorization header
          },
        }
      );

      if (response.status === 200) {

        console.log("test::_add", response.data)

        toast.success(response.data.message, {
          position: "top-center",
          autoClose: 1000,
          progress: undefined,
        });

        setReload(prevValue => !prevValue);


      } else {
        // If an error or no data in the response, stop fetching
      }

    } catch (error) {
      // Handle errors
      console.error("Error fetching data:", error);
      // setLoader(false);
    }
    finally {
      setShowAddUserForm(false)
    }
  };


  //Reset Password
  const handleResetPassword = async (id) => {
    const token = sessionStorage.getItem('authToken');
    const decodedToken = jwtDecode(token);
    console.log('Decoded Token:', decodedToken);

    try {
      // Show a toast notification before calling the API
      // const processingToastId = toast.info("Resetting password...", {
      //     position: "top-center",
      //     autoClose: false, // Don't auto-close so it stays visible until we update it
      //     closeOnClick: false,
      //     draggable: false,
      // });

      const response = await axios.post(
        RESET_PWD_URL,
        {
          id: decodedToken.userId.trim(),
          userId: id.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("test::_add", response.data);

        // Update the toast notification with success message and close it
        // toast.update(processingToastId, {
        //     render: response.data.message || "Password reset successfully!",
        //     type: toast.TYPE.SUCCESS,
        //     autoClose: 3000, // Auto-close after 3 seconds
        //     closeOnClick: true,
        //     draggable: true,
        // });
        toast.success(response.data.message || "Password reset successfully!", {
          position: "top-center",
          autoClose: 1000,
          progress: undefined,
        });
        setReload(prevValue => !prevValue);

      } else {
        // If an error or no data in the response, show an error message

        toast.error('Failed to reset password. Please try again.', {
          position: "top-center",
          autoClose: 1000,
          progress: undefined,
        });
      }

    } catch (error) {
      // Handle errors
      console.error("Error fetching data:", error);

      toast.error('An error occurred. Please try again later.', {
        position: "top-center",
        autoClose: 1000,
        progress: undefined,
      });
    }
  };

  // const handleResetPassword = async (id) => {


  //   const token = sessionStorage.getItem('authToken');
  //   const decodedToken = jwtDecode(token);
  //   console.log('Decoded Token:', decodedToken);


  //   try {
  //     // Show a toast notification before calling the API
  //     const processingToastId = toast.info("Resetting password...", {
  //       position: "top-center",
  //       autoClose: false, // Don't auto-close so it stays visible until we update it
  //       closeOnClick: false,
  //       draggable: false,
  //     });

  //     const response = await axios.post(
  //       RESET_PWD_URL,
  //       {
  //         id: decodedToken.userId.trim(),
  //         userId: id.trim()
  //       }
  //       ,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     if (response.status === 200) {

  //       console.log("test::_add", response.data)

  //       // toast.success(response.data.message, {
  //       //   position: "top-center",
  //       //   autoClose: 1000,
  //       //   progress: undefined,
  //       // });

  //       toast.update(processingToastId, {
  //         render: response.data.message || "Password reset successfully!",
  //         type: toast.TYPE.SUCCESS,
  //         autoClose: 3000, // Auto-close after 3 seconds
  //       });



  //     } else {
  //       // If an error or no data in the response, stop fetching
  //       toast.update(processingToastId, {
  //         render: "Failed to reset password. Please try again.",
  //         type: toast.TYPE.ERROR,
  //         autoClose: 3000,
  //       });

  //     }

  //   } catch (error) {
  //     // Handle errors
  //     console.error("Error fetching data:", error);
  //     toast.update(processingToastId, {
  //       render: "An error occurred. Please try again later.",
  //       type: toast.TYPE.ERROR,
  //       autoClose: 3000,
  //     });
  //     // setLoader(false);
  //   }

  // };



  console.log("vendor type iss:::::", selectedUser.role)

  return (
    <CRow>

      <ToastContainer />

      <CModal
        scrollable
        backdrop="static"
        alignment="center"
        visible={showAddUserForm}
        onClose={() => {setShowAddUserForm(false)
          setSelectedUser({
            activeFlag: '',
            company: '',
            designation: '',
            divisions: '',
            empType: '',
            mobileNo: '',
            role: '',
            status: '',
            userId: '',
            userName: '',
            vendorId: '',
          })
        }}
        aria-labelledby="StaticBackdropExampleLabel"
      >
        <CModalHeader>
          <CModalTitle id="StaticBackdropExampleLabel">Add User</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CCardBody>
            <CRow className="mb-1">
              <CCol sm={6} className="mb-1">
                <CFormInput
                  type="text"
                  id="floatingInput"
                  // floatingClassName="mb-3"
                  floatingLabel={
                    <>
                      <span>Name</span> <span className="text-danger">*</span>
                    </>
                  }
                  placeholder="Enter name"

                  value={selectedUser?.userName || ''}
                  onChange={(e) => setSelectedUser({ ...selectedUser, userName: e.target.value })}

                />
              </CCol>
              <CCol sm={6} className="mb-1">
                <CFormInput
                  type="text"
                  id="floatingInput"
                  // floatingClassName="mb-3"
                  floatingLabel={
                    <>
                      <span>User ID</span> <span className="text-danger">*</span>
                    </>
                  }
                  placeholder="Enter User ID"
                  value={selectedUser?.userId || ''}
                  onChange={(e) => setSelectedUser({ ...selectedUser, userId: e.target.value })}

                />
              </CCol>
            </CRow>

            <CRow className="mb-1">
              <CCol sm={6} className="mb-1">
                <CFormInput
                  type="text"
                  id="floatingInput"
                  // floatingClassName="mb-3"
                  floatingLabel={
                    <>
                      <span>Mobile No.</span> <span className="text-danger">*</span>
                    </>
                  }
                  placeholder="Enter mobile no"
                  value={selectedUser?.mobileNo || ''}
                  // onChange={(e) => setSelectedUser({ ...selectedUser, mobileNo: e.target.value })}
                  onChange={(e) => {
                    const inputValue = e.target.value;

                    // Allow only digits and ensure the length is no more than 10 characters
                    if (/^\d{0,10}$/.test(inputValue)) {
                      setSelectedUser({ ...selectedUser, mobileNo: inputValue });
                    }
                  }}

                />
              </CCol>
              <CCol sm={6} className="mb-1">
                <CFormInput
                  type="text"
                  id="floatingInput"
                  // floatingClassName="mb-3"
                  floatingLabel={
                    <>
                      <span>Designation</span> <span className="text-danger">*</span>
                    </>
                  }
                  placeholder="Enter Designation"
                  value={selectedUser?.designation || ''}
                  onChange={(e) => setSelectedUser({ ...selectedUser, designation: e.target.value })}

                />
              </CCol>
            </CRow>



            <CRow className="mb-1" >
              <CCol sm={6} className="mb-1">
                <CFormSelect
                  id="floatingSelect"
                  floatingLabel={
                    <>
                      <span>Division</span> <span className="text-danger">*</span>
                    </>
                  }
                  aria-label="Division"
                  value={selectedUser?.divisions || ''}
                  onChange={(e) => setSelectedUser({ ...selectedUser, divisions: e.target.value })}

                >
                  {/* <option>Select</option>
                  <option value="1">Alaknanda</option>
                  <option value="2">Dwarka</option>
                  <option value="3">Hauz Khas</option> */}

                  {/* <option>Open this select menu</option> */}
                  <option>Select</option>
                  {divisions.map((division) => (
                    <option key={division.divCode} value={division.divCode}>
                      {division.divName}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
              <CCol sm={6} className="mb-1">
                <CFormSelect
                  id="floatingSelect"
                  floatingLabel={
                    <>
                      <span>Role</span> <span className="text-danger">*</span>
                    </>
                  }
                  aria-label="Floating label select example"
                  value={selectedUser?.role || ''}
                  onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })}

                >
                  {/* <option>Select</option>
                  <option value="1">Admin</option>
                  <option value="2">Installer</option>
                  <option value="3">Vendor</option>
                  <option value="4">MMG Admin</option>
                  <option value="5">MMG Audit</option> */}

                  <option>Select</option>
                  {roles.map((role) => (
                    <option key={role.roleValue} value={role.roleValue}>
                      {role.roleLabel}
                    </option>
                  ))}

                </CFormSelect>
              </CCol>
            </CRow>

            <CRow className="mb-1">
              <CCol sm={6} className="mb-1">

                {selectedUser.role == "V" ?
                  <CFormInput
                    type="text"
                    id="floatingInput"
                    // floatingClassName="mb-3"
                    floatingLabel={
                      <>
                        <span>Vendor</span> <span className="text-danger">*</span>
                      </>
                    }
                    placeholder="Enter Vendor"

                    value={selectedUser?.vendorId || ''}
                    onChange={(e) => setSelectedUser({ ...selectedUser, vendorId: e.target.value })}

                  /> : <CFormSelect
                    id="floatingSelect"
                    floatingLabel={
                      <>
                        <span>Vendor</span> <span className="text-danger">*</span>
                      </>
                    }
                    aria-label="Floating label select example"
                    value={selectedUser?.vendorId || ''}
                    onChange={(e) =>
                      setSelectedUser({ ...selectedUser, vendorId: e.target.value })
                    }
                  >
                    <option>Select</option>
                    {vendorList.map((vendor) => (
                      <option key={vendor.vendorId} value={vendor.vendorId}>
                        {vendor.vendorName}
                      </option>
                    ))}
                  </CFormSelect>
                }







              </CCol>
              <CCol sm={6} className="mb-1">
                <CFormSelect
                  id="floatingSelect"
                  floatingLabel={
                    <>
                      <span>Status</span> <span className="text-danger">*</span>
                    </>
                  }
                  aria-label="Floating label select example"
                  value={selectedUser?.activeFlag || ''}
                  onChange={(e) => setSelectedUser({ ...selectedUser, activeFlag: e.target.value })}
                // {item.activeFlag=='Y'?'Active':'InActive'}

                >
                  <option>Select</option>
                  <option value="Y">Active</option>
                  <option value="N">Inactive</option>
                </CFormSelect>
              </CCol>
            </CRow>




          </CCardBody>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => {setShowAddUserForm(false)
                setSelectedUser({
                  activeFlag: '',
                  company: '',
                  designation: '',
                  divisions: '',
                  empType: '',
                  mobileNo: '',
                  role: '',
                  status: '',
                  userId: '',
                  userName: '',
                  vendorId: '',
                })
          }}>
            Close
          </CButton>
          <CButton color="primary"
            onClick={() => {handleAddUser()
              setSelectedUser({
                activeFlag: '',
                company: '',
                designation: '',
                divisions: '',
                empType: '',
                mobileNo: '',
                role: '',
                status: '',
                userId: '',
                userName: '',
                vendorId: '',
              })
            }}>Save changes</CButton>
        </CModalFooter>
      </CModal>


      {/* update users */}

      <CModal
        scrollable
        backdrop="static"
        alignment="center"
        visible={showUpdateUserForm}
        onClose={() => {setShowUpdateUserForm(false)
          setSelectedUser({
            activeFlag: '',
            company: '',
            designation: '',
            divisions: '',
            empType: '',
            mobileNo: '',
            role: '',
            status: '',
            userId: '',
            userName: '',
            vendorId: '',
          })
        }}
        aria-labelledby="StaticBackdropExampleLabel"
      >
        <CModalHeader>
          <CModalTitle id="StaticBackdropExampleLabel">Update User</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CCardBody>
            <CRow className="mb-1">
              <CCol sm={6} className="mb-1">
                <CFormInput
                  type="text"
                  id="floatingInput"
                  // floatingClassName="mb-3"
                  floatingLabel={
                    <>
                      <span>Name</span> <span className="text-danger">*</span>
                    </>
                  }
                  placeholder="Enter name"
                  value={selectedUser?.userName || ''}
                  onChange={(e) => setSelectedUser({ ...selectedUser, userName: e.target.value })}
                />
              </CCol>
              <CCol sm={6} V>
                <CFormInput
                  type="text"
                  id="floatingInput"
                  // floatingClassName="mb-3"
                  floatingLabel={
                    <>
                      <span>User ID</span> <span className="text-danger">*</span>
                    </>
                  }
                  placeholder="Enter User ID"
                  value={selectedUser?.userId || ''}
                  onChange={(e) => setSelectedUser({ ...selectedUser, userId: e.target.value })}
                />
              </CCol>
            </CRow>

            <CRow className="mb-1">
              <CCol sm={6} className="mb-1">
                <CFormInput
                  type="text"
                  id="floatingInput"
                  floatingClassName="mb-3"
                  floatingLabel={
                    <>
                      <span>Mobile No.</span> <span className="text-danger">*</span>
                    </>
                  }
                  placeholder="Enter mobile no"
                  value={selectedUser?.mobileNo || ''}
                  // onChange={(e) => setSelectedUser({ ...selectedUser, mobileNo: e.target.value })}
                  onChange={(e) => {
                    const inputValue = e.target.value;

                    // Allow only digits and ensure the length is no more than 10 characters
                    if (/^\d{0,10}$/.test(inputValue)) {
                      setSelectedUser({ ...selectedUser, mobileNo: inputValue });
                    }
                  }}
                />
              </CCol>
              <CCol sm={6} className="mb-1">
                <CFormInput
                  type="text"
                  id="floatingInput"
                  floatingClassName="mb-3"
                  floatingLabel={
                    <>
                      <span>Designation</span> <span className="text-danger">*</span>
                    </>
                  }
                  placeholder="Enter Designation"
                  value={selectedUser?.designation || ''}
                  onChange={(e) => setSelectedUser({ ...selectedUser, designation: e.target.value })}
                />
              </CCol>
            </CRow>

            <CRow className="mb-1">
              <CCol sm={6} className="mb-1">
                <CFormSelect
                  id="floatingSelect"
                  floatingLabel={
                    <>
                      <span>Division</span> <span className="text-danger">*</span>
                    </>
                  }
                  aria-label="Division"
                  value={selectedUser?.divisions || ''}
                  onChange={(e) => setSelectedUser({ ...selectedUser, divisions: e.target.value })}
                >

                  <option>Select</option>
                  {divisions.map((division) => (
                    <option key={division.divCode} value={division.divCode}>
                      {division.divName}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
              <CCol sm={6} className="mb-1">
                <CFormSelect
                  id="floatingSelect"
                  floatingLabel={
                    <>
                      <span>Role</span> <span className="text-danger">*</span>
                    </>
                  }
                  aria-label="Floating label select example"
                  value={selectedUser?.role || ''}
                  onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })}
                >
                  <option>Select</option>
                  {roles.map((role) => (
                    <option key={role.roleValue} value={role.roleValue}>
                      {role.roleLabel}
                    </option>
                  ))}

                </CFormSelect>
              </CCol>
            </CRow>

            <CRow className="mb-1">

              <CCol sm={6} className="mb-1">
                {selectedUser?.role == 'V' ? <CFormInput
                  type="text"
                  id="floatingInput"
                  floatingClassName="mb-3"
                  floatingLabel={
                    <>
                      <span>Vendor</span> <span className="text-danger">*</span>
                    </>
                  }
                  placeholder="Enter Vendor"
                  value={selectedUser?.vendorId || ''}
                  onChange={(e) => setSelectedUser({ ...selectedUser, vendorId: e.target.value })}
                /> : <CFormSelect
                  id="floatingSelect"
                  floatingLabel={
                    <>
                      <span>Vendor</span> <span className="text-danger">*</span>
                    </>
                  }
                  aria-label="Floating label select example"
                  value={selectedUser?.vendorId || ''}
                  onChange={(e) => setSelectedUser({ ...selectedUser, vendorId: e.target.value })}
                >
                  {/* <option>Select</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option> */}

                  <option>Select</option>
                  {vendorList.map((role) => (
                    <option key={role.vendorId} value={role.vendorId}>
                      {role.vendorName}
                    </option>
                  ))}
                </CFormSelect>}

              </CCol>

              <CCol sm={6} className="mb-1">

                <CFormSelect
                  id="floatingSelect"
                  floatingLabel={
                    <>
                      <span>Status</span> <span className="text-danger">*</span>
                    </>
                  }
                  aria-label="Floating label select example"
                  value={selectedUser?.activeFlag.trim() || 'Y'}
                  onChange={(e) => setSelectedUser({ ...selectedUser, activeFlag: e.target.value })}
                >
                  <option>Select</option>
                  <option value="Y">Active</option>
                  <option value="N">Inactive</option>
                </CFormSelect>

              </CCol>
            </CRow>


            {/* <CRow className="mb-3">
              <CCol sm={4}>
                <CFormSelect
                  id="floatingSelect"
                  floatingLabel={
                    <>
                      <span>Division</span> <span className="text-danger">*</span>
                    </>
                  }
                  aria-label="Division"
                  value={selectedUser?.divisions || ''}
                  onChange={(e) => setSelectedUser({ ...selectedUser, divisions: e.target.value })}
                >

                  <option>Select</option>
                  {divisions.map((division) => (
                    <option key={division.divCode} value={division.divCode}>
                      {division.divName}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>

              <CCol sm={4}>
                <CFormSelect
                  id="floatingSelect"
                  floatingLabel={
                    <>
                      <span>Role</span> <span className="text-danger">*</span>
                    </>
                  }
                  aria-label="Floating label select example"
                  value={selectedUser?.role || ''}
                  onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })}
                >
                  <option>Select</option>
                  {roles.map((role) => (
                    <option key={role.roleValue} value={role.roleLabel}>
                      {role.roleLabel}
                    </option>
                  ))}

                </CFormSelect>
              </CCol>

              <CCol sm={4}>
                <CFormSelect
                  id="floatingSelect"
                  floatingLabel={
                    <>
                      <span>Status</span> <span className="text-danger">*</span>
                    </>
                  }
                  aria-label="Floating label select example"
                  value={selectedUser?.status || ''}
                  onChange={(e) => setSelectedUser({ ...selectedUser, status: e.target.value })}
                >
                  <option>Select</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </CFormSelect>
              </CCol>
            </CRow> */}


          </CCardBody>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => {setShowUpdateUserForm(false)
                setSelectedUser({
                  activeFlag: '',
                  company: '',
                  designation: '',
                  divisions: '',
                  empType: '',
                  mobileNo: '',
                  role: '',
                  status: '',
                  userId: '',
                  userName: '',
                  vendorId: '',
                })
          }}>
            Close
          </CButton>
          <CButton color="primary"
            onClick={() => {
              handleUpdateUser();
              // setShowUpdateUserForm(false)
              setSelectedUser({
                activeFlag: '',
                company: '',
                designation: '',
                divisions: '',
                empType: '',
                mobileNo: '',
                role: '',
                status: '',
                userId: '',
                userName: '',
                vendorId: '',
              })

            }}
          >Save changes</CButton>
        </CModalFooter>
      </CModal>




      <CCardBody className="mb-3">
        <CRow className="align-items-center">
          <CCol xs={12} sm={6} md={4}>
            <h4 className="card-title mb-0">Users</h4>
          </CCol>
          <CCol
            xs={12}
            sm={6}
            md={8}
            className="d-flex justify-content-end align-items-center mt-2 mt-sm-0"
          >
            <CFormInput
              type="search"
              placeholder="Search users..."
              className="me-2"
              style={{ maxWidth: '200px' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <CButton color="primary" onClick={() => setShowAddUserForm(true)}>
              <CIcon icon={cilUserFollow} style={{ marginRight: '8px' }} />
              Add User
            </CButton>
          </CCol>
        </CRow>
      </CCardBody>

      {(load1 == false && emptyData == false) &&
        <CCol xs={12}>
          {/* <CCard className="mb-4">
      
          <CTable align="middle" className="mb-0 border" hover responsive>
            <CTableHead className="text-nowrap">
              <CTableRow>
                <CTableHeaderCell className="bg-body-tertiary text-center">
                  <CIcon icon={cilPeople} />
                </CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">User</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary text-center">
                  Country
                </CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">Usage</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary text-center">
                  Payment Method
                </CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">Activity</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {tableExample.map((item, index) => (
                <CTableRow v-for="item in tableItems" key={index}>
                  <CTableDataCell className="text-center">
                    <CAvatar size="md" src={item.avatar.src} status={item.avatar.status} />
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>{item.user.name}</div>
                    <div className="small text-body-secondary text-nowrap">
                      <span>{item.user.new ? 'New' : 'Recurring'}</span> | Registered:{' '}
                      {item.user.registered}
                    </div>
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    <CIcon size="xl" icon={item.country.flag} title={item.country.name} />
                  </CTableDataCell>
                  <CTableDataCell>
                    <div className="d-flex justify-content-between text-nowrap">
                      <div className="fw-semibold">{item.usage.value}%</div>
                      <div className="ms-3">
                        <small className="text-body-secondary">{item.usage.period}</small>
                      </div>
                    </div>
                    <CProgress thin color={item.usage.color} value={item.usage.value} />
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    <CIcon size="xl" icon={item.payment.icon} />
                  </CTableDataCell>
                  <CTableDataCell>
                    <div className="small text-body-secondary text-nowrap">Last login</div>
                    <div className="fw-semibold text-nowrap">{item.activity}</div>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCard> */}

          {/* <div>
      <EnhancedTableToolbar numSelected={selected.length} />
      <CTable align="middle" className="mb-0 border" hover responsive>
        <EnhancedTableHead />
        <CTableBody>
          {tableExample.map((item, index) => {
            const isItemSelected = isSelected(item.user.name);
            const labelId = `enhanced-table-checkbox-${index}`;

            return (
              <CTableRow
                key={item.user.name}
                onClick={() => handleClick(item.user.name)}
                className={isItemSelected ? 'table-success' : ''}
              >
                <CTableDataCell className="text-center">
                  <CAvatar size="md" src={item.avatar.src} status={item.avatar.status} />
                </CTableDataCell>
                <CTableDataCell>
                  <div>{item.user.name}</div>
                  <div className="small text-body-secondary text-nowrap">
                    <span>{item.user.new ? 'New' : 'Recurring'}</span> | Registered: {item.user.registered}
                  </div>
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  <CIcon size="xl" icon={item.country.flag} title={item.country.name} />
                </CTableDataCell>
                <CTableDataCell>
                  <div className="d-flex justify-content-between text-nowrap">
                    <div className="fw-semibold">{item.usage.value}%</div>
                    <div className="ms-3">
                      <small className="text-body-secondary">{item.usage.period}</small>
                    </div>
                  </div>
                  <CProgress thin color={item.usage.color} value={item.usage.value} />
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  <CIcon size="xl" icon={item.payment.icon} />
                </CTableDataCell>
                <CTableDataCell>
                  <div className="small text-body-secondary text-nowrap">Last login</div>
                  <div className="fw-semibold text-nowrap">{item.activity}</div>
                </CTableDataCell>
              </CTableRow>
            );
          })}
        </CTableBody>
      </CTable>
    </div>
       */}

          {/* test------------121 */}

          <CTable align="middle" className="mb-0 border" hover responsive>
            <CTableHead className="text-nowrap">
              <CTableRow>
                {/* <CTableHeaderCell className="bg-body-tertiary text-center">
                S.No
              </CTableHeaderCell> */}
                <CTableHeaderCell className="bg-body-tertiary" onClick={() => handleSort2('Name')}>
                  Name
                  {/* {orderBy === 'user.name' && (order === 'asc' ? '▲' : '▼')} */}
                  {orderBy2 === 'Name' && (order === 'asc' ? '▲' : '▼')}
                </CTableHeaderCell>
                <CTableHeaderCell
                  className="bg-body-tertiary text-center"
                  onClick={() => handleSort2('UserID')}
                >
                  User ID
                  {orderBy2 === 'UserID' && (order === 'asc' ? '▲' : '▼')}
                </CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">Mobile No</CTableHeaderCell>
                <CTableHeaderCell
                  className="bg-body-tertiary text-center"
                  onClick={() => handleSort2('Division')}
                >
                  Division
                  {orderBy2 === 'Division' && (order === 'asc' ? '▲' : '▼')}
                </CTableHeaderCell>
                <CTableHeaderCell
                  className="bg-body-tertiary"
                  onClick={() => handleSort2('Designation')}
                >
                  Designation
                  {orderBy2 === 'Designation' && (order === 'asc' ? '▲' : '▼')}
                </CTableHeaderCell>

                <CTableHeaderCell className="bg-body-tertiary" onClick={() => handleSort2('Role')}>
                  Role
                  {orderBy2 === 'Role' && (order === 'asc' ? '▲' : '▼')}
                </CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary" onClick={() => handleSort2('Status')}>
                  Status
                  {orderBy2 === 'Status' && (order === 'asc' ? '▲' : '▼')}
                </CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">Password</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>

            <CTableBody>
              {paginatedData2.map((item, index) => (
                <CTableRow key={index}>
                  {/* <CTableDataCell className="text-center">
                 
                  test
                </CTableDataCell> */}
                  <CTableDataCell>
                    {/* {item.Name} */}
                    {item.userName}
                    {/* <div>{item.user.name}</div>
                <div className="small text-body-secondary text-nowrap">
                  <span>{item.user.new ? 'New' : 'Recurring'}</span> | Registered:{' '}
                  {item.user.registered}
                </div> */}
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    {/* {item.UserID} */}
                    {item.userId}
                    {/* <CIcon size="xl" icon={item.country.flag} title={item.country.name} /> */}
                  </CTableDataCell>
                  <CTableDataCell>
                    {/* {item.MobileNo} */}
                    {item.mobileNo}
                    {/* <div className="d-flex justify-content-between text-nowrap">
                  <div className="fw-semibold">{item.usage.value}%</div>
                  <div className="ms-3">
                    <small className="text-body-secondary">{item.usage.period}</small>
                  </div>
                </div>
                <CProgress thin color={item.usage.color} value={item.usage.value} /> */}
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    {/* <CIcon size="xl" icon={item.payment.icon} /> */}
                    {/* {item.Division} */}
                    {item.divisions}
                  </CTableDataCell>
                  <CTableDataCell>
                    {/* {item.Designation}
                   */}
                    {item.designation}
                    {/* <div className="small text-body-secondary text-nowrap">Last login</div>
                <div className="fw-semibold text-nowrap">{item.activity}</div> */}
                  </CTableDataCell>
                  <CTableDataCell>
                    {/* {item.Role} */}
                    {item.role}
                    {/* <div className="small text-body-secondary text-nowrap">Last login</div>
                <div className="fw-semibold text-nowrap">{item.activity}</div> */}
                  </CTableDataCell>
                  <CTableDataCell>
                    {/* {item.Status} */}
                    <CButton
                      // color="success"

                      // color={item.Status == 'Active' ? 'success' : 'danger'}
                      color={item.activeFlag.trim() == "Y" ? 'success' : 'danger'}
                      shape="rounded-pill"
                      style={{ width: '80px' }}
                    >
                      {/* {item.Status} */}
                      {item.activeFlag.trim() == "Y" ? "Active" : "Inactive"}
                    </CButton>
                    {/* <div className="small text-body-secondary text-nowrap">Last login</div>
                <div className="fw-semibold text-nowrap">{item.activity}</div> */}
                  </CTableDataCell>

                  <CTableDataCell>
                    <CButton color="primary" shape="rounded-pill" style={{ marginRight: 15 }} onClick={() => handleResetPassword(item.userId)}>
                      <CIcon icon={cilLockUnlocked} />
                      Reset
                    </CButton>

                    {/* <div className="small text-body-secondary text-nowrap">Last login</div>
                <div className="fw-semibold text-nowrap">{item.activity}</div> */}
                  </CTableDataCell>
                  <CTableDataCell>
                    {/* {item.Action} */}
                    {/* <div className="small text-body-secondary text-nowrap">Last login</div>
                <div className="fw-semibold text-nowrap">{item.activity}</div> */}
                    <CButton color="danger" variant="outline" className="w-100"
                      onClick={() => {
                        setSelectedUser(item);
                        setShowUpdateUserForm(true);
                      }}
                    >
                      ACTION
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
                onClick={() => setPage(pageNumber)}
              >
                {pageNumber}
              </CPaginationItem>
            ))}

            <CPaginationItem
              disabled={page === Math.ceil(data.length / rowsPerPage)}
              onClick={() => setPage(page + 1)}
            >
              Next
            </CPaginationItem>
          </CPagination>



        </CCol>
      }
      {(load1 == false && emptyData) && <CCol xs={12}>
        <p><strong>No Data Found</strong></p>
      </CCol>}
      {load1 && <CCol xs={12}>
        {/* <div className="text-center">
          <CSpinner />
        </div> */}

        <div className="d-flex justify-content-center align-items-center vh-100">
          <CSpinner color="primary" />
        </div>
      </CCol>}
    </CRow>
  )
}

AddUser.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
}
export default AddUser
