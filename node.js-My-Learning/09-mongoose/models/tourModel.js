const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');

// * Creating a Schema
const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A tour must have a name'],
        unique: true,
        trim: true,
        maxLength: [40, 'A tour name must have less or equal than 40 characters'],
        minLength: [5, 'A tour name must have more or equal than 10 characters']
    },
    slug: String,
    duration: {
        type: Number,
        required: [true, 'A tour must have a duration']
    },
    maxGroupSize: {
        type: Number,
        required: [true, 'A tour must have a group size']
    },
    difficulty: {
        type: String,
        required: [true, 'A tour must have a difficulty'],
        trim: true,
        enum: { // to allow only cerain values inside value
            values: ['easy', 'medium', 'difficult'],
            message: 'Difficulty must eiter: easy, medium or difficult'
        }
    },
    ratingsAvg: {
        type: Number,
        default: 4.5,
        min: [1, 'Rating must be above 0'],
        max: [5, 'Rating must be below or equal to 5']
    },
    ratingsQuantity: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: [true, 'A tour must have a price']
    },
    priceDiscount: {
        type: Number,
        validate: {
            validator: function (val) {
                // This only works when creating NEW document, not gonna work when updating document
                return val < this.price // 100 < 200
            },
            message: 'Discount price ({VALUE}) should be below the regular price'
        }
    },
    summary: {
        type: String,
        trim: true
    },
    summary: {
        type: String,
        trim: true,
        required: [true, 'A tour must have a summary']
    },
    description: {
        type: String,
        trim: true
    },
    imageCover: {
        type: String,
        trim: true,
        required: [true, 'A tour must have a image cover']
    },
    images: [String],
    createdAt: {
        type: Date,
        default: Date.now()
    },
    startDates: [Date],
    secretTour: {
        type: Boolean,
        default: false
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

// * Virtual Properties
tourSchema.virtual('durationWeeks').get(function () {
    return this.duration / 7
})

// * Document Middleware: runs before .save() and .create()
tourSchema.pre('save', async function () {
    // ✅ Use async/await instead of next()
    this.slug = slugify(this.name, { lower: true });
})

// * Query Middleware
tourSchema.pre(/^find/, function () {
    this.find({ secretTour: { $ne: true } });
    this.queryStart = Date.now(); // attach start time to query object
});

tourSchema.post(/^find/, function (docs) {
    console.log(`Query took ${Date.now() - this.queryStart}ms`);
});

// * Aggregation Middleware
tourSchema.pre('aggregate', function () {
    this.pipeline().unshift({
        $match: {
            secretTour: { $ne: true }
        }
    })
})

// * Creating a Schema Model
const Tour = mongoose.model('Tour', tourSchema);


module.exports = Tour;