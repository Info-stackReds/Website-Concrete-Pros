/**
 * Concrete Pros IL — Website Image Generator
 * Uses OpenAI DALL-E 3 to generate all website photos.
 *
 * SETUP (run these commands in Terminal):
 * ───────────────────────────────────────
 *   cd ~/Desktop/Concretepros\ orignal
 *   npm install
 *   export OPENAI_API_KEY="sk-proj-your-new-key-here"
 *   node generate-images.js
 *
 * ⚠️  NEVER paste your API key into this file.
 *     Always set it with the export command above.
 *
 * Rules applied:
 *   - Services section has NO images (kept as-is)
 *   - No owner portrait — team aerial shot only
 *   - Every image is specific to its exact service
 *   - Only generates images the website explicitly uses
 *   - Placeholder SVG files (<50KB) are replaced with real photos
 *
 * Cost:  ~$0.08 per HD image × 25 images ≈ $2.00 total
 * Time:  ~7 minutes (15s rate-limit gap between each)
 */

import OpenAI from "openai";
import fs from "fs";
import path from "path";
import https from "https";

// ── API KEY — from environment variable only, never hardcoded ────────────────
const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  console.error("\n  OPENAI_API_KEY is not set. Run this first:\n");
  console.error('  export OPENAI_API_KEY="sk-proj-your-key-here"\n');
  process.exit(1);
}

const client = new OpenAI({ apiKey });

// ── OUTPUT FOLDER ─────────────────────────────────────────────────────────────
const IMAGE_DIR = path.join(process.cwd(), "images");
if (!fs.existsSync(IMAGE_DIR)) {
  fs.mkdirSync(IMAGE_DIR, { recursive: true });
}

// ── HELPERS ───────────────────────────────────────────────────────────────────
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);
    https.get(url, (res) => {
      res.pipe(file);
      file.on("finish", () => { file.close(); resolve(); });
    }).on("error", (err) => {
      fs.unlink(destPath, () => {});
      reject(err);
    });
  });
}

// ── IMAGE DEFINITIONS ─────────────────────────────────────────────────────────
//
// SKIPPED intentionally:
//   about-photo.jpg — no owner portrait requested; team aerial used instead
//
// size options: "1792x1024" (wide/landscape) | "1024x1024" (square)
// quality: "hd" — sharpest, best for professional photography
// style: "natural" — photo-realistic (not illustrated or dramatic)
// skip logic: files >50KB are treated as real images and skipped on re-runs

const IMAGES = [

  // ── HERO ──────────────────────────────────────────────────────────────────
  {
    filename: "hero-concrete.jpg",
    size: "1792x1024",
    quality: "hd",
    style: "natural",
    prompt: `Ultra-realistic professional DSLR photograph of a freshly completed residential concrete driveway and front walkway in an Illinois suburb. The concrete is smooth light gray with a clean broom-finish texture. The wide driveway leads from the street to a beautiful two-car attached garage. A separate front walkway branches to the front door. Crisp straight edges, perfect expansion joints. Green manicured lawn on both sides. Tall mature oak trees line the street. Bright summer afternoon sunlight casting warm shadows. Blue sky with scattered white clouds. No people. Cinematic wide-angle shot, architectural photography quality, ultra-sharp, photorealistic.`,
  },

  // ── COMPANY / TEAM ─────────────────────────────────────────────────────────
  {
    filename: "team1.jpg",
    size: "1792x1024",
    quality: "hd",
    style: "natural",
    prompt: `Aerial drone photograph taken from directly above at a high angle showing a team of 10 professional concrete contractors arranged in a tight group formation outside a commercial building. The building facade has a large bold sign clearly reading "CONCRETE PROS IL" in capital letters. Workers wear matching charcoal gray company t-shirts and tan work boots. The team is standing on a large freshly-poured concrete commercial slab. The surrounding area shows a professional business setting with a parking lot, green landscaping, and Illinois suburban buildings in the background. Crystal clear blue sky. Professional drone photography, ultra-realistic, photojournalistic quality. No text overlays or watermarks.`,
  },

  // ── DRIVEWAYS ─────────────────────────────────────────────────────────────
  {
    filename: "driveway1.jpg",
    size: "1792x1024",
    quality: "hd",
    style: "natural",
    prompt: `Ultra-realistic professional DSLR photograph of a brand-new residential concrete driveway just completed. Light gray concrete with a standard broom texture finish, showing the parallel broom lines clearly. The driveway leads from the curb to a two-car attached garage of a two-story suburban home. Crisp straight edges, expansion joints perfectly spaced. Green lawn on both sides. Bright Illinois summer day, blue sky. Wide shot showing the entire driveway from street to garage. No people. Architectural photography quality.`,
  },
  {
    filename: "stamped-driveway.jpg",
    size: "1792x1024",
    quality: "hd",
    style: "natural",
    prompt: `Ultra-realistic professional photograph of a decorative stamped concrete driveway at an upscale suburban home. The concrete is stamped in a cobblestone pattern with a deep charcoal gray base color and dark brown/black accent stain in the grout lines. The stamped pattern is sharp and consistent across the entire driveway surface. The driveway leads from the street straight to a two-car garage. Perfectly executed, no flaws. Manicured lawn, blue sky, afternoon sun. DSLR architectural photography, wide angle shot, no people.`,
  },

  // ── PATIOS ────────────────────────────────────────────────────────────────
  {
    filename: "patio1.jpg",
    size: "1792x1024",
    quality: "hd",
    style: "natural",
    prompt: `Professional architectural photograph of a newly completed plain broom-finish concrete patio behind a suburban home. The patio is light gray concrete with a clean uniform broom texture. Perfectly square edges with a rounded border. Control joints are straight and evenly spaced. The patio is adjacent to sliding glass patio doors. Green grass surrounding three sides. Clear blue sky, bright natural daylight. Wide angle perspective showing the full patio. No furniture, no people. Photorealistic.`,
  },
  {
    filename: "stamped1.jpg",
    size: "1792x1024",
    quality: "hd",
    style: "natural",
    prompt: `High-end professional DSLR photograph of a luxury stamped concrete patio in a residential backyard. The stamped pattern is Ashlar slate — large irregular rectangular slate shapes pressed into the concrete. Color is warm buff/sandstone with a medium brown accent stain enhancing the grout lines between stones. The patio is spacious, approximately 400 square feet. Surrounded by mature landscaping with green shrubs. Afternoon golden light casting subtle shadows that emphasize the stamped texture. No people. Architectural photography, ultra-realistic.`,
  },

  // ── SITTING WALL ──────────────────────────────────────────────────────────
  {
    filename: "wall1.jpg",
    size: "1792x1024",
    quality: "hd",
    style: "natural",
    prompt: `Professional photograph of a poured concrete sitting wall along the edge of a concrete patio at a residential home. The wall is formed smooth concrete, approximately 18 inches tall and 12 inches wide — built to be sat on. The concrete is light gray, slightly textured. The wall runs the full length of the patio edge, clearly defining the outdoor space. Green planted garden bed on the outer side of the wall. Connected to a concrete patio on the interior side. Natural daylight, sharp detail, no people. Architectural photography style.`,
  },

  // ── GARAGE / SLAB ─────────────────────────────────────────────────────────
  {
    filename: "slab1.jpg",
    size: "1792x1024",
    quality: "hd",
    style: "natural",
    prompt: `Professional interior photograph of a brand-new concrete garage floor inside a two-car residential garage. The floor is smooth steel-trowel finished light gray concrete, perfectly flat and level. Two straight control joint lines run across the floor. The concrete surface has a subtle sheen. The garage door is open showing the driveway and sunlit exterior beyond. Clean walls, standard residential garage interior. No vehicles, no clutter. Bright natural and artificial lighting. DSLR photography quality, ultra-realistic.`,
  },

  // ── CONSTRUCTION / PROCESS ───────────────────────────────────────────────
  {
    filename: "construction1.jpg",
    size: "1792x1024",
    quality: "hd",
    style: "natural",
    prompt: `Action photograph of professional concrete contractors actively working on a residential driveway pour. One worker is using a long screed board to level fresh wet concrete while another uses a bull float behind him. Both wear work boots, jeans, and t-shirts. Fresh gray concrete is being poured from a concrete chute visible at the edge of the frame. Wooden form boards line the edges of the driveway area. Suburban home visible in background. Bright summer Illinois day. Photojournalistic quality, sharp focus on the work action, realistic.`,
  },

  // ── HOUSE / LOCATION ─────────────────────────────────────────────────────
  {
    filename: "house1.jpg",
    size: "1792x1024",
    quality: "hd",
    style: "natural",
    prompt: `Professional real estate exterior photograph of a beautiful two-story suburban home with brand-new concrete work visible. A fresh concrete driveway leads from the street to the garage. A new concrete front entry walkway connects the driveway to the front door. Both the driveway and walkway are light gray broom-finish concrete, clearly just installed. Traditional American colonial-style home, brick and vinyl siding, attached two-car garage. Manicured green lawn, mature trees, blue sky. No people. Wide establishing shot.`,
  },

  // ── GALLERY ──────────────────────────────────────────────────────────────
  {
    filename: "gallery1.jpg",
    size: "1024x1024",
    quality: "hd",
    style: "natural",
    prompt: `Close-up professional photograph of a freshly completed concrete driveway broom finish texture. The parallel broom lines are crisp and uniform across the gray concrete surface. The photo shows a corner section where the driveway meets the sidewalk, with a clean formed edge. Perfect expansion joint visible. Taken from a low angle to emphasize the texture. Bright sunlight, sharp focus. Square composition, photorealistic.`,
  },
  {
    filename: "gallery2.jpg",
    size: "1024x1024",
    quality: "hd",
    style: "natural",
    prompt: `Overhead close-up photograph looking straight down at a stamped concrete patio surface. The pattern is a large flagstone design with irregular natural stone shapes. The color is warm gray with charcoal accent stain in the joints. The stamped texture is highly realistic, mimicking actual stone. Bright even lighting from above. Square composition, professional photography, ultra-realistic texture detail.`,
  },
  {
    filename: "gallery3.jpg",
    size: "1024x1024",
    quality: "hd",
    style: "natural",
    prompt: `Professional photograph of a new concrete front walkway leading from a suburban home's front door down to the driveway. The walkway is broom-finish gray concrete, approximately 4 feet wide. Clean straight edges, rounded corners. Small mulched flower beds with shrubs on each side of the walkway. Concrete steps at the front door. Bright summer day, Illinois residential neighborhood. Square format, architectural photography, no people.`,
  },
  {
    filename: "gallery4.jpg",
    size: "1024x1024",
    quality: "hd",
    style: "natural",
    prompt: `Close-up macro DSLR photograph of exposed aggregate concrete surface. Small smooth river rocks and pea gravel aggregate in various earth tones are embedded in the gray cement matrix. A wet-look sealer has been applied giving the surface a rich glossy sheen that makes the aggregate colors pop. Extreme surface detail visible. Natural daylight. Square composition, photorealistic, ultra-sharp.`,
  },
  {
    filename: "gallery5.jpg",
    size: "1024x1024",
    quality: "hd",
    style: "natural",
    prompt: `Professional photograph of a completed concrete pad project — a large square concrete shed pad or equipment pad in a residential backyard. The concrete is smooth broom-finish light gray with chamfered edges on all four sides. Control joints divide the pad into four equal sections. Perfectly level surface. Green grass surrounds the pad. Clear blue sky background. Square format, architectural photography, no people, no shed or structure on the pad yet.`,
  },

  // ── BLOG POST HEROES ──────────────────────────────────────────────────────
  {
    filename: "blog-replace-driveway.jpg",
    size: "1792x1024",
    quality: "hd",
    style: "natural",
    prompt: `Professional photograph of a severely deteriorated residential concrete driveway in an Illinois suburb that urgently needs replacement. The concrete shows extreme damage: large deep cracks running the full width of the driveway, multiple spalled sections where the surface has crumbled off revealing coarse aggregate below, sunken panels from freeze-thaw heaving, and crumbling edges. The damage is clearly beyond repair — this is end-of-life concrete. A traditional two-story suburban home is visible in the background. The contrast between the damaged driveway and the nice home emphasizes the need for replacement. Overcast daylight, realistic, photojournalistic.`,
  },
  {
    filename: "blog-costs-2026.jpg",
    size: "1792x1024",
    quality: "hd",
    style: "natural",
    prompt: `Professional photograph of a concrete contractor in a branded company t-shirt kneeling on a freshly formed concrete driveway area, reviewing a printed estimate or measurement sheet on a clipboard. The contractor is measuring or marking the area. Wooden form boards outline the driveway footprint on prepared gravel base. A concrete mixer truck is parked at the curb in the background. A suburban Illinois home is visible. Bright summer day. The scene clearly communicates professional pricing and planning for a concrete project. Photojournalistic quality, sharp focus, realistic.`,
  },
  {
    filename: "blog-stamped-vs-pavers.jpg",
    size: "1792x1024",
    quality: "hd",
    style: "natural",
    prompt: `Professional split-scene comparison photograph showing two different patio surfaces side by side. The left half shows a stamped concrete patio with a cobblestone pattern in charcoal gray with dark accent stain — crisp, uniform stamped texture. The right half shows a traditional brick paver patio with individual clay brick pavers in a herringbone pattern, warm red-brown color with sand-filled joints. Both surfaces are photographed from the same overhead angle at the same time of day, allowing direct comparison. The two surfaces meet cleanly in the center of the frame. Bright daylight, professional photography, ultra-realistic.`,
  },
  {
    filename: "blog-seal-concrete.jpg",
    size: "1792x1024",
    quality: "hd",
    style: "natural",
    prompt: `Professional action photograph of a concrete worker applying concrete sealer to a residential driveway. The worker is using a long-handled roller applicator to roll on clear sealer over gray broom-finish concrete. Where the sealer has been applied, the concrete has a slightly darker wet appearance and subtle sheen. The untreated section next to it is lighter matte gray — showing the contrast. The worker wears safety glasses, gloves, jeans, and work boots. Suburban Illinois home visible in background. Bright summer afternoon lighting. Photorealistic, photojournalistic quality.`,
  },
  {
    filename: "blog-why-cracks.jpg",
    size: "1792x1024",
    quality: "hd",
    style: "natural",
    prompt: `Close-up professional photograph of cracked residential concrete showing Illinois freeze-thaw damage. Multiple crack types are visible: a wide map-cracking pattern across the surface, a dominant structural crack running diagonally, and edge spalling where concrete has chipped away at corners. The cracks show clear evidence of water infiltration — slight rust staining and dark moisture lines in the cracks. Some sections show differential heaving where one panel has risen slightly above another. Shot from ground level at a low angle to emphasize the crack depth and damage. Gray overcast sky suggesting cold Illinois weather. Realistic, sharp detail.`,
  },
  {
    filename: "blog-stamped-patterns.jpg",
    size: "1792x1024",
    quality: "hd",
    style: "natural",
    prompt: `Overhead bird's-eye professional photograph looking straight down at four different stamped concrete patio sections arranged in a 2×2 grid pattern, each showing a different popular stamp design: top-left is cobblestone with dark charcoal color, top-right is Ashlar slate in warm buff/sandstone, bottom-left is wood plank pattern in natural brown, bottom-right is random stone flagstone in light gray. Each quadrant shows crisp stamp detail with color variation from accent stain. The four sections are separated by thin expansion joints. Even overhead lighting, no shadows. Professional overhead photography, ultra-sharp texture detail, square composition.`,
  },
  {
    filename: "blog-permits.jpg",
    size: "1792x1024",
    quality: "hd",
    style: "natural",
    prompt: `Professional photograph of a concrete contractor and a homeowner standing together on a residential job site, looking at blueprints or permit paperwork spread on the hood of a white work truck. The contractor is pointing to the plans while explaining something to the homeowner. Both are in a suburban Illinois setting with a home visible behind them. A measuring tape, pencil, and clipboard with papers are on the truck hood. Bright daylight, professional and organized scene conveying trust and compliance with local building codes. Photojournalistic quality, realistic.`,
  },
  {
    filename: "blog-winter-care.jpg",
    size: "1792x1024",
    quality: "hd",
    style: "natural",
    prompt: `Professional winter photograph of a residential concrete driveway in Illinois after a snowstorm. The driveway has been partially shoveled — the left lane is clear showing bare light gray concrete, while the right lane still has snow on it. A snow shovel leans against the garage door. The home has icicles on the eaves and snow on the roof and lawn. Bare leafless trees in the yard. Cold gray winter sky. The concrete in the cleared section looks clean and undamaged. The scene conveys winter concrete care and maintenance in the Midwest. Realistic, photographic quality.`,
  },
  {
    filename: "blog-exposed-aggregate.jpg",
    size: "1792x1024",
    quality: "hd",
    style: "natural",
    prompt: `Close-up professional photograph of exposed aggregate concrete driveway or patio surface. The aggregate is a mix of smooth river stones and pea gravel in earth tones — tan, brown, white, gray, and rust. The cement matrix has been washed away exposing the top layer of stones which protrude slightly. A fresh coat of wet-look sealer has been applied making the stones glisten with a rich glossy finish. The texture is both decorative and slip-resistant. Shot from a low angle to show the three-dimensional texture of the stones. Bright afternoon sunlight making the sealed aggregate sparkle. Ultra-realistic macro photography detail.`,
  },
  {
    filename: "blog-longevity.jpg",
    size: "1792x1024",
    quality: "hd",
    style: "natural",
    prompt: `Professional photograph of a beautifully preserved residential concrete driveway that appears to be 20+ years old but still in excellent condition. The concrete is medium gray with a slightly weathered but perfectly intact broom-finish surface. No major cracks, no spalling, clean straight edges. A well-maintained two-story traditional suburban Illinois home is in the background with mature landscaping, large oak trees, and lush green lawn. The scene communicates the longevity and durability of quality concrete work — the driveway looks solid and still has many years of life. Warm afternoon light. Architectural photography quality, no people.`,
  },
];

// ── MAIN ──────────────────────────────────────────────────────────────────────
async function generateImage(img, index, total) {
  const destPath = path.join(IMAGE_DIR, img.filename);

  if (fs.existsSync(destPath)) {
    const stats = fs.statSync(destPath);
    if (stats.size > 50_000) {
      // Real image (>50KB) — skip to avoid regenerating
      console.log(`  SKIP  ${img.filename} — real image already exists (${Math.round(stats.size / 1024)}KB)`);
      return;
    }
    // Placeholder SVG or tiny stub (<50KB) — replace with real photo
    console.log(`  REPLACE  ${img.filename} — placeholder detected (${stats.size}B), generating real image`);
  }

  console.log(`\n[${index + 1}/${total}] Generating: ${img.filename}`);
  console.log(`        Size: ${img.size} | Quality: ${img.quality} | Style: ${img.style}`);

  try {
    const response = await client.images.generate({
      model: "dall-e-3",
      prompt: img.prompt,
      n: 1,
      size: img.size,
      quality: img.quality,
      style: img.style,
      response_format: "url",
    });

    const imageUrl = response.data[0].url;

    process.stdout.write(`        Downloading...`);
    await downloadFile(imageUrl, destPath);
    console.log(` saved -> images/${img.filename}`);

  } catch (err) {
    if (err?.status === 429) {
      console.error(`\n  Rate limited. Waiting 60 seconds...`);
      await delay(60_000);
      return generateImage(img, index, total);
    }
    if (err?.status === 400) {
      console.error(`\n  Content policy block on ${img.filename}: ${err.message}`);
    } else {
      console.error(`\n  Error on ${img.filename}:`, err.message);
    }
  }
}

async function main() {
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("  Concrete Pros IL — DALL-E 3 Image Generator");
  console.log(`  Generating up to ${IMAGES.length} images into images/`);
  console.log(`  Estimated cost:  ~$${(IMAGES.length * 0.08).toFixed(2)} (skips real images already on disk)`);
  console.log(`  Estimated time:  ~${Math.ceil((IMAGES.length * 15) / 60)} minutes`);
  console.log("  Note: about-photo.jpg is not generated (no owner portrait needed)");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

  for (let i = 0; i < IMAGES.length; i++) {
    await generateImage(IMAGES[i], i, IMAGES.length);

    if (i < IMAGES.length - 1) {
      const wait = 15;
      process.stdout.write(`\n  Waiting ${wait}s (rate limit)...`);
      await delay(wait * 1000);
      process.stdout.write(" continuing.\n");
    }
  }

  console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("  Done! All images saved to images/");
  console.log("  Open index.html in your browser to preview the site.");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
}

main().catch((err) => {
  console.error("\n  Fatal error:", err.message);
  process.exit(1);
});
