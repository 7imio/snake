// import { beforeEach, describe, expect, it } from 'vitest';
// import { InputController, InputDirection } from './InputController';

// describe('InputController', () => {
//   let controller: InputController;

//   beforeEach(() => {
//     controller = new InputController();
//   });

//   describe('initial state and starting a game', () => {
//     it('starts inactive without a direction or queued inputs', () => {
//       expect(controller.isActive()).toBe(false);
//       expect(controller.getCurrentDirection()).toBeNull();
//       expect(controller.getDirectionBuffer()).toEqual([]);
//     });

//     it('starts a new game with the requested direction', () => {
//       controller.start(InputDirection.Right);

//       expect(controller.isActive()).toBe(true);
//       expect(controller.getCurrentDirection()).toBe(InputDirection.Right);
//       expect(controller.getDirectionBuffer()).toEqual([]);
//     });

//     it('discards previously queued inputs when starting a new game', () => {
//       controller.start(InputDirection.Right);
//       controller.addDirectionToBuffer(InputDirection.Up);

//       controller.start(InputDirection.Left);

//       expect(controller.isActive()).toBe(true);
//       expect(controller.getCurrentDirection()).toBe(InputDirection.Left);
//       expect(controller.getDirectionBuffer()).toEqual([]);
//     });

//     it('refuses direction inputs before a game has started', () => {
//       expect(controller.addDirectionToBuffer(InputDirection.Up)).toBe(false);
//       expect(controller.getDirectionBuffer()).toEqual([]);
//     });
//   });

//   describe('input validation', () => {
//     beforeEach(() => {
//       controller.start(InputDirection.Right);
//     });

//     it('accepts a perpendicular turn', () => {
//       expect(controller.addDirectionToBuffer(InputDirection.Up)).toBe(true);
//       expect(controller.getDirectionBuffer()).toEqual([InputDirection.Up]);
//     });

//     it('rejects a direct 180-degree turn', () => {
//       expect(controller.addDirectionToBuffer(InputDirection.Left)).toBe(false);
//       expect(controller.getDirectionBuffer()).toEqual([]);
//     });

//     it('rejects a duplicate of the current direction', () => {
//       expect(controller.addDirectionToBuffer(InputDirection.Right)).toBe(false);
//       expect(controller.getDirectionBuffer()).toEqual([]);
//     });

//     it('accepts a second turn based on the last buffered direction', () => {
//       expect(controller.addDirectionToBuffer(InputDirection.Up)).toBe(true);
//       expect(controller.addDirectionToBuffer(InputDirection.Left)).toBe(true);
//       expect(controller.getDirectionBuffer()).toEqual([
//         InputDirection.Up,
//         InputDirection.Left,
//       ]);
//     });

//     it('rejects a reverse turn relative to the last buffered direction', () => {
//       controller.addDirectionToBuffer(InputDirection.Up);

//       expect(controller.addDirectionToBuffer(InputDirection.Down)).toBe(false);
//       expect(controller.getDirectionBuffer()).toEqual([InputDirection.Up]);
//     });

//     it('rejects a duplicate of the last buffered direction', () => {
//       controller.addDirectionToBuffer(InputDirection.Up);

//       expect(controller.addDirectionToBuffer(InputDirection.Up)).toBe(false);
//       expect(controller.getDirectionBuffer()).toEqual([InputDirection.Up]);
//     });

//     it('allows returning to the initial direction after a valid turn', () => {
//       controller.addDirectionToBuffer(InputDirection.Up);

//       expect(controller.addDirectionToBuffer(InputDirection.Right)).toBe(true);
//       expect(controller.getDirectionBuffer()).toEqual([
//         InputDirection.Up,
//         InputDirection.Right,
//       ]);
//     });

//     it('never queues more than two directions', () => {
//       controller.addDirectionToBuffer(InputDirection.Up);
//       controller.addDirectionToBuffer(InputDirection.Left);

//       expect(controller.addDirectionToBuffer(InputDirection.Down)).toBe(false);
//       expect(controller.getDirectionBuffer()).toEqual([
//         InputDirection.Up,
//         InputDirection.Left,
//       ]);
//     });

//     it('returns a copy of the buffer, not the internal array', () => {
//       controller.addDirectionToBuffer(InputDirection.Up);
//       const externalBuffer = controller.getDirectionBuffer();
//       externalBuffer.push(InputDirection.Left, InputDirection.Down);

//       expect(controller.getDirectionBuffer()).toEqual([InputDirection.Up]);
//     });
//   });

//   describe('consuming commands', () => {
//     beforeEach(() => {
//       controller.start(InputDirection.Right);
//     });

//     it('consumes exactly one direction per tick, in FIFO order', () => {
//       controller.addDirectionToBuffer(InputDirection.Up);
//       controller.addDirectionToBuffer(InputDirection.Left);

//       expect(controller.consumeNextDirection()).toBe(InputDirection.Up);
//       expect(controller.getDirectionBuffer()).toEqual([InputDirection.Left]);

//       expect(controller.consumeNextDirection()).toBe(InputDirection.Left);
//       expect(controller.getDirectionBuffer()).toEqual([]);
//     });

//     it('keeps the current direction when the buffer is empty', () => {
//       expect(controller.consumeNextDirection()).toBe(InputDirection.Right);
//       expect(controller.getCurrentDirection()).toBe(InputDirection.Right);
//     });

//     it('does not mistake numeric enum value Up (0) for null', () => {
//       controller.addDirectionToBuffer(InputDirection.Up);

//       expect(controller.consumeNextDirection()).toBe(InputDirection.Up);
//       expect(controller.getCurrentDirection()).toBe(InputDirection.Up);
//     });

//     it('accepts new inputs after consuming an existing queued direction', () => {
//       controller.addDirectionToBuffer(InputDirection.Up);
//       controller.addDirectionToBuffer(InputDirection.Left);
//       controller.consumeNextDirection();

//       expect(controller.addDirectionToBuffer(InputDirection.Down)).toBe(true);
//       expect(controller.getDirectionBuffer()).toEqual([
//         InputDirection.Left,
//         InputDirection.Down,
//       ]);
//     });
//   });

//   describe('pause, resume and reset', () => {
//     beforeEach(() => {
//       controller.start(InputDirection.Right);
//     });

//     it('pauses without losing the current direction and clears pending inputs', () => {
//       controller.addDirectionToBuffer(InputDirection.Up);
//       controller.pause();

//       expect(controller.isActive()).toBe(false);
//       expect(controller.getCurrentDirection()).toBe(InputDirection.Right);
//       expect(controller.getDirectionBuffer()).toEqual([]);
//     });

//     it('ignores new inputs and does not consume movement while paused', () => {
//       controller.pause();

//       expect(controller.addDirectionToBuffer(InputDirection.Up)).toBe(false);
//       expect(controller.consumeNextDirection()).toBeNull();
//       expect(controller.getCurrentDirection()).toBe(InputDirection.Right);
//     });

//     it('resumes with the previously applied direction', () => {
//       controller.addDirectionToBuffer(InputDirection.Up);
//       controller.consumeNextDirection();
//       controller.pause();
//       controller.resume();

//       expect(controller.isActive()).toBe(true);
//       expect(controller.getCurrentDirection()).toBe(InputDirection.Up);
//       expect(controller.consumeNextDirection()).toBe(InputDirection.Up);
//     });

//     it('resets the controller completely', () => {
//       controller.addDirectionToBuffer(InputDirection.Up);
//       controller.reset();

//       expect(controller.isActive()).toBe(false);
//       expect(controller.getCurrentDirection()).toBeNull();
//       expect(controller.getDirectionBuffer()).toEqual([]);
//       expect(controller.addDirectionToBuffer(InputDirection.Right)).toBe(false);
//     });

//     it('cannot resume after a reset without starting a new game', () => {
//       controller.reset();
//       controller.resume();

//       expect(controller.isActive()).toBe(false);
//       expect(controller.consumeNextDirection()).toBeNull();
//     });

//     it('clears pending inputs without changing the current direction', () => {
//       controller.addDirectionToBuffer(InputDirection.Up);
//       controller.clearBuffer();

//       expect(controller.getDirectionBuffer()).toEqual([]);
//       expect(controller.getCurrentDirection()).toBe(InputDirection.Right);
//       expect(controller.isActive()).toBe(true);
//     });
//   });
// });
