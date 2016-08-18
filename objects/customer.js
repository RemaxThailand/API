exports.action = function(req, res, data) {

	try {
		if (data.action == 'Info'){
			if (typeof req.body.shop != 'undefined' && req.body.shop != '' ) {
				data.json.return = false;
				data.json.returnResult = true;
				data.command = 'EXEC sp_Pos_ShopCustomerInfo \''+req.body.shop+'\'';
				data.util.query(req, res, data)
			}
		}
		else if (data.action == 'Search'){
			if (typeof req.body.search != 'undefined' && req.body.search != '' ) {
				data.json.return = false;
				data.json.returnResult = true;
				data.command = 'EXEC sp_Pos_ShopCustomerSearch \''+req.body.search+'\'';
				data.util.query(req, res, data)
			}
		}
		else if (data.action == 'Add'){
			if (typeof req.body.shop != 'undefined' && req.body.shop != '' &&
				typeof req.body.customer != 'undefined' && req.body.customer != '' &&
				typeof req.body.mobile != 'undefined' && req.body.mobile != '' &&
				typeof req.body.firstname != 'undefined' && req.body.firstname != '' &&
				typeof req.body.lastname != 'undefined' && req.body.lastname != '' ) {
				data.json.return = false;
				data.json.returnResult = true;
				data.command = 'EXEC sp_Pos_ShopCustomerInsert \''+req.body.shop+'\', \''+req.body.customer+'\', \''+req.body.mobile+'\', \''+req.body.firstname+'\', \''+req.body.lastname+'\', \''+req.body.nickname+'\', \''+req.body.sex+'\', \''+req.body.birthday+'\', \''+req.body.citizen+'\', \''+req.body.cardno+'\', \''+req.body.email+'\', \''+req.body.address+'\', \''+req.body.address2+'\', \''+req.body.subdistrict+'\', \''+req.body.district+'\', \''+req.body.province+'\', \''+req.body.zipcode+'\', \''+req.body.shopname+'\', \''+req.body.same+'\',\''+req.body.shopaddress+'\', \''+req.body.shopaddress2+'\',\''+req.body.shopsubdistrict+'\', \''+req.body.shopdistrict+'\',\''+req.body.shopprovince+'\', \''+req.body.shopzipcode+'\',\''+req.body.credit+'\', \''+req.body.sellprice+'\'';
				data.util.execute(req, res, data)
			}
		}
		else if (data.action == 'creditInfo'){
			if (typeof req.body.shop != 'undefined' && req.body.shop != '' ) {
				data.json.return = false;
				data.json.returnResult = true;
				data.command = 'EXEC sp_Pos_CreditCustomerInfo \''+req.body.shop+'\'';
				data.util.query(req, res, data)
			}
		}
		else if (data.action == 'creditAdd'){
			if (typeof req.body.shop != 'undefined' && req.body.shop != '' &&
				typeof req.body.creditno != 'undefined' && req.body.creditno != '' &&
				typeof req.body.saleno != 'undefined' && req.body.saleno != '') {
				data.json.return = false;
				data.json.returnResult = true;
				data.command = 'EXEC sp_Pos_CreditCustomerInsert \''+req.body.shop+'\', \''+req.body.creditno+'\', \''+req.body.saleno+'\', \''+req.body.paidprice+'\', \''+req.body.paidby+'\', \''+req.body.paiddate+'\'';
				data.util.execute(req, res, data)
			}
		}
		else {
			data.json.error = 'API0011';
			data.json.errorMessage = 'Action ' + data.action.toUpperCase() + ' is not implemented';
		}

		data.util.responseJson(req, res, data.json);

	}catch(error){
		data.util.responseError(req, res, error);
	}

};
