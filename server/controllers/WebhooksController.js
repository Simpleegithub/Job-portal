import { Webhook } from "svix";
import User from './../models/UserModel.js';
import dotenv from "dotenv";

dotenv.config();

export const ClerkWebHooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    
    // Verify webhook signature
    try {
      await whook.verify(
        JSON.stringify(req.body),
        {
          "svix-id": req.headers["svix-id"],
          "svix-timestamp": req.headers["svix-timestamp"],
          "svix-signature": req.headers["svix-signature"],
        }
      );
      console.log('Webhook signature verified');
    } catch (error) {
      console.error('Webhook signature verification failed:', error);
      return res.status(400).json({ message: 'Webhook signature verification failed' });
    }

    const { data, type } = req.body;

    // Log the incoming data for debugging purposes
    console.log('Received webhook data:', data);

    switch (type) {
      case "user.created": {
        // Check if email address is present
        if (!data.email_addresses || data.email_addresses.length === 0) {
          console.error('Email address missing in Clerk data');
          return res.status(400).json({ message: 'Email address missing in Clerk data' });
        }

        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          image: data.image_url,
          resume: "",
        };

        // Check if the user already exists (to prevent duplicates)
        const existingUser = await User.findOne({ email: data.email_addresses[0].email_address });
        if (existingUser) {
          console.log('User already exists:', existingUser);
          return res.status(400).json({ message: 'User already exists' });
        }

        console.log('User data to be created:', userData);

        try {
          const newUser = await User.create(userData);
          console.log('User created successfully:', newUser);
          res.status(201).json({ message: 'User created successfully' });
        } catch (error) {
          console.error('Error creating user:', error.message);
          if (error.code === 11000) {
            // Handle duplicate email error
            console.error('Duplicate email error:', error);
            return res.status(400).json({ message: 'Email already exists' });
          }
          res.status(500).json({ message: 'Error creating user', error: error.message });
        }
        break;
      }

      case "user.updated": {
        const userData = {
          name: data.first_name + " " + data.last_name,
          email: data.email_addresses[0].email_address,
          image: data.image_url,
        };

        try {
          const updatedUser = await User.findByIdAndUpdate(data.id, userData, { new: true });
          console.log('User updated successfully:', updatedUser);
          res.status(200).json({ message: 'User updated successfully' });
        } catch (error) {
          console.error('Error updating user:', error);
          res.status(500).json({ message: 'Error updating user', error: error.message });
        }
        break;
      }

      case "user.deleted": {
        try {
          const deletedUser = await User.findByIdAndDelete(data.id);
          console.log('User deleted successfully:', deletedUser);
          res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
          console.error('Error deleting user:', error);
          res.status(500).json({ message: 'Error deleting user', error: error.message });
        }
        break;
      }

      default:
        res.status(400).json({ message: 'Unhandled event type' });
        break;
    }
  } catch (err) {
    console.error('Internal error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
