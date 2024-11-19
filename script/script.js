const moodGradient = {
    'Intense': ['#F82828', '#000000', '#44001A'],
    'Calm': ['#F09F9C', '#ACD7D8', '#5E4C83'],
    'Melancholic': ['#BEAECF', '#557E85' ],
    'Warm': ['#9B2948', '#5098B3', '#F28F3D'],
    'Somber': ['#856B72', '#A39574', '#979FAB']
};

const atmosphereTexture = {
    'Edgy': {
        noiseLevel: 0.2,
        contrast: 1.5, 
        lineDensity: 0.3
    },
    'Dreamy': {
        blur: 0.6,
        gradientOpacity: 0.4,
        vignetteIntensity: 0.2
    },
    'Ethereal': {
        blur: 0.3,
        gradientOpacity: 0.5,
        glow: true 
    },
    'Soft': {
        blur: 0.4, 
        dotPatternOpacity: 0.1,
        gradientOpacity: 0.3
    },
    'Melancholic': {
        grainOpacity: 0.4, 
        desaturation: 0.5,
        vignetteIntensity: 0.3
    },
    'Desolate': {
        grainOpacity: 0.6,
        desaturation: 0.7,
        vignetteIntensity: 0.5
    },
}

let selectedMood = null;
let selectedAtmosphere =  null;
let selectedInstrument = null;

function setMood(mood){
    selectedMood = mood;
    renderAlbumCover();
}

function setAtmosphere(atmosphere){
    selectedAtmosphere = atmosphere;
    renderAlbumCover();
}

function setInstrument(instrument){
    selectedInstrument = instrument;
    renderAlbumCover();
}

function renderAlbumCover() {
    const canvas = document.getElementById('albumCanvas');
    const ctx = canvas.getContext('2d');
  
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    if (selectedMood && moodGradient[selectedMood]) {
      const colors = moodGradient[selectedMood];
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  
      colors.forEach(color => {
        const randomStop = Math.random();
        gradient.addColorStop(randomStop, color);
      });
  
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    if (selectedAtmosphere && atmosphereTexture[selectedAtmosphere]) {
      applyAtmosphereEffect(ctx, selectedAtmosphere);
    }

    if (selectedInstrument) {
      applyInstrumentFlare(ctx, selectedInstrument);
    }
  }
  
  function applyAtmosphereEffect(ctx, atmosphere) {
    const canvas = ctx.canvas;
  
    switch (atmosphere) {
      case 'Dreamy':
        applySoftBlobs(ctx);
        applyVignette(ctx, 0.2);
        break;
  
      case 'Edgy':
        applyNoiseTexture(ctx, 0.6);
        applyHighContrast(ctx);
        applyAngularLines(ctx);
        break;
  
      case 'Ethereal':
        applyGlow(ctx, 0.5);
        applyVignette(ctx, 0.1);
        break;
  
      case 'Desolate':
        applyGrainyTexture(ctx, 0.4);
        applyFadedShapes(ctx);
        break;
    }
  }

//   Acknowledgement: ChatGPT and StackOverflow helped me fix/refine the for loop code

  function applySoftBlobs(ctx) {
    const canvas = ctx.canvas;
    for (let i = 0; i < 10; i++) {
      const radius = Math.random() * 100 + 50;
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.15 + 0.05})`;
      ctx.fill();
    }
  }
  
  function applyVignette(ctx, intensity) {
    const canvas = ctx.canvas;
    const vignette = ctx.createRadialGradient(
      canvas.width / 2, canvas.height / 2, canvas.width / 4,
      canvas.width / 2, canvas.height / 2, canvas.width / 1.5
    );
    vignette.addColorStop(0, 'rgba(0, 0, 0, 0)');
    vignette.addColorStop(1, `rgba(0, 0, 0, ${intensity})`);
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  function applyNoiseTexture(ctx, intensity) {
    const canvas = ctx.canvas;
    ctx.globalAlpha = intensity; 
    const noiseFrequency = 4; 
  
    for (let i = 0; i < canvas.width; i += noiseFrequency) {
      for (let j = 0; j < canvas.height; j += noiseFrequency) {
        const randomColor = Math.random() > 0.5 
          ? 'rgba(0, 0, 0, 0.05)' 
          : 'rgba(255, 255, 255, 0.05)'; 
        
        ctx.fillStyle = randomColor;
        ctx.fillRect(i, j, 1, 1);
      }
    }
    ctx.globalAlpha = 1;
  }
  
  function applyHighContrast(ctx) {
    ctx.globalCompositeOperation = 'contrast';
    ctx.filter = 'contrast(1.5)';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.filter = 'none';
    ctx.globalCompositeOperation = 'source-over';
  }
  
  function applyAngularLines(ctx) {
    const canvas = ctx.canvas;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    for (let i = 0; i < 10; i++) {
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvas.width, 0);
      ctx.lineTo(Math.random() * canvas.width, canvas.height);
      ctx.stroke();
    }
  }

  function applySynthFlare(ctx) {
    const canvas = ctx.canvas;
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      for (let j = 0; j < 10; j++) {
        ctx.lineTo(
          Math.random() * canvas.width,
          Math.random() * canvas.height
        );
      }
      ctx.strokeStyle = `hsla(${Math.random() * 360}, 100%, 50%, 0.2)`;
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }

  function applyGuitarFlare(ctx) {
    const canvas = ctx.canvas;
    for (let i = 0; i < 6; i++) {
      const x = canvas.width / 6 * i + canvas.width / 12;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.strokeStyle = `rgba(255, 255, 255, ${Math.random() * 0.3 + 0.2})`;
      ctx.lineWidth = Math.random() * 2 + 1;
      ctx.stroke();
    }
  }

  function applyVocalsFlare(ctx) {
    const canvas = ctx.canvas;
    for (let i = 0; i < 3; i++) {
      const amplitude = Math.random() * 20 + 10;
      const frequency = Math.random() * 0.1 + 0.05;
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x++) {
        const y = canvas.height / 2 + Math.sin(x * frequency + i * Math.PI / 3) * amplitude;
        ctx.lineTo(x, y);
      }
      ctx.strokeStyle = `rgba(255, 255, 255, ${Math.random() * 0.3 + 0.2})`;
      ctx.lineWidth = Math.random() * 1.5 + 0.5;
      ctx.stroke();
    }
  }

  function applyInstrumentFlare(ctx, instrument) {
    switch (instrument) {
      case 'Synth':
        applySynthFlare(ctx);
        break;
      case 'Guitar':
        applyGuitarFlare(ctx);
        break;
      case 'Vocals':
        applyVocalsFlare(ctx);
        break;
    }
  }
  
  

// Google CMS Link

let sheetID = '1-PjmH1LKw73GCiODNG_BGyRT42mrkd21AtGbcdVv5Lc';
let tabName = 'Sheet1';

async function getData(){
    try{
        const myURL = `https://opensheet.elk.sh/${sheetID}/${tabName}`;
        const response = await fetch(myURL);
        const data = await response.json();
            console.log(data);

    } catch{
        console.error(error.message);
    }

} getData()