/*
 * inits core-widget as iframe into client system
 * import loadWidget and unloadWidget
 * call loadWidget onMounted | call unloadWidget onBeforeUnmount
 */

const CORE_ORIGIN =  "https://app.core-value.ch"

let controller = new AbortController();

export const loadWidget = function (environement: string) {
  controller = new AbortController(); //
  const element = document.getElementById('core-value-widget');
  if (!element) {
    return;
  }
  const apiKey = element?.dataset?.apikey;
  const callbackFn = element?.dataset?.callback;
  const language = element?.dataset?.lang;
  const requestType = element?.dataset.type;
  const cssPath = element.dataset.csspath;

  const link = CORE_ORIGIN +
    '?key=' +  apiKey +
    '&lang=' + language +
    '&type=' + requestType +
    '&cssPath=' + cssPath;
  const iframe = document.createElement('iframe');
  iframe.setAttribute('src', link);
  iframe.setAttribute('allow', 'fullscreen');
  element.appendChild(iframe);

  if (environement === 'development' && iframe.contentWindow) {
    (iframe.contentWindow as any).console = console;
  }

  window.addEventListener(
    'message',
    (e) => {
      // console.log("DUMMY received message: ", e);
      if (e.origin === CORE_ORIGIN) {
        switch (e.data?.type) {
          case 'init_success':
            if (element?.dataset.entry) {
              iframe.contentWindow?.postMessage(
                {
                  type: 'inject_project',
                  entry: element?.dataset.entry,
                  meta: element?.dataset.meta,
                },
                CORE_ORIGIN
              );
            } else {
              iframe.contentWindow?.postMessage(
                {
                  type: 'default_project',
                  meta: element?.dataset.meta,
                },
                CORE_ORIGIN
              );
            }
            break;
          case 'init_fail':
            console.error('Core init failed: ', e.data);
            break;
          case 'on_error':
            console.error('Core Error: ', e.data);
            break;
          case 'on_save':
            if (e.data) {
              if (callbackFn && typeof (window as any)[callbackFn] === 'function') {
                (window as any)[callbackFn](e.data);
              }
            } else {
              console.error('Client Error: on save callback function is not set!');
            }
            break;
          default:
            break;
        }
      }
    },
    { signal: controller.signal }
  );
};

export const unloadWidget = function () {
  controller.abort();
};
