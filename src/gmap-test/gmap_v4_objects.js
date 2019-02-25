//ham goi ajax cu thay bang jquery
function ajaxURLCallback(url,f,isxml,e){
		$.ajax({
		        url: url,
		        type: 'POST',
		        cache: false,
		        success: function(o){
		  			f(o,e);
		        },
		        error: function (){
		            alert('Có lỗi xảy ra khi gọi'+url);
		        }
		    });
}
// hàm ajax popup dùng chung
function doAjaxPopupForm(d_id,d_cls,url,f_title,h,w,md,rz){ //div_id, div_class, url, title, h, w, modal, resizable
	$("#"+d_id).dialog({title:f_title,
						height: h,
						width: w,
						modal: ((md)?md:false),
						position: "center",
						resizeable: ((rz)?rz:false)
						});
		if (!$("#"+d_id).dialog( "isOpen" )) {
			$("#"+d_id).dialog("open");
		}
		jQuery("#"+d_id).showLoading(); //show loading
		$.ajax({
            url: url,
			method: "POST",
            cache: false,
            dataType: "html",
            success: function(data){
            	$("#"+d_id+" ."+d_cls).html(data);
            	jQuery("#"+d_id).hideLoading(); //hide loading
            },
            error: function (er){
            	alert('Có lỗi: \n'+er+'\n.Xảy ra khi gọi:\n' + url);
        	}
        });
  		return true;
}
////////////////////////////////////////////
var VMS_timer={
delay:5,//milisecond
count:0,
list:[],
fcall:null,
busy:false,
push:function(o){
	if(!this.busy){
		this.list=o;
		this.count=this.list.length;        //dem so luong cua doi tuong can ve
	}
},
run:function(o){
	if(this.fcall)this.fcall(o);
	setTimeout('VMS_timer.start()',this.delay);
},
start:function(){
		try{if(this.list.length>0){
				this.count=this.list.length; //dem so luong cua doi tuong con lai
				var o=this.list.shift();
				this.busy=true;
				this.run(o);
			}else{
				this.busy=false;
				this.count=0;
				if(this.fcall)this.fcall(); //goi ham nay bao da ket thuc
			}
			}catch(e){this.busy=false;}
	}
,
//cac bien su dung cho schedule -- 
stop:true,
scheduleDelay:3000,
fschedule:null,
scheduleRun:function(){
	if(this.fschedule){
		this.fschedule();
		setTimeout('VMS_timer.scheduleStart()',this.scheduleDelay);
	}
}
,
scheduleStart:function(){if(!this.stop)this.scheduleRun()}
}
//////////////////////////////////////////////
//cach su dung
//gan VMS_timer.list=[mang du lieu cua nhieu obj];
//khai bao ham VMS_timer.fcall=function(obj){thuc thi nhiem vu gi co object do}
//sau do goi ham VMS_timer.start()
//end of timer/
///////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
//drag drop mouse for id
//drag drop 
//doan menh de sau cho phep nguoi dung keo, di chuyen cua so 
//co dragclass den bat ky dau de thuc thi chuc nang rieng biet

if (document.getElementById){
(function(){
//Stop Opera selecting anything whilst dragging.
if (window.opera){document.write("<input type='hidden' id='Q' value=' '>");}
var n = 500;
var dragok = false;
var y,x,d,dy,dx;
document.onmousedown=function(e){
	if (!e)e=window.event;
	var temp=(typeof e.target!="undefined")?e.target:e.srcElement;
	if (temp.tagName!="HTML"|"BODY"&&temp.className!="dragclass"){
	 temp=(typeof temp.parentNode != "undefined")?temp.parentNode:temp.parentElement;
	 }
	if (temp.className == "dragclass"){
	 if (window.opera){
	  document.getElementById("Q").focus();
	 }
	 dragok = true;
	 temp.style.zIndex = n++;
	 d = temp;
	 dx = parseInt(temp.style.left+0);
	 dy = parseInt(temp.style.top+0);
	 x = e.clientX;
	 y = e.clientY;
document.onmousemove=function(e){
			if(!e)e=window.event;
			if(dragok){
  			d.style.left=dx+e.clientX-x+"px";
  			d.style.top=dy+e.clientY-y+"px";
  			return false;
 			}};
	 return false;
	 }
	};
document.onmouseup=function(){dragok=false;document.onmousemove=null;};
})();
}
///////////////////////////////////////////////
//cach su dung la khai mot mang gia tri sau
//obj=[[1,"Menu 1"],[2,"Menu 2"],[],[3,"Menu 3"]];
var VMS_pmenu={
layer:".all",
style:".style",
brws:0,
id:'pmenu',
isClean:false,
doo:null,
doOption:null,
doSearch:null,
getIcon:null,
highlight:function(e){e.style.backgroundColor="highlight"}
,
lowlight:function(e){e.style.backgroundColor=""}
,
init:function(obj){
	//khoi tao trinh duyet
	if(navigator.userAgent.indexOf("MSIE")!=-1){
		this.layer=".all";
		this.style=".style";
	}else if(navigator.userAgent.indexOf("Nav")!=-1){
		this.layer =".layers";
		this.style="";
	 	if(document.getElementById) this.brws=1
		else this.brws=2
	 }
	//khoi tao div
	if(obj){
		var popDiv=document.createElement("div");
        popDiv.id =this.id;
        popDiv.className ="popmenu";
        popDiv.onmouseover=function(){hideTip()};
        
        if(obj.length>0){
			for(var i=0;i<obj.length;i++){
				if(obj[i].length==2){
					var chDiv=document.createElement("div");
		 			   chDiv.className ="popitem";
		 			   chDiv.func=obj[i][0];
	 			       chDiv.onclick=function(){
		 			       if(VMS_pmenu.doo)VMS_pmenu.doo(this)
	 			       };
	 			       chDiv.innerHTML =obj[i][1];
	 			       //thay doi mau khi di chuyen chuot len no
	 			       chDiv.onmouseover=function(){VMS_pmenu.highlight(this)};
					   chDiv.onmouseout=function(){VMS_pmenu.lowlight(this)};
					   //////////////////////////////////////////
	 			       
	 			       popDiv.appendChild(chDiv);
	    		}else popDiv.appendChild(document.createElement("hr"));
	    	}
	    }
		document.body.appendChild(popDiv);
		//popDiv.style.display='';
		return document.getElementById(this.id);
	}
	return null;
},
addInput:function(type,name,obj){
	if(obj){
    //Create an input type dynamically.   
    var element = document.createElement("input");
    //Assign different attributes to the element.   
    element.setAttribute("type",type);   
    element.setAttribute("value",name);   
    element.setAttribute("name",name);   
     
    obj.appendChild(element);   
  	}
}
,
table:null //bien luu tru bang co the tim kiem va them du lieu
,
addRow:function(msg){
	if(this.table&&msg){
	//tao them cot va du lieu cho cua so search
var	oRow=this.table.insertRow(2);
var	oCell=oRow.insertCell(0);
	oCell.bordercolorlight="#808080" 
	oCell.bordercolordark="#000000"
	oCell.innerHTML=msg;
	}
}
,
autoComplete:function(){
	
var bDS = new YAHOO.util.XHRDataSource("gmap_sql/qlm_gmap_site_search.jsp");
    bDS.responseType = YAHOO.util.XHRDataSource.TYPE_TEXT;
    
    // Define the schema of the delimited results
    bDS.responseSchema = {
        recordDelim: "\n",
        fieldDelim: "-!$!-",
 		fields: ["site_id", "site_name"]
    };
    // Enable caching
    bDS.maxCacheEntries = 5;
	
    // Instantiate AutoCompletes
    var oConfigs = {
        prehighlightClassName: "yui-ac-prehighlight",
        useShadow: true,
        queryDelay: 0,
        minQueryLength: 0,
        animVert: .01
    }
    
    var bAC=new YAHOO.widget.AutoComplete("gmapsite_id","bContainer",bDS,oConfigs);
    
	bAC.maxResultsDisplayed=15;
	bAC.resultTypeList=false;
	bAC.formatResult=function(data,query,match){ 
		return '<b>'+data.site_id+'</b>, '+data.site_name;
	}
	
}
,
initSearchWindow:function(){
//var ok=document.getElementById("search");
if(!document.getElementById("gsearch")){
var sDiv=document.createElement("div");
    sDiv.id ="gsearch";
    sDiv.className ="dragclass";
    sDiv.align="right";
   
var oImg=document.createElement("img");
	oImg.setAttribute('src',map_default.iclose());
	oImg.setAttribute('alt','close');
	oImg.setAttribute('height','20px');
	oImg.setAttribute('width','20px');
	oImg.onmousemove=function(){doTooltip('Ẩn cửa sổ điều khiển này')};
	oImg.onmouseout=function(){hideTip()}
	oImg.onclick=function(){
		VMS_pmenu.changeState("gsearch","hidden");
	}
	sDiv.appendChild(oImg);
	document.body.appendChild(sDiv);

var oTable=document.createElement("table");
	oTable.className ="dragtable";
	sDiv.appendChild(oTable);
	
    //gan ban cho doi tuong nay
 	this.table=oTable;
 				
var	oRow=oTable.insertRow(0);
var	oCell=oRow.insertCell(0);
	oCell.align="left";
	oCell.innerHTML="";


var sDiv1=document.createElement("div");
    sDiv1.id ="bAutoComplete";
    
var e1 = document.createElement("input");
	e1.id="gmapsite_id";
    e1.setAttribute("type","text");
    e1.setAttribute("value","");
    e1.setAttribute("name","gmapsite_id");
    e1.onmousemove=function(){doTooltip('Nhập vào <b>địa chỉ</b> hoặc <b>- Mã trạm </b>hoặc<b>-Mã điểm bán hàng</b> để tìm kiếm.<br>Sử dụng dấu * hoặc dấu % để xác định các ký tự không biết và dấu _ hoặc dấu ? hoặc dấu # để thay thế các ký tự chưa biết')};
	e1.onmouseout=function(){hideTip()}
    e1.onkeyup=function(event){
   		if(window.event)event=window.event;
   		if(event.keyCode==13)
   			if(VMS_pmenu.doSearch)if(this.value.length>0)VMS_pmenu.doSearch(this.value);
   			//tim kiem bang ban phim
    };
    
    sDiv1.appendChild(e1);

var e2 = document.createElement("input");
    e2.setAttribute("type","button");
    e2.setAttribute("value","Tìm kiếm");
    e2.setAttribute("name","Search");
    e2.onmousemove=function(){doTooltip('Tìm kiếm theo địa chỉ hoặc mã trạm hoặc mã điểm bán hàng')};
	e2.onmouseout=function(){hideTip()}
    e2.onclick=function(){
    	var txt=document.getElementById("gmapsite_id");
    	if(VMS_pmenu.doSearch&&txt)if(txt.value.length>0)VMS_pmenu.doSearch(txt.value);
    	//tim kiem bang chuot
    };
    
    sDiv1.appendChild(e2);

var e3 = document.createElement("input");
    e3.setAttribute("type","button");
    e3.setAttribute("value","Tùy chọn");
    e3.setAttribute("id","Option");
    e3.setAttribute("name","Option");
    e3.onmousemove=function(){doTooltip('Tìm kiếm điểm bán hàng theo địa chỉ đã import vào danh sách')};
    e3.onmouseout=function(){hideTip()}
    e3.onclick=function(){
    	if(VMS_pmenu.doOption)VMS_pmenu.doOption();
    };
    sDiv1.appendChild(e3);
 
 
var ec = document.createElement("input");
    ec.setAttribute("type","checkbox");
    ec.setAttribute("value","Clean");
    ec.setAttribute("id","Clean");
    ec.setAttribute("name","Clean");
	ec.onmousemove=function(){doTooltip('Chọn để xóa khi load mới, làm nhẹ xử lý của máy tính')};
	ec.onmouseout=function(){hideTip()}
	ec.onclick=function(){
    	VMS_pmenu.isClean=this.checked;
    };
    sDiv1.appendChild(ec);
 
var sDiv2=document.createElement("div");
    sDiv2.id ="bContainer";
    sDiv2.align="left";
	sDiv1.appendChild(sDiv2);
	//sDiv1.align="center";
	oCell.appendChild(sDiv1);
	
//tao them cot va du lieu cho cua so search

var	oRow2=oTable.insertRow(1);
var	oCell2=oRow2.insertCell(0);

	VMS_pmenu.autoComplete();
	
	e1.focus();
	
	}else{
		VMS_pmenu.changeState("gsearch","visible");
		document.getElementById("gmapsite_id").focus();
	}

},
changeState:function(layerRef,state){
	eval("document"+this.layer+"['"+layerRef+"']"+this.style+".visibility='"+state+"'")
},
showmenuie5:function(e){
	var ie5=document.all&&document.getElementById;
	var pobj=document.getElementById(VMS_pmenu.id);
	var rightedge=ie5?document.body.clientWidth-event.clientX:window.innerWidth-e.clientX;
	var bottomedge=ie5?document.body.clientHeight-event.clientY:window.innerHeight-e.clientY;
	if (rightedge<pobj.offsetWidth)
		pobj.style.left=ie5?document.body.scrollLeft+event.clientX-pobj.offsetWidth:window.pageXOffset+e.clientX-pobj.offsetWidth;
	else
		pobj.style.left=ie5?document.body.scrollLeft+event.clientX:window.pageXOffset+e.clientX;
	if (bottomedge<pobj.offsetHeight)
		pobj.style.top=ie5?document.body.scrollTop+event.clientY-pobj.offsetHeight:window.pageYOffset+e.clientY-pobj.offsetHeight;
	else
		pobj.style.top=ie5?document.body.scrollTop+event.clientY:window.pageYOffset+e.clientY;
	VMS_pmenu.changeState(VMS_pmenu.id,"visible");
	return false;
},
hidemenuie5:function(e){
	VMS_pmenu.changeState(VMS_pmenu.id,"hidden");
}
}
///////////////////////////////////////////////
//Sau do su dung cac cau lenh mau sau de thuc hien
/*
var obj=[[1,"Menu 1"],[2,"Menu 2"],[],[3,"Menu 3"]];
VMS_pmenu.doo=function(func){
				alert(func); //ham xu ly theo chuc nang 1,2,3 tuong ung o tren
				};
var pobj=VMS_pmenu.init(obj);
if(pobj){
	document.oncontextmenu=VMS_pmenu.showmenuie5;
	document.onclick=VMS_pmenu.hidemenuie5;
}
*/
//END OF POP UP MENU
//lay gia tri default ma nguoi su dung da click sau cung tren ban do

//prototype for convert radian to degree
Number.prototype.toRad=function(){return this*Math.PI/180}
Number.prototype.toDeg=function(){return this*180/Math.PI}
Number.prototype.toBrng=function(){return (this.toDeg()+360)%360}

var alarmColors=[["#F33F00","#FF0000"],["#FF6699","#FF66FF"],["#FF9999","#FF99FF"],["#FFCC99","#FFCCFF"],["#FFFF99","#FFFFCC"],["#CCFF66","#CCFFCC"]];

var VMS_map={
map:null,
isLoaded:false,
isBusy:false,
isMeasure:false,
isRouteEdit:false,
isLinked:false,
isViewer:false,
isOffline:false,
s_count:0,
func:0,
sites:[],
latlngs:[],
points:[],
areas:[],
lines:[],
links:[],
cells:[],
alarms:[],
charlines:[],
//cac bien tam
lpoint:null,
poly:null,
route:null,
node:null,
line:null,
lab1:null,
view:null,
e:null,
//cac ham khai bao tu ben ngoai de goi chuc nang tuong ung
doOptionDetail:null,//neu khai bao ham nay thi duoc phep goi ham -- thuc thi cac chuc nang tuy chon danh theo id 1-hien thi xa 2-...
pointAdd:null, //neu khai bao ham nay thi duoc phep goi ham
pointDrag:null,//Neu di chuyen doi tuong ket thuc thi goi ham nay
pointEdit:null, //neu khai bao ham nay thi duoc phep goi ham
pointClick:null, //Ham duoc goi khi click tren mapLatLng
pointEditDetail:null, //Neu khai bao ham nay thi duoc phep goi ham de sua thong tin chi tiet cua mot diem tren ban do
pointSearch:null, //Tim kiem toa do theo danh sach dia chi
cellClick:null,   //Khi click vao vung cell se goi duoc ham nay
nodeClick:null, //neu khai bao ham de goi moi thi xu ly bien m
lineClick:null, //khai bao ham ben ngoai xu ly ve duong thang click
areaClick:null, //khai bao ham ben ngoai xu ly ve vung canh bao...
rightClickLine:null,
rightClickNode:null,
loadDataFirst:null,
//cac ham xu ly ve chuot
mouseMove:null,
mouseClick:null,
mouseRightClick:null,
mapMoveEnd:null,//ban do thay doi xong
oldLAT:0,
oldLON:0,
mapMoveEnd:null,//ban do thay doi xong
mapDragEnd:null,//keo tha xong
mapCenterChanged:null,//trung tam ban do bi thay doi -- bang do co di chuyen di
getCenterData:null, //lay du lieu tram trung tam neu co
drawTrackedSignals:null,
geocoder:null, //giai ma dia chi tren ban do
mapLatLng:function(sid,la,lo,img,ia,t){ //ID,la,lo,img,tooltip,type=-1=dragable
	if(this.latlngs[sid]!=null) this.latlngs[sid].setMap(null);
	var sicon = 18;
	if (t==null||t<=0)sicon = 18; else sicon = 30;
	var image = {url: img,
				 size: new google.maps.Size(sicon,sicon)
				 ,origin: new google.maps.Point(0,0)
				 ,anchor: new google.maps.Point(sicon/2,sicon/2)
			  	};
  	var m = new google.maps.Marker({icon: image,
								        draggable:(t==-1||t>0?true:false),  //cho phép điều chỉnh vị trí để lấy vị trí
								        position: new google.maps.LatLng(la,lo),
								        map: map,
								        title: ia
								    });
	this.latlngs[sid]=m;
	this.latlngs[sid].latlngid=sid;
	this.latlngs[sid].latlngAddress=ia;
	if(t!=null)this.latlngs[sid].latlngtype=t;
	google.maps.event.addListener(this.latlngs[sid], 
    							'click',
								function(){
									  if (VMS_map.pointClick) VMS_map.pointClick(sid,ia);
								});
    google.maps.event.addListener(this.latlngs[sid],
								'drag',
								function(p) {
									  if (VMS_map.pointDrag) VMS_map.pointDrag(sid,p.latLng.lat(),p.latLng.lng());
    							}
    							);
    google.maps.event.addListener(this.latlngs[sid],
								'dragend',
								function(p) {
								   //Tìm địa chỉ theo tọa độ
								   	var geocoder_address = new google.maps.Geocoder();
								   	geocoder_address.geocode({'latLng': m.getPosition()},
															 function(results, status){
																		if (status == google.maps.GeocoderStatus.OK){
																			if (results[0]) {
						     													if (VMS_map.pointEdit) VMS_map.pointEdit(sid,p.latLng.lat(),p.latLng.lng(),results[0].formatted_address);
																			}
						       											}
                											 }
                											);
    								}
    							);
},
searchAddress:function(ad,drg){ //ad = address tim toa do theo dia chi nhap vao
	var geocoder = new google.maps.Geocoder();
	geocoder.geocode({'address': ad}, 
  						function(results, status) {
    							if (status == google.maps.GeocoderStatus.OK) {
      							map.setCenter(results[0].geometry.location);
      							var m = new google.maps.Marker({icon: map_default.getimg(0),
																draggable:drg,  //cho phep keo tha neu muon
																position: results[0].geometry.location,
																        map: map,
																        title: 'Tìm thấy bởi google từ địa chỉ: '+ad
						      									});
						      		return results[0].geometry.location; //tra ve vi tri latlng cua diem duoc tim thay
    							} else {
      									alert('Google Không tìm ra địa chỉ do bạn nhập vào: '+ad+'\n'
      										  +'Vui lòng nhập địa chỉ cụ thể và rõ ràng theo đường phố, thành phố, tỉnh thành, và quốc gia');
      								return null;
    							}
  							}
  						);
},
createLine:function(lid,lalo1,lalo2,lcolor,lwidth){
	if(this.lines[lid]!=null) this.lines[lid].setMap(null);
	 var pts = [lalo1,lalo2];
	 var l = new google.maps.Polyline({
				    path: pts,
				    geodesic: true,
				    strokeColor: lcolor,
				    strokeOpacity: 1,
				    strokeWeight: lwidth
				  });
	this.lines[lid] = l;
	this.lines[lid].setMap(map);
	return l;
},
mapArea:function(sid,la,lo,r,j,w,al,t){ //ID,lat,lon,rộng của vùng,độ mịn, độ lớn của đường, số thứ tự màu,type
	var ps=[];
    for(var i=0;i<361;i+=j){
   		var p=new google.maps.LatLng(la+r*Math.cos(i.toRad()),lo+r*Math.sin(i.toRad()));
        ps.push(p);
    }
    ps.push(ps[0]);
    if(this.areas[sid]!=null)this.areas[sid].setMap(null);
    var plgon= new google.maps.Polygon({
										paths: ps,
										strokeColor: alarmColors[al][1],
										strokeOpacity: 0.8,
										strokeWeight: w,
										fillColor: alarmColors[al][0],
										fillOpacity: 0.35
										});
	this.areas[sid]=plgon;
	this.areas[sid].areaid=sid;
	if(t!=null) this.areas[sid].areatype=t;
	google.maps.event.addListener(this.areas[sid],
								'click',
								function() {
									  if (VMS_map.areaClick) VMS_map.areaClick(sid);
    							});
	this.areas[sid].setMap(map);
	return this.areas[sid];
},
drawTrackedRoute:function(id,r,c,w){ //id, route[lat,lng], mau, do rong
	var ps=[];
    for(var i=0;i<r.length;i++){
    	var p=new google.maps.LatLng(r[i][0],r[i][1]);
        ps.push(p);
    }
    //alert(ps);
    var pline= new google.maps.Polyline({
				    path: ps,
				    geodesic: true,
				    strokeColor: c,
				    strokeOpacity: 1,
				    strokeWeight: w
				  });
	pline.setMap(map);
	return pline;
},
drawTrackedPoints:function(id,rp,img,t){ //id, route[lat,lng,id],type
    for(var i=0;i<rp.length;i++){
    	this.mapLatLng(rp[i][2],rp[i][0],rp[i][1],img,rp[i][2],t); //ID,la,lo,img,tooltip,type=-1=dragable
    }
},
drawCircle:function(la,lo,r,j,c1,c2,w){ //toa do, ban kinh,buoc nhay, mau, do rong
	var ps=[];
    for(var i=0;i<361;i+=j){
   		var p=new google.maps.LatLng(la+r*Math.cos(i.toRad()),lo+r*Math.sin(i.toRad()));
        ps.push(p);
    }
    ps.push(ps[0]);
    var plgon= new google.maps.Polygon({
										paths: ps,
										strokeColor: c1,
										strokeOpacity: 0.8,
										strokeWeight: w,
										fillColor: c2,
										fillOpacity: 0.2
										});
	plgon.setMap(map);
	return plgon;
},
drawCell:function(id,la,lo,a,r,j,c,w){ //toa do, ban kinh,goc xoay,goc cung, mau, do rong
	var ps=[];
	ps.push(new google.maps.LatLng(la,lo));
    for(var i=a-j/2;i<a+j/2;i++){
   		var p=new google.maps.LatLng(la+r*Math.cos(i.toRad()),lo+r*Math.sin(i.toRad()));
        ps.push(p);
    }
    ps.push(ps[0]);
    var plgon= new google.maps.Polygon({
										paths: ps,
										strokeColor: c,
										strokeOpacity: 0.9, //dam nhac duong vien
										strokeWeight: w,
										fillColor: c,		
										fillOpacity: 0.1 // dam nhac background
										});
	google.maps.event.addListener(plgon,
								'click',
								function() {
									  if (VMS_map.cellClick) VMS_map.cellClick(id);
    							});
    google.maps.event.addListener(plgon,
								'mouseover',
								function() {
									  doTooltip(id);
    							});
    google.maps.event.addListener(plgon,
								'mouseout',
								function() {
									  hideTip();
    							});
	plgon.setMap(map);
	return plgon;
},
createCell:function(cid,la,lo,angle,rlength,c,d){ //ID, Lat,lon,goc,bankinh,mau,dorongduong
	if(this.cells[cid]==null&&angle!=null){
		this.cells[cid]=this.drawCell(cid,la,lo,angle,rlength,60,c,d);
		this.cells[cid].cellid=cid;
	}
},
createCells:function(la,lo,cells,r,c,d){//lat,lon,cells,r,color,dorongduong
	var cc="#ff0000"; 
	//#0622fd xanh blue
	//#23c507 green
	var dd=1; 
	var cc3="#0622fd";
	var cc4="#23c507";
	var dd3=2; 
	var rr=map_default.r;
	if (c)cc=c;
	if (d)dd=d;
	if (r)rr=r;
	
	for(var i=0;i<cells[0].length;i++){
		var tt=0;
		if ((cells[2])&&(cells[2][i])) tt=cells[2][i];
		console.log(tt);
		if (tt == 4){
			this.createCell(cells[0][i],la,lo,cells[1][i],rr-0.002,cc4,dd3);
		} else if (tt==3){
			this.createCell(cells[0][i],la,lo,cells[1][i],rr-0.001,cc3,dd3);
		} else {
			this.createCell(cells[0][i],la,lo,cells[1][i],rr,cc,dd);
		}
	}
},
dist:function(lp,cp){
	if(lp&&cp){
		var d=cp.distanceFrom(lp).toFixed(0)+' m';
		if(parseInt(d)>1000){
			d=(parseInt(d)/1000).toFixed(2)+' km';
		}
		if(this.poly) this.poly.setMap(null);
		this.poly=new google.maps.Polyline({
										    path: [lp,cp],
										    geodesic: true,
										    strokeColor: '#FFFF00',
										    strokeOpacity: 1,
										    strokeWeight: 8
										  });
		this.poly.setMap(map);
		return d
	}
	return cp;
},
//////////// V3 OK
//ve tuyen truyen dan
newLine:function(laloXX,lcolor,lwidth){
	if(this.line!=null) this.line.setMap(null);
	this.line=new google.maps.Polyline({path: laloXX,
										geodesic: true,
										strokeColor: lcolor,
										strokeOpacity: 1,
										strokeWeight: lwidth
										});
	this.line.setMap(map);
	return this.line;
},
drawRetangle:function(sid,la,lo,l,b,c,w){
	var ps=[];
	var p1=new google.maps.LatLng(la-l,lo-b);
	var p2=new google.maps.LatLng(la+l,lo-b);
	var p3=new google.maps.LatLng(la+l,lo+b);
	var p4=new google.maps.LatLng(la-l,lo+b);
   		ps.push(p1);
   		ps.push(p2);
   		ps.push(p3);
   		ps.push(p4);
    ps.push(ps[0]);
    if(this.view!=null) this.view.setMap(null);
    var pl=new google.maps.Polyline({path: laloXX,
										geodesic: true,
										strokeColor: c,
										strokeOpacity: 1,
										strokeWeight: w
										});
	    this.view=pl;
    	this.view.siteid=sid;
	    this.view.setMap(map);
},
mapAlarm:function(sid,la,lo,r,j,w,al){ //sid,lat,lon,r,j,width,color
    if(this.alarms[sid]!=null) this.alarms[sid].setMap(null);
    this.alarms[sid]=this.drawCircle(la,lo,r,j,alarmColors[al][0],alarmColors[al][1],w);
	this.alarms[sid].isalarm=true;
	google.maps.event.addListener(this.alarms[sid],
								'click',
								function() {
									  if (VMS_map.areaClick) VMS_map.areaClick(sid);
    							});
	this.alarms[sid].siteid=sid;
},
mapAlarmRemove:function(sid){
    if(this.alarms[sid]!=null) this.alarms[sid].setMap(null);
},
mapSite:function(sid,la,lo,img,ia){
	if(this.sites[sid]==null) { //chua ve bao gio thi moi ve lai
	var image = {url: img,
				 size: new google.maps.Size(30,30)
				 ,origin: new google.maps.Point(0,0)
				 ,anchor: new google.maps.Point(15,15)
			  	};
  	var m = new google.maps.Marker({icon: image,
								    draggable:false,
								    position: new google.maps.LatLng(la,lo),
								    map: map,
								    title: ((ia)?ia:sid)
								    });
	this.sites[sid]=m;
	this.sites[sid].siteid=sid;
	this.sites[sid].isalarm=ia;
	google.maps.event.addListener(this.sites[sid], 
    							'click',
								function(){
									  if (VMS_map.pointClick) VMS_map.pointClick(sid,ia);
								});
    google.maps.event.addListener(this.sites[sid],
								'drag',
								function(p) {
									  if (VMS_map.pointDrag) VMS_map.pointDrag(sid,p.latLng.lat(),p.latLng.lng());
    							}
    							);
    google.maps.event.addListener(this.sites[sid],
								'dragend',
								function(p) {
								   	var geocoder_address = new google.maps.Geocoder();
								   	geocoder_address.geocode({'latLng': m.getPosition()},
															 function(results, status){
																		if (status == google.maps.GeocoderStatus.OK){
																			if (results[0]) {
						     													if (VMS_map.pointEdit) VMS_map.pointEdit(sid,p.latLng.lat(),p.latLng.lng(),results[0].formatted_address);
																			}
						       											}
                											 }
                											);
    								}
    							);
    //chua ve thi moi them vao
    this.sites.push(this.sites[sid]);
    }
},
createLink:function(lid,lalo1,lalo2,lcolor,lwidth){
	if(this.links[lid]!=null) this.links[lid].setMap(null);
		this.links[lid]=new google.maps.Polyline({
												path: [lalo1,lalo2],
												clickable: true,
												geodesic: false,
												strokeColor: lcolor,
												strokeOpacity: 0.6, //1
												strokeWeight: lwidth
												});
		this.links[lid].linkid=lid;
		google.maps.event.addListener(this.links[lid], 
    					'click',
						function(){
							if (VMS_map.lineClick) VMS_map.lineClick(lid);
						});
		google.maps.event.addListener(this.links[lid],
						"mouseover",
						function(){
							doTooltip(lid);
						}
						);
		google.maps.event.addListener(this.links[lid],
						"mouseout",
						function(){
							hideTip();
						}
						);
						
		this.links[lid].setMap(map);
},
createPolyLine:function(lid,laloXX,lcolor,lwidth,note){
	if(this.lines[lid]!=null) this.lines[lid].setMap(null);
		this.lines[lid]=new google.maps.Polyline({
												path: laloXX,
												clickable: true,
												geodesic: true,
												strokeColor: lcolor,
												strokeOpacity: 0.6, //1
												strokeWeight: lwidth
												});
		this.lines[lid].lineid=lid;
	google.maps.event.addListener(this.lines[lid],
						"mouseover",
						function(){
							doTooltip(lid+(note!=null?note:''));
						}
						);
	google.maps.event.addListener(this.lines[lid],
						"mouseout",
						function(){
							hideTip();
						}
						);
	this.lines[lid].setMap(map);
	return this.lines[lid];
},
createCharLine:function(cid,la,lo,a,r,c,d){
	var cc="#ff0000";
	var dd=10;
	var aa=0;
	var rr=map_default.r;
	if (c!=null)cc=c;
	if (d!=null)dd=d;
	if (a!=null)aa=a;
	if (r!=null)rr=r;
	if(this.charlines[cid]!=null) this.charlines[cid].setMap(null);
		this.charlines[cid]=this.createLine(cid,
											new google.maps.LatLng(la,lo),
											new google.maps.LatLng(la+rr*Math.cos(aa.toRad()),
											lo+rr*Math.sin(aa.toRad())),
											cc,
											dd
											);
		this.charlines[cid].charid=cid;
},
drawRoute:function(){
	if(this.route){ 
		this.isRouteEdit=!this.isRouteEdit;
		if (this.isRouteEdit)
			this.route.enableEditing()
		else
			this.route.disableEditing();
	}
	else {
		this.route = new google.maps.Polyline({ path: [],
												clickable: true,
												geodesic: true,
												strokeColor: '#0000ff',
												strokeOpacity: 0.6, //1
												strokeWeight: 3
												});
		this.route.enableDrawing();
		this.route.routeid='ROUTE';
		this.route.setMap(map);
	}
},
dragLink:function(lid,lalo1,lalo2,lcolor,lwidth){
	if(lid&&lalo1&&lalo2&lcolor&lwidth){
		this.createLink(lid,lalo1,lalo2,lcolor,lwidth);
	}
},
clean:function(){
	for (i in this.sites) {
      this.sites[i].setMap(null);
    }
	this.sites=[];
	
	for (i in this.lines) {
      this.lines[i].setMap(null);
    }
	this.lines=[];
	
	for (i in this.cells) {
      this.cells[i].setMap(null);
    }
	this.cells=[];
	
	for (i in this.alarms) {
      this.alarms[i].setMap(null);
    }
	this.alarms=[];
	
	for (i in this.charlines) {
      this.charlines[i].setMap(null);
    }
	this.charlines=[];
	
	for (i in this.latlngs) {
      this.latlngs[i].setMap(null);
    }
	this.latlngs=[];
	
	for (i in this.points) {
      this.points[i].setMap(null);
    }
	this.points=[];
	
	for (i in this.areas) {
      this.areas[i].setMap(null);
    }
	this.areas=[];
	
	for (i in this.links) {
      this.links[i].setMap(null);
    }
	this.links=[];
}
} //the end of MAP
function loadMap (){
	try{
		google.maps.event.addListener(map,'click',VMS_map.mouseClick);
		//////////////////////////////////////		
		google.maps.event.addListener(map,"mousemove",VMS_map.mouseMove);
		google.maps.event.addListener(map,"mouseout",function(){hideTip()});
		//////////////////////////////////////	
		google.maps.event.addListener(map,'singlerightclick',VMS_map.mouseRightClick);
		//////////////////////////////////////
		google.maps.event.addListener(map,'moveend',VMS_map.mapMoveEnd); 
		//////////////////////////////////////
		google.maps.event.addListener(map,'dragend',VMS_map.mapDragEnd); 
		//them phan thay doi center 2017/11/07 -- su dung dieu hanh di chuyen
		google.maps.event.addListener(map,'center_changed', VMS_map.mapCenterChanged);
	}
	catch(e){
		VMS_map.isLoaded=false;
	}
}
////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////// 
////////////////////////////////////////////////
//Cac ham hieu ung ve chuot tren ban do
//su dung de xu ly cho cac ajax
VMS_map.mouseClick=function(overlay,point,opoint){
	if(overlay instanceof GMarker){
		//kich vao doi tuong site
		if(VMS_map.nodeClick)VMS_map.nodeClick(overlay);
	}else if(overlay instanceof GPolyline){
		//kich vao doi tuong duong thang
		if(VMS_map.lineClick)VMS_map.lineClick(overlay,(point)?point:opoint);
	}else if(overlay instanceof GPolygon){
		//kich vao doi tuong vung canh bao
		if(VMS_map.areaClick)VMS_map.areaClick(overlay);
	}
	
	if(VMS_map.func==2){
		//do khoang cach 
		VMS_map.isMeasure=!VMS_map.isMeasure;
		if(VMS_map.isMeasure)VMS_map.lpoint=(point)?point:opoint;
	}
	else if(VMS_map.func==3){
		//chua nang ghi day?
	}
	else if(VMS_map.func==4){
		//tao diem moi don le
		if(overlay==null)VMS_map.newNode(point,map_default.getimg(1))
	}
	else if(VMS_map.func==6){
		//tao duong truyen moi don le
		//phai bam vao diem da co
		if((overlay instanceof GMarker)&&(overlay.siteid)){
			VMS_map.isLinked=!VMS_map.isLinked;
			VMS_map.isMeasure=VMS_map.isLinked;
			if(VMS_map.isLinked){
				VMS_map.lpoint=(point)?point:opoint;
				VMS_map.lpoint.siteid=overlay.siteid;
				}
			else{
				VMS_map.createPolyLine(	VMS_map.lpoint.siteid+'-'+overlay.siteid,
									   [VMS_map.lpoint,opoint],
									    "#00FFFF",
										10,
											"-"+VMS_map.dist(VMS_map.lpoint,opoint));
				if(VMS_map.poly)map.removeOverlay(VMS_map.poly);
				VMS_map.lpoint=null;
				}
		}
	}
	else{}
}
/////////////////////////////////////////////////
VMS_map.mouseMove=function(point){
//quy dinh 1,2,3,4,5,6,7
	//1-- Xem toa do -- gan toa do tren tip
	//2-- Do khoan cach -- gan khoan cach tren tip
	//3-- Xem dia danh cua ban do -- google tra ve va ghi tren tip
	if((VMS_map.func==1)||(VMS_map.func==4))doTooltip(point)
	else if((VMS_map.func==2)||(VMS_map.func==6))
			if(VMS_map.isMeasure)doTooltip(VMS_map.dist(VMS_map.lpoint,point))
			else doTooltip(point)
	else{}
}
/////////////////////////////////////////////////
VMS_map.mouseRightClick=function(point,src,overlay){
	
	if(overlay instanceof GMarker){
		if(VMS_map.rightClickNode)VMS_map.rightClickNode(overlay);
	}else if(overlay instanceof GPolyline){
		if(VMS_map.rightClickLine)VMS_map.rightClickLine(overlay);
	}else {}//Toolpopup.showPopup();
	
	//lay thong tin dia chi
	//if (VMS_map.geocoder)
	//	VMS_map.geocoder.getLocations(point,showAddress);
}
///////////////////////////////////////////////
VMS_map.mapMoveEnd=function(){
	var lat=map.getCenter().lat();
	var lng=map.getCenter().lng();
	var level=map.getZoom();
	//Liet ke cac tram trong khu vuc nay 
	if((Math.abs(VMS_map.oldLAT-lat)>map_default.LATmove)||(Math.abs(VMS_map.oldLON-lng)>map_default.LONmove)){
		VMS_map.oldLAT=lat;
		VMS_map.oldLON=lng;
		
		if(VMS_map.getCenterData)VMS_map.getCenterData(lat,lng,level);
		
		var maptype=0;
		var curtype=map.getCurrentMapType();
		if(curtype==G_SATELLITE_MAP)
			maptype=1
		else if(curtype==G_HYBRID_MAP)
			maptype=2
		else if(curtype==G_PHYSICAL_MAP)
			maptype=3
		else maptype=0;
	}
}
// them ham xu ly trung tam ban do bi thay doi
VMS_map.mapCenterChanged = function(){
	var lat=map.getCenter().lat();
	var lng=map.getCenter().lng();
	var level=map.getZoom();
	alert("position=("+lat+","+lng+")"+level);
}
//////////////////////////////////////////////////////////////////////////
//GOOGLE API VERSION 3
//Khoi tao ban do bang div bat ky
function initGMapV3(d_canvas) { //div for map
    var mOpt = {
        zoom: map_default.vSize,
        center: new google.maps.LatLng(map_default.vCenterX,map_default.vCenterY),
        mapTypeId: map_default.maptype
    };
    var t_map = new google.maps.Map($("#"+d_canvas)[0], mOpt);
    VMS_map.map = t_map;
    if (t_map!=null) VMS_map.isLoaded=true;
    if(VMS_map.loadDataFirst) VMS_map.loadDataFirst();
    return t_map;
}
//Khoi tao ban do bang POPUP window
function initGMapV3Popup(d_id,d_canvas,d_title,h,w,md,rez){ //div for window, div for map, title, height, width, modal, reziable
	if (!(md)) md=false;
	if (!(rez)) rez=false;
	$("#"+d_id).dialog({title:d_title,
						height: h,
						width: w,
						modal: md,
						position: "top",
						resizeable: rez,
						open: function() {
         				   	var t_map = initGMapV3(d_canvas);
	         					if (t_map!=null){
	         						if(VMS_map.loadDataFirst) VMS_map.loadDataFirst();
	         					}
        					}
						});
}
//////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
//khoi tao ban do tu dong ban dau
function initMapAuto() {
	//khoi tao Tooltip de su dung sau nay
	Tooltip.init();
	if (map==null&&($('#map')[0])){
	    var mOpt = {
	        zoom: map_default.vSize,
	        center: new google.maps.LatLng(map_default.vCenterX,map_default.vCenterY),
	        mapTypeId: map_default.maptype
	    };
	    map = new google.maps.Map($('#map')[0], mOpt);
	    ////////////////////////////
	    if (VMS_map.mapCenterChanged!=null){
	    	//neu ham co khai bao thi gan cho su kien thay doi bang go trung tam
	    	map.addListener('center_changed',VMS_map.mapCenterChanged);
		}
        ////////////////////////////
        VMS_map.map = map;
	    if (map!=null) VMS_map.isLoaded=true;
	    if(VMS_map.loadDataFirst) VMS_map.loadDataFirst();

	}
}
//khi khoi dong web, khoi tao bang do tu dong o ham sau
google.maps.event.addDomListener(window, 'load', initMapAuto);
///////////////////////////////////////////
//Prototype for length of polyline
google.maps.LatLng.prototype.kmTo = function(a){ 
    var e = Math, ra = e.PI/180; 
    var b = this.lat() * ra, c = a.lat() * ra, d = b - c; 
    var g = this.lng() * ra - a.lng() * ra; 
    var f = 2 * e.asin(e.sqrt(e.pow(e.sin(d/2), 2) + e.cos(b) * e.cos 
    (c) * e.pow(e.sin(g/2), 2))); 
    return f * 6378.137; 
}

google.maps.Polyline.prototype.inKm = function(n){ 
    var a = this.getPath(n), len = a.getLength(), dist = 0; 
    for (var i=0; i < len-1; i++) { 
       dist += a.getAt(i).kmTo(a.getAt(i+1));
    }
    return dist.toFixed(2); //km 
}
google.maps.Polygon.prototype.inKm = function(n){ 
    var a = this.getPath(n), len = a.getLength(), dist = 0; 
    for (var i=0; i < len-1; i++) { 
       dist += a.getAt(i).kmTo(a.getAt(i+1));
    }
    return dist.toFixed(2); //km 
}
//var length_in_km = yourPoly.inKm();
////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////