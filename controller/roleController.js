const { validationResult } = require('express-validator');
const sessionHelper = require('../helper/session-helper');
const role = require('../models/role');

// GET
const roleuser = async (req, res) => {
    try {
        const user = await sessionHelper.loggedUserData(req);

        const rolesUser = await role.findAll({
            attributes: ['id', 'title', 'description']
        });

        return res.render('admin/roleuser', {
            user,
            rolesUser,
            title: "Role",
        });

    } catch (error) {
        console.error('Error loading role page:', error);
    }
};

const addNewrole = async (req, res) => {
    const user = await sessionHelper.loggedUserData(req);
    return res.render('admin/addNewrole', {
        user,
        errorMsg: [],
        title: "Add New Role",
    });
}

// POST add new role
const addNewrolePage = async (req, res) => {
    const error = validationResult(req);
    const errorMsg = [];
    if (!error.isEmpty()) {
        const errorArray = error.array();
        return res.render('admin/addNewrole', {
            user: req.body,
            errorMsg: errorArray
        })
    }
    try {
        const { id, title, description } = req.body;
        const createRole = await role.create({
            id,
            title,
            description
        });
        if (createRole) {
            errorMsg.push({
                msg: "Role Created Successfully",
                path: "create role",
            });
            res.redirect('/role')
        } else {
            errorMsg.push({
                msg: "Role Not Created",
                path: "create Not role",
            });
        }
        // return res.render('admin/addNewrole', {
        //     errorMsg,
        //     user: req.body,
        //     title : 'Add New Role'
        // })

    } catch (error) {
        console.error('Error creating role:', error);
    }
}

const deleteRole = async (req, res) => {
    try {
        const roleId = req.params.id;
        const roleDelete = await role.destroy({
            where: {
                id: roleId
            }
        });
        if (roleDelete === 0) {
            return res.render('admin/role', {
                user: req.body,
            })
        }
        return res.redirect('/admin/role');
    } catch (error) {
        console.error('Error deleting role:', error);
    }
}
module.exports = {
    addNewrole,
    addNewrolePage,
    roleuser,
    deleteRole
}