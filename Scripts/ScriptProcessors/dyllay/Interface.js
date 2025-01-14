Content.makeFrontInterface(700, 500);

const var bg = Content.getComponent("bg");
const var knbTime = Content.getComponent("knbTime");


bg.setPaintRoutine(function(g)
{
	g.fillAll(0xff99aadd);
	g.setColour(0xffccccff);
	g.drawLine(0, 700, 50, 50, 2);
	g.drawLine(0, 700, 450, 450, 2);
});
function onNoteOn()
{
	
}
 function onNoteOff()
{
	
}
 function onController()
{
	
}
 function onTimer()
{
	
}
 function onControl(number, value)
{
	
}
 