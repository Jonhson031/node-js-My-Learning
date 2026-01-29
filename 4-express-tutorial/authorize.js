// ? Authorize middleware
const authorize = (req, res, next) =>{
    // http://localhost:5000/?user=John
    const {user, id} = req.query;
    if(user === 'John' || Number(id) === 3){
        req.user = {name: 'John', id: 3};
        next();
    } else{
        res.status(401).send('Unauthorized');
    }
}
module.exports = authorize;