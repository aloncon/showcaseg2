## Table Of contents
- [How to Create \ Merge branches](./how-to-git-branches.md)
- [List of Git Alias](./list-of-git-alias.md)
- [Showcase Structure - WIP](#showcase-structure-wip)
  - [css](#css)
  - [custom_content](#custom_content)
  - [pages](#pages)
  - [siteadditions](#siteadditions)
  - [system](#system)

---

## Showcase Structure - WIP

```
./src/
├── 📁 common
  ├── 📁 css
  ├── 📄 init.js
├── 📁 custom_content
  ├── 📄 configuration.js
  ├── 📁 assets
    ├── 📁 announcements
      ├── 📁 banners
      ├── 📁 pdf
      ├── 📁 video
    ├── 📁 images
    ├── 📁 pdf
    ├── 📁 video
  ├──📁 modules
  ├──📁 pages
    ├── 📁 landingpage
      ├── 📄 landingpage-default.js
├── 📁 siteadditions
├── 📁 store
├── 📁 system
  ├── 📁 codes
  ├── 📁 resources
  ├── 📁 style
├── 📄 App.js
├── 📄 index.js
```

---

## css

Styling for the showcase (let you overwrite the default CSS that located in `system/style`).

## custom_content

- **configuration.js**

  Showcase configuration (Header, Breadcrumbs, Routes, etc...).


- **assets**

  All showcase assets (Images, Videos, announcements etc...).

- **modules**

  Contains the showcase components settings.

## pages

  Contains the showcase pages.

- **landing-default**

  Contains the landing pages.

## siteadditions

- Provider Center

## system

- **codes**

  Contains the showcase components codes.

- **resources**

  Contains webcollage resources.

- **style**

  Contains the showcase style (CSS, fonts, etc...).