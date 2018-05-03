
# Spies server #

## Installation ##

in repo directory
```bash
npm install
```

To start the server
```bash
npm start
```

## Local/PR Testing ##

To connect to an arbitrary server, you need to change the endpoint in the app. You can do so by triple three finger tapping on the home screen, then entering the PR endpoint created by Heroku or your IP address.

Changing `.log(false)` to `.log(true)` will provide much more debugging output in the xCode console as well.

## Hosting ##

Spies is currently hosted at `spies-server.herokuapp.com`. The dashboard can be found [here](https://dashboard.heroku.com/apps/spies-server/metrics/web).

## Deploying ##

Automatic deploys are tied to the `master` branch, if you push code to `master`, Heroku should automatically deploy it. This will knock the server over for a little bit, dropping anyone currently in a game. 

If you need to manually deploy:

1. Be a member of the Steamclock org on Heroku
2. Merge your code into the `master` branch of the `spies-server` repo
3. Go to [https://dashboard.heroku.com/apps/spies-server/deploy/github](https://dashboard.heroku.com/apps/spies-server/deploy/github)
4. Scroll down to manual deploy and press `Deploy Branch`

## Documentation ##

Docs are located in `./docs`. Docs can be generated using [TypeDoc](http://typedoc.org/) by entering the project directory and running `typedoc --out ./docs ./src`. You need to either have typedoc installed globally `npm install --global typedoc`, or have installed all dev dependencies.

Documentation should be updated before each merge to master.

## Debug / logging ##

Uncomment the line
```
winston.level = 'verbose'
```
in `log.js` to see more debugging info.

To see logs from Heroku, use `heroku logs -a spies-server --source app > output.log`, or view live logs with `heroku logs -a spies-server -t -s app`. Note you need to have the [Heroku CLI installed](https://devcenter.heroku.com/articles/heroku-cli).

Logs are stored locally in the `/logs` directory, in addition to any crashes.

Socket.IO is powered by [debug](https://github.com/visionmedia/debug).
In order to see all the debug output, run your app with the environment variable
`DEBUG` including the desired scope.

To see the output from all of Socket.IO's debugging scopes you can use:

```
DEBUG=socket.io* node myapp
```

## Linting ##

Linting is done using [tslint](https://palantir.github.io/tslint/). To run you need to have tslint installed globally (`npm install -g tslint`). 

Automatic linting is supported in Sublime Text using [Sublime Linter](http://www.sublimelinter.com/en/latest/) and [Sublime​Linter-contrib-tslint](https://github.com/lavrton/SublimeLinter-contrib-tslint).

Once you install those packages, you shouldn't have to do anything else, all linting rules are handled by `tslint.json`
