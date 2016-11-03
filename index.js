var kafka = require('kafka-node');
var zookeeper = require('node-zookeeper-client');

var Producer = kafka.Producer;
var KeyedMessage = kafka.KeyedMessage;
var Client = kafka.Client;
var producer = null ;
var argv = require('optimist').argv;
var topic = argv.topic || 'topic1';
var p = argv.p || 0;
var a = argv.a || 0;



function initProducerAndSendMessage(kafkaIp,kafkaPort,zookeeperBrokerList,kafkaTopic,sendMessage,eventraiser,eventname){
   var kafkaServer = kafkaIp + ":" + kafkaPort;
   var kafkaClientId = 'kafka-client-r3';
   var message = sendMessage;
   var messages = [{ topic: kafkaTopic, partition: 0, messages: [message], attributes: 0 }];
  // var keyedMessage = new KeyedMessage('keyed', 'a keyed message');
  console.log("initProducerAndSendMessage");

   client = new Client(kafkaServer,kafkaClientId,zookeeperBrokerList); 
   producer = new Producer(client,{ requireAcks: 1 });

   producer.on('ready', function () {
    console.log("onready in");

    var message = 'a message first';
    
   
    producer.send(messages, function (err, result) {
            
            if(err){
                console.log(err);
                try{
                eventraiser.emit(eventname, err);
                } catch (err){
                    console.log(err);
                
                }
                return false;
            }else{
                console.log(result);
                try{
                eventraiser.emit(eventname, result);
                } catch (err){
                    console.log(err);
                
                }

                return true;
            }
        });

     console.log("onready out");   
    });

    producer.on('error', function (err) {
        console.log('error', err);
        try{
             eventraiser.emit(eventname, err);
            } catch (err){
                console.log(err);
            
            }
    });


}
exports.initProducerAndSendMessage = initProducerAndSendMessage;

