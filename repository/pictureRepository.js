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
};

module.exports = pictureRepository;
