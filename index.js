/* jshint node: true */
'use strict';
var BasePlugin = require('ember-cli-deploy-plugin');

module.exports = {
  name: 'ember-cli-deploy-firebase',

  createDeployPlugin: function(options) {
    var DeployPlugin = BasePlugin.extend({
      name: options.name,

      upload: function(context) {
        let outer = this;
        let options = {
          firebase: context.config.fireBaseAppName,
          public: context.config.build.outputPath,
        };
        if(context.revisionData){
          options.message = context.revisionData.revisionKey;
        }
        return require('firebase-tools').deploy.hosting(options).then(function() {
          outer.log('it worked yay');
        }).catch(function(err) {
          // handle error
          outer.log('something bad happened oh no', { color: 'red' });
          outer.log(err, { color: 'red' });
        });
      },
    });

    return new DeployPlugin();
  }
};
