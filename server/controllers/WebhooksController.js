import { Webhook } from "svix";
import User from './../models/UserModel.js';
import dotenv from "dotenv";

dotenv.config();

// Api controller function to manage clerk user with database

 // Adjust this import path according to your project structure

export const clerkWebHooks = async (req, res) => {
  try {
    // Initialize the Webhook class with your Clerk webhook secret
    const Whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // Verify the webhook signature for security
    await Whook.verify(
      JSON.stringify(req.body),
      req.headers['svix-timestamp'],
      req.headers['svix-signature'],
      req.headers['svix-id']
    );
    console.log('Webhook signature verified successfully.');

    // Extract the relevant data from the webhook payload
    const { data, type } = req.body;

    // Switch to handle different types of Clerk events
    switch (type) {
      case 'user.created': {
        const userdata = {
          _id: data.id,  // Use Clerk's user ID as the MongoDB document ID
          email: data.email_addresses[0]?.email_address,  // Ensure there's an email address
          name: `${data.first_name} ${data.last_name}`,  // Combine first and last name
          image: data.image_url,  // Profile image URL from Clerk
          resume: '',  // You can add a default or empty value for resume
        };

        // Log the user data to confirm it's correct
        console.log('User data to be created:', userdata);

        // Check if the email address already exists in the database
        const existingUser = await User.findOne({ email: userdata.email });
        if (existingUser) {
          console.log('User already exists with email:', userdata.email);
          return res.status(400).json({ success: false, message: 'User already exists' });
        }

        // Create a new user in the database
        try {
          const newUser = await User.create(userdata);
          console.log('User created successfully:', newUser);
          res.status(200).json({ success: true, message: 'User created successfully' });
        } catch (err) {
          console.error('Error creating user:', err);
          res.status(500).json({ success: false, message: 'Error creating user', error: err });
        }
        break;
      }

      case 'user.updated': {
        const userdata = {
          email: data.email_addresses[0]?.email_address,  // Ensure there's an email address
          name: `${data.first_name} ${data.last_name}`,  // Combine first and last name
          image: data.image_url,  // Profile image URL
        };

        // Log the user data to confirm it's correct
        console.log('User data to be updated:', userdata);

        // Update the existing user in the database
        try {
          const updatedUser = await User.findByIdAndUpdate(data.id, userdata, { new: true });
          if (!updatedUser) {
            console.log('User not found for update with ID:', data.id);
            return res.status(404).json({ success: false, message: 'User not found' });
          }

          console.log('User updated successfully:', updatedUser);
          res.status(200).json({ success: true, message: 'User updated successfully' });
        } catch (err) {
          console.error('Error updating user:', err);
          res.status(500).json({ success: false, message: 'Error updating user', error: err });
        }
        break;
      }

      case 'user.deleted': {
        try {
          const deletedUser = await User.findByIdAndDelete(data.id);
          if (!deletedUser) {
            console.log('User not found for deletion with ID:', data.id);
            return res.status(404).json({ success: false, message: 'User not found' });
          }

          console.log('User deleted successfully:', deletedUser);
          res.status(200).json({ success: true, message: 'User deleted successfully' });
        } catch (err) {
          console.error('Error deleting user:', err);
          res.status(500).json({ success: false, message: 'Error deleting user', error: err });
        }
        break;
      }

      default:
        console.log('Unhandled event type:', type);
        res.status(200).json({ success: true, message: 'Event not handled' });
        break;
    }
  } catch (err) {
    console.error('Error processing webhook:', err);
    res.status(500).json({ success: false, message: 'Webhook error', error: err });
  }
};

  