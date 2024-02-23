const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const {loadFixture, time} = require("@nomicfoundation/hardhat-network-helpers");

describe("Lock", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployOneYearLockFixture() {
    // Contracts are deployed using the first signer/account by default
    /*const publicInflateLibWrapper = await ethers.getContractFactory("PublicInflateLibWrapper");
    const publicInflateLibWrapperLibrary = await publicInflateLibWrapper.deploy();

    console.log("InflateLibWrapperLibrary address: ", publicInflateLibWrapperLibrary.address)

    const extraBackgroundsStorageManager = await ethers.getContractFactory("ExtraBackgroundsStorageManager", {
      libraries: {
        PublicInflateLibWrapper: publicInflateLibWrapperLibrary.address
      }
    });
    const extraBackgroundsStorageManagerContract = await extraBackgroundsStorageManager.deploy();

    const extraBackgroundsBucketStorage0 = await ethers.getContractFactory("ExtraBackgroundsBucketStorage0");
    const extraBackgroundsBucketStorage0Contract = await extraBackgroundsBucketStorage0.deploy();

    // adding bucket storage to storage manager
    await extraBackgroundsStorageManagerContract.addBucketStorage(extraBackgroundsBucketStorage0Contract.address);

    const layerStorageDeployer = await ethers.getContractFactory("LayerStorageDeployer");
    const layerStorageDeployerLibrary = await layerStorageDeployer.deploy();

    const traitStorageDeployer = await ethers.getContractFactory("TraitStorageDeployer");
    const traitStorageDeployerLibrary = await traitStorageDeployer.deploy();

    const assetStorageManager = await ethers.getContractFactory("AssetStorageManager", {
      libraries: {
        PublicInflateLibWrapper: publicInflateLibWrapperLibrary.address
      }
    });
    const assetStorageManagerContract = await assetStorageManager.deploy(
      [layerStorageDeployerLibrary.address],
      [traitStorageDeployerLibrary.address]
    );

    const assembler = await ethers.getContractFactory("Assembler");
    const assemblerContract = await assembler.deploy(
        assetStorageManagerContract.address,
        extraBackgroundsStorageManagerContract.address
    );

    console.log("Assembler address: ", assemblerContract.address);*/

    return {
      owner,
      otherAccount
    };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const [owner, otherAccount] = await ethers.getSigners();

      const moonbirdsInchainRenderer = await ethers.getContractFactory("MoonbirdsInchainRenderer")
      const moonbirdsInchainRendererContract = await moonbirdsInchainRenderer.deploy(
          "0x23581767a106ae21c074b2276D25e5C3e136a68b",
          "0xF8D83845DEb59EE43CF012e57731209A472baF8c",
          "0xB7f6618F9E20fb56d5337000a90e540F4005c696",
          "0xCc80f29a7DB70d727a666AE46Cf4CC3179514368",
          "https://proof.xyz/moonbirds/"
      )
      // const moonbirdsInchainRendererContract = moonbirdsInchainRenderer.attach("0xb1bEfc9E7B76C1e846EBBf3e6E1Ab029C86e7435")

      await moonbirdsInchainRendererContract.setProofRegistry("0xBe3163b4B21309b841Fcc36cD1843B72Be357383")
      try {
        const tokenURI = await moonbirdsInchainRendererContract.tokenURI("5")
        console.log(tokenURI);
      } catch (e) {
        console.error(e);
      }
      /*const provider = new ethers.providers.JsonRpcProvider("https://eth.llamarpc.com");
      const receipt = await provider.getTransactionReceipt("0x1c9c50c1f93eb9e95d7eb66808f188f7153066065167d056bfc322f8888978e3");

      // Get contract address from transaction receipt
      const contractAddress = receipt.contractAddress;

      console.log(receipt);
      // Get contract instance using the ABI and contract address
      const contract = new ethers.Contract(contractAddress, [{"inputs":[{"internalType":"contract IMoonbirds","name":"moonbirds_","type":"address"},{"internalType":"contract ProofBackgroundRegistry","name":"registryV1_","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"NotAuthorised","type":"error"},{"inputs":[],"name":"OnlyMoonbirdOwner","type":"error"},{"inputs":[],"name":"RegistryClosed","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":true,"internalType":"uint96","name":"backgroundId","type":"uint96"}],"name":"BackgroundSettingChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"contract IEligibilityConstraint","name":"constraint","type":"address"}],"name":"addNewBackgroundConstraint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"target","type":"address"},{"internalType":"bool","name":"toggle","type":"bool"}],"name":"blockAuthorisation","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"domainSeparator","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"eligibilityConstraints","outputs":[{"internalType":"contract IEligibilityConstraint","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getActiveBackground","outputs":[{"internalType":"uint96","name":"","type":"uint96"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getAllEligibleBackgrounds","outputs":[{"internalType":"uint96[]","name":"","type":"uint96[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getEntry","outputs":[{"components":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint96","name":"backgroundId","type":"uint96"}],"internalType":"struct BackgroundRegistry.RegistryEntry","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getEntryWithFallback","outputs":[{"components":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint96","name":"backgroundId","type":"uint96"}],"internalType":"struct BackgroundRegistry.RegistryEntry","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isOpen","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint96","name":"backgroundId","type":"uint96"}],"name":"isTokenEligibleForBackground","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint96","name":"backgroundId","type":"uint96"},{"internalType":"contract IEligibilityConstraint","name":"constraint","type":"address"}],"name":"setBackgroundConstraint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint96","name":"backgroundId","type":"uint96"}],"internalType":"struct BackgroundRegistry.BackgroundSetting[]","name":"settings","type":"tuple[]"}],"name":"setBackgrounds","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint96","name":"backgroundId","type":"uint96"}],"internalType":"struct BackgroundRegistry.BackgroundSetting[]","name":"settings","type":"tuple[]"},{"internalType":"bytes","name":"signature","type":"bytes"}],"name":"setBackgroundsWithSignature","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"open","type":"bool"}],"name":"setOpen","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"isEnabled","type":"bool"}],"name":"setRegistryV1Fallback","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}], provider);

      // Get transaction data from the receipt
      const transactionData = contract.interface.decodeFunctionData('constructor', receipt.input);

      console.log(transactionData); // This will print the constructor parameters*/

      // const { lock, owner } = await loadFixture(deployOneYearLockFixture);
      //
      // expect(await lock.owner()).to.equal(owner.address);
    });
  });

  /*describe("Withdrawals", function () {
    describe("Validations", function () {
      it("Should revert with the right error if called too soon", async function () {
        const { lock } = await loadFixture(deployOneYearLockFixture);

        await expect(lock.withdraw()).to.be.revertedWith(
          "You can't withdraw yet"
        );
      });

      it("Should revert with the right error if called from another account", async function () {
        const { lock, unlockTime, otherAccount } = await loadFixture(
          deployOneYearLockFixture
        );

        // We can increase the time in Hardhat Network
        await time.increaseTo(unlockTime);

        // We use lock.connect() to send a transaction from another account
        await expect(lock.connect(otherAccount).withdraw()).to.be.revertedWith(
          "You aren't the owner"
        );
      });

      it("Shouldn't fail if the unlockTime has arrived and the owner calls it", async function () {
        const { lock, unlockTime } = await loadFixture(
          deployOneYearLockFixture
        );

        // Transactions are sent using the first signer by default
        await time.increaseTo(unlockTime);

        await expect(lock.withdraw()).not.to.be.reverted;
      });
    });

    describe("Events", function () {
      it("Should emit an event on withdrawals", async function () {
        const { lock, unlockTime, lockedAmount } = await loadFixture(
          deployOneYearLockFixture
        );

        await time.increaseTo(unlockTime);

        await expect(lock.withdraw())
          .to.emit(lock, "Withdrawal")
          .withArgs(lockedAmount, anyValue); // We accept any value as `when` arg
      });
    });

    describe("Transfers", function () {
      it("Should transfer the funds to the owner", async function () {
        const { lock, unlockTime, lockedAmount, owner } = await loadFixture(
          deployOneYearLockFixture
        );

        await time.increaseTo(unlockTime);

        await expect(lock.withdraw()).to.changeEtherBalances(
          [owner, lock],
          [lockedAmount, -lockedAmount]
        );
      });
    });
  });*/
});
