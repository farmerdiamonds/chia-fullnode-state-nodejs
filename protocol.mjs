import { Agent } from 'node:https';
import { request } from 'node:https';
async function saveState(blockchainstatus){
  const path = '/protocol.php';
  const clientoptions = {
    hostname: 'example.com',
    port: 443,
    path: path,
    method: 'POST',
  };
  let data={};
  data.token='yoursecrettoken';
  data.blockchainstate=blockchainstatus;
  clientoptions.agent = new Agent(clientoptions);
  return new Promise((resolve, reject) => {
    const serverrequest = request(clientoptions, (serverresponse) => {
      let responsedata = '';
      serverresponse.on('data', (chunk) => {
        responsedata += chunk;
      });
      serverresponse.on('end', () => {
        try{
          const responseobject = JSON.parse(responsedata.toString());
          resolve(responseobject);
        }catch{
          console.log(responsedata.toString());
          resolve({"error":"servererror"});
        }
      });
      serverrequest.on('error', (e) => {
        console.log("Requesterror:\n"+e);
        reject(e);
      });
      serverrequest.on('timeout', () => {
        nodereq.destroy();
        console.log("RPC Error:\n"+e);
        reject(new Error('Connection timeout'));
      });
    });
    serverrequest.write(JSON.stringify(data));
    serverrequest.end();
  });
}
export { saveState };
