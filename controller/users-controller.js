const sessionHelper = require('../helper/session-helper');
const users = require('../models/user');
const { DateTime } = require('luxon');


// GEt User
const usersGet = async (req, res) => {
    const user = await sessionHelper.loggedUserData(req);

    const registeredUser = await users.findAll({
        attributes: ['id', 'f_name', 'l_name', 'email', 'image', 'dob', 'gender', 'hobbies', 'number'],
        order: [['id', 'DESC']]
    });

    const formateDate = registeredUser.map(user => ({
        ...user.dataValues,
        dob: user.dob ? DateTime.fromJSDate(new Date(user.dob)).toFormat('dd-MM-yyyy') : "",
    }));

    return res.render('admin/users', {
        user,
        title: "Users",
        registeredUser: formateDate
    })
}

module.exports = { usersGet }