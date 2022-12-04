const { network, ethers } = require("hardhat")
const { verify } = require("../utils/verify")

const REGISTRY = "0xD504d012D78B81fA27288628f3fC89B0e2f56e24"
const LICENSE = "0x3cE643dc61bb40bB0557316539f4A93016051b81"
const GENERIC_HANDLER = "0x22a240968D41e4FaC43b5d5DC8A39C3e96EC5da7"

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    const waitBlockConfirmations = 6

    log("----------------------------------------------------")
    const args = [REGISTRY, LICENSE, GENERIC_HANDLER]
    const raffle = await deploy("PolyEdu", {
        from: deployer,
        args,
        log: true,
        waitConfirmations: waitBlockConfirmations,
    })

    // Verify the deployment
    log("Verifying...")
    await verify(raffle.address, args)
    console.log("Contract successfully verified")
    log("----------------------------------------------------")
}

module.exports.tags = ["all", "polyedu"]
