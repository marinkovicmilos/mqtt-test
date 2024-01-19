const http = require('http');

const start = () => {
    const server = http.createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello, world!');
    });
    server.listen(3000);
};

start();

// ------------------------------------------------------------

const mqtt = require('mqtt');
const options = {
    reconnectPeriod: 0
}
const client = mqtt.connect('mqtt://test.mosquitto.org', options);

client.on('connect', (connackPacket) => {
    console.log('-------------------');
    console.log('Mqtt - Client connected: ');

    setTimeout(() => {
        client.end(false, null, (error) => {
            if (error) {
                console.error('Mqtt - client.end error: ', error);
            } else {
                console.log('Mqtt - client.end success');
                console.log('Mqtt - client.reconnect');
                client.reconnect();
            }
        });
    }, 5000);

    client.subscribe({ msg: { qos: 2 } }, (err, granted) => {
        if (err) {
            console.error('Mqtt - error subscribing: ', err);
        } else {
            console.error('Mqtt - subscribed: ', granted);
            console.log('Mqtt - publish');
            client.publish('msg', 'Hello world');
        }
    });

    client.on('message', (topic, message) => {
        console.log(`Mqtt - client.on("message") Topic: ${topic}, Message: ${message}`);
    });

    client.on('close', (packet) => {
        console.error('Mqtt - client.on("close")');
    });

    client.on('end', () => {
        console.log('Mqtt - client.on("end")');
    });

    client.on('reconnect', () => {
        console.log('Mqtt - client.on("reconnect")');
    });

    client.on('disconnect', (packet) => {
        console.error('Mqtt - client.on("disconnect")');
    });

    client.on('offline', () => {
        console.log('Mqtt - client.on("offline")');
    });

    client.on('error', (err) => {
        console.error('Mqtt - error! ', err);
    });
});
