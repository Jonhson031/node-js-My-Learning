// ? Field Limiting

if (req.query.fields) {
    // To show only fields that users specifies
    // http://localhost:3000/api/v1/tours/?fields=name,rating
    const fields = req.query.fields.split(',').join(' ');
    query = query.select(fields);
} else {
    query = query.select('-__v')
}