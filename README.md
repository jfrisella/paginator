# Paginator
<br>
* [Basic Usage](#basic-usage)
* [Next Page Manually](#next-page-manually)
* [Previous Page Manually](#previous-page-manually)
* [Set Page Manually](#set-page-manually)
* [Data Formats](#data-formats)


<br><br>

# Basic Usage
* you can supply it data directly or from a url
```javascript
$("#main-container").paginator({
    data: [{"name": "item1"},{"name": "item2"}],

    //url can be used instead of direct data
    url: "/my/rest/api",

    //"client" or "server" side pagination
    //data formats are at the bottom
    //client is default  
    //server side will pass two params with $.get request
    // "offset" and "limit"
    pagination: "client",

    //how many items to show on page
    pageSize: 20,

    //other get parameters to be passed with url
    params: {
        "hello": "world"
    },

    //button classes used on the pagination navigation
    //btnActive is the current page
    //btnDefault are all the other non active buttons
    btnDefault: "btn-default",
    btnActive: "btn-primary",

    //There is a parsing function if the data
    //is coming back in an incorrect format
    //list of formats are below
    parse: function(results){
        return results.data;
    },

    //render will return each item to be displayed
    //one at a time
    render: function(item){
        return "<strong>" + item.name + "</strong>";
    },

    //return what you would like to show
    //if there are no results
    renderEmpty: function(){
        return "<strong>Woops!!!</strong>";
    },

    //return what you would like to show
    //when data is loading
    renderLoading: function(){
        return "<strong>Loading . . .</strong>";
    }
});

```

<br><br>

# Next Page Manually
* you must have already called `init`
* will throw jquery error if there is not a next page
```javascript
$("#main-container").paginator("nextPage");
```

<br><br>

# Previous Page Manually
* you must have already called `init`
* will throw jquery error if there is not a previous page
```javascript
$("#main-container").paginator("prevPage");
```

<br><br>

# Set Page Manually
* you must have already called `init`
* will throw jquery error if page does not exist
```javascript
$("#main-container").paginator("setPage", 8);
```

<br><br>

# Data Formats
```javascript
//passing data direct
//client side with URL
[
  {"name": "item1"},
  { "name": "item2"}
]

//server side with url
{
  total: 2,
  rows: [
    { "name": "item1"},
    { "name": "item2"}
  ]
}
```
