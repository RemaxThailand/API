exports.shop = function(req, res, firstname, lastname) {
	firstname = decodeURI(firstname);
	lastname = decodeURI(lastname);
	try {

		var request = require('request');

		request.post({headers: { 'referer': 'https://api.remaxthailand.co.th' }, url: 'https://api.remaxthailand.co.th/register/shop/info',
			form: {
				apiKey: 'AA69632B-D906-4304-84C6-A039F5985D31',
				firstname: firstname,
				lastname: lastname,
				mobile: ''
			}
		},
		function (error, response, body) {
			console.log(JSON.parse(body));
			/*if (!error) {				
				var json = JSON.parse(body);
				json = json.result[0];


				var PDFDocument = require('pdfkit');
				var moment = require('moment');
				var doc = new PDFDocument({margin: 10, size: 'A4'});

				var x = 10;
				var y = 10;

				doc.font('./fonts/THSarabun.ttf', 32);
				//doc.y = y; doc.x = x; doc.text('ชื่อผู้สมัคร', {width: 130, align: 'right'} );
				doc.font('./fonts/THSarabunBold.ttf', 32);
				doc.y = y; doc.x = x+140; doc.text( 'คุณ' + json.Firstname + '  ' + json.Lastname + ' (' + json.Nickname + ')' );
				y += 32;

				doc.font('./fonts/THSarabun.ttf', 18);
				doc.y = y; doc.x = x; doc.text('เบอร์โทรศัพท์', {width: 130, align: 'right'});
				doc.font('./fonts/THSarabunBold.ttf', 18);
				doc.y = y; doc.x = x+140; doc.text( json.Phone.substr(0,3)+'-'+json.Phone.substr(3,4)+'-'+json.Phone.substr(7) );
				y += 18;

				doc.font('./fonts/THSarabun.ttf', 18);
				doc.y = y; doc.x = x; doc.text('เวลาที่สะดวกในการติดต่อ', {width: 130, align: 'right'});
				doc.font('./fonts/THSarabunBold.ttf', 18);
				doc.y = y; doc.x = x+140; doc.text( json.TimeToContact );
				y += 18;

				doc.font('./fonts/THSarabun.ttf', 18);
				doc.y = y; doc.x = x; doc.text('สนใจเป็นตัวแทนในจังหวัด', {width: 130, align: 'right'});
				doc.font('./fonts/THSarabunBold.ttf', 18);
				doc.y = y; doc.x = x+140; doc.text( json.Province );
				y += 18;

				doc.font('./fonts/THSarabun.ttf', 18);
				doc.y = y; doc.x = x; doc.text('ที่อยู่', {width: 130, align: 'right'});
				doc.font('./fonts/THSarabunBold.ttf', 18);
				doc.y = y; doc.x = x+140; doc.text( json.Address );
				y += 38;

				doc.font('./fonts/THSarabunBold.ttf', 16);
				doc.y = y; doc.x = x; doc.text('แนะนำประวัติ หรือกิจการ หรือรูปแบบการจำหน่าย');
				doc.font('./fonts/THSarabun.ttf', 14);
				doc.text( '     ' + json.Profile );
				doc.moveDown();

				doc.font('./fonts/THSarabunBold.ttf', 16);
				doc.text('สาเหตุที่สนใจเป็นตัวแทนจำหน่าย');
				doc.font('./fonts/THSarabun.ttf', 14);
				doc.text( '     ' + json.Reason );
				doc.moveDown();

				doc.font('./fonts/THSarabunBold.ttf', 16);
				doc.text('ความคาดหวังเมื่อเป็นตัวแทนจำหน่าย');
				doc.font('./fonts/THSarabun.ttf', 14);
				doc.text( '     ' + json.Expect );
				doc.moveDown();

				doc.font('./fonts/THSarabunBold.ttf', 16);
				doc.text('ความคิดเห็น เกี่ยวกับการแข่งขันเพื่อความอยู่รอดในธุรกิจ');
				doc.font('./fonts/THSarabun.ttf', 14);
				doc.text( '     ' + json.Comment );
				doc.moveDown();

				doc.pipe(res); doc.end();
			} else{
				data.err = error;
				res.json(data);
			}*/
		});

	}
	catch(err) {
		data.err = err;
		res.json(data);
	}
}