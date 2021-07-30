


const dashboard = async (req, res, next) => {
    res.json({
        message: "OK",
        user: req.user
    }) 
}

export default dashboard;