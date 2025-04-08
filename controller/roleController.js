const { validationResult } = require('express-validator');
const sessionHelper = require('../helper/session-helper');
const role = require('../models/role');

// GET
const roleuser = async (req, res) => {
    try {
        const user = await sessionHelper.loggedUserData(req);

        const rolesUser = await role.findAll({
            attributes: ['id', 'title', 'description'],
            order: [['id', 'DESC']]
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

// GET ADD NEW ROLE
const addNewrole = async (req, res) => {
    const user = await sessionHelper.loggedUserData(req);
    return res.render('admin/addNewrole', {
        user,
        role: {},
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
            user,
            role: req.body,
            errorMsg: errorArray,
            title: "Add New Role",
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
            //console.log('Role not found or already deleted');
            return res.render('admin/role', {
                user: req.body,
                title: "Role",
            })
        }
        return res.redirect('/admin/role');
    } catch (error) {
        console.error('Error deleting role:', error);
    }
}

// GET Edit page
const editrolePage = async (req, res) => {
    const user = await sessionHelper.loggedUserData(req);
    const roleId = req.params.id;
    const roleData = await role.findOne({
        where: {
            id: roleId
        }
    });
    if (!roleData) {
        return res.render('admin/addNewrole', {
            role: {},
            title: "Edit Role",
            user
        })
    }
    return res.render('admin/addNewrole', {
        role: roleData,
        errorMsg: [],
        title: "Edit Role",
        user
    })
}

// POST editrole
const editrole = async (req, res) => {
    const roleId = req.params.id;
    const user = await sessionHelper.loggedUserData(req);
    const { title, description } = req.body;
    const error = validationResult(req);

    if (!error.isEmpty()) {
        const errorArray = error.array();
        return res.render('admin/addNewrole', {
            role: req.body,
            errorMsg: errorArray,
            title: "Edit Role",
            user
        })
    }
    try {
        const userEditRole = await role.findOne({
            where: {
                id: roleId
            }
        });

        if (!userEditRole) {
            return res.render('admin/addNewrole', {
                role: req.body,
                errorMsg: [{
                    msg: "Role not found",
                    path: "edit role",
                }],
                title: "Edit Role",
                user
            });
        }

        await userEditRole.update(
            { title, description },
            // { where: { id: roleId } }
        );

        const updateRole = await role.findOne({ where: { id: roleId } });
        const rolesUser = await role.findAll({
            attributes: ['id', 'title', 'description'],
            order: [['id', 'DESC']]
        });
        // return res.redirect('/role');
        return res.render('admin/roleuser', {
            role: updateRole,
            errorMsg: [{
                msg: "Role updated successfully",
                path: "edit role",
            }],
            title: "Role",
            user, rolesUser
        })
    } catch (error) {
        console.error('Error updating role:', error);
    }
}


module.exports = {
    addNewrole,
    addNewrolePage,
    roleuser,
    deleteRole,
    editrole,
    editrolePage
}