var kafka = require('./index.js');
var events = require('events');
var emitter       = new events.EventEmitter();

var zookeeperList = ["23.227.167.180:9092,104.251.214.144:9092,63.142.253.79:9092"];

kafka.initProducerAndSendMessage("23.227.167.180","2181","HIGH_PROCESSING_QUEUE","kafkaMessage",emitter,"kafkasentmessage");
