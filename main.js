// sketch
// confidence
// score
// timer
// canvHolder

var then = Date.now();
var items = ['Hand','Apple','Line','Circle', 'Sweater', 'Cup', 'Camera', 'Car', 'Rain'];
var randInt = Math.floor(Math.random() * items.length);
console.log(items[randInt]);
document.getElementById('skecthToDraw').innerHTML = `Sketch to be drawn: ${items[randInt]}`;

var score = 0;

function preload() {
    classifier = ml5.imageClassifier('DoodleNet',()=>{
        console.log('model Ready');
    });
    console.log(ml5.version);
    console.log({classifier});
}

function setup() {
    canv = createCanvas(400,400);
    console.log(canv);
    document.getElementById('canvHolder').append(canv.elt);
    background('white');

    
    canv.mouseReleased(classifyCanvas);
    

    synth = window.speechSynthesis;
}

function classifyCanvas() {
    console.log('classify');
    // classifier.classify(canv,gotResult);
    


    classifier.classify(canv, (error,result)=>{
        if (error) {
            console.error(error);
        }else{
            console.log(result);
            label = result[0].label;
            confidence = result[0].confidence;

            console.log({label});
            console.log({confidence});

            document.getElementById('sketch').innerHTML = `Your Sketch: ${label}`;
            document.getElementById('confidence').innerHTML = `Confidence: ${Math.round(confidence * 100)}%`;
            // label = 'book';
            if (items[randInt].toLowerCase() == label) {
                score++;
                reEveryThing();
                document.getElementById('score').innerHTML = `Score: ${score}`
                
            }
        }
    });
}

// function gotResult(error,result) {
    
// }


function clearCanvas() {
    background('white');
}

function draw() {
    now = Date.now();
    time = Math.round((now - then)/1000);
    document.getElementById('timer').innerHTML = `Timer: ${time}`
    if (time >= 15) {
        reEveryThing();
    }
    // console.log({time});
    

    // ☝ time ;  👇 draw

    strokeWeight(13);
    stroke(0);

    if (mouseIsPressed) {
        line(pmouseX, pmouseY,mouseX, mouseY);
    }
}



function reEveryThing() {
    then = Date.now();
    time = Math.round((now - then) / 1000);

    clearCanvas();

    randInt = Math.floor(Math.random() * items.length);
    console.log(items[randInt]);

    document.getElementById('skecthToDraw').innerHTML = `Sketch to be drawn: ${items[randInt]}`;
}
// function setup() {
//     canv = createCanvas(400,400);
//     console.log(canv);
//     document.getElementById('canvHolder').append(canv.elt);
//     background('white');

    
//     // canv.mouseReleased(classifyCanvas);
    

//     synth = window.speechSynthesis;
// }