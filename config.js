const path = require('path');

module.exports = {
    sensorPollInterval: 10 * 1000, // Rate at which sensor will poll and post data
    CoAPConfig: {
        host: 'xcelautovik.in',
        pathname: '/postData',
        port: 8765,
        method: 'post',
        observe: false,
        options: {
            "Content-Format": 'application/json'
        }
    },
    AWSIoTConfig: {
        keyPath: path.resolve(__dirname, './credentials/test.private.key'),
        certPath: path.resolve(__dirname, './credentials/test.cert.pem'),
        caPath: path.resolve(__dirname, './credentials/rootCA.crt'),
        clientId: 'sensorBom-' + Date.now(),
        host: 'aujzq4e5twgi4-ats.iot.ap-south-1.amazonaws.com'
    },
    MQTTConfig: {
        host: 'xcelautovik.in',
        port: 1883,
        clientId: 'sensorBom-' + Date.now(),
        username: 'sensorBom',
        password: 'sensor$1234',
        qos: 2
    }
}
