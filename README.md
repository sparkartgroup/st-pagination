st-pagination
=============

Simple pagination using jQuery.

[![browser support](https://ci.testling.com/SparkartGroupInc/st-pagination.png)](https://ci.testling.com/SparkartGroupInc/st-pagination)

Storyteller Pagination enables you to create "endless" pagination by appending the contents of the next page in a set to the current one. It will asynchronously request the contents of the next page, filter them, and cache them until the "next" button is clicked.

### Usage

In order to use Storyteller Pagination, your page needs to be capable of loading dynamic content using a URL parameter (like `/page/5`, `?p=5`, or `?skip=25`). In your markup, you need a container **with an id** (`#content`), an element containing paginated elements (`.st-items`), and a next button (`.st-next`). The last two selectors can be configured.

```html
<div id="content" class="pagination" data-url="/page/:p">
	<ul class="st-items">
		<!-- Your rendering loop should be here -->
		<li><!-- Your content in here --></li>
	</ul>
	<a class="st-next" href="#next">Next</a>
</div>
```

As long as you have an `id` on the containing element, an `st-items` class on the items element, and an `st-next` class on the next button, you can use any markup you want:

```html
<div id="content" class="pagination" data-url="/page/:p">
	<h1>My YouTube Favorites</h1>
	<sub>A list of my favorite videos from all across YouTube!</sub>
	<a class="st-next" href="#next">Next</a>
	<section class="st-items">
		{{#favorites}}
		<article>
			<h4>{{title}}</h4>
			<img src="{{thumbnail}}" />
			<var class="duration">{{duration}}</var>
			<em class="author">{{author}}</em>
			<p class="description">{{description}}</p>
			<a href="{{link}}">Watch Now!</a>
		</article>
		{{/favorites}}
	</section>
	<a class="st-next" href="#next">Next</a>
</div>
```

The code to start the plugin itself will also need to be run:

```javascript
$(function(){
	// Since we gave all the containers the "st-pagination" class...
	$('.pagination').stPagination();
});
```

### Configuration

**Configuration options can be set in two ways:** through `data` attributes on the main element (the one `stPagination` is called on), or with a configuration object passed directly to the plugin.

| Parameter | Type | Default | Purpose |
| ----- | ----- | ----- | ----- |
| **url** | `string` | `?p=:p` | The URL for the next page in the set, replacing the page number with ":p" |
| **type** | `string` | `page` | Determines the type of pagination--can be `page`, for APIs that use page numbers, or `skip`, for APIs that skip a certain number of results. |
| **start** | `integer` | `1` | What page/item number to start paginating from. |
| **selectors** | `object` | `{}` | An object of selector names and selector strings. `next` is the selector for the 'next' button, `items` is the selector for the container which items are appended to, and `item` is the selector for individual items. Use this to replace the default `st-items` and `st-next` classes. *This cannot be set with a `data` attribute.* |
| **events** | `object` | `{}` | An object of event names and functions. This is basically just a shortcut for binding to these events with `.on()`. *This cannot be set with a `data` attribute.* |

```html
<!-- Configuring a "skip" paginator with a default skip start -->
<div id="content" class="st-pagination" data-url="start=:p" data-type="skip" data-start="25">
```

```javascript
// Configuring a "page" paginator with a default page start
$('#content').stPagination({
	url: '?page=:p',
	type: 'page',
	start: 1
});
```

### Events

Storyteller Pagination makes the following events available:

| Event | Arguments | Purpose |
| ----- | ----- | ----- |
| **next** | `event`, `element` | Fires when the next set of elements is appended. |
| **complete** | `event`, `element` | Fires when the next page no longer returns results and pagination is over. |

These events can be bound in two ways: with an `events` object in the `stPagination()` configuration object, or with jQuery's normal event bindings.

```javascript
// Binding inside the configuration object
$('.st-pagination').stPagination({
	events: {
		next: function( event, element ){ console.log( 'next', event, element ); },
		complete: function( event, element ){ console.log( 'complete', event, element ); }
	}
});

// Binding with normal events
$('.st-pagination').on( 'next', function( event, element ){ console.log( 'next', event, element ); });

// ... and with an events object
$('.st-pagination').on({
	next: function( event, element ){ console.log( 'next', event, element ); },
	complete: function( event, element ){ console.log( 'complete', event, element ); }
});
```

### License

Storyteller Pagination is available under the MIT License.

---

Copyright © 2013 Story Arc Corp

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.