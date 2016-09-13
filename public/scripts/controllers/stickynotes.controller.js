<<<<<<< HEAD
'use strict';

angular.module('chat.controllers')
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/sticky-notes', {
            templateUrl: 'templates/sticky-notes.view.html',
            controller: 'StickyNotesController'
        });
    }])
    .controller('StickyNotesController', [
        '$scope',
        'userService',
        function ($scope, userService) {
            $scope.username = userService.getCurrentUser().username;

            var notes, count = 0;

            $(document).ready(function () {
                // get references to the 'notes' list
                notes = $("#notes");

                // load notes from local storage if one's available
                loadNotes();

                // clicking the 'New Note' button adds a new note to the list
                $("#btnNew").click(function () {
                    addNewNote();
                });

                // add a note to the list if there aren't any
                if (count === 0) {
                    $("#btnNew").click();
                }
            });

            $scope.saveNotes = function() {
                var notesArray = [];

                // for each of the notes add a bespoke note object to the array
                notes.find("li > div").each(function (i, e) {
                    // save the class attribute of the div, as well as the text for the title and content text areas
                    var colourClass = $(e).attr("class");
                    var title = $(e).find("textarea.note-title");
                    var content = $(e).find("textarea.note-content");

                    notesArray.push({ Index: i, Title: title.val(), Content: content.val(), Class: colourClass });
                });

                // json encode it
                var jsonStr = JSON.stringify(notesArray);

                // and save the json string into local storage
                localStorage.setItem("notes", jsonStr);
            };

            $scope.addNoteEvent = function (noteElement) {
                var div = noteElement.children("div");
                var closeImg = div.find("img");


                div.children().focus(function () {
                    closeImg.removeClass("hide");
                });

                div.hover(function () {
                    closeImg.removeClass("hide");
                }, function () {
                    closeImg.addClass("hide");
                    saveNotes();
                });

                div.children().hover(function () {
                    closeImg.removeClass("hide");
                }, function () {
                    closeImg.addClass("hide");
                });
            };

            $scope.addNewNote = function (className, title, content) {
                // if class is not specified, use a random colour class
                if (!className) {
                    className = "colour" + Math.ceil(Math.random() * 3);
                }

                // add a new note to the end of the list
                notes.append("<li><div class='" + className + "'>" +
                    "<textarea class='note-title' placeholder='Enter Title' maxlength='10'/>" +
                    "<textarea class='note-content' placeholder='Enter text'/>" +
                    "<img class='hide' src='././app-content/img/close.png'/>" +
                    "</div></li>");

                // get the new note that's just been added and attach the click event handler to its close button
                var newNote = notes.find("li:last");
                newNote.find("img").click(function () {
                    // remove the note and save
                    newNote.remove();
                    saveNotes();
                });

                // hook up event handlers to show/hide close button as appropriate
                addNoteEvent(newNote);

                // if a title is provided then set the title of the new note
                if (title) {
                    // get the title textarea element and set its value
                    newNote.find("textarea.note-title").val(title);
                }

                // if a content is provided then set the content of the new note
                if (content) {
                    // get the content textarea element and set its value
                    newNote.find("textarea.note-content").val(content);
                }

                // save
                saveNotes();
            };

            $scope.loadNodes = function() {
                var storedNotes = localStorage.getItem("notes");
                if (storedNotes) {
                    // passes the stored json back into an array of note objects
                    var notesArray = JSON.parse(storedNotes);
                    count = notesArray.length;

                    var i;
                    for (i = 0; i < count; i++) {
                        var storedNote = notesArray[i];
                        addNewNote(storedNote.Class, storedNote.Title, storedNote.Content);
                    }
                }
            };
        }
    ]);




=======
'use strict';

angular.module('chat.controllers')
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/sticky-notes', {
            templateUrl: 'templates/sticky-notes.view.html',
            controller: 'StickyNotesController'
        });
    }])
    .controller('StickyNotesController', [
        '$scope',
        'userService',
        function ($scope, userService) {
            $scope.username = userService.getCurrentUser().username;

            var notes, count = 0;

            $(document).ready(function () {
                // get references to the 'notes' list
                notes = $("#notes");

                // load notes from local storage if one's available
                loadNotes();

                // clicking the 'New Note' button adds a new note to the list
                $("#btnNew").click(function () {
                    addNewNote();
                });

                // add a note to the list if there aren't any
                if (count === 0) {
                    $("#btnNew").click();
                }
            });

            $scope.saveNotes = function() {
                var notesArray = [];

                // for each of the notes add a bespoke note object to the array
                notes.find("li > div").each(function (i, e) {
                    // save the class attribute of the div, as well as the text for the title and content text areas
                    var colourClass = $(e).attr("class");
                    var title = $(e).find("textarea.note-title");
                    var content = $(e).find("textarea.note-content");

                    notesArray.push({ Index: i, Title: title.val(), Content: content.val(), Class: colourClass });
                });

                // json encode it
                var jsonStr = JSON.stringify(notesArray);

                // and save the json string into local storage
                localStorage.setItem("notes", jsonStr);
            };

            $scope.addNoteEvent = function (noteElement) {
                var div = noteElement.children("div");
                var closeImg = div.find("img");


                div.children().focus(function () {
                    closeImg.removeClass("hide");
                });

                div.hover(function () {
                    closeImg.removeClass("hide");
                }, function () {
                    closeImg.addClass("hide");
                    saveNotes();
                });

                div.children().hover(function () {
                    closeImg.removeClass("hide");
                }, function () {
                    closeImg.addClass("hide");
                });
            };

            $scope.addNewNote = function (className, title, content) {
                // if class is not specified, use a random colour class
                if (!className) {
                    className = "colour" + Math.ceil(Math.random() * 3);
                }

                // add a new note to the end of the list
                notes.append("<li><div class='" + className + "'>" +
                    "<textarea class='note-title' placeholder='Enter Title' maxlength='10'/>" +
                    "<textarea class='note-content' placeholder='Enter text'/>" +
                    "<img class='hide' src='././app-content/img/close.png'/>" +
                    "</div></li>");

                // get the new note that's just been added and attach the click event handler to its close button
                var newNote = notes.find("li:last");
                newNote.find("img").click(function () {
                    // remove the note and save
                    newNote.remove();
                    saveNotes();
                });

                // hook up event handlers to show/hide close button as appropriate
                addNoteEvent(newNote);

                // if a title is provided then set the title of the new note
                if (title) {
                    // get the title textarea element and set its value
                    newNote.find("textarea.note-title").val(title);
                }

                // if a content is provided then set the content of the new note
                if (content) {
                    // get the content textarea element and set its value
                    newNote.find("textarea.note-content").val(content);
                }

                // save
                saveNotes();
            };

            $scope.loadNodes = function() {
                var storedNotes = localStorage.getItem("notes");
                if (storedNotes) {
                    // passes the stored json back into an array of note objects
                    var notesArray = JSON.parse(storedNotes);
                    count = notesArray.length;

                    var i;
                    for (i = 0; i < count; i++) {
                        var storedNote = notesArray[i];
                        addNewNote(storedNote.Class, storedNote.Title, storedNote.Content);
                    }
                }
            };
        }
    ]);



// save the notes into local storage

// add event handlers to a note


//  adds a new note to the 'notes' list


// load the notes saved in the local storage


>>>>>>> origin/master
