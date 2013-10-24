var $ = require('jquery');
require('../jquery.st-pagination.js');
require('./assets/jquery.mockjax.js');
var test = require('tape');

var AJAX_RESPONSETIME = 50;
var TEST_MARKUP = [
	'<div id="paginate-me"><ul class="st-items"><li>1</li><li>2</li><li>3</li></ul><a class="st-next" href="#next">Next</a></div>',
	'<div id="paginate-me"><ul class="st-items"><li>4</li><li>5</li><li>6</li></ul><a class="st-next" href="#next">Next</a></div>',
	'<div id="paginate-me"><ul class="st-items"><li>7</li><li>8</li></ul><a class="st-next" href="#next">Next</a></div>',
	'<div id="paginate-me"><ul class="st-items"></ul><a class="st-next" href="#next">Next</a></div>'
];

$.mockjax({
	url: /^\/test\/(.+)/,
	urlParams: ['page'],
	status: 200,
	dataType: 'html',
	response: function( settings ){
		var page = parseInt( settings.urlParams.page );
		this.responseText = '<!DOCTYPE html><html><body>'+ TEST_MARKUP[page-1] +'</body></html>'
	},
	responseTime: AJAX_RESPONSETIME
});

test( 'stPagination method exists on $', function( t ){
	t.plan(1);
	t.ok( $().stPagination instanceof Function, 'stPagination method is registered' );
});

test( 'stPagination initializes on element', function( t ){
	t.plan(1);
	$('#test').html( TEST_MARKUP[0] );
	$('#paginate-me').stPagination({
		url: '/test/:p'
	});
	t.ok( $('#paginate-me').is('.initialized'), 'Adds initialized class' );
	$('#test').html('');
});

test( 'stPagination preloads the next set of items', function( t ){
	t.plan(4);
	$('#test').html( TEST_MARKUP[0] );
	$('#paginate-me').stPagination({
		url: '/test/:p'
	});
	setTimeout( function(){
		var data = $('#paginate-me').data('st-pagination');
		var $next = data.cache.next;
		t.ok( $next.length === 3, 'three items in DOM cache' );
		t.ok( $next.eq(0).text() === '4', 'first item contains "4"' );
		t.ok( $next.eq(1).text() === '5', 'second item contains "5"' );
		t.ok( $next.eq(2).text() === '6', 'second item contains "6"' );
		$('#test').html('');
	}, AJAX_RESPONSETIME + 1 );
});