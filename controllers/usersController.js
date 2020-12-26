const UserModel = require('../models/User');
const { validationResult } = require('express-validator');

exports.get_users = async (req, res) => {
  try {
      const user = await UserModel.find({});
      res.status(200).json(user);
      res.render("user");
  }
  catch (err) {
      return res.status(500).json({ errors: [{ message: err.message }] });
  }

}

//on post request
exports.add_user = async (req, res) => {
  const { USERNAME, EMAIL, FIRSTNAME, LASTNAME, BIRTHDATE, DESCRIPTION, IMGURL } = req.body;
  try {
    const newUser = await new UserModel({
      USERNAME: USERNAME, 
      EMAIL: EMAIL, 
      FIRSTNAME: FIRSTNAME, 
      LASTNAME: LASTNAME, 
      BIRTHDATE: BIRTHDATE, 
      DESCRIPTION: DESCRIPTION, 
      IMGURL: IMGURL,
    })
    // const category = new Category(req.body);
    const addedUser = await newUser.save({ new: true });
    // res.status(200).send('Category added');
    res.status(200).json(addedUser);
    } catch (error) {
      res.send("An error occured.");
    }
};

//on delete request
exports.delete_user = async (req, res) => {
  try {
      await UserModel.deleteOne({ _id: req.params.id });
      res.status(200).send('Data is deleted');
      res.render("user");
  }
  catch (err) {
      return res.status(500).json({ errors: [{ message: err.message }] });
  }
}

//on edit request
exports.show_edit_user_page = async (req, res) => {
  // try {
  //   const user = await UserModel.findOne({ where: { id: req.params.id } });
  //   res.render("addUser", { user });
  // } catch (error) {
  //   res.send("An occur occured");
  // }
};

exports.edit_user = async (req, res) => {
  const filter = { _id: req.params.id };
  const update = { 
    // USERNAME: req.body.USERNAME, 
    // EMAIL: req.body.EMAIL,
    // FIRSTNAME: req.body.FIRSTNAME,
    // LASTNAME: req.body.LASTNAME,
    // BIRTHDATE: req.body.BIRTHDATE,
    // DESCRIPTION: req.body.DESCRIPTION,
    // IMGURL: req.body.IMGURL,
    ...req.body, 
  };
    try {
      const updatedUser = await UserModel.findOneAndUpdate( 
        filter, update,
        {
          new: true,
          upsert: true,
          runValidators: true,
        }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      return res.status(500).json({ errors: [{ message: err.message }] });
    }
  };
  

 
