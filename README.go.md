# NinitArch

A lightweight Ninite-like application for Arch Linux, now powered by Go and Web Components.

## Overview

This project has been migrated from Next.js to a simple Go backend with vanilla JavaScript and Web Components. The new architecture is much lighter and easier to maintain.

## Architecture

- **Backend**: Go HTTP server with embedded static files
- **Frontend**: Vanilla JavaScript with Web Components
- **No frameworks**: No React, no Next.js, no build tools needed

## Features

- Select multiple apps from categorized lists
- Choose your preferred AUR helper (paru, yay, pamac)
- Get installation command with all selected packages
- Responsive design
- Fast and lightweight

## Project Structure

```
├── main.go              # Go HTTP server
├── data/                # JSON files with app data
│   ├── Essentials.json
│   ├── Development.json
│   ├── Terminal.json
│   ├── Gaming.json
│   └── Games.json
├── static/              # Frontend files (embedded in binary)
│   ├── index.html
│   ├── app.js
│   ├── components.js    # Web Components definitions
│   └── styles.css
└── public/              # Static assets (icons, favicons)
    └── Assets/
        └── Apps/        # App icons
```

## Running the Application

### Development

```bash
go run main.go
```

### Production Build

```bash
go build -o ninitarch
./ninitarch
```

The server will start on `http://localhost:8080` by default. You can change the port by setting the `PORT` environment variable:

```bash
PORT=3000 ./ninitarch
```

## Web Components

The application uses custom web components for UI elements:

- `<app-item>` - Individual app checkbox with icon
- `<app-list>` - List of apps in a subcategory
- `<apps-container>` - Container for a main category
- `<terminal-display>` - Terminal showing the install command

All components are defined in `static/components.js` and use Shadow DOM for encapsulation.

## Adding New Apps

To add new apps, edit the appropriate JSON file in the `data/` directory:

```json
{
  "Category Name": [
    {
      "name": "App Name",
      "package": "package-name",
      "image": "Category/icon.png"
    }
  ]
}
```

Then add the corresponding icon to `public/Assets/Apps/Category/`.

## License

See LICENSE file for details.
