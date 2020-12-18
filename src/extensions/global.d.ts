/* eslint-disable max-classes-per-file */
import 'fabric';
import { fabric } from 'fabric';

declare module 'fabric/fabric-impl' {
  class CurvesText {}
  class CText {}
}

declare global {
  namespace fabric {
    interface CorjlTextOptions extends ITextOptions {
      originalText?: string;
      uppercase?: boolean;
      meta?: any;
      curved?: boolean;
      curvedType?: string;
      degrees?: number;
    }
  }
}