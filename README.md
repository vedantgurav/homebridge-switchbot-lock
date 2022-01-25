<span align="center">

<p align="center">

<img src="https://github.com/homebridge/branding/raw/master/logos/homebridge-wordmark-logo-vertical.png" width="150">

</p>

# Homebridge SwitchBot Bluetooth Platform

<p>
    The Homebridge SwitchBot Bluetooth Platform is a <a href="https://github.com/homebridge/homebridge">Homebridge</a> plugin
    that allows you to directly control your <a href="https://www.switch-bot.com">SwitchBot</a> bot from HomeKit via BLE (Bluetooth Low Energy)
    This plugin aims to provide the best performance and stability when controlling your SwitchBot bot via BLE. 
</p>

[![npm version](https://badgen.net/npm/v/homebridge-switchbot-bluetooth-platform)](https://www.npmjs.com/package/homebridge-switchbot-bluetooth-platform)
[![npm downloads](https://badgen.net/npm/dt/homebridge-switchbot-bluetooth-platform)](https://www.npmjs.com/package/homebridge-switchbot-bluetooth-platform)
[![latest commit](https://badgen.net/github/last-commit/galzo/homebridge-switchbot-bluetooth)](https://github.com/galzo/homebridge-switchbot-bluetooth)

### Why do I need (yet another) SwitchBot plugin?

<p>
    The existing SwitchBot plugins did not provide the level of stability and feature-set that I was looking for.
</p>
<p>
    This plugin aims to provide the <b>best performance</b> (around <b>30% faster</b> BLE calls than other switchbot plugins), 
    and <b>best stabilty</b> (support for retry mechanism, error handling and device details caching), assuring you that the plugin 
    will stay <b>stable</b> upon usage, and the switchbot will respond <b>as fast as possible.</b> 
</p>
<p>
    This plugin also aims to provide several new features, such as support for bot <b>battery status</b>, and <b>password-protected BLE communication</b>.
</p>


</span>

## Supported Devices

Supported Devices:
- [SwitchBot (Bot)](https://www.switch-bot.com/products/switchbot-bot)

To Be Supported Soon:
- [SwitchBot Curtain (Curtain)](https://www.switch-bot.com/products/switchbot-curtain)
- [SwitchBot Thermometer & Hygrometer (Meter)](https://www.switch-bot.com/products/switchbot-meter)

## Installation

### Installing from Homebridge Plugins Page
1. Search for "switchbot bluetooth" 
2. Find `homebridge-switchbot-bluetooth-platform` 
    - **NOTE:** Check noble [prerequisites](https://github.com/homebridge/noble#prerequisites) for your operating system. this is used for the bluetooth communcation.
3. Install the plugin

### Installing Directly:
1. Open Terminal
2. run command `npm install -g homebridge-switchbot-bluetooth-platform`
    - **NOTE:** Check noble [prerequisites](https://github.com/homebridge/noble#prerequisites) for your operating system. this is used for the bluetooth communcation.


## Setup Development Environment

To develop Homebridge plugins you must have Node.js 12 or later installed, and a modern code editor such as [VS Code](https://code.visualstudio.com/). This plugin template uses [TypeScript](https://www.typescriptlang.org/) to make development easier and comes with pre-configured settings for [VS Code](https://code.visualstudio.com/) and ESLint. If you are using VS Code install these extensions:

* [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

## Install Development Dependencies

Using a terminal, navigate to the project folder and run this command to install the development dependencies:

```
npm install
```

## Update package.json

Open the [`package.json`](./package.json) and change the following attributes:

* `name` - this should be prefixed with `homebridge-` or `@username/homebridge-` and contain no spaces or special characters apart from a dashes
* `displayName` - this is the "nice" name displayed in the Homebridge UI
* `repository.url` - Link to your GitHub repo
* `bugs.url` - Link to your GitHub repo issues page

When you are ready to publish the plugin you should set `private` to false, or remove the attribute entirely.

## Update Plugin Defaults

Open the [`src/settings.ts`](./src/settings.ts) file and change the default values:

* `PLATFORM_NAME` - Set this to be the name of your platform. This is the name of the platform that users will use to register the plugin in the Homebridge `config.json`.
* `PLUGIN_NAME` - Set this to be the same name you set in the [`package.json`](./package.json) file. 

Open the [`config.schema.json`](./config.schema.json) file and change the following attribute:

* `pluginAlias` - set this to match the `PLATFORM_NAME` you defined in the previous step.

## Build Plugin

TypeScript needs to be compiled into JavaScript before it can run. The following command will compile the contents of your [`src`](./src) directory and put the resulting code into the `dist` folder.

```
npm run build
```

## Link To Homebridge

Run this command so your global install of Homebridge can discover the plugin in your development environment:

```
npm link
```

You can now start Homebridge, use the `-D` flag so you can see debug log messages in your plugin:

```
homebridge -D
```

## Watch For Changes and Build Automatically

If you want to have your code compile automatically as you make changes, and restart Homebridge automatically between changes you can run:

```
npm run watch
```

This will launch an instance of Homebridge in debug mode which will restart every time you make a change to the source code. It will load the config stored in the default location under `~/.homebridge`. You may need to stop other running instances of Homebridge while using this command to prevent conflicts. You can adjust the Homebridge startup command in the [`nodemon.json`](./nodemon.json) file.

## Customise Plugin

You can now start customising the plugin template to suit your requirements.

* [`src/platform.ts`](./src/platform.ts) - this is where your device setup and discovery should go.
* [`src/platformAccessory.ts`](./src/platformAccessory.ts) - this is where your accessory control logic should go, you can rename or create multiple instances of this file for each accessory type you need to implement as part of your platform plugin. You can refer to the [developer documentation](https://developers.homebridge.io/) to see what characteristics you need to implement for each service type.
* [`config.schema.json`](./config.schema.json) - update the config schema to match the config you expect from the user. See the [Plugin Config Schema Documentation](https://developers.homebridge.io/#/config-schema).

## Versioning Your Plugin

Given a version number `MAJOR`.`MINOR`.`PATCH`, such as `1.4.3`, increment the:

1. **MAJOR** version when you make breaking changes to your plugin,
2. **MINOR** version when you add functionality in a backwards compatible manner, and
3. **PATCH** version when you make backwards compatible bug fixes.

You can use the `npm version` command to help you with this:

```bash
# major update / breaking changes
npm version major

# minor update / new features
npm version update

# patch / bugfixes
npm version patch
```

## Publish Package

When you are ready to publish your plugin to [npm](https://www.npmjs.com/), make sure you have removed the `private` attribute from the [`package.json`](./package.json) file then run:

```
npm publish
```

If you are publishing a scoped plugin, i.e. `@username/homebridge-xxx` you will need to add `--access=public` to command the first time you publish.

#### Publishing Beta Versions

You can publish *beta* versions of your plugin for other users to test before you release it to everyone.

```bash
# create a new pre-release version (eg. 2.1.0-beta.1)
npm version prepatch --preid beta

# publsh to @beta
npm publish --tag=beta
```

Users can then install the  *beta* version by appending `@beta` to the install command, for example:

```
sudo npm install -g homebridge-example-plugin@beta
```


