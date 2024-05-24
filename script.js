document.getElementById('generate').addEventListener('click', generateColors);

function generateColors() {
    const baseColor = document.getElementById('base-color').value;
    const exponent = parseFloat(document.getElementById('exponent').value);
    const numColors = parseInt(document.getElementById('num-colors').value);
    const colorMode = document.getElementById('color-mode').value;
    
    console.log('Base color:', baseColor);
    console.log('Exponent:', exponent);
    console.log('Number of colors:', numColors);
    console.log('Color mode:', colorMode);
    
    const colorContainer = document.getElementById('color-container');
    colorContainer.innerHTML = ''; // Clear previous colors

    const base = chroma(baseColor);
    
    for (let i = 0; i < numColors; i++) {
        const factor = i / (numColors - 1); // Normalize to range [0, 1]
        let color;
        if (colorMode === 'hsl') {
            const lightness = -(Math.pow(factor, exponent)) + 1; // Apply the inversion
            color = base.set('hsl.l', lightness);
        } else if (colorMode === 'hcl') {
            const lightness = -(Math.pow(factor, exponent)) + 1; // Apply the inversion
            const hclBase = chroma(base).hcl(); // Convert the base color to HCL
            // Adjust lightness
            hclBase[2] = lightness * 100; // Lightness is in the range [0, 100]
            color = chroma(hclBase, 'hcl'); // Convert back to hex for display
        }
        
        const colorString = color.hex();
        console.log(`Color ${i}:`, colorString);
        
        const colorBox = document.createElement('div');
        colorBox.className = 'color-box';
        colorBox.style.backgroundColor = colorString;
        
        colorContainer.appendChild(colorBox);
    }
}
