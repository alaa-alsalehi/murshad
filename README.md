## My React App

A Frappe app with React frontend

### Setup

1. Install the app on your site:
   ```bash
   bench --site <site-name> install-app my_react_app
   ```

2. Install React dependencies (if not already installed):
   ```bash
   cd dashboard && yarn install
   ```

### Development

1. Start the React development server:
   ```bash
   cd dashboard && yarn dev
   ```
   The app will be available at `http://<site-name>:8080/dashboard`

2. Or use the root package.json:
   ```bash
   yarn dev
   ```

### Building for Production

Build the React app for production:
```bash
cd dashboard && yarn build
```

Or from the root:
```bash
yarn build
```

The built files will be placed in `my_react_app/public/dashboard/` and served by Frappe.

### Accessing the React App

After building, the React app will be accessible at:
- `http://<site-name>/dashboard`

### React Frontend Structure

- `dashboard/` - React application directory
  - `src/` - React source files
  - `public/` - Static assets
  - `vite.config.js` - Vite configuration
  - `proxyOptions.js` - Proxy configuration for development

#### License

MIT