import mongoose from 'mongoose'
import config from 'config-lite'

//连接数据库
mongoose.connect(config.url, {
  useNewUrlParser: true
});

const Schema = mongoose.Schema;

const adminSchema = new Schema({
	user_name: String,
	password: String,
	id: Number,
	create_time: String,
	admin: {type: String, default: '管理员'},
	status: Number,  //1:普通管理、 2:超级管理员
	avatar: {type: String, default: 'default.jpg'},
	city: String,
})

adminSchema.index({id: 1});

const Admin = mongoose.model('Admin', adminSchema);


export default Admin
