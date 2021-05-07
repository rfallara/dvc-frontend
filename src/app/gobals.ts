import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';


@Injectable()
export class Globals {
  dvcApiServer = environment.dvcApiServer
  // dvcApiServer = 'http://127.0.0.1:5000';
  // dvcApiServer = 'http://127.0.0.1:8000'; // gunicorn
  // dvcApiServer = 'https://dvc.fallara.net';
  // dvcApiServer = 'https://dvc-dev.fallara.net';
  // dvcApiServer = 'https://dvc-stage.fallara.net';
}
