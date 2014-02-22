module.exports = {
    add: add,
    get: get,
    isSupported: isSupported
};

var rules = {};

// Functions should return the string to be appended to a key to find the pluralized
// form for the count given.
function add(lng, fn) {
    fn.memo = [];
    rules[lng] = function(count) {
        return fn.memo[count] || (fn.memo[count] = fn(count));
    }
}

function get(lng, count) {
    return rules[lng](count);
}

function isSupported(lng) {
	// unknown languages get added with default plural settings
	if ( !rules[lng] ) {
		add(lng, function(n) { return n != 1 ? "_plural" : ""; });
	}

    return !!rules[lng];
}

// no plural for demo purpose on japanese
add("ja", function(n) { return ""; });
