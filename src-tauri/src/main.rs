#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

#[tauri::command]
async fn hello_world_command(_app: tauri::AppHandle) -> Result<String, String> {
  println!("I was invoked from JS!");
  Ok("Hello world from Tauri!".into())
}

use tauri::{
  api::process::{Command, CommandEvent},
  Manager,
};

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![hello_world_command])
    .setup(move |app| {
      let window = app.get_window("main").unwrap();
      let script_path = app
        .path_resolver()
        .resolve_resource("assets/http-bridge.js")
        .unwrap()
        .to_string_lossy()
        .to_string();
      tauri::async_runtime::spawn(async move {
        let (mut rx, _child) = Command::new("node")
          .args(&[script_path])
          .spawn()
          .expect("Failed to spawn node");

        #[allow(clippy::collapsible_match)]
        while let Some(event) = rx.recv().await {
          if let CommandEvent::Stdout(line) = event {
            window
              .emit("message", Some(format!("'{}'", line)))
              .expect("failed to emit event");
          }
        }
      });

      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
