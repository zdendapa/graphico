// From www.modernizr.com
var localStorageSupported = function() {
    var mod = 'modernizr';
    try {
        localStorage.setItem(mod, mod);
        localStorage.removeItem(mod);
        return true;
    } catch(e) {
        return false;
    }
};

$(function() {
    if (localStorageSupported()) {
        $('body').append('<div style="font: 36px arial; padding: 20px; text-align: center; color: white; background: green;">localStorage funguje</div>');
    }
    else {
        $('body').append('<div style="font: 36px arial; padding: 20px; text-align: center; color: white; background: red;">localStorage nefunguje</div>');
    }
});
