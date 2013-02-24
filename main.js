function main()
{
	var ap = document.getElementById("ap");
		
	var style = "rotate(" + 45 + "deg)";

	ap.style.transform = style;
	ap.style.WebkitTransform = style + " translateZ(0)"; // Force HW Acceleration
	ap.style.MozTransform = style;
	ap.style.OTransform = style;
	ap.style.msTransform = style;
	
	ap.style.left = "512px";
	ap.style.top = "512px";
}
