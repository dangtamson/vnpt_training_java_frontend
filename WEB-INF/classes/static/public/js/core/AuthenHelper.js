var AuthenHelper = {
	login: function (sUname, sPass, sHospitalId) {
		var data = {
			HOSPITALID: 951,
			USERNAME: sUname,
			PASSWORD: sPass
		};

		try {
			var oResp = ApiHelper.Public.post(CONFIG_API.URL.ACCOUNT_LOGIN, data);
			console.log(oResp);
			if (oResp.errorCode == 0) {
				oResp.result.Username = sUname;
				localStorage.setItem("AUTH", JSON.stringify(oResp.result));
				return true;
			} else {
				return false;
			}
		} catch (error) {
			console.log('ERROR | Account | ', error);
			return false;
		}
	},

	logout: function () {
		localStorage.clear();
		location.replace(CONFIG_APP.URL.LOGINPAGE);
	}
}