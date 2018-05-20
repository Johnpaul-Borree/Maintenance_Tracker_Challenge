//Adding Media querry
function mediaQuery(x) {
    if (x.matches) { // If media query matches
        document.getElementById("notice").innerHTML = "<a href='UI/create.html' target='_blank'>join Us</a> Making sure your <br> equipments are in good condition.";
    } else{
    	document.getElementById("notice").innerHTML = "We have all it takes in making sure your <br> equipments are in good condition.<br>No more issues of faulty equipments,<br> you do not need to make a call <br>simply <a href='UI/create.html' target='_blank'>get started &rarr;</a>"
    }
}

var x = window.matchMedia("(max-width: 1100px)")
mediaQuery(x) // Call listener function at run time
x.addListener(mediaQuery)


var viewForm = document.querySelector("#login");
	viewForm.style.display = "none";


var wrap = document.querySelector("#Wrapper");
	wrap.addEventListener("click",handleEvents,false);

//login events
function handleEvents(e) {
	if (e.target !== e.currentTarget) {
		if (e.target === document.querySelector('#member')) {
        viewForm.style.display = "block"; 
      } else if (e.target === document.querySelector('#close')) {
        viewForm.style.display = "none";
      }else if(e.target === document.querySelector("#menuDrop")){
      	respond();
      }
      //console.log(document.getElementsByClassName('responsive'));
    }
    e.stopPropagation();
}

function respond() {
    var navi = document.querySelectorAll('.menu-list');
    //console.log(navi)
    for(var i=0; i<navi.length; i++){
        if(navi[i].style.display == 'none' || navi[i].style.display == ""){
           // console.log(navi[i].style.display)
            navi[i].style.display = "block";
        }else if(navi[i].style.display == 'block'){
            //console.log(navi[i].style.display)
            navi[i].style.display = "none";
        }
       // console.log(navi[i].style.display)
       else{
            document.getElementById("navbars").classList.add("clear-fix");
       }
    }

}
