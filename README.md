# Feedback Component

I have not set up any of the NPM stuff so if you want to use this just make sure you have an existing project that could work with this stuff...

Sorry I have not taken the time to get this up to normal open source stanards.

Usage:

\<script lang="ts"\>
```ts
import Feedback from "path-to-component/Feedback.svelte"
import { feedback, addInfo, addSuccess, addError, addWarning, handleError} from "path-to-store/store.ts"

addInfo("This will display an info banner")
// handleError() will handle an axios error and display its response data (err.response.data) and display err.message if err.response is undefined
// ...etc
```
\</script\>

Put this somewhere in your html (root of app):
```html
<Feedback feedbacks={$feedback} />
```

There may be some odd typescript errors that I dont know about.