// ? Virtual Properties
// * They are fields that you can define on your schema that don't get saved to the database but are computed on the fly when you fetch a document.

const tourSchema = new mongoose.Schema(
    {
        name: String,
        duration: Number,  // in days
        price: Number,
    },
    {
        toJSON: { virtuals: true },  // ← include virtuals when converting to JSON
        toObject: { virtuals: true },  // ← include virtuals when converting to Object
    }
);

// Define the virtual
tourSchema.virtual('durationWeeks').get(function () {
    return this.duration / 7;  // 'this' refers to the current document
});