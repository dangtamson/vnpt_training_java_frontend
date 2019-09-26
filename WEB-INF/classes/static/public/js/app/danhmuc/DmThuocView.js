var DmThuocView = function(){
	
	var that = this;
	this.AppTitle = 'Danh mụ thuốc';
	this.oTable = null;
	this.oDialog = null;
	this.oDmDonViTinh = new DmDonViTinh();
	this.oDmThuoc = new DmThuoc();
	
	this.initPage = function(){
		that.oDmThuoc = new DmThuoc();
		$('#AppTitle').html(that.AppTitle);
		that.oDmDonViTinh.bindSelect('#donvitinhid');
		that.bindGrid01();
		that.filterAction('INIT');
		that.bindForm();
	}

	this.bindGrid01 = function(){
		that.oDmThuoc.getAll();
		that.oTable.clear().draw();
        var aRows = [];
		for (var i = 0; i < that.oDmThuoc.LIST.length; i++) {
			var item = that.oDmThuoc.LIST[i];
			var _hidden = '<input type="hidden" class="rowID" value="' + item.thuocid + '" />';
			var trangthai = item.trangthai == 1?'<span class="label label-success">Hoạt động</span>':'<span class="label label-danger">Khóa</span>';
			aRows.push([
				(i + 1) + _hidden,
				item.ma,
				item.ten,
				item.ghichu,
				trangthai
            ]);
        }
        that.oTable.rows.add(aRows).draw();
	}

	this.bindForm = function(){
		$('#ma').val(that.oDmThuoc.ma);
		$('#ten').val(that.oDmThuoc.ten);
		$('#ghichu').val(that.oDmThuoc.ghichu);
		$('#donvitinhid').val(that.oDmThuoc.donvitinhid);
		$('#trangthai').val(that.oDmThuoc.trangthai);
	}

	this.clearForm = function(){
		that.oDmDonViTinh.donvitinhid = 0;
		$('#ma').val('');
		$('#ten').val('');
		$('#ghichu').val('');
		$('#trangthai').val(1);
	}

	this.filterAction = function(sState){
		switch (sState) {
			case 'INIT':
				ControlHelper.Input.enable(['#btnSave']);
				ControlHelper.Input.disable(['#btnDelete','#btnCancel']);
				break;
			case 'SELECT':
				ControlHelper.Input.enable(['#btnSave']);
				ControlHelper.Input.enable(['#btnDelete','#btnCancel']);
				break;
			default:
				break;
		}
	}

	this.save = function(){
		var oAlert = new AlertDialog('Thông báo');
		that.oDmThuoc.ma = $('#ma').val();
		that.oDmThuoc.ten = $('#ten').val();
		that.oDmThuoc.ghichu = $('#ghichu').val();
		that.oDmThuoc.donvitinhid = $('#donvitinhid').val();
		that.oDmThuoc.trangthai = $('#trangthai').val();

		var rs = that.oDmThuoc.save();
		if (rs.CODE == 0) {
			oAlert.DialogTitle = 'Thông báo';
			that.initPage();
		} else {
			oAlert.DialogTitle = 'Cảnh báo';
		}

		oAlert.show(rs.MESSAGE, '30%', '50px');
	}


	$(document).ready(function () {
		that.oTable = ControlHelper.Datatable.Init('Grid01', 10, true);
		that.oDialog = new PopupDialog(reload);
		that.initPage();

		function reload() {
			that.initPage();
		}


		$('.ACTIONS').on('click', '#btnAddNew', function () {
			that.initPage();
		});

		$('.ACTIONS').on('click', '#btnCancel', function () {
			that.initPage();
		});

		$('.ACTIONS').on('click', '#btnSave', function () {
			that.save();
		});

		
		 $('#Grid01 tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
				$(this).removeClass('selected');
				that.clearForm();
				that.initPage();
            }
            else {
                that.oTable.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
				var id = $(this).find('.rowID').val();
				that.oDmThuoc.thuocid = id;
				that.oDmThuoc.getById();
				that.bindForm();
				that.filterAction('SELECT');
		   }
		   return true;
		 });
		 
		 
		 $('.ACTIONS').on('click', '#btnDelete', function () {
			var oConfirm = new ConfirmDialog('Xác nhận xóa thông tin',ok,cancel);
			var oAlert = new AlertDialog('Thông báo');
			if (that.oDmThuoc.thuocid == 0) {
				oAlert.show('Bạn chưa chọn mục cần xóa', '40%', '50px');
				return false;
			}

			function ok() {
				var rs = that.oDmThuoc.del();
				oAlert.show(rs.MESSAGE, '40%', '50px');
				that.initPage();
            }

            function cancel() {}

            oConfirm.OkTitle = 'Xóa';
            oConfirm.CancelTitle = 'Giữ lại';
            oConfirm.show('Bạn có chắc chắn muốn xóa mục này không?');
			return false;
	     });

	});
}