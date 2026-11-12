import { type InputController } from "./InputController";
import { InputDirection } from "./inputDirections";

export class KeyboardInput {
  private inputController: InputController | null = null;

  private keyMap: Record<string, InputDirection> = {
    // Arrow keys
    ArrowUp: InputDirection.Up,
    ArrowDown: InputDirection.Down,
    ArrowLeft: InputDirection.Left,
    ArrowRight: InputDirection.Right,

    // AZERTY + QWERTY
    z: InputDirection.Up,
    w: InputDirection.Up,
    s: InputDirection.Down,
    q: InputDirection.Left,
    a: InputDirection.Left,
    d: InputDirection.Right,

    // Alternative layout
    o: InputDirection.Up,
    l: InputDirection.Down,
    k: InputDirection.Left,
    ';': InputDirection.Right,
    m: InputDirection.Right,
  };

  private active: boolean = false;

  private readonly onKeyDown = (event: KeyboardEvent): void => {
    if (event.repeat) return;
    this.listenKeyPress(event);
  };

  public attach(InputController: InputController) {
    this.detach();

    this.inputController = InputController;
    this.active = true;

    window.addEventListener('keydown', this.onKeyDown);
  }

  public detach() {
    this.inputController = null;
    this.active = false;

    window.removeEventListener('keydown', this.onKeyDown);
  }

  public handleKeyPress(key: string): void {
    if (!this.active || this.inputController === null) return;

    const direction = this.keyMap[key];
    if (direction !== undefined) {
      this.inputController.addDirectionToBuffer(direction);
    }
  }

  private listenKeyPress(event: KeyboardEvent): void {
    if (!this.active || !this.inputController?.isActive()) return;

    // Do not intercept browser shortcuts.
    if (event.ctrlKey || event.altKey || event.metaKey) return;

    // Do not intercept typing in editable elements.
    const target = event.target;

    if (
      target instanceof HTMLElement &&
      (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))
    ) {
      return;
    }

    // Keep arrow names unchanged, normalize letters.
    const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;

    if (this.keyMap[key] === undefined) return;

    event.preventDefault();
    this.handleKeyPress(key);
  }
}