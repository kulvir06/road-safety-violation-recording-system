import userModel from "../../models/userSchema";

const create = async(data, callback) => {

  await userModel.findOne({ id: data.id }, async (err, id) => {
    if (err || id) {
      return callback(err || new Error('the user already exists'));
    }
    
    const user = new userModel(data);
    try{
        await user.save();
        console.log("User created successfully");
        callback(true)
    } catch (error) {
        callback(error)        
    }

  });
}


module.exports = create;
  