// Import contact model
Contact = require('../models/contactModel');

// Handle index actions
exports.index = async function (req, res) {
    await Contact.get(function (err, contacts) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Contacts retrieved successfully",
            datetime: new Date(),
            data: contacts
        });
    });
};

// Handle create contact actions
exports.new =  async function (req, res) {
    var contact = new Contact();
    contact.name = req.body.name ? req.body.name : contact.name;
    contact.gender = req.body.gender;
    contact.email = req.body.email;
    contact.phone = req.body.phone;

    // save the contact and check for errors
    await contact.save(function (err) {
        if (err)
            res.json({
                message: 'Error!',
                datetime: new Date(),
                data: err
            });
        else res.json({
            message: 'New contact created!',
            datetime: new Date(),
            data: contact
        });
    });
};

// Handle view contact info
exports.view = async function (req, res) {
    await Contact.findById(req.params.contact_id, function (err, contact) {
        if (err)
            res.send(err);
        else res.json({
            message: 'Contact details loading..',
            datetime: new Date(),
            data: contact
        });
    });
};

// Handle update contact info
exports.update = async function (req, res) {

    await Contact.findById(req.params.contact_id, function (err, contact) {
        if (err)
            res.send(err);
        else {
            contact.name = req.body.name ? req.body.name : contact.name;
            contact.gender = req.body.gender;
            contact.email = req.body.email;
            contact.phone = req.body.phone;

            // save the contact and check for errors
            contact.save(function (err) {
                if (err)
                    res.json(err);
                else res.json({
                    message: 'Contact Info updated',
                    datetime: new Date(),
                    data: contact
                });
            });
        }
    });
}

// Handle delete contact
exports.delete = async function (req, res) {
    await Contact.deleteOne({
                _id: req.params.contact_id
            }, function (err, contact) {
                if (err)
                    res.send(err);
                else res.json({
                    status: "success",
                    message: 'Contact deleted',
                    datetime: new Date(),
                });
            });
};