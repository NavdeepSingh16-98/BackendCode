const mongoose = require('mongoose')



const userSchema = new mongoose.Schema({
firstname:{

    type:String,
    default:null,
    required:[true,'Name is required'],
    maxlength:[25,'first name must be 25 ch Long']
},

lastname:{

    type:String,
    default:null,
    required:[true,'last name is required'],
    maxlength:[25,'last name must be 25 ch Long']
},

password:{

    type:String,
    default:null,
    required:[true,'password is required']
},

email:{

    type:String,

    default:null,

    required:[true,'email is required'],


}






})

module.exports = mongoose.model('user',userSchema)
