declare module 'gameboy' {
  interface GameBoyPlayerOptions {
    mediaStreamWorkerSrc: string
    soundVolume: number
  }

  interface GameBoyCore {
    name: string | null
    reset(): void
  }

  export default class GameBoyPlayer {
    core: GameBoyCore
    runInterval?: number
    constructor(HTMLCanvasElement, GameBoyPlayerOptions)
    openROM(romFile: string): Promise<void>
    saveROM(name: string, romFile: string): Promise<void>
    loadROM(name: string): Promise<string>
    loadSRAM(name: string): Promise<ArrayBufferLike>
    saveSRAM(name: string, data: Uint8Array | number[]): Promise<void>
    getStorageKeys(): Promise<string[]>
    start(): void
    pause(): Promise<void>
    run(): void
    resume(freeze: string): void
    setVolume(volume: number): void
    buttonDown(button: string): void
    buttonUp(button: string): void
    autoFreeze(): Promise<void>
    loadFreeze(key: string): Promise<string>
    loadFreezeScreen(key: string): Promise<ImageData>
  }
}

declare module 'svg-to-image' {
  export default function svgToImage(
    svg: string,
    callback: (err: Error, image: HTMLImageElement) => void
  ): void
}
