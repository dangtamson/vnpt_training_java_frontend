var BacSyController = function(){
	
	var that = this;
	this.oTable = null;
	this.oDialog = null;
	this.oBacSy = new BacSy();
	
	this.initPage = function(){
		that.oBacSy = new BacSy();
		that.bindGrid01();
		that.filterAction('INIT');
		that.bindForm();
	}

	this.bindGrid01 = function(){
		that.oBacSy.search('');
		that.oTable.clear().draw();
        var aRows = [];
		for (var i = 0; i < that.oBacSy.LIST.length; i++) {
			var item = that.oBacSy.LIST[i];
			var _hidden = '<input type="hidden" class="rowID" value="' + item.bacsyid + '" />';
			aRows.push([
				(i + 1) + _hidden,
				item.hoten,
				item.ngaysinh,
				item.chuyenkhoa
            ]);
        }
        that.oTable.rows.add(aRows).draw();
	}

	this.bindForm = function(){
		$('#hoten').val(that.oBacSy.hoten);
		$('#ngaysinh').val(that.oBacSy.ngaysinh);
		$('#chuyenkhoa').val(that.oBacSy.chuyenkhoa);
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

	this.validSave = function(){
		var thongbao = '';
		if (that.oBacSy.hoten.length < 3) {
			thongbao +='<p color="red">Không được để trống tên bác sỹ<p>';
		}

		if (that.oBacSy.ngaysinh.length < 3) {
			thongbao +='<p color="red">Không được để trống ngày sinh<p>';
		}

		return thongbao;
	}

	this.save = function(){
		var oAlert = new AlertDialog('Thông báo');
		that.oBacSy.hoten = $('#hoten').val();
		that.oBacSy.ngaysinh = $('#ngaysinh').val();
		that.oBacSy.chuyenkhoa = $('#chuyenkhoa').val();
		
		var thongbao = that.validSave();
		if (thongbao !='') {
			oAlert.DialogTitle = 'Cảnh báo';
			oAlert.show(thongbao, '30%', '50px');
			return false;
		}

		var rs = that.oBacSy.save();
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
				that.initPage();
            }
            else {
                that.oTable.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
				var id = $(this).find('.rowID').val();
				that.oBacSy.bacsyid = id;
				that.oBacSy.getById();
				that.bindForm();
				that.filterAction('SELECT');
		   }
		   return true;
		 });
		 
		 
		 $('.ACTIONS').on('click', '#btnDelete', function () {
			var oConfirm = new ConfirmDialog('Xác nhận xóa thông tin',ok,cancel);
			var oAlert = new AlertDialog('Thông báo');
			function ok() {
				var rs = that.oBacSy.del();
				oAlert.show(rs.MESSAGE, '40%', '50px');
				that.initPage();
            }

            function cancel() {}

            oConfirm.OkTitle = 'Xóa';
            oConfirm.CancelTitle = 'Giữ lại';
            oConfirm.show('Bạn có chắc chắn muốn xóa bác sỹ này không?');
			return false;
	     });

	});
}