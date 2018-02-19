export const ShContextDefaultOptions: IShContextOptions = {
  rtl: false,
  theme: 'light'
};

export interface IShContextMenuItem {
  label?: ((context: any) => string) | string;
  id?: string;
  divider?: boolean;
  subMenu?: boolean;
  subMenuItems?: IShContextMenuItem[];
  data?: any;

  onClick?($event: any): void;

  visible?(context: any): boolean;

  disabled?(context: any): boolean;
}

export interface IShContextOptions {
  rtl?: boolean;
  theme?: 'light' | 'dark';
}

export interface BeforeMenuEvent {
  event: MouseEvent;
  items: IShContextMenuItem[];

  open(items?: IShContextMenuItem[]): void;
}
