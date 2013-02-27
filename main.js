"use strict";

//------------------------------------------------------------------------------
// Global constants
var g_WIDTH;
var g_HEIGHT;
var g_NEWS_COUNT = 4;

//------------------------------------------------------------------------------
// Global variables
var g_time;
var g_tick;
var g_gpeArray;
var g_gpeCount;

//------------------------------------------------------------------------------
// Main
function main()
{
	// Init global "constants"
	g_WIDTH = document.body.clientWidth;
	g_HEIGHT = document.body.clientHeight;
	
	// Init global variables
	g_time = 0.0;
	g_tick = 0;
	g_gpeArray = new Array();
	g_gpeCount = 0;
	
	var dude = document.getElementById("dude");
	dude.style.left = ((g_WIDTH-dude.clientWidth)/2) + "px";
	dude.style.top = (g_HEIGHT-dude.clientHeight-20) + "px";
	
    // Run
    update();
}

//------------------------------------------------------------------------------
// Loop
function update()
{
	// Plan next update
	var FPS = 60.0;
	var DT = 1000.0 / FPS;
	setTimeout("update()", DT);
	++g_tick;
	
	// A new GPE every 2 sec
	if (g_tick % (2 * FPS) == 0)
	{
		g_gpeArray.push(new gpe(g_gpeCount++));
	}

	// Update GPEs
	for (var i=0; i<g_gpeArray.length; ++i)
	{
		g_gpeArray[i].update(DT);
	}
}

//------------------------------------------------------------------------------
// GPE constructor
var gpe = function(id)
{
	// Random news
	var newsIndex = Math.floor(Math.random() * g_NEWS_COUNT);
	
	// Clone source
	var src = document.getElementById("news_" + newsIndex);
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
	this.pos = -50;	
}

//------------------------------------------------------------------------------
// GPE update
gpe.prototype.update = function(dt)
{
	this.timer += dt;
	
	// Rotate
	var angle = 90 + Math.sin(this.timer * 0.005) * 20;

	// Update orientation
	var style = "rotate(" + Math.floor(angle) + "deg)";
	this.div.style.transform = style;
	this.div.style.WebkitTransform = style + " translateZ(0)"; // Force HW Acceleration
	this.div.style.MozTransform = style;
	this.div.style.OTransform = style;
	this.div.style.msTransform = style;
	
	// Move
	this.pos += 1;

	// Update position
	this.div.style.left = this.pos + "px";
	this.div.style.top = "20px";		
}
