const location = {
    512154520: [
        [10, 10, 50, 10, 0],
        [10, 10, 50, 10, 0]
    ]
};

var getCardLocation = function (actressId) {
    return location[actressId][0];
}
var getResumeLocation = function (actressId) {
    return location[actressId][1];
}

const Easter = {
    getLocation
};

export { Easter };
export default Easter;