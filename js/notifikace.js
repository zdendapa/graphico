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
        title:   'Ferda domů!',
        message: 'posledni objednavka do 17.00',
        repeat:  'weekly',
        date:    dateThu
    });

    alert("Nastaveno!");
    notificationStorage("write");

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

    if(!isNaN(thours) && !isNaN(tmins))
    {
        var dateThu = new Date(getNextThursday(thours, tmins).getTime());
        window.plugin.notification.local.add({
            id:      1,
            title:   '',
            message: 'Nezapomeň objednat pivo Ferdinand dnes do 17:00 hod',
            repeat:  'weekly',
            date:    dateThu
        });

        alert("Upozornění nastaveno");
        notificationStorage("write");
    } else
    {
        alert("Vložte prosím čas (HH:MM)");
        return;
    }


}

function getNextThursday(hours, mins) {
    if(hours == null) hours = 17;
    if(mins == null) mins = 0;

    var now = new Date();
    //var now = new Date('August 30, 2014 3:57:14 pm');
    var day = now.getDay();

    // vypocet dnu (1=pondeli, 2=utery, 3=streda ...)
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
    var el = $("input[name='cas_notifikace']").val("");
    alert("Upozornění vypnuto");
    notificationStorage("write");
}


function notificationTriggerSet()
{
    window.plugin.notification.local.onclick = function (id, state, json) {

        if($("#CollapsiblePanel9 div.CollapsiblePanelContentM").css("display")=="none")
        {
            $("#CollapsiblePanel9 div.CollapsiblePanelTabM").click();
        }
        $(window).scrollTop($('#CollapsiblePanel9 div.CollapsiblePanelTabM').offset().top);
    };
}

// type = read/write
function notificationStorage(type)
{
    if(typeof(Storage) == "undefined") return;

    var el = $("input[name='cas_notifikace']");

    if(type=="write")
    {
        localStorage.setItem("ferdaNotifikace", el.val());
        console.log("notification stored");
    }
    if(type=="read")
    {
        var stored = localStorage.getItem("ferdaNotifikace");
        if(stored !="")
        {
            el.val(stored);
            console.log("notification got from localStore");
        }
    }

}