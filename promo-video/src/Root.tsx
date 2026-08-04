import {Composition} from 'remotion';
import {
  BRAND_MORPH_OUTRO_DURATION_IN_FRAMES,
  BrandMorphOutroPreview,
} from './promo/BrandMorphOutroPreview';
import {AtomGamePromo} from './promo/AtomGamePromo';
import {
  FULL_GAMEPLAY_DURATION_IN_FRAMES,
  HandheldFullGameplay,
} from './promo/HandheldFullGameplay';
import {
  HANDHELD_PROMO_INSERT_DURATION_IN_FRAMES,
  HandheldPromoInsert,
} from './promo/HandheldPromoInsert';
import {HandheldScreenPreview} from './promo/HandheldScreenPreview';
import {FPS, TOTAL_FRAMES} from './promo/timeline';

export const Root: React.FC = () => (
  <>
    <Composition
      id="AtomGamePromo"
      component={AtomGamePromo}
      durationInFrames={TOTAL_FRAMES}
      fps={FPS}
      width={1920}
      height={1080}
    />
    <Composition
      id="HandheldScreenPreview"
      component={HandheldScreenPreview}
      durationInFrames={7 * FPS}
      fps={FPS}
      width={1920}
      height={1080}
    />
    <Composition
      id="HandheldFullGameplay"
      component={HandheldFullGameplay}
      durationInFrames={FULL_GAMEPLAY_DURATION_IN_FRAMES}
      fps={FPS}
      width={1920}
      height={1080}
    />
    <Composition
      id="HandheldPromoInsert"
      component={HandheldPromoInsert}
      durationInFrames={HANDHELD_PROMO_INSERT_DURATION_IN_FRAMES}
      fps={FPS}
      width={1920}
      height={1080}
    />
    <Composition
      id="BrandMorphOutroPreview"
      component={BrandMorphOutroPreview}
      durationInFrames={BRAND_MORPH_OUTRO_DURATION_IN_FRAMES}
      fps={FPS}
      width={1920}
      height={1080}
    />
  </>
);
