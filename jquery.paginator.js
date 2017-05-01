/**
*   Paginator
*/
(function($){

    //Nest inside function
    var _public = (function(){

        var _options = {},
            _private = {};
        var _defaults = {

            time: 0,

            data: null,

            render: function($el, sectionData){

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
