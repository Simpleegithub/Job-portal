import { Webhook } from "svix";
import User from './../models/UserModel.js';

// Api controller function to manage clerk user with database

export const clerkWebHooks = async (req, res) => {

    try{
        const Whook=new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        await Whook.verify(JSON.stringify(req.body), req.headers["svix-timestamp"], req.headers["svix-signature"],req.headers["svix-id"]);
      
        // getting data from req
        const {data, type} = req.body;
      
        // switch cases for different user events
        switch (type) {
          case "user.created":{
              const userdata={
                  _id:data.id,
                  email:data.email_addresses[0].email_address,
                  name:data.first_name+" "+data.last_name,
                  image:data.image_url,
                  resume:''
              }
              await User.create(userdata);
              res.json({})
              break;
          }
      
          case "user.updated":{
              const userdata={
             
                  email:data.email_addresses[0].email_address,
                  name:data.first_name+" "+data.last_name,
                  image:data.image_url,
               
              }
              await User.findByIdAndUpdate(data.id,userdata);
              res.json({})
              break;
          }
           
          case "user.deleted":{
              await User.findOneAndDelete(data.id);
              res.json({})
              break;
          }
      
          default:
            break;
        }

    } catch(err){
        console.log(err);
        res.status(500).json({success:false,message:"Web hooks error"});
    }
 
};