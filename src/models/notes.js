const { Schema, model } = require('mongoose');

const noteSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    uid: {
        type: String,
        required: true
    }
},{
    timestamps: true // Es una propiedad "virtual" que no se puede ver directamente, pero que
}); // MongoDB agrega el guardar en la DB (createdAt y updatedAt)

module.exports = model('Node_Note', noteSchema);