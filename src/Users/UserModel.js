module.exports = (database, DataType) => {
    return database.define('users', {
        id: {
            type: DataType.UUID,
            primaryKey: true,
            defaultValue: DataType.UUIDV4
        },
        firstname:{
            type: DataType.STRING,
            require: true
        },
        lastname:{
            type: DataType.STRING,
            require: true
        },
        password:{
            type: DataType.STRING,
            require: true
        },
        email:{
            type: DataType.STRING,
            isUnique :true,
            allowNull:false,
            validate:{
                isEmail : true
            }
        },
        picture:{
            type: DataType.STRING,
            require: false
        },
        role:{
            type: DataType.ENUM,
            values: ['user', 'admin'],
            defaultValue:'user'
        },
        created_at:{
            type: DataType.DATE,
            allowNull: false
        },
        updated_at: DataType.DATE,
        deleted_at: DataType.DATE
    },{
        paranoid: true,
        underscored: true
    })
};