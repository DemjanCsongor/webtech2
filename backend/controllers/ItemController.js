const Item = require("../models/Item");

module.exports.getItems = async function (req, res) {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "Error occurred while getting items." });
  }
};

module.exports.getItem = async function (req, res) {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found." });
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: "Error occurred while getting the item." });
  }
};

module.exports.addItem = async function (req, res) {
  const item = new Item({
    name: req.body.name,
    description: req.body.description,
  });

  try {
    const savedItem = await item.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(500).json({ message: "Error occurred while adding the item." });
  }
};

module.exports.updateItem = async function (req, res) {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedItem)
      return res.status(404).json({ message: "Item not found." });
    res.status(200).json(updatedItem);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error occurred while updating the item." });
  }
};

module.exports.deleteItem = async function (req, res) {
  try {
    const item = await Item.findByIdAndRemove(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found." });
    res.status(200).json({ message: "Item deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error occurred while deleting the item." });
  }
};
