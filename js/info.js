

var abbvs = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];

var buttonids = ["1a","1b","1c","1d","1e","2a","2b","2c","2d","2e","2f","3a","3b","3c","3d","3e","4a","4b","4c","4d","4e","4f"];

var rights = ['Prompt Analysis','Access to Results','Retention of Kit','Government-Subsidized','Shower at Hospital','Nearest Rape Crisis Center','Statement of Rights','Available Protection','Copy of Police Report','Notice of Final Disposition','Informed of Perpetrator Release','Retention of all rights','Courtroom Cleared for Testimony','Victim Impact Statement','Prohibition of Polygraph','No drug prosecution from rape kit','Access to Counselor','Minimum Training standards','Automatically Summoned','Confidentiality and Privilege','Present During Medical Examination','Present During Interview'];
var categories = ['Rape Kit Procedure Rights','Notice and Access to Information Rights','Legal Procedure Rights','Sexual Assault Counseling Rights'];
var states = {};
var len = abbvs.length;

function givest(ind){
  var x = abbvs[ind];
  return states[x];
}





function createstates(){
  for (ss in abbvs){
    s = abbvs[ss];
    //$.ajax({url: "https://28fa2118172d806aefa68f4d1600e1213a85a84c-www.googledrive.com/host/0B-8FKptUmLDjYTBiRzUzN0x1SHM/States/"+s+".csv", async: false, success: function(result){
     //         fl=result;
      //    }});
    //var csv = $.csv2Array(fl);
    var yns = new Array();
    var laws = new Array();
    var links = new Array();

    //for (x=0; x<22; x++){
    //  yns.push(csv[x][0]);
    //  laws.push(csv[x][2]);
    //  links.push(csv[x][1]);
   // }

    var stobj =  {name: stateNames[ss], abbv: s, yn: yns, law: laws, link: links, index: ss, num: 0};

    document.getElementById('dropdown').innerHTML = document.getElementById('dropdown').innerHTML + "<option value='"+s+"'>"+ stateNames[ss] +"</option>";



    states[s]=stobj;

  }

  for (i=0;i<buttonids.length;i++){
   document.getElementById(buttonids[i]).innerHTML += rights[i];
  }
  for (i=0;i<categories.length;i++){
   document.getElementById(i+1).innerHTML += categories[i];
  }

  fillrights();
  colorize();
};

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
  
  //set s.num to number of rights turned on that state has
  for (s=0; s<len;s++){
    givest(s).num=0;
  };
  var on = 0
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

  if (on !=0){
    for (s=0; s<len;s++){
     colr(givest(s),'rgb('+(rmin+givest(s).num/on*(rmax-rmin))+','+(gmin+givest(s).num/on*(gmax-gmin))+','+(bmin+givest(s).num/on*(bmax-bmin))+')');
    //console.log('rgb('+(rmin+st(s).num/on*(rmax-rmin))+','+(gmin+st(s).num/on*(gmax-gmin))+','+(bmin+st(s).num/on*(bmax-bmin))+')');
    }
  }
  else{
    for (s=0; s<len;s++){
      colr(givest(s),'rgb('+0+','+0+',100)');
    }

  }

};

// function allcolorize(){
  
//   //set s.num to number of rights turned on that state has
//   for (s=0; s<len;s++){
//     st(s).num=0;
//   };
//   var on = 0
//   for (id in buttonids){
//     if (buttonstate(buttonids[id]) == "on"){
//       on = on+1;
//       for (s=0; s<len;s++){
//         if (st(s).yn[id]=='y'){
//           st(s).num = st(s).num+1;
//         }
//       }
//     }
//   }

//   if (on !=0){
//     for (s=0; s<len;s++){
//      colr(st(s),'rgb('+st(s).num/on*255+','+st(s).num/on*255+',100)');
//     }
//   }
//   else{
//     for (s=0; s<len;s++){
//       colr(st(s),'rgb('+0+','+0+',100)');
//     }

//   }

// };


function colr(st,clr){
  sts[st.index].attr({fill: clr});
  stateColors[st.index] = clr;
}

function selectcolr(sst){
  if (sst=='none'){return;}
  clr = 'rgb(241,90,43)';
  st =  states[sst];
  sts[st.index].attr({fill: clr});
  stateColors[st.index] = clr;
}





function buttonstate(butid){
  if (document.getElementById(butid)!=null){
    if (document.getElementById(butid+'o').title=="") {return "on";}
    else {return document.getElementById(butid+'o').title;}
  }
  else{return 'dne';}
}

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

// function buttonpush(butid){
//   if(buttonstate(butid)=='off'){
//     setbuttonstate(butid,'on');
//   }
//   else {
//     setbuttonstate(butid,'off');
//   }
//   colorize();
// }

function buttonpush(butid){
  alloff();
  setbuttonstate(butid,'on');
  colorize();
}





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







function insert(st){
//var fl;
/*$.ajax({url: "https://28fa2118172d806aefa68f4d1600e1213a85a84c-www.googledrive.com/host/0B-8FKptUmLDjYTBiRzUzN0x1SHM/States/"+st+".csv", async: false, success: function(result){
            fl=result;
        }});
var csv = $.csv2Array(fl);
var num_rights = 22;
*/
/*var fa = csv[0][0];
var fb = csv[1][0];
var fc = csv[2][0];
var fd = csv[3][0];
var fe = csv[4][0];
var sa = csv[5][0];
var sb = csv[6][0];
var sc = csv[7][0];
var sd = csv[8][0];
var se = csv[9][0];
var sf = csv[10][0];
var ta = csv[11][0];
var tb = csv[12][0];
var tc = csv[13][0];
var td = csv[14][0];
var te = csv[15][0];
var ffa = csv[16][0];
var ffb = csv[17][0];
var ffc = csv[18][0];
var ffd = csv[19][0];
var ffe = csv[20][0];
var fff = csv[21][0];*/
if(st=='none'){
  def();
  return;

}

var y = states[st].yn;
var l = states[st].link;
var la = states[st].law;
var fullname = states[st].name

var ids = ['first_a','first_b','first_c','first_d','first_e','second_a','second_b','second_c','second_d','second_e','second_f','third_a','third_b','third_c','third_d','third_e','fourth_a','fourth_b','fourth_c','fourth_d','fourth_e','fourth_f']

document.getElementById('temp').innerHTML =   "<h1 id='title'></h1> <div style='cursor: pointer' onclick=\"elementfn('first')\"> <p id ='first_title'><b></b></p> </div> <div id='first' style='display: none'> <p id='first_a'></p> <p id='first_b'></p><p id = 'first_c'></p> <p id='first_d'></p><p id=first_e></p></div> <div style='cursor: pointer' onclick=\"elementfn('second')\"><p id='second_title'><b></b></p></div><div id='second' style='display: none'><p id='second_a'></p><p id='second_b'></p><p id='second_c'></p><p id='second_d'></p><p id='second_e'></p><p id='second_f'></p></div><div style='cursor: pointer' onclick=\"elementfn('third')\"><p id='third_title'><b></b></p></div><div id='third' style='display: none'><p id='third_a'></p><p id='third_b'></p><p id='third_c'></p><p id='third_d'></p><p id='third_e'></p></div><div style='cursor: pointer' onclick=\"elementfn('fourth')\"><p id='fourth_title'><b></b></p></div> <div id='fourth' style='display: none'><p id='fourth_a'></p><p id='fourth_b'></p><p id='fourth_c'></p><p id='fourth_d'></p><p id='fourth_e'></p><p id='fourth_f'></p></div>"; 


 document.getElementById('title').innerHTML = fullname;
 document.getElementById('first_title').innerHTML = "<b>"+categories[0]+"</b>";
 document.getElementById('second_title').innerHTML = "<b>"+categories[1]+"</b>";
 document.getElementById('third_title').innerHTML = "<b>"+categories[2]+"</b>";
 document.getElementById('fourth_title').innerHTML = "<b>"+categories[3]+"</b>";




for (i=0; i<ids.length; i++){
  // law icon
  //document.getElementById(ids[i]).innerHTML = "<img src='"+y[i]+".png' style='height:1em'><img src='law.png' title='"+la[i]+"' style='height:1em; cursor:pointer' onclick=\"window.open('"+l[i]+"')\">"+rights[i];
  
  //law button
  document.getElementById(ids[i]).innerHTML = "<img src='"+y[i]+".png' style='height:1em'>"+rights[i]+"  "+"<button title='"+la[i]+"' style='font-size:90% '  onclick=\"window.open('"+l[i]+"')\">Law </button>";
}

// document.getElementById('first_title').innerHTML = "<b>Rape Kit Procedure</b>";

// document.getElementById('first_a').innerHTML = "<img src='"+y[0]+".png' style='height:1em'><img src='law.png' style='height:1em'>"+"Right to prompt analysis of rape kit";
// document.getElementById('first_a').setAttribute('onclick', 'window.open("'+l[0]+'")');
// document.getElementById('first_a').setAttribute('title', la[0]);
// document.getElementById('first_a').setAttribute('style', 'cursor: pointer');

// document.getElementById('first_b').innerHTML = "<img src='"+y[1]+".png' style='height:1em'>"+"Right to result of rape kit";
// document.getElementById('first_b').setAttribute('onclick', 'window.open("'+l[1]+'")');
// document.getElementById('first_b').setAttribute('title', la[1]);
// document.getElementById('first_b').setAttribute('style', 'cursor: pointer');

// document.getElementById('first_c').innerHTML = "<img src='"+y[2]+".png' style='height:1em'>"+"Right to retention of rape kit until statute of limitations expires";
// document.getElementById('first_c').setAttribute('onclick', 'window.open("'+l[2]+'")');
// document.getElementById('first_c').setAttribute('title', la[2]);
// document.getElementById('first_c').setAttribute('style', 'cursor: pointer');

// document.getElementById('first_d').innerHTML = "<img src='"+y[3]+".png' style='height:1em'>"+"Right to 100% government-subsidized rape kit";
// document.getElementById('first_d').setAttribute('onclick', 'window.open("'+l[3]+'")');
// document.getElementById('first_d').setAttribute('title', la[3]);
// document.getElementById('first_d').setAttribute('style', 'cursor: pointer');

// document.getElementById('first_e').innerHTML = "<img src='"+y[4]+".png' style='height:1em'>"+"Right to shower at hospital post-examination";
// document.getElementById('first_a').setAttribute('onclick', 'window.open("'+l[4]+'")');
// document.getElementById('first_e').setAttribute('title', la[4]);
// document.getElementById('first_e').setAttribute('style', 'cursor: pointer');



// document.getElementById('second_title').innerHTML = "<b>Notice and Access to Information</b>";

// document.getElementById('second_a').innerHTML = "<img src='"+y[5]+".png' style='height:1em'>"+"Right to be notified in writing of nearest rape crisis center";
// document.getElementById('second_a').setAttribute('onclick', 'window.open("'+l[5]+'")');
// document.getElementById('second_a').setAttribute('title', la[5]);
// document.getElementById('second_a').setAttribute('style', 'cursor: pointer');

// document.getElementById('second_b').innerHTML = "<img src='"+y[6]+".png' style='height:1em'>"+"Right to receive written statement of rights at time of report";
// document.getElementById('second_b').setAttribute('onclick', 'window.open("'+l[6]+'")');
// document.getElementById('second_b').setAttribute('title', la[6]);
// document.getElementById('second_b').setAttribute('style', 'cursor: pointer');

// document.getElementById('second_c').innerHTML = "<img src='"+y[7]+".png' style='height:1em'>"+"Right to be informed about available protection by law enforcement";
// document.getElementById('second_c').setAttribute('onclick', 'window.open("'+l[7]+'")');
// document.getElementById('second_c').setAttribute('title', la[7]);
// document.getElementById('second_c').setAttribute('style', 'cursor: pointer');

// document.getElementById('second_d').innerHTML = "<img src='"+y[8]+".png' style='height:1em'>"+"Right to copy of the police report";
// document.getElementById('second_d').setAttribute('onclick', 'window.open("'+l[8]+'")');
// document.getElementById('second_d').setAttribute('title', la[8]);
// document.getElementById('second_d').setAttribute('style', 'cursor: pointer');

// document.getElementById('second_e').innerHTML = "<img src='"+y[9]+".png' style='height:1em'>"+"Right to be informed about final disposition of case";
// document.getElementById('second_e').setAttribute('onclick', 'window.open("'+l[9]+'")');
// document.getElementById('second_e').setAttribute('title', la[9]);
// document.getElementById('second_e').setAttribute('style', 'cursor: pointer');

// document.getElementById('second_f').innerHTML = "<img src='"+y[10]+".png' style='height:1em'>"+"Right to be informed when convicted perpetrator is released from jail";
// document.getElementById('second_f').setAttribute('onclick', 'window.open("'+l[10]+'")');
// document.getElementById('second_f').setAttribute('title', la[10]);
// document.getElementById('second_f').setAttribute('style', 'cursor: pointer');



// document.getElementById('third_title').innerHTML = "<b>Legal Procedures</b>";

// document.getElementById('third_a').innerHTML = "<img src='"+y[11]+".png' style='height:1em'>"+"Retention of all rights regardless of whether assault is reported to police";
// document.getElementById('third_a').setAttribute('onclick', 'window.open("'+l[11]+'")');
// document.getElementById('third_a').setAttribute('title', la[11]);
// document.getElementById('third_a').setAttribute('style', 'cursor: pointer');

// document.getElementById('third_b').innerHTML = "<img src='"+y[12]+".png' style='height:1em'>"+"Right to have courtroom cleared during testimony";
// document.getElementById('third_b').setAttribute('onclick', 'window.open("'+l[12]+'")');
// document.getElementById('third_b').setAttribute('title', la[12]);
// document.getElementById('third_b').setAttribute('style', 'cursor: pointer');

// document.getElementById('third_c').innerHTML = "<img src='"+y[13]+".png' style='height:1em'>"+"Right to submit a victim impact statement or report to the court before sentencing";
// document.getElementById('third_c').setAttribute('onclick', 'window.open("'+l[13]+'")');
// document.getElementById('third_c').setAttribute('title', la[13]);
// document.getElementById('third_c').setAttribute('style', 'cursor: pointer');

// document.getElementById('third_d').innerHTML = "<img src='"+y[14]+".png' style='height:1em'>"+"Prohibition of polygraph testing of survivor";
// document.getElementById('third_d').setAttribute('onclick', 'window.open("'+l[14]+'")');
// document.getElementById('third_d').setAttribute('title', la[14]);
// document.getElementById('third_d').setAttribute('style', 'cursor: pointer');

// document.getElementById('third_e').innerHTML = "<img src='"+y[15]+".png' style='height:1em'>"+"Right not to have results from rape kit used in drug-related prosecution against survivor";
// document.getElementById('third_e').setAttribute('onclick', 'window.open("'+l[15]+'")');
// document.getElementById('third_e').setAttribute('title', la[15]);
// document.getElementById('third_e').setAttribute('style', 'cursor: pointer');



// document.getElementById('fourth_title').innerHTML = "<b>Sexual Assault Counseling</b>";

// document.getElementById('fourth_a').innerHTML = "<img src='"+y[16]+".png' style='height:1em'>"+"Right to a sexual assault counselor";
// document.getElementById('fourth_a').setAttribute('onclick', 'window.open("'+l[16]+'")');
// document.getElementById('fourth_a').setAttribute('title', la[16]);
// document.getElementById('fourth_a').setAttribute('style', 'cursor: pointer');

// document.getElementById('fourth_b').innerHTML = "<img src='"+y[17]+".png' style='height:1em'>"+"Right to a sexual assault counselor held to minimum training standards";
// document.getElementById('fourth_b').setAttribute('onclick', 'window.open("'+l[17]+'")');
// document.getElementById('fourth_b').setAttribute('title', la[17]);
// document.getElementById('fourth_b').setAttribute('style', 'cursor: pointer');

// document.getElementById('fourth_c').innerHTML = "<img src='"+y[18]+".png' style='height:1em'>"+"Right to automatically summoned counselor before medical examination or law enforcement interview";
// document.getElementById('fourth_c').setAttribute('onclick', 'window.open("'+l[18]+'")');
// document.getElementById('fourth_c').setAttribute('title', la[18]);
// document.getElementById('fourth_c').setAttribute('style', 'cursor: pointer');

// document.getElementById('fourth_d').innerHTML = "<img src='"+y[19]+".png' style='height:1em'>"+"Right to maintain confidentiality and privilege for sexual assault counselor";
// document.getElementById('fourth_d').setAttribute('onclick', 'window.open("'+l[19]+'")');
// document.getElementById('fourth_d').setAttribute('title', la[19]);
// document.getElementById('fourth_d').setAttribute('style', 'cursor: pointer');

// document.getElementById('fourth_e').innerHTML = "<img src='"+y[20]+".png' style='height:1em'>"+"Right to have sexual assault counselor present during medical examination";
// document.getElementById('fourth_e').setAttribute('onclick', 'window.open("'+l[20]+'")');
// document.getElementById('fourth_e').setAttribute('title', la[20]);
// document.getElementById('fourth_e').setAttribute('style', 'cursor: pointer');

// document.getElementById('fourth_f').innerHTML = "<img src='"+y[21]+".png' style='height:1em'>"+"Right to have sexual assault counselor present during law enforcement interview";
// document.getElementById('fourth_f').setAttribute('onclick', 'window.open("'+l[21]+'")');
// document.getElementById('fourth_f').setAttribute('title', la[21]);
// document.getElementById('fourth_f').setAttribute('style', 'cursor: pointer');


};



function def(){

document.getElementById('temp').innerHTML = "<h1> Legeslative Landscape</h1> <p><b>Click a state to see the rights survivors have in this state.  Click on a right to be taken to the relevant law (if it exists), and hover over a right to see the relevant law.  Some links only take you to the the entire state code rather than the specific law (in which case you will simply have to click through to the law you see in the hover text) </b><br>Rights are good.  We should give them to people.</p>";
};







/*<!--  "<div style=\"cursor: pointer\" onclick=\"elementfn('first')\"> <p><b>Rape Kit Procedure</b></p> </div>
  <div id='first' style=\"display: none\">
  <p>Right to prompt analysis of rape kit </p>
  <p>Right to result of rape kit</p>
  <p>Right to retention of rape kit until statute of limitations expires</p>
  <p>Right to 100% government-subsidized rape kit</p>
  <p>Right to shower at hospital post-examination</p>
  </div>

  <div style=\"cursor: pointer\" onclick=\"elementfn('second')\"><p><b>Notice and Access to Information</b></p></div>
  <div id='second' style='display: none'>
  <p>Right to be notified in writing of nearest rape crisis center</p>
  <p>Right to receive written statement of rights at time of report</p>
  <p>Right to be informed about final disposition of case</p>
  <p>Right to be informed about available protection by law enforcement</p>
  <p>Right to be informed when convicted perpetrator is released from jail</p>
  <p>Right to copy of the police report</p>
  </div>
  
  <div style=\"cursor: pointer\" onclick=\"elementfn('third')\"><p><b>Legal Procedures</b></p></div>
  <div id='third' style='display: none'>
  <p>Retention of all rights regardless of whether assault is reported to police</p>
  <p>Right to courtroom cleared during testimony</p>
  <p>Right to submit a victim impact statement or report to the court before sentencing</p>
  <p>Prohibition of polygraph testing of survivor</p>
  <p>Right not to have results from rape kit used in drug-related prosecution against survivor</p>
  </div>
  
  <div style=\"cursor: pointer\" onclick=\"elementfn('fourth')\"><p><b>Sexual Assault Counseling</b></p></div>
  <div id='fourth' style='display: none'>
  <p>Right to a sexual assault counselor</p>
  <p>Right to automatically summoned counselor before medical examination or law enforcement interview</p>
  <p>Right to a sexual assault counselor held to minimum training standards</p>
  <p>Right to maintain confidentiality and privilege for sexual assault counselor</p>
  <p>Right to have sexual assault counselor present during medical examination</p>
  <p>Right to have sexual assault counselor present during law enforcement interview</p>
  </div>" 
  
  "<div style=\"cursor: pointer\" onclick=\"elementfn('first')\"> <p><b>Rape Kit Procedure</b></p> </div>  <div id='first' style=\"display: none\"><p>Right to prompt analysis of rape kit </p><p>Right to result of rape kit</p> <p>Right to retention of rape kit until statute of limitations expires</p><p>Right to 100% government-subsidized rape kit</p> <p>Right to shower at hospital post-examination</p></div><div style=\"cursor: pointer\" onclick=\"elementfn('second')\"><p><b>Notice and Access to Information</b></p></div><div id='second' style='display: none'><p>Right to be notified in writing of nearest rape crisis center</p><p>Right to receive written statement of rights at time of report</p><p>Right to be informed about final disposition of case</p><p>Right to be informed about available protection by law enforcement</p> <p>Right to be informed when convicted perpetrator is released from jail</p><p>Right to copy of the police report</p> </div><div style=\"cursor: pointer\" onclick=\"elementfn('third')\"><p><b>Legal Procedures</b></p></div><div id='third' style='display: none'><p>Retention of all rights regardless of whether assault is reported to police</p><p>Right to courtroom cleared during testimony</p> <p>Right to submit a victim impact statement or report to the court before sentencing</p><p>Prohibition of polygraph testing of survivor</p> <p>Right not to have results from rape kit used in drug-related prosecution against survivor</p> </div> <div style=\"cursor: pointer\" onclick=\"elementfn('fourth')\"><p><b>Sexual Assault Counseling</b></p></div> <div id='fourth' style='display: none'> <p>Right to a sexual assault counselor</p> <p>Right to automatically summoned counselor before medical examination or law enforcement interview</p><p>Right to a sexual assault counselor held to minimum training standards</p> <p>Right to maintain confidentiality and privilege for sexual assault counselor</p> <p>Right to have sexual assault counselor present during medical examination</p><p>Right to have sexual assault counselor present during law enforcement interview</p></div>"
  
  -->*/
