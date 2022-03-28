
module.exports = function () {
    task("getSumOfDonates", "Get sum of donation from given address")
    .addParam("address", "The address whose donation sum you need to find out")
    .setAction(async (taskArgs) => {
        const DonationsContractFactory = await ethers.getContractFactory("DonationsContract");
        const DonationsContract = await DonationsContractFactory.attach("0xEA2ca2a7f7a5f3E4C1ca39578B2DB1f96D7b1bae");

        let sumOfDonates = Number(await DonationsContract.GetSumOfDonates(taskArgs.address));
        console.log(`С адреса ${taskArgs.address} было пожертвовано ${sumOfDonates}.`);
    })
};
