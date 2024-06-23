## to-do-app
A To-Do app created using NextJS 14 and PocketBase

## Usage
1. Download [Pocketbase](https://pocketbase.io/docs/)

2. Navigate to the unzipped directory cd pocketbase_0.22.14_darwin_arm64

3. If you are using an M1 Pro Mac (like me), you will need to open the executable by using Ctrl + Click. This informs your Mac that you trust this app.

4. Start Pocketbase in the downloaded folder: ./pocketbase serve

5. Open the Admin UI, create collection, and update security rules to allow read/write access.

6. Add experimental: { appDir: true } to next.config.js

## Credits
This repository is inspired by Fireship's [Next 13 Pocketbase Demo](https://github.com/fireship-io/next13-pocketbase-demo).