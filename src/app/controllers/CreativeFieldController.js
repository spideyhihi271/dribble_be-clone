const creativeField = require("../models/CreativeField");

class CommentController {
    async getAll(req, res) {
        try {
            let data = await creativeField.find({});
            return res.status(200).json(data);
        } catch (error) {
            return res.status(400).send(error.message);
        }
    }
}

module.exports = new CommentController();
