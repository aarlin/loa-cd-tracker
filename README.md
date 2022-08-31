<p align="center">
  <img src="https://user-images.githubusercontent.com/5667435/187566448-92afef6a-0a07-4d7f-be14-f1523095c573.png" />
  <p align="center">Realtime Cooldown Tracker tool for Lost Ark</p>

  <br />
  <br />

  <a href="https://github.com/karaeren/loa-cd-tracker/releases/latest">
    <img src="https://img.shields.io/github/downloads/aarlin/loa-cd-tracker/total?style=for-the-badge" />
  </a>

  <br />

  <!-- <img src="https://img.shields.io/github/package-json/v/karaeren/loa-details?style=flat-square" /> -->
</p>

![small](https://user-images.githubusercontent.com/5667435/187566044-e150408b-4d5d-4bec-b8b8-211f1dfaf1d1.png)

<hr />

## About

<p style="margin-left: 16px; margin-top: 16px" class="text-body1">
LOA Cooldown Tracker allows you to track cooldowns of player skills of the game Lost Ark.
<br />
<br />
It relies on the logging capabilities of the open-source software
<a href="https://github.com/shalzuth/LostArkLogger" class="custom-link" >LostArkLogger</a> and the modified version of the logger's source code can be found <a href="https://github.com/karaeren/LostArkLogger" class="custom-link">here</a>.
<br/>
<br/>
It also uses <a href="https://github.com/karaeren/loa-details-log-parser" class="custom-link">Loa Details Log Parser</a> library to generate parsed packet data through console log
</p>

## Getting Started

*Clone this repository locally:*

``` bash
git clone https://github.com/aarlin/loa-cd-tracker.git
```

*Install Tauri (Rust)*

- Install Rust through [Rustup](https://rustup.rs/)  

*Install dependencies with npm:*

``` bash
npm install
```

``` bash
npm install -g @angular/cli
```

## Run locally for development

1. Download and replace `dps.exe` inside `src-tauri/assets` from [LostArkLogger releases](https://github.com/shalzuth/LostArkLogger/releases) if outdated  
2. Open up Lost Ark  

3. **Open up a terminal window** -> **Run as Administrator**
4. `npm run tauri:serve`  

## Installing release build

1. Go through the installer after running .exe build file
2. Run application installed **as administrator**
 
## Project structure

| Folder    | Description                                   |
|-----------|-----------------------------------------------|
| src-tauri | Tauri main process folder (Rust)              |
| src       | Tauri renderer process folder (Web / Angular) |

## Included Commands

| Command                 | Description                                                                                           |
|-------------------------|-------------------------------------------------------------------------------------------------------|
| `npm run web:serve`     | Execute the app in the web browser (DEV mode)                                                         |
| `npm run web:prod`      | Build the app that can be used directly in the web browser. Your built files are in the /dist folder. |
| `npm run tauri:bundle`  | Builds your application and creates an app consumable based on your operating system                  |

**Your application is optimised. Only /dist folder is included in the final bundle.**

## Technologies 

[![Angular Logo](https://www.vectorlogo.zone/logos/angular/angular-icon.svg)](https://angular.io/) <img src="https://raw.githubusercontent.com/gilbarbara/logos/master/logos/tauri.svg" width="50">

- Angular v13.2.4
- Tauri 1.0.4

## Features To Add

- Transformation skill set swap
- Apply cooldown multiplier from swiftness stat
- Remove auto attacks
