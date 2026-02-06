const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB Connection
// Replace with your actual connection string (Local or MongoDB Atlas)
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/karmanya_db';

mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ MongoDB Connected Successfully'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Define Contact Schema
const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: false }, // Made email optional as ERP form might not have it
    service: String,
    message: String,
    instituteName: String, // Added field for ERP Demo
    date: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the current directory
// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname)); // Fallback for root files

// API Route for Contact Form
app.post('/api/contact', async (req, res) => {
    const { name, phone, email, service, message, instituteName } = req.body;

    console.log('Received inquiry:', req.body);

    try {
        // Create new contact document
        const newContact = new Contact({
            name,
            phone,
            email,
            service,
            message,
            instituteName
        });

        // Save to MongoDB
        await newContact.save();
        console.log('✅ Inquiry saved to MongoDB');

        res.status(200).json({ success: true, message: 'Message saved to database!' });
    } catch (error) {
        console.error('❌ Error saving to database:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

// Fallback to serving index.html only for routes that don't match files
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log('Server is running at http://localhost:' + PORT);
});

