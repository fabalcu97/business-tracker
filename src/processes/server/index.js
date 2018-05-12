import {ProcessHandler} from 'n158/classes';
import {connectMongoDb} from 'n158/services';
import {modelMongoTransaction} from 'n158/http-pipeline-handlers';
import {modelsMap as mongoModelsMap} from "../../shared/db-models";
import {bodyParser} from "../../shared/http-pipeline-handlers";
import yaml from 'js-yaml';
import path from 'path';
import fs from 'fs';

import {  } from "../../shared/db-models";

// Setup process handler settings
var procSettingsPath = path.join(__dirname, './settings.yaml');
var procSettings = yaml.safeLoad(fs.readFileSync(procSettingsPath, 'utf-8'));

// Init process handler
var processHandler = new ProcessHandler(procSettings);

// Setup server port
processHandler.set('httpPort', process.env.PORT || processHandler.get('httpPort'));

// Setup Models
Object.keys(mongoModelsMap).forEach((k) => {
    processHandler.set('models/'+k, mongoModelsMap[k]);
});

// Setup webapp
processHandler.set('business-tracker', path.join(__dirname, './webapps/home'));

// Setup handlers
processHandler.set('modelMongoTransactionHandler', modelMongoTransaction);
processHandler.set('bodyParserHandler', bodyParser);

// Start servers

connectMongoDb(processHandler.get('dbUrl'), processHandler.get('dbName')).then((db) => {

    console.log('Connected to db');
    processHandler.set('mongoDb', db);

    processHandler.startHTTPServers().then((results) => {
        results.forEach((r) => {
            console.log('HTTP Server '+r.serverName+' is running at port '+r.ports.http);
        });
    });
}).catch((err) => {
    console.warn("Error connecting db =>", err);
})