

// const BASE_API_URL = 'http://localhost:5179/api/MAMS/';
// https://test.bsesbrpl.co.in/MeterLive/api/MAMS/

const BASE_API_URL = 'https://test.bsesbrpl.co.in/MeterLive/api/MAMS/';



// API Endpoints
export const LOGIN_URL = `${BASE_API_URL}MAMS_Login`;
export const DIVISION_URL = `${BASE_API_URL}GetDivisionList`;
export const ORDERTYPE_URL = `${BASE_API_URL}GetOrderType`;
export const ACTIVITYTYPE_URL = `${BASE_API_URL}GetActivityDetails`;
export const TOTALEXECMIS_URL = `${BASE_API_URL}GetPunchData`;
export const TOTALEXECMISEXCEL_URL = `${BASE_API_URL}GenerateCompleteExecutionExcel`;
export const PHOTOUPLOAD_URL = `${BASE_API_URL}GetPhotoUpload`;
export const PHOTOUPLOADEXCEL_URL = `${BASE_API_URL}GeneratePhotoUploadExcel`;
export const DMS_TOKEN_URL = `${BASE_API_URL}GetToken`;
export const DMS_BASE64_URL = `${BASE_API_URL}GetDMSImageBase64`;
export const PDF_DATA_URL = `${BASE_API_URL}GetPDFData`;
export const MAMS_EMPLOYEE_URL = `${BASE_API_URL}GetMAMSEmployeesDetails`;
export const ROLES_URL = `${BASE_API_URL}GetRolesWIDList`;
export const UPDATE_USER_URL = `${BASE_API_URL}UpdateUser`;
export const ADD_USER_URL = `${BASE_API_URL}AddUser`;
export const VENDOR_LIST_URL = `${BASE_API_URL}GetVendorsDivWise`;
export const RESET_PWD_URL = `${BASE_API_URL}UserResetPassword`;
export const ROLE_RIGHTS_URL = `${BASE_API_URL}GetRoleRights`;
export const UPDATE_ROLE_RIGHTS_URL = `${BASE_API_URL}UpdateRoleRights`;






export const REGISTER_URL = `${BASE_API_URL}/auth/register`;
export const GET_USER_PROFILE_URL = `${BASE_API_URL}/user/profile`;
export const UPDATE_USER_PROFILE_URL = `${BASE_API_URL}/user/update`;
export const FETCH_DATA_URL = `${BASE_API_URL}/data/fetch`;

// Other URLs
export const HOME_PAGE_URL = '/home';
export const DASHBOARD_PAGE_URL = '/dashboard';
export const SETTINGS_PAGE_URL = '/settings';
