
//Array of state abbreviations that will be useful
var abbvs = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];

// element IDs for all the buttons below (ie the rights you click on to hilight which states have thos rights)
var buttonids = ["1a","1b","1c","1d","1e","2a","2b","2c","2d","2e","2f","3a","3b","3c","3d","3e","4a","4b","4c","4d","4e","4f"];

//Array of the rights short names (these are inserted into the HTML so we only have to edit content in one place if we want to change names or something)
var rights = ['Prompt Analysis','Access to Results','Retention of Kit','Government-Subsidized','Shower at Hospital','Nearest Rape Crisis Center','Statement of Rights','Available Protection','Copy of Police Report','Notice of Final Disposition','Informed of Perpetrator Release','Retention of all rights','Courtroom Cleared for Testimony','Victim Impact Statement','Prohibition of Polygraph','No drug prosecution from rape kit','Access to Counselor','Minimum Training standards','Automatically Summoned','Confidentiality and Privilege','Present During Medical Examination','Present During Interview'];

//Same as above, but the categories the rights fall into
var categories = ['Rape Kit Procedure Rights','Notice and Access to Information Rights','Legal Procedure Rights','Sexual Assault Counseling Rights'];

//This array will get filled below with state objects I will create (ie states.AL.name willbe "Alabama")
var states = {};

//number of states (which now includes DC, but could grow to other territories I suppose)
var len = abbvs.length;



//Function to return the state object from an idex number (mostly becuase javascript was acting in weird ways when I tried to reference an index in the States array in other places)
function givest(ind){
  var x = abbvs[ind];
  return states[x];
}




//Fills the states array (partially -- the statesjs.js file has all the data like laws, links, and comments for each.  It gets imported after this funciton is called, so it is simply adding attributes to the states)
function createstates(){
  for (ss in abbvs){
    s = abbvs[ss];

    // array to fill attribute that is a list of y and n for each right in order
    var yns = new Array();

    //array to fill attribute that is a list of the relevant laws for each right in order
    var laws = new Array();

    //array to fill attribute that is a list of the links to the law for each right in order
    var links = new Array();

    //the state object it self
    var stobj =  {name: stateNames[ss], abbv: s, yn: yns, law: laws, link: links, index: ss, num: 0};

    document.getElementById('dropdown').innerHTML = document.getElementById('dropdown').innerHTML + "<option value='"+s+"'>"+ stateNames[ss] +"</option>";


    //notice all the attributes except the name and abbreviation are empty -- these are filled in the rightsjs.js file, which is generated via pythons script from a master CSV
    states[s]=stobj;

  }

  // fills in the rights and categories below the map -- it's here because the createstates is called during initializaiton -- it could easily have been a seperate funciton also called
  for (i=0;i<buttonids.length;i++){
   document.getElementById(buttonids[i]).innerHTML += rights[i];
  }
  for (i=0;i<categories.length;i++){
   document.getElementById(i+1).innerHTML += categories[i];
  }

  // calls function in rightsjs.js that adds in the rights info to the states object array
  fillrights();

  //itial call to set colors for the states
  colorize();
};

//colors all the states  (the different commented out parts are alternate color schemes I was playing with)
function colorize(){
  //rise colors
  // var rmin = 10
  // var rmax = 241
  // var gmin = 157
  // var gmax = 90
  // var bmin = 226
  // var bmax = 43

  // blues color scheme (with rise blue as max)
  var rmin = 0
  var rmax = 10
  var gmin = 0
  var gmax = 157
  var bmin = 80
  var bmax = 226

  // B&W
  // var rmin = 20
  // var rmax = 200
  // var gmin = 20
  // var gmax = 200
  // var bmin = 20
  // var bmax = 200
  

  //sets s.num -- which will be to number of rights 'turned on' that are also a 'y' for the state -- to 0 for all states
  for (s=0; s<len;s++){
    givest(s).num=0;
  };

  // number of rights turned 'on'
  var on = 0

  //goes through all the 'buttons' -- ie, rights -- below the map to see how many are on
  for (id in buttonids){
    if (buttonstate(buttonids[id]) == "on"){
      on = on+1;
      for (s=0; s<len;s++){
        if (givest(s).yn[id]=='y'){
          givest(s).num = givest(s).num+1;
        }
      }
    }
  }

  //colors earh state based on its value of num.
  if (on !=0){
    for (s=0; s<len;s++){
     colr(givest(s),'rgb('+(rmin+givest(s).num/on*(rmax-rmin))+','+(gmin+givest(s).num/on*(gmax-gmin))+','+(bmin+givest(s).num/on*(bmax-bmin))+')');
    }
  }
  else{
    for (s=0; s<len;s++){
      colr(givest(s),'rgb('+0+','+0+',100)');
    }

  }

};



// this is the function that actually sets a given state objects color by altering a different array of state objects that.  THere is the states array I created with abstract info about the sates, and there are various arrays created with the map in init.js, which correspond to the on-screen state, and therefore must be changed to control the state's color
function colr(st,clr){
  sts[st.index].attr({fill: clr});
  stateColors[st.index] = clr;
}


// sets the color for selected states
function selectcolr(sst){
  if (sst=='none'){return;}
  clr = 'rgb(241,90,43)';
  st =  states[sst];
  sts[st.index].attr({fill: clr});
  stateColors[st.index] = clr;
}




// tells you the state of a button (which is what I am calling the list of rights to click on under the map) based on its id -- ie on, off, or dne if it's not the id of a button
function buttonstate(butid){
  if (document.getElementById(butid)!=null){
    if (document.getElementById(butid+'o').title=="") {return "on";}
    else {return document.getElementById(butid+'o').title;}
  }
  else{return 'dne';}
}

// sets the state of a button to on or off depending on argument
function setbuttonstate(butid, st){
  if (st=='on'){
    document.getElementById(butid+'o').innerHTML="&#9679";
    document.getElementById(butid+'o').title='on';
  }
  else {
    document.getElementById(butid+'o').innerHTML="&#9675";
    document.getElementById(butid+'o').title='off';
  }
}


//pushes a button (called when button is clicked) -- first turns all of them off, then turns on the one clicked to select that right, then re-colorizes the map to reflect change
function buttonpush(butid){
  alloff();
  setbuttonstate(butid,'on');
  colorize();
}




// just sets all buttons to off and re-colors map
function alloff(){

  for(catid = 1; catid<5 ; catid++){

      setbuttonstate(catid+'a','off');
      setbuttonstate(catid+'b','off');
      setbuttonstate(catid+'c','off');
      setbuttonstate(catid+'d','off');
      setbuttonstate(catid+'e','off');
      if(document.getElementById(catid+'f')!=null){
        setbuttonstate(catid+'f','off');}
  }
  colorize();

}

//sets all to on
function allon(){

  for(catid = 1; catid<5 ; catid++){

      setbuttonstate(catid+'a','on');
      setbuttonstate(catid+'b','on');
      setbuttonstate(catid+'c','on');
      setbuttonstate(catid+'d','on');
      setbuttonstate(catid+'e','on');
      if(document.getElementById(catid+'f')!=null){
        setbuttonstate(catid+'f','on');}
  }
  colorize();

}


//sets a given column to all be on and the rest off (to select a category)
function allpush(catid){
  alloff();
  if (buttonstate(catid+'a')=='on' && buttonstate(catid+'b')=='on' && buttonstate(catid+'c')=='on' && buttonstate(catid+'d')=='on' && buttonstate(catid+'e')=='on' && (buttonstate(catid+'f')=='on' || buttonstate(catid+'f')=='dne')){
    setbuttonstate(catid+'a','off');
    setbuttonstate(catid+'b','off');
    setbuttonstate(catid+'c','off');
    setbuttonstate(catid+'d','off');
    setbuttonstate(catid+'e','off');
    if(document.getElementById(catid+'f')!=null){
      setbuttonstate(catid+'f','off');}
  }
  else{
    setbuttonstate(catid+'a','on');
    setbuttonstate(catid+'b','on');
    setbuttonstate(catid+'c','on');
    setbuttonstate(catid+'d','on');
    setbuttonstate(catid+'e','on');
    if(document.getElementById(catid+'f')!=null){
      setbuttonstate(catid+'f','on');}

  }
  colorize();

}






//changes the text on the right to reflect a state being selected
function insert(st){
  //resets to default if no state selected
  if(st=='none'){
    def();
    return;
  }

  //temporary arrays with yn, link, law, name of the selected state
  var y = states[st].yn;
  var l = states[st].link;
  var la = states[st].law;
  var fullname = states[st].name

  //element ids of the divs I insert below, which I can call to fill in the requisite text
  var ids = ['first_a','first_b','first_c','first_d','first_e','second_a','second_b','second_c','second_d','second_e','second_f','third_a','third_b','third_c','third_d','third_e','fourth_a','fourth_b','fourth_c','fourth_d','fourth_e','fourth_f']

  //temp is the html inserted by the map into the text on the right, which I can now fill with what I want via javascript -- this is nice because I can separate teh content from formatting etc.  elementfn -- which is defined in index.html makes a category show it's sub-rights when clicked
  document.getElementById('temp').innerHTML =   "<h1 id='title'></h1> <div style='cursor: pointer' onclick=\"elementfn('first')\"> <p id ='first_title'><b></b></p> </div> <div id='first' style='display: none'> <p id='first_a'></p> <p id='first_b'></p><p id = 'first_c'></p> <p id='first_d'></p><p id=first_e></p></div> <div style='cursor: pointer' onclick=\"elementfn('second')\"><p id='second_title'><b></b></p></div><div id='second' style='display: none'><p id='second_a'></p><p id='second_b'></p><p id='second_c'></p><p id='second_d'></p><p id='second_e'></p><p id='second_f'></p></div><div style='cursor: pointer' onclick=\"elementfn('third')\"><p id='third_title'><b></b></p></div><div id='third' style='display: none'><p id='third_a'></p><p id='third_b'></p><p id='third_c'></p><p id='third_d'></p><p id='third_e'></p></div><div style='cursor: pointer' onclick=\"elementfn('fourth')\"><p id='fourth_title'><b></b></p></div> <div id='fourth' style='display: none'><p id='fourth_a'></p><p id='fourth_b'></p><p id='fourth_c'></p><p id='fourth_d'></p><p id='fourth_e'></p><p id='fourth_f'></p></div>"; 

  //fills titles of categories
   document.getElementById('title').innerHTML = fullname;
   document.getElementById('first_title').innerHTML = "<b>"+categories[0]+"</b>";
   document.getElementById('second_title').innerHTML = "<b>"+categories[1]+"</b>";
   document.getElementById('third_title').innerHTML = "<b>"+categories[2]+"</b>";
   document.getElementById('fourth_title').innerHTML = "<b>"+categories[3]+"</b>";



   //fills in the divs for the rights from teh rights array.
  for (i=0; i<ids.length; i++){
    // law icon -- alternative formatting I was considering
    //document.getElementById(ids[i]).innerHTML = "<img src='"+y[i]+".png' style='height:1em'><img src='law.png' title='"+la[i]+"' style='height:1em; cursor:pointer' onclick=\"window.open('"+l[i]+"')\">"+rights[i];
    
    //law button
    document.getElementById(ids[i]).innerHTML = "<img src='"+y[i]+".png' style='height:1em'>"+rights[i]+"  "+"<button title='"+la[i]+"' style='font-size:90% '  onclick=\"window.open('"+l[i]+"')\">Law </button>";
  }



};


//resets to default -- ie no state selected
function def(){

  document.getElementById('temp').innerHTML = "<h1> Legeslative Landscape</h1> <p><b>Click a state to see the rights survivors have in this state.  Click on a right to be taken to the relevant law (if it exists), and hover over a right to see the relevant law.  Some links only take you to the the entire state code rather than the specific law (in which case you will simply have to click through to the law you see in the hover text) </b><br>Rights are good.  We should give them to people.</p>";
};





