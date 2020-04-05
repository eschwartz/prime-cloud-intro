const express = require('express');
const app = express();

const todoItems = [
    {id: 0, 'label': 'Learn to Code', isDone: true},
    {id: 1, 'label': 'Learn to Cloud', isDone: false},
    {id: 2, 'label': '...?', isDone: false},
    {id: 3, 'label': 'Profit', isDone: false}
];

let nextId = 4;

app.use(express.json());

app.get('/api/', (req, res) => {
    res.json(todoItems)
});

app.post('/api/', (req, res) => {
    // Add an ID to the item
    const item = req.body;
    item.id = nextId;

    // Increment nextId, so our next item has a new id
    nextId++;

    // Add the item to the list
    todoItems.push(item);

    // Return the created item
    res.status(201).json(item);
});

app.put('/api/:id', (req, res) => {
   // Find the item
    const item = todoItems.find(i => i.id === parseInt(req.params.id));

    // Return 404, if the item doesn't exist
    if (!item) {
        return res.status(404)
            .json({ error: `Item with id ${req.params.id} does not exist`})
    }

    // Update item, with the request body
    Object.assign(item, req.body);

    // Return the updated item
    res.json(item);
});

app.delete('/api/:id', (req, res) => {
    // Find the index of the item in our list
    const itemIndex = todoItems.findIndex(i => i.id === parseInt(req.params.id));

    // Return 404, if the item doesn't exist
    if (itemIndex === -1) {
        return res.status(404)
            .json({ error: `Item with id ${req.params.id} does not exist`})
    }

    // Remove the item from the list
    todoItems.splice(itemIndex, 1);

    // Return the updated item
    res.status(204).send()
});

app.use(express.static('public'))

app.listen(8080);

module.exports = app;
