"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = __importDefault(require("./base"));
var CSSOMLite = /** @class */ (function (_super) {
    __extends(CSSOMLite, _super);
    function CSSOMLite() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param  {string} deviceName
     * @param  {number} maxPoint
     */
    CSSOMLite.prototype.addDevice = function (deviceName, maxPoint) {
        this.devices[deviceName] = maxPoint;
        this.sortDevices();
    };
    /**
     * @param  {string} content
     * @returns void
     */
    CSSOMLite.prototype.addCSS = function (content) {
        this.css[this.uid] = content;
    };
    /**
     * @param  {string} selector
     * @param  {string} properties
     * @param  {responsiveOption} responsive?
     */
    CSSOMLite.prototype.addRule = function (selector, properties, responsive) {
        var self = this;
        var hash = 'all';
        var propertiesObj = {};
        selector = self.removeMultiWhiteSpace(selector);
        properties = self.removeMultiWhiteSpace(properties);
        if (responsive && typeof responsive === 'object') {
            hash = self.responsiveToHash(responsive);
        }
        if (!self.rules[hash]) {
            self.rules[hash] = {};
        }
        if (!properties && selector) {
            var parsedRules = selector.match(/[^{]+\{[^}]+}/g);
            if (!parsedRules)
                return;
            for (var i in parsedRules) {
                var parsedRule = parsedRules[i].match(/([^{]+)\{([^}]+)}/);
                if (parsedRule) {
                    var _selector = parsedRule[1];
                    var _properties = parsedRule[2];
                    self.addRule(_selector, _properties, responsive);
                }
            }
            return;
        }
        if (!self.rules[hash][selector]) {
            self.rules[hash][selector] = {};
        }
        if ('string' === typeof properties) {
            propertiesObj = properties.split(';').filter(String);
            var orderedRules = {};
            try {
                var i = void 0;
                for (i in propertiesObj) {
                    var _a = propertiesObj[i].split(/:(.*)?/), property = _a[0], value = _a[1];
                    orderedRules[property.trim()] = value.trim().replace(';', '');
                }
            }
            catch (error) {
                return;
            }
            propertiesObj = orderedRules;
        }
        Object.assign(self.rules[hash][selector], propertiesObj);
    };
    CSSOMLite.prototype.clear = function () {
        this.rules = {};
        this.css = {};
    };
    CSSOMLite.prototype.output = function () {
        var _a = this, css = _a.css, convertRules = _a.convertRules, createResponsiveFormat = _a.createResponsiveFormat, sortHashes = _a.sortHashes;
        var rules = sortHashes.call(this);
        var text = '';
        // merge custom css
        for (var i in css) {
            text += css[i];
        }
        // merge css rules
        for (var hash in rules) {
            var screenText = convertRules.call(this, rules[hash]);
            if ('all' !== hash) {
                screenText = createResponsiveFormat.call(this, hash) + '{' + screenText + '}';
            }
            text += screenText;
        }
        return text;
    };
    ;
    return CSSOMLite;
}(base_1.default));
exports.default = CSSOMLite;
