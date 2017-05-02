/**
*   Paginator
*/
(function($){

    //Nest inside function
    var _public = (function(){

        var _options = {},
            _private = {};
        var _defaults = {

            url: null,
            data: null,
            params: null,
            pageSize: 20,

            btnDefault: "btn-default",
            btnActive: "btn-primary",

            /**
            *   client, server
            *   allows client to do pagination or server
            *   client and server have different data layouts
            */
            pagination: "client",

            /**
            *   allows override of return data
            */
            parse: function(data){
                return (!data || !data.resultSet) ? [] : data.resultSet;
            },

            render: function(item){
                console.log("You must override the 'render' function");
                return "<div class=''>" + JSON.stringify(item) + "</div>";
            },

            renderEmpty: function(){
                return "<div class='well'>Sorry! There were no results.</div>";
            },

            renderLoading: function(){
                return "<div class='well'>Loading . . .</div>";
            }
        };


        //current page
        _private.$el;
        _private.page;
        _private.offset;

        //holds current data for page
        _private.currentData;

        //holds number of last page
        _private.lastPage;


        _private.reset = function(){
            _private.page = 1;
            _private.currentData = null;
            _private.lastPage = null;
        }


        /**
        *   Page rendering functions
        */
        _private.buildPage = function(){
            console.log("buildPage");

            //All data is good, set the last page
            _private.setLastPage();

            var html = "";
            html += _private.buildNavigation();
            html += _private.buildBody();
            html += _private.buildNavigation();
            _private.$el.html(html);

            _private.changeActive();
        }
        _private.buildBody = function(){
            var html = "<div class='row paginator-body-container'><div class='col-xs-12'>";
            if(!_private.currentData.rows || _private.currentData.rows.length === 0){
                html += _options.renderEmpty();
            }else{
                for(var i = 0; i < _private.currentData.rows.length; i+=1){
                    html += _options.render(_private.currentData.rows[i]);
                }
            }
            html += "</div></div>";
            return html;
        }
        _private.buildNavigation = function(){
              var html = "",
                  currentPage = _private.page,
                  lastPage = _private.lastPage;
              html += "<div class='row paginator-pagination-container'><div class='col-xs-12'>";
              html += "<div class='btn-group pull-right'>";
              html += "<a href='' class='btn " + _options.btnDefault + "' id='paginator-prev-page'>&#60;</a>";

              if(lastPage >= 1){

                  if(lastPage < 6){
                      for(var i = 1, items = []; i <= lastPage; i+=1){items.push(i);}
                      html += _private.buildButtons(items);
                  }else if((currentPage + 1) >= lastPage){
                      html += _private.buildButtons([1, "...", lastPage-2, lastPage-1, lastPage]);
                  }else if(currentPage <= 2){
                      html += _private.buildButtons([1,2,3,"...", lastPage]);
                  }else{
                      html += _private.buildButtons([1,"...", currentPage-1, currentPage, currentPage+1, "...", lastPage]);
                  }

              }else{
                  html += "<a href='' class='btn btn-default paginator-set-page' page='0'>0</a>";
              }

              html += "<a href=''class='btn " + _options.btnDefault + "' id='paginator-next-page'>&#62;</a>";
              html+= "</div>";
              html += "</div></div>";
              return html;
        }
        _private.buildButtons = function(items){
            var html = "";
            for(var i = 0; i < items.length; i+=1){
                if(items[i] === "..."){
                    html += "<div class='btn " + _options.btnDefault + "'>...</div>";
                    continue;
                }
                html += "<a href='' class='btn " + _options.btnDefault + " paginator-set-page' page='" + items[i] + "'>" + items[i] + "</a>";
            }
            return html;
        }
        _private.changeActive = function(){
            $(".paginator-pagination-container ." + _options.btnDefault + "[page='" + _private.page + "']")
                .removeClass(_options.btnDefault)
                .addClass(_options.btnActive);
        }


        _private.run = function(){
            _private.fetch(function(){
                _private.buildPage();
            });
        }

        _private.fetch = function(callBack){
            _private.setOffset();

            if(_options.data){
                _private.parseClient();
                return callBack();
            }
            $.get(_options.url, _private.parseFetchParams())
              .done(function(results){
                  var d = _options.parse(results);
                  if(_options.pagination === "client"){
                      _options.data = d;
                      _private.parseClient();
                  }else{
                      _private.currentData = d;
                  }
                  return callBack();
              })
              .fail(function(x, h, r){
                  console.log(r);
                  $.error("fetch : failed to get data from " + _options.url);
              });
        }
        _private.parseClient = function(){
            var end = _private.offset + _options.pageSize,
                end = (_options.data.length < end) ? _options.data.length : end;
            _private.currentData = {
                total: _options.data.length,
                rows: _options.data.slice(_private.offset - 1, end - 1)
            }
        }
        _private.parseFetchParams = function(){
            if(_options.pagination === "client") return _options.params;
            return $.extend({}, _options.params, {
                limit: _options.pageSize,
                offset: _private.offset
            });
        }

        _private.setLastPage = function(){
            _private.lastPage = Math.ceil(_private.currentData.total / _options.pageSize);
        }
        _private.setOffset = function(){
            _private.offset = ((_private.page-1) * _options.pageSize) + 1;
        }


        /**
        *   Events
        */
        $("#paginate-container").on("click", "#paginator-next-page", function(e){
            e.preventDefault();
            _private.$el.paginator("nextPage");
        });
        $("#paginate-container").on("click", "#paginator-prev-page", function(e){
            e.preventDefault();
            _private.$el.paginator("prevPage");
        });
        $("#paginate-container").on("click", ".paginator-set-page", function(e){
            e.preventDefault();
            _private.$el.paginator("setPage", $(e.currentTarget).attr("page"));
        });

        /**
        *   Public functions available through the jquery object
        */
        return {
            /**
            *   Main initialization
            */
            init: function(options){
                console.log("init");

                _private.reset();
                _private.$el = $(this);

                //extend defaults with options
                _options = {};
                $.extend(_options, _defaults, options);

                _private.$el.html(_options.renderLoading());

                //Validation checking
                if(!_options.data && !_options.url){
                    return $.error("init : data/url : [data] or [url] is required");
                }

                //preping variables
                _options.pagination = (_options.pagination !== "server") ? "client" : _options.pagination;

                _private.run();
            },

            setPage: function(page){
                console.log("setPage");
                page = parseInt(page);
                if(page < 1 || page > _private.lastPage) return $.error("setPage : invalid page number");
                _private.page = page;
                _private.run();
            },

            nextPage: function(){
                console.log("nextPage");
                if(_private.page >= _private.lastPage) return $.error("nextPage : there is no next page");
                _private.page += 1
                _private.run();
            },

            prevPage: function(){
                console.log("prevPage");
                if(_private.page <= 1) return $.error("prevPage : there is no previous page");
                _private.page -= 1;
                _private.run();
            }
        };

    }());


    /**
    *   registration on jquery object
    *       - only routes options to closure methods above
    */
    $.fn.paginator = function (methodOrOptions) {
       if (_public[methodOrOptions]) {
           return _public[methodOrOptions].apply(this, Array.prototype.slice.call(arguments, 1));
       } else if (typeof methodOrOptions === 'object' || !methodOrOptions) {
           // Default to "init"
           return _public.init.apply(this, arguments);
       } else {
           $.error('Method ' + methodOrOptions + ' does not exist on jQuery.paginator');
       }
    };

})(jQuery);
