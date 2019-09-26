var DmThuoc = function(){
	var that = this;
	this.LIST = [];
	const URL = {
		GETALL:'vnpt_thuoc/getall',
		GETBYID:'vnpt_thuoc/getbyid',
		SAVE:'vnpt_thuoc/save',
		DEL:'vnpt_thuoc/del',
	}

	// Properties
	this.thuocid = 0;
	this.ma = '';
	this.ten = '';
	this.ghichu = '';
	this.donvitinhid = '';
	this.trangthai = 1;
	this.createddate = null;
	this.updateddate = null;
	this.createdby = null;
	this.updatedby = null;

	// Ext
	this.thuoc_ten ='';

	this.getAll = function(){
		var rs = DATA.get(URL.GETALL);
		that.LIST = rs.RESULT;
	}

	this.getById = function(){
		var rs = DATA.get(URL.GETBYID,{thuocid:that.thuocid});
		var item = rs.RESULT[0];
		this.ten=item.ten;
		this.ma=item.ma;
		this.ghichu=item.ghichu;
		this.donvitinhid=item.donvitinhid;
		this.trangthai=item.trangthai;
	}

	this.save = function(){
		var data= {
			thuocid: that.thuocid,
			ma:that.ma,
			ten:that.ten,
			ghichu:that.ghichu,
			donvitinhid:that.donvitinhid,
			trangthai:that.trangthai
		}
		console.log(data);
		return  DATA.set(URL.SAVE,data);
	}

	this.del = function(){
		var data= {
			thuocid: that.thuocid
		}
		console.log(data);
		return  DATA.set(URL.DEL,data);
	}

}	