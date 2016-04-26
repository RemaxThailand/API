exports.action = function(req, res, data) {
	try{
		if (data.action == 'salesSummary'){
			if (typeof req.body.shop != 'undefined' && req.body.shop != '' &&
			typeof req.body.date_from != 'undefined' && req.body.date_from != '' &&
			typeof req.body.date_to != 'undefined' && req.body.date_to != '' ) {
				data.json.return = false;
				data.json.returnResult = true;
				data.command = 'EXEC sp_rpt_Sales_Summary \''+req.body.shop+'\', \''+req.body.date_from+'\', \''+req.body.date_to+'\'';
				data.util.query(req, res, data);
			}
		} else if (data.action == 'name'){
			data.json.return = false;
			data.json.returnResult = true;
			data.command = 'EXEC sp_ShopName';
			data.util.query(req, res, data);
		} else if (data.action == 'accumulated'){
			if (typeof req.body.shop != 'undefined' && req.body.shop != ''){ 
				data.json.return = false;
				data.json.returnResult = true;
				data.command = 'EXEC sp_rpt_Shop_Accumulated \''+req.body.shop+'\'';
				data.util.query(req, res, data);
			}
		} else if (data.action == 'receivable'){
			if (typeof req.body.shop != 'undefined' && req.body.shop != ''){ 
				data.json.return = false;
				data.json.returnResult = true;
				data.command = 'EXEC sp_rpt_Shop_Receivable \''+req.body.shop+'\'';
				data.util.queryMultiple(req, res, data);
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

