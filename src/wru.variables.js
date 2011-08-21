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
        