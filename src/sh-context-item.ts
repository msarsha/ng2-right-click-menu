export interface IShContextMenuItem {
    label?: string;
    divider?: boolean;
    onClick?($event: any): void;
    visible?(context: any): boolean;
    disabled?(context: any): boolean;
}