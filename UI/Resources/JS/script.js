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

document.getElementById("user").style.display = "none";

//Event of opening
document.getElementById("joined").addEventListener("click",function(){
	document.getElementById("user").style.display = "block";
},false);
//Event of closing form
document.getElementById("closing").addEventListener("click",function() {
	document.getElementById("user").style.display = "none";
},false);

