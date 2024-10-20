export function readBlobAsArrayBuffer(blob: Blob) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onloadend = () => resolve(fileReader.result);
        fileReader.onerror = reject;
        fileReader.readAsArrayBuffer(blob);
    });
}

// Função para decodificar o ArrayBuffer para PCM
export function decodeAudioData_(arrayBuffer: ArrayBuffer, audioContextRef: AudioContext) {
    return new Promise((resolve, reject) => {
        if (audioContextRef) {
            audioContextRef.decodeAudioData(arrayBuffer, resolve, reject);
        } else {
            reject(new Error("AudioContext não está disponível."));
        }
    });
}