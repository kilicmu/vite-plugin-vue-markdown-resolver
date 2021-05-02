## vite-plugin-vue-markdown-resolver

### information

this is a plugin for vite. you can use it to import markdown files like vue components now, only supports @vue3

### Quick Start

vite.config.ts:

```js
import {defineConfig} from "vite"
import md from "vite-plugin-vue-markdown-resolver"

export default defineConfig({
    //...
    plugins: [
        md({})
    ],
    //...
})
```

App.vue

```vue
<template>
  <RulesDocs></RulesDocs>
</template>

<script lang="ts" setup>
import RulesDocs from "vite-plugin-vue-markdown-resolver/docs/rules.md"
</script>
```

### configs:

* plugin

you can set some awesome markdown-it plugin to control markdown rules. you can add your plugin like this:

```js
import PWOOP from "plugin-without-options-or-params"
import PWO from "plugin-with-options"
import PWP from "plugin-with-params"
md({
    plugins: [
        PWOOP, // with out options
        {
            plugin: PWO
            options: {
                // some options
            }
        },
        {
            plugin: PWP,
            params: [
                '',
                {},
                // other params
            ]
        }

    ]
})
```
