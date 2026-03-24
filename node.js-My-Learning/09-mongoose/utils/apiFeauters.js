class APIFeatures {
    constructor(query, queryString, customQuery) {
        this.query = query;
        this.queryString = queryString;
        this.customQuery = customQuery
        // Pull sort/fields/limit/page from customQuery (alias) or req.query
        this.controlQuery = { ...queryString, ...(customQuery || {}) };
    }

    filter() {
        const queryObj = { ...this.queryString, ...(this.customQuery || {}) };

        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(el => delete queryObj[el]);  // Fixed: brackets for property access

        // 1B) Advanced Filtering
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }
    sort() {
        // 2) Sorting
        if (this.controlQuery.sort) {
            this.query = this.query.sort(this.controlQuery.sort.split(',').join(' '));
        } else {
            this.query = this.query.sort('-_id');
        }
        return this;
    }
    limitFileds() {
        // 3) Field Limiting
        if (this.controlQuery.fields) {
            this.query = this.query.select(this.controlQuery.fields.split(',').join(' '));
        } else {
            this.query = this.query.select('-__v');
        }
        return this;
    }
    paginate() {
        const page = this.controlQuery.page * 1 || 1;
        const limit = this.controlQuery.limit * 1 || 100;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);

        // If page doesn't have any data
        // if (this.query.page) {
        //     const numTours = await Tour.countDocuments(); // - returns a number of documents
        //     if (skip >= numTours) {
        //         throw new Error('This page does not exist!');
        //     }
        // }
        return this;
    }
}
module.exports = APIFeatures;