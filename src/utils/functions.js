import axios from "axios";
import { FILE_UPLOAD_DMS } from "./ConstantURL";

export const generateDocumentId = async (tokenKey,cookie,base64,fileName) => {
    try {
  
        const response = await axios.post(FILE_UPLOAD_DMS,
            {           
                tokenKey: `${tokenKey}`,
                cookiee: `${cookie}`,
                fileInfoDT: `${base64}`,
                fileName: `${fileName}`,
            }
        );   
        return response.data.Result;
    } catch (error) {
    
        return null;
    }
};
