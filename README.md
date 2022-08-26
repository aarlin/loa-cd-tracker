# Lost Ark Cooldown Tracker

# Technologies 

[![Angular Logo](https://www.vectorlogo.zone/logos/angular/angular-icon.svg)](https://angular.io/) <img src="https://raw.githubusercontent.com/gilbarbara/logos/master/logos/tauri.svg" width="50">

- Angular v13.2.4
- Tauri 1.0.4

## Getting Started

*Clone this repository locally:*

``` bash
git clone https://github.com/maximegris/angular-tauri.git
```

*Install Tauri (Rust)*

Install Rust through [Rustup](https://rustup.rs/)  

*Install dependencies with npm:*

``` bash
npm install
```

If you want to generate Angular components with Angular-cli , you **MUST** install `@angular/cli` in npm global context.
Please follow [Angular-cli documentation](https://github.com/angular/angular-cli) if you had installed a previous version of `angular-cli`.

``` bash
npm install -g @angular/cli
```

## To build for development

- **in a terminal window** -> npm start

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

## Browser mode

Maybe you only want to execute the application in the browser with hot reload? Just run `npm run web:serve`.

## Included Commands

| Command                 | Description                                                                                           |
|-------------------------|-------------------------------------------------------------------------------------------------------|
| `npm run web:serve`     | Execute the app in the web browser (DEV mode)                                                         |
| `npm run web:prod`      | Build the app that can be used directly in the web browser. Your built files are in the /dist folder. |
| `npm run tauri:bundle`  | Builds your application and creates an app consumable based on your operating system                  |

**Your application is optimised. Only /dist folder is included in the final bundle.**
