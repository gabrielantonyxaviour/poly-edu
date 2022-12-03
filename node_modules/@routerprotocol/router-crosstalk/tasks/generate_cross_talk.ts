// hardhat task to generate cross talk file
import { Signer } from "@ethersproject/abstract-signer";
import { task } from "hardhat/config";
import web3 from "web3";
import { exec } from 'child_process';


task("generate-cross-talk", "Generate RouterCrossTalk .sol file for a network")
  .addParam("file", "Name of file to be generated")
  .addParam("path", "Path of file to be generated ")
  .addParam("handler", "Address of handler")
  .setAction(async (taskArgs) => {
    if (!web3.utils.checkAddressChecksum(taskArgs.handler)) {
      console.log("checksum failed!");
      return;
    }

    // trim trailing '0x' if any
    let handlerAddress = taskArgs.handler;
    if (web3.utils.isHexStrict(handlerAddress)) {
      handlerAddress = taskArgs.handler.substring(2, taskArgs.handler.length);
    }

    console.log("#file name: ", taskArgs.file);
    console.log("#generic handler address: ", handlerAddress);

    exec(
      "yarn hygen cross-talk-generator new " +
        taskArgs.file +
        " --path " +
        taskArgs.path +
        " --handler " +
        handlerAddress,
      (error, stderr, stdout) => {
        if (error) {
          console.log(`error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
      }
    );
  });
