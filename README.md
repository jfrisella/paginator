# Paginator

# Basic Usage
```javascript
$("#main-container").paginator({
    data: ["some","data"]
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

# Pull Data from URL
```javascript
$("#main-container").paginator({
    url: "/my/rest/api/"
});
```
