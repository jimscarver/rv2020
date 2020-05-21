// keygen, rnode deploy cribbed from
// https://github.com/tgrospic/rnode-client-js/blob/master/src/nodejs/client.js

/* global Buffer */

import elliptic from 'elliptic';
import rnode_grpc_js from '@tgrospic/rnode-grpc-js';

import makeNodePath from './pathlib.js';

const harden = x => Object.freeze(x);

const rnodeExternalUrl = 'node3.testnet.rchain-dev.tk:40401';

export async function run(require, process) {
  console.log('generate key for deployment by this service');

  const [fs, path, temp] = ['fs', 'path', 'temp'].map(require);
  const cwd = makeNodePath('.', { fs, path, temp });

  const { randomBytes } = require('crypto');
  const secKey = await init({ cwd, randomBytes });

  const grpcLib = require('@grpc/grpc-js');
  const protoSchema = require('./rnode-grpc-gen/js/pbjs_generated.json');
  const { rnodeDeploy } = rnode_grpc_js;
  require('./rnode-grpc-gen/js/DeployService_pb.js');  // get proto in scope
  const deployService = rnodeDeploy({ grpcLib, host: rnodeExternalUrl, protoSchema });
  ensureDeploy(secKey, { deployService });
}


async function init({ cwd, randomBytes }) {
  const keyStore = cwd.join('deploySecretKey.json');
  if (exists(keyStore)) {
    console.log(`${keyStore} already exists`);
    const { deployKeyHex } = JSON.parse(keyStore.readFileSync());
    return Buffer.from(deployKeyHex);
  }

  const secKey = randomBytes(32);
  const keyInfo = { deployKeyHex: secKey.toString('hex') };
  console.log({ keyStore: keyStore.toString(), keyInfo });
  await keyStore.atomicReplace(JSON.stringify(keyInfo));
  return secKey;
}


async function ensureDeploy(secretKey, { deployService }) {
  const { ec } = elliptic;
  const secp256k1 = new ec('secp256k1');
  const deployKey = secp256k1.keyFromPrivate(secretKey);
  console.log({deployKey: deployKey.getPublic('hex')});

  const deployData = {
    term: 'Nil',
    phloprice: 1,
    phlolimit: 1000,
    validafterblocknumber: 0,
  };
  const { signDeploy } = rnode_grpc_js;
  const signed = signDeploy(deployKey, deployData);
  console.log({ signedDeploy: signed });
  console.log({ deployService });
  console.log({ DoDeploy: deployService.DoDeploy });
  const result = await deployService.DoDeploy(signed);
  console.log({ deployResponse: result });
}

function exists(p) {
  try {
    p.statSync();
    return true;
  } catch(ok) {
    return false;
  }
}
