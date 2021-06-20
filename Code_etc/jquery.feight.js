;(function ( $, window, document, undefined ) {

    var pluginName = 'feight',
        defaults = {
            updateOnResize: true,
            minHeight: false,
            halfHeight: false,
            start: {
              fromWidth: false,
              toWidth: false,
              fromHeight: false,
              toHeight: false
            }
        };

    function Feight( element, options ) {
        this.element = element;
        this.options = $.extend( {}, defaults, options) ;
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Feight.prototype.init = function () {

        this.setDims();

        this.applyHeight();

        this.resizeListener(this);

    };

    Feight.prototype.setDims  = function () {
      this.setHeight();
      this.setWidth();
      this.heightToApply = (this.options.halfHeight) ? this.winHeight / 2 : this.winHeight;
    };

    Feight.prototype.setWidth  = function () {
      this.winWidth = document.documentElement.clientWidth;
    };

    Feight.prototype.setHeight  = function () {
      this.winHeight = document.documentElement.clientHeight;
    };

    Feight.prototype.removeHeight  = function () {
      $(this.element).height('auto');
    };

    Feight.prototype.applyHeight  = function () {
      if (!this.checkRange()) {
        this.removeHeight();
        return false;
      }
      if (this.options.minHeight) $(this.element).css('min-height', this.heightToApply);
      else $(this.element).height(this.heightToApply);
    };

    Feight.prototype.checkRange  = function () {
      if (!this.options.start.fromHeight &&
          !this.options.start.fromWidth &&
          !this.options.start.toHeight &&
          !this.options.start.toWidth) return true;

      if (this.options.start.fromWidth && (this.winWidth < this.options.start.fromWidth)) return false;
      if (this.options.start.toWidth && (this.winWidth > this.options.start.toWidth)) return false;
      if (this.options.start.fromHeight && (this.winHeight < this.options.start.fromHeight)) return false;
      if (this.options.start.toHeight && (this.winHeight > this.options.start.toHeight)) return false;

      return true;
    };

    Feight.prototype.resizeListener  = function (plugin) {
      if (!this.options.updateOnResize) return false;
      $(window).resize( function() {
        plugin.setDims();
        plugin.applyHeight();
      });
    };

    $.fn[pluginName] = function ( options ) {
      return this.each(function () {
        if (!$.data(this, 'plugin_' + pluginName)) {
          $.data(this, 'plugin_' + pluginName,
          new Feight( this, options ));
        }
      });
    };

})( jQuery, window, document );
