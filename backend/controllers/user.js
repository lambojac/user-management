const User = require("../models/UserNew");
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const createNewUser = async (req, res) => {
    try {
        // Extract user email from the request body
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email Required" });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email }).exec();

        // Handle error if the user already exists
        if (existingUser) {
            return res.status(409).json({ message: "User has already been registered!!" });
        }

        // Generate a unique authentication token
        const authToken = crypto.randomBytes(16).toString('hex');

        // Calculate the expiration time (24 hours from now)
        const expirationDate = new Date();
        expirationDate.setHours(expirationDate.getHours() + 24);

        // Create a new user instance with email and authentication token
        const newUser = await User.create({ email, authToken, authTokenExpiration: expirationDate });

        // Save the user to the database
        await newUser.save();

        // Send an email with the authentication link
        sendAuthenticationEmail(newUser.email, newUser.authToken);

        console.log(newUser);

        return res.status(201).json({ message: 'User created', user: newUser });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Function to send an email with the authentication link
const sendAuthenticationEmail = (email, authToken) => {
    const transporter = nodemailer.createTransport({
        // Configure your email service provider (e.g., SMTP settings)
        service: '<company mailer service provider>',
        auth: {
            user: '<Service mailer>',//company mail address
            pass: '<PASSWORD>'// mail password
        }
    });

    const mailOptions = {
        from: 'your_email@example.com',
        to: email,
        subject: 'Account Activation',
        html: `
            <p>Click the following link to activate your account:</p>
            <a href="http://yourwebsite.com/activate?token=${authToken}">Activate Account</a>
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Email sending error:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
};

export default { createNewUser };