const CONFIG_APP = {
	APPCODE:'vnad_vnpt',
	URL:{
		CONTEXT : '/vnpt'
		,HOME:'/app/common/dashboard'
		,LOGIN:'/vnpt/app/common/login'
		,LOGOUT:''
		,CHECK_TOKEN:'ht_token/check'
	},
	API:{
		AUTHEN:'http://localhost:8088/data/api/v1/public/auth/signin'
		,DATA:'http://localhost:8088/data/api/v1.0/data'
	}
}