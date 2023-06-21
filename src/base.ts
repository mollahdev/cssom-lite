import { cssOption, devicesOption, responsiveOption, rulesOption, stringObj } from "./interfaces";

export default class Base {

    protected devices: devicesOption = {}
    protected css: cssOption = {}
    protected rules: rulesOption = {}
    protected ignoreKeys: string[] = ['undefined', 'remove', 'false', 'null', 'NaN', '', 'true']

    protected get uid(): number {
        return Math.floor(Math.random() * 100000);
    }

    protected canIgnore( value: string ) {
        return this.ignoreKeys.includes(value.trim());
    }

    protected removeOldProperties(properties: string, state: {}) {
        const keys = properties.split(',').filter(item => !this.canIgnore(item));
        
        keys.forEach(key => {
            const k = key.trim() as keyof typeof state
            delete state[k];
        })
    }

    protected sortDevices(): void | false {

        const self = this;
        const deviceNames = Object.keys(self.devices);

        if (deviceNames.length < 2) {
            return;
        }

        deviceNames.sort((a: string, b: string) => {
            return self.devices[a] - self.devices[b];
        });

        const sortedDevices: devicesOption = {};

        deviceNames.forEach(function (deviceName: string) {
            sortedDevices[deviceName] = self.devices[deviceName];
        });

        self.devices = sortedDevices;
    }
   
    protected removeMultiWhiteSpace(str: string): string {
        if (typeof str !== 'string') return str;
        return str.trim().replace(/ +(?= )/g, '');
    }
   
    protected responsiveToHash(responsive: responsiveOption): string {
        let hash = [];
        let endPoint: keyof typeof responsive
        for (endPoint in responsive) {
            hash.push(endPoint + '_' + responsive[endPoint]);
        }
        return hash.join('-');
    }
   
    protected hashToResponsive(hash: string): devicesOption {
        const responsive: devicesOption = {};
        const hashArray = hash.split('-').filter(String);
        hashArray.forEach(hashItem => {
            const
                [endPoint, deviceName] = hashItem.split(/_(.+)/);
            responsive[endPoint] = this.devices[deviceName]
        });
        return responsive;
    }

    protected sortHashes(): rulesOption {

        const self = this, { rules, hashToResponsive } = self;

        const hashes = Object.keys(rules);
        if (hashes.length < 2) return rules;

        hashes.sort(function (a, b) {
            if ('all' === a) {
                return -1;
            }

            if ('all' === b) {
                return 1;
            }

            let aQuery = hashToResponsive.call(self, a),
                bQuery = hashToResponsive.call(self, b);

            if (aQuery.max && bQuery.max) {
                return bQuery.max - aQuery.max;
            }

            if (aQuery.min && bQuery.min) {
                return bQuery.min - aQuery.min;
            }

            const aQueryValue = aQuery.max ?? aQuery.min;
            const bQueryValue = bQuery.max ?? bQuery.min;

            return bQueryValue - aQueryValue;
        });

        const sortedRules: rulesOption = {};
        hashes.forEach(deviceName => {
            sortedRules[deviceName] = rules[deviceName];
        });

        return sortedRules;
    }
   
    createResponsiveFormat(responsiveHash: string) {
        const responsive = this.hashToResponsive.call(this, responsiveHash)
        const responsiveFormat = [];

        for (let endPoint in responsive) {
            responsiveFormat.push('(' + endPoint + '-width:' + responsive[endPoint] + 'px)');
        }

        return '@media' + responsiveFormat.join(' and ');
    }

    convertProperties(properties: stringObj): string {
        let convertedProperties = '';
        for (let property in properties) {
            convertedProperties += property + ':' + properties[property] + ';';
        }
        return convertedProperties;
    }
   
    convertRules(rules: { [key: string]: { [key: string]: string } }) {
        let convertedRules = '';
        for (let selector in rules) {
            const convertedProperties = this.convertProperties(rules[selector]);
            if (convertedProperties) {
                convertedRules += selector + '{' + convertedProperties + '}';
            }
        }
        return convertedRules;
    }
}