module.exports = (req, res, next) => {
    try {
        const user = req.user;
        if (user.role !== 'admin' ) {
            return res.redirect('/')
        }
        next();
    } catch (error) {
        return res.redirect('/500')
    }
};