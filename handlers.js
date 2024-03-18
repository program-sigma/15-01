const fs = require('fs');
const uuid = require('uuid');
const contacts = require('./users.json') || [];

const getContacts = async () => await contacts;

async function getAllContacts ( req, res) {
    try {
        const contacts = await getContacts();
        res.render('contacts.hbs', {
            title: 'Контакты',
            message: 'Контакты',
            buttonsEnabled: true,
            producs: contacts,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send('Ошибка обновления данных');
    }
}

async function getAllContactsAdd ( req, res) {
    try {
        const contacts = await getContacts();
        res.render('add.hbs', {
            buttonsEnabled: false,
            title: 'Добавить контакт',
            message: 'Добавить контакт',
            producs: contacts,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send('Ошибка обновления данных');
    }
}

async function addContact ( req, res) {
    try {
        await addCon(req.body)
            .then((result) => {
                res.type('json');
                res.end(JSON.stringify(result));
            })
            .catch((err) => {
                console.error(err.message);
            });
    }
    catch(err) {
        console.error(err);
        res.status(500).send('Ошибка обновления данных');
    }
}

async function updateContactView(req, res) {
    try {
        const contacts = await getContacts();
        let contact = await getContact(req.query.id);
        res.render('update.hbs', {
            title: 'Изменить контакт',
            message: 'Изменить контакт',
            buttonsEnabled: false,
            producs: contacts,
            currentContact: contact
        });
    }
    catch(err) {
        console.log(err.message);
        res.send(err.message);
    }
}

async function deleteContent(req, res) {
    try {
        let index = parseInt(req.body.id);
        const contacts = await getContacts();
        contacts.splice(index, 1);
        await saveToFile();
        res.send('Данные успешно удалены');
    }
    catch(err) {
        console.error(err);
        res.status(500).send('Ошибка обновления данных');
    }
}

const addCon = async (data) => {
    contacts.push({id: uuid.v4(), name: data.name, phone: data.phone});
    await saveToFile();
    return contacts;
}

async function updateContact(request, response) {
    if (request.query.id && request.body.name && request.body.phone) {
        await editContact(request.query.id, request.body)
            .then((result) => {
                response.type('json');
                response.end(JSON.stringify(result));
            })
            .catch((err) => {
                console.error(err.message);
            });
    } else {
        response.end('Parameters not found');
    }
}

const editContact = async (id, data) => {
    const contact = await contacts.find(c => c.id === id);
    if (contact) {
        contact.name = data.name;
        contact.phone = data.phone;
    }
    await saveToFile();

    return contacts;
};

const saveToFile = async () => {
    try {
        await fs.promises.writeFile('./users.json', JSON.stringify(contacts));
    } catch (e) {
        console.log(e);
    }
};

const getContact = async (id) => {
    const contact = await contacts.find(c => c.id === id);
    return contact ? contact : 'Not found'
};

module.exports = {
    addContact: addContact,
    updateContact: updateContact,
    deleteContent: deleteContent,
    getAllContacts: getAllContacts,
    updateContactView, updateContactView,
    getAllContactsAdd, getAllContactsAdd
};