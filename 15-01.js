const express =  require('express');
const fs = require("fs");
const bodyParser = require('body-parser');
const {
    addContact,
    updateContact,
    deleteContent,
    getAllContacts,
    updateContactView,
    getAllContactsAdd
} = require('./handlers');

const hbs = require('express-handlebars').create({
    extname: '.hbs',
    helpers: {
        cancelButton: function() {
            return '<a href="/" class="btn btn-secondary mt-3">Отказаться</a>';
        }
    }
});
const app = express();


app.use(express.static(__dirname + '/public'));
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.use(bodyParser.json());

let contents = fs.readFileSync("users.json").toString();

app.get('/', (req, res)=> getAllContacts(req, res));
app.get('/Add', (req, res)=> getAllContactsAdd(req, res));
app.get('/Update', (req, res)=> updateContactView(req, res));
app.post('/Add', (req, res) => addContact(req, res));
app.post('/Update', (req, res)=> updateContact(req, res));
app.post('/Delete', (req, res)=> deleteContent(req, res));

app.listen(3000, () => console.log("http://localhost:3000/"));