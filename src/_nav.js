import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilViewQuilt,
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilGroup,
  cilMedicalCross,
  cilPeople,
  cilPlus,
  cilUserPlus,
  cilTask,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
  cilListRich
  
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
// import { useSelector } from 'react-redux';
// const role = useSelector((state) => state.role);

// console.log("tets of role is::::::::::::",role)

import { useSelector } from 'react-redux'
//earlier _nav
const _nav2 = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
//New Additions-start
{
  component: CNavTitle,
  name: 'Master',
},
{
  component: CNavItem,
  name: 'Add User',
  to: '/master/adduser',
  icon: <CIcon icon={cilUserPlus} customClassName="nav-icon" />,
},
{
  component: CNavItem,
  name: 'Role Rights',
  to: '/master/rolerights',
  icon: <CIcon icon={cilTask} customClassName="nav-icon" />,
}
,
{
  component: CNavTitle,
  name: 'Tab',
},
{
  component: CNavGroup,
  name: 'Meter Live-Report',
  to: '/meterlivereport',
  icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  items: [
    {
      component: CNavItem,
      name: 'Total Case Execution Report',
      to: '/meterlivereport/totalCaseExec',
    },
    {
      component: CNavItem,
      name: 'Generate MCR in PDF',
      to: '/meterlivereport/mcrPDFGen',
    },
    {
      component: CNavItem,
      name: 'Photograph Upload Report',
      to: '/meterlivereport/photoUpload',
    }
     
  ]
}
,



//New Additions-ended



  // {
  //   component: CNavTitle,
  //   name: 'Theme',
  // },
  // {
  //   component: CNavItem,
  //   name: 'Colors',
  //   to: '/theme/colors',
  //   icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavItem,
  //   name: 'Typography',
  //   to: '/theme/typography',
  //   icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  // },

  // {
  //   component: CNavTitle,
  //   name: 'Components',
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Base',
  //   to: '/base',
  //   icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Accordion',
  //       to: '/base/accordion',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Breadcrumb',
  //       to: '/base/breadcrumbs',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Cards',
  //       to: '/base/cards',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Carousel',
  //       to: '/base/carousels',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Collapse',
  //       to: '/base/collapses',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'List group',
  //       to: '/base/list-groups',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Navs & Tabs',
  //       to: '/base/navs',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Pagination',
  //       to: '/base/paginations',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Placeholders',
  //       to: '/base/placeholders',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Popovers',
  //       to: '/base/popovers',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Progress',
  //       to: '/base/progress',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Spinners',
  //       to: '/base/spinners',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Tables',
  //       to: '/base/tables',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Tabs',
  //       to: '/base/tabs',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Tooltips',
  //       to: '/base/tooltips',
  //     },
  //   ],
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Buttons',
  //   to: '/buttons',
  //   icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Buttons',
  //       to: '/buttons/buttons',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Buttons groups',
  //       to: '/buttons/button-groups',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Dropdowns',
  //       to: '/buttons/dropdowns',
  //     },
  //   ],
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Forms',
  //   icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Form Control',
  //       to: '/forms/form-control',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Select',
  //       to: '/forms/select',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Checks & Radios',
  //       to: '/forms/checks-radios',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Range',
  //       to: '/forms/range',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Input Group',
  //       to: '/forms/input-group',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Floating Labels',
  //       to: '/forms/floating-labels',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Layout',
  //       to: '/forms/layout',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Validation',
  //       to: '/forms/validation',
  //     },
  //   ],
  // },
  // {
  //   component: CNavItem,
  //   name: 'Charts',
  //   to: '/charts',
  //   icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Icons',
  //   icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'CoreUI Free',
  //       to: '/icons/coreui-icons',
  //       badge: {
  //         color: 'success',
  //         text: 'NEW',
  //       },
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'CoreUI Flags',
  //       to: '/icons/flags',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'CoreUI Brands',
  //       to: '/icons/brands',
  //     },
  //   ],
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Notifications',
  //   icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Alerts',
  //       to: '/notifications/alerts',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Badges',
  //       to: '/notifications/badges',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Modal',
  //       to: '/notifications/modals',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Toasts',
  //       to: '/notifications/toasts',
  //     },
  //   ],
  // },
  // {
  //   component: CNavItem,
  //   name: 'Widgets',
  //   to: '/widgets',
  //   icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
  //   badge: {
  //     color: 'info',
  //     text: 'NEW',
  //   },
  // },
  // {
  //   component: CNavTitle,
  //   name: 'Extras',
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Pages',
  //   icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Login',
  //       to: '/login',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Register',
  //       to: '/register',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Error 404',
  //       to: '/404',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Error 500',
  //       to: '/500',
  //     },
  //   ],
  // },
  // {
  //   component: CNavItem,
  //   name: 'Docs',
  //   href: 'https://coreui.io/react/docs/templates/installation/',
  //   icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  // },
]
// earlier correct _nav
// export default _nav

//for guest

export const _navguest = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: 'Theme',
  },
  {
    component: CNavItem,
    name: 'Colors',
    to: '/theme/colors',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Typography',
    to: '/theme/typography',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },

  {
    component: CNavTitle,
    name: 'Components',
  },
  {
    component: CNavGroup,
    name: 'Base',
    to: '/base',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Accordion',
        to: '/base/accordion',
      },
      {
        component: CNavItem,
        name: 'Breadcrumb',
        to: '/base/breadcrumbs',
      },
      {
        component: CNavItem,
        name: 'Cards',
        to: '/base/cards',
      },
      {
        component: CNavItem,
        name: 'Carousel',
        to: '/base/carousels',
      },
      {
        component: CNavItem,
        name: 'Collapse',
        to: '/base/collapses',
      },
      {
        component: CNavItem,
        name: 'List group',
        to: '/base/list-groups',
      },
      {
        component: CNavItem,
        name: 'Navs & Tabs',
        to: '/base/navs',
      },
      {
        component: CNavItem,
        name: 'Pagination',
        to: '/base/paginations',
      },
      {
        component: CNavItem,
        name: 'Placeholders',
        to: '/base/placeholders',
      },
      {
        component: CNavItem,
        name: 'Popovers',
        to: '/base/popovers',
      },
      {
        component: CNavItem,
        name: 'Progress',
        to: '/base/progress',
      },
      {
        component: CNavItem,
        name: 'Spinners',
        to: '/base/spinners',
      },
      {
        component: CNavItem,
        name: 'Tables',
        to: '/base/tables',
      },
      {
        component: CNavItem,
        name: 'Tabs',
        to: '/base/tabs',
      },
      {
        component: CNavItem,
        name: 'Tooltips',
        to: '/base/tooltips',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Buttons',
    to: '/buttons',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Buttons',
        to: '/buttons/buttons',
      },
      {
        component: CNavItem,
        name: 'Buttons groups',
        to: '/buttons/button-groups',
      },
      {
        component: CNavItem,
        name: 'Dropdowns',
        to: '/buttons/dropdowns',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Forms',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Form Control',
        to: '/forms/form-control',
      },
      {
        component: CNavItem,
        name: 'Select',
        to: '/forms/select',
      },
      {
        component: CNavItem,
        name: 'Checks & Radios',
        to: '/forms/checks-radios',
      },
      {
        component: CNavItem,
        name: 'Range',
        to: '/forms/range',
      },
      {
        component: CNavItem,
        name: 'Input Group',
        to: '/forms/input-group',
      },
      {
        component: CNavItem,
        name: 'Floating Labels',
        to: '/forms/floating-labels',
      },
      {
        component: CNavItem,
        name: 'Layout',
        to: '/forms/layout',
      },
      {
        component: CNavItem,
        name: 'Validation',
        to: '/forms/validation',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Charts',
    to: '/charts',
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Icons',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'CoreUI Free',
        to: '/icons/coreui-icons',
        badge: {
          color: 'success',
          text: 'NEW',
        },
      },
      {
        component: CNavItem,
        name: 'CoreUI Flags',
        to: '/icons/flags',
      },
      {
        component: CNavItem,
        name: 'CoreUI Brands',
        to: '/icons/brands',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Notifications',
    icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Alerts',
        to: '/notifications/alerts',
      },
      {
        component: CNavItem,
        name: 'Badges',
        to: '/notifications/badges',
      },
      {
        component: CNavItem,
        name: 'Modal',
        to: '/notifications/modals',
      },
      {
        component: CNavItem,
        name: 'Toasts',
        to: '/notifications/toasts',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Widgets',
    to: '/widgets',
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: 'Extras',
  },
  {
    component: CNavGroup,
    name: 'Pages',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Login',
        to: '/login',
      },
      {
        component: CNavItem,
        name: 'Register',
        to: '/register',
      },
      {
        component: CNavItem,
        name: 'Error 404',
        to: '/404',
      },
      {
        component: CNavItem,
        name: 'Error 500',
        to: '/500',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Docs',
    href: 'https://coreui.io/react/docs/templates/installation/',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
]


const _nav = () => {
  const roleRights = useSelector(state => state.roleRights)

  console.log("helllosss::::::",roleRights)

  // Filter navigation items based on role rights
  // const filterNavItems = (items) => {
  //   return items.filter(item => {
  //     if (item.component === CNavGroup) {
  //       item.items = filterNavItems(item.items)
  //       return item.items.length > 0
  //     }
  //     const pageURL = item.to
  //     return roleRights.some(roleRight => roleRight.pageURL === pageURL && roleRight.canView)
  //   })
  // }


  // Priority 1-Filter---start 1
  // const filterNavItems = (items) => {
  //   return items.filter(item => {
  //     if (item.component === CNavGroup) {
  //       // Recursively filter the group's items
  //       item.items = filterNavItems(item.items)
  //       return item.items.length > 0 // Keep the group if it has any visible items
  //     }
  
  //     if (item.component === CNavTitle) {
  //       if (item.name === 'Master') {
  //         // Check if 'Add User' or 'Role Rights' are visible
  //         const relatedItems = items.filter(relatedItem => 
  //           relatedItem.name === 'Add User' || relatedItem.name === 'Role Rights'
  //         )
  //         const hasVisibleRelatedItems = relatedItems.some(relatedItem =>
  //           roleRights.some(roleRight => roleRight.pageURL === relatedItem.to && roleRight.canView)
  //         )
  //         return hasVisibleRelatedItems // Keep 'Master' if 'Add User' or 'Role Rights' is visible
  //       }
  
  //       if (item.name === 'Tab') {
  //         // Check if 'Meter Live-Report' has visible sub-items
  //         const relatedGroups = items.filter(relatedItem => 
  //           relatedItem.component === CNavGroup && relatedItem.name === 'Meter Live-Report'
  //         )
  //         const hasVisibleRelatedItems = relatedGroups.some(group =>
  //           group.items.some(subItem => 
  //             roleRights.some(roleRight => roleRight.pageURL === subItem.to && roleRight.canView)
  //           )
  //         )
  //         return hasVisibleRelatedItems // Keep 'Tab' if any sub-item under 'Meter Live-Report' is visible
  //       }
  //     }
  
  //     // Regular filtering for individual items
  //     const pageURL = item.to
  //     return roleRights.some(roleRight => roleRight.pageURL === pageURL && roleRight.canView)
  //   })
  // }
  // priority 1 filter end 1


// Priority 2 filter

const filterNavItems = (items) => {
  return items.filter(item => {
    if (item.component === CNavGroup) {
      // Recursively filter the group's items
      item.items = filterNavItems(item.items)
      return item.items.length > 0 // Keep the group if it has any visible items
    }

    if (item.component === CNavTitle) {
      if (item.name === 'Master') {
        // Check if 'Add User' or 'Role Rights' are visible
        const relatedItems = items.filter(relatedItem => 
          relatedItem.name === 'Add User' || relatedItem.name === 'Role Rights'
        )
        const hasVisibleRelatedItems = relatedItems.some(relatedItem =>
          roleRights.some(roleRight => roleRight.pageURL === relatedItem.to && roleRight.canView)
        )
        return hasVisibleRelatedItems // Keep 'Master' if 'Add User' or 'Role Rights' is visible
      }

      if (item.name === 'Tab') {
        // Check if 'Meter Live-Report' has visible sub-items
        const relatedGroups = items.filter(relatedItem => 
          relatedItem.component === CNavGroup && 
          // relatedItem.name === 'Meter Live-Report'
          (relatedItem.name === 'Meter Live-Report' || 
            relatedItem.name === 'Vendor Functions' ||
            relatedItem.name === 'MMG Functions')
        )
        const hasVisibleRelatedItems = relatedGroups.some(group =>
          group.items.some(subItem => 
            roleRights.some(roleRight => roleRight.pageURL === subItem.to && roleRight.canView)
          )
        )
        return hasVisibleRelatedItems // Keep 'Tab' if any sub-item under 'Meter Live-Report' is visible
      }
    }

    // Regular filtering for individual items
    const pageURL = item.to
    return roleRights.some(roleRight => roleRight.pageURL === pageURL && roleRight.canView)
  })
}


// Priority 1 start
//   const navigation = filterNavItems(
 
//   [
//     {
//       component: CNavItem,
//       name: 'Dashboard',
//       to: '/dashboard',
//       icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
//       badge: {
//         color: 'info',
//         text: 'NEW',
//       },
//     },

//   //New Additions-start
//   {
//     component: CNavTitle,
//     name: 'Master',
//   },

//   {
//     component: CNavItem,
//     name: 'Add User',
//     to: '/master/adduser',
//     icon: <CIcon icon={cilUserPlus} customClassName="nav-icon" />,
//   },

//   {
//     component: CNavItem,
//     name: 'Role Rights',
//     to: '/master/rolerights',
//     icon: <CIcon icon={cilTask} customClassName="nav-icon" />,
//   }

//   ,
//   {
//     component: CNavTitle,
//     name: 'Tab',
//   },


//   {
//     component: CNavGroup,
//     name: 'Meter Live-Report',
//     to: '/meterlivereport',
//     icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
//     items: [
//       {
//         component: CNavItem,
//         name: 'Total Case Execution Report',
//         to: '/meterlivereport/totalCaseExec',
//       },
//       {
//         component: CNavItem,
//         name: 'Generate MCR in PDF',
//         to: '/meterlivereport/mcrPDFGen',
//       },
//       {
//         component: CNavItem,
//         name: 'Photograph Upload Report',
//         to: '/meterlivereport/photoUpload',
//       }
       
//     ]
//   }
  
  
  
  
//   ]
// )
// priority 1 end






// Priority 2 start
const navigation = filterNavItems(
 
  [
    {
      component: CNavItem,
      name: 'Dashboard',
      to: '/dashboard',
      icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
      // badge: {
      //   color: 'info',
      //   text: 'NEW',
      // },


    },

  //New Additions-start
  {
    component: CNavTitle,
    name: 'Master',
  },

  {
    component: CNavItem,
    name: 'Add User',
    to: '/master/adduser',
    icon: <CIcon icon={cilUserPlus} customClassName="nav-icon" />,
  },

  {
    component: CNavItem,
    name: 'Role Rights',
    to: '/master/rolerights',
    icon: <CIcon icon={cilTask} customClassName="nav-icon" />,
  }

  ,
  
  
  ,
  {
    component: CNavTitle,
    name: 'Tab',
  },

  // new add-start
  {
    component: CNavGroup,
    name: 'MMG Functions',
    to: '/mmgfunctions',
    icon: <CIcon icon={cilListRich} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Meter Photo Verification',
        to: '/mmgfunctions/meterPhotoVerfication',
      },
      {
        component: CNavItem,
        name: 'Document Upload',
        to: '/mmgfunctions/documentUpload',
      }
       ,
       {
        component: CNavItem,
        name: 'Damage Material Record',
        to: '/mmgfunctions/damageMaterial',
      }
    ]
  ,
},
{
  component: CNavGroup,
  name: 'Vendor Functions',
  to: '/vendorfunctions',
  icon: <CIcon icon={cilViewQuilt} customClassName="nav-icon" />,
  items: [
    {
      component: CNavItem,
      name: 'Upload Photograph-Non Tab Cases',
      to: '/vendorfunctions/uploadPhotoNonTab',
    }
     
  ]
,
}



  // new add-end
,
  {
    component: CNavGroup,
    name: 'Meter Live-Report',
    to: '/meterlivereport',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Total Case Execution Report',
        to: '/meterlivereport/totalCaseExec',
      },
      {
        component: CNavItem,
        name: 'Generate MCR in PDF',
        to: '/meterlivereport/mcrPDFGen',
      },
      {
        component: CNavItem,
        name: 'Photograph Upload Report',
        to: '/meterlivereport/photoUpload',
      }
      //  new addition
,
      {
        component: CNavItem,
        name: 'Photograph Verification Report',
        to: '/meterlivereport/photoVerificationReport',
      }
      ,
      {
        component: CNavItem,
        name: 'Damage Material Report',
        to: '/meterlivereport/damageMaterialReport',
      }

    ]
  }



  
  
  
  
  ]
)
// Priority 2 end





  return navigation
}

export default _nav



// const _nav = () => {
//   const roleRights = useSelector(state => state.roleRights)

//   // Filter navigation items based on role rights
//   const filterNavItems = (items) => {
//     return items.filter(item => {
//       if (item.component === CNavGroup) {
//         item.items = filterNavItems(item.items)
//         return item.items.length > 0
//       }
//       const pageURL = item.to
//       return roleRights.some(roleRight => roleRight.pageURL === pageURL && roleRight.canView)
//     })
//   }

//   const navigation = filterNavItems([
//     {
//       component: CNavItem,
//       name: 'Dashboard',
//       to: '/dashboard',
//       icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
//       badge: {
//         color: 'info',
//         text: 'NEW',
//       },
//     },
//     {
//       component: CNavTitle,
//       name: 'Master',
//     },
//     {
//       component: CNavItem,
//       name: 'Add User',
//       to: '/master/adduser',
//       icon: <CIcon icon={cilUserPlus} customClassName="nav-icon" />,
//     },
//     {
//       component: CNavItem,
//       name: 'Role Rights',
//       to: '/master/rolerights',
//       icon: <CIcon icon={cilTask} customClassName="nav-icon" />,
//     },
//     {
//       component: CNavTitle,
//       name: 'Tab',
//     },
//     {
//       component: CNavGroup,
//       name: 'Meter Live-Report',
//       to: '/meterlivereport',
//       icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
//       items: [
//         {
//           component: CNavItem,
//           name: 'Total Case Execution Report',
//           to: '/meterlivereport/totalCaseExec',
//         },
//         {
//           component: CNavItem,
//           name: 'Generate MCR in PDF',
//           to: '/meterlivereport/mcrPDFGen',
//         },
//         {
//           component: CNavItem,
//           name: 'Photograph Upload Report',
//           to: '/meterlivereport/photoUpload',
//         }
//       ]
//     },
//   ])

//   return navigation
// }

// export default _nav