import React,{useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import '../scss/styles.scss'; // Adjust the path based on where the file is located

import {
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,
  CImage,
  CRow,
  CCol,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'

// import { logo } from 'src/assets/brand/logo'
import logo from '../assets/images/logo.png'

import { sygnet } from 'src/assets/brand/sygnet'

// sidebar nav config
// previous correct _nav
// import navigation from '../_nav'


import _nav from '../_nav'



const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  //  const [isMamsVisible, setMamsVisible] = useState(true)
  //  const hideMamsText = () => {
  //   setMamsVisible(false)
  // }

  return (
    <CSidebar
      // className="border-end"
      // className="bg-info-sidebar border-end"
      // className="bg-info-sidebar border-end"

      colorScheme="dark"
      // colorScheme="light"

      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarHeader className="border-bottom">
        {/* <CSidebarBrand to="/" className="d-flex">
          <CImage
            className="sidebar-brand-full"
            // src={require('../assets/images/logo.png')}
            src={logo}
            // height={32}
            height={26}
            alt="Brand Logo"
          />


          <CRow className="align-items-center">
            <CCol xs="auto">
              <CImage className="sidebar-brand-full" src={logo} height={26} alt="Brand Logo" />
            </CCol>
            <CCol>
              <div className="text-uppercase fw-bold text-center">
                <div className="text-decoration-underline">MAMS</div>
                <div className="text-decoration-underline">PORTAL</div>
              </div>
            </CCol>
          </CRow>

        
        </CSidebarBrand> */}

        <CSidebarBrand to="/" className="d-flex align-items-center">
          <CImage className="sidebar-brand-full" src={logo} 
          // height={28}
          height={32} 
          width={200}
          alt="Brand Logo" />
          {/* {!isMamsVisible && ( */}
          {/* <div className="ms-2 text-uppercase fw-bold text-nowrap flex-grow-1">
            <div style={{ fontSize: '1.5rem', textAlign: 'center', textDecoration: 'none' }}>
              MAMS
            </div>
          </div> */}
        {/* )} */}
        </CSidebarBrand>

        <CCloseButton
          className="d-lg-none"
          dark
          onClick={() => 
            {
              // hideMamsText()

              dispatch({ type: 'set', sidebarShow: false })}}
        />
      </CSidebarHeader>
      <AppSidebarNav 

items={_nav()}
      // items={navigation}


        // onMenuItemClick={() => hideMamsText()} 
      />
      {/* <CSidebarFooter className="border-top d-none d-lg-flex">
        <CSidebarToggler
          onClick={() => {
            // setMamsVisible(!isMamsVisible)
            dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })
          }}
        />
      </CSidebarFooter> */}
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
