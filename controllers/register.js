

const handleRegister = (req, res, db, bcrypt, jwt) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json('Invalid credentials');
    }
    const hash = bcrypt.hashSync(password);
    db('login')
    .returning('*')
    .insert({
        email,
        hash
    })
    .then(result => {
        const token = jwt.sign({email: result[0].email}, process.env.JWT_SECRET)
        return res.json({token, email: result[0].email});
    })
    .catch(err => res.status(400).json('Unable to register'));
}

module.exports = {
    handleRegister
}