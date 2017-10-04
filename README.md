

# Overview

Video: https://www.youtube.com/watch?v=j88ulMscd1g

This repo is a demo for writing [offline-first](http://offlinefirst.org/) app powered by React/Redux, PouchDB and RxJS. The React/Redux is using for building UI. All data from Redux is synching from PouchDB via RxJS. So, the UI is just only talking to the caches, local database(PouchDB). When PouchDB database changes, RxJS triggers change Redux and React UI will automatically change.

- Reactive Programming using RxJS.
- Writing with functional style, no function has side-effect.
- Offline storage using PouchDB(can use while offline and sync data with remote database).
- Ability build complexed UI/UX app using React/Redux.
- Data flow is single way -> easy to develop and debug.

This is a data flow for a request:

<img src="https://cdn.filestackcontent.com/qxTWxGcdQEOKyGTYpJch" width="600">

### Features:
- Fetch Github user
- Pagination display.
- Error displaying when some thing went wrong.
- Limit 1000 results bases on Github limits.
- All data is saved to local database -> Can use without internet.

