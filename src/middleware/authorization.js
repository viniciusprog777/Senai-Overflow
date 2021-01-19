const jwt = require("jsonwebtoken");
const auth = require('../config/auth.json')
module.exports = (req, res, next) => {
    const {authorization} = req.headers;

    if (!authorization) 
        res.status(401).send({error: "Token não informado"})
    
    const [Bearer, token] = authorization.split(" ");

    if (!token) {
        res.status(401).send({error: "Token mal formatado"})
    }
    
    try {
        const payload = jwt.verify(token, auth.secret)

        req.studentId = payload.studentId;
        
        return next();

    } catch (error) {
        res.status(401).send({error: "Token inválido"})
    }
}