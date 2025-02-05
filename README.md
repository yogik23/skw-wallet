# Auto Create Wallet

## Fitur Autobot
- Auto Create Wallet Solana dan ETH/EVM


## Step RUN

1. Clone repo dan masuk ke folder
    ```
    git clone https://github.com/yogik23/skw-wallet
    ```
2. Pilih Wallet yg ingin dibuat
    ```
    cd skw-wallet/evm
    ```
    ```
    cd skw-wallet/sol
    ```

3. Install Module
    ```
    npm install
    ```
4. Jalankan bot sesuia file yg diperlukan \
    File wallet .txt
    ```
    node main.js
    ```
    File wallet .json
    ```
    node wallet.js
    ```

5. Jika ingin mendowload Privatekey atau address bisa gunakan
    ```
    scp user@your_vps_ip:/path/to/remote/file /path/to/local/destination
    ```
    Contoh ingin mendownload ke folder D:
    ```
    scp root@12.123.14.123:skw-wallet/evm/addresses.txt D:\
    ```

**Sodah kerjekan mun sian botnye**
