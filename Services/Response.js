exports.success = (res, data = {}) => {
    data['success'] = true
    res.status(200).json(data)
}

exports.unauthorized = (res, data = {}) => {
    data['success'] = false
    res.status(401).json(data);
}

exports.error = (res, data = {}) => {
    data['success'] = false
    res.status(500).json(data);
}