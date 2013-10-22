/* jQuery ST-Pagination v0.0.3 */

(function( $ ){
	
	"use strict";
	
	var PARAMETER_TOKEN = ':p';
	
	var methods = {
		
		// Set up the plugin
		initialize: function( options ){
			
			options = options || {};
			
			return this.each( function(){
				
				var $this = $( this );
				var data = {};
				data.url = options.url || $this.data('url') || '?p='+ PARAMETER_TOKEN;
				data.type = options.type || $this.data('type') || 'page';
				data.start = options.start || parseInt( $this.data('start'), 10 ) || 1;
				data.page = data.start + 1;
				options.selectors = options.selectors || {};
				data.selectors = {
					items: options.selectors.items || '.st-items',
					next: options.selectors.next || '.st-next'
				};
				data.selectors.item = options.selectors.item || data.selectors.items +' > *';
				if( data.type === 'skip' ){
					data.skip = options.skip || parseInt( $this.data('skip'), 10 ) || data.start + $this.find( data.selectors.items ).length;
				}	
				data.selector = '#'+ $this.attr('id');
				data.cache = {
					next: null
				};
				
				// Bind passed events
				if( options.events ){
					for( var event in options.events ){
						if( options.events.hasOwnProperty( event ) ){
							var method = options.events[event];
							$this.on( event, method );
						}
					}
				}
				
				$this.addClass('initialized');
				$this.data( 'st-pagination', data );
				$this.stPagination( 'checkNext' );	
				
				// Bind "next" link
				$this.on( 'click.st-pagination', data.selectors.next, function( e ){
				
					e.preventDefault();
					
					if( !$this.is('.loading') && !$this.is('.complete') ){
						$this.stPagination( 'next' );
					}	
					
				});
				
			});
			
		},
		
		// Method to advance to current page + 1
		next: function(){
			
			return this.each( function(){
				
				var $this = $(this);
				var data = $this.data('st-pagination');
				
				$this.find( data.selectors.items +':first' ).append( data.cache.next );
				data.skip += data.cache.next.length;
				data.page++;
				$this.stPagination( 'checkNext' );
				
				$this.trigger( 'next', $this );	
				
			});
			
		},
		
		// Check to see if the next page exists and cache its contents
		checkNext: function(){
			
			return this.each( function(){
				
				var $this = $(this);
				var data = $this.data('st-pagination');
				var next_integer = data[data.type];
				var next_page_url = data.url.replace( ':p', next_integer );
				var next_page_url_filtered = next_page_url +' '+ data.selector +' '+ data.selectors.item;
				
				$this.addClass('loading');
				$('<div />').load( next_page_url_filtered, function(){

					data.cache.next = $(this).children();
					$this
						.removeClass('loading')
						.toggleClass( 'complete', ( data.cache.next.length === 0 ) );
					
					if( data.cache.next.length === 0 ){
						$this.trigger( 'complete', $this );
					}
					
				});
				
			});
			
		},
		
		// Destroy the plugin
		destroy: function(){
			
			var $this = $(this);	
			
			$this.off('.st-pagination');
			$this.removeData();
			
		}
		
	};
	
	// Attach stPagination to jQuery
	$.fn.stPagination = function( method ){
		
		if( methods[method] ){
			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		}
		else if( typeof method === 'object' || ! method ){
			return methods.initialize.apply( this, arguments );
		}	
		
	};

})( jQuery );