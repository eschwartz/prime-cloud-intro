const express = require('express');
const app = express();

// Grab the hostname and port from environment variables
const HOSTNAME = process.env.HOSTNAME || 'localhost';
const PORT = parseInt(process.env.PORT || '80');

// Create a list of "todo" items,
// which will be managed by our API server.
// In a real application, these items would be stored in a database somewhere.
// But for the purposes of this demonstration, we can keep them here "in memory".
const todoItems = [
    {id: 0, 'label': 'Learn to Code', isDone: true},
    {id: 1, 'label': 'Learn to Cloud', isDone: false},
    {id: 2, 'label': '...?', isDone: false},
    {id: 3, 'label': 'Profit', isDone: false}
];

// We will increment our `id` property by one for each record.
// This value will be the id for the next item created.
let nextId = 4;

// Render HTML templates using EJS
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// Serve index.html
app.get('/', (req, res) => {
   res.render('index', {
       hostname: HOSTNAME,
       port: PORT
   })
});

// Middleware for express.js to support JSON requests
app.use(express.json());

// GET /api/
// Returns a JSON list of todo items
app.get('/api/', (req, res) => {
    res.json(todoItems)
});

// POST /api/
// Creates a new todo item from the JSON in the user's request body
// and returns the new item
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

// PUT /api/:id
// Updates the item with corresponding `id`
// with values from the JSON in the user's request body.
// Returns the updated item
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

// DELETE /api/:id
// Deletes the item with the corresponding `id`
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

// Run the server, listening to requests on port 80
// (the default port for HTTP requests).
app.listen(PORT);
