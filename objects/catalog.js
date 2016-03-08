exports.action = function(req, res, data) {
	
	try {
		if (data.action == 'info'){
			if (typeof req.body.shop != 'undefined' && req.body.shop != '') {
				data.json.return = false;
				data.json.returnResult = true;
				data.command = 'EXEC sp_ShopCategory \''+req.body.shop+'\'';
				data.util.query(req, res, data); 
			}
		}
		else if (data.action == 'add'){
			if (typeof req.body.memberKey != 'undefined' && req.body.memberKey != '' &&
				typeof req.body.product != 'undefined' && req.body.product != '' &&
				typeof req.body.sellPrice != 'undefined' && req.body.sellPrice != '') {
				data.json.return = false;
				data.json.returnResult = true;
				data.command = 'EXEC sp_CatalogAdd \''+req.body.memberKey+'\', , \''+req.body.product+'\', \''+req.body.sellPrice+'\'';
				data.util.query(req, res, data); 
			}
		}

		else {
			data.json.error = 'API0011';
			data.json.errorMessage = 'Action ' + data.action.toUpperCase() + ' is not implemented';
		}

		data.util.responseJson(req, res, data.json);

	}
	catch(error) {
		data.util.responseError(req, res, error);
	}
};