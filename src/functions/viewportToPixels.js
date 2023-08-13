export function vwToPixels(vwValue) {
  const vw = vwValue * 0.01;
  const pixelValue = vw * window.innerWidth;
  return pixelValue;
}

export function vhToPixels(vhValue) {
  const vh = vhValue * 0.01;
  const pixelValue = vh * window.innerHeight;
  return pixelValue;
}
