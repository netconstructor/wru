        // node.js specific test
        var wru = require("./../build/wru.console.max").wru;
        wru.test([{
            name: "test that should pass",
            test: function () {
                wru.assert("it passes", 1);
            }
        },{
            name: "async test",
            test: function () {
                setTimeout(wru.async(function () {
                    wru.assert("OK", true);
                }), 2000);
            }
        },{
            name: "test that should fail",
            test: function () {
                wru.assert("this passes", true);
                wru.assert("this fails", 0);
            }
        },{
            name: "test that should throw an error",
            test: function () {
                wru.assert("it's an error", 1);
                WTF++;
            }
        }]);
        