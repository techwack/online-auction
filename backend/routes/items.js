const express = require('express');
const fs = require('fs');
const path = require('path');
const authMiddleware = require('../middleware/auth');

const router = express.Router();
const itemsFile = path.join(__dirname, '../data/items.json');

const getItems = () => JSON.parse(fs.readFileSync(itemsFile, 'utf-8'));
const saveItems = (items) => fs.writeFileSync(itemsFile, JSON.stringify(items, null, 2));

// Get all items
router.get('/', (req, res) => res.json(getItems()));

// Get single item
router.get('/:id', (req, res) => {
  const item = getItems().find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ message: 'Item not found' });
  res.json(item);
});

// Create auction item (auth required)
router.post('/', authMiddleware, (req, res) => {
  const { name, description, startingBid, endDate } = req.body;
  if (!name || !startingBid)
    return res.status(400).json({ message: 'Name and starting bid are required' });

  const items = getItems();
  const item = {
    id: Date.now(),
    name,
    description: description || '',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400',
    startingBid: parseFloat(startingBid),
    currentBid: parseFloat(startingBid),
    currentBidder: null,
    seller: req.user.name,
    endDate: endDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  };
  items.push(item);
  saveItems(items);
  res.status(201).json(item);
});

// Place a bid (auth required)
router.post('/:id/bid', authMiddleware, (req, res) => {
  const { amount } = req.body;
  if (!amount) return res.status(400).json({ message: 'Bid amount is required' });

  const items = getItems();
  const idx = items.findIndex(i => i.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ message: 'Item not found' });

  const item = items[idx];
  if (parseFloat(amount) <= item.currentBid)
    return res.status(400).json({ message: `Bid must be higher than $${item.currentBid}` });

  item.currentBid = parseFloat(amount);
  item.currentBidder = req.user.name;
  items[idx] = item;
  saveItems(items);
  res.json(item);
});

module.exports = router;
