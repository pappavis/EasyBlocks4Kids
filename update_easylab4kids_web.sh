#!/bin/bash
echo "EasyLab4Kids lokale webwerf wordt bygewerkt"
sudo rm -rf /var/www/html/easylab4kids/
sudo cp -R /home/michiele/Programmering/GoogleBlocklyPlatform/erasmus-ict/EasyBlocks4Kids/ /var/www/html/easylab4kids/
sudo cp -R /home/michiele/Programmering/GoogleBlocklyPlatform/erasmus-ict/EasyBlocks4Kids/apps/easyblocks/index.html /var/www/html/easylab4kids/apps/easyblocks
sudo rm -rf /var/www/html/easylab4kids/*.7z
sudo chown -R www-data /var/www/html/easylab4kids
