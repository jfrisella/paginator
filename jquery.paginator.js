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

            /**
            *   client, server
            *   allows client to do pagination or server
            *   client and server have different data layouts
            */
            control: "client",

            fetch: function(callBack){
                if(!_options.url) callBack();
                $.get("", );
            },

            render: function(item){
                console.log("You must override the 'render' function");
                return "<div class=''>" + JSON.stringify(item) + "</div>";
            }
        };


        /**
        *   starts the pagination process
        */
        _private.start = function(){

        }

        _private.display = function(){

        }

        /**
        *   Public functions available through the jquery object
        */
        return {
            /**
            *   Main initialization
            */
            init: function(options){
                console.log("init");

                _private.start();
                _private.$el = $(this);

                //extend defaults with options
                _options = {};
                $.extend(_options, _defaults, options);

                if(false){
                //Do some data checks
                  $.error("init : data : caption data is required");
                  return false;
                }

            },

            /**
            *   Changes Page
            */
            changePage: function(page){
                console.log("changePage");
                console.log(page);
                _options.page = page;
                _private.changePage();
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
