import UserModel from '../model/user'
import BaseComponent from '../prototype/baseComponent'
import crypto from 'crypto'
import formidable from 'formidable'
import dtime from 'time-formater'

class User extends BaseComponent {

	// 构造函数
	constructor() {
		super()
		this.login = this.login.bind(this)
		this.register = this.register.bind(this)
		this.encryption = this.encryption.bind(this)
		this.updateAvatar = this.updateAvatar.bind(this)
	}

	// 登录
	async login(req, res, next) {
		// 创建 form 表单
		const form = new formidable.IncomingForm();

		form.parse(req, async (err, fields, files) => {
			if (err) {
				res.send({
					status: 0,
					type: 'FORM_DATA_ERROR',
					message: '表单信息错误'
				})
				return
			}

			const { user_name, password, status = 1 } = fields;

			try {
				if (!user_name) {
					throw new Error('用户名参数错误')
				} else if (!password) {
					throw new Error('密码参数错误')
				}
			} catch (err) {
				console.log(err.message, err);
				res.send({
					status: 0,
					type: 'GET_ERROR_PARAM',
					message: err.message,
				})
				return
			}

			const newpassword = this.encryption(password);

			try {
				const user = await UserModel.findOne({ user_name })
				if (!user) {
					const userTip = status == 1 ? '管理员' : '超级管理员'
					const user_id = await this.getId('user_id');
					const cityInfo = await this.guessPosition(req);
					const newUser = {
						user_name,
						password: newpassword,
						id: user_id,
						create_time: dtime().format('YYYY-MM-DD HH:mm'),
						user: userTip,
						status,
						city: cityInfo.city
					}

					await UserModel.create(newUser)

					req.session.user_id = user_id;

					res.send({
						status: 1,
						success: '注册管理员成功',
					})
				} else if (newpassword.toString() != user.password.toString()) {
					console.log('管理员登录密码错误');
					res.send({
						status: 0,
						type: 'ERROR_PASSWORD',
						message: '该用户已存在，密码输入错误',
					})
				} else {
					req.session.user_id = user.id;
					res.send({
						status: 1,
						success: '登录成功'
					})
				}
			} catch (err) {
				console.log('登录管理员失败', err);
				res.send({
					status: 0,
					type: 'LOGIN_ADMIN_FAILED',
					message: '登录管理员失败',
				})
			}
		})
	}

	// 注册
	async register(req, res, next) {
		const form = new formidable.IncomingForm();
		form.parse(req, async (err, fields, files) => {
			if (err) {
				res.send({
					status: 0,
					type: 'FORM_DATA_ERROR',
					message: '表单信息错误'
				})
				return
			}

			const { user_name, password, status = 1 } = fields;
			
			try {
				if (!user_name) {
					throw new Error('用户名错误')
				} else if (!password) {
					throw new Error('密码错误')
				}
			} catch (err) {
				console.log(err.message, err);
				res.send({
					status: 0,
					type: 'GET_ERROR_PARAM',
					message: err.message,
				})
				return
			}
			try {
				const user = await UserModel.findOne({ user_name })
				if (user) {
					console.log('该用户已经存在');
					res.send({
						status: 0,
						type: 'USER_HAS_EXIST',
						message: '该用户已经存在',
					})
				} else {
					const userTip = status == 1 ? '管理员' : '超级管理员'
					const user_id = await this.getId('user_id');
					const newpassword = this.encryption(password);
					const newUser = {
						user_name,
						password: newpassword,
						id: user_id,
						create_time: dtime().format('YYYY-MM-DD'),
						user: userTip,
						status,
					}
					await UserModel.create(newUser)
					req.session.user_id = user_id;
					res.send({
						status: 1,
						message: '注册管理员成功',
					})
				}
			} catch (err) {
				console.log('注册管理员失败', err);
				res.send({
					status: 0,
					type: 'REGISTER_ADMIN_FAILED',
					message: '注册管理员失败',
				})
			}
		})
	}

	// 加密
	encryption(password) {
		const newpassword = this.Md5(this.Md5(password).substr(2, 7) + this.Md5(password));
		return newpassword
	}

	Md5(password) {
		const md5 = crypto.createHash('md5');
		return md5.update(password).digest('base64');
	}

	// 退出登录
	async singout(req, res, next) {
		try {
			delete req.session.user_id;
			res.send({
				status: 1,
				success: '退出成功'
			})
		} catch (err) {
			console.log('退出失败', err)
			res.send({
				status: 0,
				message: '退出失败'
			})
		}
	}

	// 获得所有管理员
	async getAllUser(req, res, next) {
		const { limit = 20, offset = 0 } = req.query;

		try {
			const allUser = await UserModel.find({}, '-_id -password').sort({ id: -1 }).skip(Number(offset)).limit(Number(limit))
			res.send({
				status: 1,
				data: allUser,
			})
		} catch (err) {
			console.log('获取超级管理列表失败', err);
			res.send({
				status: 0,
				type: 'ERROR_GET_ADMIN_LIST',
				message: '获取超级管理列表失败'
			})
		}
	}

	// 获得管理员个数
	async getUserCount(req, res, next) {
		try {
			const count = await UserModel.count()
			res.send({
				status: 1,
				count,
			})
		} catch (err) {
			console.log('获取管理员数量失败', err);
			res.send({
				status: 0,
				type: 'ERROR_GET_ADMIN_COUNT',
				message: '获取管理员数量失败'
			})
		}
	}

	// 获得管理员信息
	async getUserInfo(req, res, next) {
		const user_id = req.session.user_id;
		if (!user_id || !Number(user_id)) {
			// console.log('获取管理员信息的session失效');
			res.send({
				status: 0,
				type: 'ERROR_SESSION',
				message: '获取管理员信息失败'
			})
			return
		}
		try {
			const info = await UserModel.findOne({ id: user_id }, '-_id -__v -password');
			if (!info) {
				throw new Error('未找到当前管理员')
			} else {
				res.send({
					status: 1,
					data: info
				})
			}
		} catch (err) {
			console.log('获取管理员信息失败');
			res.send({
				status: 0,
				type: 'GET_ADMIN_INFO_FAILED',
				message: '获取管理员信息失败'
			})
		}
	}

	// 更新管理员头像
	async updateAvatar(req, res, next) {
		const user_id = req.params.user_id;
		if (!user_id || !Number(user_id)) {
			console.log('user_id参数错误', user_id)
			res.send({
				status: 0,
				type: 'ERROR_ADMINID',
				message: 'user_id参数错误',
			})
			return
		}

		try {
			const image_path = await this.getPath(req);
			await UserModel.findOneAndUpdate({ id: user_id }, { $set: { avatar: image_path } });
			res.send({
				status: 1,
				image_path,
			})
			return
		} catch (err) {
			console.log('上传图片失败', err);
			res.send({
				status: 0,
				type: 'ERROR_UPLOAD_IMG',
				message: '上传图片失败'
			})
			return
		}
	}
}

export default new User()