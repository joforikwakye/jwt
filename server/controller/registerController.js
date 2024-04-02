const Student = require('../models/student')

const handleCreateUser = (req, res) => {
    const {name, email, password} = req.body
    if(!name || !email || !password) return res.sendStatus(400).json({"error": "username, password and email are required"})
    Student.create({ name, email, password })
    .then((user) => res.json(user))
    .catch((err) => res.json(err));

}


module.exports = {handleCreateUser}