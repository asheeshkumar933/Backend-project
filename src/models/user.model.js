import mongoose ,{Schema} from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "crypto"


const userSchema = new Schema(
    {
        username :{
            type : String ,
            required : true ,
            unique : true ,
            lowercase : true ,
            trim : true ,
            index : true 

        },

      email :  {
        type : String ,
            required : true ,
            unique : true ,
            lowercase : true ,
            trim : true ,
             

        } ,
        fullName  :  {
            type : String ,
                required : true ,
                index :true,
                lowercase : true ,
                trim : true ,
                 
    
            } ,

            avatar  :  {
                type : String , // cloudnary url
                   required : true 
                     
        
                } ,

                coverImage :{
                    type : String ,  // cloudnary url

                } ,

                watchHistory :{
                    type : Schema.Types.ObjectId ,
                    ref : "Video"
                } ,

                password :{
                    type : String , 
                    required : [ true ,"Password is required"]
                } ,
                refreshtoken :{
                    type : String 
                }

        },{
            timestamps :true 
        }
 
)

userSchema.pre("save" , async function (next ) {
    if(!this.isModified("password")) return next() ;

    
    this.password = bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password , this.password)
    
}

userSchema.method.generateAccessToken =function(){
   return jwt.sign(
        {
            _id: this._id ,
            email: this.email ,
            username : this.username ,
            fullName : this.fullName

        } ,
        process.env.ACCESS_TOKEN_SECRET ,
        {
            expiresIn : this.process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.method.generateRefeshToken =function(){
    return jwt.sign(
        {
            _id: this._id ,
            

        } ,
        process.env.REFRESH_TOKEN_SECRET ,
        {
            expiresIn : this.process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User" ,userSchema )