// ? Query middleware
// * allows us to run some code before or after a certain query is executed
//  we can use it for find, findOne, findById, findOneAndUpdate, findOneAndDelete, etc

// * Query Middleware: runs before any find query is executed, like .find() and .findOne()
tourSchema.pre(/^find/, function () {
    // /^find/ matches any method starting with "find" — find, findOne, findById, findOneAndUpdate, etc.
    this.find({ secretTour: { $ne: true } });
    this.queryStart = Date.now(); // attach start time to query object
});

tourSchema.post(/^find/, function (docs) {
    console.log(`Query took ${Date.now() - this.queryStart}ms`);
});