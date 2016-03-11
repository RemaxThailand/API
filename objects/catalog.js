exports.action = function(req, res, data) {
	
	try {
		if (data.action == 'info'){
			if (typeof req.body.shop != 'undefined' && req.body.shop != '') {
				data.json.return = false;
				data.json.returnResult = true;
				data.command = 'EXEC sp_CatalogInfo \''+req.body.shop+'\, \''+req.body.memberKey+'\', \''+req.body.customerName+'\'';
				data.util.query(req, res, data); 
			}
		}
		else if (data.action == 'add'){
			if (typeof req.body.memberKey != 'undefined' && req.body.memberKey != '' &&
				typeof req.body.product != 'undefined' && req.body.product != '' &&
				typeof req.body.sellPrice != 'undefined' && req.body.sellPrice != '') {
				data.json.return = false;
				data.json.returnResult = true;
				data.command = 'EXEC sp_CatalogAdd \''+req.body.memberKey+'\', \''+req.body.product+'\', \''+req.body.sellPrice+'\'';
				data.util.query(req, res, data); 
			}
		}
		else if (data.action == 'summary'){
			if (typeof req.body.memberKey != 'undefined' && req.body.memberKey != '') {
				data.json.return = false;
				data.json.returnResult = true;
				data.command = 'EXEC sp_CatalogSummary \''+req.body.memberKey+'\'';
				data.util.query(req, res, data); 
			}
		}
		else if (data.action == 'detail'){
			if (typeof req.body.memberKey != 'undefined' && req.body.memberKey != '') {
				data.json.return = false;
				data.json.returnResult = true;
				data.command = 'EXEC sp_CatalogDetail \''+req.body.memberKey+'\'';
				data.util.query(req, res, data); 
			}
		}
		else if (data.action == 'confirm'){
			if (typeof req.body.memberKey != 'undefined' && req.body.memberKey != '' &&
				typeof req.body.customer != 'undefined' && req.body.customer != '') {
				data.json.return = false;
				data.json.returnResult = true;
				data.command = 'EXEC sp_CatalogConfirm \''+req.body.memberKey+'\', \''+req.body.customer+'\'';
				data.util.query(req, res, data); 
			}
		}
		else if (data.action == 'deleteList'){
			if (typeof req.body.memberKey != 'undefined' && req.body.memberKey != '' &&
				typeof req.body.product != 'undefined' && req.body.product != '') {
				data.json.return = false;
				data.json.returnResult = true;
				data.command = 'EXEC sp_CatalogDeleteList\''+req.body.memberKey+'\', \''+req.body.product+'\'';
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