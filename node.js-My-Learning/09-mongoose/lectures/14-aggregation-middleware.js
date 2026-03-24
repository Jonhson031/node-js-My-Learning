// ? Aggregation middleware
// * Used to modify aggregation pipeline before it runs
// For example when you hided secretTour using queryMiddleware, it still gonna show this document in aggregation pipeline

tourSchema.pre('aggregate', function () {
    this.pipeline().unshift({ // hides secretTour that is set to true
        $match: {
            secretTour: { $ne: true }
        }
    })
})