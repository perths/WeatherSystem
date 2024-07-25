const coap = require('coap');
const bl = require('bl');

const config = {
    host: 'xcelautovik.in',
    pathname: process.argv[2] ? process.argv[2] : '/getData',
    port: 8765,
    method: 'post',
    observe: false,
};

const coapReq = coap.request(config);

coapReq.on('response', (res) => {
    res.pipe(bl(function (err, data) {
        var json = JSON.parse(data);
        console.log('Data ', json);
    }))
});

coapReq.end();