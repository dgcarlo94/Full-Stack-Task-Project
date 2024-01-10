(function(window) {
    window.env = window.env || {};
  
    // Environment variables
    window["env"]["apiUrl"] = "${API_DOCKER_PATH}";
    window["env"]["debug"] = "${DEBUG}";
  })(this);