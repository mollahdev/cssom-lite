import Base from "./base";
import { responsiveOption } from "./interfaces";
export default class CSSOMLite extends Base {
    /**
     * @param  {string} deviceName
     * @param  {number} maxPoint
     */
    addDevice(deviceName: string, maxPoint: number): void;
    /**
     * @param  {string} content
     * @returns void
     */
    addCSS(content: string): void;
    /**
     * @param  {string} selector
     * @param  {string} properties
     * @param  {responsiveOption} responsive?
     */
    addRule(selector: string, properties: string, responsive?: responsiveOption): void | false;
    clear(): void;
    output(): string;
}
