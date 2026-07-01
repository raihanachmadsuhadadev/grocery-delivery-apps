import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://grocerrydeliverryapps:250203@cluster0.mtzyvpt.mongodb.net/grocerry-apps').then(()=>console.log("DB Connected"));
}