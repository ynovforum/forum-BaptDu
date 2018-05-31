module.exports = (database, DataType) => {
    return database.define('question', {
        id: {
            type: DataType.UUID,
            primaryKey: true,
            defaultValue: DataType.UUIDV4
        },
        title: {
                type: DataType.STRING,
                require: true
        },
        content: {
            type: DataType.TEXT,
            require: true
        },
        resolvedAt: {
            type: DataType.BOOLEAN,
            require: false,
            defaultValue: false
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
