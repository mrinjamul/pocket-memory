const Picture = require("../models/picture");

const pictureRepository = {
  addPicture: async (picture) => {
    try {
      const newPicture = new Picture(picture);
      return await newPicture.save();
    } catch (error) {
      throw new Error(`Error creating picture: ${error.message}`);
    }
  },
  getAllPictures: async () => {
    try {
      return await Picture.find();
    } catch (error) {
      throw new Error(`Error getting picture: ${error.message}`);
    }
  },
  getAllPublicPictures: async () => {
    try {
      return await Picture.find({ privacy: "public" });
    } catch (error) {
      throw new Error(`Error getting picture: ${error.message}`);
    }
  },
  getPicturesByUserId: async (id) => {
    try {
      return await Picture.find({ userId: id });
    } catch (error) {
      throw new Error(`Error getting picture: ${error.message}`);
    }
  },
  updatePictureById: async (id, pictureData) => {
    try {
      return await Picture.findByIdAndUpdate(id, pictureData, {
        new: true,
      });
    } catch (error) {
      throw new Error(`Error updating picture: ${error.message}`);
    }
  },
  deletePictureById: async (id) => {
    try {
      return await Picture.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`Error deleting picture: ${error.message}`);
    }
  },
  deletePictureByIdAndUserId: async (id, userId) => {
    try {
      const query = { _id: id, userId: userId };
      return await Picture.deleteOne(query);
    } catch (error) {
      throw new Error(`Error deleting picture: ${error.message}`);
    }
  },
};

module.exports = pictureRepository;
