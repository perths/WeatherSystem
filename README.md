# WeatherSystem
## Install Node Packages
```sh
npm i
```

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
