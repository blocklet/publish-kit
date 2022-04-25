import joinUrl from 'url-join';
import {
  en,
  xhrUploader,
  Uppload,
  Local,
  Preview,
  Camera,
  Rotate,
  Crop,
  Blur,
  Contrast,
  Grayscale,
  Saturate,
  Twitter,
  Facebook,
  Screenshot,
  URL,
} from 'uppload';
import 'uppload/dist/uppload.css';
import 'uppload/dist/themes/light.css';

const obj = new URL(window.location.origin);
obj.pathname = joinUrl(window.blocklet.prefix, '/api/uploads');

const uploader = new Uppload({
  lang: en,
  defaultService: 'local',
  maxWidth: 1440,
  maxHeight: 900,
  uploader: xhrUploader({
    endpoint: obj.href,
    fileKeyName: 'image',
  }),
});

// services
uploader.use([
  new Local({ mimeTypes: ['image/png', 'image/jpeg', 'image/gif'] }),
  new Camera(),
  new Screenshot(),
  new URL(),
  new Twitter(),
  new Facebook(),
]);

// effects
uploader.use([new Preview(), new Rotate(), new Crop(), new Blur(), new Contrast(), new Grayscale(), new Saturate()]);

export default uploader;
