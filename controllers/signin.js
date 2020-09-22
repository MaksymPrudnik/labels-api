

const handleSignin = (req, res, db, bcrypt, jwt) => {
    const { authorization } = req.headers;
    if (authorization) {
        try {
            const email = jwt.verify(authorization, process.env.JWT_SECRET).email;
            return res.json({email})
        } catch {
            return res.status(401).json('Invalid token');
        }
    }
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json('Invalid credentials');
    }
    db.select('*').from('login').where({email})
    .then(user => {
        if (bcrypt.compareSync(password, user[0].hash)) {
            const token = jwt.sign({email: user[0].email}, process.env.JWT_SECRET)
            return res.json({token, email: user[0].email})
        } else {
            return res.status(400).json('Wrong credentials')
        }
    })
    .catch(err => res.status(400).json('Unable to sign in'))
}

module.exports = {
    handleSignin
}