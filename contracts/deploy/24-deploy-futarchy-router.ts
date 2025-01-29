import { HardhatRuntimeEnvironment } from "hardhat/types";
import "@nomicfoundation/hardhat-viem";
import "hardhat-deploy";
import { DeployFunction } from "hardhat-deploy/types";

const deployFutarchyRouter: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments, getNamedAccounts, getChainId } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();
  if (!deployer) {
    throw new Error("No deployer account found");
  }
  
  const chainId = Number(await getChainId());
  console.log("deploying to chainId %s with deployer %s", chainId, deployer);

  const conditionalTokens = await deployments.get("ConditionalTokens");
  const wrapped1155Factory = await deployments.get("Wrapped1155Factory");

  await deploy("FutarchyRouter", {
    from: deployer,
    args: [conditionalTokens.address, wrapped1155Factory.address],
    log: true,
    deterministicDeployment: false, // Force new deployment
  });
};

deployFutarchyRouter.tags = ['Futarchy', 'FutarchyRouter'];

export default deployFutarchyRouter;
