<p align="center">
  <img src="https://user-images.githubusercontent.com/29287377/170220154-a521b32b-6727-422b-bf69-01b4faaa31da.png" />

  <br />
  <br />

  <a href="https://github.com/karaeren/loa-details/releases/latest">
    <img src="https://img.shields.io/github/downloads/karaeren/loa-details/total?style=for-the-badge" />
  </a>

  <br />

  <img src="https://img.shields.io/github/package-json/v/karaeren/loa-details?style=flat-square" />
</p>

<p align="center">Realtime Cooldown Tracker tool for Lost Ark</p>

![small](https://user-images.githubusercontent.com/29287377/173195460-cf8da1b4-abfa-4ed3-8dec-648eb1ffaf87.png)

<hr />

## About

<p style="margin-left: 16px; margin-top: 16px" class="text-body1">
LOA Cooldown Tracker allows you to track cooldowns of player skills of the game Lost Ark.
<br />
<br />
It relies on the logging capabilities of the open-source software
<a href="https://github.com/shalzuth/LostArkLogger" class="custom-link" >LostArkLogger</a> and the modified version of the logger's source code can be found <a href="https://github.com/karaeren/LostArkLogger" class="custom-link">here</a>.
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

## To build for development

- **in a terminal window** -> **Run as Administrator**

The application code is managed by `src-tauri/main.rs`. \ 
In this sample, the app runs with a simple Angular App (http://localhost:4200), and a webView managed by Tauri.

1. Download and replace `dps.exe` inside `src-tauri/assets` from [LostArkLogger releases](https://github.com/shalzuth/LostArkLogger/releases) if outdated  
2. Open up terminal as admin   
3. Open up Lost Ark  
4. `npm run tauri:serve`  
  
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

# Technologies 

[![Angular Logo](https://www.vectorlogo.zone/logos/angular/angular-icon.svg)](https://angular.io/) <img src="https://raw.githubusercontent.com/gilbarbara/logos/master/logos/tauri.svg" width="50">

- Angular v13.2.4
- Tauri 1.0.4
