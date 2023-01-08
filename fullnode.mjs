import { nodeRequest } from './noderpc.mjs';

async function getBlockchainState(){
  return await nodeRequest("/get_blockchain_state","{}");
}
export {
  getBlockchainState
}