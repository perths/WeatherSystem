const coap = require('coap');
const config = require('./config');
const server = coap.createServer();

let latestDataPacket;

server.on('request', (req, res) => {
    console.info('Request received', req.url);
    try {
        const payload = Buffer.from(req.payload).toString();
        processRequest(req.url, payload, res);
    } catch (error) {
        console.error('COAP_ON_REQUEST_ERROR', error);
    }
});

server.listen(config.CoAPConfig.port, (req, res) => {
    console.log(`CoAP server started on port ${config.CoAPConfig.port}`);
});

const processRequest = (route, payload, res) => {
    try {
        switch (route) {
            case '/postData': {
                const reParsedDataPacket = JSON.parse(payload);
                const validationResult = validateDataPacket(reParsedDataPacket);
                if (validationResult.overallValidation) {
                    latestDataPacket = reParsedDataPacket;
                }
                sendResponse(res, { success: true });
                break;
            }
            case '/getData': {
                console.log('here', route, payload, latestDataPacket);
                sendResponse(res, latestDataPacket);
                break;
            }
            case '/temperature': {
                sendResponse(res, { temperature: latestDataPacket.temperature, time: latestDataPacket.time });
                break;
            }
            case '/humidity': {
                sendResponse(res, { humidity: latestDataPacket.humidity, time: latestDataPacket.time });
                break;
            }
            default: {
                sendResponse(res);
                break;
            }
        }
    } catch (error) {
        console.error('ERROR_PROCESS_REQUEST', error);
    }
}

const validateDataPacket = (dataPacket) => {
    try {
        const validationResult = { temperature: false, humidity: false, time: false };
        if (dataPacket && typeof dataPacket == 'object') {
            if (dataPacket.temperature && typeof (dataPacket.temperature) == 'number') {
                // console.log('Datapacket temperature validation check successful');
                validationResult.temperature = true;
            }
            if (dataPacket.humidity && typeof (dataPacket.humidity) == 'number') {
                // console.log('Datapacket humidity validation check successful');
                validationResult.humidity = true;
            }
            if (dataPacket.time && typeof (dataPacket.time) == 'number') {
                // console.log('Datapacket time validation check successful');
                validationResult.time = true;
            }
        }

        if (validationResult.temperature == false || validationResult.humidity == false || validationResult.time == false) {
            validationResult.overallValidation = false;
            return validationResult;
        } else {
            validationResult.overallValidation = true;
            return validationResult;
        }
    } catch (error) {
        console.error('VALIDATE_DATA_PACKET', error);
    }
}

const sendResponse = (res, resContent) => {
    try {
        if (resContent) {
            res.setOption('Content-Format', 'application/json');
            res.code = '2.05';
            res.end(JSON.stringify(resContent));
        } else {
            res.code = '4.04';
            res.end();
        }
    } catch (error) {
        console.error('SEND_RESPONSE', error);
    }
}