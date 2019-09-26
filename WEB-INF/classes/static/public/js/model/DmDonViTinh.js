var DmDonViTinh = function(){
	var that = this;
	this.LIST = [];
	const URL = {
		GETALL:'vnpt_donvitinh/getall',
	}

	// Properties
	this.donvitinhid = 0;
	this.ma = '';
	this.ten = '';
	this.trangthai = 1;
	this.createddate = null;
	this.updateddate = null;
	this.createdby = null;
	this.updatedby = null;

	this.getAll = function(){
		var rs = DATA.get(URL.GETALL);
		that.LIST = rs.RESULT;
	}

	this.bindSelect = function(sId){
		that.getAll();
		var html = '';
		for (let i = 0; i < that.LIST.length; i++) {
			var item = that.LIST[i];
			html +='<option  value="'+ item.donvitinhid +'">' + item.ten +'</option>';
		}
		$(sId).html(html);
		//$(sId).select2();
	}
}	