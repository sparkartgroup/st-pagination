st-pagination
=============

Simple pagination using jQuery.

### Usage

In order to use Storyteller Pagination, your page needs to be capable of loading dynamic content using a URL parameter (like /page/5, ?p=5, or ?skip=25). Your dynamic content needs to be in a `<div>` with a `<ul>` containing individual items as `<li>`s. Finally, your markup needs to have the appropriate classes and data defined:

```html
<div id="content" class="st-pagination" data-parameter="page/:p">
	<ul>
		<!-- Your rendering loop should be here -->
		<li><!-- Your content in here --></li>
	</ul>
	<a class="st-next" href="#next">Next</a>
</div>
```

This markup is the bare minumum necessary for Storyteller Pagination to work. While nothing can be removed, a great deal can be added:

```html
<div id="content" class="st-pagination" data-parameter="page/:p">
	<h1>My YouTube Favorites</h1>
	<sub>A list of my favorite videos from all across YouTube!</sub>
	<a class="st-next" href="#next">Next</a>
	<ul>
		{{#favorites}}
		<li>
			<h4>{{title}}</h4>
			<img src="{{thumbnail}}" />
			<var class="duration">{{duration}}</var>
			<em class="author">{{author}}</em>
			<p class="description">{{description}}</p>
			<a href="{{link}}">Watch Now!</a>
		</li>
		{{/favorites}}
	</ul>
	<a class="st-next" href="#next">Next</a>
</div>
```

The code to start the plugin will also need to be run:

```javascript
$(function(){
	
	$('.st-pagination').stPagination();

});
```

### Configuration

While most of Storyteller Pagination's options are set automatically, this is not always ideal. Configuration options can be set in two ways: through `data` attributes on the parent `.st-pagination` element, or with a configuration object passed directly to the plugin.

* **parameter** - A simple representation of the parameter that changes during pagination. Replace the numeric portion with `:p`. *This parameter is required*
* **type** - Determines the type of pagination--can be `page` or `skip`. Is set to `page` by default.
* **start** - What page number to start paginating from. Will be drawn from the URL if not specified.
* **skip** - What skip number to start paginating from. Will be determined by results returned if not specified.

```html
<!-- Configuring a "skip" paginator with a default skip start -->
<div id="content" class="st-pagination" data-parameter="start=:p" data-type="skip" data-skip="25">
```

```javascript
// Configuring a "page" paginator with a default page start
$('#content').stPagination({
	parameter: 'page=:p',
	type: 'page',
	start: 1
});
```