import '@testing-library/jest-dom';
import MutationObserver from '@sheerun/mutationobserver-shim';

// react testing library for mock some MutationObserver, see this:https://github.com/testing-library/dom-testing-library/releases/tag/v7.0.0
window.MutationObserver = MutationObserver;
