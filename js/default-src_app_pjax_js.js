(globalThis["webpackChunksakurairo_scripts"] = globalThis["webpackChunksakurairo_scripts"] || []).push([["default-src_app_pjax_js"],{

/***/ "./node_modules/@sliphua/pjax/dist/pjax.esm.js":
/*!*****************************************************!*\
  !*** ./node_modules/@sliphua/pjax/dist/pjax.esm.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Pjax)
/* harmony export */ });
/**
 * Lazy Session History API
 * ===
 * Access the associated data of a history entry even after user navigations.
 *
 * On page navigation events (like popstate), `window.history.state` has already been changed and
 * we can't update the previous state anymore. To leave a last mark on the leaving page, we have to
 * either keep updating the state continuously - which usually causes performance issues,
 * or make use of other API.
 *
 * Internally, this module uses **session storage** to store data, and uses browsers' original
 * history state as keys to identify session storage items.
 */

/**
 * A valid history state object.
 */
class LazyHistory {
  /**
   * The index of current state.
   */

  /**
   * The key used in `window.history.state` and session storage.
   */

  /**
   * The current state.
   */
  constructor(key) {
    this.key = key;
    this.pull();
  }
  /**
   * Keep up with current browser history entry.
   */


  pull() {
    // Get new state index.
    const historyState = window.history.state;
    const pulledIndex = historyState == null ? void 0 : historyState[this.key]; // Return if up-to-date.

    if (pulledIndex !== undefined && this.index === pulledIndex) return; // Get stored states.

    const stateListStr = window.sessionStorage.getItem(this.key);
    const stateList = stateListStr ? JSON.parse(stateListStr) : []; // Store current state.

    stateList[this.index] = this.state;
    window.sessionStorage.setItem(this.key, JSON.stringify(stateList));

    if (pulledIndex === undefined) {
      this.index = stateList.length;
      this.state = null;
      window.history.replaceState({ ...historyState,
        [this.key]: this.index
      }, document.title);
    } else {
      this.index = pulledIndex;
      this.state = stateListStr ? stateList[pulledIndex] : null;
    }
  }

}

/**
 * Replace HTML contents by using innerHTML.
 */
const innerHTML = (oldNode, newNode) => {
  // eslint-disable-next-line no-param-reassign
  oldNode.innerHTML = newNode.innerHTML;
};
/**
 * Replace all text by using textContent.
 */


const textContent = (oldNode, newNode) => {
  // eslint-disable-next-line no-param-reassign
  oldNode.textContent = newNode.textContent;
};
/**
 * Replace readable text by using innerText.
 */


const innerText = (oldEle, newEle) => {
  // eslint-disable-next-line no-param-reassign
  oldEle.innerText = newEle.innerText;
};
/**
 * Rewrite all attributes.
 */


const attributes = (oldEle, newEle) => {
  let existingNames = oldEle.getAttributeNames();
  const targetNames = newEle.getAttributeNames();
  targetNames.forEach(target => {
    oldEle.setAttribute(target, newEle.getAttribute(target) || '');
    existingNames = existingNames.filter(existing => existing !== target);
  });
  existingNames.forEach(existing => {
    oldEle.removeAttribute(existing);
  });
};
/**
 * Replace the whole element by using replaceWith.
 */


const replaceWith = (oldNode, newNode) => {
  oldNode.replaceWith(newNode);
};

const Switches = {
  default: replaceWith,
  innerHTML,
  textContent,
  innerText,
  attributes,
  replaceWith
};

const capitalize = str => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

class Submission {
  /**
   * Parse the basic facilities that will be frequently used in the submission.
   * @see [Form submission algorithm | HTML Standard]{@link https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#form-submission-algorithm}
   */
  constructor(form, submitter) {
    this.form = form;
    this.submitButton = submitter;
  }
  /**
   * Parse submission related content attributes.
   * @see [Form submission attributes | HTML Standard]{@link https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#form-submission-attributes}
   */


  getAttribute(name) {
    const {
      submitButton,
      form
    } = this;
    /**
     * Some attributes from the submit button override the form's one.
     * Before reading the IDL value, do a hasAttribute check since the IDL may return
     * a value (usually the default) even when the related content attribute is not present.
     */

    if (submitButton && submitButton.hasAttribute(`form${name}`)) {
      const overrideValue = submitButton[`form${capitalize(name)}`];
      if (overrideValue) return overrideValue;
    }

    return form[name];
  }
  /**
   * Construct the entry list and return in FormData format.
   * Manually append submitter entry before we can directly specify the submitter button.
   * The manual way has the limitation that the submitter entry always comes last.
   * @see [Constructing the entry list | HTML Standard]{@link https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#constructing-form-data-set}
   * @see [FormData: Add ability to specify submitter in addition to &lt;form&gt; · whatwg/xhr]{@link https://github.com/whatwg/xhr/issues/262}
   */


  getEntryList() {
    const {
      form,
      submitButton
    } = this;
    const formData = new FormData(form);

    if (submitButton && !submitButton.disabled && submitButton.name) {
      formData.append(submitButton.name, submitButton.value);
    }

    return formData;
  }
  /**
   * The application/x-www-form-urlencoded and text/plain encoding algorithms
   * take a list of name-value pairs, where the values must be strings,
   * rather than an entry list where the value can be a File.
   * @see [Converting an entry list to a list of name-value pairs | HTML Standard]{@link https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#converting-an-entry-list-to-a-list-of-name-value-pairs}
   */


  getNameValuePairs() {
    return Array.from(this.getEntryList(), ([key, value]) => [key, value instanceof File ? value.name : value]);
  }
  /**
   * URLSearchParams is a native API that
   * uses the application/x-www-form-urlencoded format and encoding algorithm.
   * @see [URLSearchParams class | URL Standard]{@link https://url.spec.whatwg.org/#interface-urlsearchparams}
   */


  getURLSearchParams() {
    return new URLSearchParams(this.getNameValuePairs());
  }
  /**
   * text/plain encoding algorithm for plain text form data.
   * @see [text/plain encoding algorithm | HTML Standard]{@link https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#text/plain-encoding-algorithm}
   */


  getTextPlain() {
    return this.getNameValuePairs().reduce((str, [key, value]) => `${str}${key}=${value}\r\n`, '');
  }
  /**
   * Get the request to be sent by this submission.
   * @see [Form submission algorithm | HTML Standard]{@link https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#form-submission-algorithm}
   */


  getRequestInfo() {
    const action = this.getAttribute('action');
    const actionURL = new URL(action, document.baseURI); // Only 'http' and 'https' schemes are supported.

    if (!/^https?:$/.test(actionURL.protocol)) return null;

    switch (this.getAttribute('method')) {
      /**
       * Mutate action URL.
       * @see [Mutate action URL | HTML Standard]{@link https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#submit-mutate-action}
       */
      case 'get':
        {
          actionURL.search = this.getURLSearchParams().toString();
          return actionURL.href;
        }

      /**
       * Submit as entity body.
       * @see [Submit as entity body | HTML Standard]{@link https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#submit-body}
       */

      case 'post':
        {
          let body;

          switch (this.getAttribute('enctype')) {
            case 'application/x-www-form-urlencoded':
              body = this.getURLSearchParams();
              break;

            case 'multipart/form-data':
              body = this.getEntryList();
              break;

            case 'text/plain':
              body = this.getTextPlain();
              break;

            default:
              return null;
          }

          return new Request(action, {
            method: 'POST',
            body
          });
        }

      /**
       * Method with no request to send ('dialog' method) or unsupported.
       */

      default:
        return null;
    }
  }

}

/**
 * Get the target browsing context chosen by anchors or forms
 * @see [The rules for choosing a browsing context | HTML Standard]{@link https://html.spec.whatwg.org/multipage/browsers.html#the-rules-for-choosing-a-browsing-context-given-a-browsing-context-name}
 */
const getBrowsingContext = target => {
  if (target === window.name) return window;

  switch (target.toLowerCase()) {
    case '':
    case '_self':
      return window;

    case '_parent':
      return window.parent;

    case '_top':
      return window.top;

    default:
      return undefined;
  }
};

class DefaultTrigger {
  constructor(pjax) {
    this.pjax = pjax;
  }
  /**
   * Check if the current trigger options apply to the element.
   */


  test(element) {
    const {
      defaultTrigger
    } = this.pjax.options;
    if (typeof defaultTrigger === 'boolean') return defaultTrigger;
    const {
      enable,
      exclude
    } = defaultTrigger;
    return enable !== false && (!exclude || !element.matches(exclude));
  }
  /**
   * Load a resource with element attribute support.
   * @see [Follow the hyperlink | HTML Standard]{@link https://html.spec.whatwg.org/multipage/links.html#following-hyperlinks-2}
   * @see [Plan to navigate | HTML Standard]{@link https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#plan-to-navigate}
   */


  load(resource, subject) {
    var _subject$getAttribute, _subject$getAttribute2;

    /**
     * The RequestInit to align the request to send by the element.
     */
    const requestInit = {};
    /**
     * Referrer policy that specified on the element.
     * Will cause a TypeError in the later Request constructing step if the attribute is invalid.
     * Not bypassing forms here as it is supposed to be supported in the future.
     * @see [Add referrerpolicy to &lt;form&gt; · whatwg/html]{@link https://github.com/whatwg/html/issues/4320}
     */

    const referrerPolicy = (_subject$getAttribute = subject.getAttribute('referrerpolicy')) == null ? void 0 : _subject$getAttribute.toLowerCase();
    if (referrerPolicy !== undefined) requestInit.referrerPolicy = referrerPolicy;
    /**
     * Use no referrer if specified in the link types.
     * Not reading from `.relList` here as browsers haven't shipped it for forms yet.
     * @see [Add &lt;form rel&gt; initial compat data · mdn/browser-compat-data]{@link https://github.com/mdn/browser-compat-data/pull/9130}
     */

    if ((_subject$getAttribute2 = subject.getAttribute('rel')) != null && _subject$getAttribute2.split(/\s+/).some(type => type.toLowerCase() === 'noreferrer')) {
      requestInit.referrer = '';
    }

    this.pjax.load(new Request(resource, requestInit)).catch(() => {});
  }

  onLinkOpen(event) {
    if (event.defaultPrevented) return;
    const {
      target
    } = event;
    if (!(target instanceof Element)) return;
    const link = target.closest('a[href], area[href]');
    if (!link) return;
    if (!this.test(link)) return;

    if (event instanceof MouseEvent || event instanceof KeyboardEvent) {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    }

    if (getBrowsingContext(link.target) !== window) return; // External.

    if (link.origin !== window.location.origin) return;
    event.preventDefault();
    this.load(link.href, link);
  }

  onFormSubmit(event) {
    if (event.defaultPrevented) return;
    const {
      target: form,
      submitter
    } = event;
    if (!(form instanceof HTMLFormElement)) return;
    if (!this.test(form)) return;
    const submission = new Submission(form, submitter);
    if (getBrowsingContext(submission.getAttribute('target')) !== window) return;
    const requestInfo = submission.getRequestInfo();
    if (!requestInfo) return;
    const url = new URL(typeof requestInfo === 'string' ? requestInfo : requestInfo.url); // External.

    if (url.origin !== window.location.origin) return;
    event.preventDefault();
    this.load(requestInfo, form);
  }

  register() {
    document.addEventListener('click', event => {
      this.onLinkOpen(event);
    });
    document.addEventListener('keyup', event => {
      if (event.key !== 'Enter') return;
      this.onLinkOpen(event);
    }); // Lacking browser compatibility and small polyfill. - August 2, 2021

    if ('SubmitEvent' in window) {
      document.addEventListener('submit', event => {
        this.onFormSubmit(event);
      });
    }
  }

}

async function switchNodes(sourceDocument, {
  selectors,
  switches,
  signal = null
}) {
  if (signal != null && signal.aborted) throw new DOMException('Aborted switches', 'AbortError');
  let focusCleared = false;
  const switchPromises = [];
  selectors.forEach(selector => {
    const sourceNodeList = sourceDocument.querySelectorAll(selector);
    const targetNodeList = document.querySelectorAll(selector); // Throw when the structure is not match.

    if (sourceNodeList.length !== targetNodeList.length) {
      throw new DOMException(`Selector '${selector}' does not select the same amount of nodes`, 'IndexSizeError');
    }

    const {
      activeElement
    } = document; // Start switching for each match.

    targetNodeList.forEach((targetNode, index) => {
      // Clear out focused controls before switching.
      if (!focusCleared && activeElement && targetNode.contains(activeElement)) {
        if (activeElement instanceof HTMLElement || activeElement instanceof SVGElement) {
          activeElement.blur();
        }

        focusCleared = true;
      } // Argument defined switch is prior to default switch.


      const targetSwitch = (switches == null ? void 0 : switches[selector]) || Switches.default; // Start switching. Package to promise. Ignore switch errors.

      const switchPromise = Promise.resolve().then(() => targetSwitch(targetNode, sourceNodeList[index])).catch(() => {});
      switchPromises.push(switchPromise);
    });
  }); // Reject as soon as possible on abort.

  await Promise.race([Promise.all(switchPromises), new Promise((resolve, reject) => {
    signal == null ? void 0 : signal.addEventListener('abort', () => {
      reject(new DOMException('Aborted switches', 'AbortError'));
    });
  })]);
  return {
    focusCleared
  };
}

async function switchDOM(requestInfo, overrideOptions = {}) {
  var _this$abortController, _hooks$request;

  const {
    selectors,
    switches,
    cache,
    timeout,
    hooks
  } = { ...this.options,
    ...overrideOptions
  };
  const eventDetail = {};
  const signal = ((_this$abortController = this.abortController) == null ? void 0 : _this$abortController.signal) || null;
  eventDetail.signal = signal;
  /**
   * Specify request cache mode and abort signal.
   */

  const requestInit = {
    cache,
    signal
  };
  /**
   * Specify original referrer and referrerPolicy
   * since the later Request constructor steps discard the original ones.
   * @see [Request constructor steps | Fetch Standard]{@link https://fetch.spec.whatwg.org/#dom-request}
   */

  if (requestInfo instanceof Request) {
    requestInit.referrer = requestInfo.referrer;
    requestInit.referrerPolicy = requestInfo.referrerPolicy;
  }

  const rawRequest = new Request(requestInfo, requestInit);
  rawRequest.headers.set('X-Requested-With', 'Fetch');
  rawRequest.headers.set('X-Pjax', 'true');
  rawRequest.headers.set('X-Pjax-Selectors', JSON.stringify(selectors));
  const request = (await ((_hooks$request = hooks.request) == null ? void 0 : _hooks$request.call(hooks, rawRequest))) || rawRequest;
  eventDetail.request = request; // Set timeout.

  eventDetail.timeout = timeout;
  let timeoutID;

  if (timeout > 0) {
    timeoutID = window.setTimeout(() => {
      var _this$abortController2;

      (_this$abortController2 = this.abortController) == null ? void 0 : _this$abortController2.abort();
    }, timeout);
    eventDetail.timeoutID = timeoutID;
  }

  this.fire('send', eventDetail);

  try {
    var _hooks$response, _hooks$document, _hooks$switchesResult;

    const rawResponse = await fetch(request).finally(() => {
      window.clearTimeout(timeoutID);
    });
    const response = (await ((_hooks$response = hooks.response) == null ? void 0 : _hooks$response.call(hooks, rawResponse))) || rawResponse;
    eventDetail.response = response;
    this.fire('receive', eventDetail); // Push history state. Preserve hash as the fetch discards it.

    const newLocation = new URL(response.url);
    newLocation.hash = new URL(request.url).hash;

    if (window.location.href !== newLocation.href) {
      window.history.pushState(null, '', newLocation.href);
    } // Switch elements.


    const rawDocument = new DOMParser().parseFromString(await response.text(), 'text/html');
    const document = (await ((_hooks$document = hooks.document) == null ? void 0 : _hooks$document.call(hooks, rawDocument))) || rawDocument;
    eventDetail.switches = switches;
    const rawSwitchesResult = await switchNodes(document, {
      selectors,
      switches,
      signal
    });
    const switchesResult = (await ((_hooks$switchesResult = hooks.switchesResult) == null ? void 0 : _hooks$switchesResult.call(hooks, rawSwitchesResult))) || rawSwitchesResult;
    eventDetail.switchesResult = switchesResult; // Simulate initial page load.

    await this.preparePage(switchesResult, overrideOptions);
  } catch (error) {
    eventDetail.error = error;
    this.fire('error', eventDetail);
    throw error;
  } finally {
    this.fire('complete', eventDetail);
  }

  this.fire('success', eventDetail);
}

/**
 * Follow
 * https://html.spec.whatwg.org/multipage/scripting.html#prepare-a-script
 * excluding steps concerning obsoleted attributes.
 */

/**
 * Regex for JavaScript MIME type strings.
 * @see [JavaScript MIME type | MIME Sniffing Standard]{@link https://mimesniff.spec.whatwg.org/#javascript-mime-type}
 */
const MIMETypeRegex = /^((application|text)\/(x-)?(ecma|java)script|text\/(javascript1\.[0-5]|(j|live)script))$/;
class Script {
  constructor(scriptEle) {
    this.external = false;
    this.blocking = false;
    this.evaluable = false;
    this.target = scriptEle; // Process empty.

    if (!scriptEle.hasAttribute('src') && !scriptEle.text) return; // Process type.

    const typeString = scriptEle.type ? scriptEle.type.trim().toLowerCase() : 'text/javascript';

    if (MIMETypeRegex.test(typeString)) {
      this.type = 'classic';
    } else if (typeString === 'module') {
      this.type = 'module';
    } else {
      return;
    } // Process no module.


    if (scriptEle.noModule && this.type === 'classic') {
      return;
    } // Process external.


    if (scriptEle.src) {
      this.external = true;
    } // Process blocking.
    // It's minifier plugins' job to merge conditions. We split them out for readability.


    this.blocking = true;

    if (this.type !== 'classic') {
      this.blocking = false;
    } else if (this.external) {
      /**
       * The async IDL attribute may not reflect the async content attribute.
       * @see [The async IDL attribute | HTML Standard]{@link https://html.spec.whatwg.org/multipage/scripting.html#dom-script-async}
       */
      if (scriptEle.hasAttribute('async')) {
        this.blocking = false;
      } else if (scriptEle.defer) {
        this.blocking = false;
      }
    }

    this.evaluable = true;
  }

  eval() {
    return new Promise((resolve, reject) => {
      const oldEle = this.target;
      const newEle = document.createElement('script');
      newEle.addEventListener('error', reject);
      /**
       * Clone attributes and inner text.
       * Reset async since it defaults to true on dynamically created scripts.
       */

      newEle.async = false;
      oldEle.getAttributeNames().forEach(name => {
        newEle.setAttribute(name, oldEle.getAttribute(name) || '');
      });
      newEle.text = oldEle.text;
      /**
       * Execute.
       * Not using `.isConnected` here as it is also `true`
       * for scripts connected in other documents.
       */

      if (document.contains(oldEle)) {
        oldEle.replaceWith(newEle);
      } else {
        // Execute in <head> if it's not in current document.
        document.head.append(newEle);

        if (this.external) {
          newEle.addEventListener('load', () => newEle.remove());
        } else {
          newEle.remove();
        }
      }

      if (this.external) {
        newEle.addEventListener('load', () => resolve());
      } else {
        resolve();
      }
    });
  }

}

class Executor {
  constructor(signal) {
    this.signal = signal;
  }
  /**
   * Execute script.
   * Throw only when aborted.
   * Wait only for blocking script.
   */


  async exec(script) {
    var _this$signal;

    if ((_this$signal = this.signal) != null && _this$signal.aborted) throw new DOMException('Execution aborted', 'AbortError');
    const evalPromise = script.eval().catch(() => {});
    if (script.blocking) await evalPromise;
  }

}
/**
 * Find and execute scripts in order.
 * Needed since innerHTML does not run scripts.
 */


async function executeScripts(scriptEleList, {
  signal = null
} = {}) {
  if (signal != null && signal.aborted) throw new DOMException('Aborted execution', 'AbortError');
  const validScripts = Array.from(scriptEleList, scriptEle => new Script(scriptEle)).filter(script => script.evaluable);
  const executor = new Executor(signal); // Evaluate external scripts first
  // to help browsers fetch them in parallel.
  // Each inline blocking script will be evaluated as soon as
  // all its previous blocking scripts are executed.

  const execution = validScripts.reduce((promise, script) => {
    if (script.external) {
      return Promise.all([promise, executor.exec(script)]);
    }

    return promise.then(() => executor.exec(script));
  }, Promise.resolve()); // Reject as soon as possible on abort.

  await Promise.race([execution, new Promise((resolve, reject) => {
    signal == null ? void 0 : signal.addEventListener('abort', () => {
      reject(new DOMException('Aborted execution', 'AbortError'));
    });
  })]);
}

/**
 * Get the indicated part of the document.
 * Not using :target pseudo class here as it may not be updated by pushState.
 * @see [The indicated part of the document | HTML Standard]{@link https://html.spec.whatwg.org/multipage/browsing-the-web.html#the-indicated-part-of-the-document}
 */

const getIndicatedPart = () => {
  let target = null;
  const hashId = decodeURIComponent(window.location.hash.slice(1));
  if (hashId) target = document.getElementById(hashId) || document.getElementsByName(hashId)[0];
  if (!target && (!hashId || hashId.toLowerCase() === 'top')) target = document.scrollingElement;
  return target;
};
/**
 * After page elements are updated.
 */


async function preparePage(switchesResult, overrideOptions = {}) {
  const options = { ...this.options,
    ...overrideOptions
  }; // If page elements are switched.

  if (switchesResult) {
    var _this$abortController;

    // Focus the FIRST autofocus if the previous focus is cleared.
    // https://html.spec.whatwg.org/multipage/interaction.html#the-autofocus-attribute
    if (switchesResult.focusCleared) {
      const autofocus = document.querySelectorAll('[autofocus]')[0];

      if (autofocus instanceof HTMLElement || autofocus instanceof SVGElement) {
        autofocus.focus();
      }
    } // List newly added and labeled scripts.


    const scripts = [];

    if (options.scripts) {
      document.querySelectorAll(options.scripts).forEach(element => {
        if (element instanceof HTMLScriptElement) scripts.push(element);
      });
    }

    options.selectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(element => {
        if (element instanceof HTMLScriptElement) {
          scripts.push(element);
        } else {
          element.querySelectorAll('script').forEach(script => {
            if (scripts.includes(script)) return;
            scripts.push(script);
          });
        }
      });
    }); // Sort in document order.
    // https://stackoverflow.com/a/22613028

    scripts.sort((a, b) => // Bitwise AND operator is required here.
    // eslint-disable-next-line no-bitwise
    a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_PRECEDING || -1); // Execute.

    await executeScripts(scripts, {
      signal: ((_this$abortController = this.abortController) == null ? void 0 : _this$abortController.signal) || null
    });
  } // Parse required scroll position.


  const {
    scrollTo
  } = options; // When scroll is allowed.

  if (scrollTo !== false) {
    // If switched, default to left top. Otherwise, default to no scroll.
    let parsedScrollTo = switchesResult ? [0, 0] : false;

    if (Array.isArray(scrollTo)) {
      parsedScrollTo = scrollTo;
    } else if (typeof scrollTo === 'number') {
      parsedScrollTo = [window.scrollX, scrollTo];
    } else {
      const target = getIndicatedPart();

      if (target) {
        target.scrollIntoView();
        parsedScrollTo = false;
      }
    } // Scroll.


    if (parsedScrollTo) window.scrollTo(parsedScrollTo[0], parsedScrollTo[1]);
  }
}

/**
 * Load a URL in Pjax way. Throw all errors.
 */
async function weakLoad(requestInfo, overrideOptions = {}) {
  var _this$abortController;

  // Store scroll position.
  this.storeHistory(); // Setup abort controller.

  const abortController = new AbortController();
  (_this$abortController = this.abortController) == null ? void 0 : _this$abortController.abort();
  this.abortController = abortController;
  /**
   * The URL object of the target resource.
   * Used to identify fragment navigations.
   */

  const url = new URL(typeof requestInfo === 'string' ? requestInfo : requestInfo.url, document.baseURI);
  const path = url.pathname + url.search;
  const currentPath = this.location.pathname + this.location.search;
  /**
   * Identify fragment navigations.
   * Not using `.hash` here as it becomes the empty string for both empty and null fragment.
   * @see [Navigate fragment step | HTML Standard]{@link https://html.spec.whatwg.org/multipage/browsing-the-web.html#navigate-fragid-step}
   * @see [URL hash getter | URL Standard]{@link https://url.spec.whatwg.org/#dom-url-hash}
   */

  if (path === currentPath && url.href.includes('#')) {
    // pushState on different hash.
    if (window.location.hash !== url.hash) {
      window.history.pushState(null, '', url.href);
    } // Directly prepare for fragment navigation.


    await this.preparePage(null, overrideOptions);
  } else {
    // Switch DOM for normal navigation.
    await this.switchDOM(requestInfo, overrideOptions);
  } // Update Pjax location and prepare the page.


  this.history.pull();
  this.location.href = window.location.href; // Finish, remove abort controller.

  this.abortController = null;
}

class Pjax {
  static reload() {
    window.location.reload();
  }
  /**
   * Options default values.
   */


  constructor(options = {}) {
    this.options = {
      defaultTrigger: true,
      selectors: ['title', '.pjax'],
      switches: {},
      scripts: 'script[data-pjax]',
      scrollTo: true,
      scrollRestoration: true,
      cache: 'default',
      timeout: 0,
      hooks: {}
    };
    this.history = new LazyHistory('pjax');
    this.location = new URL(window.location.href);
    this.abortController = null;
    this.switchDOM = switchDOM;
    this.preparePage = preparePage;
    this.weakLoad = weakLoad;
    Object.assign(this.options, options);

    if (this.options.scrollRestoration) {
      window.history.scrollRestoration = 'manual'; // Browsers' own restoration is faster and more stable on reload.

      window.addEventListener('beforeunload', () => {
        window.history.scrollRestoration = 'auto';
      });
    }

    const {
      defaultTrigger
    } = this.options;

    if (defaultTrigger === true || defaultTrigger !== false && defaultTrigger.enable !== false) {
      new DefaultTrigger(this).register();
    }

    window.addEventListener('popstate', event => {
      /**
       * The main reason why we write the LazyHistory library is right here:
       * `window.history.state` is ALREADY changed on popstate events and
       * we can't update the previous state anymore. (For scroll position, etc.)
       * As continuously updating `window.history.state` causes performance issues,
       * using a custom library seems to be the only choice.
       */
      // Store scroll position and then update the lazy state.
      this.storeHistory();
      this.history.pull(); // hashchange events trigger popstate with a null `event.state`.

      if (event.state === null) return;
      const overrideOptions = {};

      if (this.options.scrollRestoration && this.history.state) {
        overrideOptions.scrollTo = this.history.state.scrollPos;
      }

      this.load(window.location.href, overrideOptions).catch(() => {});
    });
  }

  storeHistory() {
    this.history.state = {
      scrollPos: [window.scrollX, window.scrollY]
    };
  }
  /**
   * Fire Pjax related events.
   */


  fire(type, detail) {
    const event = new CustomEvent(`pjax:${type}`, {
      bubbles: true,
      cancelable: false,
      detail: {
        abortController: this.abortController,
        ...detail
      }
    });
    document.dispatchEvent(event);
  }

  /**
   * Load a URL in Pjax way. Navigate normally on errors except AbortError.
   */
  async load(requestInfo, overrideOptions = {}) {
    try {
      await this.weakLoad(requestInfo, overrideOptions);
    } catch (e) {
      if (e instanceof DOMException && e.name === 'AbortError') throw e;
      window.location.assign(typeof requestInfo === 'string' ? requestInfo : requestInfo.url);
    }
  }

}

Pjax.switches = Switches;


//# sourceMappingURL=pjax.esm.js.map


/***/ }),

/***/ "./src/app/pjax.js":
/*!*************************!*\
  !*** ./src/app/pjax.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ initPjax)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.string.replace.js */ "./node_modules/core-js/modules/es.string.replace.js");
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lazyload__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lazyload */ "./node_modules/lazyload/src/lazyload.ts");
/* harmony import */ var _common_butterbar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/butterbar */ "./src/common/butterbar.ts");
/* harmony import */ var _common_sakurairo_global__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/sakurairo_global */ "./src/common/sakurairo_global.ts");
/* harmony import */ var _copyright__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./copyright */ "./src/app/copyright.ts");
/* harmony import */ var _font_control__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./font_control */ "./src/app/font_control.ts");
/* harmony import */ var _func__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./func */ "./src/app/func.js");
/* harmony import */ var _hitokoto__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./hitokoto */ "./src/app/hitokoto.ts");
/* harmony import */ var _video__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./video */ "./src/app/video.ts");
/* harmony import */ var _web_audio__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./web_audio */ "./src/app/web_audio.ts");
/* harmony import */ var _post_list__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./post_list */ "./src/app/post_list.js");
/* harmony import */ var nprogress__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! nprogress */ "./node_modules/nprogress/nprogress.js");
/* harmony import */ var nprogress__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(nprogress__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _sliphua_pjax__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @sliphua/pjax */ "./node_modules/@sliphua/pjax/dist/pjax.esm.js");
/* harmony import */ var _typed__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./typed */ "./src/app/typed.ts");














function initPjax() {
  new _sliphua_pjax__WEBPACK_IMPORTED_MODULE_12__["default"]({
    selectors: ["#page", "title", ".footer-device", "#app-js-before", "#login-link", "#entry-content-css"],
    scripts: "#app-js-before",
    timeout: 8000,
    defaultTrigger: {
      exclude: 'a[data-no-pjax]'
    }
  });
  document.addEventListener("pjax:send", () => {
    for (const element of document.getElementsByClassName("normal-cover-video")) {
      element.pause();
      element.src = '';
      element.load = '';
    }

    document.getElementById("bar").style.width = "0%";
    if (mashiro_option.NProgressON) nprogress__WEBPACK_IMPORTED_MODULE_11___default().start();
    (0,_func__WEBPACK_IMPORTED_MODULE_6__.MNH)();
  });
  document.addEventListener("pjax:complete", () => {
    (0,_func__WEBPACK_IMPORTED_MODULE_6__.auto_height)();
    (0,_func__WEBPACK_IMPORTED_MODULE_6__.PE)();
    (0,_func__WEBPACK_IMPORTED_MODULE_6__.CE)();

    if (mashiro_option.land_at_home) {
      (0,_post_list__WEBPACK_IMPORTED_MODULE_10__.XLS)();
      (0,_typed__WEBPACK_IMPORTED_MODULE_13__["default"])();
    } else {
      (0,_typed__WEBPACK_IMPORTED_MODULE_13__.disableTypedJsIfExist)();
    }

    if (mashiro_option.NProgressON) nprogress__WEBPACK_IMPORTED_MODULE_11___default().done(); //#region mashiro_global.ini.pjax();
    //#region pjaxInit

    (0,_func__WEBPACK_IMPORTED_MODULE_6__.no_right_click)();
    (0,_font_control__WEBPACK_IMPORTED_MODULE_5__.loadFontSetting)();

    let _p = document.getElementsByTagName("p");

    for (let i = 0; i < _p.length; i++) {
      _p[i].classList.remove("head-copyright");
    }

    let _div = document.getElementsByTagName("div"),
        tla = document.getElementById("to-load-aplayer");

    tla && tla.addEventListener("click", () => {
      /* try {
          reloadHermit();
      } catch (e) { }; */
      for (let i = 0; i < _div.length; i++) {
        _div[i].classList.remove("load-aplayer");
      }
    });
    /* for (let i = 0; i < _div.length; i++) {
        if (_div[i].classList.contains("aplayer")) {
            try {
                reloadHermit();
            } catch { };
        }
    } */

    let iconflat = document.getElementsByClassName("iconflat");

    if (iconflat.length != 0) {
      iconflat[0].style.width = '50px';
      iconflat[0].style.height = '50px';
    }

    let openNav = document.getElementsByClassName("openNav");

    if (openNav.length != 0) {
      openNav[0].style.height = '50px';
    }

    (0,_func__WEBPACK_IMPORTED_MODULE_6__.bgButtonAddListener)();
    (0,_func__WEBPACK_IMPORTED_MODULE_6__.timeSeriesReload)();
    (0,_copyright__WEBPACK_IMPORTED_MODULE_4__["default"])(); //#endregion pjaxInit

    (0,_post_list__WEBPACK_IMPORTED_MODULE_10__.post_list_show_animation)();
    (0,_web_audio__WEBPACK_IMPORTED_MODULE_9__.web_audio)();
    (0,_video__WEBPACK_IMPORTED_MODULE_8__.coverVideoIni)();
    (0,_func__WEBPACK_IMPORTED_MODULE_6__.checkSkinSecter)(); //#endregion

    (0,_func__WEBPACK_IMPORTED_MODULE_6__.checkCoverBackground)(); //pjax不需要刷新前台背景

    let loading = document.getElementById("loading");

    if (loading) {
      loading.classList.add("hide");
      loading.classList.remove("show");
    } //未实际使用的选项

    /* if (Poi.codelamp == 'open') {
        self.Prism.highlightAll(event)
    }; */


    if (document.querySelector(".js-search.is-visible")) {
      document.getElementsByClassName("js-toggle-search")[0].classList.toggle("is-active");
      document.getElementsByClassName("js-search")[0].classList.toggle("is-visible");
      document.documentElement.style.overflowY = "unset";
    }

    (0,_hitokoto__WEBPACK_IMPORTED_MODULE_7__["default"])();
    (0,lazyload__WEBPACK_IMPORTED_MODULE_1__.lazyload)();
  });
  document.addEventListener("pjax:success", () => {
    //pjax加载时自动拉取page.js
    if (!mashiro_option.land_at_home && !document.getElementById('app-page-js')) {
      // id需要与php侧同步
      const script_app = document.getElementById('app-js');
      const script_app_page = document.createElement('script');
      script_app_page.src = script_app.src.replace('/app.js', '/page.js');
      script_app_page.id = 'app-page-js';
      document.body.appendChild(script_app_page);
    } //发送页面浏览事件

    /**
     * Google Analytics
     * @seealso https://developers.google.com/analytics/devguides/collection/gtagjs/pages
     */


    if (window.gtag) {
      gtag('config', Poi.google_analytics_id, {
        'page_path': window.location.pathname
      });
    }
    /**
     * 百度统计
     * @seealso https://tongji.baidu.com/web/help/article?id=235
     */


    if (window._hmt) {
      _hmt.push(['_trackPageview', pageURL]);
    }
  });
  document.addEventListener("pjax:error", e => {
    (0,_common_butterbar__WEBPACK_IMPORTED_MODULE_2__.createButterbar)((0,_common_sakurairo_global__WEBPACK_IMPORTED_MODULE_3__._$)('页面加载出错了 HTTP {0}', e.request.status));
  });
  window.addEventListener('popstate', e => {
    (0,_func__WEBPACK_IMPORTED_MODULE_6__.auto_height)();
    (0,_hitokoto__WEBPACK_IMPORTED_MODULE_7__["default"])();
    (0,_func__WEBPACK_IMPORTED_MODULE_6__.PE)();
    (0,_func__WEBPACK_IMPORTED_MODULE_6__.CE)();
    (0,_func__WEBPACK_IMPORTED_MODULE_6__.timeSeriesReload)(true);
    (0,_post_list__WEBPACK_IMPORTED_MODULE_10__.post_list_show_animation)();
  }, false);
}

/***/ }),

/***/ "./node_modules/core-js/internals/advance-string-index.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/advance-string-index.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var charAt = (__webpack_require__(/*! ../internals/string-multibyte */ "./node_modules/core-js/internals/string-multibyte.js").charAt);

// `AdvanceStringIndex` abstract operation
// https://tc39.es/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? charAt(S, index).length : 1);
};


/***/ }),

/***/ "./node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js":
/*!******************************************************************************!*\
  !*** ./node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js ***!
  \******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// TODO: Remove from `core-js@4` since it's moved to entry points
__webpack_require__(/*! ../modules/es.regexp.exec */ "./node_modules/core-js/modules/es.regexp.exec.js");
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");
var redefine = __webpack_require__(/*! ../internals/redefine */ "./node_modules/core-js/internals/redefine.js");
var regexpExec = __webpack_require__(/*! ../internals/regexp-exec */ "./node_modules/core-js/internals/regexp-exec.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");

var SPECIES = wellKnownSymbol('species');
var RegExpPrototype = RegExp.prototype;

module.exports = function (KEY, exec, FORCED, SHAM) {
  var SYMBOL = wellKnownSymbol(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;

    if (KEY === 'split') {
      // We can't use real regex here since it causes deoptimization
      // and serious performance degradation in V8
      // https://github.com/zloirock/core-js/issues/306
      re = {};
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
      re.flags = '';
      re[SYMBOL] = /./[SYMBOL];
    }

    re.exec = function () { execCalled = true; return null; };

    re[SYMBOL]('');
    return !execCalled;
  });

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    FORCED
  ) {
    var uncurriedNativeRegExpMethod = uncurryThis(/./[SYMBOL]);
    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
      var uncurriedNativeMethod = uncurryThis(nativeMethod);
      var $exec = regexp.exec;
      if ($exec === regexpExec || $exec === RegExpPrototype.exec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          // The native String method already delegates to @@method (this
          // polyfilled function), leasing to infinite recursion.
          // We avoid it by directly calling the native @@method method.
          return { done: true, value: uncurriedNativeRegExpMethod(regexp, str, arg2) };
        }
        return { done: true, value: uncurriedNativeMethod(str, regexp, arg2) };
      }
      return { done: false };
    });

    redefine(String.prototype, KEY, methods[0]);
    redefine(RegExpPrototype, SYMBOL, methods[1]);
  }

  if (SHAM) createNonEnumerableProperty(RegExpPrototype[SYMBOL], 'sham', true);
};


/***/ }),

/***/ "./node_modules/core-js/internals/get-substitution.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/internals/get-substitution.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");

var floor = Math.floor;
var charAt = uncurryThis(''.charAt);
var replace = uncurryThis(''.replace);
var stringSlice = uncurryThis(''.slice);
var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;

// `GetSubstitution` abstract operation
// https://tc39.es/ecma262/#sec-getsubstitution
module.exports = function (matched, str, position, captures, namedCaptures, replacement) {
  var tailPos = position + matched.length;
  var m = captures.length;
  var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
  if (namedCaptures !== undefined) {
    namedCaptures = toObject(namedCaptures);
    symbols = SUBSTITUTION_SYMBOLS;
  }
  return replace(replacement, symbols, function (match, ch) {
    var capture;
    switch (charAt(ch, 0)) {
      case '$': return '$';
      case '&': return matched;
      case '`': return stringSlice(str, 0, position);
      case "'": return stringSlice(str, tailPos);
      case '<':
        capture = namedCaptures[stringSlice(ch, 1, -1)];
        break;
      default: // \d\d?
        var n = +ch;
        if (n === 0) return match;
        if (n > m) {
          var f = floor(n / 10);
          if (f === 0) return match;
          if (f <= m) return captures[f - 1] === undefined ? charAt(ch, 1) : captures[f - 1] + charAt(ch, 1);
          return match;
        }
        capture = captures[n - 1];
    }
    return capture === undefined ? '' : capture;
  });
};


/***/ }),

/***/ "./node_modules/core-js/internals/regexp-exec-abstract.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/regexp-exec-abstract.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var call = __webpack_require__(/*! ../internals/function-call */ "./node_modules/core-js/internals/function-call.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js/internals/is-callable.js");
var classof = __webpack_require__(/*! ../internals/classof-raw */ "./node_modules/core-js/internals/classof-raw.js");
var regexpExec = __webpack_require__(/*! ../internals/regexp-exec */ "./node_modules/core-js/internals/regexp-exec.js");

var TypeError = global.TypeError;

// `RegExpExec` abstract operation
// https://tc39.es/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (isCallable(exec)) {
    var result = call(exec, R, S);
    if (result !== null) anObject(result);
    return result;
  }
  if (classof(R) === 'RegExp') return call(regexpExec, R, S);
  throw TypeError('RegExp#exec called on incompatible receiver');
};


/***/ }),

/***/ "./node_modules/core-js/internals/regexp-exec.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/regexp-exec.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

/* eslint-disable regexp/no-empty-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
/* eslint-disable regexp/no-useless-quantifier -- testing */
var call = __webpack_require__(/*! ../internals/function-call */ "./node_modules/core-js/internals/function-call.js");
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");
var toString = __webpack_require__(/*! ../internals/to-string */ "./node_modules/core-js/internals/to-string.js");
var regexpFlags = __webpack_require__(/*! ../internals/regexp-flags */ "./node_modules/core-js/internals/regexp-flags.js");
var stickyHelpers = __webpack_require__(/*! ../internals/regexp-sticky-helpers */ "./node_modules/core-js/internals/regexp-sticky-helpers.js");
var shared = __webpack_require__(/*! ../internals/shared */ "./node_modules/core-js/internals/shared.js");
var create = __webpack_require__(/*! ../internals/object-create */ "./node_modules/core-js/internals/object-create.js");
var getInternalState = (__webpack_require__(/*! ../internals/internal-state */ "./node_modules/core-js/internals/internal-state.js").get);
var UNSUPPORTED_DOT_ALL = __webpack_require__(/*! ../internals/regexp-unsupported-dot-all */ "./node_modules/core-js/internals/regexp-unsupported-dot-all.js");
var UNSUPPORTED_NCG = __webpack_require__(/*! ../internals/regexp-unsupported-ncg */ "./node_modules/core-js/internals/regexp-unsupported-ncg.js");

var nativeReplace = shared('native-string-replace', String.prototype.replace);
var nativeExec = RegExp.prototype.exec;
var patchedExec = nativeExec;
var charAt = uncurryThis(''.charAt);
var indexOf = uncurryThis(''.indexOf);
var replace = uncurryThis(''.replace);
var stringSlice = uncurryThis(''.slice);

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/;
  var re2 = /b*/g;
  call(nativeExec, re1, 'a');
  call(nativeExec, re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
})();

var UNSUPPORTED_Y = stickyHelpers.BROKEN_CARET;

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG;

if (PATCH) {
  patchedExec = function exec(string) {
    var re = this;
    var state = getInternalState(re);
    var str = toString(string);
    var raw = state.raw;
    var result, reCopy, lastIndex, match, i, object, group;

    if (raw) {
      raw.lastIndex = re.lastIndex;
      result = call(patchedExec, raw, str);
      re.lastIndex = raw.lastIndex;
      return result;
    }

    var groups = state.groups;
    var sticky = UNSUPPORTED_Y && re.sticky;
    var flags = call(regexpFlags, re);
    var source = re.source;
    var charsAdded = 0;
    var strCopy = str;

    if (sticky) {
      flags = replace(flags, 'y', '');
      if (indexOf(flags, 'g') === -1) {
        flags += 'g';
      }

      strCopy = stringSlice(str, re.lastIndex);
      // Support anchored sticky behavior.
      if (re.lastIndex > 0 && (!re.multiline || re.multiline && charAt(str, re.lastIndex - 1) !== '\n')) {
        source = '(?: ' + source + ')';
        strCopy = ' ' + strCopy;
        charsAdded++;
      }
      // ^(? + rx + ) is needed, in combination with some str slicing, to
      // simulate the 'y' flag.
      reCopy = new RegExp('^(?:' + source + ')', flags);
    }

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

    match = call(nativeExec, sticky ? reCopy : re, strCopy);

    if (sticky) {
      if (match) {
        match.input = stringSlice(match.input, charsAdded);
        match[0] = stringSlice(match[0], charsAdded);
        match.index = re.lastIndex;
        re.lastIndex += match[0].length;
      } else re.lastIndex = 0;
    } else if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      call(nativeReplace, match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    if (match && groups) {
      match.groups = object = create(null);
      for (i = 0; i < groups.length; i++) {
        group = groups[i];
        object[group[0]] = match[group[1]];
      }
    }

    return match;
  };
}

module.exports = patchedExec;


/***/ }),

/***/ "./node_modules/core-js/internals/regexp-flags.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/regexp-flags.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");

// `RegExp.prototype.flags` getter implementation
// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),

/***/ "./node_modules/core-js/internals/regexp-sticky-helpers.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/internals/regexp-sticky-helpers.js ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

// babel-minify and Closure Compiler transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
var $RegExp = global.RegExp;

var UNSUPPORTED_Y = fails(function () {
  var re = $RegExp('a', 'y');
  re.lastIndex = 2;
  return re.exec('abcd') != null;
});

// UC Browser bug
// https://github.com/zloirock/core-js/issues/1008
var MISSED_STICKY = UNSUPPORTED_Y || fails(function () {
  return !$RegExp('a', 'y').sticky;
});

var BROKEN_CARET = UNSUPPORTED_Y || fails(function () {
  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
  var re = $RegExp('^r', 'gy');
  re.lastIndex = 2;
  return re.exec('str') != null;
});

module.exports = {
  BROKEN_CARET: BROKEN_CARET,
  MISSED_STICKY: MISSED_STICKY,
  UNSUPPORTED_Y: UNSUPPORTED_Y
};


/***/ }),

/***/ "./node_modules/core-js/internals/regexp-unsupported-dot-all.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/internals/regexp-unsupported-dot-all.js ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

// babel-minify and Closure Compiler transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
var $RegExp = global.RegExp;

module.exports = fails(function () {
  var re = $RegExp('.', 's');
  return !(re.dotAll && re.exec('\n') && re.flags === 's');
});


/***/ }),

/***/ "./node_modules/core-js/internals/regexp-unsupported-ncg.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/internals/regexp-unsupported-ncg.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

// babel-minify and Closure Compiler transpiles RegExp('(?<a>b)', 'g') -> /(?<a>b)/g and it causes SyntaxError
var $RegExp = global.RegExp;

module.exports = fails(function () {
  var re = $RegExp('(?<a>b)', 'g');
  return re.exec('b').groups.a !== 'b' ||
    'b'.replace(re, '$<a>c') !== 'bc';
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.regexp.exec.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es.regexp.exec.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var exec = __webpack_require__(/*! ../internals/regexp-exec */ "./node_modules/core-js/internals/regexp-exec.js");

// `RegExp.prototype.exec` method
// https://tc39.es/ecma262/#sec-regexp.prototype.exec
$({ target: 'RegExp', proto: true, forced: /./.exec !== exec }, {
  exec: exec
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.string.replace.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es.string.replace.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var apply = __webpack_require__(/*! ../internals/function-apply */ "./node_modules/core-js/internals/function-apply.js");
var call = __webpack_require__(/*! ../internals/function-call */ "./node_modules/core-js/internals/function-call.js");
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");
var fixRegExpWellKnownSymbolLogic = __webpack_require__(/*! ../internals/fix-regexp-well-known-symbol-logic */ "./node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js/internals/is-callable.js");
var toIntegerOrInfinity = __webpack_require__(/*! ../internals/to-integer-or-infinity */ "./node_modules/core-js/internals/to-integer-or-infinity.js");
var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js");
var toString = __webpack_require__(/*! ../internals/to-string */ "./node_modules/core-js/internals/to-string.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js/internals/require-object-coercible.js");
var advanceStringIndex = __webpack_require__(/*! ../internals/advance-string-index */ "./node_modules/core-js/internals/advance-string-index.js");
var getMethod = __webpack_require__(/*! ../internals/get-method */ "./node_modules/core-js/internals/get-method.js");
var getSubstitution = __webpack_require__(/*! ../internals/get-substitution */ "./node_modules/core-js/internals/get-substitution.js");
var regExpExec = __webpack_require__(/*! ../internals/regexp-exec-abstract */ "./node_modules/core-js/internals/regexp-exec-abstract.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var REPLACE = wellKnownSymbol('replace');
var max = Math.max;
var min = Math.min;
var concat = uncurryThis([].concat);
var push = uncurryThis([].push);
var stringIndexOf = uncurryThis(''.indexOf);
var stringSlice = uncurryThis(''.slice);

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// IE <= 11 replaces $0 with the whole match, as if it was $&
// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
var REPLACE_KEEPS_$0 = (function () {
  // eslint-disable-next-line regexp/prefer-escape-replacement-dollar-char -- required for testing
  return 'a'.replace(/./, '$0') === '$0';
})();

// Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
  if (/./[REPLACE]) {
    return /./[REPLACE]('a', '$0') === '';
  }
  return false;
})();

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  // eslint-disable-next-line regexp/no-useless-dollar-replacements -- false positive
  return ''.replace(re, '$<a>') !== '7';
});

// @@replace logic
fixRegExpWellKnownSymbolLogic('replace', function (_, nativeReplace, maybeCallNative) {
  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

  return [
    // `String.prototype.replace` method
    // https://tc39.es/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = requireObjectCoercible(this);
      var replacer = searchValue == undefined ? undefined : getMethod(searchValue, REPLACE);
      return replacer
        ? call(replacer, searchValue, O, replaceValue)
        : call(nativeReplace, toString(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
    function (string, replaceValue) {
      var rx = anObject(this);
      var S = toString(string);

      if (
        typeof replaceValue == 'string' &&
        stringIndexOf(replaceValue, UNSAFE_SUBSTITUTE) === -1 &&
        stringIndexOf(replaceValue, '$<') === -1
      ) {
        var res = maybeCallNative(nativeReplace, rx, S, replaceValue);
        if (res.done) return res.value;
      }

      var functionalReplace = isCallable(replaceValue);
      if (!functionalReplace) replaceValue = toString(replaceValue);

      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;

        push(results, result);
        if (!global) break;

        var matchStr = toString(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }

      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];

        var matched = toString(result[0]);
        var position = max(min(toIntegerOrInfinity(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) push(captures, maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = concat([matched], captures, position, S);
          if (namedCaptures !== undefined) push(replacerArgs, namedCaptures);
          var replacement = toString(apply(replaceValue, undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += stringSlice(S, nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + stringSlice(S, nextSourcePosition);
    }
  ];
}, !REPLACE_SUPPORTS_NAMED_GROUPS || !REPLACE_KEEPS_$0 || REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE);


/***/ }),

/***/ "./node_modules/nprogress/nprogress.js":
/*!*********************************************!*\
  !*** ./node_modules/nprogress/nprogress.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/* NProgress, (c) 2013, 2014 Rico Sta. Cruz - http://ricostacruz.com/nprogress
 * @license MIT */

;(function(root, factory) {

  if (true) {
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
		__WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}

})(this, function() {
  var NProgress = {};

  NProgress.version = '0.2.0';

  var Settings = NProgress.settings = {
    minimum: 0.08,
    easing: 'ease',
    positionUsing: '',
    speed: 200,
    trickle: true,
    trickleRate: 0.02,
    trickleSpeed: 800,
    showSpinner: true,
    barSelector: '[role="bar"]',
    spinnerSelector: '[role="spinner"]',
    parent: 'body',
    template: '<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
  };

  /**
   * Updates configuration.
   *
   *     NProgress.configure({
   *       minimum: 0.1
   *     });
   */
  NProgress.configure = function(options) {
    var key, value;
    for (key in options) {
      value = options[key];
      if (value !== undefined && options.hasOwnProperty(key)) Settings[key] = value;
    }

    return this;
  };

  /**
   * Last number.
   */

  NProgress.status = null;

  /**
   * Sets the progress bar status, where `n` is a number from `0.0` to `1.0`.
   *
   *     NProgress.set(0.4);
   *     NProgress.set(1.0);
   */

  NProgress.set = function(n) {
    var started = NProgress.isStarted();

    n = clamp(n, Settings.minimum, 1);
    NProgress.status = (n === 1 ? null : n);

    var progress = NProgress.render(!started),
        bar      = progress.querySelector(Settings.barSelector),
        speed    = Settings.speed,
        ease     = Settings.easing;

    progress.offsetWidth; /* Repaint */

    queue(function(next) {
      // Set positionUsing if it hasn't already been set
      if (Settings.positionUsing === '') Settings.positionUsing = NProgress.getPositioningCSS();

      // Add transition
      css(bar, barPositionCSS(n, speed, ease));

      if (n === 1) {
        // Fade out
        css(progress, { 
          transition: 'none', 
          opacity: 1 
        });
        progress.offsetWidth; /* Repaint */

        setTimeout(function() {
          css(progress, { 
            transition: 'all ' + speed + 'ms linear', 
            opacity: 0 
          });
          setTimeout(function() {
            NProgress.remove();
            next();
          }, speed);
        }, speed);
      } else {
        setTimeout(next, speed);
      }
    });

    return this;
  };

  NProgress.isStarted = function() {
    return typeof NProgress.status === 'number';
  };

  /**
   * Shows the progress bar.
   * This is the same as setting the status to 0%, except that it doesn't go backwards.
   *
   *     NProgress.start();
   *
   */
  NProgress.start = function() {
    if (!NProgress.status) NProgress.set(0);

    var work = function() {
      setTimeout(function() {
        if (!NProgress.status) return;
        NProgress.trickle();
        work();
      }, Settings.trickleSpeed);
    };

    if (Settings.trickle) work();

    return this;
  };

  /**
   * Hides the progress bar.
   * This is the *sort of* the same as setting the status to 100%, with the
   * difference being `done()` makes some placebo effect of some realistic motion.
   *
   *     NProgress.done();
   *
   * If `true` is passed, it will show the progress bar even if its hidden.
   *
   *     NProgress.done(true);
   */

  NProgress.done = function(force) {
    if (!force && !NProgress.status) return this;

    return NProgress.inc(0.3 + 0.5 * Math.random()).set(1);
  };

  /**
   * Increments by a random amount.
   */

  NProgress.inc = function(amount) {
    var n = NProgress.status;

    if (!n) {
      return NProgress.start();
    } else {
      if (typeof amount !== 'number') {
        amount = (1 - n) * clamp(Math.random() * n, 0.1, 0.95);
      }

      n = clamp(n + amount, 0, 0.994);
      return NProgress.set(n);
    }
  };

  NProgress.trickle = function() {
    return NProgress.inc(Math.random() * Settings.trickleRate);
  };

  /**
   * Waits for all supplied jQuery promises and
   * increases the progress as the promises resolve.
   *
   * @param $promise jQUery Promise
   */
  (function() {
    var initial = 0, current = 0;

    NProgress.promise = function($promise) {
      if (!$promise || $promise.state() === "resolved") {
        return this;
      }

      if (current === 0) {
        NProgress.start();
      }

      initial++;
      current++;

      $promise.always(function() {
        current--;
        if (current === 0) {
            initial = 0;
            NProgress.done();
        } else {
            NProgress.set((initial - current) / initial);
        }
      });

      return this;
    };

  })();

  /**
   * (Internal) renders the progress bar markup based on the `template`
   * setting.
   */

  NProgress.render = function(fromStart) {
    if (NProgress.isRendered()) return document.getElementById('nprogress');

    addClass(document.documentElement, 'nprogress-busy');
    
    var progress = document.createElement('div');
    progress.id = 'nprogress';
    progress.innerHTML = Settings.template;

    var bar      = progress.querySelector(Settings.barSelector),
        perc     = fromStart ? '-100' : toBarPerc(NProgress.status || 0),
        parent   = document.querySelector(Settings.parent),
        spinner;
    
    css(bar, {
      transition: 'all 0 linear',
      transform: 'translate3d(' + perc + '%,0,0)'
    });

    if (!Settings.showSpinner) {
      spinner = progress.querySelector(Settings.spinnerSelector);
      spinner && removeElement(spinner);
    }

    if (parent != document.body) {
      addClass(parent, 'nprogress-custom-parent');
    }

    parent.appendChild(progress);
    return progress;
  };

  /**
   * Removes the element. Opposite of render().
   */

  NProgress.remove = function() {
    removeClass(document.documentElement, 'nprogress-busy');
    removeClass(document.querySelector(Settings.parent), 'nprogress-custom-parent');
    var progress = document.getElementById('nprogress');
    progress && removeElement(progress);
  };

  /**
   * Checks if the progress bar is rendered.
   */

  NProgress.isRendered = function() {
    return !!document.getElementById('nprogress');
  };

  /**
   * Determine which positioning CSS rule to use.
   */

  NProgress.getPositioningCSS = function() {
    // Sniff on document.body.style
    var bodyStyle = document.body.style;

    // Sniff prefixes
    var vendorPrefix = ('WebkitTransform' in bodyStyle) ? 'Webkit' :
                       ('MozTransform' in bodyStyle) ? 'Moz' :
                       ('msTransform' in bodyStyle) ? 'ms' :
                       ('OTransform' in bodyStyle) ? 'O' : '';

    if (vendorPrefix + 'Perspective' in bodyStyle) {
      // Modern browsers with 3D support, e.g. Webkit, IE10
      return 'translate3d';
    } else if (vendorPrefix + 'Transform' in bodyStyle) {
      // Browsers without 3D support, e.g. IE9
      return 'translate';
    } else {
      // Browsers without translate() support, e.g. IE7-8
      return 'margin';
    }
  };

  /**
   * Helpers
   */

  function clamp(n, min, max) {
    if (n < min) return min;
    if (n > max) return max;
    return n;
  }

  /**
   * (Internal) converts a percentage (`0..1`) to a bar translateX
   * percentage (`-100%..0%`).
   */

  function toBarPerc(n) {
    return (-1 + n) * 100;
  }


  /**
   * (Internal) returns the correct CSS for changing the bar's
   * position given an n percentage, and speed and ease from Settings
   */

  function barPositionCSS(n, speed, ease) {
    var barCSS;

    if (Settings.positionUsing === 'translate3d') {
      barCSS = { transform: 'translate3d('+toBarPerc(n)+'%,0,0)' };
    } else if (Settings.positionUsing === 'translate') {
      barCSS = { transform: 'translate('+toBarPerc(n)+'%,0)' };
    } else {
      barCSS = { 'margin-left': toBarPerc(n)+'%' };
    }

    barCSS.transition = 'all '+speed+'ms '+ease;

    return barCSS;
  }

  /**
   * (Internal) Queues a function to be executed.
   */

  var queue = (function() {
    var pending = [];
    
    function next() {
      var fn = pending.shift();
      if (fn) {
        fn(next);
      }
    }

    return function(fn) {
      pending.push(fn);
      if (pending.length == 1) next();
    };
  })();

  /**
   * (Internal) Applies css properties to an element, similar to the jQuery 
   * css method.
   *
   * While this helper does assist with vendor prefixed property names, it 
   * does not perform any manipulation of values prior to setting styles.
   */

  var css = (function() {
    var cssPrefixes = [ 'Webkit', 'O', 'Moz', 'ms' ],
        cssProps    = {};

    function camelCase(string) {
      return string.replace(/^-ms-/, 'ms-').replace(/-([\da-z])/gi, function(match, letter) {
        return letter.toUpperCase();
      });
    }

    function getVendorProp(name) {
      var style = document.body.style;
      if (name in style) return name;

      var i = cssPrefixes.length,
          capName = name.charAt(0).toUpperCase() + name.slice(1),
          vendorName;
      while (i--) {
        vendorName = cssPrefixes[i] + capName;
        if (vendorName in style) return vendorName;
      }

      return name;
    }

    function getStyleProp(name) {
      name = camelCase(name);
      return cssProps[name] || (cssProps[name] = getVendorProp(name));
    }

    function applyCss(element, prop, value) {
      prop = getStyleProp(prop);
      element.style[prop] = value;
    }

    return function(element, properties) {
      var args = arguments,
          prop, 
          value;

      if (args.length == 2) {
        for (prop in properties) {
          value = properties[prop];
          if (value !== undefined && properties.hasOwnProperty(prop)) applyCss(element, prop, value);
        }
      } else {
        applyCss(element, args[1], args[2]);
      }
    }
  })();

  /**
   * (Internal) Determines if an element or space separated list of class names contains a class name.
   */

  function hasClass(element, name) {
    var list = typeof element == 'string' ? element : classList(element);
    return list.indexOf(' ' + name + ' ') >= 0;
  }

  /**
   * (Internal) Adds a class to an element.
   */

  function addClass(element, name) {
    var oldList = classList(element),
        newList = oldList + name;

    if (hasClass(oldList, name)) return; 

    // Trim the opening space.
    element.className = newList.substring(1);
  }

  /**
   * (Internal) Removes a class from an element.
   */

  function removeClass(element, name) {
    var oldList = classList(element),
        newList;

    if (!hasClass(element, name)) return;

    // Replace the class name.
    newList = oldList.replace(' ' + name + ' ', ' ');

    // Trim the opening and closing spaces.
    element.className = newList.substring(1, newList.length - 1);
  }

  /**
   * (Internal) Gets a space separated list of the class names on the element. 
   * The list is wrapped with a single space on each end to facilitate finding 
   * matches within the list.
   */

  function classList(element) {
    return (' ' + (element.className || '') + ' ').replace(/\s+/gi, ' ');
  }

  /**
   * (Internal) Removes an element from the DOM.
   */

  function removeElement(element) {
    element && element.parentNode && element.parentNode.removeChild(element);
  }

  return NProgress;
});



/***/ })

}]);
//# sourceMappingURL=default-src_app_pjax_js.js.map