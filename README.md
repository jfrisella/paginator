# Paginator

# Basic Usage
```
$("#main-container").paginator({
    data: ["some","data"]
});
```

<br><br>

# Next Page Manually
* you must have already called `init`
* will throw jquery error if there is not a next page
```
$("#main-container").paginator("nextPage");
```

<br><br>

# Previous Page Manually
* you must have already called `init`
* will throw jquery error if there is not a previous page
```
$("#main-container").paginator("prevPage");
```

<br><br>

# Set Page Manually
* you must have already called `init`
* will throw jquery error if page does not exist
```
$("#main-container").paginator("setPage", 8);
```

<br><br>

# Pull Data from URL
```
$("#main-container").paginator({
    url: "/my/rest/api/"
});
```
