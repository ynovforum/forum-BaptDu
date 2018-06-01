module.exports = (req, res, next) => {
    try {
        const user = req.user;
        if (!user) {
            return res.redirect('/oauth/login')
        }
        next();
    } catch (error) {
        return res.redirect('/500')
    }
};