const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

const app = express();
const PORT = process.env.PORT || 5500;

app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb+srv://harshshrivastav139:probuzin2@probuzin.jmrw6.mongodb.net/probuzin-data?retryWrites=true&w=majority&appName=Probuzin', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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

app.use(cors({
    origin: process.env.BASE_URL,
    credentials: true
  }));

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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
