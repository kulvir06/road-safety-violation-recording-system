import userModel from '../../models/userSchema';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

mongoose.set('useFindAndModify', false);

const WrongUsernameOrPasswordError = (id, bool) => {
    if(bool) return("Wrong password entered")
    else return("Wrong username entered")    
}

const login = (data, callback) => {
    userModel.findOne({ id: data.id },  async (err, user) => {
        if (err || !user) {
          return callback(err || WrongUsernameOrPasswordError(data.id,false) );
        }
        bcrypt.compare(data.password, user.password,  async (err, isValid) => {  
          if (err || !isValid) return callback(err || WrongUsernameOrPasswordError(data.id,true) );
                    
          user.lastLogin = Date.now();
          await user.save();
          return callback({ LOGIN: true, id: user.id, type: user.type });
          
        
        });
      });
}


module.exports = login;