import React, { useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';

interface Props {
  uri: string;
  onLoadComplete: (totalPages: number) => void;
  onPageChanged: (page: number) => void;
  onSingleTap: () => void;
  onError: (error: object) => void;
}

// En web usamos el visor de PDF nativo del browser via <iframe>.
// El overlay de tap se detecta con una franja transparente arriba y abajo
// para no bloquear el scroll del iframe.
export function PDFViewer({ uri, onLoadComplete, onSingleTap }: Props) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // En web no podemos obtener el total de páginas fácilmente desde el iframe.
    // Notificamos 1 para que la librería quede registrada.
    onLoadComplete(1);
  }, [uri, onLoadComplete]);

  return (
    <View style={styles.container}>
      {/* PDF nativo del browser */}
      <iframe
        ref={iframeRef}
        src={uri}
        title="PDF"
        style={iframeStyle}
      />

      {/* Franja superior transparente para detectar tap (toggle overlay) */}
      <div
        onClick={onSingleTap}
        style={tapZoneTop}
      />

      {/* Franja inferior transparente */}
      <div
        onClick={onSingleTap}
        style={tapZoneBottom}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    position: 'relative',
  },
});

// Estilos inline para elementos HTML nativos
const iframeStyle: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  border: 'none',
  backgroundColor: '#111',
};

const tapZoneTop: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  height: 56,
  zIndex: 5,
  cursor: 'pointer',
};

const tapZoneBottom: React.CSSProperties = {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  height: 56,
  zIndex: 5,
  cursor: 'pointer',
};
