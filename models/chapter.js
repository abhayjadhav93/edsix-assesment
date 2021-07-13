module.exports = (sequelize, DataTypes) => {
    const Chapter = sequelize.define('chapter', {
        // attributes
        name : {
            type: DataTypes.STRING,
            field: 'name',
            allowNull: false,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        status:{
            type: DataTypes.BOOLEAN,
            field: 'chapter_status',
            defaultValue: true
        }, 
    }, {
        freezeTableName: true,
        allowNull: false,
        tableName: 'chapter'
    });


    return Chapter;
}
