function main()
{
	var ap = document.getElementById("ap");
		
    // run
    setTimeout("update()", 0.0);
}

var g_time = 0.0;

function update()
{
	var AIM_FPS = 60.0;
	var MIN_DT = 1000.0 / AIM_FPS;
	setTimeout("update()", MIN_DT);
	
	g_time += MIN_DT;
	
	var angle = 90 + Math.sin(g_time * 0.005) * 45;

	var style = "rotate(" + Math.floor(angle) + "deg)";

	ap.style.transform = style;
	ap.style.WebkitTransform = style + " translateZ(0)"; // Force HW Acceleration
	ap.style.MozTransform = style;
	ap.style.OTransform = style;
	ap.style.msTransform = style;
	
	ap.style.WebkitTransformOrigin = "0% 50%";
	
	ap.style.left = "512px";
	ap.style.top = "100px";
	
}
