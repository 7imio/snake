import { UIKeyboardAction } from "./inputs";

export enum UIInputMode {
  Gameplay = "gameplay",
  Menu = "menu",
  Paused = "paused",
  GameOver = "game-over",
}

export type UIKeyboardCallbacks = {
  onTogglePause: () => void;
  onOpenMenu: () => void;
  onNavigate: (direction: -1 | 1) => void;
}

export class UIKeyboardInput {

  private active: boolean = false;

  private keyMap: Record<string, UIKeyboardAction> = {
    ArrowUp: UIKeyboardAction.Up,
    ArrowDown: UIKeyboardAction.Down,
    m: UIKeyboardAction.Menu,
    Escape: UIKeyboardAction.Pause
  };

  private callbacks: UIKeyboardCallbacks | null = null;

  constructor(callbacks: UIKeyboardCallbacks){
    this.callbacks = callbacks;
  }

  private readonly onKeyDown = (event: KeyboardEvent):void => {
    const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
    const action = this.keyMap[key];
    if (action === undefined) return;
    if (!this.callbacks) return;

    if (!this.active || event.repeat) return;
    if (event.ctrlKey || event.altKey || event.metaKey) return;

    switch (action) {
      case UIKeyboardAction.Up:
        this.callbacks.onNavigate(-1);
        break;
      case UIKeyboardAction.Down:
        this.callbacks.onNavigate(1);
        break;
      case UIKeyboardAction.Menu:
        this.callbacks.onOpenMenu();
        break;
      case UIKeyboardAction.Pause:
        this.callbacks.onTogglePause();
        break;
    }
  }

  public attach(){
    this.detach();
    this.active = true;
    window.addEventListener("keydown", this.onKeyDown);
  }
  public detach (){
    this.active = false;
    window.removeEventListener("keydown", this.onKeyDown);
  }

  public start(){}
  public stop(){}
} 