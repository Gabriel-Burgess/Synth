var frequency = NaN; //Number of oscillations per second.
var peakAmplitude = 1; //Some number between -1 and 1.
var t = NaN; //time
var phase = NaN;
var sampleRate = NaN;
var y = NaN;

var currentAmplitude = function(time, phaseArg)
{
    return peakAmplitude * Math.sin((2 * Math.PI * frequency * time)  + phaseArg);
}

var getPhase = function()
{
    phase = phase + ((2 * Math.PI * frequency) / sampleRate);
    
    if(phase > 2 * Math.PI)
    {
        phase = phase - (2 * Math.PI);
    }
    return phase;
}

while(t < 10)
{
    phase = getPhase();
    y = currentAmplitude(t, phase);
    t += 0.1;
}
