const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5500;

// Middleware
app.use(express.json());
app.use(cors({
  origin: "https://harshshriva.github.io/Bovifert-/",
  credentials: true,
}));

// MongoDB Connection
mongoose.connect('mongodb+srv://harshshrivastav139:probuzin2@probuzin.jmrw6.mongodb.net/probuzin-data?retryWrites=true&w=majority&appName=Probuzin')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Define the Order Schema
const orderSchema = new mongoose.Schema({
  name: String,
  address: String,
  city: String,
  state: String,
  pin: String,
  phone: String,
  productName: String,
});

const Order = mongoose.model('Order', orderSchema);

// POST API to handle form submission
app.post('/api/order', async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).send({ message: 'Order successfully saved!' });
  } catch (error) {
    res.status(500).send({ message: 'An error occurred while saving the order.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
