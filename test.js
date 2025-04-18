const db = require('./models');

const usersrole = async () => {
    const user1 = await db.users.findAll({
        include: [
            {
                model: db.roles,
                required: false,
                attributes:['title']
            }
        ]
    })
    console.log(JSON.stringify(user1, null, 2))
    console.log(user1);
}


usersrole();