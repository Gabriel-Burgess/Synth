//I read through the mozilla documentation and combined the lessons learned there with
//the equation for a sine wave.
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var duration = 2; //Duration of sound in seconds.
var frameCount = audioCtx.sampleRate * duration; //Will create enough frames for two seconds.
var arrayBuffer = audioCtx.createBuffer(1, frameCount, audioCtx.sampleRate);

var frequency = 1; //Number of oscillations per second.
var peakAmplitude = 1; //Some number between -1 and 1.
var t = 0; //time
var phase = 0;
var sampleRate = audioCtx.sampleRate;
var y = 0; //the current value of amplitude at time t.

var isReady = false; //Determines whether playSound() can be executed.

//Returns the current amplitude at time t.
var currentAmplitude = function(time, phaseArg)
{
    return peakAmplitude * Math.sin((2 * Math.PI * frequency * time)  + phaseArg);
}

//Calculates phase from the given frequency and sample rate.
var getPhase = function()
{
    phase = phase + ((2 * Math.PI * frequency) / sampleRate);
    
    if(phase > 2 * Math.PI)
    {
        phase = phase - (2 * Math.PI);
    }
    return phase;
}

var populateBufferWithArgs = function(freq, peakAmp)
{
    frequency = freq;
    peakAmplitude = peakAmp;
    phase = getPhase();
    
    channelBuffer = arrayBuffer.getChannelData(0);
    for(var i = 0; i < frameCount; i++)
    {
        y = currentAmplitude(t, phase);
        channelBuffer[i] = y;
        t += (1 / sampleRate); //Placed here so t starts at 0.
    }
    t = 0; //Reset t so it starts at 0 next time is executed.
    isReady = true; //playSound() can now execute.
}

var populateBuffer = function()
{
    phase = getPhase();
    
    channelBuffer = arrayBuffer.getChannelData(0);
    for(var i = 0; i < frameCount; i++)
    {
        y = currentAmplitude(t, phase);
        channelBuffer[i] = y;
        t += (1 / sampleRate); //Placed here so t starts at 0.
    }
    t = 0; //Reset t so it starts at 0 next time is executed.
    isReady = true; //playSound() can now execute.
}

var playSound = function()
{
    if(isReady)
    {
        //Creates and AudioBufferSourceNode and plays it.
        var source = audioCtx.createBufferSource();
        source.buffer = arrayBuffer;
        source.connect(audioCtx.destination);
        source.start;
    }   
}

