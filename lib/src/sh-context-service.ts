import { Injectable, NgModule } from '@angular/core';
import {InjectionService} from "./injector.service";
import {IShContextOptions, ShContextDefaultOptions} from "./sh-context-menu.models";

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
