const Tag = require("../models/Tags");

class CommentController {
    async getAllTag(req, res) {
        try {
            let data = await Tag.find({});
            return res.status(200).json(data);
        } catch (error) {
            return res.status(400).send(error.message);
        }
    }
}

module.exports = new CommentController();
