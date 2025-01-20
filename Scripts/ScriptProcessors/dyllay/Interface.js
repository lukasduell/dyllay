Content.makeFrontInterface(700, 500);

const var bg = Content.getComponent("bg");
const var knbTimeL = Content.getComponent("knbTimeL");
const var knbTimeR = Content.getComponent("knbTimeR");
const var knbFbkL = Content.getComponent("knbFbkL");
const var knbFbkR = Content.getComponent("knbFbkR");
const var knbRvrb = Content.getComponent("knbRvrb");
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


// Init with active TempoSync
setTempoSyncMode(knbsTime, Delay1);


// KNOBS
// Time Knobs
inline function onKnbTimeLControl(component, value)
{
	Delay1.setAttribute(0, value);
	
	if (!btnStereo.getValue())
	{
		Delay1.setAttribute(1, value);
		knbTimeR.setValue(value);
	}
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
	
	if (!btnStereo.getValue())
		{
			Delay1.setAttribute(3, value);
			knbFbkR.setValue(value);
		}
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
	if (!!value) // STEREO
	{
		knbTimeR.set("enabled", true);
		knbFbkR.set("enabled", true);
	}
	else // MONO
	{
		Delay1.setAttribute(1, Delay1.getAttribute(0));
		Delay1.setAttribute(3, Delay1.getAttribute(2));
		
		knbTimeR.set("enabled", false);
		knbFbkR.set("enabled", false);
		
		knbTimeR.setValue(knbTimeL.getValue());
		knbFbkR.setValue(knbFbkL.getValue());
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



// Helper functions

//knobs expects array, fx expects delay effect
inline function setTempoSyncMode(knobs, delay)
{
	delay.setAttribute(7, 1);
	delay.setAttribute(0, 8);
	delay.setAttribute(1, 8);
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
 