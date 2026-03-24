// ? CRUD: Deleting Document

// To delete all tours that have rating less than 4.8
db.tours.deleteMany({rating: {$lt: 4.8}})

// ! To delete all documents in collection
db.tours.delete({})