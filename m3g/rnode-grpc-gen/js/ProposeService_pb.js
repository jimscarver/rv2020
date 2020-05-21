/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

var CasperMessage_pb = require('./CasperMessage_pb.js');
goog.object.extend(proto, CasperMessage_pb);
var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js');
goog.object.extend(proto, google_protobuf_empty_pb);
var Either_pb = require('./Either_pb.js');
goog.object.extend(proto, Either_pb);
var scalapb_scalapb_pb = require('./scalapb/scalapb_pb.js');
goog.object.extend(proto, scalapb_scalapb_pb);
goog.exportSymbol('proto.coop.rchain.casper.protocol.PrintUnmatchedSendsQuery', null, global);

/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.coop.rchain.casper.protocol.PrintUnmatchedSendsQuery = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.coop.rchain.casper.protocol.PrintUnmatchedSendsQuery, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.coop.rchain.casper.protocol.PrintUnmatchedSendsQuery.displayName = 'proto.coop.rchain.casper.protocol.PrintUnmatchedSendsQuery';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.coop.rchain.casper.protocol.PrintUnmatchedSendsQuery.prototype.toObject = function(opt_includeInstance) {
  return proto.coop.rchain.casper.protocol.PrintUnmatchedSendsQuery.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.coop.rchain.casper.protocol.PrintUnmatchedSendsQuery} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.coop.rchain.casper.protocol.PrintUnmatchedSendsQuery.toObject = function(includeInstance, msg) {
  var f, obj = {
    printunmatchedsends: jspb.Message.getFieldWithDefault(msg, 1, false)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.coop.rchain.casper.protocol.PrintUnmatchedSendsQuery}
 */
proto.coop.rchain.casper.protocol.PrintUnmatchedSendsQuery.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.coop.rchain.casper.protocol.PrintUnmatchedSendsQuery;
  return proto.coop.rchain.casper.protocol.PrintUnmatchedSendsQuery.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.coop.rchain.casper.protocol.PrintUnmatchedSendsQuery} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.coop.rchain.casper.protocol.PrintUnmatchedSendsQuery}
 */
proto.coop.rchain.casper.protocol.PrintUnmatchedSendsQuery.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setPrintunmatchedsends(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.coop.rchain.casper.protocol.PrintUnmatchedSendsQuery.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.coop.rchain.casper.protocol.PrintUnmatchedSendsQuery.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.coop.rchain.casper.protocol.PrintUnmatchedSendsQuery} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.coop.rchain.casper.protocol.PrintUnmatchedSendsQuery.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getPrintunmatchedsends();
  if (f) {
    writer.writeBool(
      1,
      f
    );
  }
};


/**
 * optional bool printUnmatchedSends = 1;
 * Note that Boolean fields may be set to 0/1 when serialized from a Java server.
 * You should avoid comparisons like {@code val === true/false} in those cases.
 * @return {boolean}
 */
proto.coop.rchain.casper.protocol.PrintUnmatchedSendsQuery.prototype.getPrintunmatchedsends = function() {
  return /** @type {boolean} */ (jspb.Message.getFieldWithDefault(this, 1, false));
};


/** @param {boolean} value */
proto.coop.rchain.casper.protocol.PrintUnmatchedSendsQuery.prototype.setPrintunmatchedsends = function(value) {
  jspb.Message.setProto3BooleanField(this, 1, value);
};


goog.object.extend(exports, proto.coop.rchain.casper.protocol);