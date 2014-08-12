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
    var now = new Date().getTime(),
        _60_seconds_from_now = new Date(now + 60*1000);
    window.plugin.notification.local.add({
        id:      0,
        title:   'Upozorneni',
        message: 'posledni objednavka do 17.00 ',
        repeat:  'minutely',
        date:    _60_seconds_from_now
    });

    alert("notificationSet60 nastaveno");

}

function notificationSet()
{
    //alert(getNextThursday());
    return;

    var dateThu = getNextThursday();
    window.plugin.notification.local.add({
        id:      1,
        title:   'Upozorneni',
        message: 'posledni objednavka do 17.00 ',
        repeat:  'weekly',
        date:    dateThu
    });

    alert("notificationSet nastaveno");

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
        if(now.getHours()>=18)
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
    window.plugin.notification.local.cancelAll();
    alert("Notifikace zruseny");
}

