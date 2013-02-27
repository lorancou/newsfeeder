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
var g_dude;
var g_finished;

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
	g_dude = new dude();
	g_finished = false;
	
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
	if (g_finished === false)
	{
		if (g_tick % (2 * FPS) == 0)
		{
			g_gpeArray.push(new gpe(g_gpeCount++));
		}
	}

	// Update GPEs
	for (var i=0; i<g_gpeArray.length; ++i)
	{
		g_gpeArray[i].update(DT);
	}	

	// Remove GPEs that went out of bound
    var i = g_gpeArray.length;
    while (i--)
	{
		var removeIt = false;
		
        if (g_finished === false &&
			g_gpeArray[i].posX > (g_WIDTH/2)-100 &&
			g_gpeArray[i].posX < (g_WIDTH/2)+100 &&
			g_gpeArray[i].posY > g_HEIGHT - 400)
        {
			if (!g_dude.eat(g_gpeArray[i].newsId))
			{
				g_finished = true;
			}
			removeIt = true;
		}
        else if (g_gpeArray[i].posX > g_WIDTH + 200 ||
			g_gpeArray[i].posY > g_HEIGHT)
        {
			removeIt = true;
        }
		
		if (removeIt)
		{
			g_gpeArray[i].div.parentNode.removeChild(g_gpeArray[i].div);
			g_gpeArray.splice(i, 1);
		}
    }	
}

//------------------------------------------------------------------------------
// GPE constructor
var gpe = function(id)
{
	// Random news
	this.newsId = Math.floor(Math.random() * g_NEWS_COUNT);
	
	// Clone source
	var src = document.getElementById("news_" + this.newsId);
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
	
	// Drop on hover
	this.hanging = true;
	this.div.that = this;
	this.div.onmouseover = function() { this.that.hanging = false; };

	// Add to document
	document.body.appendChild(this.div);

	// Init variables
	this.timer = 0.0;
	this.posX = -50;
	this.posY = 70;
}

//------------------------------------------------------------------------------
// GPE update
gpe.prototype.update = function(dt)
{
	this.timer += dt;
	
	if (this.hanging === true && g_finished === false)
	{
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
		this.posX += 1;
	}
	else
	{
		// Drop
		this.posY += 10;
	}

	// Update position
	this.div.style.left = this.posX + "px";
	this.div.style.top = this.posY + "px";		
}

//------------------------------------------------------------------------------
// Dude constructor
var dude = function()
{
	// Place it
	this.img = document.getElementById("dude");
	this.img.style.left = ((g_WIDTH-this.img.clientWidth)/2) + "px";
	this.img.style.top = (g_HEIGHT-this.img.clientHeight-20) + "px";
	
	// Init eaten news
	this.eatenNews = new Array();
	for (var i=0; i<g_NEWS_COUNT; ++i)
	{
		this.eatenNews.push(false);
	}
}

//------------------------------------------------------------------------------
// Dude eat
dude.prototype.eat = function(newsId)
{
	if (this.eatenNews[newsId] === true)
	{
		this.img.src = "dude_fail.png";
		return false;
	}
	
	this.eatenNews[newsId] = true;

	var eatenNewsCount = 0;
	for (var i=0; i<g_NEWS_COUNT; ++i)
	{
		if (this.eatenNews[i] === true)
		{
			++eatenNewsCount;
		}
	}
	
	if (eatenNewsCount == g_NEWS_COUNT)
	{
		this.img.src = "dude_win.png";
	}
	else if (eatenNewsCount > 0)
	{
		this.img.src = "dude_" + eatenNewsCount + ".png";
	}
	
	return (eatenNewsCount < g_NEWS_COUNT);
}
