var $ = require('./assets/jquery.js');
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

// don't log mockjax data
$.mockjaxSettings.log = function(){};

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

// add a test container element
$('html').append('<div id="test"></div>');

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

test( 'stPagination binds events passed in configuration', function( t ){
	t.plan(2);
	$('#test').html( TEST_MARKUP[0] );
	$('#paginate-me').stPagination({
		url: '/test/:p',
		events: {
			next: function(){
				t.pass('binds "next" event');
			},
			previous: function(){
				t.pass('binds "previous" event');
			}
		}
	});
	$('#paginate-me')
		.trigger('next')
		.trigger('previous');
});

test( 'stPagination triggers events', function( t ){
	t.plan(3);
	$('#test').html( TEST_MARKUP[0] );
	$('#paginate-me')
		.stPagination({
			url: '/test/:p'
		})
		.on({
			next: function(){
				t.pass('triggers "next" event');
			},
			complete: function(){
				t.pass('triggers "previous" event');
			}
		});
	setTimeout( function(){
		$('#paginate-me a.st-next').trigger('click');
		setTimeout( function(){
			$('#paginate-me a.st-next').trigger('click');
			setTimeout( function(){
				$('#paginate-me a.st-next').trigger('click');
			}, AJAX_RESPONSETIME + 1 );
		}, AJAX_RESPONSETIME + 1 );
	}, AJAX_RESPONSETIME + 1 );
});

test( 'stPagination preloads the next set of items', function( t ){
	t.plan(7);
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
		$('#paginate-me a.st-next').trigger('click');
		setTimeout( function(){
			var data = $('#paginate-me').data('st-pagination');
			var $next = data.cache.next;
			t.ok( $next.length === 2, 'three items in DOM cache' );
			t.ok( $next.eq(0).text() === '7', 'first item contains "7"' );
			t.ok( $next.eq(1).text() === '8', 'second item contains "8"' );
			$('#test').html('');
		}, AJAX_RESPONSETIME + 1 );
	}, AJAX_RESPONSETIME + 1 );
});

test( 'stPagination appends the next set of items', function( t ){
	t.plan(10);
	$('#test').html( TEST_MARKUP[0] );
	$('#paginate-me').stPagination({
		url: '/test/:p'
	});
	setTimeout( function(){
		$('#paginate-me .st-next').trigger('click');
		var $items = $('#paginate-me .st-items > *');
		t.ok( $items.length === 6, '6 items in DOM' );
		t.ok( $items.eq(0).text() === '1', 'first item contains "1"' );
		t.ok( $items.eq(1).text() === '2', 'second item contains "2"' );
		t.ok( $items.eq(2).text() === '3', 'third item contains "3"' );
		t.ok( $items.eq(3).text() === '4', 'fourth item contains "4"' );
		t.ok( $items.eq(4).text() === '5', 'fifth item contains "5"' );
		t.ok( $items.eq(5).text() === '6', 'sixth item contains "6"' );
		setTimeout( function(){
			$('#paginate-me .st-next').trigger('click');
			var $items = $('#paginate-me .st-items > *');
			t.ok( $items.length === 8, '8 items in DOM' );
			t.ok( $items.eq(6).text() === '7', 'seventh item contains "7"' );
			t.ok( $items.eq(7).text() === '8', 'eighth item contains "8"' );
			$('#test').html('');
		}, AJAX_RESPONSETIME + 1 );
	}, AJAX_RESPONSETIME + 1 );
});