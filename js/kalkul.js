function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function KW_getVal(o){ //v1.2
	var retVal="0";if (o.type=="select-one")
	{retVal=(o.selectedIndex==-1)?0:o.options[o.selectedIndex].value;}
	else if (o.length>1){for (var i=0;i<o.length;i++) if (o[i].checked) retVal=o[i].value;
	} else if (o.type=="checkbox") {retVal=(o.checked)?o.value:0;} else {
	retVal=Number(o.value)}return parseFloat(retVal);
}

function KW_calcForm() { //v1.2
	var str="",a=KW_calcForm.arguments; for (var i=3;i<a.length;i++)
	str+=(a[i].indexOf("#")==-1)?a[i]:KW_getVal(MM_findObj(a[i].substring(1)));
	t=Math.round(a[1]*eval(str))/a[1];tS=t.toString();if(a[2]>0){tSp=tS.indexOf(".");
	if(tSp==-1)	tS+=".";tSp=tS.indexOf(".");while(tSp!=(tS.length-1-a[2])){tS+="0";
	tSp=tS.indexOf(".");}} MM_findObj(a[0]).value=tS;
}