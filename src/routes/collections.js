const express = require("express");
const router = express.Router();
const collectionController = require("../app/controllers/CollectionController");
const tokenMiddleWare = require("../app/middlewares/tokenMiddleWare");


// DELETED api/v1/collection/:id
router.delete('/:id', tokenMiddleWare.veryfyToken, collectionController.deletedCollection)
// PATCH api/v1/collection/addShort/:id
router.patch('/updateShort/:id', tokenMiddleWare.veryfyToken, collectionController.updateShortInCollection)
// PATCH api/v1/collection/id
router.patch('/:id', tokenMiddleWare.veryfyToken, collectionController.updateCollection);
// POST api/v1/collection
router.post('/', tokenMiddleWare.veryfyToken, collectionController.postNewCollection)
// GET api/v1/collection/:id
router.get('/:id', collectionController.getCollectionById);
// GET api/v1/collection
router.get('/', collectionController.getAllCollection);


module.exports = router;
