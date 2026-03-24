// ? CRUD: Updating Documents

// To update price:
db.tours.updateOne({name: "The Snow Adventure"}, {$set: {price: 321}}) // - $set to update or set property

// If there is no property with inputed name, it will set a new one
db.tours.updateMany({price: {$gt: 500}, rating: {$gte: 4.8}}, {$set: {premium: true}})