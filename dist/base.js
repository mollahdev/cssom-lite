"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Base = /** @class */ (function () {
    function Base() {
        this.devices = {};
        this.css = {};
        this.rules = {};
    }
    Object.defineProperty(Base.prototype, "uid", {
        get: function () {
            return Math.floor(Math.random() * 100000);
        },
        enumerable: false,
        configurable: true
    });
    Base.prototype.sortDevices = function () {
        var self = this;
        var deviceNames = Object.keys(self.devices);
        if (deviceNames.length < 2) {
            return;
        }
        deviceNames.sort(function (a, b) {
            return self.devices[a] - self.devices[b];
        });
        var sortedDevices = {};
        deviceNames.forEach(function (deviceName) {
            sortedDevices[deviceName] = self.devices[deviceName];
        });
        self.devices = sortedDevices;
    };
    /**
     * @param  {string} str
     * @returns string
     */
    Base.prototype.removeMultiWhiteSpace = function (str) {
        if (typeof str !== 'string')
            return str;
        return str.trim().replace(/ +(?= )/g, '');
    };
    /**
     * @param  {responsiveOption} responsive
     */
    Base.prototype.responsiveToHash = function (responsive) {
        var hash = [];
        var endPoint;
        for (endPoint in responsive) {
            hash.push(endPoint + '_' + responsive[endPoint]);
        }
        return hash.join('-');
    };
    /**
     * @param  {string} hash
     */
    Base.prototype.hashToResponsive = function (hash) {
        var _this = this;
        var responsive = {};
        var hashArray = hash.split('-').filter(String);
        hashArray.forEach(function (hashItem) {
            var _a = hashItem.split(/_(.+)/), endPoint = _a[0], deviceName = _a[1];
            responsive[endPoint] = _this.devices[deviceName];
        });
        return responsive;
    };
    Base.prototype.sortHashes = function () {
        var self = this, rules = self.rules, hashToResponsive = self.hashToResponsive;
        var hashes = Object.keys(rules);
        if (hashes.length < 2)
            return rules;
        hashes.sort(function (a, b) {
            var _a, _b;
            if ('all' === a) {
                return -1;
            }
            if ('all' === b) {
                return 1;
            }
            var aQuery = hashToResponsive.call(self, a), bQuery = hashToResponsive.call(self, b);
            if (aQuery.max && bQuery.max) {
                return bQuery.max - aQuery.max;
            }
            if (aQuery.min && bQuery.min) {
                return bQuery.min - aQuery.min;
            }
            var aQueryValue = (_a = aQuery.max) !== null && _a !== void 0 ? _a : aQuery.min;
            var bQueryValue = (_b = bQuery.max) !== null && _b !== void 0 ? _b : bQuery.min;
            return bQueryValue - aQueryValue;
        });
        var sortedRules = {};
        hashes.forEach(function (deviceName) {
            sortedRules[deviceName] = rules[deviceName];
        });
        return sortedRules;
    };
    /**
     * @param  {string} responsiveHash
     */
    Base.prototype.createResponsiveFormat = function (responsiveHash) {
        var responsive = this.hashToResponsive.call(this, responsiveHash);
        var responsiveFormat = [];
        for (var endPoint in responsive) {
            responsiveFormat.push('(' + endPoint + '-width:' + responsive[endPoint] + 'px)');
        }
        return '@media' + responsiveFormat.join(' and ');
    };
    /**
     * @param  {stringObj} properties
     * @returns string
     */
    Base.prototype.convertProperties = function (properties) {
        var convertedProperties = '';
        for (var property in properties) {
            convertedProperties += property + ':' + properties[property] + ';';
        }
        return convertedProperties;
    };
    /**
     * @param  {{[key:string]:{[key:string]:string}}} rules
     */
    Base.prototype.convertRules = function (rules) {
        var convertedRules = '';
        for (var selector in rules) {
            var convertedProperties = this.convertProperties(rules[selector]);
            if (convertedProperties) {
                convertedRules += selector + '{' + convertedProperties + '}';
            }
        }
        return convertedRules;
    };
    return Base;
}());
exports.default = Base;
