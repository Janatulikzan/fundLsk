import { ethers } from "hardhat";
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  const idrxAddress = process.env.IDRX_TOKEN_ADDRESS;
  if (!idrxAddress) throw new Error("Token IDRX address is missing");

  const Crowdfunding = await ethers.getContractFactory("Crowdfunding");
  const crowdfunding = await Crowdfunding.deploy(idrxAddress);

  await crowdfunding.waitForDeployment();
  console.log("Crowdfunding deployed to:", crowdfunding.target);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
