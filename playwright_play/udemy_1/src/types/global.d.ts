declare module '*.avif' {
  const src: string;
  export default src;
}

declare module '*.bmp' {
  const src: string;
  export default src;
}

declare module '*.gif' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.webp' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  const src: string;
  export default src;
}

declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.sass' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

// for vite-imagetools plugin
interface OutputMetadata {
  src: string; // URL of the generated image
  width: number; // Width of the image
  height: number; // Height of the image
  format: string; // Format of the generated image

  // The following options are the same as sharps input options
  space: string; // Name of colour space interpretation
  channels: number; // Number of bands e.g. 3 for sRGB, 4 for CMYK
  density: number; //  Number of pixels per inch
  depth: string; // Name of pixel depth format
  hasAlpha: boolean; // presence of an alpha transparency channel
  hasProfile: boolean; // presence of an embedded ICC profile
  isProgressive: boolean; // indicating whether the image is interlaced using a progressive scan
}

declare module '*&as=metadata&imagetools-gallery' {
  const outputs: Array<OutputMetadata>;
  export default outputs;
}

declare module '*&as=metadata&imagetools' {
  const outputs: OutputMetadata;
  export default outputs;
}

declare module '*&imagetools-gallery' {
  const outputs: Array<string>;
  export default outputs;
}

declare module '*&imagetools' {
  const outputs: string;
  export default outputs;
}
