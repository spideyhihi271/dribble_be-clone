const Address = require("../models/Address");

class AddressController {
    async getAll(req, res) {
        try {
            let data = await Address.find({});
            return res.status(200).json(data);
        } catch (error) {
            return res.status(400).send(error.message);
        }
    }
}

module.exports = new AddressController();
