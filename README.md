# WeatherSystem
## Install Node Packages
```sh
npm i
```

## Configure the config file
| Field | Desciption |
| ------ | ------ |
| sensorPollInterval | Rate in milliseconds at which sensor data is polled |
| CoAPConfig | CoAP Server Config to post sensor data - contains fields: host, pathname, port, method, observe, options |
| AWSIoTConfig | AWS IoT SDK connection config - contains fields: keyPath, certPath, caPath, clientId, host |
| MQTTConfig | EMQX MQTT Broker config - contains fields: host, port, clientId, username, password, qos |


## Run CoAP Server
```sh
npm run coapSv
```
Run CoAP Client to test endpoints
```sh
node coapTest.js
```

## Run Sensor Node
Using node.js
```sh
npm run sensor
```
Using Docker
```sh
docker run --rm -it $(docker build -q .)
```

## Setup & Run EMQX MQTT
Install EMQX on Linux
```sh
curl -s https://assets.emqx.com/scripts/install-emqx-deb.sh | sudo bash
sudo apt-get install emqx
```
Start EMQX Service
```sh
sudo systemctl start emqx
```
