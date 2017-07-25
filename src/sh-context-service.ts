import { Injectable, NgModule } from '@angular/core';

import { ShContextDefaultOptions } from './sh-context-default-options';
import { IShContextOptions } from './sh-context-options';
import {InjectionService} from "./injector.service";

@Injectable()
export class ShContextService {
  options: IShContextOptions;

  setOptions(opts: IShContextOptions): IShContextOptions {
    this.options = Object.assign({}, ShContextDefaultOptions, opts);
    return this.options;
  }

  getOptions(): IShContextOptions{
    return this.options;
  }
}

@NgModule({
  providers: [ShContextService, InjectionService]
})
export class ShContextServiceModule { }
