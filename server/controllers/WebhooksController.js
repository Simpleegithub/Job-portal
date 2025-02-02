import { Webhook } from "svix";
import User from './../models/UserModel.js';
import dotenv from "dotenv";

dotenv.config();

// Api controller function to manage clerk user with database

export const clerkWebHooks = async (req, res) => {
    try {
      const Whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
  
      // Verify webhook signature
      try {
        await Whook.verify(
          JSON.stringify(req.body),
          req.headers["svix-timestamp"],
          req.headers["svix-signature"],
          req.headers["svix-id"]
        );
        console.log('Webhook verification passed');
      } catch (err) {
        console.log('Webhook verification failed:', err);
        return res.status(400).json({ success: false, message: 'Invalid signature' });
      }
  
      // Getting data from the request body
      const { data, type } = req.body;
  
      console.log('Received Webhook data:', data);
  
      switch (type) {
        case "user.created":
          {
            const userdata = {
              _id: data.id,
              email: data.email_addresses[0].email_address,
              name: data.first_name + " " + data.last_name,
              image: data.image_url,
              resume: ''  // Assuming you want to leave this empty for now
            };
            
            try {
              await User.create(userdata);
              console.log('User created successfully');
              res.status(200).json({ success: true, message: "User created successfully" });
            } catch (err) {
              console.error('Error creating user:', err);
              res.status(500).json({ success: false, message: 'Error creating user' });
            }
          }
          break;
  
        case "user.updated":
          {
            const userdata = {
              email: data.email_addresses[0].email_address,
              name: data.first_name + " " + data.last_name,
              image: data.image_url,
            };
  
            await User.findByIdAndUpdate(data.id, userdata);
            res.status(200).json({ success: true, message: "User updated successfully" });
            break;
          }
  
        case "user.deleted":
          {
            await User.findOneAndDelete(data.id);
            res.status(200).json({ success: true, message: "User deleted successfully" });
            break;
          }
  
        default:
          res.status(400).json({ success: false, message: "Unknown event type" });
          break;
      }
    } catch (err) {
      console.error('Webhook error:', err);
      res.status(500).json({ success: false, message: "Web hooks error" });
    }
  };
  