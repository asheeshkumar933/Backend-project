import {v2 as cloudinary} from "cloudinary"
import fs from "fs"



 // Configuration
 cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: CLOUDINARY_API_KEY, 
    api_secret: CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});

const uploadOnCloudinary = async (localFilePath) =>{
    try {
        if(!localFilePath) return null
        // upload the file on cloudnary 
       const Response = await cloudinary.uploader.upload(localFilePath ,{
            resource_type : "auto"
        })

        // file has beeb uploaded succesfully 

        console.log("file is upload on cloudinary",
        Response.url)
        return Response ;

    } catch (error) {
        fs.unlinkSync(localFilePath)  // remove saved tempory file as the upload operation got failed
        return null

        
    }

} 

export default uploadOnCloudinary ;