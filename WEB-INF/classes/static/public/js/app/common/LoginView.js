var LoginView = function(){
	
	var that = this;

	this.initPage = function(){
		const token = localStorage.getItem('AUTH');
		if (token) {
			if (AUTH.checkToken()) {
				location.replace(CONFIG_APP.URL.CONTEXT + CONFIG_APP.URL.HOME);
				return true;
			}else{
				localStorage.clear();
			}
			
		}
	}

	this.validLogin = function(uname, pass){
		var alert = '';
		if (!uname || uname.length < 3 || !pass || pass.length<6) {
			alert = 'Thông tin đăng nhập không hợp lệ, vui lòng kiểm tra lại';
		}
		return alert;
	}

	this.login =function(sUname, sPass){
		var sUname = $('#username').val();
		var sPass = $('#password').val();
		var alert = that.validLogin(sUname, sPass);
		if (alert!='') {
			$('.GlobalNotice').html(alert);
			$('#username').focus();
			return false;
		}
		var rs = AUTH.login(sUname,sPass);
		if (rs.CODE == 0) {
			localStorage.setItem("AUTH", JSON.stringify(rs.RESULT));
			location.replace(CONFIG_APP.URL.CONTEXT + CONFIG_APP.URL.HOME);
			return true;
		} else {
			$('#username').val('');
			$('#password').val('');
			$('#username').focus();
			$('.GlobalNotice').html(rs.MESSAGE);
			return false;
		}
		
	}

	
	$(function() {	

		that.initPage();

		$('.ACTIONS').on('click','#btnLogin',function(){
			that.login();
		});

		$(document).on('keypress',function(e) {
			if(e.which == 13) {
				that.login();
			}
		});
	});
}