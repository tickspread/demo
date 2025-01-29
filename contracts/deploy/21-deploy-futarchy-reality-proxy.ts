import { HardhatRuntimeEnvironment } from "hardhat/types";
import "@nomicfoundation/hardhat-viem";
import "hardhat-deploy";
import { DeployFunction } from "hardhat-deploy/types";

const deployFutarchyRealityProxy: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments, getNamedAccounts, getChainId } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();
  if (!deployer) {
    throw new Error("No deployer account found");
  }
  
  const chainId = Number(await getChainId());
  console.log("deploying to chainId %s with deployer %s", chainId, deployer);

  const conditionalTokens = await deployments.get("ConditionalTokens");
  const reality = await deployments.get("Reality");

  await deploy("FutarchyRealityProxy", {
    from: deployer,
    args: [
      conditionalTokens.address,
      reality.address,
    ],
    log: true,
    deterministicDeployment: false, // Force new deployment
  });
};

deployFutarchyRealityProxy.tags = ['Futarchy', 'FutarchyRealityProxy'];

export default deployFutarchyRealityProxy;