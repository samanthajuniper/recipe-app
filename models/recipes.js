const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    name: String,
    link: String,
    categoryId: String
});

module.exports = mongoose.model('Recipes', recipeSchema);

