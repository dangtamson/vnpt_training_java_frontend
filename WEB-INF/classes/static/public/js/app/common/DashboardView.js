var DashboardView = function(){
    var oProfile =  new Profile();
    var that = this;
     


	this.initPage = function(){
		
        that.clearForm();
        that.bindProfile();
	}

    this.clearForm = function(){}
    
    this.bindProfile = function(){

        // Check in Cache
        

        oProfile.getDetails();
        //console.log('oProfile',oProfile);
        var gioitinh='Khác';
        if(!oProfile.gioitinhid=='1'){
            gioitinh = 'Nam';
        }else{
            gioitinh = 'Nữ';
        }
        $('#stt').val(oProfile.stt);
        $('#tenbenhnhan').val(oProfile.tenbenhnhan);
        $('#ngaysinh').val(oProfile.ngaysinh);
        $('#gioitinh').val(oProfile.gioitinh);
        $('#diachi').val(oProfile.diachi);
        $('#sdtlienhe').val(oProfile.sdtlienhe);
        $('#nghenghiepid').val(oProfile.nghenghiepid);
        $('#tuoi').val(oProfile.tuoi);
        $('#quoctich').val(oProfile.quoctich);
        $('#noilamviec').val(oProfile.noilamviec);
        $('#sdtbenhnhan').val(oProfile.sdtbenhnhan);
        $('#hotennguoinha').val(oProfile.hotennguoinha);
        $('#sdt_nguoithan').val(oProfile.sdt_nguoithan);
        $('#gioitinhid').val(gioitinh);
        $('#mabenhnhan').val(oProfile.mabenhnhan);
        $('#dantocid').val(oProfile.dantocid);
        $('#benhnhanid').val(oProfile.benhnhanid);
    }

	$(function() {
		
		that.initPage();
		

	});
}