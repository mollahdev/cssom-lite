import Base from "./base";
import { responsiveOption } from "./interfaces";
export default class CSSOMLite extends Base {
    addDevice(deviceName: string, maxPoint: number): void;
    addCSS(content: string): void;
    addRule(selector: string, properties: string, responsive?: responsiveOption): void | false;
    clear(): void;
    output(): string;
}
