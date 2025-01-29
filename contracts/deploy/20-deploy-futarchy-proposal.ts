import { HardhatRuntimeEnvironment } from "hardhat/types";
import "@nomicfoundation/hardhat-viem";
import "hardhat-deploy";
import { DeployFunction } from "hardhat-deploy/types";

const deployFutarchyProposal: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments, getNamedAccounts, getChainId } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();
  if (!deployer) {
    throw new Error("No deployer account found");
  }
  
  const chainId = Number(await getChainId());
  console.log("deploying to chainId %s with deployer %s", chainId, deployer);

  await deploy("FutarchyProposal", {
    from: deployer,
    args: [],
    log: true,
    deterministicDeployment: false,
  });
};

deployFutarchyProposal.tags = ['Futarchy', 'FutarchyProposal'];

export default deployFutarchyProposal;