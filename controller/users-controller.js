const { validationResult } = require('express-validator');
const sessionHelper = require('../helper/session-helper');
const bcrypt = require('bcrypt')
const { DateTime } = require('luxon');
const fs = require('fs');
const db = require('../models');



// GET User
const usersGet = async (req, res) => {
    const user = await sessionHelper.loggedUserData(req);

    const registeredUser = await db.users.findAll({
        include: {
            model: db.roles,
            required: false,
            attributes: ['title']
        },
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


// GET addUser Page
const addUserPage = async (req, res) => {
    const loggedInUser = await sessionHelper.loggedUserData(req);
    const roleData = await db.roles.findAll({});
    const id = req.params.id;

    if (id) {
        const userEdit = await db.users.findOne({
            where: { id },
            include: [
                { model: db.roles, required: false }
            ]
        });
        const hobbiesArray = userEdit.hobbies ? userEdit.hobbies.split(',') : [];
        console.log(userEdit)
        if (userEdit) {
            return res.render('admin/addNewUser', {
                title: "Edit User",
                user: loggedInUser,
                errorMsg: [],
                FormData: userEdit,
                roleData,
                hobbiesArray
            })
        }
    } else {
        const hobbiesArray = [];
        return res.render('admin/addNewUser', {
            user: loggedInUser,
            title: "Add New User",
            errorMsg: [],
            FormData: {},
            roleData,
            hobbiesArray
        });

    }
}


// addUserPOST
const addOrEditUser = async (req, res) => {
    const loggedInUser = await sessionHelper.loggedUserData(req);

    const error = validationResult(req);
    const errorMsg = [];

    const roleData = await db.roles.findAll({});

    const { id, f_name, l_name, oldImage, email, password, gender, number, dob, hobbies, roleId } = req.body;
    const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

    if (!error.isEmpty()) {
        const errorArray = error.array();
        return res.render('admin/addNewUser', {
            user: loggedInUser,
            errorMsg: errorArray,
            title: 'Add NewUser',
            FormData: req.body,
            roleData,
        })
    }

    let image = req.file ? req.file.filename : oldImage;
    if (req.file && oldImage) {
        fs.unlink(`public/img/userImages/${oldImage}`, (err) => {
            if (err) {
                console.error('old is not delete', err)
            }
        })
    }

    const checkEmail = await db.users.findOne({ where: { email } });
    if (checkEmail && checkEmail.id != id) {
        errorMsg.push({
            path: "emailAlready",
            msg: "Email already exists"
        })
        return res.render('admin/addNewUser', {
            user: loggedInUser,
            errorMsg,
            title: id ? 'Edit User' : 'Add NewUser',
            FormData: req.body,
            roleData
        })
    }
    if (id) {

        const hobbiesFormate = hobbies ? (Array.isArray(hobbies) ? hobbies.join(',') : hobbies) : '';

        const updatedUser = {
            f_name,
            l_name,
            email,
            password,
            image: image,
            number,
            gender,
            hobbies: hobbiesFormate,
            dob,
            roleId: roleId
        };
        if (hashedPassword) {
            updatedUser.password = hashedPassword;
        }
        const isEdit = await db.users.update(updatedUser, {
            where: { id }
        });

        if (isEdit[0] > 0) {
            return res.redirect('/users');
        } else {
            errorMsg.push({
                path: 'edituser',
                msg: 'user not found'
            })
            return res.render('admin/addNewUser', {
                user: loggedInUser,
                errorMsg,
                title: 'Add NewUser',
                FormData: req.body,
                roleData
            })
        }
    } else {
        const hobbiesFormate = hobbies ? (Array.isArray(hobbies) ? hobbies.join(',') : hobbies) : '';

        const isAddUser = await db.users.create({
            f_name,
            l_name,
            email,
            password: hashedPassword,
            image: req.file ? req.file.filename : image,
            number,
            gender,
            hobbies: hobbiesFormate,
            dob,
            roleId
        });

        if (isAddUser) {
            return res.redirect('/users')
        } else {
            errorMsg.push({
                path: 'adduser',
                msg: 'Failed to create user'
            });
            return res.render('admin/addNewUser', {
                user: loggedInUser,
                errorMsg,
                title: 'Add NewUser',
                FormData: req.body,
                roleData
            });
        }
    }
}

module.exports = {
    usersGet,
    addOrEditUser,
    addUserPage
}