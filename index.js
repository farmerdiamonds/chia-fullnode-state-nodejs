import { getBlockchainState } from './fullnode.mjs';
import { saveState } from './protocol.mjs';

async function sendStatus(blockchainState){
  let blockchainstatus = {};
  blockchainstatus.difficulty = blockchainState.blockchain_state.difficulty;
  blockchainstatus.height = blockchainState.blockchain_state.peak.height;
  blockchainstatus.netspace = blockchainState.blockchain_state.space;
  console.log("Sending data: "+blockchainstatus);
  return await saveState(blockchainstatus);
}
async function main(){
  const blockchainState = await getBlockchainState();
  console.log(blockchainState);
  try{
    console.log(await sendStatus(blockchainState));
  }catch(e){
    console.log(e);
  }
  setTimeout(main,300000);
}
main();