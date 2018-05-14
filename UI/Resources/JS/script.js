//Adding Media querry
function mediaQuery(x) {
    if (x.matches) { // If media query matches
        document.getElementById("notice").innerHTML = "<button>join Us</button> Making sure your <br> equipments are in good condition.";
    } else{
    	document.getElementById("notice").innerHTML = "We have all it takes in making sure your <br> equipments are in good condition.<br>No more issues of faulty equipments,<br> you do not need to make a call <br>simply <button>get started &rarr;</button>"
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
      	myFunction();
      }
      //console.log(document.getElementsByClassName('responsive'));
    }
    //e.stopPropagation();
}

function myFunction() {
    var navi = document.getElementById("navMenu");
    if (navi.className === "pages") {
        navi.className += " responsive";
    } else {
        navi.className = "pages";
    }
}
