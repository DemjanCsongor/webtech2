const router = require("express").Router();
const ItemController = require("../controllers/ItemController");

router.get("/", ItemController.getItems);
router.get("/:id", ItemController.getItem);
router.post("/", ItemController.addItem);
router.put("/:id", ItemController.updateItem);
router.delete("/:id", ItemController.deleteItem);

module.exports = router;
