import Base from "./base";
import { responsiveOption, stringObj } from "./interfaces";

export default class CSSOMLite extends Base {
	
	public addDevice(deviceName: string, maxPoint: number): void {
		this.devices[deviceName] = maxPoint;
		this.sortDevices();
	}
	
	public addCSS(content: string): void {
		this.css[this.uid] = content
	}
	
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
					//remove properties if "remove" property exists
					if (property.trim() === 'remove') {
						this.removeOldProperties( value.trim(), self.rules[hash][selector] )
					}

					// parse property and value 
					if( !this.canIgnore(property) && !this.canIgnore(value) ) {
						orderedRules[property.trim()] = value.trim().replace(';', '');
					}

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

		// merge custom css
		for (let i in css) {
			text += css[i];
		}

		// merge css rules
		for (let hash in rules) {

			let screenText = convertRules.call(this, rules[hash]);

			if ('all' !== hash) {
				screenText = createResponsiveFormat.call(this, hash) + '{' + screenText + '}';
			}

			text += screenText;
		}

		return text.replace(/\s+/g, ' ');
	};

}