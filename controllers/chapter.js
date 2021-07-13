const models = require('../models');
const sequelize = models.sequelize;
const Sequelize = models.Sequelize;
const Op = Sequelize.Op;
const check = require("../lib/checkLib");

exports.getAllChapters = async (req, res, next) => {

    let chapter = await models.chapter.findAll({});

    if (!chapter) {
        return res.status(404).json({ message: "data not found" });
    }
    return res.status(200).json({ data: chapter});

};


exports.sortChapter = async (req, res, next) => {

    const {limit,orderby}=req.query;

    let chapter = await models.chapter.findAll({
        order: [["name", orderby]],
        limit:limit
    });

    if (!chapter) {
        return res.status(404).json({ message: "data not found" });
    }
    return res.status(200).json({ data: chapter});

};




exports.getChapterById = async (req, res, next) => {

    const { id } = req.params;
    const chapterResult = await models.chapter.findOne({
        where: { id, isActive: true }
    });
    if (chapterResult) {
        res.status(200).json({ message: "Chapter fetched successfully", chapterResult })
    } else {
        res.status(404).json({ message: 'Data not found' });
    }

};


exports.addChapter = async (req, res, next) => {

    const { name } = req.body;
    if (!check.isEmpty(name)) {
        const addChapter = await models.chapter.create({ name })
        if (addChapter) {
            return res.status(200).json({ message: 'Chapter has been added' });
        }
        return res.status(422).json({ message: 'Failed to add Chapter' });
    } else {
        return res.status(422).json({ message: 'Please enter valid Chapter' });
    }

};


exports.updateChapter = async (req, res, next) => {

    const { id } = req.params;
    const { name } = req.body;
    let findChapter = await models.chapter.findOne({ where: { id, isActive: true } })
    if (!findChapter) {
        return res.status(404).json({ message: "Chapter not found" });
    }
    if (!check.isEmpty(name)) {
        const updateChapter = await models.chapter.update({ name }, { where: { id: id } })
        if (updateChapter) {
            return res.status(200).json({ message: 'Chapter has been updated' });
        }
        return res.status(400).json({ message: 'Failed to update Chapter' });
    }

};


exports.deleteChapter = async (req, res, next) => {

    const { id } = req.params;
    const findChapter = await models.chapter.findOne({ where: { id, isActive: true } })
    if (!findChapter) {
        return res.status(404).json({ message: "Chapter not found" });
    }
    const deleteChapter = await models.chapter.destroy( { where: { id: id } })
    if (deleteChapter[0] == 0) {
        return res.status(404).json({ message: "Chapter delete failed" });
    }
    return res.status(200).json({ message: `Chapter has been deleted ` })

};



exports.chapterStatus = async (req, res, next) => {

    const id = req.params.id;
    const status = req.body.status
    const chapterResult = await models.chapter.findAll({ where: { id: id }, isActive: true })
    let activate;
    if (chapterResult[0] === 0) {
      res.status(404).json({ message: 'Data not found' });
    } else {
      if (status === true) {
        activate = await models.chapter.update({ status }, { where: { id } })
        if (activate[0] === 0) {
          res.status(404).json({ message: 'Data not found' });
        } else {
          res.status(200).json({ message: 'The status has been activated' });
        }
      } else {
        activate = await models.chapter.update({ status }, { where: { id } })
        if (activate[0] === 0) {
          res.status(404).json({ message: 'Data not found' });
        } else {
          res.status(200).json({ message: 'The status has been deactivated' });
        }
      }
    }

};

