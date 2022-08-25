import { Injectable } from '@angular/core';
import { Command } from '@tauri-apps/api/shell';

@Injectable({
  providedIn: 'root'
})
export class HttpBridgeService {

  constructor() { }

  async setupBridge() {
    console.log('setupBridge invoked')
    const command = Command.sidecar("../../../../src-tauri/assets/ae92984b-6f1b-4b0d-ad31-504e1905d5e6.exe", 
      ["--UseNpcap", "--Port 55553"])
    command.stdout.on("data", (data: any) => console.log(data))
    command.stderr.on("data", (data: any) => console.log(data))
    command.on("error", (data: any) => console.log(data))
    command.on("close", (data: any) => console.log(data))
    const child = await command.spawn()
    console.log(child.pid)
    await child.write("echo 'let x: number = 1'")
  }

}
