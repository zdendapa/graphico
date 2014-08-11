// JavaScript Document
var now = new Date().getTime(),
    _60_seconds_from_now = new Date(now + 60*1000);
window.plugin.notification.local.add({
    id:      1,
    title:   'Upozorneni',
    message: 'posledni objednavka do 17.00 ',
    repeat:  'minutely',
    date:    _60_seconds_from_now
});


var notifiID = 0;

function notificationSet()
{
    notifiID ++;

    var now = new Date().getTime(),
        _60_seconds_from_now = new Date(now + 60*1000);
    window.plugin.notification.local.add({
        id:      notifiID,
        title:   'Upozorneni' + notifiID,
        message: 'posledni objednavka do 17.00 ',
        repeat:  'minutely',
        date:    _60_seconds_from_now
    });

}

function notificationNow()
{
    window.plugin.notification.local.add({ message: 'Great app!' });
}