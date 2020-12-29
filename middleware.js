import multer from "multer"
import routes from "./routes"

const multerImage = multer({dest: "uploads/images/"});

export const middleware = (req,res,next)=>{
    res.locals.siteName = "Mlbum";
    res.locals.routes =routes;
    // res.locals.user = {
    //     isAuthenticated : true,
    //     id:1
    // };
    next();
};

export const uploadImage = multerImage.single("imageFile");