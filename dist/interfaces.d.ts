export interface devicesOption {
    [key: string]: number;
}
export interface rulesOption {
    [key: string]: {
        [key: string]: stringObj;
    };
}
export interface stringObj {
    [key: string]: string;
}
export interface cssOption {
    [key: number]: string;
}
export interface responsiveOption {
    min?: string;
    max?: string;
}
