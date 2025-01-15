Content.makeFrontInterface(700, 500);

const var bg = Content.getComponent("bg");
const var knbTimeL = Content.getComponent("knbTimeL");
const var knbTimeR = Content.getComponent("knbTimeR");
const var knbFbk = Content.getComponent("knbFbk");
const var knbTone = Content.getComponent("knbTone");
const var knbMod = Content.getComponent("knbMod");
const var knbShim = Content.getComponent("knbShim");
const var knbMix = Content.getComponent("knbMix");

const var btnStereo = Content.getComponent("btnStereo");
const var btnTempoSync = Content.getComponent("btnTempoSync");

bg.setPaintRoutine(function(g)
{
	//g.fillAll(0xffccddff);
	g.setGradientFill([0xffccddff, 0, 0, 0xffbbccdd, 0, 500]);
	g.fillRect(this.getLocalBounds(0));

	g.setGradientFill([0xffccddff, 0, 0, 0xffbbccdd, 0, 500]);
});


inline function onBtnStereoControl(component, value)
{
	if (value == 1) {
		// STEREO
		knbTimeR.set("enabled", true);
	} else 
	// MONO
	knbTimeR.set("enabled", false);
};
btnStereo.setControlCallback(onBtnStereoControl);


inline function onBtnTempoSyncControl(component, value)
{
	if (value) 
	{
		knbTimeL.set("mode", "TempoSync");
		knbTimeR.set("mode", "TempoSync");
	} else 
	{
		knbTimeL.set("mode", "Time");
		knbTimeR.set("mode", "Time");
	}
};
btnTempoSync.setControlCallback(onBtnTempoSyncControl);
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
 