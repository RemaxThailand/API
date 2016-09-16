exports.action = function(req, res, data) {

    try {
        if (data.action == 'receivable') {
            if (data.subAction[0] == 'info') {
                if (typeof req.body.shop != 'undefined' && req.body.shop != '') {
                    data.json.return = false;
                    data.json.returnResult = true;
                    data.command = 'EXEC sp_ReceivableInfo \'' + req.body.shop + '\'';
                    data.util.query(req, res, data);
                }
            } else if (data.subAction[0] == 'paid') {
                if (typeof req.body.shop != 'undefined' && req.body.shop != '' &&
                    typeof req.body.month != 'undefined' && req.body.month != '') {
                    data.json.return = false;
                    data.json.returnResult = true;
                    data.command = 'EXEC sp_ReceivablePaid \'' + req.body.shop + '\',\'' + req.body.month + '\'';
                    data.util.query(req, res, data);
                }
            } else if (data.subAction[0] == 'pay') {
                if (typeof req.body.shop != 'undefined' && req.body.shop != '' &&
                    typeof req.body.memberKey != 'undefined' && req.body.memberKey != '' &&
                    typeof req.body.sellNo != 'undefined' && req.body.sellNo != '' &&
                    typeof req.body.money != 'undefined' && req.body.money != '') {
                    data.json.return = false;
                    data.json.returnResult = true;
                    data.command = 'EXEC sp_ReceivablePay \'' + req.body.shop + '\', \'' + req.body.memberKey + '\', \'' + req.body.sellNo + '\', \'' + req.body.money + '\', \'' + req.body.remark + '\'';
                    data.util.execute(req, res, data);
                }
            }

        } else {
            data.json.error = 'API0011';
            data.json.errorMessage = 'Action ' + data.action.toUpperCase() + ' is not implemented';
        }

        data.util.responseJson(req, res, data.json);

    } catch (error) {
        data.util.responseError(req, res, error);
    }
};
