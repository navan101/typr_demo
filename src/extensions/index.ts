import 'fabric';
import './c-curved-text';
import './c-text';

export class CorjlFabricCanvas extends fabric.Canvas {

  constructor(element: HTMLCanvasElement | string, options?: fabric.ICanvasOptions) {
    super(element, options);
  }

  // public export(): string {
  //   return this.toDatalessJSON();
  // }
}
