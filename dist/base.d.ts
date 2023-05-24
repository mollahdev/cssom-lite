import { cssOption, devicesOption, responsiveOption, rulesOption, stringObj } from "./interfaces";
export default class Base {
    protected devices: devicesOption;
    protected css: cssOption;
    protected rules: rulesOption;
    protected get uid(): number;
    protected sortDevices(): void | false;
    protected removeMultiWhiteSpace(str: string): string;
    protected responsiveToHash(responsive: responsiveOption): string;
    protected hashToResponsive(hash: string): devicesOption;
    protected sortHashes(): rulesOption;
    createResponsiveFormat(responsiveHash: string): string;
    convertProperties(properties: stringObj): string;
    convertRules(rules: {
        [key: string]: {
            [key: string]: string;
        };
    }): string;
}
