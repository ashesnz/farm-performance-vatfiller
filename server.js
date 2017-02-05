'use strict';

var http = require('http'),
  express = require('express'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  path = require('path'),
  compress = require('compression'),
  mailer = require("nodemailer"),
  json2csv = require('json2csv'),
  fs = require('fs'),
  util = require('util');

/********************* APP SETUP *****************************/

var app = express();
var server = http.createServer(app);
var router = express.Router();

// Use Smtp Protocol to send Email
var smtpTransport = mailer.createTransport("SMTP", {
  service: "Gmail",
  auth: {
    user: process.env.USERNAME,
    pass: process.env.PASSWORD
  }
});

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(methodOverride());
app.use(compress());

app.use(express.static(path.join(__dirname, 'www/')));

console.writeToLog = function(ptptcode, newDate, csvContents) {
  fs.createWriteStream(__dirname + '/logs/' + ptptcode + ' ' + newDate + '.log', {flags : 'w'}).write(util.format(csvContents) + '\n');
};

/********************* ROUTES *****************************/

app.post('/email/scores/today', function (req, res, next) {

  var fields = ['animal_id', 'score', 'to_char'];

  json2csv({data: result.rows, fields: fields}, function (err, csv) {
    if (err) console.log(err);
    var mail = {
      from: "Agrimetrics <bcs@agrimetrics.co.nz>",
      to: req.body.email_address,
      subject: "BCS Results for " + req.body.ptpt_code,
      text: "Please find attached the requested BCS file for " + req.body.ptpt_code,
      attachments: [{
          filename: req.body.ptpt_code + '.csv',
          contents: csv
        }]
    }

    console.writeToLog(req.body.ptpt_code, Date.now(), csv);

    // send mail with defined transport object
    smtpTransport.sendMail(mail, function (error, response) {
      if (error) {
        console.log(error);
      } else {
        console.log("Message sent: " + response.message);
      }

      smtpTransport.close();
    });

    res.sendStatus(200); // equivalent to res.status(200).send('OK')
  });


});
/**********************************************************/
app.post('/email/scores/all', function (req, res, next) {

    var fields = ['ptpt_code', 'animal_id',  'scored_on_string', 'scored_on_time', 'live_weight', 'score'];

    var d = new Date();
    var newDate = d.toLocaleDateString().replace(/\\/, "-");
    var ptptcode = (req.body.ptpt_code).toUpperCase();
    json2csv({data: req.body.scores_data, fields: fields}, function (err, csv) {
          if (err) console.log(err);
          var mailRecipients = ['bcs@lic.co.nz'];
          if (req.body.recipient_email !== undefined) {
            mailRecipients.push(req.body.recipient_email);
          }

         var mail = {
            from: "Agrimetrics <bcs@agrimetrics.co.nz>",
            to: mailRecipients,
            subject: "BCS Results",
            text: "Please find attached the requested BCS file for " + ptptcode + " - Date: " + newDate,
            attachments: [{
                filename: ptptcode + ' (' + newDate + ').csv',
                contents: csv
              }]
          }

          console.writeToLog(ptptcode, Date.now(), csv);

          // send mail with defined transport object
          smtpTransport.sendMail(mail, function (error, response) {
            if (error) {
              console.log(error);
            } else {
              console.log("Message sent: " + response.message);
            }

            smtpTransport.close();
          });

          res.sendStatus(200); // equivalent to res.status(200).send('OK')

  });
});
/**********************************************************/

app.set('port', process.env.PORT || 5000);

server.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
