(function() {
  window.onload = function() {
    /**
     * @const
     */
    var ELEMENT_ID = "fbloginwidget";
    var widgetElement = document.getElementById(ELEMENT_ID);
    /**
     * Aborts if element not found
     */
    if (widgetElement == null) return;

    /**
     * @const
     */
    var APP_ID = "*";
    /**
     * @const
     */
    var CALLBACK_ATTRIBUTE = "onlogin";
    var callbackString = widgetElement.getAttribute(CALLBACK_ATTRIBUTE);

    /**
     * Callback after authorizing
     */
    var onAuthorized = function() {
        eval(callbackString);
      };


    /**
     * Called when FB jssdk is ready
     */
    var onFBReady = function() {
        var LoginStatus = {
          Authorized: "connected",
          NotAuthorized: "not_authorized"
        }
        /**
         * Checks if user already logged
         */
        FB.getLoginStatus(function(response) {
          if (response.status === LoginStatus.Authorized) {
            onAuthorized();
          }
        });
      };

    /**
     * If not loaded - loading FB jssdk
     */
    if (typeof FB != "undefined") {
      onFBReady();
    } else {
      var root = document.createElement("div");
      root.setAttribute("id", "fb-root");
      document.body.appendChild(root);
      window.fbAsyncInit = onFBReady;

      (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = "//connect.facebook.net/ru_RU/all.js#xfbml=1&appId=" + APP_ID;
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
    }
  }
}());