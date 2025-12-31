import { ethers, network } from "hardhat";
import fs from "node:fs/promises";
import path from "node:path";

const factoryAddress =
  process.env.CREATE2_FACTORY_ADDRESS ??
  "0x4e59b44847b379578588920cA78FbF26c0B4956C";
const salt = process.env.CREATE2_SALT ?? "MYRECEIPT_SALT_V1";

const deploymentsDir = path.resolve(__dirname, "..", "deployments");

const requireEnv = (key: string) => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing ${key} in backend/.env`);
  }
  return value;
};

const getDeployData = async (name: string, args: unknown[]) => {
  const factory = await ethers.getContractFactory(name);
  const tx = await factory.getDeployTransaction(...args);
  if (!tx.data) {
    throw new Error(`Missing deploy data for ${name}`);
  }
  return tx.data as string;
};

const computeCreate2Address = (initCode: string) => {
  const saltBytes = ethers.id(salt);
  const initCodeHash = ethers.keccak256(initCode);
  return ethers.getCreate2Address(factoryAddress, saltBytes, initCodeHash);
};

const deployIfNeeded = async (initCode: string) => {
  const expected = computeCreate2Address(initCode);
  const code = await ethers.provider.getCode(expected);
  if (code && code !== "0x") {
    return expected;
  }
  const factory = new ethers.Contract(
    factoryAddress,
    ["function deploy(bytes _initCode, bytes32 _salt) external returns (address)"],
    (await ethers.getSigners())[0]
  );
  const saltBytes = ethers.id(salt);
  const tx = await factory.deploy(initCode, saltBytes);
  await tx.wait();
  return expected;
};

const writeDeployment = async (payload: Record<string, string>) => {
  await fs.mkdir(deploymentsDir, { recursive: true });
  const file = path.resolve(deploymentsDir, `${network.name}.json`);
  await fs.writeFile(file, JSON.stringify(payload, null, 2));
};

async function main() {
  const [deployer] = await ethers.getSigners();

  const treasury = requireEnv("TREASURY_ADDRESS");
  const stampFee = BigInt(requireEnv("STAMP_FEE_WEI"));
  const royaltyFee = BigInt(requireEnv("ROYALTY_FEE_WEI"));
  const mintFee = BigInt(requireEnv("NFT_MINT_FEE_WEI"));
  const royaltyBps = Number(process.env.NFT_ROYALTY_BPS ?? "500");

  const receiptInit = await getDeployData("ReceiptStamp", [
    deployer.address,
    treasury,
    stampFee,
    royaltyFee,
  ]);
  const receiptAddress = await deployIfNeeded(receiptInit);

  const nftInit = await getDeployData("ReceiptNFT", [
    deployer.address,
    receiptAddress,
    treasury,
    mintFee,
    royaltyBps,
  ]);
  const nftAddress = await deployIfNeeded(nftInit);

  const receipt = await ethers.getContractAt("ReceiptStamp", receiptAddress);
  const currentNft = await receipt.nftContract();
  if (currentNft.toLowerCase() !== nftAddress.toLowerCase()) {
    const tx = await receipt.setNftContract(nftAddress);
    await tx.wait();
  }

  await writeDeployment({
    receipt: receiptAddress,
    nft: nftAddress,
    salt,
    factory: factoryAddress,
    deployer: deployer.address,
  });

  console.log("Deterministic deploy complete:", {
    network: network.name,
    receipt: receiptAddress,
    nft: nftAddress,
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
