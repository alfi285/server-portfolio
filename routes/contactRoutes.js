const express = require('express');
const Contact = require('../models/Contact.js');
const nodemailer = require('nodemailer');

const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Save the contact info to the DB
    const contact = new Contact({ name, email, message });
    await contact.save();

    // Set up transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // your Gmail (authenticated)
        pass: process.env.EMAIL_PASS, // App password
      },
    });

    // Set up email options
    const mailOptions = {
      from: process.env.EMAIL_USER,        // Always send from your own verified Gmail
      to: process.env.EMAIL_USER,          // Send to yourself
      replyTo: email,                      // Set user's email here for replying
      subject: `Portfolio Contact: ${name}`,
      text: `You have a new message from your portfolio:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Message sent and saved successfully' });

  } catch (error) {
    console.error('Error sending contact message:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

module.exports = router;
