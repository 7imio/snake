export class GameLoop {
  private running: boolean = false;
  private tickIntervalMs: number; // Interval between ticks in milliseconds
  private accumulator: number = 0; // Time accumulated since the last tick in milliseconds

  private lastTime: number | null = null; // last frame timestamp in milliseconds

  private frameId: number | null = null; // requestAnimationFrame ID
  private fps: number = 0;

  private onTick: (() => void); // callback for each loop iteration


  constructor(tickIntervalMs: number, onTick: () => void) {
    if (!isFinite(tickIntervalMs) || tickIntervalMs <= 0) throw new Error("tickIntervalMs must be a finite number");
    this.tickIntervalMs = tickIntervalMs < 50 ? 50 : tickIntervalMs;
    this.onTick = onTick;
  }

  /**
   * Handles a single frame of the game loop.
   * Calculates elapsed time, updates ticks, and calls the frame loop callback.
   * @param timestamp The current time in milliseconds provided by requestAnimationFrame.
   */
  private frame = (timestamp: number): void => {
    if (!this.running) return;
    if (this.lastTime === null) this.lastTime = timestamp; //initialize

    // check delta and set accumulator
    const deltatime = timestamp - this.lastTime;
    const cappedDelta: number = Math.min(deltatime, 250);
    this.lastTime = timestamp;
    this.accumulator += cappedDelta;

    // if accumulator reach the tick interval, update tick
    while (this.running && this.accumulator >= this.tickIntervalMs) {
      this.accumulator -= this.tickIntervalMs;
      this.onTick();
    }

    // update fps display
    if (deltatime > 0) {
      const displayedFps = Math.floor(1000 / deltatime);
      this.fps = displayedFps;
    }

    // loop for the next frame
    if (this.running) this.frameId = requestAnimationFrame(this.frame);
  };

/**
 * Starts the game loop.
 * Initializes timing variables and begins the frame loop.
 * @returns 
 */
  public start() {
    if (this.running) return;
    this.running = true;

    this.lastTime = null; // reset lastTime when starting the loop
    this.accumulator = 0; // reset accumulator when starting the loop

    this.frame(performance.now());
  }
  public stop() {
    if (!this.running) return;
    this.running = false;
    if (this.frameId !== null) {
      cancelAnimationFrame(this.frameId);
      this.frameId = null;
    }
  }

  public getFps() {
    return this.fps;
  }
}
