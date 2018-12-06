# EasyBlocks4Kids
Johnny-five blockly visual programming environment for roboticcs & sensors <br/>
<br/>
Arduino en Raspberry Pi visueel programmering robotten met #easylab4kids <br/>
<br/>
Wat nog meer?<br/>
- Het jy 'n kat? Dan kan jy sy ete laat doseer.<br/>
- 'n Diefalarm wat berigte stuur wanneer 'n boosdoener in jou huis kom.<br/>
- Jou waterkultuur die grondwater monitor.<br/>
- Een robot bou wat slim op planeet Mars gaan rondry.<br/>
- Visueel programmering vir microcontrollers soos Arduino, Raspberry Pi en BBC Microbit.<br/>
- Support vir tientalle sensore en skerms.<br/>
<br/>
<img src="https://i.imgur.com/MOH3DSb.png"><br/>
<br/>
Hoe dan?<br/>
Deur 'n computer program te skryf. Geen ervaring vereist. Jy gebruik "bakstene" om 'n program te bou.<br/>
Wat as jy nie kan programmeer? Dan volg jy lekker gemaklik die online youtube lesse.<br/>
<br/>

Kom ons neem 'n voorbeeld
---
Stel jy wil.. 'n boefalarm maak, wat ook nog 'n hond uit sy hok loslaat. Dan bou jy die app en wag op 'n sein, wanneer die boef errens langs loop waar hy nie mag, dan voer jy die boeg aan jou troue kameraad Boelie.

<img src="https://i.imgur.com/0XcwCbd.png" width="90%" height="90%" alt="EasyBlocks4Kids alarm met servo"><br/>
<br/>

Auteur en bydraes
---
***Ontwikkelaar*** Michiel Erasmus  thebapodcast@gmail.com  en  https://www.linkedin.com/in/michielerasmus/

Installasie vereistes
---
**Kinders programmering**: GEEN vereistes. Website is 100% HTML/Javascript.<br/>
**Ontwikkelaar**: Google Closure biblioteek en Python 2.7<br/>
**Robot/sensore gebruiker**: NodeJS en johnny-five <br/>


Installasie stappenplan
---
**Stap 1:** Download die frontend applikasie
```
git clone http://github.com/pappavis/EasyBlocks4Kids
```
**Stap 2:** Open bestand .\EasyBlocks4Kids\apps\easyblocks\index.html<br/>
**Stap 3:** Kliek en sleep jouw programma aan elkaar.<br/>
**Stap 3:** Kies *Uitvoeren* om die program na jou microcontroller te upload<br/>
<br/>
Voorbeeld EasyBlocks applikasie;<br/>
<img src="https://i.imgur.com/zrBxmlm.png" width="80%" hight="80%"><br/>

Welke soort gebruiker is jy?
---
[1. Ek wil kyk wat ek hiermee kan] <br/>
Download die applikasie en open .\EasyBlocks4Kids\apps\easyblocks\index.html <br/>
<br/>
[2. Domotica potplante water gee] <br/>
Download die applikasie en open .\EasyBlocks4Kids\apps\easyblocks\index.html <br/>
Bou jou applikasie met EasyBlocks na wense -- gebruik servo's ;) <br/>
Sorg dat NodeJS en johnny-five geïstalleerd is <br/>
Loop die adie EasyServer, of laat die kode uitvoer met node. <br/>
 <br/>
[3. Arduino robotmotor] <br/>
Download die applikasie en open .\EasyBlocks4Kids\apps\easyblocks\index.html <br/>
Bou jou applikasie met EasyBlocks na wense -- gebruik motorjes's ;) <br/>

Hoe werk EasyBlocks4Kids?
---
Jy laai die webpagina op http://erasmus-ict.nl/easylab4kids en sleep dan jou program aanmekaar.<br/>
Vervolgens upload jy die program na jou Arduino of ander beheerder en waardeer die eindresultaat.<br/>
<br/>
Met één muiskliek jouw code of op BBC Microbit, of op een EasyLab arduino draai. So *maklik*!! :)<br/>
Jy hoeft werklikwaar géén kode te herskryf. Eenmaal jou program met blokke gebou en hy is klaar vir elke ander gesupport platform. <br/>
Die backend code is *Javascript* dus elke Jan en sy maat kan dit lees en debug.<br/>

EasyBlocks4Kids support
---
##Sensore##
 - Alle bekende en onbekende sensoren, soos HC-SR401 sonar, buzzers, L293D motor, LCD en LED Matrix skerms.
 
##Microcontrollers en platforms##
 - Heel veel soos Arduino, Raspberry Pi, BBC Microbit, Tessel en veel meer!!

Installasie vereistes
---
1. Kinders programmering: GEEN vereistes. Website is 100% HTML/Javascript.<br/>
2. Ontwikkelaar: Google Closure biblioteek en Python 2.7<br/>
3. Robot/sensore gebruiker: NodeJS en johnny-five<br/>

Snelstart
---
1. Maak lokaal 'n map aan byvb
```
MacBook$ mkdir ~/EasyLab4Kids
```

```
MacBook$ cd ~/EasyLab4Kids
```

2. Download en installeer *Google Closure Library* 
```
git clone https://github.com/google/closure-library
```

3. Download die EasyBlocks4Kids web applikasie
```
git clone http://github.com/pappavis/EasyBlocks4Kids
```
4. Open bestand ./EasyBlocks4Kids/apps/easyblocks/index.html
5. Kliek en sleep jouw programma aan elkaar.
6. Kies *Uitvoeren* om die program na jou microcontroller te upload

Recompile
---
Sorg dat jy jouw internet wel werk. 
Om EasyBlocks4Kids te recompile doen die volgende;

1. Open 'n kommando reël win Windows|Mac|Raspberry Pi|Linux.
2. Navigeer na die map waar EasyBlocks4Kids geïnstalleerd is;

```
MacBook$ cd ~/EasyLab4Kids/EasyBlocks4Kids
```

3. Gebruik python om te recompile

```
MacBook$ python ./build.py
```
<img src="https://i.imgur.com/MNYVrBk.png" width="50%" height="50%">

Produksie omgeving
---
Live site kyk op http://easylab4kids.nl/easyblocks4kids

Online lesse
---
Besoek my youtube kanaal om lesse te volg https://www.youtube.com/watch?v=GjrgqvBUXg0<br/>
[![Robotmotor met EasyLab](https://img.youtube.com/vi/GjrgqvBUXg0/0.jpg)](https://www.youtube.com/watch?v=GjrgqvBUXg0)<br/>

Vrae?
---
* Kontak Michiel Erasmus op theBApodcast@gmail.com
* Voorbeelde op https://www.facebook.com/EasyBlocks4Kids/ <br/>

<br/>
Vryheid + voorspoed + taal = Zuid-Afrikaanse Republiek Kaapland op http://afrikanersociety.org<br/>
<br/>
#easylab4kids #arduinorobot #erasmus-ict #easyblocks4kids<br/>
