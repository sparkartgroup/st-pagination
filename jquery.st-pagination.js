/*

Storyteller Pagination 0.0.1

©2012 Story Arc, Inc.

*/

(function( $ ){
	
	var PARAMETER_TOKEN = ':p';
	
	var methods = {
		
		// Set up the plugin
		initialize: function( options ){
			
			return this.each( function(){
				
				var $this = $( this );
				var options = options || {};
				var data = {};
				data.parameter = options.parameter || $this.data('parameter') || 'p='+ PARAMETER_TOKEN;
				var parameter_capture_regex = new RegExp( data.parameter.replace( PARAMETER_TOKEN, '([0-9]*)' ) );
				data.parameter_regex = new RegExp( data.parameter.replace( PARAMETER_TOKEN, '[0-9]*' ) );
				data.type = options.type || $this.data('type') || 'page';
				data.start = options.start || parseInt( $this.data('start') ) || parseInt( parameter_capture_regex.exec( window.location.href )[1] ) || 1;
				data.page = data.start + 1;
				if( data.type === 'skip' )
					data.skip = options.skip || parseInt( $this.data('skip') ) || data.start + $this.children('ul').children('li').length;
				data.selector = '#'+ $this.attr('id');
				data.cache = {
					next: null
				};
				
				$this.data( 'st-pagination', data );
				$this.stPagination( 'checkNext' );
				
				// Bind "next" link
				$this.on( 'click.st-pagination', '.st-next', function( e ){
				
					e.preventDefault();
					
					if( !$this.is('.loading') && !$this.is('.complete') )
						$this.stPagination( 'next' );
					
				});
				
			});
			
		},
		
		// Method to advance to current page + 1
		next: function(){
			
			return this.each( function(){
				
				var $this = $(this);
				var data = $this.data('st-pagination');
				
				$this.children('ul').append( data.cache.next );
				data.skip += data.cache.next.length;
				data.page++;
				$this.stPagination( 'checkNext' );
				
			});
			
		},
		
		// Check to see if the next page exists and cache its contents
		checkNext: function(){
			
			return this.each( function(){
				
				var $this = $(this);
				var data = $this.data('st-pagination');
				var next_integer = ( data.type === 'page' )? data.page: data.skip;
				var new_parameter = data.parameter.replace( PARAMETER_TOKEN, next_integer );
				var next_page_url = window.location.href.replace( data.parameter_regex, new_parameter );
				var next_page_url_filtered = next_page_url +' '+ data.selector +' > ul > li';
				
				$this.addClass('loading');
				
				$('<div />').load( next_page_url_filtered, function(){
					
					data.cache.next = $(this).children().unwrap();
					
					$this
						.removeClass('loading')
						.toggleClass( 'complete', ( data.cache.next.length === 0 ) );
					
				});
				
			});
			
		},
		
		// Destroy the plugin
		destroy: function(){
			
			$this.off('.st-pagination');
			$this.removeData();
			
		}
		
	};
	
	// Attach stPagination to jQuery
	$.fn.stPagination = function( method ){
		
		if( methods[method] )
			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		else if( typeof method === 'object' || ! method )
			return methods.initialize.apply( this, arguments );
		
	};

})( jQuery );