st-pagination
=============

Simple pagination using jQuery.

Storyteller Pagination enables you to create "endless" pagination by appending the contents of the next page in a set to the current one. It will asynchronously request the contents of the next page, filter them, and cache them until the "next" button is clicked.

### Usage

In order to use Storyteller Pagination, your page needs to be capable of loading dynamic content using a URL parameter (like /page/5, ?p=5, or ?skip=25). Your dynamic content needs to be in a `<div>` with a `<ul>` containing individual items as `<li>`s. Finally, your markup needs to have the `st-pagination`, `st-items`, and `st-next` classes, like so:

```html
<div id="content" class="st-pagination" data-parameter="page/:p">
	<ul class="st-items">
		<!-- Your rendering loop should be here -->
		<li><!-- Your content in here --></li>
	</ul>
	<a class="st-next" href="#next">Next</a>
</div>
```

This markup is the bare minumum necessary for Storyteller Pagination to work. Please note that the "next" link does not necessarily need to be an `<a>`, it just needs the `st-next` class. From here, you can add basically any markup you want!

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

**Configuration options can be set in two ways:** through `data` attributes on the parent `.st-pagination` element, or with a configuration object passed directly to the plugin.

* **parameter** - ( default "?p=:p" ) The URL for the next page in the set, replacing the page number with ":p"
* **type** - ( default "page" ) Determines the type of pagination--can be `page`, for APIs that use page numbers, or `skip`, for APIs that skip a certain number of results.
* **start** - ( default "1" ) What page/item number to start paginating from.

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