import fs from 'fs';
import bip39 from 'bip39';
import { derivePath } from 'ed25519-hd-key';
import { Ed25519PrivateKey, Account, Hex } from '@aptos-labs/ts-sdk';

function getPrivateKeyFromMnemonic(mnemonic) {
  if (!bip39.validateMnemonic(mnemonic)) {
    throw new Error(`❌ Mnemonic tidak valid: ${mnemonic}`);
  }

  const seed = bip39.mnemonicToSeedSync(mnemonic);
  const derivationPath = "m/44'/637'/0'/0'/0'";
  const { key } = derivePath(derivationPath, seed.toString('hex'));

  const privateKeyHex = '0x' + Buffer.from(key).toString('hex');
  const privateKey = new Ed25519PrivateKey(Hex.fromHexString(privateKeyHex).toUint8Array());
  const account = Account.fromPrivateKey({ privateKey });

  return { privateKeyHex, address: account.accountAddress.toString() };
}

function processSeedFile() {
  const seeds = fs.readFileSync('seed.txt', 'utf-8').split('\n').filter(Boolean);

  const output = [];

  for (const mnemonic of seeds) {
    try {
      const { privateKeyHex, address } = getPrivateKeyFromMnemonic(mnemonic.trim());
      console.log(`✅ ${address} - ${privateKeyHex}`);
      output.push(`${privateKeyHex}`);
    } catch (err) {
      console.error(err.message);
    }
  }

  fs.writeFileSync('key.txt', output.join('\n'));
  console.log('🔒 Semua private key telah disimpan di key.txt');
}

processSeedFile();
