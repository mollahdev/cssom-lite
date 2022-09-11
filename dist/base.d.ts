import { cssOption, devicesOption, responsiveOption, rulesOption, stringObj } from "./interfaces";
export default class Base {
    protected devices: devicesOption;
    protected css: cssOption;
    protected rules: rulesOption;
    protected get uid(): number;
    protected sortDevices(): void | false;
    /**
     * @param  {string} str
     * @returns string
     */
    protected removeMultiWhiteSpace(str: string): string;
    /**
     * @param  {responsiveOption} responsive
     */
    protected responsiveToHash(responsive: responsiveOption): string;
    /**
     * @param  {string} hash
     */
    protected hashToResponsive(hash: string): devicesOption;
    protected sortHashes(): rulesOption;
    /**
     * @param  {string} responsiveHash
     */
    createResponsiveFormat(responsiveHash: string): string;
    /**
     * @param  {stringObj} properties
     * @returns string
     */
    convertProperties(properties: stringObj): string;
    /**
     * @param  {{[key:string]:{[key:string]:string}}} rules
     */
    convertRules(rules: {
        [key: string]: {
            [key: string]: string;
        };
    }): string;
}
