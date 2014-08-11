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


function notificationSetNow()
{
    alert("notificationNow");
    window.plugin.notification.local.add({ message: 'Great app!' });
}

function notificationSet60()
{
    alert("notificationSet60");

    var now = new Date().getTime(),
        _60_seconds_from_now = new Date(now + 60*1000);
    window.plugin.notification.local.add({
        id:      0,
        title:   'Upozorneni' + notifiID.toString(),
        message: 'posledni objednavka do 17.00 ',
        repeat:  'minutely',
        date:    _60_seconds_from_now
    });

}

function notificationSet()
{
    alert("notificationSet");
    //alert(getNextThursday());
    return;

    var now = getNextThursday().getTime();
    window.plugin.notification.local.add({
        id:      1,
        title:   'Upozorneni' + notifiID,
        message: 'posledni objednavka do 17.00 ',
        repeat:  'weekly',
        date:    _60_seconds_from_now
    });

}

function getNextThursday() {
    var now = new Date();
    //var now = new Date('August 30, 2014 3:57:14 pm');
    var day = now.getDay();

    diff = 2 - day;
    if(diff <0)
    {
        diff += 7;
    }
    if(diff == 0)
    {
        alert(now.getHours());
        if(now.getHours()>=17)
            diff += 7;
        else
            diff = 0;
    }
    return new Date(now.getFullYear(),now.getMonth(),now.getDate() + diff,17,00);
    //alert("dalsi ut je za:" + diff );
    //alert(now.getDate() + diff);
}


function notificationClear()
{
    alert("notificationClear");
    window.plugin.notification.local.cancelAll();
}

