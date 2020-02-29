//Global variables

var idchanger; // creates a new image id for images that are in the working area
var globalimageid;//stores the image id of the image being clicked or draged
var widthof_box; // for setting the width of the div boxes in the grid
var heightof_box;// for setting the height of the div boxes in the grid
var globalflag; // flag to decide on which drop action will happen once the drop function is executed ... global flag is referenced inside the function
var arrHead = new Array(); // sets array for headers in table and determines how many col are in the table
var numberof_boxes; // a bucket to store the number of boxes in the working area 

       


//Creates all the panels for the application
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
	document.getElementById("listofveg").innerHTML = "<p><font face='verdana' color='white'><b><center>List of Items</center></b></font></p>"
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

//creates the list of vegetables table ready for vegetable to be added, deleted, updated
function createtable(listofveg){
	// listofveg is the div for the table container
	var tablecontainer = document.getElementById(listofveg );
	
	// ARRAY FOR HEADER.
    
    arrHead = ['Veg name', 'number of sqft', 'spacing per sqft', 'number of seeds per sqft', 'total seedlings'];      
	
	
	var body = document.body,
    tbl  = document.createElement('table');
	tbl.setAttribute("id" , "listtable");
    //tbl.style.width  = '350px';
    //tbl.style.border = '1px solid white';
	
	var tr = tbl.insertRow(-1);

        for (var h = 0; h < arrHead.length; h++) {
            var th = document.createElement('th'); // TABLE HEADER.
            th.innerHTML = arrHead[h];
            tr.appendChild(th);
        }
    
    for(var i = 0; i < 0; i++){
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

//Adds, updates and delete vegetable from table
function updatetable(task,copyid){

	var ele=document.getElementById(''+ copyid + '');
	var nameofveg=ele.getAttribute('alt');
	var vegTable = document.getElementById('listtable');
	//rowcount of table
	var rowCnt = vegTable.rows.length;
	var spacingperveg = spacingforvegatable(nameofveg);
	var seedspersqft = Math.ceil((12*12)/(spacingperveg*spacingperveg));
    var searchflag = 'notfound';
		//alert (nameofveg);
	if (task == 'add'){
	         
						
						for (var r = 1; r <= rowCnt; r++)
								{
									//search through first column to see if the vegatable is there and if it is update the correct fields
									for (var se = 1; se < rowCnt; se++){
									//var x = vegTable.rows[s].cells;
											var x = vegTable.rows[se].cells;
											//alert (se);
											if (x[0].innerHTML == nameofveg && searchflag == 'notfound')
												{
													
													
						
													x[1].innerHTML = parseInt(x[1].innerHTML) + 1;
													x[4].innerHTML = x[1].innerHTML * seedspersqft;
													se = se + rowCnt 
													r = rowCnt +2;
													searchflag = 'found';
							
												}
									}
									
									//if vegetable is not there add it to the table
									if (searchflag == 'notfound')
									{
											var row = vegTable.insertRow(se);
											var cell0 = row.insertCell(0);
											cell0.innerHTML = nameofveg;
											var cell1 = row.insertCell(1);
											cell1.innerHTML = 1;
											var cell2 = row.insertCell(2) ;
											cell2.innerHTML = spacingperveg + ' inch';
											var cell3 = row.insertCell(3);
											cell3.innerHTML = seedspersqft;
											var cell4 = row.insertCell(4);
											cell4.innerHTML = seedspersqft;
											r = rowCnt +1;
											col = arrHead.length + 1;
											se = rowCnt +1;
											rowCnt = rowCnt +1;
									}
						
									
				
								}
			
						}
		//
		else{
			//delete vegatable from the table
						
						for (var r = 1; r <= rowCnt; r++)
								{
								//search the first field to delete the vegatable or until there are no more left in the grid
								for (var se = 1; se < rowCnt; se++){
									//var x = vegTable.rows[s].cells;
											var x = vegTable.rows[se].cells;
											//alert (se);
											if (x[0].innerHTML == nameofveg && searchflag == 'notfound')
												{
													//alert("vegname found" + " " + se + " " + rowCnt)
													
						
													x[1].innerHTML = parseInt(x[1].innerHTML) - 1;
													x[4].innerHTML = x[1].innerHTML * seedspersqft;
													
													searchflag = 'found';
													//alert(x[4].innerHTML);
													if (x[4].innerHTML == 0){
														//alert("vegetable will be deleted from table");
														document.getElementById("listtable").deleteRow(se); 
													}
													se = se + rowCnt 
													r = rowCnt +2;
							
												}
									}
								}
	   //alert (task + "delete " + copyid);
		}

	}
	
function spacingforvegatable (nameofveg){
	var spacingveg
	//alert (nameofveg);
	switch (nameofveg) {
  case 'redonion':
    spacingveg = 4;
	return (spacingveg);
    break;
  case 'Radish':
    spacingveg = 2;
	return (spacingveg);
    break;
  case 'carrot':
    spacingveg = 3;
	return (spacingveg);
    
    break;
case 'beets':
    spacingveg = 3;
	return (spacingveg);
    
    break;
	 break;
case 'Snappea':
    spacingveg = 4;
	return (spacingveg);
    
    break;
case 'cherrytomatos':
    spacingveg = 12;
	return (spacingveg);
    
    break;
case 'redpepper':
    spacingveg = 12;
	return (spacingveg);
    
    break;
case 'Bellpepper':
    spacingveg = 12;
	return (spacingveg);
    
    break;
case 'lettuce':
    spacingveg = 9;
	return (spacingveg);
    
    break;
case 'Broccoli':
    spacingveg = 12;
	return (spacingveg);
    
    break;
case 'green_onion':
    spacingveg = 2;
	return (spacingveg);
    
    break;

case 'onion':
    spacingveg = 5;
	return (spacingveg);
    
    break;
case 'parsnip':
    spacingveg = 4;
	return (spacingveg);
    
    break;
case 'eggplant':
    spacingveg = 12;
	return (spacingveg);
    
    break;
case 'brusellsprouts':
    spacingveg = 12;
	return (spacingveg);
    
    break;
case 'cucumber':
    spacingveg = 12;
	return (spacingveg);
    
    break;
case 'cauliflower':
    spacingveg = 12;
	return (spacingveg);
    
    break;
case 'tomato':
    spacingveg = 12;
	return (spacingveg);
    
    break;
case 'butternutsquash':
    spacingveg = 6;
	return (spacingveg);

    
    break;
case 'corn':
    spacingveg = 6;
	return (spacingveg);

    
    break;
case 'Zucchini':
    spacingveg = 12;
	return (spacingveg);

    
    break;
case 'Spinach':
    spacingveg = 6;
	return (spacingveg);

    
    break;
 case 'Horizontal_line':
    spacingveg = 12;
	return (spacingveg);
    
    break;
case 'Vertical_line':
    spacingveg = 12;
	return (spacingveg);
    
    break;

case 'corner_1':
    spacingveg = 12;
	return (spacingveg);
    
    break;
case 'corner_2':
    spacingveg = 12;
	return (spacingveg);
    
    break;
case 'corner_3':
    spacingveg = 12;
	return (spacingveg);
    
    break;
case 'corner_4':
    spacingveg = 12;
	return (spacingveg);
    
    break;
case 'fence':
    spacingveg = 12;
	return (spacingveg);
    
    break;
case 'Trellis':
    spacingveg = 12;
	return (spacingveg);
    
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
//global container counter 
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
	var content = '';
	
	//topright panel images------------------------------------------------------------------
	
	var beets = document.createElement("IMG");
					beets.setAttribute("src","images/beets2.png");
					beets.setAttribute("width","50px");
					beets.setAttribute("height","50px");
					beets.setAttribute("alt","beets");
					beets.setAttribute("title","beets");
					beets.setAttribute("draggable","True");
					beets.setAttribute("flag","True");
					beets.setAttribute("ondragstart","drag(event)");
					beets.setAttribute("onclick","displayCompanionVegetables(event)");
					beets.setAttribute("id","dragblue"+toprightpanelcounter);
					toprightpanelarray[toprightpanelcounter] = beets; // loads images into array
					toprightpanel.appendChild(beets); // appends image that is stored in array to toprightpanel
					toprightpanelcounter = toprightpanelcounter + 1;
				
	var cherrytomatos = document.createElement("IMG");
					cherrytomatos.setAttribute("src","images/cherrytomatos.png");
					cherrytomatos.setAttribute("width","50px");
					cherrytomatos.setAttribute("height","50px");
					cherrytomatos.setAttribute("alt","cherrytomatos");
					cherrytomatos.setAttribute("title","cherrytomatos");
					cherrytomatos.setAttribute("draggable","True");
					cherrytomatos.setAttribute("flag","True");
					cherrytomatos.setAttribute("ondragstart","drag(event)");
					cherrytomatos.setAttribute("onclick","displayCompanionVegetables(event)");
					cherrytomatos.setAttribute("id","dragblue"+toprightpanelcounter);
					toprightpanelarray[toprightpanelcounter] = cherrytomatos; // loads images into array
					toprightpanel.appendChild(cherrytomatos); // appends image that is stored in array to toprightpanel
					toprightpanelcounter = toprightpanelcounter + 1;
					
	var tomato = document.createElement("IMG");
					tomato.setAttribute("src","images/tomato.png");
					tomato.setAttribute("width","50px");
					tomato.setAttribute("height","50px");
					tomato.setAttribute("alt","tomato");
					tomato.setAttribute("title","tomato");
					tomato.setAttribute("draggable","True");
					tomato.setAttribute("flag","True");
					tomato.setAttribute("ondragstart","drag(event)");
					tomato.setAttribute("onclick","displayCompanionVegetables(event)");
					tomato.setAttribute("id","dragblue"+toprightpanelcounter);
					toprightpanelarray[toprightpanelcounter] = tomato; // loads images into array
					toprightpanel.appendChild(tomato); // appends image that is stored in array to toprightpanel
					toprightpanelcounter = toprightpanelcounter + 1;
	
	var Bellpepper = document.createElement("IMG");
					Bellpepper.setAttribute("src","images/Bell_pepper.png");
					Bellpepper.setAttribute("width","50px");
					Bellpepper.setAttribute("height","50px");
					Bellpepper.setAttribute("alt","Bellpepper");
					Bellpepper.setAttribute("title","Bellpepper");
					Bellpepper.setAttribute("draggable","True");
					Bellpepper.setAttribute("flag","True");
					Bellpepper.setAttribute("ondragstart","drag(event)");
					Bellpepper.setAttribute("onclick","displayCompanionVegetables(event)");
					Bellpepper.setAttribute("id","dragblue"+toprightpanelcounter);
					toprightpanelarray[toprightpanelcounter] = Bellpepper; // loads images into array
					toprightpanel.appendChild(Bellpepper); // appends image that is stored in array to toprightpanel
					toprightpanelcounter = toprightpanelcounter + 1;
					
	var redpepper = document.createElement("IMG");
					redpepper.setAttribute("src","images/Red_pepper.png");
					redpepper.setAttribute("width","50px");
					redpepper.setAttribute("height","50px");
					redpepper.setAttribute("alt","redpepper");
					redpepper.setAttribute("title","redpepper");
					redpepper.setAttribute("draggable","True");
					redpepper.setAttribute("flag","True");
					redpepper.setAttribute("ondragstart","drag(event)");
					redpepper.setAttribute("onclick","displayCompanionVegetables(event)");
					redpepper.setAttribute("id","dragblue"+toprightpanelcounter);
					toprightpanelarray[toprightpanelcounter] = redpepper; // loads images into array
					toprightpanel.appendChild(redpepper); // appends image that is stored in array to toprightpanel
					toprightpanelcounter = toprightpanelcounter + 1;
	
	var imagefile3 = document.createElement("IMG");
					imagefile3.setAttribute("src","images/carrot.png");
					imagefile3.setAttribute("width","50px");
					imagefile3.setAttribute("height","50px");
					imagefile3.setAttribute("alt","carrot");
					imagefile3.setAttribute("title","carrot");
					imagefile3.setAttribute("draggable","True");
					imagefile3.setAttribute("flag","True");
					imagefile3.setAttribute("ondragstart","drag(event)");
					imagefile3.setAttribute("onclick","displayCompanionVegetables(event)");
					imagefile3.setAttribute("id","dragblue"+toprightpanelcounter);
					toprightpanelarray[toprightpanelcounter] = imagefile3;
					toprightpanelcounter = toprightpanelcounter + 1;
					toprightpanel.appendChild(imagefile3);
					
	var Snappea = document.createElement("IMG");
					Snappea.setAttribute("src","images/Snap_pea.png");
					Snappea.setAttribute("width","50px");
					Snappea.setAttribute("height","50px");
					Snappea.setAttribute("alt","Snappea");
					Snappea.setAttribute("title","Snappea");
					Snappea.setAttribute("draggable","True");
					Snappea.setAttribute("flag","True");
					Snappea.setAttribute("ondragstart","drag(event)");
					Snappea.setAttribute("id","dragblue"+toprightpanelcounter);
					Snappea.setAttribute("onclick","displayCompanionVegetables(event)");
					toprightpanelarray[toprightpanelcounter] = Snappea;
					toprightpanelcounter = toprightpanelcounter + 1;
					toprightpanel.appendChild(Snappea);
	
	var cucumber = document.createElement("IMG");
					cucumber.setAttribute("src","images/cucumber.png");
					cucumber.setAttribute("width","50px");
					cucumber.setAttribute("height","50px");
					cucumber.setAttribute("alt","cucumber");
					cucumber.setAttribute("title","cucumber");
					cucumber.setAttribute("draggable","True");
					cucumber.setAttribute("flag","True");
					cucumber.setAttribute("ondragstart","drag(event)");
					cucumber.setAttribute("onclick","displayCompanionVegetables(event)");
					cucumber.setAttribute("id","dragblue"+toprightpanelcounter);
					toprightpanelarray[toprightpanelcounter] = cucumber;
					toprightpanelcounter = toprightpanelcounter + 1;
					toprightpanel.appendChild(cucumber);
	
	var cauliflower = document.createElement("IMG");
					cauliflower.setAttribute("src","images/cauliflower.png");
					cauliflower.setAttribute("width","50px");
					cauliflower.setAttribute("height","50px");
					cauliflower.setAttribute("alt","cauliflower");
					cauliflower.setAttribute("title","cauliflower");
					cauliflower.setAttribute("draggable","True");
					cauliflower.setAttribute("flag","True");
					cauliflower.setAttribute("ondragstart","drag(event)");
					cauliflower.setAttribute("onclick","displayCompanionVegetables(event)");
					cauliflower.setAttribute("id","dragblue"+toprightpanelcounter);
					toprightpanelarray[toprightpanelcounter] = cauliflower;
					toprightpanelcounter = toprightpanelcounter + 1;
					toprightpanel.appendChild(cauliflower);
					
	var butternutsquash = document.createElement("IMG");
					butternutsquash.setAttribute("src","images/butternutsquash.png");
					butternutsquash.setAttribute("width","50px");
					butternutsquash.setAttribute("height","50px");
					butternutsquash.setAttribute("alt","butternutsquash");
					butternutsquash.setAttribute("title","butternutsquash");
					butternutsquash.setAttribute("draggable","True");
					butternutsquash.setAttribute("flag","True");
					butternutsquash.setAttribute("ondragstart","drag(event)");
					butternutsquash.setAttribute("onclick","displayCompanionVegetables(event)");
					butternutsquash.setAttribute("id","dragblue"+toprightpanelcounter);
					toprightpanelarray[toprightpanelcounter] = butternutsquash;
					toprightpanelcounter = toprightpanelcounter + 1;
					toprightpanel.appendChild(butternutsquash);
	
	var corn = document.createElement("IMG");
					corn.setAttribute("src","images/corn.png");
					corn.setAttribute("width","50px");
					corn.setAttribute("height","50px");
					corn.setAttribute("alt","corn");
					corn.setAttribute("title","corn");
					corn.setAttribute("draggable","True");
					corn.setAttribute("flag","True");
					corn.setAttribute("ondragstart","drag(event)");
					corn.setAttribute("onclick","displayCompanionVegetables(event)");
					corn.setAttribute("id","dragblue"+toprightpanelcounter);
					toprightpanelarray[toprightpanelcounter] = corn;
					toprightpanelcounter = toprightpanelcounter + 1;
					toprightpanel.appendChild(corn);
	
	var Zucchini = document.createElement("IMG");
					Zucchini.setAttribute("src","images/Zucchini.png");
					Zucchini.setAttribute("width","50px");
					Zucchini.setAttribute("height","50px");
					Zucchini.setAttribute("alt","Zucchini");
					Zucchini.setAttribute("title","Zucchini");
					Zucchini.setAttribute("draggable","True");
					Zucchini.setAttribute("flag","True");
					Zucchini.setAttribute("ondragstart","drag(event)");
					Zucchini.setAttribute("onclick","displayCompanionVegetables(event)");
					Zucchini.setAttribute("id","dragblue"+toprightpanelcounter);
					toprightpanelarray[toprightpanelcounter] = Zucchini;
					toprightpanelcounter = toprightpanelcounter + 1;
					toprightpanel.appendChild(Zucchini);
					
	var Spinach = document.createElement("IMG");
					Spinach.setAttribute("src","images/Spinach.png");
					Spinach.setAttribute("width","50px");
					Spinach.setAttribute("height","50px");
					Spinach.setAttribute("alt","Spinach");
					Spinach.setAttribute("title","Spinach");
					Spinach.setAttribute("draggable","True");
					Spinach.setAttribute("flag","True");
					Spinach.setAttribute("ondragstart","drag(event)");
					Spinach.setAttribute("onclick","displayCompanionVegetables(event)");
					Spinach.setAttribute("id","dragblue"+toprightpanelcounter);
					toprightpanelarray[toprightpanelcounter] = Spinach;
					toprightpanelcounter = toprightpanelcounter + 1;
					toprightpanel.appendChild(Spinach);
					
					
	//left panel images ----------------------------------------------------------------------				
	var redonion = document.createElement("IMG");
					redonion.setAttribute("src","images/redonion.png");
					redonion.setAttribute("width","50px");
					redonion.setAttribute("height","50px");
					redonion.setAttribute("alt","redonion");
					redonion.setAttribute("title","Redonion");
					redonion.setAttribute("draggable","True");
					redonion.setAttribute("flag","True");
					redonion.setAttribute("ondragstart","drag(event)");
					redonion.setAttribute("onclick","displayCompanionVegetables(event)");
					redonion.setAttribute("id","dragred"+leftpanelcounter);
					leftpanel.appendChild(redonion);
					leftpanelarray[leftpanelcounter] = redonion;
					leftpanelcounter = leftpanelcounter + 1;
	
	var onion = document.createElement("IMG");
					onion.setAttribute("src","images/onion.png");
					onion.setAttribute("width","50px");
					onion.setAttribute("height","50px");
					onion.setAttribute("alt","onion");
					onion.setAttribute("title","Onion");
					onion.setAttribute("draggable","True");
					onion.setAttribute("flag","True");
					onion.setAttribute("ondragstart","drag(event)");
					onion.setAttribute("onclick","displayCompanionVegetables(event)");
					onion.setAttribute("id","dragred"+leftpanelcounter);
					leftpanel.appendChild(onion);
					leftpanelarray[leftpanelcounter] = onion;
					leftpanelcounter = leftpanelcounter + 1;
					
	var green_onion = document.createElement("IMG");
					green_onion.setAttribute("src","images/green_onion.png");
					green_onion.setAttribute("width","50px");
					green_onion.setAttribute("height","50px");
					green_onion.setAttribute("alt","green_onion");
					green_onion.setAttribute("title","Green onion");
					green_onion.setAttribute("draggable","True");
					green_onion.setAttribute("flag","True");
					green_onion.setAttribute("ondragstart","drag(event)");
					green_onion.setAttribute("onclick","displayCompanionVegetables(event)");
					green_onion.setAttribute("id","dragred"+leftpanelcounter);
					leftpanel.appendChild(green_onion);
					leftpanelarray[leftpanelcounter] = green_onion;
					leftpanelcounter = leftpanelcounter + 1;
	
	var Radish = document.createElement("IMG");
					Radish.setAttribute("src","images/Radish.png");
					Radish.setAttribute("width","50px");
					Radish.setAttribute("height","50px");
					Radish.setAttribute("alt","Radish");
				    Radish.setAttribute("title","Radish");
					Radish.setAttribute("draggable","True");
					Radish.setAttribute("flag","True");
					Radish.setAttribute("ondragstart","drag(event)");
					Radish.setAttribute("onclick","displayCompanionVegetables(event)");
					Radish.setAttribute("id","dragred"+leftpanelcounter);
					leftpanel.appendChild(Radish);
					leftpanelarray[leftpanelcounter] = Radish;
					leftpanelcounter = leftpanelcounter + 1;
					
	var lettuce = document.createElement("IMG");
					lettuce.setAttribute("src","images/lettuce.png");
					lettuce.setAttribute("width","50px");
					lettuce.setAttribute("height","50px");
					lettuce.setAttribute("alt","lettuce");
					lettuce.setAttribute("title","Lettuce");
					lettuce.setAttribute("draggable","True");
					lettuce.setAttribute("flag","True");
					lettuce.setAttribute("ondragstart","drag(event)");
					lettuce.setAttribute("onclick","displayCompanionVegetables(event)");
					lettuce.setAttribute("id","dragred"+leftpanelcounter);
					leftpanel.appendChild(lettuce);
					leftpanelarray[leftpanelcounter] = lettuce;
					leftpanelcounter = leftpanelcounter + 1;
	
	var Broccoli = document.createElement("IMG");
					Broccoli.setAttribute("src","images/Broccoli.png");
					Broccoli.setAttribute("width","50px");
					Broccoli.setAttribute("height","50px");
					Broccoli.setAttribute("alt","Broccoli");
					Broccoli.setAttribute("title","Broccoli");
					Broccoli.setAttribute("draggable","True");
					Broccoli.setAttribute("flag","True");
					Broccoli.setAttribute("ondragstart","drag(event)");
					Broccoli.setAttribute("onclick","displayCompanionVegetables(event)");
					Broccoli.setAttribute("id","dragred"+leftpanelcounter);
					leftpanel.appendChild(Broccoli);
					leftpanelarray[leftpanelcounter] = Broccoli;
					leftpanelcounter = leftpanelcounter + 1;
	
	var parsnip = document.createElement("IMG");
					parsnip.setAttribute("src","images/parsnip.png");
					parsnip.setAttribute("width","50px");
					parsnip.setAttribute("height","50px");
					parsnip.setAttribute("alt","parsnip");
					parsnip.setAttribute("title","Parsnip");
					parsnip.setAttribute("draggable","True");
					parsnip.setAttribute("flag","True");
					parsnip.setAttribute("ondragstart","drag(event)");
					parsnip.setAttribute("onclick","displayCompanionVegetables(event)");
					parsnip.setAttribute("id","dragred"+leftpanelcounter);
					leftpanel.appendChild(parsnip);
					leftpanelarray[leftpanelcounter] = parsnip;
					leftpanelcounter = leftpanelcounter + 1;
	
	var eggplant = document.createElement("IMG");
					eggplant.setAttribute("src","images/eggplant.png");
					eggplant.setAttribute("width","50px");
					eggplant.setAttribute("height","50px");
					eggplant.setAttribute("alt","eggplant");
					eggplant.setAttribute("title","Eggplant");
					eggplant.setAttribute("draggable","True");
					eggplant.setAttribute("flag","True");
					eggplant.setAttribute("ondragstart","drag(event)");
					eggplant.setAttribute("onclick","displayCompanionVegetables(event)");
					eggplant.setAttribute("id","dragred"+leftpanelcounter);
					leftpanel.appendChild(eggplant);
					leftpanelarray[leftpanelcounter] = eggplant;
					leftpanelcounter = leftpanelcounter + 1;
	
	var brusellsprouts = document.createElement("IMG");
					brusellsprouts.setAttribute("src","images/brusellsprouts.png");
					brusellsprouts.setAttribute("width","50px");
					brusellsprouts.setAttribute("height","50px");
					brusellsprouts.setAttribute("alt","brusellsprouts");
					brusellsprouts.setAttribute("title","Brusellsprouts");
					brusellsprouts.setAttribute("draggable","True");
					brusellsprouts.setAttribute("flag","True");
					brusellsprouts.setAttribute("ondragstart","drag(event)");
					brusellsprouts.setAttribute("onclick","displayCompanionVegetables(event)");
					brusellsprouts.setAttribute("id","dragred"+leftpanelcounter);
					leftpanel.appendChild(brusellsprouts);
					leftpanelarray[leftpanelcounter] = brusellsprouts;
					leftpanelcounter = leftpanelcounter + 1;
	
									
					
					
	//top left panel images ---------------------------------------------------------------------				
	
var fence = document.createElement("IMG");
					fence.setAttribute("src","images/fence.png");
					fence.setAttribute("width","50px");
					fence.setAttribute("height","50px");
					fence.setAttribute("alt","fence");
					fence.setAttribute("title","fence");
					fence.setAttribute("draggable","True");
					fence.setAttribute("flag","True");
					fence.setAttribute("ondragstart","drag(event)");
					fence.setAttribute("id","green"+topleftpanelcounter);
					topleftpanelcounter = topleftpanelcounter + 1;
					topleftpanel.appendChild(fence);

var Trellis = document.createElement("IMG");
					Trellis.setAttribute("src","images/Trellis.png");
					Trellis.setAttribute("width","50px");
					Trellis.setAttribute("height","50px");
					Trellis.setAttribute("alt","Trellis");
					Trellis.setAttribute("title","Trellis");
					Trellis.setAttribute("draggable","True");
					Trellis.setAttribute("flag","True");
					Trellis.setAttribute("ondragstart","drag(event)");
					Trellis.setAttribute("id","green"+topleftpanelcounter);
					topleftpanelcounter = topleftpanelcounter + 1;
					topleftpanel.appendChild(Trellis);						
	
	var Horizontal_line = document.createElement("IMG");
					Horizontal_line.setAttribute("src","images/Horizontal_line.png");
					Horizontal_line.setAttribute("width","50px");
					Horizontal_line.setAttribute("height","50px");
					Horizontal_line.setAttribute("alt","Horizontal_line");
					Horizontal_line.setAttribute("draggable","True");
					Horizontal_line.setAttribute("flag","True");
					Horizontal_line.setAttribute("ondragstart","drag(event)");
					Horizontal_line.setAttribute("id","green"+topleftpanelcounter);
					topleftpanelcounter = topleftpanelcounter + 1;
					topleftpanel.appendChild(Horizontal_line);
	
	var Vertical_line = document.createElement("IMG");
					Vertical_line.setAttribute("src","images/Vertical_line.png");
					Vertical_line.setAttribute("width","50px");
					Vertical_line.setAttribute("height","50px");
					Vertical_line.setAttribute("alt","Vertical_line");
					Vertical_line.setAttribute("draggable","True");
					Vertical_line.setAttribute("flag","True");
					Vertical_line.setAttribute("ondragstart","drag(event)");
					Vertical_line.setAttribute("id","green"+topleftpanelcounter);
					topleftpanelcounter = topleftpanelcounter + 1;
					topleftpanel.appendChild(Vertical_line);
	
	var corner_1 = document.createElement("IMG");
					corner_1.setAttribute("src","images/corner_1.png");
					corner_1.setAttribute("width","50px");
					corner_1.setAttribute("height","50px");
					corner_1.setAttribute("alt","corner_1");
					corner_1.setAttribute("draggable","True");
					corner_1.setAttribute("flag","True");
					corner_1.setAttribute("ondragstart","drag(event)");
					corner_1.setAttribute("id","green"+topleftpanelcounter);
					topleftpanelcounter = topleftpanelcounter + 1;
					topleftpanel.appendChild(corner_1);
					
	var corner_2 = document.createElement("IMG");
					corner_2.setAttribute("src","images/corner_2.png");
					corner_2.setAttribute("width","50px");
					corner_2.setAttribute("height","50px");
					corner_2.setAttribute("alt","corner_2");
					corner_2.setAttribute("draggable","True");
					corner_2.setAttribute("flag","True");
					corner_2.setAttribute("ondragstart","drag(event)");
					corner_2.setAttribute("id","green"+topleftpanelcounter);
					topleftpanelcounter = topleftpanelcounter + 1;
					topleftpanel.appendChild(corner_2);
	
	var corner_3 = document.createElement("IMG");
					corner_3.setAttribute("src","images/corner_3.png");
					corner_3.setAttribute("width","50px");
					corner_3.setAttribute("height","50px");
					corner_3.setAttribute("alt","corner_3");
					corner_3.setAttribute("draggable","True");
					corner_3.setAttribute("flag","True");
					corner_3.setAttribute("ondragstart","drag(event)");
					corner_3.setAttribute("id","green"+topleftpanelcounter);
					topleftpanelcounter = topleftpanelcounter + 1;
					topleftpanel.appendChild(corner_3);
	
	var corner_4 = document.createElement("IMG");
					corner_4.setAttribute("src","images/corner_4.png");
					corner_4.setAttribute("width","50px");
					corner_4.setAttribute("height","50px");
					corner_4.setAttribute("alt","corner_4");
					corner_4.setAttribute("draggable","True");
					corner_4.setAttribute("flag","True");
					corner_4.setAttribute("ondragstart","drag(event)");
					corner_4.setAttribute("id","green"+topleftpanelcounter);
					topleftpanelcounter = topleftpanelcounter + 1;
					topleftpanel.appendChild(corner_4);
	
	
	
	
	
	
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
  globalimageid = ev.currentTarget.id;
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
//var id="newId1";
//var image_x = document.getElementById(id);
//var image_x = document.getElementById('box').getElementsByTagName('img');


//image_x.parentNode.removeChild(image_x);

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
		

		//gets the child count of the div element 
		var x = document.getElementById(ev.currentTarget.id).childElementCount; 

		//if the div element has a child already then don't do anything if it doesn't then allow the image to be copied 
		if (x < 1) {
					if (globalflag == "True"){  //make a copy of the image once while global flag = true
					
								// If you use DOM manipulation functions, their default behaviour it not to 
								// copy but to alter and move elements. By appending a ".cloneNode(true)", 
								// you will not move the original element, but create a copy.
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
		var task = 'delete'
		//alert(globalimageid);
		var copyid = globalimageid;
		updatetable(task,copyid);
	el.parentNode.removeChild(el);
	}
}
//===========================================================================================================================================
//builds the working grid out of divs
//
function workingboard(widthworkingarea, heightworkingarea, workingareapanel){
widthof_box=40;
heightof_box=40;
numberof_boxes = ((widthworkingarea * heightworkingarea) / (widthof_box * heightof_box))*.82
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
}

//*/================================================================

var modal = document.getElementById('myModal');
var modalcontent = document.getElementById('modal-content');
var span = document.getElementsByClassName("close")[0];// Get the <span> element that closes the modal for companion vegetables

//show companion vegetables and check for where the mouse is on the screen so the modal box does not go off the screen
function displayCompanionVegetables(e){
	var left  = e.clientX  + "px";
    var top  = e.clientY  + "px";
    var vegetable=e.currentTarget.title;
	var vegetabletext = companionVegetableContent(vegetable);
	//check for most right border and bottom border of the screen
	if (e.clientX >= 1370 && e.clientY <936 ) {
			top = parseInt(e.clientY,10) - 100
			left = parseInt(e.clientX,10) - 250
			modal.style.display = "block";
			modal.style.left = left.toString() + "px";
			modal.style.top= top.toString() + "px";
							
							}
							else if (e.clientY <936) {
													//alert(left + " " +top);
													top = parseInt(e.clientY,10)-50
													//alert(left + " " +top);
													modal.style.display = "block";
													modal.style.left = left;
													modal.style.top= top.toString() + "px";
													}
													else if (e.clientX >= 1370){
														alert("made it here");
														left = parseInt(e.clientX,10) - 250
		
														modal.style.display = "block";
														modal.style.left = left.toString() + "px";
														modal.style.top = top;
														
																									
																								}
													
																								else{
																									modal.style.display = "block";
																									modal.style.left = left;
																									modal.style.top = top;
																									}
	modalcontent.innerHTML = vegetabletext;
	
  
    return false;
	 
}


var modal = document.getElementById('myModal');
var span = document.getElementsByClassName("close")[0];// Get the <span> element that closes the modal for companion vegetables

//turns off the modal display when the red x is clicked on
span.onclick = function() { 
  modal.style.display = "none";
}

//returns all vegetable that are companion plants to the vegetable that is being supplied to the function
function companionVegetableContent(vegetable){
	
switch (vegetable) {

case 'beets':
//alert("made it here");
    companioncontent = "Companion vegetable for Beets : Onion, kohlrabi, bush beans, lettuce, cabbage ";
	return (companioncontent);
    
    break;
	 
case 'cherrytomatos':
//alert("made it here");
    companioncontent = "Companion vegetable for cherrytomatos: Broccoli Cabbage Carrots Cauliflower Celery Corn Cucumbers Eggplant Peas Potatoes Radishes Squash Strawberries Tomatoes ";
	return (companioncontent);
    
    break;
case 'tomato':
//alert("made it here");
    companioncontent = "Companion vegetable for tomatos: Broccoli Cabbage Carrots Cauliflower Celery Corn Cucumbers Eggplant Peas Potatoes Radishes Squash Strawberries Tomatoes ";
	return (companioncontent);
    
    break;	 
case 'Bellpepper':
//alert("made it here");
    companioncontent = "Companion vegetable for Bellpepper: Carrots, cucumbers, radishes, squash, Eggplant,Spinach, lettuce ";
	return (companioncontent);
    
    break;	
case 'redpepper':
    companioncontent = "Companion vegetable for redpepper: Carrots, cucumbers, radishes, squash, Eggplant,Spinach, lettuce ";
	return (companioncontent);
    
    break;	
case 'carrot':
    companioncontent = "Companion vegetable for carrot: Beans,Lettuce,Onions,Peas,Radishes,Rosemary,Sage,Tomatoes ";
	return (companioncontent);
    
    break;	
case 'Snappea':
    companioncontent = "Companion vegetable for Snappea: Carrots,Celery,Corn,Cucumbers,Eggplant,Peppers,Radishes. ";
	return (companioncontent);
    
    break;	
case 'cucumber':
    companioncontent = "Companion vegetable for cucumber: Beans, corn, peas, radish, sunflowers, okra ";
	return (companioncontent);
    
    break;	
case 'cauliflower':
    companioncontent = "Companion vegetable for cauliflower: Beets, Broccoli, Brussels sprouts, Chard, Spinach, Cucumber, Corn, Radish. ";
	return (companioncontent);
    
    break;	
case 'butternutsquash':
    companioncontent = "Companion vegetable for butternutsquash: beans, peas, corn, ";
	return (companioncontent);
    
    break;	
case 'corn':
    companioncontent = "Companion vegetable for corn: beans, beets, cucumber, dill, melons, parsley, peas, potato, soya beans, squash, and sunflower. ";
	return (companioncontent);
    
    break;	
case 'Redonion':
    companioncontent = "Companion vegetable for redonion: Green Beans, Cucumbers, Onions, Lettuce, Summer Squash, Carrots, Peppers, Tomatoes";
	return (companioncontent);
    
    break;	
case 'Onion':
    companioncontent = "Companion vegetable for onion: Green Beans, Cucumbers, Onions, Lettuce, Summer Squash, Carrots, Peppers, Tomatoes";
	return (companioncontent);
    
    break;
case 'Green onion':
    companioncontent = "Companion vegetable for Green onion: Green Beans, Cucumbers, Onions, Lettuce, Summer Squash, Carrots, Peppers, Tomatoes";
	return (companioncontent);
    
    break;
case 'Radish':
    companioncontent = "Companion vegetable for Radish: Lettuce and spinach, Cucumbers, Squashes, Parsnips, Beans, parsley Peas.";
	return (companioncontent);
    
    break;
case 'Lettuce':
    companioncontent = "Companion vegetable for Lettuce: Beets, Carrots, Parsnips, Strawberries, Radishes, Onions, Asparagus, Corn.";
	return (companioncontent);
    
    break;
case 'Broccoli':
    companioncontent = "Companion vegetable for Broccoli: Beets, cucumbers, marigolds, beans";
	return (companioncontent);
    
    break;
case 'Parsnip':
    companioncontent = "Companion vegetable for Parsnip:  garlic, onions,potatoes,radishes,peppers,peas";
	return (companioncontent);
    
    break;
case 'Eggplant':
    companioncontent = "Companion vegetable for Eggplant: peppers,peas,Tomatoes,spinach";
	return (companioncontent);
    
    break;
case 'Brusellsprouts':
    companioncontent = "Companion vegetable for Brusellsprouts: Beets, Bush beans, Carrots, Celery, Lettuce, Onion, Pea, Potato.";
	return (companioncontent);
    
    break;
case 'Zucchini':
    companioncontent = "Companion vegetable for Zucchini: Spinach, Bush beans, Radish,Corn, Pea, mint";
	return (companioncontent);
    
    break;
case 'Spinach':
    companioncontent = "Companion vegetable for Spinach: Broccoli Cabbage Carrots Cauliflower Celery Corn Cucumbers Eggplant Peas Potatoes Radishes Squash Strawberries Tomatoes";
	return (companioncontent);
    
    break;
  default:
    console.log('Sorry');
}	
	
}



























