"use strict";

//------------------------------------------------------------------------------
// Global constants
var g_WIDTH;
var g_HEIGHT;

//------------------------------------------------------------------------------
// Global variables
var g_time = 0.0;
var g_gpe;

//------------------------------------------------------------------------------
// GPE constructor
var gpe = function(id)
{
	// Clone source
	var src = document.getElementById("news_1");
	this.div = src.cloneNode(true);
	this.div.id = "gpe_" + id;

	// Set visible
	this.div.style.visibility = "visible";

	// Set transforms anchor
	this.div.style.transformOrigin = "0% 50%";
	this.div.style.WebkitTransformOrigin = "0% 50%";
	this.div.style.MozTransformOrigin = "0% 50%";
	this.div.style.OTransformOrigin = "0% 50%";
	this.div.style.msTransformOrigin = "0% 50%";

	// Add to document
	document.body.appendChild(this.div);

	// Init variables
	this.timer = 0.0;
	this.pos = 0;	
}

//------------------------------------------------------------------------------
// GPE update
gpe.prototype.update = function(dt)
{
	this.timer += dt;
	
	// Compute angle
	var angle = 90 + Math.sin(this.timer * 0.005) * 45;
	var style = "rotate(" + Math.floor(angle) + "deg)";

	// Update rotation
	this.div.style.transform = style;
	this.div.style.WebkitTransform = style + " translateZ(0)"; // Force HW Acceleration
	this.div.style.MozTransform = style;
	this.div.style.OTransform = style;
	this.div.style.msTransform = style;
	
	// Move
	this.div.style.left = this.pos + "px";
	this.div.style.top = "100px";		
}

//------------------------------------------------------------------------------
// Main
function main()
{
	// Init "constants"
	g_WIDTH = document.body.clientWidth;
	g_HEIGHT = document.body.clientHeight;
	
	// TEMP
	g_gpe = new gpe(0);
	
    // Run
    setTimeout("update()", 0.0);
}

//------------------------------------------------------------------------------
// Loop
function update()
{
	// Plan next update
	var FPS = 60.0;
	var DT = 1000.0 / FPS;
	setTimeout("update()", DT);

	// Update GPEs
	g_gpe.update(DT);
}

