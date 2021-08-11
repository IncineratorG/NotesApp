const Color = () => {
  const visibleOnBackground = backgroundColorHex => {
    // If a leading # is provided, remove it
    if (backgroundColorHex.slice(0, 1) === '#') {
      backgroundColorHex = backgroundColorHex.slice(1);
    }

    // If a three-character hexcode, make six-character
    if (backgroundColorHex.length === 3) {
      backgroundColorHex = backgroundColorHex
        .split('')
        .map(function (hex) {
          return hex + hex;
        })
        .join('');
    }

    // Convert to RGB value
    const r = parseInt(backgroundColorHex.substr(0, 2), 16);
    const g = parseInt(backgroundColorHex.substr(2, 2), 16);
    const b = parseInt(backgroundColorHex.substr(4, 2), 16);

    // Get YIQ ratio
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;

    // Check contrast
    return yiq >= 128 ? 'black' : 'white';
  };

  return {
    visibleOnBackground,
  };
};

export default Color();
