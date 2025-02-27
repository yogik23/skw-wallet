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

    rl.question('Pilih penyimpan public key dan secret key:\n1. Dipisah\n2. Digabung\n3. Keduanya\nMasukkan pilihan (1/2/3): ', (choice) => {
        const selectedOption = parseInt(choice, 10);

        if (selectedOption === 1) {
            const publicKeys = wallets.map(wallet => wallet.publicKey);
            const secretKeys = wallets.map(wallet => wallet.secretKey);

            fs.writeFileSync('public_keys.json', JSON.stringify(publicKeys, null, 2));
            console.log('Public keys disimpan di public_keys.json');

            fs.writeFileSync('private_keys.json', JSON.stringify(secretKeys, null, 2));
            console.log('Secret keys disimpan di private_keys.json');

        } else if (selectedOption === 2) {
            const combined = wallets.map(wallet => ({
                publicKey: wallet.publicKey,
                secretKey: wallet.secretKey
            }));

            fs.writeFileSync('combined_wallets.json', JSON.stringify(combined, null, 2));
            console.log('Public keys dan Secret keys disimpan di combined_wallets.json');

        } else if (selectedOption === 3) {
            const publicKeys = wallets.map(wallet => wallet.publicKey);
            const secretKeys = wallets.map(wallet => wallet.secretKey);

            fs.writeFileSync('public_keys.json', JSON.stringify(publicKeys, null, 2));
            console.log('Public keys disimpan di public_keys.json');

            fs.writeFileSync('private_keys.json', JSON.stringify(secretKeys, null, 2));
            console.log('Secret keys disimpan di private_keys.json');

            const combined = wallets.map(wallet => ({
                publicKey: wallet.publicKey,
                secretKey: wallet.secretKey
            }));

            fs.writeFileSync('combined_wallets.json', JSON.stringify(combined, null, 2));
            console.log('Public keys dan Secret keys disimpan di combined_wallets.json');

        } else {
            console.log('Pilihan tidak valid. Silakan jalankan ulang program.');
        }

        rl.close();
    });
});
