vm: template-vm

## Running inside the VM

Install dependencies and start the Vite development server (port 5173):

    npm install
    npm run dev -- --host 0.0.0.0 &
    # ready when http://localhost:5173/gtd/ responds 200

## Notes

- The app is an offline-first GTD task manager using IndexedDB (Dexie.js).
- No authentication or login is required.
- The web app is served at `http://localhost:5173/gtd/`.
