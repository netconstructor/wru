        // common private variables / constants / shortcuts
        TRUE = true,
        FALSE = !TRUE,
        TIMEOUT = 100,
        EMPTY = " ",
        UNKNOWN = "unknown",
        LENGTH = "length",
        NAME = "name",
        DESCRIPTION = "description",
        LISTART = "<li>",
        LIEND = "</li>",
        cursor = "\\|/-",
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
        daryTimeout = 0,
        