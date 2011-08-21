/*!
(C) Andrea Giammarchi, @WebReflection - Mit Style License
*/
/**@license (C) Andrea Giammarchi, @WebReflection - Mit Style License
*/var wru = function (window) {"use strict";
    
    /**
     * Copyright (C) 2011 by Andrea Giammarchi, @WebReflection
     * 
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     * 
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     * 
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    
    // DOM specific version
    function isGonnaBeLegen() {
        current = shift.call(queue);
        if (current) {
            (node = putItThereAndGimmeBack(
                putItThereAndGimmeBack(wru.node, "div"),
                "span"
            )).innerHTML = (
                (iHasIt(current, NAME) && current[NAME])
                ||
                (iHasIt(current, DESCRIPTION) && current[DESCRIPTION])
                ||
                UNKNOWN
            ) + EMPTY + EMPTY;
            pass = [];
            fail = [];
            fatal = [];
            tmp = {};
            giveItATry("setup");
            fatal[LENGTH] || giveItATry("test");
            giveItATry("teardown");
            waitForIt || Dary();
        } else {
            showSummary();
        }
    }
    
    function create(nodeName) {
        return createElement.call(document, nodeName);
    }
    
    function putItThereAndGimmeBack(node, nodeName) {
        return node.appendChild(create(nodeName));
    }
    
    function passTheInfo(info) {
        node[INNERHTML] = slice.call(node[INNERHTML], 0, -2) + EMPTY + info;
    }
    
    function showSummary() {
        var
            node = wru.node.insertBefore(
                create("div"),
                wru.node.firstChild
            ),
            innerHTML,
            className
        ;
        if (overallFatal) {
            className = "error";
            innerHTML = "There Are Errors: " + overallFatal;
        } else if(overallFail) {
            className = "fail";
            innerHTML = overallFail + " Tests Failed";
        } else {
            className = "pass";
            innerHTML = "Passed " + overallPass + " Tests";
        }
        node.innerHTML = "<strong>" + innerHTML + "</strong>";
        node.className = className;
    }
    
    function showTheProblem() {
        var style = this.lastChild.style;
        style.display = style.display == "none" ? "block" : "none";
    }
    
    function writeItOrdered(fail) {
        node.innerHTML += "<ul>" + LISTART + join.call(fail, LIEND + LISTART) + LIEND + "</ul>";
        (node.onclick = showTheProblem).call(node);
    }
    
    function Dary() {
        passTheInfo("(" + join.call([
            overallPass += pass[LENGTH],
            overallFail += ci = fail[LENGTH],
            overallFatal += fatal[LENGTH]
        ], ", ") + ")");
        node = node.parentNode;
        fatal.length ?
            writeItOrdered(fatal, prefix = "error")
            : (
                ci ?
                    writeItOrdered(fail, prefix = "fail")
                    :
                    prefix = "pass"
            )
        ;
        node.className = prefix;
        ci = 0;
        prefix = EMPTY;
        isGonnaBeLegen();
    }
    
    // common functions for all versions
    function giveItATry(name) {
        if (iHasIt(current, name)) {
            try {
                current[name](tmp);
            } catch(doooodeThisIsBAD) {
                push.call(fatal, EMPTY + doooodeThisIsBAD);
            }
        }
    }
    
    function iHasIt(object, name) {
        return hasOwnProperty.call(object, name);
    }
    
    function messItUp() {
        return random() < .5 ? -1 : 1;
    }
    
    
    var // wru library core
        wru = {
            assert: function assert(description, result) {
                
                // if no description provided, variables are shifted
                // these are both valid wru.assert calls indeed
                // wru.assert(truishValue);
                // wru.assert("test description", truishValue);
                if (arguments[LENGTH] == 1) {
                    result = description;
                    description = UNKNOWN;
                }
                
                // flag used in wru.async to verify at least
                // one assertion was performed
                called = TRUE;
                
                // store the result in the right collection
                push.call(result ? pass : fail, prefix + description);
            },
            async: function async(description, callback, timeout, p) {
                
                // p is used as sentinel
                // it defines the anonymous name
                // if necessary and it's used to flag the timeout
                p = ++waitForIt;
                
                // if no description provided, variables are shifted
                // these are all valid wru.async calls indeed, timeout is optional
                // wru.async(function () { ... })
                // wru.async("test description", function () { ... })
                // wru.async(function () { ... }, timeout)
                // wru.async("test description", function () { ... }, timeout)
                if (typeof description == "function") {
                    timeout = callback;
                    callback = description;
                    description = "asynchronous test #" + p;
                }
                
                // if in *TIMEOUT* time nothing happens ...
                timeout = setTimeout(function () {
                    
                    // p is flagged as 0
                    p = 0;
                    
                    // timeout is handled as failure, not error (could be the server)
                    push.call(fail, description);
                    
                    // if there is no reason to waitForIt then is time to call Dary()
                    --waitForIt || Dary();
                },
                    // timeout can be specified
                    // this procedure ensure that it's
                    // a number and it's greater than 0
                    abs(timeout || TIMEOUT) || TIMEOUT
                );
                
                // the async function is a wrap of the passed callback
                return function async() {
                    
                    // if it's executed after the timeout nothing happens
                    // since the failure has been already notified
                    if (!p) return;
                    
                    // called is always set as *TRUE* during any assertion
                    // this indicates if the callback made at least one assertion
                    // as example, in this case the callback could be called many time
                    // with different readyState ... however, only on readyState 4
                    // there is the assertion we are interested about, e.g.
                    // 
                    // xhr.onreadystatechange = wru.async(function (){
                    //      if (this.readyState == 4)
                    //          wru.assert("content", this.responseText.length)
                    //      ;
                    // });
                    // 
                    // in above example called will be flagged as true
                    // only during last readyState call
                    called = FALSE;
                    
                    // simply recycled "string" variable
                    // prefix will be internally used by assert during function execution
                    prefix = description + ": ";
                    
                    // the original callback is called with proper *this* if specified
                    try {
                        callback.apply(this, arguments);
                    } catch($) {
                        // if there is an Error
                        // the test is screwed up
                        // called has to be set as *TRUE* to invalidate the test
                        called = TRUE;
                        // message is "casted" to avoid IE host objects errors problem
                        // (or any other possible edge case)
                        push.call(fatal, prefix + doooodeThisIsBAD);
                    }
                    
                    // prefix can be *EMPTY* string again now
                    prefix = EMPTY;
                    
                    // a failure or at least an assertion
                    if (called) {
                        
                        // timeout not necessary anymore
                        clearTimeout(timeout);
                        
                        // if there is no reason to waitForIt then is time to call Dary()
                        --waitForIt || Dary();
                    }
                };
            },
            
            // wru.test({...test...})
            // wru.test([{...test...}, {...test...}, ...])
            // the {...test...} object should have a string name and a function test property
            // optionally a function setup and a function teardown too
            test: function test(list) {
                
                // test may be called multiple times
                // queue should simply concatenate other calls
                queue = concat.apply(queue, [list]);
                
                // if wru.random is true, the queue is ranodomized
                // this is to make tests indipendent from each others
                wru.random && sort.call(queue, messItUp);
                
                // if there is no test to waitForIt
                // Dary() has been called already
                // we can procede with next test
                // invoking isGonnaBeLegen()
                waitForIt || isGonnaBeLegen();
            }
        },
        
        // common private variables / constants / shortcuts
        TRUE = true,
        FALSE = !TRUE,
        TIMEOUT = 100,
        EMPTY = " ",
        SEPARATOR = ", ",
        UNKNOWN = "unknown",
        LENGTH = "length",
        INNERHTML = "innerHTML",
        NAME = "name",
        DESCRIPTION = "description",
        LISTART = "<li>",
        LIEND = "</li>",
        hasOwnProperty = wru.hasOwnProperty,
        prefix = EMPTY,
        charAt = prefix.charAt,
        slice = prefix.slice,
        queue = [],
        concat = queue.concat,
        join = queue.join,
        push = queue.push,
        shift = queue.shift,
        sort = queue.sort,
        waitForIt = 0,
        ci = 0,
        overallPass = 0,
        overallFail = 0,
        overallFatal = 0,
        
        
        // these variables are used on DOM version only
        cursor = "\\|/-",
        document = window.document,
        createElement = document.createElement,
        
        
        // shared across the whole private scope
        Math, abs, random, setTimeout, clearTimeout,
        current, node, pass, fail, fatal, tmp, called
    ;
    
    // these are window/global object dependent
    // must be eventually defined after wru.export.js, if used
    Math = window.Math;
    abs = Math.abs;
    random = Math.random;
    setTimeout = window.setTimeout;
    clearTimeout = window.clearTimeout;
        
    
    // the default node to use for tests
    // feel free to specify another one
    // before wru.test() call
    wru.node = (
        document.getElementById("wru") ||
        document.body ||
        document.documentElement
    );
    
    // "THE CURSOR" http://3site.eu/cursor
    window.setInterval(function () {
        waitForIt && passTheInfo(charAt.call(cursor, ci++%4));
    }, TIMEOUT);
    
    
    //^ this is useful to test internals on non minified version
    wru.debug = function (O_o) {
        return eval("(" + O_o + ")");
    };
    //$ and this block is removed at build time
    
    
    TIMEOUT *= TIMEOUT; // by default, timeout is 10000 (10 seconds)
                        // this is the place you can set it, e.g.
                        // TIMEOUT = 2000; // 2 seconds
    
    wru.random = FALSE; // by default tests order is preseverd
                        // set wru.random = TRUE to randomly sort them
    
    return wru;
    
}(this);