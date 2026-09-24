# DESIGN.md - Kunxiang Textile Independent Storefront

## Design Direction
The visual direction is **"Safe Explorers"**—a blend of B2B industrial reliability and playful, soft aesthetics. The design focuses on high-quality foam textures and safety certifications to reassure North American and European importers, while using a soft, pastel-inclusive palette that reflects the end-user environment (playrooms and nurseries). The layout will use rounded corners and organic shapes to echo the "modular sofa" and "foam block" product forms.

## Reference Sources
- **Merchant Material**: Wuhan Kunxiang Textile Technology Co., Ltd. background and 8 product groups.
- **Visual Baseline**: Soft, rounded nursery-inspired B2B storefront.

## Design Tokens
- **Colors**:
    - `primary`: `#6AB0B8` (Soft Teal - Safety and Trust)
    - `secondary`: `#FFB347` (Warm Amber - Fun and Play)
    - `accent`: `#E87A90` (Dusty Rose - Softness)
    - `background-base`: `#FDFDFB` (Cream White - Clean Nursery vibe)
    - `surface-light`: `#F4F7F6` (Light Mint - Section backgrounds)
    - `text-main`: `#2D3436` (Charcoal - High legibility)
- **Typography**:
    - `font-heading`: `Nunito, sans-serif` (Rounded, friendly, bold for headers)
    - `font-body`: `Inter, sans-serif` (Clean, professional for B2B details)
- **Radius**: `16px` (Consistent soft rounding for all cards and buttons)
- **Spacing**: `8px` grid system with generous `64px-96px` section padding to convey premium space.

## Page Structure
- **Home**:
    - **Hero**: "Modular Play, Mastered." Focus on 15+ years expertise and soft-play versatility.
    - **Trust Bar**: Scrolling marquee of certifications (BSCI, OEKO-TEX, ISO).
    - **Top Categories**: 4-column grid (Modular Sofa, Climber Blocks, Ball Pits, Baby Sofas).
    - **Why Kunxiang**: Feature blocks: "8000+ sqm Factory", "OEM/ODM Specialist", "Shanghai Heritage".
    - **Product Showcase**: "Hot-Selling Sofa Beds" spotlight.
    - **Inquiry CTA**: Full-width section for bulk orders.
- **About Us**: Detailed history (Shanghai 2005 → Wuhan 2022) and production capacity.
- **Certifications**: Dedicated gallery of BSCI/OEKO/ISO/REACH/ROHS certificates.
- **Contact**: Inquiry-focused form for B2B distributors.

## Component Specification
- `Header`: sticky navigation with "Get a Quote" primary CTA.
- `HeroBanner`: split-screen layout with lifestyle image vs. value prop.
- `CategoryCard`: Large image, bold title, "View Collection" link.
- `CertificationWall`: Grid of high-contrast icons for international standards.
- `FeatureItem`: Icon + heading + description for factory strengths.

## Copy Tone
- **Voice**: Authoritative yet nurturing. "We build the blocks for their imagination."
- **Keywords**: Certified Safety, Modular Versatility, OEM/ODM Excellence, Factory-Direct, Sustainable Textiles.

## Image Manifest
| Filename | Source | Usage |
| :--- | :--- | :--- |
| `hero-lifestyle.jpg` | `imageGenerate:Modern minimalist sunlit playroom, kids playing with colorful modular foam blocks, high quality, soft textures, natural lighting` | Main hero background |
| `cat-sofa.jpg` | `https://sc04.alicdn.com/kf/H1a07a9f9713d47bc9247d25b2699c9fet.jpg` | Kids Modular Sofa Card |
| `cat-climber.jpg` | `https://sc04.alicdn.com/kf/H49e69da433e24a2baa5faf648217ac61Z.jpg` | Foam Climber Block Card |
| `cat-ballpit.jpg` | `https://sc04.alicdn.com/kf/H2425833ae7544f818cf41db93d7abddcU.jpg` | Ball Pit Card |
| `cat-babysofa.jpg` | `https://sc04.alicdn.com/kf/H68b1c495ff5045919e0e47b774445a8cg.jpg` | Baby Sofa Card |
| `factory-overview.jpg` | `imageGenerate:Large modern clean textile factory interior, sewing machines, foam cutting area, professional atmosphere, 8k` | About Us section |
| `logo.jpg` | `https://sc01.alicdn.com/kf/H045f9256de92480ead7a6662e77ee1c5B.jpg` | Brand Logo |
