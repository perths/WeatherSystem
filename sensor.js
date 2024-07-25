const mqtt = require('mqtt');
const coap = require('coap');
const awsIot = require('aws-iot-device-sdk');
const config = require('./config');

/** Connect to Mqtt  */
const mqttconfig = JSON.parse(JSON.stringify(config.MQTTConfig));
const mqttClient = mqtt.connect(mqttconfig);

const awsDevice = awsIot.device(config.AWSIoTConfig);

mqttClient.on('connect', () => {
    console.log('MQTT Connected');

    awsDevice.on('connect', () => {
        console.log('AWS IoT Connected');

        try {
            /** Publish sensor data on AWS IoT, MQTT and CoAP Sv at regular intervals  */
            setInterval(() => {

                const dataPacket = JSON.stringify({
                    temperature: getRandomNum(25, 27),
                    humidity: getRandomNum(50, 60),
                    time: Date.now()
                });

                console.log('publishing sensor data', dataPacket);

                /** AWS IoT */
                awsDevice.publish('data/sensor', dataPacket);

                /** MQTT */
                mqttClient.publish('data/sensor', dataPacket);

                /** CoAP request */
                const coapReq = coap.request(config.CoAPConfig);
                coapReq.write(dataPacket);
                coapReq.end();

            }, config.sensorPollInterval);

        } catch (error) {
            console.error('PUBLISH_DATA', error);
        }
    });
})

awsDevice.on('error', (error) => {
    console.error('AWS_IOT_ERROR', error);
})

mqttClient.on('error', (error) => {
    console.error('MQTT_ERROR', error);
});

const getRandomNum = (min, max) => (Math.floor(Math.random() * (max - min + 1)) + min);