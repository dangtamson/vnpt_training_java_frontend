var SsoView = function(){	
	var that = this;
	this.initPage = function(){
		if(window.localStorage.getItem('AUTH') != null){
			console.log('AUTH',window.localStorage.getItem('AUTH'));
			window.location.replace(CONFIG_APP.URL.HOMEPAGE);
			return;
		}

		var Token = Util.Url.getParameterByName('token');
		if(!Token || Token == ''){
			window.location.replace(CONFIG_APP.URL.AUTHEN);
		}else{
			var oAUTH = {
				Token:Util.Url.getParameterByName('token'),
				ExtraData:Util.Url.getParameterByName('extradata'),
				FullName:Util.Url.getParameterByName('fullname'),
				TokenType:Util.Url.getParameterByName('tokentype'),
				UserName:Util.Url.getParameterByName('username'),
			}
			console.log('AUTH',oAUTH);
			localStorage.setItem('AUTH',JSON.stringify(oAUTH));
			window.location.replace(CONFIG_APP.URL.HOMEPAGE);
			return;
		}
	}
	
	$(function() {	
		that.initPage();
	});
}