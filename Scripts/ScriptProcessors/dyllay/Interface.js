/*
    Copyright 2025 Lukas Düll

    This file is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This file is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with This file. If not, see <http://www.gnu.org/licenses/>.
*/

Content.makeFrontInterface(700, 600);

include("ZoomHandler.js");

const var bg = Content.getComponent("bg");
const var knbTimeL = Content.getComponent("knbTimeL");
const var knbTimeR = Content.getComponent("knbTimeR");
const var knbFbkL = Content.getComponent("knbFbkL");
const var knbFbkR = Content.getComponent("knbFbkR");
const var knbMix = Content.getComponent("knbMix");
const var knbRvrb = Content.getComponent("knbRvrb");

const var btnStereo = Content.getComponent("btnStereo");
const var btnTempoSync = Content.getComponent("btnTempoSync");

const var Delay1 = Synth.getEffect("Delay1");
const var knbsTime = [knbTimeL, knbTimeR];


bg.setPaintRoutine(function(g)
{
	g.setGradientFill([0xffccddff, 0, 0, 0xffbbccdd, 0, 700]);
	g.fillRect(this.getLocalBounds(0));
});


// Init with active TempoSync
setTempoSyncMode(knbsTime, Delay1);


// KNOBS
// Time Knobs
inline function onKnbTimeLControl(component, value)
{
	Delay1.setAttribute(Delay1.DelayTimeLeft, value);
	
	if (!btnStereo.getValue())
	{
		Delay1.setAttribute(Delay1.DelayTimeRight, value);
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
	Delay1.setAttribute(Delay1.FeedbackLeft, value/100);
	
	if (!btnStereo.getValue())
		{
			Delay1.setAttribute(Delay1.FeedbackRight, value/100);
			knbFbkR.setValue(value);
		}
};
knbFbkL.setControlCallback(onKnbFbkLControl);	


inline function onKnbFbkRControl(component, value)
{
	Delay1.setAttribute(Delay1.FeedbackRight, value/100);
};
knbFbkR.setControlCallback(onKnbFbkRControl);


// Dry / Wet - Mix Knob
inline function onKnbMixControl(component, value)
{
	Delay1.setAttribute(Delay1.Mix, value/100);
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
		Delay1.setAttribute(Delay1.DelayTimeRight, Delay1.getAttribute(Delay1.DelayTimeLeft));
		Delay1.setAttribute(Delay1.FeedbackRight, Delay1.getAttribute(Delay1.FeedbackLeft));
		
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
	delay.setAttribute(delay.TempoSync, 1);
	delay.setAttribute(delay.DelayTimeLeft, 5);
	delay.setAttribute(delay.DelayTimeRight, 5);
	knobs.forEach(knb => {
		knb.setMode("TempoSync");
		knb.set("min", 0);
		knb.set("max", 18);
		knb.set("middlePosition", 8);
		knb.setValue(5);
	});
}

inline function setTimeMode(knobs, delay)
{
	delay.setAttribute(delay.TempoSync, 0);
	delay.setAttribute(delay.DelayTimeLeft, 1000);
	delay.setAttribute(delay.DelayTimeRight, 1000);
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
 