const Web3 = require('web3').default;
const readline = require('readline');
const fs = require('fs');

const web3 = new Web3();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function createWallet() {
    const wallet = web3.eth.accounts.create();
    return {
        address: wallet.address,
        privateKey: wallet.privateKey
    };
}

function createMultipleWallets(num) {
    const wallets = [];
    for (let i = 0; i < num; i++) {
        wallets.push(createWallet());
    }
    return wallets;
}

rl.question('Berapa banyak wallet yang ingin Anda buat? ', (answer) => {
    const numberOfWallets = parseInt(answer, 10);
    
    if (isNaN(numberOfWallets) || numberOfWallets <= 0) {
        console.log('Silakan masukkan jumlah yang valid.');
        rl.close();
        return;
    }

    const wallets = createMultipleWallets(numberOfWallets);

    rl.question('Pilih penyimpan address dan private key:\n1. Dipisah\n2. Digabung\n3. Keduanya\nMasukkan pilihan (1/2/3): ', (choice) => {
        const selectedOption = parseInt(choice, 10);

        if (selectedOption === 1) {
            const addresses = wallets.map(wallet => wallet.address);
            const privateKeys = wallets.map(wallet => wallet.privateKey);

            fs.writeFileSync('addresses.json', JSON.stringify(addresses, null, 2));
            console.log('Addresses disimpan di addresses.json');

            fs.writeFileSync('private_keys.json', JSON.stringify(privateKeys, null, 2));
            console.log('Private keys disimpan di private_keys.json');

        } else if (selectedOption === 2) {
            const combined = wallets.map(wallet => ({
                address: wallet.address,
                privateKey: wallet.privateKey
            }));

            fs.writeFileSync('combined_wallets.json', JSON.stringify(combined, null, 2));
            console.log('Addresses dan Private keys disimpan di combined_wallets.json');

        } else if (selectedOption === 3) {
            const addresses = wallets.map(wallet => wallet.address);
            const privateKeys = wallets.map(wallet => wallet.privateKey);

            fs.writeFileSync('addresses.json', JSON.stringify(addresses, null, 2));
            console.log('Addresses disimpan di addresses.json');

            fs.writeFileSync('private_keys.json', JSON.stringify(privateKeys, null, 2));
            console.log('Private keys disimpan di private_keys.json');

            const combined = wallets.map(wallet => ({
                address: wallet.address,
                privateKey: wallet.privateKey
            }));

            fs.writeFileSync('combined_wallets.json', JSON.stringify(combined, null, 2));
            console.log('Addresses dan Private keys disimpan di combined_wallets.json');

        } else {
            console.log('Pilihan tidak valid. Silakan jalankan ulang program.');
        }

        rl.close();
    });
});