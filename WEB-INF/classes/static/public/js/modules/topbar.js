var TopBar = function() {

	var that = this;
	
	this.init = function() {
		var oAUTH =JSON.parse( window.localStorage.getItem('AUTH'));
		//console.log('INFO | TopBar | oAUTH',oAUTH);
		if (oAUTH) {
			$('.UserName').html(oAUTH.UserName);
			$('.FullName').html(oAUTH.FullName);
		}else{
			location.replace(CONFIG_APP.URL.LOGIN);
		}

	}

	this.getClock = function() {
		var date = new Date();
		function addZero(x) {
			if (x < 10) {
				return x = '0' + x;
			} else {
				return x;
			}
		}

		function twelveHour(x) {
			if (x > 12) {
				return x = x - 12;
			} else if (x == 0) {
				return x = 12;
			} else {
				return x;
			}
		}

		var h = addZero(twelveHour(date.getHours()));
		var m = addZero(date.getMinutes());
		var s = addZero(date.getSeconds());
		return h + ':' + m + ':' + s;
	}
	
	
	this.updateClock = function(){
		$('#DongHo').text(that.getClock());
	}

	this.clearChangePassForm = function(){
		$('#oldPassword').val('');
		$('#newPassword').val('');
		$('#newPassword1').val('');
		$('#oldPassword').focus();
	}

	this.validChangePass = function(){
		var sInvalid = '';
		var oldPassword = $('#oldPassword').val();
		var newPassword = $('#newPassword').val();
		var newPassword1 = $('#newPassword1').val();

		if (oldPassword.length < 5 || newPassword.length < 5) {
			sInvalid +='<p style="color:red;font-weight:bold"> (*) Mật khẩu không hợp lệ (Số ký tự phải lớn hơn 6 ký tự)</p>';
        }
        
        if (newPassword !== newPassword1) {
			sInvalid +='<p style="color:red;font-weight:bold"> (*) Xác nhận mật khẩu mới không khớp</p>';
        }

		return sInvalid;

    }


	
	$(function(){
		
		that.init();
		
		setInterval(that.updateClock, 1000);
		
		$(".menus .item").click(function () {
            $(this).toggleClass("active").siblings().removeClass('active');

        });
		
        $(".header .nav-icon").click(function () {
            $("body").toggleClass("minimize-menu");

        });
        
        $(".menus li").each(function(){
            if($(this).hasClass("active")){
                $(this).parent().parent().addClass("active");
            }
        });
        
        $(".overlay-common").click(function () {
            $("body").removeClass("minimize-menu");
        }); 
        
        $('#btnSignOut').click(function(){
			AUTH.logout();
		});
		
		$('#btnChangePass').click(function(){
			var oldPassword = $('#oldPassword').val();
			var newPassword = $('#newPassword').val();
			var valid = that.validChangePass();
			if (valid !='' ) {
				var oAlert = new AlertDialog('Cảnh báo');
				oAlert.show(valid,'60%', '50px');
				that.clearChangePassForm();
				return;
			}

			try {
				var data = {
					oldPassword:oldPassword,
					newPassword:newPassword
				}
				var rs = ApiHelper.Private.post(CONFIG_API.URL.ACCOUNT_CHANGEPASS,data);
				if (rs.errorCode == 'REQUEST_SUCCESS') {
					var oAlert = new AlertDialog('Thông báo');
					oAlert.show('Đổi mật khẩu thành công!','50%', '50px');
					that.clearChangePassForm();
					AuthenHelper.logout();
					return;
				}else{
					var oAlert = new AlertDialog('Thông báo');
					oAlert.show('Đổi mật khẩu thất bại, Lỗi:' + rs.errorMessage,'50%', '50px');
					that.clearChangePassForm();
					return;
				}
				
			} catch (error) {
				console.log('ERROR', error);
				return;
			}
		});
	})
	
}