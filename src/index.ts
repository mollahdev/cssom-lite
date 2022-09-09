import Base from "./base";
import { responsiveOption, stringObj } from "./interfaces";
export default class CSSMaker extends Base {
	/**
	 * @param  {string} deviceName
	 * @param  {number} maxPoint
	 */
	public addDevice(deviceName: string, maxPoint: number): void {
		this.devices[deviceName] = maxPoint;
		this.sortDevices();
	}
	/**
	 * @param  {string} content
	 * @returns void
	 */
	public addCSS(content: string): void {
		this.css[this.uid] = content
	}
	/**
	 * @param  {string} selector
	 * @param  {string} properties
	 * @param  {responsiveOption} responsive?
	 */
	public addRule(selector: string, properties: string, responsive?: responsiveOption): void | false {

		const self = this;
		let hash = 'all';
		let propertiesObj: stringObj | string[] = {}

		selector = self.removeMultiWhiteSpace(selector);
		properties = self.removeMultiWhiteSpace(properties);

		if (responsive && typeof responsive === 'object') {
			hash = self.responsiveToHash(responsive);
		}

		if (!self.rules[hash]) {
			self.rules[hash] = {}
		}

		if (!properties && selector) {
			const parsedRules = selector.match(/[^{]+\{[^}]+}/g);
			if (!parsedRules) return;
			for (let i in parsedRules) {
				const parsedRule = parsedRules[i].match(/([^{]+)\{([^}]+)}/);
				if (parsedRule) {
					const _selector = parsedRule[1];
					const _properties = parsedRule[2];
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
			const orderedRules: stringObj = {};
			try {
				let i: keyof typeof propertiesObj
				for (i in propertiesObj) {
					const [property, value] = propertiesObj[i].split(/:(.*)?/);
					orderedRules[property.trim()] = value.trim().replace(';', '');
				}
			} catch (error) {
				return;
			}

			propertiesObj = orderedRules;
		}

		Object.assign(self.rules[hash][selector], propertiesObj);
	}

	public clear(): void {
		this.rules = {};
		this.css = {};
	}

	public output(): string {

		const { css, convertRules, createResponsiveFormat, sortHashes } = this;
		const rules = sortHashes.call(this);

		let text = '';
		for (let hash in rules) {

			let screenText = convertRules.call(this, rules[hash]);

			if ('all' !== hash) {
				screenText = createResponsiveFormat.call(this, hash) + '{' + screenText + '}';
			}

			text += screenText;
		}

		for (let i in css) {
			text += css[i];
		}

		return text;
	};

}