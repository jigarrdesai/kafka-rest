var kafka = require('./index.js');
var events = require('events');
var emitter       = new events.EventEmitter();

kafka.initProducerAndSendMessage("23.227.167.180","2181","HIGH_PROCESSING_QUEUE","kafkaMessage",emitter,"kafkasentmessage");
