const { Keypair } = require('@solana/web3.js');
const fs = require('fs');
const bs58 = require('bs58');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function createWallet() {
    const wallet = Keypair.generate();
    return {
        publicKey: wallet.publicKey.toBase58(),
        secretKey: bs58.encode(wallet.secretKey) 
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

    const publicKeys = wallets.map(wallet => wallet.publicKey);
    const secretKeys = wallets.map(wallet => wallet.secretKey);

    fs.writeFileSync('public_keys.json', JSON.stringify(publicKeys, null, 2));
    console.log('Public keys disimpan di public_keys.json');

    fs.writeFileSync('privatekeys.json', JSON.stringify(secretKeys, null, 2));
    console.log('Secret keys disimpan di secret_keys.json');

    rl.close();
});
