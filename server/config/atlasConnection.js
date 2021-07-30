import mongoose from 'mongoose';

const connection = () => {
    const url = "mongodb+srv://admin:yjwxjNqyBn5B26jZ@cluster0.ozorz.mongodb.net/project-db?retryWrites=true&w=majority";
    const con = mongoose.connect(url, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true  
    })
     .then(res => console.log("connected to db"))
     .catch(err => console.error("Error caught =",err));
}

const db = {};
db.connection = connection;

module.exports = db ;


