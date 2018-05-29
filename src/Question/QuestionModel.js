module.exports = (database, DataType) => {
    return database.define('questions', {
        id: {
            type: DataType.UUID,
            primaryKey: true,
            defaultValue: DataType.UUIDV4
        },
        title: {
                type: DataType.STRING,
                require: true
        },
        description: {
            type: DataType.STRING,
            require: true
        },
        resolvedAt: {
            type: DataType.BOOLEAN,
            require: false
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
