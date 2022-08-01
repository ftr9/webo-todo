export default function(file) {
  return new Promise((resolve, reject) => {
    let supportedFormat = [
      'image/jpeg',
      'image/png',
      'image/jpg',
      'image/webp',
    ];
    if (!supportedFormat.includes(file.type)) {
      reject(`${file.type} is not supported..`);
    } else {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
    }
  });
}
