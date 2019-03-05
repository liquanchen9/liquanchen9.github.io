// JavaScript Document
function getMainLoaneeGender(){
	var val = 0;
	var obj = document.getElementsByName('radMainLoaneeGender');
	if(obj[0].checked){
		val = 1;
	}else if(obj[1].checked){
		val = 2;
	}
	return val;
}

function getHouseType(){
	var val = 0;
	var obj = document.getElementsByName('radHouseType');
	if(obj[0].checked){
		val = 1;
	}else if(obj[1].checked){
		val = 2;
	}
	return val;
}

function getMostLoanYear(houseType,houseage){
	var val = 0;
	if(houseType == 1){
		val = 30;
	}else{
	var year = 35-houseage;
	if(year <= 15)
		val = 15;
	if(year > 15 && year < 30)
		val = year;
	if(year >= 30)
		val = 30;
	}
	return val;
}

function getMostHousePriceRate(area,taoshutype,houseKind){

	var val = 0;
	if(taoshutype == 1) {
		if(area <= 90) {
			val = 0.8;
		}else {
		    val = 0.7;
		}
	}else if(taoshutype == 2) {
		if(houseKind == 0) {
	    val = 0.5;
	    }else {
	     val = 0.3;
	    }
	}
	return val;
}

function getMainLoaneeMostAge(gender){
	var val = 0;
	if(gender == 1){
		val = 65;
	}else if(gender == 2){
		val = 60;
	}
	return val;
}

function calcLoanYear(age,mostAge,mostLoanYear){
	var val = 0;
	if(mostAge > age){
		val = mostAge - age ;
		if(val > mostLoanYear){
			val = mostLoanYear;
		}
	}
	return val;
}

function getTaoshuType(){

	var myselect = document.getElementById('taoshuid');
	var index=myselect.selectedIndex ;  
   var val =  myselect.options[index].value;
	return val;
}

	function getArea() {
 var val = 0;
 var obj = document.getElementById('txtArea');
	if(isNum(obj.value)){
		val = obj.value;
	}
	return val;
}

//验证是否为数字
function isNum(str){
	if (str.length==0){return false;}
	var Letters = "1234567890.";

	for (i=0;i<str.length;i++){
		var CheckChar = str.charAt(i);
		if (Letters.indexOf(CheckChar) == -1){return false;}
	}
	return true;
}

function calcLoanAmount(){	

  
	
	obj = $("input[name='txtMainLoaneePfcAmount']");
	if( obj.val() == '' || isNaN(obj.val()) ) {
		alert('请输入正确的主贷人公积金余额');obj.focus();return false;
		}
		else if(obj.val() <= 0) {
			alert('主贷人基本公积金余额必须大于0元');obj.focus();return false;
			}
	var mainLoaneePfcAmount = obj.val();
	
	obj = $("input[name='txtMainLoaneeExPfcAmount']");
	if ( !obj.val() == '' ){ 
		if ( isNaN(obj.val()) ) {
			alert('请输入正确的主贷人补充公积金余额');obj.focus();return false;
			}
			else if ( obj.val() < 0 ){
				alert('主贷人补充公积金余额必须大于0元');obj.focus();return false;
				}
		var mainLoaneeExPfcAmount = obj.val();
	}else{
		var mainLoaneeExPfcAmount = 0;
		}
		
	obj = $("input[name='txtMainLoaneePfcMonthPay']");
	if ( obj.val() == '' || isNaN(obj.val()) ) {
		alert('请输入正确的主贷人工资基数');obj.focus();return false;
		}
		else if(obj.val() <= 0 ){
			alert('主贷人公积金月缴存额必须大于0');obj.focus();return false;
			}
	var mainLoaneePfcMonthPay = obj.val();

	//性别
	var mainLoaneeGender = parseInt(getMainLoaneeGender());
	var maxAge;
	if (mainLoaneeGender==1){
			maxAge=65;
		}
		else if (mainLoaneeGender==2){
				maxAge=55;
			} else {
					alert('性别输入异常');
				}

	obj = $("input[name='txtMainLoaneeAge']");
	if ( obj.val() == '' || isNaN(obj.val()) ) {
		alert('请输入正确的主贷人年龄');obj.focus();return false;
		}
		else {
			if ( obj.val() < 18 || obj.val() >= maxAge ){
					alert('主贷人年龄必须为18岁到'+ maxAge +'岁之间');obj.focus();return false;	
		}
	}
	var mainLoaneeAge = obj.val();
	
	obj = $("input[name='txtSecondaryPfcAmount']");
	if ( !obj.val() == '' ) { 
		if ( isNaN(obj.val()) ) {
			alert('请输入正确的参贷人公积金余额');obj.focus();return false;
			}
			else if ( obj.val() <= 0 ){
				alert('参贷人公积金余额必须大于0元');obj.focus();return false;
				}
		var secondaryPfcAmount = obj.val();
	}else {
		var secondaryPfcAmount = 0;
		}
	
	obj = $("input[name='txtSecondaryExPfcAmount']");
	if ( !obj.val() == '' ) { 
		if ( isNaN(obj.val()) ) {
			alert('请输入正确的参贷人补充公积金余额');obj.focus();return false;
			}
			else if ( obj.val() < 0 ) {
				alert('参贷人补充公积金余额必须大于0元');obj.focus();return false;
				}
		var secondaryExPfcAmount = obj.val();
	}else {
		var secondaryExPfcAmount = 0;
		}
	
	
	obj = $("input[name='txtSecondaryPfcMonthPay']");
	if ( !obj.val() == '' ) { 
		if ( isNaN(obj.val()) ) {
			alert('请输入正确的参贷人公积金工资基数');obj.focus();return false;
			}
			else if ( obj.val() <= 0) {
				alert('参贷人公积金月缴交额必须大于0');obj.focus();return false;
				}
		var secondaryPfcMonthPay = obj.val();
	}else{
		var secondaryPfcMonthPay = 0;
		}
	
	obj = $("input[name='txtHousePrice']");
	if ( obj.val() == '' || isNaN(obj.val()) ) {
		alert('请输入正确的房屋价格');obj.focus();return false;
		} 
		else if( obj.val() <= 0 ) {
			alert('房屋价格必须大于0元');obj.focus();return false;
			}
	var housePrice = obj.val() * 10000;
	
		var area = getArea();
    	if(area <=0) {
		alert('请填写房屋面积');document.getElementById('txtArea').focus();return false;
 	}
	
	
	 var myselect = document.getElementById('taoshuid');
	 var index=myselect.selectedIndex;  
   var taoshu = myselect.options[index].value;
	
        if (taoshu == 0) {
           alert('请选择套数认定');
            return false;
        }

    var taoshutype = getTaoshuType();
    
    
    if(taoshutype == 3) {
		  alert('暂停对购买非改善型第二套住房家庭的住房公积金贷款！');
		 document.getElementById('taoshu').focus();return false;
    }
    
    
	 var houseKind = document.getElementById('houseKind').value;

	if(houseKind <0) {
    	alert('请选择房屋类别');document.getElementById('houseKind').focus();return false;
	}

    var loanTimes = document.getElementById('loanTimes').value;

	if(loanTimes < 0) {
		alert('请填写家庭贷款次数');document.getElementById('loanTimes').focus();return false;
 	}else if (loanTimes == 1 && taoshutype == 1) {

     	taoshutype = 2;
 	}else if(loanTimes >= 2) {
		alert('对已经使用过两次公积金贷款的缴存职工家庭，不再向其发放第三次公积金贷款!');document.getElementById('loanTimes').focus();return false;
 	}
    
    
    if(secondaryPfcAmount != 0 || secondaryExPfcAmount != 0) {
		if(secondaryPfcMonthPay == 0) {
			alert('请填写参贷人工资基数');document.getElementById('txtSecondaryPfcMonthPay').focus();return false;
		}
	}
   

  
	var obj;
	var secondaryMonthPay = getSecondaryMonthPay();

	
		
	//房屋类型
	var houseType = parseInt(getHouseType());

	//二手房竣工年份
  var buildDate  = $("select[id='drlBuildDate']").val();

	var myDate = new Date();
	myDate = myDate.getFullYear();

	var houseage = myDate -buildDate;

    var basicLoanLimit;
    var extraLoanLimit;
    var basicTotalLoanLimit;
    var extraTotalLoanLimit;

	if(taoshutype == 1) {
		var basicLoanLimit = 500000;
		var extraLoanLimit = 100000;
		var basicTotalLoanLimit = 1000000;
		var extraTotalLoanLimit = 200000;
	}else {
		var basicLoanLimit = 400000;
		var extraLoanLimit = 100000;
		var basicTotalLoanLimit = 800000;
		var extraTotalLoanLimit = 200000;
	}

	var basicLoanParm = 30;
	var extraLoanParm = 10;
	var mostLoanYear = getMostLoanYear(houseType,houseage);
	var housePriceRate = getMostHousePriceRate(area,taoshutype,houseKind);

	var houseLoanLimit = housePrice * housePriceRate;
	houseLoanLimit = houseLoanLimit.toFixed();


	var loanYear = calcLoanYear(mainLoaneeAge,getMainLoaneeMostAge(mainLoaneeGender),mostLoanYear);
	var mainLoaneeYearPay = mainLoaneePfcMonthPay  * 0.4 * 12;
	var secondaryYearPay = secondaryMonthPay * 0.4 * 12;
	var mainLoaneeTotalPay = mainLoaneeYearPay * loanYear;
	var secondaryTotalPay = secondaryYearPay * loanYear;

	var mainLoaneePfcLoanAmount = Math.round(mainLoaneePfcAmount * basicLoanParm/ 1000) * 1000;
	if(mainLoaneePfcLoanAmount > basicLoanLimit)
		mainLoaneePfcLoanAmount = basicLoanLimit;

	var secondaryPfcLoanAmount = Math.round(secondaryPfcAmount * basicLoanParm / 1000) * 1000;
	if(secondaryPfcLoanAmount > basicLoanLimit)
		secondaryPfcLoanAmount = basicLoanLimit;

	var mainLoaneeExPfcLoanAmount = Math.round(mainLoaneeExPfcAmount * extraLoanParm / 1000) * 1000;
	if(mainLoaneeExPfcLoanAmount > extraLoanLimit)
		 mainLoaneeExPfcLoanAmount = extraLoanLimit;

	var secondaryExPfcLoanAmount = Math.round(secondaryExPfcAmount * extraLoanParm / 1000) * 1000;
	if(secondaryExPfcLoanAmount > extraLoanLimit)
		 secondaryExPfcLoanAmount = extraLoanLimit;

	if(mainLoaneePfcLoanAmount > 0 && mainLoaneePfcLoanAmount > mainLoaneeTotalPay)
		mainLoaneePfcLoanAmount = Math.ceil(mainLoaneeTotalPay / 1000) * 1000;

	if(secondaryPfcLoanAmount > 0 && secondaryPfcLoanAmount > secondaryTotalPay)
		secondaryPfcLoanAmount = Math.ceil(secondaryTotalPay / 1000) * 1000;


	// ------------
	if (secondaryPfcAmount != 0 || secondaryExPfcAmount != 0) {
		var vPfcAmount = parseInt(mainLoaneePfcAmount) + parseInt(secondaryPfcAmount);
		mainLoaneePfcLoanAmount = Math.round(vPfcAmount * basicLoanParm/ 1000) * 1000;
		
		
		var vLoaneeExPfcAmount = parseInt(mainLoaneeExPfcAmount) + parseInt(secondaryExPfcAmount);
		mainLoaneeExPfcLoanAmount = Math.round(vLoaneeExPfcAmount * extraLoanParm / 1000) * 1000;
		if (mainLoaneeExPfcAmount == 0 || secondaryExPfcAmount == 0) {
			if(mainLoaneeExPfcLoanAmount > extraLoanLimit)
		 		mainLoaneeExPfcLoanAmount = extraLoanLimit;
		}
	
		mainLoaneeTotalPay = mainLoaneeTotalPay + secondaryTotalPay;
		if(mainLoaneePfcLoanAmount > 0 && mainLoaneePfcLoanAmount > mainLoaneeTotalPay)
			mainLoaneePfcLoanAmount = Math.ceil(mainLoaneeTotalPay / 1000) * 1000;

	
	}
	var pfcLoanAmount = mainLoaneePfcLoanAmount;
	var exPfcLoanAmount = mainLoaneeExPfcLoanAmount;

	if(pfcLoanAmount > basicTotalLoanLimit)
		pfcLoanAmount = basicTotalLoanLimit;

	if(exPfcLoanAmount > extraTotalLoanLimit)
		exPfcLoanAmount = extraTotalLoanLimit;


	var loanAmount = pfcLoanAmount + exPfcLoanAmount;

    if(loanAmount>houseLoanLimit){
		loanAmount = houseLoanLimit;
		if(loanAmount<pfcLoanAmount){
		    exPfcLoanAmount = 0;
		    pfcLoanAmount = loanAmount;
		}else{
			exPfcLoanAmount = loanAmount - pfcLoanAmount;
		}
	}

	var tmpLoanYear = loanYear;
	if(mainLoaneeYearPay  > 0)
		tmpLoanYear = Math.ceil(pfcLoanAmount / (mainLoaneeYearPay + secondaryYearPay));

	var minLoanYear = loanYear;
	var maxLoanYear = loanYear;
	if(tmpLoanYear < loanYear){
		minLoanYear = tmpLoanYear;
	}

	document.getElementById('txtPfcLoanAmount').value = pfcLoanAmount;
	document.getElementById('txtExPfcLoanAmount').value = exPfcLoanAmount;
	document.getElementById('txtLoanAmount').value = loanAmount;
	document.getElementById('txtLoanYears').value = minLoanYear + '-' + maxLoanYear;

	//setSMSHouseType(houseType);
	//document.getElementById('txtSmsHousePrice').value = housePrice / 10000;
	$('.step1').hide();
	$('.result').show();
			
		
//     alert('-------pfcLoanAmount='+pfcLoanAmount+'---------exPfcLoanAmount='+exPfcLoanAmount+'------loanAmount'+loanAmount+'----'+minLoanYear+ '-' + maxLoanYear+'--')
//	document.getElementById('txtPfcLoanAmount').value = pfcLoanAmount;
//	document.getElementById('txtExPfcLoanAmount').value = exPfcLoanAmount;
//	document.getElementById('txtLoanAmount').value = loanAmount;
//	document.getElementById('txtLoanYears').value = minLoanYear + '-' + maxLoanYear;
	document.getElementById('txtPfcLoanAmount').innerHTML = pfcLoanAmount;
	document.getElementById('txtExPfcLoanAmount').innerHTML = exPfcLoanAmount;
	document.getElementById('txtLoanAmount').innerHTML = loanAmount;
	document.getElementById('txtLoanYears').innerHTML = minLoanYear + '-' + maxLoanYear;



}
/**
function setSMSHouseType(houseType){
	var obj = document.getElementsByName('txtSmsHouseType');

	if(houseType == 1){
		//obj[0].checked = true;
		 document.getElementsById('txtSmsHouseType1').checked = true;
	}else if(houseType == 2){
		//obj[1].checked = true;
		 document.getElementsById('txtSmsHouseType2').checked = true;
	}
}
*/
function getSecondaryMonthPay(){
	var val = 0;
	var obj = document.getElementById('txtSecondaryPfcMonthPay');
	if(isNum(obj.value)){
		val = obj.value;
	}
	return val;
}


$(function() {
	if (/Android|Windows Phone|webOS|iPhone|iPod|BlackBerry|iPad|Opera/i.test(navigator.userAgent)) {
		$('*').css('cursor','pointer');
	};
	
	$(document).on('click', '.back', function() {
		$('.step1').show();
	  $('.result').hide();
	});
	})
