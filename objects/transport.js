exports.action = function(req, res, data) {
	try{
		if (data.action == 'info'){
			data.json.return = false;
			data.json.returnResult = true;
			data.command = 'EXEC sp_TransportOrderWaiting ';
			data.util.query(req, res, data);
		}
		else if (data.action == 'add'){ 
			if (typeof req.body.memberKey != 'undefined' && req.body.memberKey != '' &&
				typeof req.body.orderNo != 'undefined' && req.body.orderNo != '') {
					data.json.return = false;
					data.json.returnResult = true;
					data.command = 'EXEC sp_TransportOrderAdd \''+req.body.memberKey+'\',\''+req.body.orderNo+'\'';
					data.util.execute(req, res, data); 
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

