# Player Character Prompt Template

## Template
```
{style_base}

Character: {name}, a {age}-year-old {gender} youth soccer {archetype_label}.
{archetype_visual_traits}

Hair: {hair_style}, {hair_color} hair with lighter highlight streaks.
Eyes: {eye_style} {eye_color} eyes, {expression} expression.
Skin: {skin_tone} complexion.
Face: {face_shape} face shape.
Build: {build_description}

Wearing: {jersey_color} soccer jersey with number {jersey_number}, white collar detail.
{archetype_prompt_accent}

Pose: Upper body portrait, competitive intensity, {pose_detail}.
Background: Dark navy (#020814) with {aura_color} energy aura radiating outward.
Dramatic speed lines and particle effects.

masterpiece, best quality, anime key visual, professional illustration,
dynamic lighting, cinematic composition, cel-shaded, vibrant colors.
```

## Variable Reference

| Variable | Source | Example |
|----------|--------|---------|
| `{style_base}` | style-guide.md base directive | "High-quality anime art..." |
| `{name}` | User input | "Kai Tanaka" |
| `{age}` | User input | "13" |
| `{gender}` | User input | "male" |
| `{archetype_label}` | archetypes.json | "Speedster" |
| `{archetype_visual_traits}` | archetypes.json visual_traits joined | "lean athletic build, windswept hair..." |
| `{hair_style}` | User choice or archetype suggestion | "spiky wild" |
| `{hair_color}` | User choice | "blue" |
| `{eye_style}` | Archetype or user choice | "sharp narrow" |
| `{eye_color}` | User choice | "amber" |
| `{expression}` | Archetype default or user choice | "fierce" |
| `{skin_tone}` | User choice from palette | "medium" |
| `{face_shape}` | User choice | "angular" |
| `{build_description}` | Derived from archetype | "lean and athletic" |
| `{jersey_color}` | User input or club color | "blue" |
| `{jersey_number}` | User input | "10" |
| `{archetype_prompt_accent}` | archetypes.json | "motion blur streaks..." |
| `{pose_detail}` | Archetype-derived | "leaning forward ready to sprint" |
| `{aura_color}` | archetypes.json | "#00d4ff" |

## Example: Completed Prompt
```
High-quality anime art in the style of Blue Lock and Captain Tsubasa.
Clean cel-shaded illustration, vibrant colors, detailed eyes with catchlight reflections.
Upper body portrait, slight 3/4 angle view.
Dark background with dramatic neon accent lighting.
Sports anime aesthetic with intensity and emotion.
Sharp linework, professional manga illustration quality.
No text, no watermark, no signature.

Character: Kai Tanaka, a 13-year-old male youth soccer Speedster.
Lean athletic build, windswept hair, sharp determined eyes, dynamic forward-leaning pose.

Hair: Spiky wild, electric blue hair with lighter cyan highlight streaks.
Eyes: Sharp narrow amber eyes, fierce expression.
Skin: Light tan complexion.
Face: Angular face shape.
Build: Lean and athletic, built for speed.

Wearing: Blue soccer jersey with number 7, white collar detail.
Motion blur streaks, wind effect on hair and jersey.

Pose: Upper body portrait, competitive intensity, leaning forward ready to sprint.
Background: Dark navy (#020814) with cyan (#00d4ff) energy aura radiating outward.
Dramatic speed lines and particle effects.

masterpiece, best quality, anime key visual, professional illustration,
dynamic lighting, cinematic composition, cel-shaded, vibrant colors.
```
