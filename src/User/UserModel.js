module.exports = (database, DataType) => {
    return database.define('user', {
        id: {
            type: DataType.UUID,
            primaryKey: true,
            defaultValue: DataType.UUIDV4
        },
        name: {
                type: DataType.STRING,
                require: true
        },
        email: {
            type: DataType.STRING,
            require: true
        },
        bio: {
            type: DataType.TEXT,
            require: false
        },
        picture: {
            type: DataType.STRING,
            require: false
        },
        password: {
            type: DataType.STRING,
            require: false
        },
        role:{
          type: DataType.ENUM,
          values:['user', 'admin'],
          defaultValue: 'user',
        },
        created_at: {
            type: DataType.DATE,
            allowNull: false
        },
        updated_at: DataType.DATE,
        deleted_at: DataType.DATE
    }, {
        paranoid: true,
        underscored: true
    })
};
