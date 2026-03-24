// ? Document Middleware in Mongoose
const slugify = require('slugify');
// * runs before .save() and .create()

// Your Code → [pre hook] → Database Operation → [post hook] → Result

tourSchema.pre('save', async function () {
    // ✅ Use async/await instead of next()
    this.slug = slugify(this.name, { lower: true });
    // next(); * next() was completely removed from Mongoose 7.0 + versions
})

// * post — runs after the operation
tourSchema.post('save', async function (doc, next) {
    // 'this' is no longer useful here
    // 'doc' = the finished, saved document
    console.log(doc);
});