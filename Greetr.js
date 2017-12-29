(function(global, $) {
    
    //note: return an object by new a function construcor
    //this way the object behaves like a closure, have access to all the 
    //vars in its constructor's lexical envrionment
    var Greetr = function(firstName, lastName, language) {
        return new Greetr.init(firstName, lastName, language);   
    }
    
    //add things you want to use in here, but not want to expose
    //create vars that not part of the object returned, but 
    //can be accessed by the object returned
    
    
   // hidden within the scope of the IIFE and never directly accessible
    var supportedLangs = ['en', 'es']; //still in the memory space
    // of this IIFE but accessible by the returned obj due to closure
    
    
    //using object but not array, so you can access the property using
    //property's name: greetings['en']
    
    //the following vars can be used by construcor or prototype functions
    //bu NOT EXPOSED to outside this module
    var greetings = {
        en: 'Hello',
        es: 'Hola'
    };
    
    var formalGreetings = {
        en: 'Greetings',
        es: 'Saludos'
    };
    
    var logMessages = {
        en: 'Logged in',
        es: 'Inició sesión'
    };
    
   
    //This is the function constructor
    //what in here is UNIQUE for each copy of the object
    //in charge of adding and setting properties of the object creating
    
    // the actual object is created here, allowing us to 'new' an object without calling 'new'

    Greetr.init = function(firstName, lastName, language) {
        
        var self = this; //this points to obj created by new before this                      //constructor: new Greetr('John', 'Doe','en')
        self.firstName = firstName || '';
        self.lastName = lastName || '';
        self.language = language || 'en';
        
    }
    
    //put COMMON(in terms of value) property and method in this obj to save //memory space
    //instead of in the Constructor function
    Greetr.prototype = {
        
        fullName: function() {
            return this.firstName + ' ' + this.lastName;   
        },
        
        validate: function() {
             if (supportedLangs.indexOf(this.language)  === -1) {
                throw "Invalid language";   
             }
        },
        
        greeting: function() {
            return greetings[this.language] + ' ' + this.firstName + '!';
        },
        
        formalGreeting: function() {
            return formalGreetings[this.language] + ', ' + this.fullName();  
        },
        
        greet: function(formal) {
            var msg;
            
            // if undefined or null it will be coerced to 'false'
            if (formal) {
                msg = this.formalGreeting();  
            }
            else {
                msg = this.greeting();  
            }
            //if the console opens
            if (console) {
                console.log(msg);
            }

            // 'this' refers to the calling object at execution time
            // makes the method chainable
            return this;
        },
        
        log: function() {
            if (console) {
                console.log(logMessages[this.language] + ': ' + this.fullName()); 
            }
                            
            return this;
        },
                            
        setLang: function(lang) {
            this.language = lang;
                    
            this.validate();
            
            return this;
        },
        
        HTMLGreeting: function(selector, formal) {
            if (!$) {
                throw 'jQuery not loaded';   
            }
            
            if (!selector) {
                throw 'Missing jQuery selector';   
            }
            
            var msg;
            if (formal) {
                msg = this.formalGreeting();   
            }
            else {
                msg = this.greeting();   
            }
            
            $(selector).html(msg);
            
            // make chainable
            return this;
        }
        
    };
    
    //the prototype should finally connet to the .prototype of the constructor function, redirecting the reference  
    Greetr.init.prototype = Greetr.prototype;
    
    // attach our Greetr to the global object, and provide a shorthand '$G' for ease our poor fingers
    global.Greetr = global.G$ = Greetr;
    
}(window, jQuery));