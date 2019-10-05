var BacSy = function(){
	var that = this;
	this.LIST = [];
	const URL = {
		SEARCH:'kv2_bdh_bacsi/search',
		GETBYID:'kv2_bdh_bacsi/getbyid',
		SAVE:'kv2_bdh_bacsi/save',
		DEL:'kv2_bdh_bacsi/del',
	}

	// Properties
	this.bacsyid = 0;
	this.hoten = '';
	this.ngaysinh = '';
	this.chuyenkhoa = '';

	this.search = function(sKey){
		var thamso = {key: sKey};
		var rs = DATA.get(URL.SEARCH,thamso);
		that.LIST = rs.RESULT;
	}

	this.getById = function(){
		var thamso = {bacsyid: that.bacsyid};
		var rs = DATA.get(URL.GETBYID,thamso);
		var item = rs.RESULT[0];
		this.hoten=item.hoten;
		this.ngaysinh=item.ngaysinh;
		this.chuyenkhoa=item.chuyenkhoa;
	}

	this.save = function(){
		var data= {
			bacsyid: that.bacsyid,
			hoten:that.hoten,
			ngaysinh:that.ngaysinh,
			chuyenkhoa:that.chuyenkhoa
		}
		return  DATA.set(URL.SAVE,data);
	}

	this.del = function(){
		var data= {
			bacsyid: that.bacsyid
		}
		return  DATA.set(URL.DEL,data);
	}

}	