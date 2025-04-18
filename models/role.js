module.exports = (sequelize, DataTypes) => {
    const Roles = sequelize.define("roles", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });

    Roles.associate = (model) => {
        Roles.hasMany(model.users, {
            foreignkey: 'roleId'
        })
    }


    return Roles;
}
