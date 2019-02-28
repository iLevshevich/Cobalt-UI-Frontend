import {Injectable} from '@angular/core';
import {environment} from '@environments/environment';

class PathService {
  public readonly getGrants = '/grants';
  public readonly getStatuses = '/statuses';
  public readonly getTypes = '/types';
  public readonly cleanLastErrors = '/clean';
  public readonly saveConfiguration = '/save';
  public readonly startAll = '/start';
  public readonly abortAll = '/abort';
  public readonly resetAll = '/reset';
  public readonly stopAll = '/stop';
  public readonly addOne = '/add';
  public readonly removeOne = '/remove';
  public readonly startOne = '/start';
  public readonly abortOne = '/abort';
  public readonly resetOne = '/reset';
  public readonly stopOne = '/stop';
  public readonly shutdown = '/shutdown';
}

@Injectable({
  providedIn: 'root'
})
export class ApiService extends PathService {
  public readonly read = {
    url: `${environment.baseUrl}/api/cobalt/v1.0`,
    method: 'GET',
    responseType: 'json' as 'json',
    contentType: 'application/json',
    acceptType: 'application/json'
  };

  public readonly create = {
    url: `${environment.baseUrl}/api/cobalt/v1.0`,
    method: 'POST',
    responseType: 'json' as 'json',
    contentType: 'application/json',
    acceptType: 'application/json'
  };

  public readonly update = {
    url: `${environment.baseUrl}/api/cobalt/v1.0`,
    method: 'PUT',
    responseType: 'json' as 'json',
    contentType: 'application/json',
    acceptType: 'application/json'
  };

  public readonly remove = {
    url: `${environment.baseUrl}/api/cobalt/v1.0`,
    method: 'DELETE',
    responseType: 'json' as 'json',
    contentType: 'application/json',
    acceptType: 'application/json'
  };

  public readonly management = {
    url: `${environment.baseUrl}/management`,
    method: 'GET',
    responseType: 'json' as 'json',
    contentType: 'application/json',
    acceptType: 'application/json'
  };
}


