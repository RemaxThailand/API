exports.action = function(req, res, data) {
	try{
		if (data.action == 'salesSummary'){
			data.json.return = false;
			data.json.returnResult = true;
			data.command = 'EXEC sp_rpt_Sales_Summary \''+req.body.shop+'\', \''+req.body.date_from+'\', \''+req.body.date_to+'\'';
			data.util.query(req, res, data);
		} else {
			data.json.error = 'API0011';
			data.json.errorMessage = 'Action ' + data.action.toUpperCase() + ' is not implemented';
		}
		data.util.responseJson(req, res, data.json);
	}
	catch(error) {
		data.util.responseError(req, res, error);
	}
};
