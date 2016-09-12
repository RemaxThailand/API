exports.action = function(req, res, data) {
	
	try {
		if (data.action == 'Info'){			
			if (typeof req.body.shop != 'undefined' && req.body.shop != '' ) {
				data.json.return = false;
				data.json.returnResult = true;
				data.command = 'EXEC sp_Pos_ShopEmployeeInfo \''+req.body.shop+'\'';
				data.util.query(req, res, data)
			}			
		}
		else if (data.action == 'TypeInfo'){			
			if (typeof req.body.shop != 'undefined' && req.body.shop != '' ) {
				data.json.return = false;
				data.json.returnResult = true;
				data.command = 'EXEC sp_Pos_ShopEmployeeTypeInfo \''+req.body.shop+'\'';
				data.util.query(req, res, data)
			}			
		}
		else if (data.action == 'MappingInfo'){			
			if (typeof req.body.shop != 'undefined' && req.body.shop != '' ) {
				data.json.return = false;
				data.json.returnResult = true;
				data.command = 'EXEC sp_Pos_ShopEmployeeScreenMappingInfo \''+req.body.shop+'\'';
				data.util.query(req, res, data)
			}			
		}
		else if (data.action == 'ScreenInfo'){			
				data.json.return = false;
				data.json.returnResult = true;
				data.command = 'EXEC sp_Pos_SystemScreenInfo';
				data.util.query(req, res, data)		
		}
		else if (data.action == 'PermissionInfo'){			
				data.json.return = false;
				data.json.returnResult = true;
				data.command = 'EXEC sp_Pos_SystemScreenPermissionInfo';
				data.util.query(req, res, data)
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
