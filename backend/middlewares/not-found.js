const notFound = (req,res) => {
    return res.status(404).send("<h1>Resource doesn't exist</h1><a>Go back to Home</a>");
}

module.exports = notFound ;