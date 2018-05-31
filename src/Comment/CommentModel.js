module.exports = (database, DataType) => {
    return database.define('comment', {
        id: {
            type: DataType.UUID,
            primaryKey: true,
            defaultValue: DataType.UUIDV4
        },
        comment_content: {
            type: DataType.TEXT,
            require: true
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
