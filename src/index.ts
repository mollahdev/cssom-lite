import Base from "./base";
import { responsiveOption, rulesOption, stringObj } from "./interfaces";

class CSSMaker extends Base {
    
    public addDevice( deviceName: string, maxPoint: number ): void {
        this.devices[deviceName] = maxPoint;
        this.sortDevices();
    }

    public addCSS( content: string ): void {
		this.css[this.uid] = content;
	}

    public addRule( selector: string, properties: string, responsive?: responsiveOption ): void | false {
		
        const self          = this;
		let hash            = 'all';
        let propertiesObj: stringObj | string[]   = {}

		selector	= self.removeMultiWhiteSpace( selector );
		properties	= self.removeMultiWhiteSpace( properties );

		if ( responsive && typeof responsive === 'object' ) {
			hash = self.responsiveToHash( responsive );
		}

		if ( !self.rules[ hash ] ) {
			self.rules[ hash ] = {}
		}
		
		if ( ! properties && selector ) {
			const parsedRules = selector.match( /[^{]+\{[^}]+}/g );
			if( ! parsedRules ) return;
			for( let i in parsedRules ) {
				const parsedRule = parsedRules[i].match( /([^{]+)\{([^}]+)}/ );
				if ( parsedRule ) {
					const _selector 	= parsedRule[ 1 ];
					const _properties 	= parsedRule[ 2 ];
					self.addRule( _selector, _properties, responsive );
				}
			}
			return;
		}

		if ( !self.rules[ hash ][ selector ] ) {
			self.rules[ hash ][ selector ] = {};
		}
        
		if ( 'string' === typeof properties ) {
			propertiesObj  = properties.split( ';' ).filter( String );
			const orderedRules: stringObj = {};
			try {
                let i: keyof typeof propertiesObj
				for( i in propertiesObj ) {
					const [ property, value ] = propertiesObj[i].split( /:(.*)?/ );
					orderedRules[ property.trim() ] = value.trim().replace( ';', '' );
				}
			} catch ( error ) {
				return;
			}

			propertiesObj = orderedRules;
		}

		Object.assign( self.rules[ hash ][ selector ], propertiesObj );
	}

}

const sheet = new CSSMaker();

sheet.addDevice('laptop', 991)
sheet.addDevice('mobile', 575)
sheet.addDevice('tablet', 768)

sheet.addRule( '.element-a', "background: green", {max: 'laptop', min: 'mobile'} )
sheet.addRule( '.element-a', "background: yellow", {max: 'mobile'} )
sheet.addRule( '.element-a', "background: purple" )

console.log(sheet)