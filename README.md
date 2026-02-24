# linePDF

Lector de PDF minimalista para Android e iPhone. Sin toolbars, sin scrollbars, sin chrome. Solo el contenido del PDF.

## Funcionalidades

- Pantalla completa edge-to-edge: sin barra de estado, sin barra de navegación Android
- Toca la pantalla para mostrar/ocultar el overlay (volver + número de página)
- El overlay desaparece solo a los 3 segundos
- Librería de PDFs recientes (persistida entre sesiones)
- Mantén presionado un PDF en la librería para eliminarlo

## Requisitos

- Node.js 18+
- Cuenta en [expo.dev](https://expo.dev) (gratis)
- Para Android: cualquier dispositivo físico o Android Studio
- Para iOS: Mac con Xcode (simulador) o Apple Developer Program ($99/año) para dispositivo físico

## Setup inicial

```bash
npm install
npm install -g eas-cli
eas login
eas init
```

## Probar en Android (dispositivo físico)

### Opción A — EAS Build (recomendado, sin necesidad de Android Studio)

```bash
# Genera el APK de desarrollo en la nube (~10-15 min la primera vez)
eas build --profile development --platform android

# Escanea el QR que aparece para instalar el APK en tu celular
# Luego, con el APK instalado, arranca el servidor:
npx expo start --dev-client
```

### Opción B — Build local (necesita Android Studio instalado)

```bash
npx expo run:android
```

Después del build inicial, los cambios en JS se reflejan instantáneamente con hot reload — no hay que rebuildar.

## Probar en iOS (simulador, requiere Mac)

```bash
npx expo run:ios
```

## Estructura del proyecto

```
app/
  _layout.tsx       # Layout raíz: sin header, orientación portrait
  index.tsx         # Pantalla librería
  reader.tsx        # Pantalla lectora full-screen
components/
  PDFViewer.tsx     # Wrapper del PDF
  ReaderOverlay.tsx # Overlay animado (back + página)
  LibraryCard.tsx   # Card de la librería
hooks/
  useSystemBars.ts  # Oculta status bar + nav bar Android
  useOverlay.ts     # Toggle overlay con auto-hide
  useLibrary.ts     # Persistencia con AsyncStorage
utils/
  fileStorage.ts    # Copia PDFs a almacenamiento permanente
```

## Nota sobre New Architecture

El proyecto tiene `"newArchEnabled": true` (default de SDK 54). Si `react-native-pdf` no renderiza correctamente, agregá esto en `app.json` bajo `"android"`:

```json
"newArchEnabled": false
```
