define({ "api": [
  {
    "type": "get",
    "url": "/homepage",
    "title": "redirects to homepage of application",
    "name": "homepage",
    "version": "0.0.0",
    "filename": "routes/router.js",
    "group": "C__files_movie_routes_router_js",
    "groupTitle": "C__files_movie_routes_router_js"
  },
  {
    "type": "post",
    "url": "/addmovie/",
    "title": "Add movie",
    "name": "addmovie",
    "group": "Movie",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Response",
            "description": "<p>that movie is added</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Error",
            "description": "<p>status 400</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/router.js",
    "groupTitle": "Movie"
  },
  {
    "type": "delete",
    "url": "/deleteMovie/:id",
    "title": "Deletes movie information",
    "name": "deleteMovie",
    "group": "Movie",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Movie unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "delete",
            "description": "<p>movie movie name</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Sends",
            "description": "<p>the error</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/router.js",
    "groupTitle": "Movie"
  },
  {
    "type": "get",
    "url": "/getAllMovies",
    "title": "Get movie information according to the user",
    "name": "getAllMovies",
    "group": "Movie",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "get",
            "description": "<p>movie movie name</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Sends",
            "description": "<p>error</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/router.js",
    "groupTitle": "Movie"
  },
  {
    "type": "post",
    "url": "/getMovie",
    "title": "get movie information",
    "name": "getMovie",
    "group": "Movie",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "get",
            "description": "<p>movie movie name</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Sends",
            "description": "<p>error</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/router.js",
    "groupTitle": "Movie"
  },
  {
    "type": "get",
    "url": "/logout",
    "title": "Destroys session and returns to login page",
    "name": "logout",
    "group": "Movie",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "redirects",
            "description": "<p>to login page</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Sends",
            "description": "<p>the error</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/router.js",
    "groupTitle": "Movie"
  },
  {
    "type": "put",
    "url": "/updateMovie/:id",
    "title": "Updates movie information",
    "name": "updateMovie",
    "group": "Movie",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "updates",
            "description": "<p>movie movie name</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Sends",
            "description": "<p>error</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/router.js",
    "groupTitle": "Movie"
  },
  {
    "type": "post",
    "url": "/register",
    "title": "Registration of new user",
    "name": "Register",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "JSON",
            "optional": false,
            "field": "JWT",
            "description": "<p>of the registered user</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Bad Request Error All fields are required to be filled by the user Auth failed.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/router.js",
    "groupTitle": "User"
  }
] });
