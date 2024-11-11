const moodGradient = {
    'Intense': ['#F82828', '#000000', '#44001A'],
    'Calm': ['#F09F9C', '#ACD7D8', '#5E4C83'],
    'Melancholic': ['#BEAECF', '#557E85' ],
    'Warm': ['#9B2948', '#5098B3', '#F28F3D'],
    'Somber': ['#856B72', '#A39574', '#979FAB']
};

const atmosphereTexture = {
    'Edgy': {
        noiseLevel: 0.5,
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

function setMood(mood){
    selectedMood = mood;
    renderAlbumCover();
}

function setAtmosphere(atmosphere){
    selectedAtmosphere = atmosphere;
    renderAlbumCover();
}

function renderAlbumCover() {
    const canvas = document.getElementById('albumCanvas');
    const ctx = canvas.getContext('2d');
  
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    if (selectedMood && moodGradient[selectedMood]) {
      const colors = moodGradient[selectedMood];
      const gradient1 = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      colors.forEach((color, index) => {
        gradient1.addColorStop(index / (colors.length - 1), color);
      });
      ctx.fillStyle = gradient1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
  
      const x0 = Math.random() * canvas.width;
      const y0 = Math.random() * canvas.height;
      const x1 = Math.random() * canvas.width;
      const y1 = Math.random() * canvas.height;
      const gradient2 = ctx.createLinearGradient(x0, y0, x1, y1);
      colors.reverse().forEach((color, index) => {
        gradient2.addColorStop(index / (colors.length - 1), color);
      });
  
      ctx.globalAlpha = 0.5;
      ctx.fillStyle = gradient2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 1.0;
    }
  
    if (selectedAtmosphere && atmosphereTexture[selectedAtmosphere]) {
      const texture = atmosphereTexture[selectedAtmosphere];
      applyTextureEffect(ctx, texture);
    }
}
  
  

function applyTextureEffect(ctx, texture) {
  if (texture.blur) {
    ctx.filter = `blur(${texture.blur}px)`;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.filter = 'none';
  }

  if (texture.gradientOpacity) {
    ctx.globalAlpha = texture.gradientOpacity;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.globalAlpha = 1.0;
  }

  if (texture.vignetteIntensity) {
    const vignette = ctx.createRadialGradient(
      ctx.canvas.width / 2, ctx.canvas.height / 2, ctx.canvas.width / 4,
      ctx.canvas.width / 2, ctx.canvas.height / 2, ctx.canvas.width / 1.5
    );
    vignette.addColorStop(0, 'rgba(0, 0, 0, 0)');
    vignette.addColorStop(1, `rgba(0, 0, 0, ${texture.vignetteIntensity})`);
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
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