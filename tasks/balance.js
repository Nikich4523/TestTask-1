
module.exports = function () {
    task("balance", "Get given address balance")
    .addParam("address", "The address whose balance you need to find out")
    .setAction(async (taskArgs) => {
        provider = waffle.provider;
        console.log("Баланс:", Number(await provider.getBalance(taskArgs.address)))
    })
};