const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 4000;


app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/Famms-Database', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error(err));


const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    cart: [
      {
          productId: { type: String, required: true },
          name: { type: String, required: true },
          quantity: { type: Number, required: true, default: 1 },
          price: { type: Number, required: true },
      },
  ],
});
const User = mongoose.model("User", userSchema);


const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    subject: { type: String, required: true },
    message: { type: String, required: true }, 
});
const Contact = mongoose.model("Contact", contactSchema);

app.get("/", (req, res) => {
    res.status(200).json({ msg: "Welcome to API" });
});


// Register user
app.post('/api/register', async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;

        if (!name || !email || !phone || !password) {
            return res.status(400).json({ msg: 'All fields are required' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ msg: 'User already exists' });
        }

        const newUser = new User({ name, email, phone, password });
        await newUser.save();

        res.status(201).json({ msg: 'User registered successfully' });
    } catch (err) {
        console.error('Error during registration:', err);
        res.status(500).json({ error: 'Registration failed' });
    }
});

// Login user
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ msg: 'All fields are required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        if (user.password !== password) {
            return res.status(401).json({ msg: 'Invalid credentials' });
        }

        res.status(200).json({ msg: 'Login successful', user });
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ error: 'Login failed' });
    }
});

// Forgot password
app.post('/api/forgot-password', async (req, res) => {
    try {
        const { email, newPassword } = req.body;

        if (!email || !newPassword) {
            return res.status(400).json({ msg: 'Both email and newPassword are required' });
        }

        const user = await User.findOneAndUpdate(
            { email },
            { password: newPassword },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        res.status(200).json({ msg: 'Password updated successfully' });
    } catch (err) {
        console.error('Error updating password:', err);
        res.status(500).json({ error: 'Server error while updating password' });
    }
});

app.post('/api/contact', async (req, res) => {
  try {
      const { name, email, subject, message } = req.body;

      if (!name || !email || !subject || !message) {
          return res.status(400).json({ error: 'All fields are required' });
      }

      const existingContact = await Contact.findOne({ email });
      if (existingContact) {
          return res.status(409).json({ error: 'Email already exists in contacts' });
      }

      const newContact = new Contact({ name, email, subject, message });
      await newContact.save();

      res.status(201).json({ msg: 'Contact saved successfully' });
  } catch (err) {
      console.error('Error saving contact:', err);
      res.status(500).json({ error: 'Failed to save contact' });
  }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});