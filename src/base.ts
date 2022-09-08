import { cssOption, devicesOption, responsiveOption, rulesOption } from "./interfaces";

export default class Base {
    
    protected devices   : devicesOption = {}
    protected css       : cssOption     = {}
    protected rules     : rulesOption   = {}

    protected get uid(): number {
        return Math.floor( Math.random() * 100000 );
    }

    protected sortDevices(): void | this {

        const self          = this;
        const deviceNames   = Object.keys( self.devices );

		if ( deviceNames.length < 2 ) {
            return self;
        }

		deviceNames.sort( ( a: string, b: string ) => {
			return self.devices[ a ] - self.devices[ b ];
		} );

		const sortedDevices: devicesOption = {};

		deviceNames.forEach( function( deviceName: string ) {
			sortedDevices[ deviceName ] = self.devices[ deviceName ];
		});

		self.devices = sortedDevices;
    }

    protected removeMultiWhiteSpace( str: string ): string {
        if( typeof str !== 'string' ) return str;
        return str.trim().replace(/ +(?= )/g,'');
    }

    protected responsiveToHash( responsive: responsiveOption ): string {
		let hash = [];
        let endPoint: keyof typeof responsive
		for( endPoint in responsive ) {
			hash.push( endPoint + '_' + responsive[endPoint] );
		}
		return hash.join( '-' );
	}

    protected hashToResponsive( hash: string ): devicesOption {
        const responsive: devicesOption  = {};
        const hashArray  = hash.split( '-' ).filter( String );
        hashArray.forEach( hashItem => {
            const 
                [ endPoint, deviceName ] = hashItem.split( /_(.+)/ );
                responsive[ endPoint ]  = this.devices[ deviceName ]
        } );
        return responsive;
    }
}