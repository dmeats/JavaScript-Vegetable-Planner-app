var idchanger;
var globalimageid;
var widthof_box; // for setting the width of the div boxes in the grid
var heightof_box;// for setting the height of the div boxes in the grid
var globalflag; // flag to decide on which drop action will happen once the drop function is executed ... global flag is referenced inside the function
var arrHead = new Array(); // sets array for headers in table and determines how many col are in the table
function creatdivs(){
	
	var leftpanel = document.createElement("div");
	leftpanel.setAttribute("id", "vegplants");
	leftpanel.setAttribute("ondrop","drop(event)");
	//leftpanel.setAttribute("ondragover","allowDrop(event)");
	document.body.appendChild(leftpanel); 
	
	var toprightpanel = document.createElement("div");
	toprightpanel.setAttribute("id","irregation");
	toprightpanel.setAttribute("ondrop","drop(event)");
	//toprightpanel.setAttribute("ondragover","allowDrop(event)");
	document.body.appendChild(toprightpanel);
	
	var topleftpanel = document.createElement("div");
	topleftpanel.setAttribute("id","vegboxmaterial");
	topleftpanel.setAttribute("ondrop","drop(event)");
	document.body.appendChild(topleftpanel);
	
	var deletepanel = document.createElement("div");
	deletepanel.setAttribute("id","del");
	deletepanel.setAttribute("ondrop","drop3(event)");
	deletepanel.setAttribute("ondragover","allowDrop(event)");
	document.body.appendChild(deletepanel);
	document.getElementById('del').innerHTML = "<i>Drag plants here that you don't need</i>";
	
	var workingareapanel = document.createElement("div");
	workingareapanel.setAttribute("id","workingarea");
	//workingareapanel.setAttribute("class","div_hover");
	//workingareapanel.setAttribute("onclick","hide()");
	//workingareapanel.setAttribute("ondrop","drop2(event)");
	//workingareapanel.setAttribute("ondragover","allowDrop(event)");
	document.body.appendChild(workingareapanel);
	
	var listofplanets = document.createElement("div");
	listofplanets.setAttribute("id","listofveg");
	document.body.appendChild(listofplanets);
	document.getElementById("listofveg").innerHTML = "<p><font face='verdana' color='white'><b><center>List of Vegetables</center></b></font></p>"
	createtable('listofveg');
	
	var widthworkingarea = document.getElementById('workingarea').offsetWidth;
	var heightworkingarea = document.getElementById('workingarea').offsetHeight;
	//var canvas = createCanvas( widthworkingarea , heightworkingarea, 'workingarea' );
	
	var Verticallines = widthworkingarea / 12;
	var horzinantallines = heightworkingarea / 12;
	//creategrid( canvas , Verticallines, horzinantallines,widthworkingarea,heightworkingarea);
	
	loadimagesTopanels(topleftpanel,toprightpanel,leftpanel);
	
	workingboard(widthworkingarea, heightworkingarea, workingareapanel);
};
function createtable(listofveg){
	
	var tablecontainer = document.getElementById(listofveg );
	
	// ARRAY FOR HEADER.
    
    arrHead = ['Veg name', 'number of sqft', 'spacing per sqft', 'number of seeds per sqft', 'total seedlings'];      // SIMPLY ADD OR REMOVE VALUES IN THE ARRAY FOR TABLE HEADERS.
	
	
	var body = document.body,
    tbl  = document.createElement('table');
	tbl.setAttribute("id" , "listtable");
    //tbl.style.width  = '350px';
    //tbl.style.border = '1px solid white';
	
	var tr = tbl.insertRow(-1);

        for (var h = 0; h < arrHead.length; h++) {
            var th = document.createElement('th');          // TABLE HEADER.
            th.innerHTML = arrHead[h];
            tr.appendChild(th);
        }
    
    for(var i = 0; i < 1; i++){
        tr = tbl.insertRow();
		tr.setAttribute("id","row" + i);
        for(var j = 0; j < 5; j++){
            //if(i == 2 && j == 1){
            //    break;
            //} else {
                var td = tr.insertCell();
				td.setAttribute("id" , "r" + i + "c" + j);
                td.appendChild(document.createTextNode(''));
                td.style.border = '1px solid white';
                //if(i == 1 && j == 1){
                //    td.setAttribute('rowSpan', '3');
                //}
            //}
        }
    }
    tablecontainer.appendChild(tbl);
}
function updatetable(task,copyid){

	var ele=document.getElementById(''+ copyid + '');
	var nameofveg=ele.getAttribute('alt');
	var vegTable = document.getElementById('listtable');
	//rowcount of table
	var rowCnt = vegTable.rows.length;

		alert (nameofveg);
	if (task == 'add'){
	         
			var spacingperveg = spacingforvegatable(nameofveg);
			var seedspersqft = (12*12)/(spacingperveg*spacingperveg);
			for (var r = 1; r <= rowCnt; r++)
			{
				for (var col = 0; col <= arrHead.length; col++) {
					//var vegname = vegTable.getAttribute('td')
					//alert ("row" + r + "col" + col);
					var vegname = vegTable.rows[r].cells[col].innerHTML
					alert(vegname);
					//check to see if the veg is already in the list;
					if (vegname = ''){
						//alert("vegname does not exist yet")
												
												
						var row = vegTable.insertRow(r);
						var cell0 = row.insertCell(0);
						cell0.innerHTML = nameofveg;
						var cell1 = row.insertCell(1);
						cell1.innerHTML = 1;
						var cell2 = row.insertCell(2);
						cell2.innerHTML = spacingperveg;
						var cell3 = row.insertCell(3);
						cell3.innerHTML = seedspersqft;
						var cell4 = row.insertCell(4);
						cell4.innerHTML = seedspersqft;
						r = rowCnt +1;
						col = arrHead.length + 1;
						
						
									
					}
					else if(vegname = nameofveg)
					{
						
						var row = vegTable.insertRow(r);
						var cell0 = row.insertCell(0);
						cell0.innerHTML = nameofveg;
						var cell1 = row.insertCell(1);
						cell1.innerHTML = 1;
						var cell2 = row.insertCell(2);
						cell2.innerHTML = spacingperveg;
						var cell3 = row.insertCell(3);
						cell3.innerHTML = seedspersqft;
						var cell4 = row.insertCell(4);
						cell4.innerHTML = seedspersqft;
						r = rowCnt +1;
						col = arrHead.length + 1;
					}
					else{
					}
				//alert ("row" + r + "col" + col);
					}
			//add or update vegetable to list something
			}
		}
		else{
	   //alert (task + "delete " + copyid);
		}
   
//var x=document.getElementById('listtable').rows[parseInt(rn,10)].cells;
//x[parseInt(cn,10)].innerHTML=content;

}	
function spacingforvegatable (nameofveg){
	var spacingveg
	switch (nameofveg) {
  case 'redonion':
    spacingveg = 4;
	return (spacingveg);
    break;
  case 'Radish':
    spacingveg = 2;
	return (spacingveg);
    break;
  case 'Papayas':
    console.log('Mangoes and papayas are $2.79 a pound.');
    // expected output: "Mangoes and papayas are $2.79 a pound."
    break;
  default:
    console.log('Sorry, we are out of ' + expr + '.');
}
}
//adds one to the global idchanger for the new copy of image id
var add = (function () {
    var counter = 0;
    return function () {return counter += 1;}
})();
var mycontainercounter = (function () {
    var counter = 0;
    return function () {return counter += 1;}
})();

//-------------------------------------------------------------------------------------------------------------------------
/*
  function createCanvas ( width, height, containerId ){
						var container = document.getElementById(containerId);
						
						var canvas = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
						//canvas.setAttribute('id', "svgcontent");
						canvas.setAttribute('width', width);
						
						canvas.setAttribute('height', height);
						
						container.appendChild( canvas );    
						return canvas;
					   }
	

					   
function  createLinee( x1, y1, x2, y2, color, w ){
						var aLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
						aLine.setAttribute('x1', x1);
						aLine.setAttribute('y1', y1);
						aLine.setAttribute('x2', x2);
						aLine.setAttribute('y2', y2);
						aLine.setAttribute('stroke', color);
						aLine.setAttribute('stroke-width', w);
						return aLine;
						}
						
function creategrid( canvas , Verticallines, horzinantallines,widthworkingarea,heightworkingarea ) {
	   var x1 = 1;
	   //creats vertical lines
            for (i = 1; i < widthworkingarea; i += 1) {
				i = x1;
				x1=x1+8;//changes the spacing between the vertical lines for inches
				lineElement = lines.addLine( createLinee(x1, 0, x1, heightworkingarea, 'rgb(8, 26, 73)', .2) );
				canvas.appendChild( lineElement );
			}
			x1=1
			for (i = 1; i < widthworkingarea; i += 1) {
				i = x1;
				x1=x1+96;//changes the spacing between the vertical lines for feet
				lineElement = lines.addLine( createLinee(x1, 0, x1, heightworkingarea, 'rgb(223, 22, 42)', .8) );
				canvas.appendChild( lineElement );
			}
		//creates horizontal lines
			x1=1;
			for (i = 1; i < heightworkingarea; i += 1) {
				i = x1;
				x1=x1+8;//changes the spacing horzontal lines for inches
				lineElement = lines.addLine( createLinee(0, x1, widthworkingarea, x1, 'rgb(8, 26, 73)', .2) );
				canvas.appendChild( lineElement );
			}
			x1=1;
			for (i = 1; i < heightworkingarea; i += 1) {
				i = x1;
				x1=x1+96;//changes the spacing horzontal lines for feet
				lineElement = lines.addLine( createLinee(0, x1, widthworkingarea, x1, 'rgb(223, 22, 42)', .8) );
				canvas.appendChild( lineElement );
			}
}
*/
//adds images to the  panels
function loadimagesTopanels (topleftpanel,toprightpanel,leftpanel){
	var toprightpanelcounter = 0;
	var topleftpanelcounter = 0;
	var leftpanelcounter = 0;
	var toprightpanelarray = [];
	var topleftpanelarray = [];
	var leftpanelarray = [];
	
	//topright panel images------------------------------------------------------------------
	var beets = document.createElement("IMG");
					beets.setAttribute("src","/images/beets2.png");
					beets.setAttribute("width","50px");
					beets.setAttribute("height","50px");
					beets.setAttribute("alt","beets");
					beets.setAttribute("draggable","True");
					beets.setAttribute("flag","True");
					beets.setAttribute("ondragstart","drag(event)");
					beets.setAttribute("id","dragblue"+toprightpanelcounter);
					toprightpanelarray[toprightpanelcounter] = beets; // loads images into array
					toprightpanel.appendChild(beets); // appends image that is stored in array to toprightpanel
					toprightpanelcounter = toprightpanelcounter + 1;
					
	var cherrytomatos = document.createElement("IMG");
					cherrytomatos.setAttribute("src","/images/cherrytomatos.png");
					cherrytomatos.setAttribute("width","50px");
					cherrytomatos.setAttribute("height","50px");
					cherrytomatos.setAttribute("alt","cherrytomatos");
					cherrytomatos.setAttribute("draggable","True");
					cherrytomatos.setAttribute("flag","True");
					cherrytomatos.setAttribute("ondragstart","drag(event)");
					cherrytomatos.setAttribute("id","dragblue"+toprightpanelcounter);
					toprightpanelarray[toprightpanelcounter] = cherrytomatos; // loads images into array
					toprightpanel.appendChild(cherrytomatos); // appends image that is stored in array to toprightpanel
					toprightpanelcounter = toprightpanelcounter + 1;
					
	var tomato = document.createElement("IMG");
					tomato.setAttribute("src","/images/tomato.png");
					tomato.setAttribute("width","50px");
					tomato.setAttribute("height","50px");
					tomato.setAttribute("alt","tomato");
					tomato.setAttribute("draggable","True");
					tomato.setAttribute("flag","True");
					tomato.setAttribute("ondragstart","drag(event)");
					tomato.setAttribute("id","dragblue"+toprightpanelcounter);
					toprightpanelarray[toprightpanelcounter] = tomato; // loads images into array
					toprightpanel.appendChild(tomato); // appends image that is stored in array to toprightpanel
					toprightpanelcounter = toprightpanelcounter + 1;
	
	var Bellpepper = document.createElement("IMG");
					Bellpepper.setAttribute("src","/images/Bell_pepper.png");
					Bellpepper.setAttribute("width","50px");
					Bellpepper.setAttribute("height","50px");
					Bellpepper.setAttribute("alt","Bellpepper");
					Bellpepper.setAttribute("draggable","True");
					Bellpepper.setAttribute("flag","True");
					Bellpepper.setAttribute("ondragstart","drag(event)");
					Bellpepper.setAttribute("id","dragblue"+toprightpanelcounter);
					toprightpanelarray[toprightpanelcounter] = Bellpepper; // loads images into array
					toprightpanel.appendChild(Bellpepper); // appends image that is stored in array to toprightpanel
					toprightpanelcounter = toprightpanelcounter + 1;
					
	var redpepper = document.createElement("IMG");
					redpepper.setAttribute("src","/images/Red_pepper.png");
					redpepper.setAttribute("width","50px");
					redpepper.setAttribute("height","50px");
					redpepper.setAttribute("alt","redpepper");
					redpepper.setAttribute("draggable","True");
					redpepper.setAttribute("flag","True");
					redpepper.setAttribute("ondragstart","drag(event)");
					redpepper.setAttribute("id","dragblue"+toprightpanelcounter);
					toprightpanelarray[toprightpanelcounter] = redpepper; // loads images into array
					toprightpanel.appendChild(redpepper); // appends image that is stored in array to toprightpanel
					toprightpanelcounter = toprightpanelcounter + 1;
				
					
					
	//left panel images ----------------------------------------------------------------------				
	var imagefile2 = document.createElement("IMG");
					imagefile2.setAttribute("src","/images/redonion.png");
					imagefile2.setAttribute("width","50px");
					imagefile2.setAttribute("height","50px");
					imagefile2.setAttribute("alt","redonion");
					imagefile2.setAttribute("draggable","True");
					imagefile2.setAttribute("flag","True");
					imagefile2.setAttribute("ondragstart","drag(event)");
					imagefile2.setAttribute("id","dragred"+leftpanelcounter);
					leftpanel.appendChild(imagefile2);
					leftpanelarray[leftpanelcounter] = imagefile2;
					leftpanelcounter = leftpanelcounter + 1;
	
	var Radish = document.createElement("IMG");
					Radish.setAttribute("src","/images/Radish.png");
					Radish.setAttribute("width","50px");
					Radish.setAttribute("height","50px");
					Radish.setAttribute("alt","Radish");
					Radish.setAttribute("draggable","True");
					Radish.setAttribute("flag","True");
					Radish.setAttribute("ondragstart","drag(event)");
					Radish.setAttribute("id","dragred"+leftpanelcounter);
					leftpanel.appendChild(Radish);
					leftpanelarray[leftpanelcounter] = Radish;
					leftpanelcounter = leftpanelcounter + 1;
					
					
					
					
	//top left panel images ---------------------------------------------------------------------				
	var imagefile3 = document.createElement("IMG");
					imagefile3.setAttribute("src","/images/carrot.png");
					imagefile3.setAttribute("width","50px");
					imagefile3.setAttribute("height","50px");
					imagefile3.setAttribute("alt","carrot");
					imagefile3.setAttribute("draggable","True");
					imagefile3.setAttribute("flag","True");
					imagefile3.setAttribute("ondragstart","drag(event)");
					imagefile3.setAttribute("id","green"+topleftpanelcounter);
					topleftpanelcounter = topleftpanelcounter + 1;
					topleftpanel.appendChild(imagefile3);
					
	var Snappea = document.createElement("IMG");
					Snappea.setAttribute("src","/images/Snap_pea.png");
					Snappea.setAttribute("width","50px");
					Snappea.setAttribute("height","50px");
					Snappea.setAttribute("alt","Snappea");
					Radish.setAttribute("alt","Radish");
					Snappea.setAttribute("draggable","True");
					Snappea.setAttribute("flag","True");
					Snappea.setAttribute("ondragstart","drag(event)");
					Snappea.setAttribute("id","green"+topleftpanelcounter);
					topleftpanelcounter = topleftpanelcounter + 1;
					topleftpanel.appendChild(Snappea);
	
}
//---------------------------------------------------------------------------------------------------------------------
  var lines = [];
lines.addLine = function(line){
	 this.push( line );
 return line;
}
//allows drop on divbox 
function allowDrop(ev,idchanger) {
	
  ev.preventDefault();
  
  
}

function drag(ev) {
	//////added 
  ev.dataTransfer.setData("text", ev.target.id);
  //alert(ev.currentTarget.id);
  imageelement=document.getElementById(ev.currentTarget.id);
  //updatetable();
  //setting global flag to determine which type of drop will be used in the drop functions
  globalflag=imageelement.getAttribute('flag');
  
  //alert(globalflag);
  
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
}


//does nothing for the program - was some test code to check how things work
function hide(ev){

       
      
		
		
var event = new Event('click');
var divid = ev.currentTarget.id;

var element = document.getElementById(divid);
var position = element.getBoundingClientRect();
var x = position.x;
var y = position.y;
//alert(x + " , " + y + " " + divid);

//var parentOfImage = document.querySelector(divid);
//alert (parentOfImage);
//parentOfImage.addEventListener("click",clickFunc(), false);
element.addEventListener("click",clickFunc(event), false);

    elementMouseIsOver = document.elementFromPoint(x, y);
var id="newId1";
var image_x = document.getElementById(id);
//var image_x = document.getElementById('box').getElementsByTagName('img');


image_x.parentNode.removeChild(image_x);

}
//function does nothing just testing out some stuff
function clickFunc(event) {
	//alert(event);
	var e = event;
	//console.log(typeof e);
	
	if(event.target !== event.currentTarget) {
		var clickedItem = event.target.id;
		//alert("this is the image id = "+clickedItem);
	}
  
}


// creates a copy of the image and moves it to the working grid also allows for
// copy to be placed anywhere on the grid without making another new copy of the copy.
function drop2(ev,idchanger) {
	
  idchanger = add();// adds counter to change imageid
	
  ev.preventDefault();
  var data=ev.dataTransfer.getData("text");
  // If you use DOM manipulation functions, their default behaviour it not to 
 //    copy but to alter and move elements. By appending a ".cloneNode(true)", 
  //   you will not move the original element, but create a copy.


if (globalflag == "True"){  //make a copy of the image once while global flag = true

  var nodeCopy = document.getElementById(data).cloneNode(true);
  nodeCopy.setAttribute("flag", "Falsee");
  nodeCopy.id = "newId" + idchanger; //We cannot use the same ID 
  var copyid = nodeCopy.id;
 
  //sets the copy of the image to match the grid box width and height
  nodeCopy.setAttribute("width", widthof_box);
  nodeCopy.setAttribute("height", heightof_box);
  //adds vegatable to the list and infortmation to the list of vegatables
  var task = 'add';
  
  ev.target.appendChild(nodeCopy);
  updatetable(task,copyid);}

else {
	
ev.target.appendChild(document.getElementById(data));
}
}
//function to delete image from the grid once it is placed onto the del div grey box 
function drop3(event){
	//alert (event);
	event.preventDefault();
	
	var data=event.dataTransfer.getData("Text");
	
	var el = document.getElementById(data);
	flag = el.getAttribute("flag");
	//alert(el.getAttribute("id"));
	//alert(flag);
	if(flag == "Falsee"){
		//alert(el.getAttribute("id"));
		//alert("made it here " + flag);
	el.parentNode.removeChild(el);
	}
}
//===========================================================================================================================================
function workingboard(widthworkingarea, heightworkingarea, workingareapanel){
widthof_box=40;
heightof_box=40;
var numberof_boxes = ((widthworkingarea * heightworkingarea) / (widthof_box * heightof_box))*.82
    for (var i=0; i < numberof_boxes; i++)
				{
				idcounter=mycontainercounter();
				var boxx = document.createElement("div");
				boxx.setAttribute("id","div" + idcounter)
				boxx.setAttribute('style', 'margin: 0px;border: 1px solid black;background: #ca8c45;width:' + widthof_box + 'px;display:inline-block;height:' + heightof_box + 'px;')
				
				boxx.setAttribute("class","imagcontainer");
				
				boxx.setAttribute("onclick","hide(event)");
				boxx.setAttribute("ondrop","drop2(event,idchanger)");
				boxx.setAttribute("ondragover","allowDrop(event,idchanger)");
				workingareapanel.appendChild(boxx);
				}			  
				//document.getElementById("mainChessBoard").appendChild(document.createElement("div")).style.backgroundColor = parseInt((i / 8) + i) % 2 == 0 ? '#ababab' : 'white';    
}

//*/================================================================