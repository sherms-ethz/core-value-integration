/*
 * inits core-widget as iframe into client system
 * - this file has to be loaded at the end of body tag
 */

const CORE_ORIGIN = "https://app.core-value.ch"

document.addEventListener("DOMContentLoaded", function() {
    const element = document.getElementById("core-value-widget");
    const apiKey = element?.dataset?.apikey;
    const callbackFn = element?.dataset?.callback;
    const language = element?.dataset?.lang;
    const requestType = element?.dataset.type;
    const cssPath = element.dataset.csspath;
    const nonce = element.dataset?.nonce;
    const message = element.dataset?.message;

    let link = CORE_ORIGIN +
        "?key=" + apiKey +
        "&lang=" + language +
        "&type=" + requestType +
        "&cssPath=" + cssPath;

    if (nonce && message) {
        /* for shared secret base authentication */
        link += "&nonce=" + nonce + "&message=" + message;
    } else {
        link += "&timestamp=" + Date.now(); // prevent caching
    }

    const iframe = document.createElement('iframe');
    iframe.setAttribute("src", link); // prevent caching
    iframe.setAttribute("allow", "fullscreen");
    element.appendChild(iframe);

    window.addEventListener("message", (e) => {
        if (e.origin === CORE_ORIGIN) {
            switch(e.data?.type) {
                case "init_success":
                    if (element?.dataset.entry) {
                        iframe.contentWindow.postMessage({
                            "type": "inject_data",
                            "meta": element?.dataset.meta,
                            "project": element?.dataset.entry,
                        }, CORE_ORIGIN);
                    } else {
                        iframe.contentWindow.postMessage({
                            "type": "default_data",
                            "meta": element?.dataset.meta,
                        }, CORE_ORIGIN);
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
                        if (callbackFn && typeof window[callbackFn] === 'function') {
                            window[callbackFn](e.data);
                        }
                    } else {
                        console.error('Client Error: on save callback function is not set!');
                    }
                    break;
                default:
                    break;
            }
        }
    })
});