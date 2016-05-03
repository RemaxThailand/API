var sql = require('mssql');
var config = require('../config.js');

exports.action = function(req, res, report, branch) {
	
	try {

		if (report == 'aging' || report == 'run_rate') {
		
			var connection = new sql.Connection(config.mssql, function (err) {
				var request = new sql.Request(connection);
				//var branch = 1;
				//var report = 'aging';
				
				var PDFDocument = require('pdfkit');
				var moment = require('moment');
				var doc = new PDFDocument({margin: 10, size: 'A4'});
				
				var d = new Date();
				var m = moment(d);
				m.lang('th');
				m.utcOffset(0);
				//m.add(3600*7, 'seconds'); // GMT +7

				doc.moveTo(0, 0)
					.font('./fonts/ANGSAU.TTF', 16)
					.text(m.format('DD MMMM')+' '+(parseInt(m.format('YYYY'))+543)+' '+m.format('HH:mm'), { align: 'right' })

				//### STOCK AGING REPORT ###//
				if (report == 'aging') {
					request.query('EXEC sp_ReportAging \''+branch+'\'', function (err, recordset, returnValue) {
						if (!err){

							doc.font('./fonts/CALIBRIB.TTF', 18)
								.text('Stock Aging Report : Branch '+'Test', 10, 10)


							doc.lineWidth(0.75)
								.moveTo(10, 30)
								.lineTo(585, 30)
								.stroke()

							var posX = [10, 315, 345, 375, 410, 445, 480, 515, 550, 585];
							var groupName = 'xxx';
							var y = 20;
							var startY = y;
							var index = 1;
							var sum90 = sum60 = sum30 = sum15 = sum0 = sum99 = 0;
							for (i=0; i<recordset.length; i++, index++) {
								y += 14;
								if ( y > 800 ) {

									doc.addPage();
									y = 10;
									startY = y;

									if (i+1 < recordset.length) {
										if ( groupName == recordset[i+1]['groupName'] ) {
											drawHeadLine(doc, groupName, posX, y, 35);
											y += 18;
											startY = y;
										}
									}
									

								}
								if ( groupName != recordset[i]['groupName'] ) {
									y += 5;

									groupName = recordset[i]['groupName'];
									drawHeadLine(doc, groupName, posX, y, 35);
									y += 18;
									startY = y;							

								}

								doc.y = y; doc.x = posX[0]+2;
								doc.font('./fonts/THSarabun.ttf', 12)
									.text(index+'.', { width: 20, align: 'right' })
								doc.y = y; doc.x = posX[0]+25;
								doc.text(recordset[i]['sku'], { width: 40, align: 'left' })
								doc.y = y; doc.x = posX[0]+70;
								doc.text(recordset[i]['productName'], { width: 300, align: 'left' })
								doc.y = y; doc.x = posX[1];
								doc.text((recordset[i]['cost'] > 0) ? numberWithCommas(recordset[i]['cost'].toFixed(0)) : '-', { width: 35, align: 'right' })
								//doc.text(recordset[i]['cost'].toFixed(0), { width: 35, align: 'right' })
								//doc.y = y; doc.x = posX[2];
								//doc.text((recordset[i]['costPlan'] > 0) ? numberWithCommas(recordset[i]['costPlan'].toFixed(0)) : '-', { width: 35, align: 'right' })
								//doc.text(recordset[i]['costPlan'].toFixed(0), { width: 35, align: 'right' })
								doc.y = y; doc.x = posX[3];
								doc.text((recordset[i]['90'] > 0) ? numberWithCommas(recordset[i]['90'].toFixed(0)) : '-', { width: 35, align: 'right' })
								doc.y = y; doc.x = posX[4];
								doc.text((recordset[i]['60'] > 0) ? numberWithCommas(recordset[i]['60'].toFixed(0)) : '-', { width: 35, align: 'right' })
								doc.y = y; doc.x = posX[5];
								doc.text((recordset[i]['30'] > 0) ? numberWithCommas(recordset[i]['30'].toFixed(0)) : '-', { width: 35, align: 'right' })
								doc.y = y; doc.x = posX[6];
								doc.text((recordset[i]['15'] > 0) ? numberWithCommas(recordset[i]['15'].toFixed(0)) : '-', { width: 35, align: 'right' })
								doc.y = y; doc.x = posX[7];
								doc.text((recordset[i]['0'] > 0) ? numberWithCommas(recordset[i]['0'].toFixed(0)) : '-', { width: 35, align: 'right' })
								//doc.y = y; doc.x = posX[8];
								//doc.text((recordset[i]['qtyPlan'] > 0) ? numberWithCommas(recordset[i]['qtyPlan'].toFixed(0)) : '-', { width: 35, align: 'right' })

								doc.lineWidth(0.25)
									.moveTo(posX[0], y+15)
									.lineTo(posX[9], y+15)
									.dash(1, {space: 1})
									.stroke()

								sum90 += recordset[i]['cost']*recordset[i]['90'];
								sum60 += recordset[i]['cost']*recordset[i]['60'];
								sum30 += recordset[i]['cost']*recordset[i]['30'];
								sum15 += recordset[i]['cost']*recordset[i]['15'];
								sum0 += recordset[i]['cost']*recordset[i]['0'];
								sum99 += (recordset[i]['qtyPlan'] != 0 && recordset[i]['costPlan'] != 0) ? recordset[i]['costPlan']*recordset[i]['qtyPlan'] : 0;

								if ( recordset[i+1] == null || groupName != recordset[i+1]['groupName'] ) {
									if (sum90 != 0 || sum60 != 0 || sum30 != 0 || sum15 != 0 || sum0 != 0 || sum99 != 0) {
										y += 16;
										doc.font('./fonts/THSarabunBold.ttf', 10)
										doc.y = y; doc.x = posX[1];
										doc.text('มูลค่า', { width: 35, align: 'right' })
										doc.y = y; doc.x = posX[3];
										doc.text((sum90 > 0) ? numberWithCommas(sum90.toFixed(0)) : '-', { width: 35, align: 'right' })
										doc.y = y; doc.x = posX[4];
										doc.text((sum60 > 0) ? numberWithCommas(sum60.toFixed(0)) : '-', { width: 35, align: 'right' })
										doc.y = y; doc.x = posX[5];
										doc.text((sum30 > 0) ? numberWithCommas(sum30.toFixed(0)) : '-', { width: 35, align: 'right' })
										doc.y = y; doc.x = posX[6];
										doc.text((sum15 > 0) ? numberWithCommas(sum15.toFixed(0)) : '-', { width: 35, align: 'right' })
										doc.y = y; doc.x = posX[7];
										doc.text((sum0 > 0) ? numberWithCommas(sum0.toFixed(0)) : '-', { width: 35, align: 'right' })
										doc.y = y; doc.x = posX[8];
										doc.text((sum99 > 0) ? numberWithCommas(sum99.toFixed(0)) : '-', { width: 35, align: 'right' })

										doc.lineWidth(0.5)
											.moveTo(posX[1], y+13)
											.lineTo(posX[9], y+13)
											.dash(1, {space: 0})
											.stroke()

										sum90 = sum60 = sum30 = sum15 = sum0 = sum99 = 0;
										y += 3;
									}
								}

							}

							doc.pipe(res);
							doc.end();

						}else{
						   res.send(err.message);
						}
					});
				}
				
				//### RUN RATE REPORT ###//
				else if (report == 'run_rate')
				{
					request.query('EXEC sp_ReportRunRate '+branch, function (err, recordset, returnValue) {
						if (!err){
							var posX = [10, 315, 345, 375, 405, 435, 465, 495, 525, 555, 585];

							doc.font('./fonts/CALIBRIB.TTF', 18)
								.text('Stock Run Rate Report : Branch '+'Test', 10, 10)

							doc.lineWidth(0.75)
								.moveTo(posX[0], 30)
								.lineTo(posX[9], 30)
								.stroke()

							var groupName = 'xxx';
							var y = 20;
							var startY = y;
							var index = 1;
							var sum = 0;
							for (i=0; i<recordset.length; i++, index++) {
								y += 14;
								if ( y > 800 ) {

									doc.addPage();
									y = 10;
									startY = y;

									if (i+1 < recordset.length) {
										if ( groupName == recordset[i+1]['groupName'] ) {
											drawHeadLineRunRate(doc, groupName, posX, y, 30);
											y += 18;
											startY = y;
										}
									}
									

								}
								if ( groupName != recordset[i]['groupName'] ) {
									y += 5;

									groupName = recordset[i]['groupName'];
									drawHeadLineRunRate(doc, groupName, posX, y, 30);
									y += 18;
									startY = y;							

								}

								doc.y = y; doc.x = posX[0]+2;
								doc.font('./fonts/THSarabun.ttf', 12)
									.text(index+'.', { width: 20, align: 'right' })
								doc.y = y; doc.x = posX[0]+25;
								doc.text(recordset[i]['sku'], { width: 40, align: 'left' })
								doc.y = y; doc.x = posX[0]+70;
								doc.text(recordset[i]['name'], { width: 300, align: 'left' })
								doc.y = y; doc.x = posX[1];
								doc.text((recordset[i]['cost'] > 0) ? numberWithCommas(recordset[i]['cost'].toFixed(2)) : '-', { width: 30, align: 'right' })
								doc.y = y; doc.x = posX[2];
								doc.text((recordset[i]['stock'] > 0) ? numberWithCommas(recordset[i]['stock']) : '-', { width: 30, align: 'right' })
								doc.y = y; doc.x = posX[3];
								doc.text((recordset[i]['d0'] > 0) ? numberWithCommas(recordset[i]['d0']) : '-', { width: 30, align: 'right' })
								doc.y = y; doc.x = posX[4];
								doc.text((recordset[i]['d1'] > 0) ? numberWithCommas(recordset[i]['d1']) : '-', { width: 30, align: 'right' })
								doc.y = y; doc.x = posX[5];
								doc.text((recordset[i]['d2'] > 0) ? numberWithCommas(recordset[i]['d2']) : '-', { width: 30, align: 'right' })
								doc.y = y; doc.x = posX[6];
								doc.text((recordset[i]['d3'] > 0) ? numberWithCommas(recordset[i]['d3']) : '-', { width: 30, align: 'right' })
								doc.y = y; doc.x = posX[7];
								doc.text((recordset[i]['d4'] > 0) ? numberWithCommas(recordset[i]['d4']) : '-', { width: 30, align: 'right' })
								doc.y = y; doc.x = posX[8];
								doc.text((recordset[i]['d5'] > 0) ? numberWithCommas(recordset[i]['d5']) : '-', { width: 30, align: 'right' })

								doc.lineWidth(0.25)
									.moveTo(posX[0], y+15)
									.lineTo(posX[9], y+15)
									.dash(1, {space: 1})
									.stroke()

								sum += recordset[i]['stock'] > 0 ? recordset[i]['stock']*recordset[i]['cost'] : 0;

								if ( recordset[i+1] == null || groupName != recordset[i+1]['groupName'] ) {
									if (sum != 0) {
										y += 16;
										doc.font('./fonts/THSarabunBold.ttf', 12)
										doc.y = y; doc.x = posX[1] - 20;
										doc.text('มูลค่า', { width: 30, align: 'left' })
										doc.y = y; doc.x = posX[1];
										doc.text((sum > 0) ? numberWithCommas(sum.toFixed(0)) : '-', { width: 60, align: 'right' })

										doc.lineWidth(0.5)
											.moveTo(posX[1] - 25, y+15)
											.lineTo(posX[9], y+15)
											.dash(1, {space: 0})
											.stroke()

										sum = 0;
										y += 3;
									}
								}

							}

							doc.pipe(res);
							doc.end();						

						}else{
						   res.send(err.message);
						}
					});
				}

			 });

		}

	}
	catch(err) {
		data.err = err;
		res.json(data);
	}

};

exports.shop = function(req, res, firstname, lastname) {
	firstname = decodeURI(firstname);
	lastname = decodeURI(lastname);
	try {

		var request = require('request');

		request.post({headers: { 'referer': 'https://api.remaxthailand.co.th' }, url: 'http://127.0.0.1:9991/register/shop/info',
			form: {
				apiKey: 'AA69632B-D906-4304-84C6-A039F5985D31',
				firstname: firstname,
				lastname: lastname,
				mobile: ''
			}
		},
		function (error, response, body) {
			if (!error) {				
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
				doc.y = y; doc.x = x+140; doc.text( 'คุณ' + json.firstname + '  ' + json.lastname + ' (' + json.nickname + ')' );
				y += 32;

				doc.font('./fonts/THSarabun.ttf', 18);
				doc.y = y; doc.x = x; doc.text('เบอร์โทรศัพท์', {width: 130, align: 'right'});
				doc.font('./fonts/THSarabunBold.ttf', 18);
				doc.y = y; doc.x = x+140; doc.text( json.mobile.substr(0,3)+'-'+json.mobile.substr(3,4)+'-'+json.mobile.substr(7) );
				y += 18;

				doc.font('./fonts/THSarabun.ttf', 18);
				doc.y = y; doc.x = x; doc.text('เวลาที่สะดวกในการติดต่อ', {width: 130, align: 'right'});
				doc.font('./fonts/THSarabunBold.ttf', 18);
				doc.y = y; doc.x = x+140; doc.text( json.time );
				y += 18;

				/*doc.font('./fonts/THSarabun.ttf', 18);
				doc.y = y; doc.x = x; doc.text('สนใจเป็นตัวแทนในจังหวัด', {width: 130, align: 'right'});
				doc.font('./fonts/THSarabunBold.ttf', 18);
				doc.y = y; doc.x = x+140; doc.text( json.Province );
				y += 18;*/

				doc.font('./fonts/THSarabun.ttf', 18);
				doc.y = y; doc.x = x; doc.text('ที่อยู่', {width: 130, align: 'right'});
				doc.font('./fonts/THSarabunBold.ttf', 18);
				doc.y = y; doc.x = x+140; doc.text( json.address );
				y += 38;

				/*doc.font('./fonts/THSarabunBold.ttf', 16);
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
				doc.text( '     ' + json.Comment );*/
				doc.moveDown();

				doc.pipe(res); doc.end();
			} else{
				data.err = error;
				res.json(data);
			}
		});

	}
	catch(err) {
		data.err = err;
		res.json(data);
	}
}

function drawHeadLine(doc, groupName, posX, y, width){
	
	doc.y = y; doc.x = posX[0];
	doc.font('./fonts/THSarabunBold.ttf', 18)
		.text(groupName, { width: 300, align: 'left' });

	doc.y = y+3; doc.x = posX[1];
	doc.font('./fonts/THSarabunBold.ttf', 12)
		.text('ทุน', { width: width, align: 'right' })
	//doc.y = y+3; doc.x = posX[2];
	//doc.text('ทุนใหม่', { width: width, align: 'right' })
	doc.y = y+3; doc.x = posX[3];
	doc.text('90', { width: width, align: 'right' })
	doc.y = y+3; doc.x = posX[4];
	doc.text('60', { width: width, align: 'right' })
	doc.y = y+3; doc.x = posX[5];
	doc.text('30', { width: width, align: 'right' })
	doc.y = y+3; doc.x = posX[6];
	doc.text('15', { width: width, align: 'right' })
	doc.y = y+3; doc.x = posX[7];
	doc.text('ปัจจุบัน', { width: width, align: 'right' })
	//doc.y = y+3; doc.x = posX[8];
	//doc.text('Plan', { width: width, align: 'right' })

	doc.lineWidth(0.75)
		.moveTo(posX[0], y+18)
		.lineTo(posX[9], y+18)
		.dash(1, {space: 0})
		.stroke()
}

function drawHeadLineRunRate(doc, groupName, posX, y, width){
	
	doc.y = y+4; doc.x = posX[0];
	doc.font('./fonts/CALIBRIB.TTF', 12)
		.text(groupName, { width: 300, align: 'left' });

	doc.y = y+3; doc.x = posX[1];
	doc.font('./fonts/THSarabunBold.ttf', 12)
		.text('ทุน', { width: width, align: 'right' })
	doc.y = y+3; doc.x = posX[2];
	doc.text('Stock', { width: width, align: 'right' })
	doc.y = y+3; doc.x = posX[3];
	doc.text('วันนี้', { width: width, align: 'right' })
	doc.y = y+3; doc.x = posX[4];
	doc.text('-1', { width: width, align: 'right' })
	doc.y = y+3; doc.x = posX[5];
	doc.text('-2', { width: width, align: 'right' })
	doc.y = y+3; doc.x = posX[6];
	doc.text('-3', { width: width, align: 'right' })
	doc.y = y+3; doc.x = posX[7];
	doc.text('-4', { width: width, align: 'right' })
	doc.y = y+3; doc.x = posX[8];
	doc.text('-5', { width: width, align: 'right' })

	doc.lineWidth(0.75)
		.moveTo(posX[0], y+18)
		.lineTo(posX[9], y+18)
		.dash(1, {space: 0})
		.stroke()
}

	
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}