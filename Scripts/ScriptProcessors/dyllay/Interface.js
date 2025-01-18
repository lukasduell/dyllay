Content.makeFrontInterface(700, 500);

const var bg = Content.getComponent("bg");
const var knbTimeL = Content.getComponent("knbTimeL");
const var knbTimeR = Content.getComponent("knbTimeR");
const var knbFbkL = Content.getComponent("knbFbkL");
const var knbFbkR = Content.getComponent("knbFbkR");
const var knbTone = Content.getComponent("knbTone");
const var knbMod = Content.getComponent("knbMod");
const var knbShim = Content.getComponent("knbShim");
const var knbMix = Content.getComponent("knbMix");

const var btnStereo = Content.getComponent("btnStereo");
const var btnTempoSync = Content.getComponent("btnTempoSync");

const var Delay1 = Synth.getEffect("Delay1");
const var knbsTime = [knbTimeL, knbTimeR];


bg.setPaintRoutine(function(g)
{
	g.setGradientFill([0xffccddff, 0, 0, 0xffbbccdd, 0, 500]);
	g.fillRect(this.getLocalBounds(0));
});

// INIT WITH active TempoSync
setTempoSyncMode(knbsTime, Delay1);


// KNOBS

inline function onKnbTimeLControl(component, value)
{
	Delay1.setAttribute(0, value);
};
knbTimeL.setControlCallback(onKnbTimeLControl);


inline function onKnbTimeRControl(component, value)
{
	Delay1.setAttribute(1, value);
};
knbTimeR.setControlCallback(onKnbTimeRControl);


// Feedback Knobs
inline function onKnbFbkLControl(component, value)
{
	Delay1.setAttribute(2, value/100);
};
knbFbkL.setControlCallback(onKnbFbkLControl);

inline function onKnbFbkRControl(component, value)
{
	Delay1.setAttribute(3, value/100);
};
knbFbkR.setControlCallback(onKnbFbkRControl);


// Dry / Wet - Mix Knob
inline function onKnbMixControl(component, value)
{
	Delay1.setAttribute(6, value/100);
};
knbMix.setControlCallback(onKnbMixControl);




// BUTTONS

inline function onBtnStereoControl(component, value)
{
	if (value == 1) // STEREO
	{
		knbTimeR.set("enabled", true);
		knbFbkR.set("enabled", true);
	}
	else // MONO
	{
	knbTimeR.set("enabled", false);
	knbFbkR.set("enabled", false);
	}
};
btnStereo.setControlCallback(onBtnStereoControl);


inline function onBtnTempoSyncControl(component, value)
{
	if (!!value && !Delay1.getAttribute(7))
	{	
		setTempoSyncMode(knbsTime, Delay1);
	}
	else if (!value && !!Delay1.getAttribute(7))
	{
		setTimeMode(knbsTime, Delay1);
	}
};
btnTempoSync.setControlCallback(onBtnTempoSyncControl);



// Hilfsfunktionen

//knobs expects an Array, fx expects a delay effect
inline function setTempoSyncMode(knobs, delay)
{
	delay.setAttribute(7, 1);
	knobs.forEach(knb => {
		knb.setMode("TempoSync");
		knb.set("min", 0);
		knb.set("max", 18);
		knb.set("middlePosition", 8);
		knb.setValue(8);
	});
}

inline function setTimeMode(knobs, delay)
{
	delay.setAttribute(7, 0);
	knobs.forEach(knb => {
		knb.setMode("Time");
		knb.set("min", 10);
		knb.set("max", 10000);
		knb.set("middlePosition", 1000);
		knb.setValue(1000);
	});
}




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
 