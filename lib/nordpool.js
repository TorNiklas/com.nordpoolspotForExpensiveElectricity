const moment = require('moment-timezone');
const http = require('http.min');

async function getHourlyPrices(moment, opts) {
    return new Promise((resolve, reject) => {
        http.json('https://www.nordpoolgroup.com/api/marketdata/page/10?' +
            'currency=,' + opts.currency + ',' + opts.currency + ',' + opts.currency +
            '&endDate=' + moment.format('DD-MM-YYYY'))
            .then(function (data) {
                resolve(parseResult(data, opts));
            })
            .catch(function (err) {
                reject(err);
            });
    });
}

function parseResult(data, opts) {
    var result = [];
    if (data.data && data.data.Rows && data.data.Rows.length) {
        for (var i = 0; i < data.data.Rows.length; i++) {
            var row = data.data.Rows[i];
            if (row.IsExtraRow) {
                continue;
            }

            var date = moment.tz(row.StartTime, "YYYY-MM-DD\Thh:mm:ss", 'Europe/Oslo');

            for (var j = 0; j < row.Columns.length; j++) {
                var column = row.Columns[j];
                // console.log("Value: " + column.Value);
                // console.log("Parsed: " + parseFloat(column.Value.replace(/,/, '.')));
                // console.log("Ex: " + "1 251,68");
                // console.log("ExParsed: " + parseFloat("1 251,68".replace(/ /, "").replace(/,/, '.'))/1000);
                var value = (parseFloat(column.Value.replace(/ /, "").replace(/,/, '.'))/100).toFixed(2);
                if (isNaN(value)) {
                    continue
                }
                if (column.Name === opts.priceArea) {
                    result.push({
                        startsAt: date.format(),
                        priceArea: opts.priceArea,
                        currency: opts.currency,
                        price: value
                    })
                }
            }
        }
    }
    return result;
}

module.exports = {
    getHourlyPrices: getHourlyPrices
};
