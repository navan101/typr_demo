import { Loca } from './loca';

export class Rect {
  public x: any;
  public y: any;
  public w: any;
  public h: any;

  constructor(x?: any, y?: any, w?: any, h?: any) {
    if (!x)
      x = 0;
    if (!y)
      y = 0;
    if (!w)
      w = 0;
    if (!h)
      h = 0;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h
  }

  public clone() {
    return new Rect(this.x, this.y, this.w, this.h)
  }

  public check() {
    return this.w <= 0 || this.h <= 0
  }

  public offset(x: number, y: number) {
    this.x += x;
    this.y += y
  }

  public setOffset(loca: Loca) {
    this.offset(loca.x, loca.y)
  }

  public getRect(r: Rect) {
    if (this.check())
      return r.clone();
    if (r.check())
      return this.clone();
    var rect = this.clone();
    rect.createdRect(r);
    return rect
  }

  public createdRect(r: Rect) {
    if (r.check())
      return;
    if (this.check()) {
      this.setRect(r);
      return
    }
    this.setRectXY(r.x, r.y);
    this.setRectXY(r.x + r.w, r.y + r.h)
  }

  public setRectXY(x: any, y: any) {
    const minX = Math.min(this.x, x)
    const minY = Math.min(this.y, y);
    this.w = Math.max(this.x + this.w, x) - minX;
    this.h = Math.max(this.y + this.h, y) - minY;
    this.x = minX;
    this.y = minY
  }

  public setRect(O: any) {
    this.x = O.x;
    this.y = O.y;
    this.w = O.w;
    this.h = O.h
  }
}