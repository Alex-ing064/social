const test_api = async function (req, res) {
    console.log(req.user);
    if (req.user) {
        res.status(200).send({ message: 'hola' });
    } else {
        res.status(403).send({ message: 'NoAccess' });
    }


}

module.exports = {
    test_api
}