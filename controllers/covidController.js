exports.getAllUsers = (req, res) => {
    userModel.getAllUsers()
    User.findAll().then(
        user => {
            console.log(user)
        }
    );
    response.success(res, {message: "data"})
}