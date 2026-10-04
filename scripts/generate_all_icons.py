import os
import math
from PIL import Image

BRAIN_DIR = r"C:\Users\john\.gemini\antigravity-ide\brain\786398fd-b858-4135-8d7a-f3f038254cc6"
PROJECT_DIR = r"c:\Users\john\Documents\Projetos\latimDiario"
ASSETS_DIR = os.path.join(PROJECT_DIR, "assets", "images")

ICON_FULLBLEED_PATH = os.path.join(BRAIN_DIR, "latim_diario_icon_fullbleed_1791151379480.jpg")
EMBLEM_ISOLATED_PATH = os.path.join(BRAIN_DIR, "latim_emblem_isolated_1791151404091.jpg")
MARBLE_BG_PATH = os.path.join(BRAIN_DIR, "latim_marble_bg_1791151514911.jpg")

print("Processing Latim Diário assets...")

# 1. Generate icon.png (1024x1024)
img_fullbleed = Image.open(ICON_FULLBLEED_PATH).convert("RGBA")
icon_1024 = img_fullbleed.resize((1024, 1024), Image.Resampling.LANCZOS)
icon_1024.save(os.path.join(ASSETS_DIR, "icon.png"), "PNG", optimize=True)
print("Saved: icon.png (1024x1024)")

# Also save play-store-icon.png (512x512) for Google Play Console listing
icon_512 = img_fullbleed.resize((512, 512), Image.Resampling.LANCZOS)
icon_512.save(os.path.join(ASSETS_DIR, "play-store-icon.png"), "PNG", optimize=True)
print("Saved: play-store-icon.png (512x512)")

# 2. Generate android-icon-background.png (1024x1024)
img_marble = Image.open(MARBLE_BG_PATH).convert("RGBA")
marble_1024 = img_marble.resize((1024, 1024), Image.Resampling.LANCZOS)
marble_1024.save(os.path.join(ASSETS_DIR, "android-icon-background.png"), "PNG", optimize=True)
print("Saved: android-icon-background.png (1024x1024)")

# 3. Extract transparent emblem from isolated black background
img_emblem = Image.open(EMBLEM_ISOLATED_PATH).convert("RGB")
w, h = img_emblem.size
pixels = img_emblem.load()

emblem_rgba = Image.new("RGBA", (w, h), (0, 0, 0, 0))
emblem_pixels = emblem_rgba.load()

LOW_THRESH = 10
HIGH_THRESH = 40

for y in range(h):
    for x in range(w):
        r, g, b = pixels[x, y]
        lum = max(r, g, b)
        if lum <= LOW_THRESH:
            emblem_pixels[x, y] = (0, 0, 0, 0)
        else:
            if lum >= HIGH_THRESH:
                alpha = 255
            else:
                alpha = int(((lum - LOW_THRESH) / (HIGH_THRESH - LOW_THRESH)) * 255)
            
            # Un-premultiply to remove black fringing
            factor = alpha / 255.0
            r_un = min(255, int(r / factor))
            g_un = min(255, int(g / factor))
            b_un = min(255, int(b / factor))
            emblem_pixels[x, y] = (r_un, g_un, b_un, alpha)

# Bounding box of the transparent emblem
bbox = emblem_rgba.getbbox()
cropped_emblem = emblem_rgba.crop(bbox)
crop_w, crop_h = cropped_emblem.size
print(f"Emblem trimmed size: {crop_w}x{crop_h}")

# 4. Generate android-icon-foreground.png (1024x1024)
# Android safe zone diameter is 660px (~64%). We scale the emblem to fit comfortably within 580px
TARGET_DIAMETER = 580
scale = TARGET_DIAMETER / max(crop_w, crop_h)
new_w = int(crop_w * scale)
new_h = int(crop_h * scale)
scaled_emblem = cropped_emblem.resize((new_w, new_h), Image.Resampling.LANCZOS)

foreground_1024 = Image.new("RGBA", (1024, 1024), (0, 0, 0, 0))
offset_x = (1024 - new_w) // 2
offset_y = (1024 - new_h) // 2
foreground_1024.paste(scaled_emblem, (offset_x, offset_y), scaled_emblem)
foreground_1024.save(os.path.join(ASSETS_DIR, "android-icon-foreground.png"), "PNG", optimize=True)
print("Saved: android-icon-foreground.png (1024x1024)")

# 5. Generate android-icon-monochrome.png (1024x1024)
# Material You themed icons expect pure white icon on transparent
monochrome_1024 = Image.new("RGBA", (1024, 1024), (0, 0, 0, 0))
mono_pixels = monochrome_1024.load()
fg_pixels = foreground_1024.load()

for y in range(1024):
    for x in range(1024):
        _, _, _, a = fg_pixels[x, y]
        if a > 0:
            mono_pixels[x, y] = (255, 255, 255, a)

monochrome_1024.save(os.path.join(ASSETS_DIR, "android-icon-monochrome.png"), "PNG", optimize=True)
print("Saved: android-icon-monochrome.png (1024x1024)")

# 6. Generate splash-icon.png (1024x1024)
# Centered emblem for splash screen with generous margins
SPLASH_TARGET = 620
splash_scale = SPLASH_TARGET / max(crop_w, crop_h)
splash_w = int(crop_w * splash_scale)
splash_h = int(crop_h * splash_scale)
splash_emblem = cropped_emblem.resize((splash_w, splash_h), Image.Resampling.LANCZOS)

splash_1024 = Image.new("RGBA", (1024, 1024), (0, 0, 0, 0))
sp_offset_x = (1024 - splash_w) // 2
sp_offset_y = (1024 - splash_h) // 2
splash_1024.paste(splash_emblem, (sp_offset_x, sp_offset_y), splash_emblem)
splash_1024.save(os.path.join(ASSETS_DIR, "splash-icon.png"), "PNG", optimize=True)
print("Saved: splash-icon.png (1024x1024)")

# 7. Generate favicon.png (48x48)
favicon_48 = icon_1024.resize((48, 48), Image.Resampling.LANCZOS)
favicon_48.save(os.path.join(ASSETS_DIR, "favicon.png"), "PNG", optimize=True)
print("Saved: favicon.png (48x48)")

print("All icons successfully generated and saved!")
