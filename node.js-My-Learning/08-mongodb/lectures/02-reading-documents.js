// ? CRUD: Querying (Reading) Documents
db.tours.find() // - to read all created tours

db.tours.find({name: "The Forest Hiker"}) // - to find tours by name

// To find price that is less than or equal 500
db.tours.find({price: {$lte: 500}}) // $lte - less than or equal

// To find price that is less than 500 AND ratng is greater or equal 4.8
db.tours.find({price: {$lt: 500}, rating: {$gte: 4.8}}) // $gte - greater or equal

// To find price that is less than 500 OR ratng is greater or equal 4.8
db.tours.find({$or: [{price: {$lt: 500}}, {rating: {$gte: 4.8}}]})
// when we use $or, we must wrap our condition inside array


db.tours.find({$or: [{price: {$lt: 500}}, {rating: {$gte: 4.8}}]}, {name: 1}) // to show only name from finded documents