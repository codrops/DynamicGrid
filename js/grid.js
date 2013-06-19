var Grid = (function() {

	function extend( a, b ) {
		for( var key in b ) { 
			if( b.hasOwnProperty( key ) ) {
				a[key] = b[key];
			}
		}
		return a;
	}

	var config = {
			items : Array.prototype.slice.call( document.querySelectorAll( '#gt-grid > div' ) ),
			gridSel : new gridSelector( document.getElementById( 'gt-grid-selector' ), {
				onClick : function() { initGrid(); }
			} )
		},
		defaults = {
			transition : false,
			speed : 300,
			delay : 0
		};

	function init( options ) {
		config.options = extend( defaults, options );
		initGrid();
		if( config.options.transition ) {
			setTimeout( function() {
				config.items.forEach( function( el, i ) {
					el.style.WebkitTransition = 'all ' + config.options.speed + 'ms ' + ( i * config.options.delay ) + 'ms';
					el.style.MozTransition = 'all ' + config.options.speed + 'ms ' + ( i * config.options.delay ) + 'ms';
					el.style.transition = 'all ' + config.options.speed + 'ms ' + ( i * config.options.delay ) + 'ms';
				} );
			}, 25 );
		}
	}

	function initGrid() {
		var rows = config.gridSel.rows,
			columns = config.gridSel.columns;
		
		config.items.forEach( function( el, i ) {
			el.style.position = 'absolute';

			var elpos = config.items.indexOf( el ),
				current_row = Math.floor( elpos / config.gridSel.maxcolumns ),
				current_column = elpos - current_row * config.gridSel.maxcolumns,
				width =  100 / columns,
				height = 100 / rows;

			if( current_row < rows && current_column < columns ) {
				/* this seems to crash Safari 6 */
				//if( Modernizr.csscalc ) {
				//	el.style.width = '-webkit-calc(' + width + '% + 1px)';
				//	el.style.height = '-webkit-calc(' + height + '% + 1px)';
				//	el.style.width = '-moz-calc(' + width + '% + 1px)';
				//	el.style.height = '-moz-calc(' + height + '% + 1px)';
				//	el.style.width = 'calc(' + width + '% + 1px)';
				//	el.style.height = 'calc(' + height + '% + 1px)';
				//}
				//else  {
					el.style.width = width + .5 + '%';
					el.style.height = height + .5 + '%';
				//}
				
				el.style.left = width * ( current_column ) + '%';
				el.style.top = height * ( current_row ) + '%';

				classie.remove( el, 'gt-hidden' );
				classie.add( el, 'gt-visible' );
			}
			else {
				classie.remove( el, 'gt-visible' );
				classie.add( el, 'gt-hidden' );
			}
		} );
	}

	return { init : init };

})();