declare module "*.css";
declare module "*.svg";
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";

declare module "@designcodeio/threeui/components/LandscapeScene" {
  export const LANDSCAPE_VARIANTS: readonly [
    "sunrise",
    "noon",
    "sunset",
    "night",
    "rain",
    "storm",
    "snow",
  ];
  export type LandscapeVariant = (typeof LANDSCAPE_VARIANTS)[number];

  export type LandscapeSceneProps = {
    className?: string;
    sourceUrl?: string;
    variant?: LandscapeVariant;
  };

  export function LandscapeScene(props: LandscapeSceneProps): JSX.Element;
}
