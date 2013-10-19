var $ = require('jquery');
require('../jquery.st-pagination.js');
var test = require('tape');

test( 'stPagination method exists on $', function( t ){
	t.plan(1);
	t.ok( $().stPagination instanceof Function, 'stPagination method is registered' );
});