const express = require('express');
const app = express();

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
            .json({error: `Item with id ${req.params.id} does not exist`})
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
            .json({error: `Item with id ${req.params.id} does not exist`})
    }

    // Remove the item from the list
    todoItems.splice(itemIndex, 1);

    // Return the updated item
    res.status(204).send()
});



// Render HTML templates using EJS
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// Serve index.html
app.get('/', (req, res) => {
    // We're going to pass in the HOSTNAME and PORT environment variables
    // into our index.html file.
    // This tells the the "client" what URL to use when
    // making requests for our API server
    //
    // By default, this will assume your running on your local machine,
    // and direct API requests to `http://localhost:8080
    //
    // If we're running this in AWS, we'll set these environment variables to
    // the public IP address of the EC2 instance we're running on.
    res.render('index', {
        hostname: process.env.HOSTNAME || 'localhost',
        port: parseInt(process.env.PORT || '8080')
    })
});

// Run the server
app.listen(parseInt(process.env.PORT || '8080'));

console.log(`App running at http://${process.env.HOSTNAME || 'localhost'}:${parseInt(process.env.PORT || '8080')}`);
