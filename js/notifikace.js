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

    var dateThu = new Date(getNextThursday().getTime());
    window.plugin.notification.local.add({
        id:      1,
        title:   'Upozorneni',
        message: 'posledni objednavka do 17.00 ',
        repeat:  'weekly',
        date:    dateThu
    });

    alert("notificationSet nastaveno");

}

function notificationSetCustomInput()
{
    var t = $("input[name='cas_notifikace']").val();
    if(t.length==0)
    {
        alert("Vložte prosím čas (HH:MM)");
        return;
    }
    var thours = t.split(":")[0];
    var tmins = t.split(":")[1];

    var dateThu = new Date(getNextThursday(thours, tmins).getTime());
    window.plugin.notification.local.add({
        id:      1,
        title:   'Upozorneni',
        message: 'posledni objednavka do ' + thours + ":" + tmins,
        repeat:  'weekly',
        date:    dateThu
    });

    alert("Upozornění nastaveno");
}

function getNextThursday(hours, mins) {
    if(hours == null) hours = 17;
    if(mins == null) mins = 0;

    var now = new Date();
    var now = new Date('August 30, 2014 3:57:14 pm');
    var day = now.getDay();

    diff = 2 - day;
    if(diff <0)
    {
        diff += 7;
    }
    if(diff == 0)
    {
        if(now.getHours()>=hours && now.getMinutes()>= mins)
            diff += 7;
        else
            diff = 0;
    }
    return new Date(now.getFullYear(),now.getMonth(),now.getDate() + diff,hours,mins);
}


function notificationClear()
{
    window.plugin.notification.local.cancelAll();
    alert("Upozornění vypnuty");
}

function notificationTriggerSet()
{
    window.plugin.notification.local.onclick = function (id, state, json) {
        $("#CollapsiblePanel9 div.CollapsiblePanelContentM").css("display","block");
        $(window).scrollTop($('#CollapsiblePanel9 div.CollapsiblePanelTabM').offset().top);
    };
}